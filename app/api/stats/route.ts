import { NextResponse } from "next/server";
import { db } from "../../../src/prisma/db";

export async function GET() {
  try {
    const requests =
      await db.orm.public.ApiRequest.all();

    const totalRequests = requests.length;

    const successfulRequests = requests.filter(
      (request) => request.status === "success"
    ).length;

    const failedRequests = requests.filter(
      (request) => request.status === "failed"
    ).length;

    const successRate =
      totalRequests === 0
        ? 0
        : (successfulRequests / totalRequests) * 100;

    const responseTimes = requests
      .map((request) => request.responseTime)
      .filter(
        (time): time is number =>
          time !== null &&
          time !== undefined
      );

    const averageResponseTime =
      responseTimes.length === 0
        ? 0
        : responseTimes.reduce(
            (sum, time) => sum + time,
            0
          ) / responseTimes.length;

    const inputTokens = requests.reduce(
      (sum, request) =>
        sum + (request.inputTokens ?? 0),
      0
    );

    const outputTokens = requests.reduce(
      (sum, request) =>
        sum + (request.outputTokens ?? 0),
      0
    );

    const totalTokens =
      inputTokens + outputTokens;

    return NextResponse.json({
      totalRequests,
      successfulRequests,
      failedRequests,
      successRate: Number(
        successRate.toFixed(1)
      ),
      averageResponseTime: Math.round(
        averageResponseTime
      ),
      inputTokens,
      outputTokens,
      totalTokens,
    });
  } catch (error) {
    console.error(
      "Failed to fetch API statistics:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch API statistics",
      },
      {
        status: 500,
      }
    );
  }
}