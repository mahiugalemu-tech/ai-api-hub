"use client";

import React from "react";
import NewConnectorModal from "../components/NewConnectorModal";

const navigation = [
  { name: "Overview", icon: "◈" },
  { name: "Connectors", icon: "◇" },
  { name: "API Playground", icon: "⌁" },
  { name: "Documentation", icon: "▤" },
  { name: "Analytics", icon: "▥" },
];

function getGeneratedText(data: unknown): string {
  if (!data || typeof data !== "object") {
    return String(data ?? "");
  }

  const payload = data as Record<string, unknown>;
  let response = payload.response;

  if (typeof response === "string") {
    try {
      response = JSON.parse(response);
    } catch {
      // The provider returned plain text.
    }
  }

  if (response && typeof response === "object") {
    const result = (response as Record<string, unknown>).result;
    if (typeof result === "string") {
      return result;
    }
  }

  if (typeof response === "string") {
    return response;
  }

  return JSON.stringify(response ?? data, null, 2);
}

function getGeneratedImage(data: unknown): {
  imageData: string;
  imageMimeType: string;
} | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  const payload = data as Record<string, unknown>;

  if (
    typeof payload.imageData === "string" &&
    payload.imageData.length > 0
  ) {
    return {
      imageData: payload.imageData,
      imageMimeType:
        typeof payload.imageMimeType === "string"
          ? payload.imageMimeType
          : "image/png",
    };
  }

  return null;
}

function renderContentBlock(content: string) {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return null;
  }

  const elements: React.ReactNode[] = [];
  let paragraphLines: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length === 0) return;

    elements.push(
      <p
        key={`paragraph-${elements.length}`}
        className="text-sm leading-7 text-slate-200"
      >
        {paragraphLines.join(" ")}
      </p>
    );

    paragraphLines = [];
  };

  lines.forEach((line) => {
    const numberedMatch = line.match(/^(\d+)\.\s+(.+)$/);
    const bulletMatch = line.match(/^[-•]\s+(.+)$/);

    if (numberedMatch) {
      flushParagraph();

      elements.push(
        <div
          key={`number-${elements.length}`}
          className="pt-2"
        >
          <h6 className="text-sm font-semibold text-white">
            {numberedMatch[1]}. {numberedMatch[2]}
          </h6>
        </div>
      );
      return;
    }

    if (bulletMatch) {
      flushParagraph();

      elements.push(
        <div
          key={`bullet-${elements.length}`}
          className="flex gap-3 text-sm leading-7 text-slate-200"
        >
          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
          <span>{bulletMatch[1]}</span>
        </div>
      );
      return;
    }

    paragraphLines.push(line);
  });

  flushParagraph();

  return <div className="space-y-3">{elements}</div>;
}

