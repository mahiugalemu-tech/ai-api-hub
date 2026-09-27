type TokenPricing = {
  inputPerMillion: number;
  outputPerMillion: number;
};

type PricingEntry = {
  provider: string;
  model: string;
  pricing: TokenPricing;
};

const PRICING: PricingEntry[] = [
  {
    provider: "gemini",
    model: "gemini-2.5-flash",
    pricing: {
      inputPerMillion: 0.3,
      outputPerMillion: 2.5,
    },
  },
  {
    provider: "gemini",
    model: "gemini-2.5-flash-lite",
    pricing: {
      inputPerMillion: 0.1,
      outputPerMillion: 0.4,
    },
  },
  {
    provider: "groq",
    model: "openai/gpt-oss-120b",
    pricing: {
      inputPerMillion: 0.15,
      outputPerMillion: 0.6,
    },
  },
  {
    provider: "groq",
    model: "openai/gpt-oss-20b",
    pricing: {
      inputPerMillion: 0.075,
      outputPerMillion: 0.3,
    },
  },
  {
    provider: "groq",
    model: "qwen/qwen3.8-27b",
    pricing: {
      inputPerMillion: 0.8,
      outputPerMillion: 4,
    },
  },
];

export function estimateTokenCost(
  provider: string,
  model: string,
  inputTokens?: number,
  outputTokens?: number
): number | null {
  if (
    inputTokens === undefined &&
    outputTokens === undefined
  ) {
    return null;
  }

  const entry = PRICING.find(
    (item) =>
      item.provider.toLowerCase() ===
        provider.trim().toLowerCase() &&
      item.model === model.trim()
  );

  if (!entry) {
    return null;
  }

  const inputCost =
    ((inputTokens ?? 0) / 1_000_000) *
    entry.pricing.inputPerMillion;

  const outputCost =
    ((outputTokens ?? 0) / 1_000_000) *
    entry.pricing.outputPerMillion;

  return Number(
    (inputCost + outputCost).toFixed(8)
  );
}