export type AIProvider = "gemini" | "groq";

export interface GenerateRequest {
  model: string;
  prompt: string;
  input: unknown;
  outputSchema?: unknown;
}

export interface GenerateResponse {
  text: string;
  imageData?: string;
  imageMimeType?: string;
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
}

export interface AIProviderAdapter {
  generate(request: GenerateRequest): Promise<GenerateResponse>;
}