export function hasStructuredSchema(
  schema: unknown
): boolean {
  return (
    schema !== null &&
    typeof schema === "object" &&
    !Array.isArray(schema) &&
    Object.keys(schema as Record<string, unknown>).length > 0
  );
}

export function buildStructuredInstruction(
  outputSchema: unknown
): string {
  if (!hasStructuredSchema(outputSchema)) {
    return "";
  }

  return `
IMPORTANT OUTPUT RULES:
- Return ONLY valid JSON.
- Do not use Markdown code fences.
- Do not add explanations before or after the JSON.
- Follow this configured output structure exactly.

CONFIGURED OUTPUT STRUCTURE:
${JSON.stringify(outputSchema, null, 2)}
`;
}

export function parseStructuredOutput(
  text: string,
  outputSchema: unknown
): unknown {
  if (!hasStructuredSchema(outputSchema)) {
    return text;
  }

  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const firstObject = cleaned.indexOf("{");
    const lastObject = cleaned.lastIndexOf("}");

    if (firstObject !== -1 && lastObject > firstObject) {
      try {
        return JSON.parse(
          cleaned.slice(firstObject, lastObject + 1)
        );
      } catch {
        // Fall through to the final error.
      }
    }

    throw new Error(
      "The AI provider returned invalid JSON for the configured output schema."
    );
  }
}

type InputField = {
  name: string;
  type: string;
  required?: boolean;
  default?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(
    value && typeof value === "object" && !Array.isArray(value)
  );
}

function validateFieldType(
  value: unknown,
  type: string
): boolean {
  switch (type) {
    case "text":
      return typeof value === "string";
    case "number":
      return typeof value === "number" && Number.isFinite(value);
    case "boolean":
      return typeof value === "boolean";
    case "json":
      return (
        value !== undefined &&
        value !== null &&
        (typeof value === "object" ||
          typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean")
      );
    case "image":
    case "file":
      return typeof value === "string" && value.length > 0;
    default:
      return true;
  }
}

export function validateAndNormalizeInput(
  input: unknown,
  inputSchema: unknown
): { valid: true; value: unknown } | { valid: false; error: string } {
  if (!isRecord(inputSchema)) {
    return { valid: true, value: input };
  }

  const fields = Array.isArray(inputSchema.fields)
    ? (inputSchema.fields as InputField[])
    : null;

  // Backward compatibility with the original { input: { type, required } } schema.
  if (!fields) {
    const legacy = isRecord(inputSchema.input)
      ? (inputSchema.input as InputField)
      : null;

    if (!legacy) {
      return { valid: true, value: input };
    }

    // Older connectors use { input: { type, required } } instead of fields[].
    // The Playground sends the request body as { input: <value> } for these
    // connectors, so unwrap that wrapper for scalar legacy inputs.
    let legacyValue = input;

    if (
      isRecord(input) &&
      Object.prototype.hasOwnProperty.call(input, "input") &&
      legacy.type !== "image" &&
      legacy.type !== "file"
    ) {
      legacyValue = input.input;
    }

    // Legacy image connectors use an object containing imageData plus optional
    // text, because the vision adapter needs both pieces of information.
    if (legacy.type === "image" && isRecord(input)) {
      legacyValue = input.imageData;
    }

    if (
      legacy.required !== false &&
      (legacyValue === undefined ||
        legacyValue === null ||
        legacyValue === "")
    ) {
      return {
        valid: false,
        error: "The required input field is missing.",
      };
    }

    if (
      legacyValue !== undefined &&
      !validateFieldType(legacyValue, legacy.type)
    ) {
      return {
        valid: false,
        error: `Input must be of type ${legacy.type}.`,
      };
    }

    return { valid: true, value: legacy.type === "text" || legacy.type === "number" || legacy.type === "boolean" || legacy.type === "json" ? legacyValue : input };
  }

  if (!isRecord(input)) {
    return {
      valid: false,
      error: "Input must be a JSON object matching the connector input schema.",
    };
  }

  const normalized: Record<string, unknown> = { ...input };

  for (const field of fields) {
    if (!field || typeof field.name !== "string" || !field.name.trim()) {
      continue;
    }

    const name = field.name.trim();
    let value = normalized[name];

    if (
      (value === undefined || value === null || value === "") &&
      field.default !== undefined
    ) {
      value = field.default;
      normalized[name] = value;
    }

    if (
      field.required !== false &&
      (value === undefined || value === null || value === "")
    ) {
      return {
        valid: false,
        error: `Missing required input field: ${name}`,
      };
    }

    if (value === undefined || value === null || value === "") {
      continue;
    }

    if (field.type === "json" && typeof value === "string") {
      try {
        value = JSON.parse(value);
        normalized[name] = value;
      } catch {
        return {
          valid: false,
          error: `Field '${name}' must contain valid JSON.`,
        };
      }
    }

    if (!validateFieldType(value, field.type)) {
      return {
        valid: false,
        error: `Field '${name}' must be of type ${field.type}.`,
      };
    }

    if (field.type === "text" && typeof value === "string" && value.length > 100_000) {
      return {
        valid: false,
        error: `Field '${name}' exceeds the 100,000 character limit.`,
      };
    }

    if (field.type === "file" && typeof value === "string" && value.length > 30_000_000) {
      return {
        valid: false,
        error: `File field '${name}' is too large.`,
      };
    }

    if (field.type === "image" && typeof value === "string" && value.length > 30_000_000) {
      return {
        valid: false,
        error: `Image field '${name}' is too large.`,
      };
    }
  }

  return { valid: true, value: normalized };
}
