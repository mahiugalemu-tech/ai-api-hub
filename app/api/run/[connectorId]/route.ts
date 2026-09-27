import { NextResponse } from "next/server";
import { db } from "../../../../src/prisma/db";
import { GeminiAdapter } from "../../../../lib/providers/gemini";
import { GroqAdapter } from "../../../../lib/providers/groq";
import {
  parseStructuredOutput,
  validateAndNormalizeInput,
} from "../../../../lib/providers/structured";
import { estimateTokenCost } from "../../../../lib/usage/cost";

const MAX_REQUEST_SIZE = 30 * 1024 * 1024;
const PROVIDER_TIMEOUT = 45 * 1000;

function getApiKey(request: Request): string | null {
  const xApiKey = request.headers.get("x-api-key");

  if (xApiKey) {
    return xApiKey.trim();
  }

  const authorization =
    request.headers.get("authorization");

  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice(7).trim();
  }

  return null;
}

function getConnectorIdFromRequest(
  request: Request
): number | null {
  try {
    const url = new URL(request.url);

    const parts = url.pathname
      .split("/")
      .filter(Boolean);

    const rawId =
      parts[parts.length - 1] ?? "";

    const id = Number(rawId);

    if (!Number.isInteger(id) || id <= 0) {
      return null;
    }

    return id;
  } catch {
    return null;
  }
}

function isVisionModel(
  provider: string,
  model: string
): boolean {
  return (
    provider.toLowerCase() === "groq" &&
    model === "qwen/qwen3.8-27b"
  );
}

