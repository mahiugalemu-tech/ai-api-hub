import { NextResponse } from "next/server";
import { db } from "../../../../src/prisma/db";

function getIdFromRequest(request: Request): number | null {
  try {
    const url = new URL(request.url);

    const parts = url.pathname
      .split("/")
      .filter(Boolean);

    const rawId = parts[parts.length - 1] ?? "";

    const id = Number(rawId);

    if (!Number.isInteger(id) || id <= 0) {
      return null;
    }

    return id;
  } catch {
    return null;
  }
}

async function getConnector(id: number) {
  const connectors =
    await db.orm.public.Connector.all();

  return (
    connectors.find(
      (connector) =>
        Number(connector.id) === id
    ) ?? null
  );
}

function normalizePayload(
  body: Record<string, unknown>
) {
  const name =
    typeof body.name === "string"
      ? body.name.trim()
      : "";

  const slug =
    typeof body.slug === "string"
      ? body.slug.trim()
      : "";

  const description =
    typeof body.description === "string"
      ? body.description.trim()
      : "";

  const provider =
    typeof body.provider === "string"
      ? body.provider.trim()
      : "";

  const model =
    typeof body.model === "string"
      ? body.model.trim()
      : "";

  const prompt =
    typeof body.prompt === "string"
      ? body.prompt.trim()
      : "";

  if (
    !name ||
    !slug ||
    !provider ||
    !model ||
    !prompt
  ) {
    return {
      error:
        "Name, slug, provider, model and prompt are required.",
    };
  }

  if (
    !body.inputSchema ||
    typeof body.inputSchema !== "object" ||
    Array.isArray(body.inputSchema)
  ) {
    return {
      error: "A valid input schema is required.",
    };
  }

  if (
    !body.outputSchema ||
    typeof body.outputSchema !== "object" ||
    Array.isArray(body.outputSchema)
  ) {
    return {
      error:
        "A valid output schema object is required.",
    };
  }

  return {
    value: {
      name,
      slug,
      description: description || null,
      provider,
      model,
      prompt,
      inputSchema: body.inputSchema,
      outputSchema: body.outputSchema,
      authType: "api_key",
      isActive: body.isActive !== false,
    },
  };
}

/* =========================================================
   UPDATE CONNECTOR
   PUT /api/connectors/{id}
   ========================================================= */

export async function PUT(request: Request) {
  try {
    /*
     * Read the ID directly from the actual request URL.
     *
     * Example:
     * /api/connectors/4
     *
     * becomes:
     * id = 4
     */
    const id = getIdFromRequest(request);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid connector ID.",
        },
        { status: 400 }
      );
    }

    const existing =
      await getConnector(id);

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Connector not found.",
        },
        { status: 404 }
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            "Request body must contain valid JSON.",
        },
        { status: 400 }
      );
    }

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Request body must be a JSON object.",
        },
        { status: 400 }
      );
    }

    const normalized =
      normalizePayload(
        body as Record<string, unknown>
      );

    if ("error" in normalized) {
      return NextResponse.json(
        {
          success: false,
          error: normalized.error,
        },
        { status: 400 }
      );
    }

    /*
     * Prevent duplicate slugs.
     */
    const connectors =
      await db.orm.public.Connector.all();

    const duplicate =
      connectors.find(
        (connector) =>
          connector.slug ===
            normalized.value.slug &&
          Number(connector.id) !== id
      );

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          error:
            "A connector with this slug already exists.",
        },
        { status: 409 }
      );
    }

    /*
     * Prisma ORM 8 JSON-compatible type.
     */
    type JsonValue =
      | string
      | number
      | boolean
      | null
      | JsonValue[]
      | {
          [key: string]: JsonValue;
        };

    const updateData = {
      name: normalized.value.name,

      slug: normalized.value.slug,

      description:
        normalized.value.description,

      provider:
        normalized.value.provider,

      model:
        normalized.value.model,

      prompt:
        normalized.value.prompt,

      inputSchema:
        normalized.value
          .inputSchema as JsonValue,

      outputSchema:
        normalized.value
          .outputSchema as JsonValue,

      authType:
        normalized.value.authType,

      isActive:
        normalized.value.isActive,
    };

    /*
     * Prisma ORM 8 syntax.
     */
    const updated =
      await db.orm.public.Connector
        .where({ id })
        .update(updateData);

    if (!updated) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Connector could not be updated.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      connector: updated,
    });
  } catch (error) {
    console.error(
      "Failed to update connector:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to update connector.",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   DELETE CONNECTOR
   DELETE /api/connectors/{id}
   ========================================================= */

export async function DELETE(
  request: Request
) {
  try {
    const id =
      getIdFromRequest(request);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid connector ID.",
        },
        { status: 400 }
      );
    }

    const existing =
      await getConnector(id);

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Connector not found.",
        },
        { status: 404 }
      );
    }

    /*
     * ApiRequest references Connector,
     * so remove request history first.
     */
    const requests =
      await db.orm.public.ApiRequest.all();

    for (const apiRequest of requests) {
      if (
        Number(
          apiRequest.connectorId
        ) === id
      ) {
        await db.orm.public.ApiRequest
          .where({
            id: apiRequest.id,
          })
          .delete();
      }
    }

    /*
     * Prisma ORM 8 delete syntax.
     */
    const deleted =
      await db.orm.public.Connector
        .where({ id })
        .delete();

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Connector could not be deleted.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      deletedId: id,
    });
  } catch (error) {
    console.error(
      "Failed to delete connector:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to delete connector.",
      },
      { status: 500 }
    );
  }
}