function renderStructuredValue(
  value: unknown,
  level = 0
): React.ReactNode {
  if (value === null || value === undefined) {
    return <span className="text-slate-500">—</span>;
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return (
      <span className="text-sm leading-6 text-slate-200">
        {String(value)}
      </span>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className="space-y-2">
        {value.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3"
          >
            {typeof item === "object" && item !== null ? (
              renderStructuredValue(item, level + 1)
            ) : (
              <div className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                {renderStructuredValue(item, level + 1)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);

    return (
      <div className="space-y-3">
        {entries.map(([key, item]) => (
          <div
            key={key}
            className={
              level === 0
                ? "border-b border-white/[0.06] pb-4 last:border-b-0 last:pb-0"
                : "rounded-lg border border-white/[0.06] bg-white/[0.02] p-4"
            }
          >
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.16em] text-cyan-400">
              {key.replace(/_/g, " ")}
            </p>

            {renderStructuredValue(item, level + 1)}
          </div>
        ))}
      </div>
    );
  }

  return null;
}

function renderGeneratedText(text: string) {
  // Automatically format valid JSON as a structured data card.
  try {
    const parsed = JSON.parse(text);

    if (parsed !== null && typeof parsed === "object") {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div>
              <p className="text-sm font-semibold text-white">
                Extracted Information
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Structured data returned by the AI
              </p>
            </div>

            <span className="rounded-full border border-cyan-400/10 bg-cyan-400/[0.06] px-2.5 py-1 text-[10px] uppercase tracking-wider text-cyan-300">
              JSON
            </span>
          </div>

          {renderStructuredValue(parsed)}
        </div>
      );
    }
  } catch {
    // Not JSON, so continue with normal text formatting.
  }

  const sections = [
    "Title",
    "Introduction",
    "Main Content",
    "Conclusion",
    "Main Topic",
    "Sentiment",
    "Key Points",
    "Summary",
  ];

  const escapedSections = sections.map((section) =>
    section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );

  const sectionPattern = new RegExp(
    `(?:^|\\n)(${escapedSections.join("|")}):\\s*`,
    "gi"
  );

  const matches = [...text.matchAll(sectionPattern)];

  if (matches.length === 0) {
    return (
      <div className="text-sm leading-7 text-slate-200">
        {renderContentBlock(text)}
      </div>
    );
  }

  const parts: { title: string; content: string }[] = [];

  matches.forEach((match, index) => {
    const title = match[1];
    const start = (match.index ?? 0) + match[0].length;
    const end =
      index + 1 < matches.length
        ? matches[index + 1].index ?? text.length
        : text.length;

    const content = text.slice(start, end).trim();

    if (content) {
      parts.push({ title, content });
    }
  });

  const isArticle =
    parts.some((part) => part.title.toLowerCase() === "title") ||
    parts.some((part) => part.title.toLowerCase() === "main content");

  return (
    <div className="space-y-7">
      {parts.map((part, index) => {
        const normalizedTitle = part.title.toLowerCase();

        if (normalizedTitle === "title") {
          return (
            <div
              key={`${part.title}-${index}`}
              className="border-b border-white/[0.06] pb-5"
            >
              <h4 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                {part.content}
              </h4>
            </div>
          );
        }

        return (
          <section key={`${part.title}-${index}`} className="space-y-3">
            <h5 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
              {part.title}
            </h5>

            {isArticle && normalizedTitle === "main content" ? (
              renderContentBlock(part.content)
            ) : normalizedTitle === "key points" ? (
              renderContentBlock(part.content)
            ) : (
              <div className="text-sm leading-7 text-slate-200">
                {renderContentBlock(part.content)}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}


function getProviderStyle(provider: string) {
  const normalized = provider.toLowerCase();

  if (normalized === "gemini") {
    return {
      label: "GEMINI",
      icon: "◉",
      className:
        "border-blue-400/20 bg-blue-400/[0.08] text-blue-300",
    };
  }

  if (normalized === "groq") {
    return {
      label: "GROQ",
      icon: "✦",
      className:
        "border-violet-400/20 bg-violet-400/[0.08] text-violet-300",
    };
  }

  return {
    label: provider.toUpperCase(),
    icon: "◇",
    className:
      "border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300",
  };
}

type Connector = {
  id: number;
  name: string;
  description: string | null;
  provider: string;
  model: string;
  prompt?: string;
  slug?: string;
  authType?: string;
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
    [key: string]: unknown;
  };
  outputSchema?: unknown;
  isActive: boolean;
};

type DashboardStats = {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  successRate: number;
  averageResponseTime: number;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
};


type AnalyticsData = {
  summary: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    successRate: number;
    averageResponseTime: number;
    totalTokens: number;
  };
  connectors: Array<{
    connectorId: number;
    name: string;
    provider: string;
    model: string;
    requests: number;
    successful: number;
    failed: number;
    averageResponseTime: number;
  }>;
  providers: Array<{
    provider: string;
    requests: number;
    successful: number;
    failed: number;
  }>;
  hourlyActivity: Array<{
    label: string;
    count: number;
  }>;
  recentRequests: Array<{
    id: number;
    connector: string;
    provider: string;
    model: string;
    status: string;
    responseTime: number | null;
    inputTokens: number | null;
    outputTokens: number | null;
    createdAt: string;
    errorMessage: string | null;
  }>;
};

function AnalyticsView({
  data,
  loading,
  onRefresh,
}: {
  data: AnalyticsData | null;
  loading: boolean;
  onRefresh: () => void;
}) {
  const maxActivity = Math.max(
    1,
    ...(data?.hourlyActivity.map(
      (item) => item.count
    ) ?? [1])
  );

  return (
    <section className="mx-auto max-w-[1500px] px-6 py-8 lg:px-10 lg:py-10">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-300">
              Observability
            </span>
          </div>

          <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            API{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
              Analytics
            </span>
          </h3>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Real request, performance, provider and token
            metrics from your Neon database.
          </p>
        </div>

        <button
          onClick={onRefresh}
          disabled={loading}
          className="rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2.5 text-xs font-medium text-cyan-300 transition hover:bg-cyan-400/[0.12] disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "↻ Refresh Data"}
        </button>
      </div>

      {loading && !data ? (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-10 text-center text-sm text-slate-500">
          Loading analytics...
        </div>
      ) : !data ? (
        <div className="rounded-2xl border border-red-400/10 bg-red-400/[0.03] p-10 text-center text-sm text-red-300">
          Analytics data could not be loaded.
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              [
                data.summary.totalRequests.toLocaleString(),
                "Total Requests",
                "All recorded API calls",
              ],
              [
                `${data.summary.successRate.toFixed(1)}%`,
                "Success Rate",
                `${data.summary.failedRequests} failed`,
              ],
              [
                `${data.summary.averageResponseTime.toLocaleString()}ms`,
                "Avg. Response",
                "Recorded response times",
              ],
              [
                data.summary.totalTokens.toLocaleString(),
                "Total Tokens",
                "Input + output tokens",
              ],
            ].map(([value, label, sub]) => (
              <div
                key={label}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:-translate-y-0.5 hover:border-cyan-400/20"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/[0.04] blur-2xl" />
                <p className="text-xs text-slate-500">
                  {label}
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-tight">
                  {value}
                </p>
                <p className="mt-2 text-[11px] text-slate-600">
                  {sub}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold">
                    Request Activity
                  </h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Requests recorded over the last 24 hours
                  </p>
                </div>
                <span className="rounded-lg border border-white/[0.07] px-2.5 py-1 text-[10px] text-slate-500">
                  24H
                </span>
              </div>

              <div className="mt-8 flex h-44 items-end gap-1.5">
                {data.hourlyActivity.map(
                  (item, index) => {
                    const height =
                      item.count === 0
                        ? 3
                        : Math.max(
                            8,
                            (item.count /
                              maxActivity) *
                              100
                          );

                    return (
                      <div
                        key={`${item.label}-${index}`}
                        className="group relative flex h-full flex-1 items-end"
                        title={`${item.label}: ${item.count} request${item.count === 1 ? "" : "s"}`}
                      >
                        <div
                          className="w-full rounded-t-md bg-gradient-to-t from-cyan-400/10 to-cyan-400/60 transition group-hover:from-cyan-400/20 group-hover:to-cyan-300/80"
                          style={{
                            height: `${height}%`,
                          }}
                        />
                      </div>
                    );
                  }
                )}
              </div>

              <div className="mt-3 flex justify-between text-[9px] text-slate-700">
                <span>
                  {data.hourlyActivity[0]?.label}
                </span>
                <span>
                  {data.hourlyActivity[
                    data.hourlyActivity.length - 1
                  ]?.label}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
              <h4 className="text-sm font-semibold">
                Provider Usage
              </h4>
              <p className="mt-1 text-xs text-slate-600">
                Requests by AI provider
              </p>

              <div className="mt-6 space-y-5">
                {data.providers.length === 0 ? (
                  <p className="text-xs text-slate-600">
                    No provider activity yet.
                  </p>
                ) : (
                  data.providers.map((provider) => {
                    const percentage =
                      data.summary.totalRequests ===
                      0
                        ? 0
                        : (provider.requests /
                            data.summary
                              .totalRequests) *
                          100;

                    return (
                      <div key={provider.provider}>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-medium text-slate-300">
                            {provider.provider.toUpperCase()}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {provider.requests}
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>

                        <p className="mt-2 text-[10px] text-slate-600">
                          {provider.successful} successful ·{" "}
                          {provider.failed} failed
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
            <div className="mb-5">
              <h4 className="text-sm font-semibold">
                Connector Performance
              </h4>
              <p className="mt-1 text-xs text-slate-600">
                Request volume and response performance per connector
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left">
                <thead>
                  <tr className="border-b border-white/[0.06] text-[10px] uppercase tracking-[0.14em] text-slate-600">
                    <th className="pb-3 pr-4">Connector</th>
                    <th className="pb-3 pr-4">Provider</th>
                    <th className="pb-3 pr-4">Requests</th>
                    <th className="pb-3 pr-4">Success</th>
                    <th className="pb-3 pr-4">Failed</th>
                    <th className="pb-3">Avg. Response</th>
                  </tr>
                </thead>

                <tbody>
                  {data.connectors.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-8 text-center text-xs text-slate-600"
                      >
                        No connector requests recorded yet.
                      </td>
                    </tr>
                  ) : (
                    data.connectors.map((connector) => (
                      <tr
                        key={connector.connectorId}
                        className="border-b border-white/[0.04] last:border-0"
                      >
                        <td className="py-4 pr-4">
                          <p className="text-xs font-medium text-slate-200">
                            {connector.name}
                          </p>
                          <p className="mt-1 text-[10px] text-slate-600">
                            {connector.model}
                          </p>
                        </td>
                        <td className="py-4 pr-4 text-xs text-slate-400">
                          {connector.provider}
                        </td>
                        <td className="py-4 pr-4 text-xs text-slate-300">
                          {connector.requests}
                        </td>
                        <td className="py-4 pr-4 text-xs text-emerald-400">
                          {connector.successful}
                        </td>
                        <td className="py-4 pr-4 text-xs text-red-300">
                          {connector.failed}
                        </td>
                        <td className="py-4 text-xs text-slate-300">
                          {connector.averageResponseTime}ms
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
            <div className="mb-5">
              <h4 className="text-sm font-semibold">
                Recent API Requests
              </h4>
              <p className="mt-1 text-xs text-slate-600">
                Latest requests stored in your database
              </p>
            </div>

            <div className="space-y-2">
              {data.recentRequests.length === 0 ? (
                <p className="py-8 text-center text-xs text-slate-600">
                  No requests recorded yet.
                </p>
              ) : (
                data.recentRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex flex-col gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium text-slate-200">
                          {request.connector}
                        </span>
                        <span className="rounded-full border border-violet-400/10 bg-violet-400/[0.04] px-2 py-0.5 text-[9px] text-violet-300">
                          {request.provider}
                        </span>
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[9px] ${
                            request.status === "success"
                              ? "border-emerald-400/10 bg-emerald-400/[0.04] text-emerald-300"
                              : "border-red-400/10 bg-red-400/[0.04] text-red-300"
                          }`}
                        >
                          {request.status}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-[10px] text-slate-600">
                        {request.model}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-5 text-[10px] text-slate-500">
                      <span>
                        {request.responseTime ?? 0}ms
                      </span>
                      <span>
                        {(request.inputTokens ?? 0) +
                          (request.outputTokens ?? 0)}{" "}
                        tokens
                      </span>
                      <span className="hidden sm:inline">
                        {new Date(
                          request.createdAt
                        ).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}


function DocumentationView({
  connectors,
}: {
  connectors: Connector[];
}) {
  const [selectedId, setSelectedId] = React.useState<number | null>(
    connectors[0]?.id ?? null
  );

  React.useEffect(() => {
    if (
      selectedId === null &&
      connectors.length > 0
    ) {
      setSelectedId(connectors[0].id);
    }
  }, [connectors, selectedId]);

  const selectedConnector =
    connectors.find(
      (connector) => connector.id === selectedId
    ) ?? connectors[0];

  const inputType =
    selectedConnector?.inputSchema?.input?.type ??
    "text";

  const isImageInput =
    inputType === "image" ||
    selectedConnector?.name
      .toLowerCase()
      .includes("image");

  const exampleInput = isImageInput
    ? {
        imageData:
          "<BASE64_IMAGE_DATA>",
        imageMimeType: "image/jpeg",
        text: "Analyze this image.",
      }
    : {
        input: "Your input text here",
      };

  const exampleResponse = {
    success: true,
    connector:
      selectedConnector?.name ?? "Connector",
    provider:
      selectedConnector?.provider ?? "provider",
    model:
      selectedConnector?.model ?? "model",
    response: "AI-generated result",
    usage: {
      inputTokens: 120,
      outputTokens: 80,
      totalTokens: 200,
    },
    responseTime: 1200,
  };

  const requestBody = JSON.stringify(
    exampleInput,
    null,
    2
  );

  const responseBody = JSON.stringify(
    exampleResponse,
    null,
    2
  );

  const curlBody = JSON.stringify(
    exampleInput
  ).replace(/'/g, "'\\''");

  if (connectors.length === 0) {
    return (
      <section className="mx-auto max-w-[1500px] px-6 py-8 lg:px-10 lg:py-10">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-10 text-center">
          <p className="text-sm text-slate-400">
            No connectors are available yet.
          </p>
          <p className="mt-2 text-xs text-slate-600">
            Create a connector to generate its API documentation.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1500px] px-6 py-8 lg:px-10 lg:py-10">
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-300">
            Developer Docs
          </span>
        </div>

        <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          API{" "}
          <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
            Documentation
          </span>
        </h3>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
          Auto-generated reference for every AI connector,
          including request formats, examples, provider details
          and endpoint information.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[270px_minmax(0,1fr)]">
        {/* Connector selector */}
        <aside className="h-fit rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3">
          <div className="px-3 pb-3 pt-2">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-600">
              Connectors
            </p>
          </div>

          <div className="space-y-1">
            {connectors.map((connector) => {
              const active =
                connector.id ===
                selectedConnector?.id;

              return (
                <button
                  key={connector.id}
                  onClick={() =>
                    setSelectedId(connector.id)
                  }
                  className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                    active
                      ? "border-cyan-400/15 bg-cyan-400/[0.08]"
                      : "border-transparent hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        connector.isActive
                          ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                          : "bg-slate-600"
                      }`}
                    />
                    <span
                      className={`truncate text-xs font-medium ${
                        active
                          ? "text-cyan-300"
                          : "text-slate-300"
                      }`}
                    >
                      {connector.name}
                    </span>
                  </div>

                  <p className="mt-1 truncate pl-3.5 text-[10px] text-slate-600">
                    {connector.provider} · {connector.model}
                  </p>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Documentation */}
        <div className="min-w-0 space-y-5">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-cyan-400/15 bg-cyan-400/[0.06] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-300">
                    POST
                  </span>
                  <code className="break-all text-xs text-slate-300">
                    /api/run/{selectedConnector?.id}
                  </code>
                </div>

                <h4 className="mt-4 text-xl font-semibold">
                  {selectedConnector?.name}
                </h4>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                  {selectedConnector?.description ||
                    "Reusable AI-powered API connector."}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-medium ${
                  selectedConnector?.isActive
                    ? "border-emerald-400/10 bg-emerald-400/[0.05] text-emerald-300"
                    : "border-red-400/10 bg-red-400/[0.05] text-red-300"
                }`}
              >
                {selectedConnector?.isActive
                  ? "ACTIVE"
                  : "DISABLED"}
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/[0.06] bg-black/20 p-4">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-600">
                  Provider
                </p>
                <p className="mt-2 text-sm font-medium text-slate-200">
                  {selectedConnector?.provider}
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-black/20 p-4">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-600">
                  Model
                </p>
                <p className="mt-2 break-all text-sm font-medium text-slate-200">
                  {selectedConnector?.model}
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-black/20 p-4">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-600">
                  Input Type
                </p>
                <p className="mt-2 text-sm font-medium text-slate-200">
                  {inputType}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
            <h4 className="text-sm font-semibold">
              Authentication
            </h4>

            <div className="mt-4 rounded-xl border border-amber-400/10 bg-amber-400/[0.03] p-4">
              <p className="text-xs font-medium text-amber-300">
                Current implementation
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                This local endpoint currently does not enforce
                an API key. Generated endpoint authentication is
                the next security step before production
                deployment.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-semibold">
                  Request
                </h4>
                <p className="mt-1 text-xs text-slate-600">
                  Send JSON to the connector endpoint.
                </p>
              </div>

              <span className="rounded-lg border border-white/[0.07] px-2.5 py-1 text-[10px] text-slate-500">
                application/json
              </span>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <div>
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-600">
                  Parameters
                </p>

                <div className="overflow-hidden rounded-xl border border-white/[0.06]">
                  <div className="grid grid-cols-[1fr_90px] border-b border-white/[0.06] bg-white/[0.02] px-4 py-3 text-[10px] uppercase tracking-[0.12em] text-slate-600">
                    <span>Field</span>
                    <span>Type</span>
                  </div>

                  <div className="grid grid-cols-[1fr_90px] px-4 py-4 text-xs">
                    <div>
                      <code className="text-cyan-300">
                        {isImageInput
                          ? "input.imageData"
                          : "input"}
                      </code>
                      <p className="mt-1 text-[10px] text-slate-600">
                        Required
                        {isImageInput
                          ? " base64 image data"
                          : " user input"}
                      </p>
                    </div>
                    <span className="text-slate-400">
                      {isImageInput
                        ? "string"
                        : inputType}
                    </span>
                  </div>

                  {isImageInput && (
                    <div className="grid grid-cols-[1fr_90px] border-t border-white/[0.06] px-4 py-4 text-xs">
                      <div>
                        <code className="text-cyan-300">
                          input.imageMimeType
                        </code>
                        <p className="mt-1 text-[10px] text-slate-600">
                          Optional MIME type, defaults to image/jpeg.
                        </p>
                      </div>
                      <span className="text-slate-400">
                        string
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-600">
                  Example JSON
                </p>
                <pre className="max-h-72 overflow-auto rounded-xl border border-white/[0.06] bg-black/30 p-4 text-[11px] leading-5 text-slate-300">
                  {requestBody}
                </pre>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
            <h4 className="text-sm font-semibold">
              cURL
            </h4>

            <pre className="mt-4 overflow-x-auto rounded-xl border border-white/[0.06] bg-black/30 p-4 text-[11px] leading-5 text-slate-300">
{`curl -X POST http://localhost:3000/api/run/${selectedConnector?.id} \\
  -H "Content-Type: application/json" \\
  -d '${curlBody}'`}
            </pre>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
            <h4 className="text-sm font-semibold">
              Expected Response
            </h4>

            <pre className="mt-4 overflow-auto rounded-xl border border-white/[0.06] bg-black/30 p-4 text-[11px] leading-5 text-slate-300">
              {responseBody}
            </pre>

            <div className="mt-5 rounded-xl border border-red-400/10 bg-red-400/[0.025] p-4">
              <p className="text-xs font-medium text-red-300">
                Error responses
              </p>

              <div className="mt-3 space-y-2 text-[11px] text-slate-500">
                <p>
                  <code className="text-red-300">
                    400
                  </code>{" "}
                  — Invalid connector ID or missing/invalid input.
                </p>
                <p>
                  <code className="text-red-300">
                    403
                  </code>{" "}
                  — Connector is disabled.
                </p>
                <p>
                  <code className="text-red-300">
                    404
                  </code>{" "}
                  — Connector does not exist.
                </p>
                <p>
                  <code className="text-red-300">
                    500
                  </code>{" "}
                  — AI provider or server error.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-violet-400/10 bg-violet-400/[0.025] p-5">
            <p className="text-xs font-medium text-violet-300">
              Output schema
            </p>
            <pre className="mt-3 overflow-auto text-[11px] leading-5 text-slate-500">
              {JSON.stringify(
                selectedConnector?.outputSchema ??
                  {
                    response: "string",
                  },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [connectors, setConnectors] = React.useState<Connector[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [stats, setStats] = React.useState<DashboardStats>({
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    successRate: 0,
    averageResponseTime: 0,
    inputTokens: 0,
    outputTokens: 0,
    totalTokens: 0,
  });
  const [analytics, setAnalytics] =
    React.useState<AnalyticsData | null>(null);
  const [analyticsLoading, setAnalyticsLoading] =
    React.useState(false);
  const [activeSection, setActiveSection] =
    React.useState("Overview");
  const [isDark, setIsDark] = React.useState(true);

  React.useEffect(() => {
    const savedTheme = window.localStorage.getItem(
      "ai-api-hub-theme"
    );

    if (savedTheme === "light") {
      setIsDark(false);
    }
  }, []);

  function toggleTheme() {
    setIsDark((current) => {
      const next = !current;
      window.localStorage.setItem(
        "ai-api-hub-theme",
        next ? "dark" : "light"
      );
      return next;
    });
  }
  const [showNewConnector, setShowNewConnector] =
    React.useState(false);
  const [editingConnector, setEditingConnector] =
    React.useState<Connector | null>(null);
  const [testingConnector, setTestingConnector] =
    React.useState<Connector | null>(null);
  const [viewingConnector, setViewingConnector] =
    React.useState<Connector | null>(null);
  const [testInput, setTestInput] = React.useState("");
  const [testImageData, setTestImageData] =
    React.useState("");
  const [testImageMimeType, setTestImageMimeType] =
    React.useState("image/jpeg");
  const [testImagePreview, setTestImagePreview] =
    React.useState("");
  const [testResponse, setTestResponse] = React.useState<unknown>(null);
  const [testLoading, setTestLoading] = React.useState(false);
  const [testError, setTestError] = React.useState("");
  const [playgroundApiKey, setPlaygroundApiKey] = React.useState("");
  const [testValues, setTestValues] = React.useState<Record<string, unknown>>({});

  async function loadConnectors() {
    try {
      setLoading(true);

      const response = await fetch("/api/connectors", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch connectors");
      }

      const data = await response.json();

      /*
       * Handles both:
       * [ ... ]
       *
       * and Prisma ORM's:
       * { value: [ ... ], Count: 2 }
       */
      const connectorList = Array.isArray(data)
        ? data
        : Array.isArray(data?.value)
          ? data.value
          : [];

      setConnectors(
        connectorList.map((connector: Connector) => ({
          ...connector,
          id: Number(connector.id),
        }))
      );
    } catch (error) {
      console.error(
        "Failed to load connectors:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadStats() {
    try {
      const response = await fetch("/api/stats", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard statistics");
      }

      const data = await response.json();

      setStats({
        totalRequests: Number(data.totalRequests ?? 0),
        successfulRequests: Number(data.successfulRequests ?? 0),
        failedRequests: Number(data.failedRequests ?? 0),
        successRate: Number(data.successRate ?? 0),
        averageResponseTime: Number(data.averageResponseTime ?? 0),
        inputTokens: Number(data.inputTokens ?? 0),
        outputTokens: Number(data.outputTokens ?? 0),
        totalTokens: Number(data.totalTokens ?? 0),
      });
    } catch (error) {
      console.error(
        "Failed to load dashboard statistics:",
        error
      );
    }
  }

  async function loadAnalytics() {
    try {
      setAnalyticsLoading(true);

      const response = await fetch(
        "/api/analytics",
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch analytics"
        );
      }

      const data =
        await response.json();

      setAnalytics(data);
    } catch (error) {
      console.error(
        "Failed to load analytics:",
        error
      );
    } finally {
      setAnalyticsLoading(false);
    }
  }

  React.useEffect(() => {
    loadConnectors();
    loadStats();
    loadAnalytics();
  }, []);

  React.useEffect(() => {
    if (!testingConnector) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    setTestInput("");
    setTestValues({});
    setTestImageData("");
    setTestImageMimeType("image/jpeg");
    setTestImagePreview("");
    setTestResponse(null);
    setTestError("");

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [testingConnector]);

  const playgroundFields =
    Array.isArray(testingConnector?.inputSchema?.fields)
      ? (testingConnector.inputSchema.fields as Array<{
          name: string;
          type: string;
          required?: boolean;
          description?: string;
          default?: unknown;
        }>)
      : testingConnector?.inputSchema?.input
        ? [
            {
              name: "input",
              type: testingConnector.inputSchema.input.type ?? "text",
              required: testingConnector.inputSchema.input.required ?? true,
              description: "Connector input",
            },
          ]
        : [
            {
              name: "input",
              type: "text",
              required: true,
              description: "Connector input",
            },
          ];

  const hasImageField = playgroundFields.some(
    (field) => field.type === "image"
  );

  const hasRequiredPlaygroundValue = playgroundFields.every((field) => {
    if (!field.required) return true;
    if (field.type === "image") {
      return typeof testValues[field.name] === "string" &&
        Boolean(testValues[field.name]);
    }
    const value = testValues[field.name];
    if (field.type === "boolean") return typeof value === "boolean";
    return value !== undefined && value !== null && String(value).trim() !== "";
  });

  return (
    <main className={`min-h-screen bg-[#05070d] text-white selection:bg-cyan-400/30 transition-colors duration-300 ${isDark ? "theme-dark" : "theme-light"}`}> 
      {/* Ambient futuristic background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-violet-500/10 blur-[120px]" />

        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-500/5 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-white/[0.07] bg-white/[0.015] px-4 py-6 backdrop-blur-xl lg:block">

          <div className="mb-10 flex items-center gap-3 px-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
              <span className="text-lg text-cyan-300">
                ✦
              </span>
            </div>

            <div>
              <h1 className="text-sm font-semibold tracking-wide">
                AI API HUB
              </h1>

              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                Infrastructure
              </p>
            </div>

          </div>

          <nav className="space-y-1">

            <p className="mb-3 px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-600">
              Workspace
            </p>

            {navigation.map((item, index) => (
              <button
                key={item.name}
                onClick={() => {
                  if (item.name === "Overview") {
                    setActiveSection("Overview");
                  }

                  if (item.name === "Analytics") {
                    setActiveSection("Analytics");
                    loadAnalytics();
                  }

                  if (item.name === "Documentation") {
                    setActiveSection("Documentation");
                  }

                  if (item.name === "API Playground") {
                    setActiveSection("API Playground");

                    const firstActiveConnector =
                      connectors.find((connector) => connector.isActive);

                    if (firstActiveConnector) {
                      setTestingConnector(firstActiveConnector);
                    } else if (connectors.length > 0) {
                      setTestingConnector(connectors[0]);
                    }
                  }
                }}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                  activeSection === item.name
                    ? "border border-cyan-400/10 bg-cyan-400/[0.08] text-cyan-300"
                    : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span
                  className={`text-base ${
                    index === 0
                      ? "text-cyan-300"
                      : "text-slate-500 group-hover:text-slate-300"
                  }`}
                >
                  {item.icon}
                </span>

                {item.name}
              </button>
            ))}

          </nav>

          <div className="absolute bottom-6 left-4 right-4 overflow-hidden rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.025] p-4">
            <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-emerald-400/[0.06] blur-2xl" />

            <div className="relative mb-2 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              </span>

              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-300">
                All systems operational
              </span>
            </div>

            <p className="text-[11px] leading-5 text-slate-600">
              AI provider connections are ready.
            </p>
          </div>

        </aside>

        {/* Main content */}
        <div className="flex-1">

          {/* Top bar */}
          <header className="flex h-20 items-center justify-between border-b border-white/[0.07] px-6 lg:px-10">

            <div>
              <p className="text-xs text-slate-500">
                Workspace / Overview
              </p>

              <h2 className="mt-1 text-sm font-medium text-slate-200">
                AI Infrastructure
              </h2>
            </div>

            <div className="flex items-center gap-3">

              <button className="hidden rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2 text-xs text-slate-500 transition hover:border-white/15 hover:text-slate-300 sm:block">
                Search...

                <span className="ml-8 rounded border border-white/10 px-1.5 py-0.5 text-[10px]">
                  ⌘ K
                </span>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                title={isDark ? "Switch to light theme" : "Switch to dark theme"}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-sm text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
              >
                {isDark ? "☀" : "☾"}
              </button>


      <style jsx global>{`
        .theme-light {
          background: #f6f8fc !important;
          color: #0f172a !important;
        }

        .theme-light [class*="bg-[#05070d]"],
        .theme-light [class*="bg-[#090d16]"] {
          background-color: #f6f8fc !important;
        }

        .theme-light [class*="bg-white/[0.015]"],
        .theme-light [class*="bg-white/[0.02]"],
        .theme-light [class*="bg-white/[0.025]"],
        .theme-light [class*="bg-white/[0.03]"],
        .theme-light [class*="bg-white/[0.035]"],
        .theme-light [class*="bg-white/[0.05]"] {
          background-color: rgba(255, 255, 255, 0.78) !important;
        }

        .theme-light [class*="bg-black/"] {
          background-color: rgba(255, 255, 255, 0.94) !important;
        }

        .theme-light [class*="border-white/"] {
          border-color: rgba(15, 23, 42, 0.10) !important;
        }

        .theme-light [class*="text-white"] {
          color: #0f172a !important;
        }

        .theme-light [class*="text-slate-200"] {
          color: #334155 !important;
        }

        .theme-light [class*="text-slate-300"] {
          color: #475569 !important;
        }

        .theme-light [class*="text-slate-400"] {
          color: #64748b !important;
        }

        .theme-light [class*="text-slate-500"] {
          color: #64748b !important;
        }

        .theme-light [class*="text-slate-600"] {
          color: #64748b !important;
        }

        .theme-light [class*="text-slate-700"] {
          color: #475569 !important;
        }

        .theme-light [class*="bg-cyan-500/10"],
        .theme-light [class*="bg-violet-500/10"],
        .theme-light [class*="bg-blue-500/5"] {
          opacity: 0.35;
        }

        .theme-light header {
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(16px);
        }

        .theme-light aside {
          background: rgba(255, 255, 255, 0.76) !important;
          border-color: rgba(15, 23, 42, 0.10) !important;
        }

        .theme-light pre,
        .theme-light code {
          color: #334155;
        }

        .theme-light [class*="shadow-[0_0_30px"] {
          box-shadow: 0 0 30px rgba(14, 165, 233, 0.10) !important;
        }
      `}</style>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10 text-xs font-semibold text-violet-300">
                M
              </div>

            </div>

          </header>

          {/* Dashboard */}
          {activeSection === "Analytics" ? (
            <AnalyticsView
              data={analytics}
              loading={analyticsLoading}
              onRefresh={loadAnalytics}
            />
          ) : activeSection === "Documentation" ? (
            <DocumentationView connectors={connectors} />
          ) : (
          <section className="mx-auto max-w-[1500px] px-6 py-8 lg:px-10 lg:py-10">

            {/* Hero */}
            <div className="mb-8">

              <div className="mb-3 flex items-center gap-2">

                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-400">
                  Control Center
                </span>

              </div>

              <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Welcome to your{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                  AI infrastructure.
                </span>
              </h3>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <p className="max-w-2xl text-sm leading-6 text-slate-500">
                  Create, deploy, test and monitor reusable AI-powered APIs from
                  one centralized platform.
                </p>

                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.05] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  Live
                </span>
              </div>

            </div>

            {/* Stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {[
                [
                  String(
                    connectors.filter(
                      (connector) =>
                        connector.isActive
                    ).length
                  ).padStart(2, "0"),
                  "Active APIs",
                  "From your database",
                ],
                [
                  stats.totalRequests.toLocaleString(),
                  "Total Requests",
                  `${stats.successfulRequests.toLocaleString()} successful`,
                ],
                [
                  `${stats.successRate.toFixed(1)}%`,
                  "Success Rate",
                  `${stats.failedRequests.toLocaleString()} failed`,
                ],
                [
                  `${stats.averageResponseTime.toLocaleString()}ms`,
                  "Avg. Response",
                  "Across recorded requests",
                ],
              ].map(([value, label, sub], index) => (

                <div
                  key={label}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-white/[0.04]"
                >

                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/[0.04] blur-2xl transition group-hover:bg-cyan-400/[0.08]" />

                  <p className="text-xs text-slate-500">
                    {label}
                  </p>

                  <p className="mt-3 text-2xl font-semibold tracking-tight">
                    {value}
                  </p>

                  <p
                    className={`mt-2 text-[11px] ${
                      index === 1
                        ? "text-emerald-400"
                        : "text-slate-600"
                    }`}
                  >
                    {sub}
                  </p>

                </div>

              ))}

            </div>

            {/* Connectors header */}
            <div className="mb-4 flex items-center justify-between">

              <div>

                <h4 className="text-sm font-semibold">
                  Active Connectors
                </h4>

                <p className="mt-1 text-xs text-slate-600">
                  Your deployed AI endpoints
                </p>

              </div>

              <button
                onClick={() =>
                  setShowNewConnector(true)
                }
                className="rounded-xl border border-cyan-400/20 bg-cyan-400/[0.07] px-4 py-2 text-xs font-medium text-cyan-300 transition hover:bg-cyan-400/[0.12]"
              >
                + New Connector
              </button>

            </div>

            {/* Connector cards */}
            <div className="grid gap-4 xl:grid-cols-2">

              {loading ? (

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 text-sm text-slate-500">
                  Loading connectors...
                </div>

              ) : connectors.length === 0 ? (

                <div className="rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.02] p-8 text-center xl:col-span-2">

                  <p className="text-sm font-medium text-slate-300">
                    No connectors yet
                  </p>

                  <p className="mt-2 text-xs text-slate-600">
                    Create your first AI connector to see it here.
                  </p>

                </div>

              ) : (

                connectors.map((connector) => (

                  <div
                    key={connector.id}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.045] hover:shadow-[0_20px_60px_rgba(34,211,238,0.08)]"
                  >
                    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/[0.045] blur-3xl transition duration-500 group-hover:bg-cyan-400/[0.09]" />
                    <div className="pointer-events-none absolute -bottom-20 -left-10 h-36 w-36 rounded-full bg-violet-500/[0.035] blur-3xl transition duration-500 group-hover:bg-violet-500/[0.07]" />

                    <div className="flex items-start justify-between">

                      <div className="flex items-center gap-3">

                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-xl border text-lg shadow-inner ${getProviderStyle(connector.provider).className}`}
                        >
                          {getProviderStyle(connector.provider).icon}
                        </div>

                        <div>

                          <h5 className="text-sm font-semibold">
                            {connector.name}
                          </h5>

                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold tracking-[0.12em] ${getProviderStyle(connector.provider).className}`}
                            >
                              {getProviderStyle(connector.provider).label}
                            </span>

                            <span className="text-[10px] text-slate-600">
                              {connector.model}
                            </span>
                          </div>

                          <div className="mt-2 flex items-center gap-1.5 text-[9px] text-slate-600">
                            <span className="text-cyan-400/70">POST</span>
                            <span>/api/run/{connector.id}</span>
                          </div>

                        </div>

                      </div>

                      <div
                        className={`flex items-center gap-2 rounded-full border px-2.5 py-1 ${
                          connector.isActive
                            ? "border-emerald-400/10 bg-emerald-400/[0.06]"
                            : "border-slate-400/10 bg-slate-400/[0.06]"
                        }`}
                      >

                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            connector.isActive
                              ? "bg-emerald-400"
                              : "bg-slate-500"
                          }`}
                        />

                        <span
                          className={`text-[10px] ${
                            connector.isActive
                              ? "text-emerald-400"
                              : "text-slate-500"
                          }`}
                        >
                          {connector.isActive
                            ? "Active"
                            : "Disabled"}
                        </span>

                      </div>

                    </div>

                    <p className="mt-5 text-xs leading-5 text-slate-500">
                      {connector.description ||
                        "No description provided for this connector."}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">

                      <div>

                        <p className="text-[10px] uppercase tracking-wider text-slate-600">
                          Endpoint
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-300">
                          Ready
                        </p>

                      </div>

                      <div className="flex gap-2">

                        <button
                          onClick={() => {
                            setTestingConnector(connector);
                            setTestInput("");
                            setTestResponse(null);
                            setTestError("");
                          }}
                          className="rounded-lg border border-cyan-400/15 bg-cyan-400/[0.05] px-3 py-1.5 text-[10px] font-medium text-cyan-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.1]"
                        >
                          ▶ Test API
                        </button>

                        <button
                          onClick={() => setEditingConnector(connector)}
                          className="rounded-lg border border-violet-400/15 bg-violet-400/[0.05] px-3 py-1.5 text-[10px] font-medium text-violet-300 transition hover:border-violet-400/30 hover:bg-violet-400/[0.1]"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => setViewingConnector(connector)}
                          className="rounded-lg border border-white/[0.06] bg-white/[0.035] px-3 py-1.5 text-[10px] text-slate-300 transition hover:border-white/[0.12] hover:bg-white/[0.08]"
                        >
                          View →
                        </button>

                      </div>

                    </div>

                  </div>

                ))

              )}

            </div>

            {/* Bottom information */}
            <div className="mt-8 grid gap-4 lg:grid-cols-3">

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 lg:col-span-2">

                <div className="flex items-center justify-between">

                  <div>

                    <h4 className="text-sm font-semibold">
                      API Activity
                    </h4>

                    <p className="mt-1 text-xs text-slate-600">
                      Request activity across your infrastructure
                    </p>

                  </div>

                  <span className="rounded-lg border border-white/[0.07] px-2.5 py-1 text-[10px] text-slate-500">
                    Last 24h
                  </span>

                </div>

                <div className="mt-8 flex h-28 items-end gap-2">

                  {[
                    35, 52, 42, 70, 55, 82, 64, 92,
                    72, 86, 65, 96, 78, 88, 72, 100,
                  ].map((height, index) => (

                    <div
                      key={index}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-400/10 to-cyan-400/50 transition hover:from-cyan-400/20 hover:to-cyan-300/70"
                      style={{
                        height: `${height}%`,
                      }}
                    />

                  ))}

                </div>

              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">

                <h4 className="text-sm font-semibold">
                  Quick Start
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Build your first AI connector.
                </p>

                <div className="mt-6 space-y-3">

                  {[
                    "Connect an AI provider",
                    "Configure your endpoint",
                    "Test your API",
                    "Deploy & document",
                  ].map((step, index) => (

                    <div
                      key={step}
                      className="flex items-center gap-3"
                    >

                      <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-[10px] text-slate-500">
                        0{index + 1}
                      </span>

                      <span className="text-xs text-slate-400">
                        {step}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </section>
          )}

        </div>

      </div>


      {viewingConnector && (
        <div className="fixed inset-0 z-[55] flex items-center justify-center overflow-hidden bg-black/70 p-4 backdrop-blur-sm sm:p-6">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#090d16] p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400">
                  Connector Details
                </p>
                <h3 className="mt-2 text-xl font-semibold">
                  {viewingConnector.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  POST /api/run/{viewingConnector.id}
                </p>
              </div>
              <button
                onClick={() => setViewingConnector(null)}
                className="rounded-lg border border-white/[0.07] px-3 py-1.5 text-xs text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-600">Provider</p>
                <p className="mt-2 text-sm font-medium text-slate-200">{viewingConnector.provider}</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-600">Model</p>
                <p className="mt-2 break-all text-sm font-medium text-slate-200">{viewingConnector.model}</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-600">Status</p>
                <p className={`mt-2 text-sm font-medium ${viewingConnector.isActive ? "text-emerald-300" : "text-slate-400"}`}>
                  {viewingConnector.isActive ? "Active" : "Disabled"}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-[10px] uppercase tracking-[0.14em] text-slate-600">Description</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {viewingConnector.description || "No description provided for this connector."}
              </p>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-cyan-400">Input Schema</p>
                <pre className="mt-3 max-h-56 overflow-auto rounded-lg border border-white/[0.05] bg-black/25 p-3 text-[10px] leading-5 text-slate-400">
                  {JSON.stringify(viewingConnector.inputSchema ?? {}, null, 2)}
                </pre>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-violet-300">Output Schema</p>
                <pre className="mt-3 max-h-56 overflow-auto rounded-lg border border-white/[0.05] bg-black/25 p-3 text-[10px] leading-5 text-slate-400">
                  {JSON.stringify(viewingConnector.outputSchema ?? {}, null, 2)}
                </pre>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-600">Endpoint</p>
              <code className="mt-2 block break-all text-xs text-cyan-300">
                POST /api/run/{viewingConnector.id}
              </code>
              <p className="mt-2 text-[11px] text-slate-600">Authentication: API key required</p>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button
                onClick={() => {
                  setViewingConnector(null);
                  setActiveSection("Documentation");
                }}
                className="rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
              >
                View Documentation
              </button>
              <button
                disabled={!viewingConnector.isActive}
                onClick={() => {
                  setTestingConnector(viewingConnector);
                  setViewingConnector(null);
                  setTestInput("");
                  setTestResponse(null);
                  setTestError("");
                }}
                className="rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] px-4 py-2.5 text-xs font-medium text-cyan-300 transition hover:bg-cyan-400/[0.14] disabled:cursor-not-allowed disabled:opacity-40"
              >
                ▶ Test API
              </button>
            </div>
          </div>
        </div>
      )}

      {testingConnector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/70 p-4 backdrop-blur-sm sm:p-6">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-2xl border border-white/[0.08] bg-[#090d16] p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400">
                  API Playground
                </p>
                <h3 className="mt-2 text-lg font-semibold">
                  {testingConnector.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  POST /api/run/{testingConnector.id}
                </p>
              </div>
              <button
                onClick={() => setTestingConnector(null)}
                className="rounded-lg border border-white/[0.07] px-3 py-1.5 text-xs text-slate-400 hover:bg-white/[0.06] hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="mt-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600">
                    Select API
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Choose which AI connector you want to test.
                  </p>
                </div>
                <span className="rounded-lg border border-cyan-400/10 bg-cyan-400/[0.05] px-2.5 py-1 text-[10px] text-cyan-300">
                  {connectors.filter((connector) => connector.isActive).length} active
                </span>
              </div>

              <select
                value={testingConnector.id}
                onChange={(event) => {
                  const selectedId = Number(event.target.value);
                  const selectedConnector = connectors.find(
                    (connector) => connector.id === selectedId
                  );

                  if (!selectedConnector) {
                    return;
                  }

                  setTestingConnector(selectedConnector);
                  setTestInput("");
                  setTestImageData("");
                  setTestImageMimeType("image/jpeg");
                  setTestImagePreview("");
                  setTestResponse(null);
                  setTestError("");
                }}
                className="mt-3 w-full rounded-xl border border-white/[0.08] bg-[#0b101a] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/30"
              >
                {connectors.map((connector) => (
                  <option
                    key={connector.id}
                    value={connector.id}
                    disabled={!connector.isActive}
                  >
                    {connector.name} · {connector.provider} · {connector.model}
                    {!connector.isActive ? " · Disabled" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 rounded-2xl border border-amber-400/10 bg-amber-400/[0.03] p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-400/15 bg-amber-400/[0.06] text-sm text-amber-300">
                  🔐
                </div>
                <div className="min-w-0 flex-1">
                  <label className="text-xs font-medium text-slate-200">
                    API Key
                  </label>
                  <p className="mt-1 text-[10px] leading-5 text-slate-500">
                    Enter the API key configured for this AI API Hub. It is kept only in this page session and is sent in the request header.
                  </p>
                  <input
                    type="password"
                    value={playgroundApiKey}
                    onChange={(event) =>
                      setPlaygroundApiKey(event.target.value)
                    }
                    placeholder="Enter your API key"
                    autoComplete="off"
                    className="mt-3 w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/30"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                  Request Inputs
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Fields are generated from this connector's configured input schema.
                </p>
              </div>

              {playgroundFields.map((field) => {
                const value = testValues[field.name];

                if (field.type === "image") {
                  return (
                    <div key={field.name}>
                      <label className="text-xs font-medium text-slate-300">
                        {field.name} {field.required !== false && <span className="text-cyan-400">*</span>}
                      </label>
                      <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-cyan-400/20 bg-cyan-400/[0.025] px-6 py-8 text-center transition hover:border-cyan-400/40 hover:bg-cyan-400/[0.05]">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (!file) return;
                            if (file.size > 20 * 1024 * 1024) {
                              setTestError("Image must be smaller than 20 MB.");
                              return;
                            }
                            setTestError("");
                            setTestImageMimeType(file.type || "image/jpeg");
                            const reader = new FileReader();
                            reader.onload = () => {
                              const result = typeof reader.result === "string" ? reader.result : "";
                              const base64 = result.includes(",") ? result.split(",")[1] : result;
                              setTestImageData(base64);
                              setTestImagePreview(result);
                              setTestValues((current) => ({ ...current, [field.name]: base64 }));
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                        {testImagePreview ? (
                          <img src={testImagePreview} alt="Selected image" className="max-h-64 max-w-full rounded-xl object-contain" />
                        ) : (
                          <>
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] text-xl text-cyan-300">◫</div>
                            <p className="text-sm font-medium text-white">Upload an image</p>
                            <p className="mt-1 text-xs text-slate-500">PNG, JPG, WEBP • up to 20 MB</p>
                          </>
                        )}
                      </label>

                      <div className="mt-4">
                        <label className="text-xs font-medium text-slate-300">
                          Optional Question
                        </label>
                        <textarea
                          value={testInput}
                          onChange={(event) =>
                            setTestInput(event.target.value)
                          }
                          placeholder="e.g. Describe this image and identify the important objects."
                          className="mt-2 min-h-24 w-full resize-y rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/30"
                        />
                        <p className="mt-2 text-[11px] text-slate-600">
                          Add a question or instruction for the vision model.
                        </p>
                      </div>

                      {field.description && <p className="mt-2 text-xs text-slate-600">{field.description}</p>}
                    </div>
                  );
                }

                if (field.type === "boolean") {
                  return (
                    <label key={field.name} className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 text-sm text-slate-300">
                      <input
                        type="checkbox"
                        checked={Boolean(value)}
                        onChange={(event) => setTestValues((current) => ({ ...current, [field.name]: event.target.checked }))}
                        className="h-4 w-4 accent-cyan-400"
                      />
                      <span>{field.name}{field.required !== false && <span className="text-cyan-400"> *</span>}</span>
                    </label>
                  );
                }

                if (field.type === "json") {
                  return (
                    <div key={field.name}>
                      <label className="text-xs font-medium text-slate-300">{field.name} {field.required !== false && <span className="text-cyan-400">*</span>}</label>
                      <textarea
                        value={typeof value === "string" ? value : JSON.stringify(value ?? {}, null, 2)}
                        onChange={(event) => setTestValues((current) => ({ ...current, [field.name]: event.target.value }))}
                        placeholder='{"key":"value"}'
                        className="mt-2 min-h-28 w-full resize-y rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 font-mono text-xs text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/30"
                      />
                      {field.description && <p className="mt-2 text-xs text-slate-600">{field.description}</p>}
                    </div>
                  );
                }

                return (
                  <div key={field.name}>
                    <label className="text-xs font-medium text-slate-300">{field.name} {field.required !== false && <span className="text-cyan-400">*</span>}</label>
                    <input
                      type={field.type === "number" ? "number" : "text"}
                      value={value === undefined ? (field.default ?? "") as string : String(value)}
                      onChange={(event) => setTestValues((current) => ({ ...current, [field.name]: field.type === "number" ? Number(event.target.value) : event.target.value }))}
                      placeholder={field.description || `Enter ${field.name}...`}
                      className="mt-2 w-full rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/30"
                    />
                    {field.description && <p className="mt-2 text-xs text-slate-600">{field.description}</p>}
                  </div>
                );
              })}
            </div>

            {testError && (
              <div className="mt-4 rounded-xl border border-red-400/20 bg-red-400/[0.06] p-4 text-xs text-red-300">
                {testError}
              </div>
            )}

            {testResponse !== null && (
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-medium text-slate-300">Output</p>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-emerald-400">
                    Success
                  </span>
                </div>

                <div className="rounded-xl border border-white/[0.08] bg-black/30 p-5">
                  {getGeneratedImage(testResponse) ? (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Generated Image
                        </p>
                        <p className="mt-1 text-[11px] text-slate-500">
                          Image generated by Gemini
                        </p>
                      </div>

                      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-black/20">
                        <img
                          src={`data:${
                            getGeneratedImage(testResponse)!.imageMimeType
                          };base64,${
                            getGeneratedImage(testResponse)!.imageData
                          }`}
                          alt="AI generated image"
                          className="w-full rounded-xl object-contain"
                        />
                      </div>

                      {getGeneratedText(testResponse).trim() && (
                        <div className="border-t border-white/[0.06] pt-4">
                          {renderGeneratedText(
                            getGeneratedText(testResponse)
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    renderGeneratedText(getGeneratedText(testResponse))
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                disabled={
                  testLoading ||
                  !playgroundApiKey.trim() ||
                  !hasRequiredPlaygroundValue
                }
                onClick={async () => {
                  try {
                    setTestLoading(true);
                    setTestError("");
                    setTestResponse(null);

                    const input: Record<string, unknown> = {
                      ...testValues,
                      ...(hasImageField
                        ? {
                            imageMimeType: testImageMimeType,
                            text:
                              testInput.trim() ||
                              (typeof testValues.text === "string"
                                ? testValues.text
                                : "Analyze this image."),
                          }
                        : {}),
                    };

                    if (playgroundFields.length === 1 && playgroundFields[0].name === "input") {
                      if (playgroundFields[0].type === "image") {
                        input.imageData = testValues.input ?? testImageData;
                        delete input.input;
                      } else if (playgroundFields[0].type === "text") {
                        input.input = testValues.input ?? testInput;
                      }
                    }

                    Object.keys(input).forEach((key) => {
                      if (typeof input[key] === "string" && playgroundFields.find((field) => field.name === key)?.type === "json") {
                        try {
                          input[key] = JSON.parse(input[key] as string);
                        } catch {
                          throw new Error(`Invalid JSON in field: ${key}`);
                        }
                      }
                    });

                    const response = await fetch(
                      `/api/run/${testingConnector.id}`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          "x-api-key": playgroundApiKey.trim(),
                        },
                        body: JSON.stringify({ input }),
                      }
                    );

                    const data = await response.json();

                    if (!response.ok) {
                      throw new Error(
                        data?.error ||
                          data?.message ||
                          `Request failed with status ${response.status}`
                      );
                    }

                    setTestResponse(data);
                    loadConnectors();
                  } catch (error) {
                    setTestError(
                      error instanceof Error
                        ? error.message
                        : "Failed to run API"
                    );
                  } finally {
                    setTestLoading(false);
                  }
                }}
                className="rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] px-5 py-2.5 text-xs font-medium text-cyan-300 transition hover:bg-cyan-400/[0.14] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {testLoading ? "Running..." : "Run API"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE CONNECTOR MODAL ONLY */}
      {showNewConnector && (
        <NewConnectorModal
          onClose={() =>
            setShowNewConnector(false)
          }
          onCreated={() => {
            setShowNewConnector(false);
            loadConnectors();
          }}
        />
      )}

      {editingConnector && (
        <NewConnectorModal
          connector={editingConnector}
          onClose={() => setEditingConnector(null)}
          onCreated={() => {
            setEditingConnector(null);
            loadConnectors();
            loadStats();
            loadAnalytics();
          }}
        />
      )}

    </main>
  );
}