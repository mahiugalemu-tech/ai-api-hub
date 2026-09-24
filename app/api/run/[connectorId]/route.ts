import { NextResponse } from "next/server";
import { db } from "../../../../src/prisma/db";
import { GeminiAdapter } from "../../../../lib/providers/gemini";
import { GroqAdapter } from "../../../../lib/providers/groq";
import {
  parseStructuredOutput,
  validateAndNormalizeInput,
} from "../../../../lib/providers/structured";

interface RouteContext {
  params: Promise<{
    connectorId: string;
  }>;
}

function getApiKey(request: Request): string | null {
  const xApiKey = request.headers.get("x-api-key");

  if (xApiKey) {
    return xApiKey.trim();
  }

  const authorization = request.headers.get("authorization");

  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice(7).trim();
  }

  return null;
}

export async function POST(
  request: Request,
  context: RouteContext
) {
  const startTime = Date.now();

  let connectorId: number | null = null;

  try {
    const { connectorId: connectorIdParam } =
      await context.params;

    const id = Number(connectorIdParam);

    if (!Number.isInteger(id)) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Invalid connector ID",
        },
        { status: 400 }
      );
    }

    connectorId = id;

    const configuredApiKey =
      process.env.AI_API_HUB_KEY;

    if (!configuredApiKey) {
      console.error(
        "AI_API_HUB_KEY is not configured"
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

    const providedApiKey = getApiKey(request);

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
          error: "Missing required field: input",
        },
        { status: 400 }
      );
    }

    const requestBody = body as {
      input: unknown;
    };

    const contentLength = request.headers.get("content-length");
    if (contentLength && Number(contentLength) > 30 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Request payload is too large. Maximum size is 30 MB.",
        },
        { status: 413 }
      );
    }

    const connectors =
      await db.orm.public.Connector.all();

    const connector = connectors.find(
      (item) => item.id === id
    );

    if (!connector) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: "Connector not found",
        },
        { status: 404 }
      );
    }

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

    const normalizedInput = validateAndNormalizeInput(
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

    const isVisionModel =
      connector.provider === "groq" &&
      connector.model === "qwen/qwen3.8-27b";

    if (isVisionModel) {
      if (
        !requestBody.input ||
        typeof requestBody.input !== "object" ||
        typeof (
          requestBody.input as Record<string, unknown>
        ).imageData !== "string" ||
        !(
          requestBody.input as Record<string, unknown>
        ).imageData
      ) {
        return NextResponse.json(
          {
            success: false,
            data: null,
            error:
              "Image data is required for the Image Analyzer.",
          },
          { status: 400 }
        );
      }
    }

    let adapter;

    if (connector.provider === "gemini") {
      adapter = new GeminiAdapter();
    } else if (connector.provider === "groq") {
      adapter = new GroqAdapter();
    } else {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: `Unsupported AI provider: ${connector.provider}`,
        },
        { status: 400 }
      );
    }

    const result = await adapter.generate({
      model: connector.model,
      prompt: connector.prompt,
      input: normalizedInput.value,
      outputSchema: connector.outputSchema,
    });

    const responseTime = Date.now() - startTime;

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

      try {
        await db.orm.public.ApiRequest.create({
          connectorId: connector.id,
          status: "failed",
          responseTime,
          inputTokens: result.inputTokens,
          outputTokens: result.outputTokens,
          errorMessage,
        });
      } catch (loggingError) {
        console.error(
          "Failed to log structured-output failure:",
          loggingError
        );
      }

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

    await db.orm.public.ApiRequest.create({
      connectorId: connector.id,
      status: "success",
      responseTime,
      inputTokens: result.inputTokens,
      outputTokens: result.outputTokens,
    });

    return NextResponse.json({
      success: true,

      // Assignment-required predictable response.
      data,

      error: null,

      connector: connector.name,
      provider: connector.provider,
      model: connector.model,

      usage: {
        inputTokens: result.inputTokens,
        outputTokens: result.outputTokens,
        totalTokens: result.totalTokens,
      },

      responseTime,

      imageData: result.imageData ?? null,
      imageMimeType: result.imageMimeType ?? null,

      // Kept temporarily so the existing Playground
      // can continue displaying the response.
      response:
        typeof data === "string"
          ? data
          : JSON.stringify(data, null, 2),
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;

    const errorMessage =
      error instanceof Error
        ? error.message
        : "AI provider request failed";

    console.error(
      "AI execution failed:",
      error
    );

    if (connectorId !== null) {
      try {
        await db.orm.public.ApiRequest.create({
          connectorId,
          status: "failed",
          responseTime,
          errorMessage,
        });
      } catch (loggingError) {
        console.error(
          "Failed to log failed API request:",
          loggingError
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        data: null,
        error:
          "The AI request could not be completed.",
        responseTime,
      },
      { status: 500 }
    );
  }
}
