"use client";

import { useEffect, useState } from "react";

interface ConnectorForEdit {
  id: number;
  name: string;
  description: string | null;
  provider: string;
  model: string;
  prompt?: string;
  inputSchema?: {
    input?: {
      type?: string;
      required?: boolean;
      description?: string;
    };
    fields?: Array<{
      name: string;
      type: string;
      required?: boolean;
      description?: string;
      default?: unknown;
    }>;
  };
  outputSchema?: unknown;
  isActive: boolean;
}

interface NewConnectorModalProps {
  onClose: () => void;
  onCreated: () => void;
  connector?: ConnectorForEdit | null;
}

const providerOptions = [
  {
    value: "gemini",
    label: "Google Gemini",
  },
  {
    value: "groq",
    label: "Groq",
  },
];

const modelOptions = {
  gemini: [
    {
      value: "gemini-2.5-flash",
      label: "Gemini 2.5 Flash",
    },
    {
      value: "gemini-2.5-pro",
      label: "Gemini 2.5 Pro",
    },
  ],

  groq: [
    {
      value: "openai/gpt-oss-120b",
      label: "GPT-OSS 120B",
    },
    {
      value: "openai/gpt-oss-20b",
      label: "GPT-OSS 20B",
    },
    {
      value: "qwen/qwen3.8-27b",
      label: "Qwen 3.8 27B · Vision",
    },
  ],
};

const inputOptions = [
  {
    value: "text",
    label: "Text",
  },
  {
    value: "number",
    label: "Number",
  },
  {
    value: "boolean",
    label: "Boolean",
  },
  {
    value: "image",
    label: "Image",
  },
  {
    value: "file",
    label: "File",
  },
  {
    value: "json",
    label: "JSON",
  },
];

const outputOptions = [
  {
    value: "json",
    label: "Structured JSON",
  },
  {
    value: "text",
    label: "Plain Text",
  },
];

function createSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NewConnectorModal({
  onClose,
  onCreated,
  connector = null,
}: NewConnectorModalProps) {
  const isEditing = Boolean(connector);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [provider, setProvider] = useState("gemini");

  const [model, setModel] = useState("gemini-2.5-flash");

  const [prompt, setPrompt] = useState("");

  const [outputFormat, setOutputFormat] = useState("json");

  const [outputSchemaText, setOutputSchemaText] = useState(
    JSON.stringify(
      {
        result: "string",
      },
      null,
      2
    )
  );

  const [inputFields, setInputFields] = useState([
    {
      name: "input",
      type: "text",
      required: true,
      description: "Primary input for this connector.",
      defaultValue: "",
    },
  ]);

  const [isActive, setIsActive] = useState(true);

  const [creating, setCreating] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!connector) {
      setName("");
      setDescription("");
      setProvider("gemini");
      setModel("gemini-2.5-flash");
      setPrompt("");
      setOutputFormat("json");

      setOutputSchemaText(
        JSON.stringify(
          {
            result: "string",
          },
          null,
          2
        )
      );

      setInputFields([
        {
          name: "input",
          type: "text",
          required: true,
          description: "Primary input for this connector.",
          defaultValue: "",
        },
      ]);

      setIsActive(true);
      setError("");

      return;
    }

    setName(connector.name);
    setDescription(connector.description ?? "");
    setProvider(connector.provider);
    setModel(connector.model);
    setPrompt(connector.prompt ?? "");
    setIsActive(connector.isActive);

    const storedFields = connector.inputSchema?.fields;

    if (
      Array.isArray(storedFields) &&
      storedFields.length > 0
    ) {
      setInputFields(
        storedFields.map((field) => ({
          name: field.name,
          type: field.type || "text",
          required: field.required !== false,
          description: field.description ?? "",
          defaultValue:
            field.default === undefined
              ? ""
              : String(field.default),
        }))
      );
    } else {
      const legacy = connector.inputSchema?.input;

      setInputFields([
        {
          name: "input",
          type: legacy?.type ?? "text",
          required: legacy?.required !== false,
          description:
            legacy?.description ??
            "Primary input for this connector.",
          defaultValue: "",
        },
      ]);
    }

    const output = connector.outputSchema;

    if (
      output &&
      typeof output === "object" &&
      !Array.isArray(output) &&
      Object.keys(
        output as Record<string, unknown>
      ).length > 0
    ) {
      setOutputFormat("json");

      setOutputSchemaText(
        JSON.stringify(output, null, 2)
      );
    } else {
      setOutputFormat("text");

      setOutputSchemaText(
        JSON.stringify(
          {
            result: "string",
          },
          null,
          2
        )
      );
    }

    setError("");
  }, [connector]);

  function handleProviderChange(value: string) {
    setProvider(value);

    if (value === "gemini") {
      setModel("gemini-2.5-flash");
    } else {
      setModel("openai/gpt-oss-120b");
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Connector name is required.");
      return;
    }

    if (!prompt.trim()) {
      setError("Prompt instructions are required.");
      return;
    }

    if (inputFields.length === 0) {
      setError("Add at least one input parameter.");
      return;
    }

    if (
      inputFields.some(
        (field) => !field.name.trim()
      )
    ) {
      setError(
        "Every input parameter needs a name."
      );
      return;
    }

    if (outputFormat === "json") {
      try {
        const parsedSchema =
          JSON.parse(outputSchemaText);

        if (
          !parsedSchema ||
          typeof parsedSchema !== "object" ||
          Array.isArray(parsedSchema)
        ) {
          setError(
            "Output schema must be a JSON object."
          );
          return;
        }
      } catch {
        setError(
          "Output schema contains invalid JSON."
        );
        return;
      }
    }

    setCreating(true);

    try {
      /*
       * IMPORTANT:
       * Explicitly normalize and validate the
       * connector ID before creating the PUT URL.
       */
      const connectorId = connector
        ? Number(connector.id)
        : null;

      if (
        isEditing &&
        (!connectorId ||
          !Number.isInteger(connectorId) ||
          connectorId <= 0)
      ) {
        throw new Error(
          "Unable to determine the connector ID."
        );
      }

      const slug = createSlug(name);

      const payload = {
        name: name.trim(),

        slug,

        description: description.trim(),

        provider,

        model,

        prompt: prompt.trim(),

        inputSchema: {
          fields: inputFields.map((field) => ({
            name: field.name.trim(),
            type: field.type,
            required: field.required,
            description:
              field.description.trim(),
            ...(field.defaultValue.trim()
              ? {
                  default:
                    field.defaultValue.trim(),
                }
              : {}),
          })),
        },

        outputSchema:
          outputFormat === "json"
            ? JSON.parse(outputSchemaText)
            : {},

        authType: "api_key",

        isActive,
      };

      /*
       * CREATE:
       * POST /api/connectors
       *
       * EDIT:
       * PUT /api/connectors/{id}
       */
      const url = isEditing
        ? `/api/connectors/${connectorId}`
        : "/api/connectors";

      const method = isEditing
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            `Failed to ${
              isEditing
                ? "update"
                : "create"
            } connector.`
        );
      }

      onCreated();

      onClose();
    } catch (err) {
      console.error(
        "Failed to save connector:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setCreating(false);
    }
  }

  const availableModels =
    modelOptions[
      provider as keyof typeof modelOptions
    ] ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0a0d15] shadow-2xl shadow-cyan-500/10">
        {/* Glow */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-white/10 px-7 py-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

              <span className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-400">
                AI Infrastructure
              </span>
            </div>

            <h2 className="text-xl font-semibold text-white">
              {isEditing
                ? "Edit Connector"
                : "Create New Connector"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {isEditing
                ? "Update the reusable AI-powered API endpoint."
                : "Configure a reusable AI-powered API endpoint."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-xl text-slate-400 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="relative space-y-6 p-7"
        >
          {/* Name + Description */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Connector Name
              </label>

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="e.g. Article Writer"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Description
              </label>

              <input
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                placeholder="What does this API do?"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
              />
            </div>
          </div>

          {/* Provider + Model */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                AI Provider
              </label>

              <select
                value={provider}
                onChange={(e) =>
                  handleProviderChange(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-white/10 bg-[#0d111b] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50"
              >
                {providerOptions.map(
                  (option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Model
              </label>

              <select
                value={model}
                onChange={(e) => {
                  const nextModel =
                    e.target.value;

                  setModel(nextModel);

                  if (
                    nextModel ===
                    "qwen/qwen3.8-27b"
                  ) {
                    setInputFields(
                      (fields) => {
                        if (
                          fields.length === 1
                        ) {
                          return [
                            {
                              ...fields[0],
                              type: "image",
                            },
                          ];
                        }

                        return fields;
                      }
                    );

                    setOutputFormat("json");
                  }
                }}
                className="w-full rounded-xl border border-white/10 bg-[#0d111b] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50"
              >
                {availableModels.map(
                  (option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  )
                )}
              </select>

              {model ===
                "qwen/qwen3.8-27b" && (
                <p className="mt-2 text-xs text-cyan-400/80">
                  Vision model • accepts
                  image + text input
                </p>
              )}
            </div>
          </div>

          {/* Prompt */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              System Prompt / Instructions
            </label>

            <textarea
              value={prompt}
              onChange={(e) =>
                setPrompt(e.target.value)
              }
              rows={6}
              placeholder="Tell the AI exactly what this connector should do..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
            />

            <p className="mt-2 text-xs text-slate-500">
              These instructions are combined
              with the user's runtime input when
              the API is called.
            </p>
          </div>

          {/* Dynamic Input Parameters */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-white">
                  Input Parameters
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Define the fields this generated
                  API accepts. Each field can be
                  required or optional.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setInputFields(
                    (fields) => [
                      ...fields,
                      {
                        name: `field${
                          fields.length + 1
                        }`,
                        type: "text",
                        required: false,
                        description: "",
                        defaultValue: "",
                      },
                    ]
                  )
                }
                className="shrink-0 rounded-lg border border-cyan-400/20 bg-cyan-400/[0.07] px-3 py-2 text-xs font-medium text-cyan-300 hover:bg-cyan-400/[0.12]"
              >
                + Add Field
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {inputFields.map(
                (field, index) => (
                  <div
                    key={`${field.name}-${index}`}
                    className="rounded-xl border border-white/[0.07] bg-black/20 p-4"
                  >
                    <div className="grid gap-3 md:grid-cols-[1.2fr_1fr_1.5fr_auto]">
                      <input
                        value={field.name}
                        onChange={(e) =>
                          setInputFields(
                            (fields) =>
                              fields.map(
                                (
                                  item,
                                  itemIndex
                                ) =>
                                  itemIndex ===
                                  index
                                    ? {
                                        ...item,
                                        name: e
                                          .target
                                          .value,
                                      }
                                    : item
                              )
                          )
                        }
                        placeholder="Field name"
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
                      />

                      <select
                        value={field.type}
                        onChange={(e) =>
                          setInputFields(
                            (fields) =>
                              fields.map(
                                (
                                  item,
                                  itemIndex
                                ) =>
                                  itemIndex ===
                                  index
                                    ? {
                                        ...item,
                                        type: e
                                          .target
                                          .value,
                                      }
                                    : item
                              )
                          )
                        }
                        className="rounded-lg border border-white/10 bg-[#0d111b] px-3 py-2.5 text-xs text-white outline-none focus:border-cyan-400/40"
                      >
                        {inputOptions.map(
                          (option) => (
                            <option
                              key={
                                option.value
                              }
                              value={
                                option.value
                              }
                            >
                              {option.label}
                            </option>
                          )
                        )}
                      </select>

                      <input
                        value={
                          field.description
                        }
                        onChange={(e) =>
                          setInputFields(
                            (fields) =>
                              fields.map(
                                (
                                  item,
                                  itemIndex
                                ) =>
                                  itemIndex ===
                                  index
                                    ? {
                                        ...item,
                                        description:
                                          e
                                            .target
                                            .value,
                                      }
                                    : item
                              )
                          )
                        }
                        placeholder="Description / validation hint"
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
                      />

                      <button
                        type="button"
                        disabled={
                          inputFields.length ===
                          1
                        }
                        onClick={() =>
                          setInputFields(
                            (fields) =>
                              fields.filter(
                                (
                                  _,
                                  itemIndex
                                ) =>
                                  itemIndex !==
                                  index
                              )
                          )
                        }
                        className="rounded-lg border border-red-400/10 px-3 py-2 text-xs text-red-300 hover:bg-red-400/[0.06] disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <label className="flex items-center gap-2 text-xs text-slate-400">
                        <input
                          type="checkbox"
                          checked={
                            field.required
                          }
                          onChange={(e) =>
                            setInputFields(
                              (fields) =>
                                fields.map(
                                  (
                                    item,
                                    itemIndex
                                  ) =>
                                    itemIndex ===
                                    index
                                      ? {
                                          ...item,
                                          required:
                                            e
                                              .target
                                              .checked,
                                        }
                                      : item
                                )
                            )
                          }
                          className="accent-cyan-400"
                        />

                        Required
                      </label>

                      <input
                        value={
                          field.defaultValue
                        }
                        onChange={(e) =>
                          setInputFields(
                            (fields) =>
                              fields.map(
                                (
                                  item,
                                  itemIndex
                                ) =>
                                  itemIndex ===
                                  index
                                    ? {
                                        ...item,
                                        defaultValue:
                                          e
                                            .target
                                            .value,
                                      }
                                    : item
                              )
                          )
                        }
                        placeholder="Optional default value"
                        className="min-w-48 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/40"
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Output Schema */}
          <div className="rounded-2xl border border-violet-400/10 bg-violet-400/[0.025] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-white">
                  Output Schema
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Define the JSON structure the AI
                  must return. This schema is stored
                  with the connector and used by the
                  provider adapter.
                </p>
              </div>

              <select
                value={outputFormat}
                onChange={(e) =>
                  setOutputFormat(
                    e.target.value
                  )
                }
                className="rounded-lg border border-white/10 bg-[#0d111b] px-3 py-2 text-xs text-white outline-none focus:border-violet-400/40"
              >
                {outputOptions.map(
                  (option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  )
                )}
              </select>
            </div>

            {outputFormat === "json" ? (
              <>
                <textarea
                  value={outputSchemaText}
                  onChange={(e) =>
                    setOutputSchemaText(
                      e.target.value
                    )
                  }
                  rows={12}
                  spellCheck={false}
                  className="mt-4 w-full resize-y rounded-xl border border-white/10 bg-[#080b12] p-4 font-mono text-xs leading-6 text-violet-100 outline-none placeholder:text-slate-700 focus:border-violet-400/40"
                  placeholder={
                    '{\n  "title": "string",\n  "summary": "string"\n}'
                  }
                />

                <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-slate-500">
                  <span className="rounded-md border border-white/[0.07] px-2 py-1">
                    JSON object required
                  </span>

                  <span className="rounded-md border border-white/[0.07] px-2 py-1">
                    Used for structured
                    responses
                  </span>

                  <span className="rounded-md border border-white/[0.07] px-2 py-1">
                    Invalid JSON is rejected
                    before creation
                  </span>
                </div>
              </>
            ) : (
              <p className="mt-4 rounded-xl border border-white/[0.07] bg-black/20 p-4 text-xs text-slate-500">
                Plain Text connectors return
                provider text instead of a JSON
                schema. Structured JSON is
                recommended for the assignment
                connectors.
              </p>
            )}
          </div>

          {/* Authentication */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">
                  API Authentication
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Generated endpoints will require
                  API-key authentication.
                </p>
              </div>

              <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-3 py-2 text-xs font-medium text-cyan-300">
                API Key
              </div>
            </div>
          </div>

          {/* Active */}
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div>
              <p className="text-sm font-medium text-white">
                Connector Status
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {isActive
                  ? "This connector is available for API requests."
                  : "This connector is disabled and cannot receive requests."}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setIsActive(
                  (current) => !current
                )
              }
              className={`relative h-7 w-12 rounded-full transition ${
                isActive
                  ? "bg-cyan-400/80"
                  : "bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                  isActive
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={creating}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={creating}
              className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {creating
                ? isEditing
                  ? "Saving..."
                  : "Creating..."
                : isEditing
                  ? "Save Changes"
                  : "Create Connector"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}