async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  let timeoutId:
    | ReturnType<typeof setTimeout>
    | undefined;

  const timeoutPromise = new Promise<never>(
    (_, reject) => {
      timeoutId = setTimeout(() => {
        reject(
          new Error(
            "The AI provider request timed out."
          )
        );
      }, timeoutMs);
    }
  );

  try {
    return await Promise.race([
      promise,
      timeoutPromise,
    ]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

async function logFailedRequest(
  connectorId: number,
  responseTime: number,
  errorMessage: string,
  inputTokens?: number,
  outputTokens?: number,
  estimatedCost?: number | null
) {
  try {
    await db.orm.public.ApiRequest.create({
      connectorId,
      status: "failed",
      responseTime,
      inputTokens,
      outputTokens,
      estimatedCost:
        estimatedCost ?? null,
      errorMessage,
    });
  } catch (loggingError) {
    console.error(
      "Failed to log API request:",
      loggingError
    );
  }
}

export async function POST(
  request: Request
) {
  const startTime = Date.now();

  const connectorId =
    getConnectorIdFromRequest(request);

  try {
    // -------------------------------------------------------
    // Connector ID
    // -------------------------------------------------------

    if (connectorId === null) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Invalid connector ID.",
        },
        { status: 400 }
      );
    }

    // -------------------------------------------------------
    // API authentication
    // -------------------------------------------------------

    const configuredApiKey =
      process.env.AI_API_HUB_KEY;

    if (!configuredApiKey) {
      console.error(
        "AI_API_HUB_KEY is not configured."
      );

      return NextResponse.json(
        {
          success: false,
          data: null,
          error:
            "API authentication is not configured on the server.",
        },
        { status: 500 }
      );
    }

    const providedApiKey =
      getApiKey(request);

    if (
      !providedApiKey ||
      providedApiKey !== configuredApiKey
    ) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error:
            "Unauthorized. A valid API key is required.",
        },
        { status: 401 }
      );
    }

    // -------------------------------------------------------
    // Request size validation
    // -------------------------------------------------------

    const contentLength =
      request.headers.get("content-length");

    if (
      contentLength &&
      Number(contentLength) > MAX_REQUEST_SIZE
    ) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error:
            "Request payload is too large. Maximum size is 30 MB.",
        },
        { status: 413 }
      );
    }

    // -------------------------------------------------------
    // Parse JSON
    // -------------------------------------------------------

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error:
            "Request body must contain valid JSON.",
        },
        { status: 400 }
      );
    }

    if (
      !body ||
      typeof body !== "object" ||
      !("input" in body)
    ) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error:
            "Missing required field: input",
        },
        { status: 400 }
      );
    }

    const requestBody = body as {
      input: unknown;
    };

    // -------------------------------------------------------
    // Connector lookup
    // -------------------------------------------------------

    const connectors =
      await db.orm.public.Connector.all();

    const connector = connectors.find(
      (item) =>
        Number(item.id) === connectorId
    );

    if (!connector) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Connector not found.",
        },
        { status: 404 }
      );
    }

    // -------------------------------------------------------
    // Active status
    // -------------------------------------------------------

    if (!connector.isActive) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error:
            "This connector is currently disabled.",
        },
        { status: 403 }
      );
    }

    // -------------------------------------------------------
    // Input validation
    // -------------------------------------------------------

    const normalizedInput =
      validateAndNormalizeInput(
        requestBody.input,
        connector.inputSchema
      );

    if (!normalizedInput.valid) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: normalizedInput.error,
        },
        { status: 400 }
      );
    }

    // -------------------------------------------------------
    // Vision-specific validation
    // -------------------------------------------------------

    if (
      isVisionModel(
        connector.provider,
        connector.model
      )
    ) {
      if (
        !requestBody.input ||
        typeof requestBody.input !== "object"
      ) {
        return NextResponse.json(
          {
            success: false,
            data: null,
            error:
              "Image input is required for this vision connector.",
          },
          { status: 400 }
        );
      }

      const input =
        requestBody.input as Record<
          string,
          unknown
        >;

      if (
        typeof input.imageData !== "string" ||
        input.imageData.length === 0
      ) {
        return NextResponse.json(
          {
            success: false,
            data: null,
            error:
              "Image data is required for the vision connector.",
          },
          { status: 400 }
        );
      }
    }

    // -------------------------------------------------------
    // Provider adapter
    // -------------------------------------------------------

    let adapter:
      | GeminiAdapter
      | GroqAdapter;

    if (connector.provider === "gemini") {
      adapter = new GeminiAdapter();
    } else if (connector.provider === "groq") {
      adapter = new GroqAdapter();
    } else {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error:
            `Unsupported AI provider: ${connector.provider}`,
        },
        { status: 400 }
      );
    }

    // -------------------------------------------------------
    // AI provider call with timeout
    // -------------------------------------------------------

    const result = await withTimeout(
      adapter.generate({
        model: connector.model,
        prompt: connector.prompt,
        input: normalizedInput.value,
        outputSchema: connector.outputSchema,
      }),
      PROVIDER_TIMEOUT
    );

    const responseTime =
      Date.now() - startTime;

    const estimatedCost =
      estimateTokenCost(
        connector.provider,
        connector.model,
        result.inputTokens,
        result.outputTokens
      );

    // -------------------------------------------------------
    // Structured output parsing
    // -------------------------------------------------------

    let data: unknown;

    try {
      data = parseStructuredOutput(
        result.text,
        connector.outputSchema
      );
    } catch (parseError) {
      const errorMessage =
        parseError instanceof Error
          ? parseError.message
          : "The AI provider returned invalid structured output.";

      await logFailedRequest(
        connector.id,
        responseTime,
        errorMessage,
        result.inputTokens,
        result.outputTokens,
        estimatedCost
      );

      return NextResponse.json(
        {
          success: false,
          data: null,
          error: errorMessage,
          responseTime,
        },
        { status: 502 }
      );
    }

    // -------------------------------------------------------
    // Successful request logging
    // -------------------------------------------------------

    try {
      await db.orm.public.ApiRequest.create({
        connectorId: connector.id,
        status: "success",
        responseTime,
        inputTokens:
          result.inputTokens,
        outputTokens:
          result.outputTokens,
        estimatedCost,
      });
    } catch (loggingError) {
      console.error(
        "Failed to log successful API request:",
        loggingError
      );
    }

    // -------------------------------------------------------
    // Predictable API response
    // -------------------------------------------------------

    return NextResponse.json({
      success: true,

      data,

      error: null,

      connector: connector.name,

      provider: connector.provider,

      model: connector.model,

      usage: {
        inputTokens:
          result.inputTokens,

        outputTokens:
          result.outputTokens,

        totalTokens:
          result.totalTokens,

        estimatedCost,
      },

      responseTime,

      imageData:
        result.imageData ?? null,

      imageMimeType:
        result.imageMimeType ?? null,

      response:
        typeof data === "string"
          ? data
          : JSON.stringify(
              data,
              null,
              2
            ),
    });
  } catch (error) {
    const responseTime =
      Date.now() - startTime;

    const rawMessage =
      error instanceof Error
        ? error.message
        : "AI provider request failed.";

    console.error(
      "AI execution failed:",
      error
    );

    if (connectorId !== null) {
      await logFailedRequest(
        connectorId,
        responseTime,
        rawMessage
      );
    }

    const isTimeout =
      rawMessage
        .toLowerCase()
        .includes("timed out");

    return NextResponse.json(
      {
        success: false,
        data: null,
        error: isTimeout
          ? "The AI provider request timed out. Please try again."
          : "The AI request could not be completed.",
        responseTime,
      },
      {
        status: isTimeout
          ? 504
          : 500,
      }
    );
  }
}