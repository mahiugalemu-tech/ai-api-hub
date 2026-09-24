module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/app/api/connectors/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../../../src/prisma/db'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
async function PUT(request, context) {
    try {
        /*
     * Next.js dynamic route parameters are provided
     * as a Promise in the current App Router.
     */ const params = await context.params;
        console.log("=================================");
        console.log("UPDATE CONNECTOR REQUEST");
        console.log("Params:", params);
        console.log("=================================");
        /*
     * Support either route naming:
     *
     * /api/connectors/[id]
     *
     * OR
     *
     * /api/connectors/[connectorId]
     */ const idParam = params?.id ?? params?.connectorId;
        console.log("Connector ID parameter:", idParam);
        /*
     * Make sure we actually received an ID.
     */ if (!idParam) {
            console.error("Connector ID is missing.", params);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Connector ID is missing",
                params
            }, {
                status: 400
            });
        }
        /*
     * Convert the URL parameter to a number.
     */ const id = Number(String(idParam).trim());
        console.log("Parsed connector ID:", id);
        /*
     * Validate the ID.
     */ if (!Number.isInteger(id) || id <= 0) {
            console.error("Invalid connector ID:", idParam);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid connector ID",
                receivedId: idParam
            }, {
                status: 400
            });
        }
        /*
     * Read the request body.
     */ const body = await request.json();
        console.log("Update payload:", body);
        /*
     * Validate required fields.
     */ if (!body.name || !body.provider || !body.model || !body.prompt) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Name, provider, model, and prompt are required"
            }, {
                status: 400
            });
        }
        /*
     * Get all connectors from the database.
     */ const connectors = await db.orm.public.Connector.all();
        console.log("Connectors in database:", connectors.map((connector)=>({
                id: connector.id,
                name: connector.name,
                provider: connector.provider,
                model: connector.model
            })));
        /*
     * Find the requested connector.
     */ const existingConnector = connectors.find((connector)=>connector.id === id);
        /*
     * Connector doesn't exist.
     */ if (!existingConnector) {
            console.error("Connector not found:", id);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Connector not found",
                connectorId: id
            }, {
                status: 404
            });
        }
        console.log("Found connector:", existingConnector);
        /*
     * Update using Prisma ORM 8 syntax.
     */ const updatedConnector = await db.orm.public.Connector.where({
            id
        }).update({
            name: body.name,
            slug: body.slug,
            description: body.description,
            provider: body.provider,
            model: body.model,
            prompt: body.prompt,
            inputSchema: body.inputSchema,
            outputSchema: body.outputSchema,
            authType: body.authType ?? "api_key",
            isActive: body.isActive ?? true
        });
        console.log("Connector successfully updated:", updatedConnector);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(updatedConnector);
    } catch (error) {
        console.error("FAILED TO UPDATE CONNECTOR:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : "Failed to update connector"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1q_emfg._.js.map