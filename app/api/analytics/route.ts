import { NextResponse } from "next/server";
import { db } from "../../../src/prisma/db";

export async function GET() {
  try {
    const [requests, connectors] = await Promise.all([
      db.orm.public.ApiRequest.all(),
      db.orm.public.Connector.all(),
    ]);

    const connectorMap = new Map(
      connectors.map((connector) => [
        Number(connector.id),
        {
          name: connector.name,
          provider: connector.provider,
          model: connector.model,
        },
      ])
    );

    const totalRequests = requests.length;

    const successfulRequests = requests.filter(
      (request) => request.status === "success"
    ).length;

    const failedRequests = requests.filter(
      (request) => request.status === "failed"
    ).length;

    const responseTimes = requests
      .map((request) => request.responseTime)
      .filter(
        (time): time is number =>
          time !== null && time !== undefined
      );

    const averageResponseTime =
      responseTimes.length === 0
        ? 0
        : Math.round(
            responseTimes.reduce(
              (sum, time) => sum + time,
              0
            ) / responseTimes.length
          );

    const totalTokens = requests.reduce(
      (sum, request) =>
        sum +
        (request.inputTokens ?? 0) +
        (request.outputTokens ?? 0),
      0
    );

    const successRate =
      totalRequests === 0
        ? 0
        : Number(
            (
              (successfulRequests / totalRequests) *
              100
            ).toFixed(1)
          );

    const connectorStats = new Map<
      number,
      {
        connectorId: number;
        name: string;
        provider: string;
        model: string;
        requests: number;
        successful: number;
        failed: number;
        totalResponseTime: number;
        responseCount: number;
      }
    >();

    const providerStats = new Map<
      string,
      {
        provider: string;
        requests: number;
        successful: number;
        failed: number;
      }
    >();

    for (const request of requests) {
      const connectorId = Number(request.connectorId);
      const connector = connectorMap.get(connectorId);

      if (!connector) {
        continue;
      }

      const existing = connectorStats.get(connectorId) ?? {
        connectorId,
        name: connector.name,
        provider: connector.provider,
        model: connector.model,
        requests: 0,
        successful: 0,
        failed: 0,
        totalResponseTime: 0,
        responseCount: 0,
      };

      existing.requests += 1;

      if (request.status === "success") {
        existing.successful += 1;
      }

      if (request.status === "failed") {
        existing.failed += 1;
      }

      if (
        request.responseTime !== null &&
        request.responseTime !== undefined
      ) {
        existing.totalResponseTime += request.responseTime;
        existing.responseCount += 1;
      }

      connectorStats.set(connectorId, existing);

      const providerKey = connector.provider;
      const providerExisting =
        providerStats.get(providerKey) ?? {
          provider: providerKey,
          requests: 0,
          successful: 0,
          failed: 0,
        };

      providerExisting.requests += 1;

      if (request.status === "success") {
        providerExisting.successful += 1;
      }

      if (request.status === "failed") {
        providerExisting.failed += 1;
      }

      providerStats.set(
        providerKey,
        providerExisting
      );
    }

    const now = Date.now();
    const hourlyActivity = Array.from(
      { length: 24 },
      (_, index) => {
        const hourStart =
          new Date(now - (23 - index) * 60 * 60 * 1000);

        const hourEnd =
          new Date(
            hourStart.getTime() +
              60 * 60 * 1000
          );

        const count = requests.filter(
          (request) => {
            const createdAt = new Date(
              request.createdAt
            ).getTime();

            return (
              createdAt >= hourStart.getTime() &&
              createdAt < hourEnd.getTime()
            );
          }
        ).length;

        return {
          label: hourStart.toLocaleTimeString(
            "en-IN",
            {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }
          ),
          count,
        };
      }
    );

    const recentRequests = [...requests]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 12)
      .map((request) => {
        const connector = connectorMap.get(
          Number(request.connectorId)
        );

        return {
          id: Number(request.id),
          connector:
            connector?.name ??
            `Connector #${request.connectorId}`,
          provider: connector?.provider ?? "unknown",
          model: connector?.model ?? "unknown",
          status: request.status,
          responseTime: request.responseTime,
          inputTokens: request.inputTokens,
          outputTokens: request.outputTokens,
          createdAt: request.createdAt,
          errorMessage: request.errorMessage,
        };
      });

    return NextResponse.json({
      summary: {
        totalRequests,
        successfulRequests,
        failedRequests,
        successRate,
        averageResponseTime,
        totalTokens,
      },
      connectors: Array.from(
        connectorStats.values()
      )
        .map((item) => ({
          ...item,
          averageResponseTime:
            item.responseCount === 0
              ? 0
              : Math.round(
                  item.totalResponseTime /
                    item.responseCount
                ),
        }))
        .sort(
          (a, b) =>
            b.requests - a.requests
        ),
      providers: Array.from(
        providerStats.values()
      ).sort(
        (a, b) =>
          b.requests - a.requests
      ),
      hourlyActivity,
      recentRequests,
    });
  } catch (error) {
    console.error(
      "Failed to fetch analytics:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch analytics",
      },
      {
        status: 500,
      }
    );
  }
}
