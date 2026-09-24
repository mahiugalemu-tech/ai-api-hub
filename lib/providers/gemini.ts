import { GoogleGenAI } from "@google/genai";
import type {
  AIProviderAdapter,
  GenerateRequest,
  GenerateResponse,
} from "./types";

export class GeminiAdapter implements AIProviderAdapter {
  private client: GoogleGenAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    this.client = new GoogleGenAI({
      apiKey,
    });
  }

  async generate(request: GenerateRequest): Promise<GenerateResponse> {
    const isImageModel = request.model.includes("image");

    const response = await this.client.models.generateContent({
      model: request.model,
      contents: this.buildPrompt(request),

      ...(isImageModel
        ? {
            config: {
              responseModalities: ["TEXT", "IMAGE"],
            },
          }
        : {}),
    });

    let text = response.text ?? "";
    let imageData: string | undefined;
    let imageMimeType: string | undefined;

    // Image models return image data inside inlineData.
    for (const candidate of response.candidates ?? []) {
      for (const part of candidate.content?.parts ?? []) {
        if (part.text && !text) {
          text = part.text;
        }

        if (part.inlineData?.data) {
          imageData = part.inlineData.data;
          imageMimeType = part.inlineData.mimeType ?? "image/png";
        }
      }
    }

    return {
      text,
      imageData,
      imageMimeType,
      inputTokens: response.usageMetadata?.promptTokenCount,
      outputTokens: response.usageMetadata?.candidatesTokenCount,
      totalTokens: response.usageMetadata?.totalTokenCount,
    };
  }

  private buildPrompt(request: GenerateRequest): string {
    return `
${request.prompt}

USER INPUT:
${JSON.stringify(request.input, null, 2)}

OUTPUT REQUIREMENTS:
Return the result according to the configured output schema.

${
  request.outputSchema
    ? `OUTPUT SCHEMA:
${JSON.stringify(request.outputSchema, null, 2)}`
    : ""
}
`;
  }
}