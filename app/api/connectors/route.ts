import { NextResponse } from "next/server";
import { db } from "../../../src/prisma/db";

export async function GET() {
  try {
    const connectors =
      await db.orm.public.Connector.all();

    const cleanConnectors = connectors.map(
      (connector) => ({
        id: Number(connector.id),
        name: connector.name,
        description: connector.description,
        provider: connector.provider,
        model: connector.model,
        prompt: connector.prompt,
        inputSchema: connector.inputSchema,
        outputSchema: connector.outputSchema,
        authType: connector.authType,
        isActive: connector.isActive,
      })
    );

    console.log(
      "CONNECTORS SENT TO DASHBOARD:",
      cleanConnectors
    );

    return NextResponse.json(
      cleanConnectors
    );
  } catch (error) {
    console.error(
      "Failed to fetch connectors:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch connectors",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    if (
      !body.name ||
      !body.provider ||
      !body.model ||
      !body.prompt
    ) {
      return NextResponse.json(
        {
          error:
            "Name, provider, model, and prompt are required",
        },
        {
          status: 400,
        }
      );
    }

    const connector =
      await db.orm.public.Connector.create({
        name: body.name,
        slug: body.slug,
        description: body.description,
        provider: body.provider,
        model: body.model,
        prompt: body.prompt,
        inputSchema: body.inputSchema,
        outputSchema: body.outputSchema,
        authType:
          body.authType ?? "api_key",
        isActive:
          body.isActive ?? true,
      });

    return NextResponse.json(
      {
        id: Number(connector.id),
        name: connector.name,
        description: connector.description,
        provider: connector.provider,
        model: connector.model,
        prompt: connector.prompt,
        inputSchema: connector.inputSchema,
        outputSchema: connector.outputSchema,
        authType: connector.authType,
        isActive: connector.isActive,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Failed to create connector:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to create connector",
      },
      {
        status: 500,
      }
    );
  }
}