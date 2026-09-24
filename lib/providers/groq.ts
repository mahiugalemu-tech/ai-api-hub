import Groq from "groq-sdk";
import type {
  AIProviderAdapter,
  GenerateRequest,
  GenerateResponse,
} from "./types";
import {
  buildStructuredInstruction,
  hasStructuredSchema,
} from "./structured";

export class GroqAdapter implements AIProviderAdapter {
  private client: Groq;

  constructor() {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      throw new Error("GROQ_API_KEY is not configured");
    }

    this.client = new Groq({
      apiKey,
    });
  }

  async generate(
    request: GenerateRequest
  ): Promise<GenerateResponse> {
    const isVisionModel =
      request.model === "qwen/qwen3.8-27b";

    if (isVisionModel) {
      return this.generateWithVision(request);
    }

    const structured = hasStructuredSchema(
      request.outputSchema
    );

    const completion =
      await this.client.chat.completions.create({
        model: request.model,
        messages: [
          {
            role: "user",
            content: this.buildPrompt(request),
          },
        ],
        ...(structured
          ? {
              response_format: {
                type: "json_object",
              },
            }
          : {}),
      });

    const usage = completion.usage;

    return {
      text:
        completion.choices[0]?.message?.content ?? "",
      inputTokens: usage?.prompt_tokens,
      outputTokens: usage?.completion_tokens,
      totalTokens: usage?.total_tokens,
    };
  }

  private async generateWithVision(
    request: GenerateRequest
  ): Promise<GenerateResponse> {
    const input = request.input as Record<
      string,
      unknown
    >;

    const imageData =
      typeof input.imageData === "string"
        ? input.imageData
        : "";

    const imageMimeType =
      typeof input.imageMimeType === "string"
        ? input.imageMimeType
        : "image/jpeg";

    const userText =
      typeof input.text === "string"
        ? input.text
        : "Analyze this image.";

    if (!imageData) {
      throw new Error(
        "Image data is required for the vision model."
      );
    }

    const structured = hasStructuredSchema(
      request.outputSchema
    );

    const completion =
      await this.client.chat.completions.create({
        model: request.model,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `${request.prompt}

USER REQUEST:
${userText}

${buildStructuredInstruction(
  request.outputSchema
)}`,
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:${imageMimeType};base64,${imageData}`,
                },
              },
            ],
          },
        ],
        ...(structured
          ? {
              response_format: {
                type: "json_object",
              },
            }
          : {}),
      });

    const usage = completion.usage;

    return {
      text:
        completion.choices[0]?.message?.content ?? "",
      inputTokens: usage?.prompt_tokens,
      outputTokens: usage?.completion_tokens,
      totalTokens: usage?.total_tokens,
    };
  }

  private buildPrompt(
    request: GenerateRequest
  ): string {
    return `
${request.prompt}

USER INPUT:
${JSON.stringify(
  request.input,
  null,
  2
)}

${buildStructuredInstruction(
  request.outputSchema
)}
`;
  }
}
