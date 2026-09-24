module.exports = [
"[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
var mod = await __turbopack_context__.y("pg-587764f78a6c7a9c");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/pg/lib/result.js [external] (pg/lib/result.js, cjs, [project]/node_modules/pg)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("pg-587764f78a6c7a9c/lib/result.js", () => require("pg-587764f78a6c7a9c/lib/result.js"));

module.exports = mod;
}),
"[externals]/pg/lib/utils.js [external] (pg/lib/utils.js, cjs, [project]/node_modules/pg)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("pg-587764f78a6c7a9c/lib/utils.js", () => require("pg-587764f78a6c7a9c/lib/utils.js"));

module.exports = mod;
}),
"[project]/node_modules/@ark/util/out/arrays.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Extracts duplicated elements and their indices from an array, returning them.
 *
 * Note that given `a === b && b === c`, then `c === a` must be `true` for this to give accurate results.
 *
 * @param arr The array to extract duplicate elements from.
 */ __turbopack_context__.s([
    "ReadonlyArray",
    ()=>ReadonlyArray,
    "append",
    ()=>append,
    "appendUnique",
    ()=>appendUnique,
    "arrayEquals",
    ()=>arrayEquals,
    "conflatenate",
    ()=>conflatenate,
    "conflatenateAll",
    ()=>conflatenateAll,
    "getDuplicatesOf",
    ()=>getDuplicatesOf,
    "getPath",
    ()=>getPath,
    "groupBy",
    ()=>groupBy,
    "includes",
    ()=>includes,
    "intersectUniqueLists",
    ()=>intersectUniqueLists,
    "join",
    ()=>join,
    "liftArray",
    ()=>liftArray,
    "range",
    ()=>range,
    "spliterate",
    ()=>spliterate
]);
const getDuplicatesOf = (arr, opts)=>{
    const isEqual = opts?.isEqual ?? ((l, r)=>l === r);
    const elementFirstSeenIndx = new Map();
    const duplicates = [];
    for (const [indx, element] of arr.entries()){
        const duplicatesIndx = duplicates.findIndex((duplicate)=>isEqual(duplicate.element, element));
        if (duplicatesIndx !== -1) {
            // This is at least the third occurrence of an item equal to `element`,
            // so add this index to the list of indices where the element is duplicated.
            duplicates[duplicatesIndx].indices.push(indx);
            continue;
        }
        // At this point, we know this is either the first
        // or second occurrence of an item equal to `element`...
        let found = false;
        for (const [existingElement, firstSeenIndx] of elementFirstSeenIndx){
            if (isEqual(element, existingElement)) {
                // This is the second occurrence of an item equal to `element`,
                // so store it as a duplicate.
                found = true;
                duplicates.push({
                    element: existingElement,
                    indices: [
                        firstSeenIndx,
                        indx
                    ]
                });
            }
        }
        if (!found) {
            // We haven't seen this element before,
            // so just store the index it was first seen
            elementFirstSeenIndx.set(element, indx);
        }
    }
    return duplicates;
};
const join = (segments, delimiter)=>segments.join(delimiter);
const getPath = (root, path)=>{
    let result = root;
    for (const segment of path){
        if (typeof result !== "object" || result === null) return undefined;
        result = result[segment];
    }
    return result;
};
const intersectUniqueLists = (l, r)=>{
    const intersection = [
        ...l
    ];
    for (const item of r)if (!l.includes(item)) intersection.push(item);
    return intersection;
};
const liftArray = (data)=>Array.isArray(data) ? data : [
        data
    ];
const spliterate = (arr, predicate)=>{
    const result = [
        [],
        []
    ];
    for (const item of arr){
        if (predicate(item)) result[0].push(item);
        else result[1].push(item);
    }
    return result;
};
const ReadonlyArray = Array;
const includes = (array, element)=>array.includes(element);
const range = (length, offset = 0)=>[
        ...new Array(length)
    ].map((_, i)=>i + offset);
const append = (to, value, opts)=>{
    if (to === undefined) {
        return value === undefined ? [] : Array.isArray(value) ? value : [
            value
        ];
    }
    if (opts?.prepend) {
        if (Array.isArray(value)) to.unshift(...value);
        else to.unshift(value);
    } else {
        if (Array.isArray(value)) to.push(...value);
        else to.push(value);
    }
    return to;
};
const conflatenate = (to, elementOrList)=>{
    if (elementOrList === undefined || elementOrList === null) return to ?? [];
    if (to === undefined || to === null) return liftArray(elementOrList);
    return to.concat(elementOrList);
};
const conflatenateAll = (...elementsOrLists)=>elementsOrLists.reduce(conflatenate, []);
const appendUnique = (to, value, opts)=>{
    if (to === undefined) return Array.isArray(value) ? value : [
        value
    ];
    const isEqual = opts?.isEqual ?? ((l, r)=>l === r);
    for (const v of liftArray(value))if (!to.some((existing)=>isEqual(existing, v))) to.push(v);
    return to;
};
const groupBy = (array, discriminant)=>array.reduce((result, item)=>{
        const key = item[discriminant];
        result[key] = append(result[key], item);
        return result;
    }, {});
const arrayEquals = (l, r, opts)=>l.length === r.length && l.every(opts?.isEqual ? (lItem, i)=>opts.isEqual(lItem, r[i]) : (lItem, i)=>lItem === r[i]);
}),
"[project]/node_modules/@ark/util/out/clone.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deepClone",
    ()=>deepClone,
    "shallowClone",
    ()=>shallowClone
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$objectKinds$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/objectKinds.js [app-route] (ecmascript)");
;
const shallowClone = (input)=>_clone(input, null);
const deepClone = (input)=>_clone(input, new Map());
const _clone = (input, seen)=>{
    if (typeof input !== "object" || input === null) return input;
    if (seen?.has(input)) return seen.get(input);
    const builtinConstructorName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$objectKinds$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBuiltinNameOfConstructor"])(input.constructor);
    if (builtinConstructorName === "Date") return new Date(input.getTime());
    // we don't try and clone other prototypes here since this we can't guarantee arrow functions attached to the object
    // are rebound in case they reference `this` (see https://x.com/colinhacks/status/1818422039210049985)
    if (builtinConstructorName && builtinConstructorName !== "Array") return input;
    const cloned = Array.isArray(input) ? input.slice() : Object.create(Object.getPrototypeOf(input));
    const propertyDescriptors = Object.getOwnPropertyDescriptors(input);
    if (seen) {
        seen.set(input, cloned);
        for(const k in propertyDescriptors){
            const desc = propertyDescriptors[k];
            if ("get" in desc || "set" in desc) continue;
            desc.value = _clone(desc.value, seen);
        }
    }
    Object.defineProperties(cloned, propertyDescriptors);
    return cloned;
};
}),
"[project]/node_modules/@ark/util/out/domain.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "domainDescriptions",
    ()=>domainDescriptions,
    "domainOf",
    ()=>domainOf,
    "hasDomain",
    ()=>hasDomain,
    "jsTypeOfDescriptions",
    ()=>jsTypeOfDescriptions
]);
const hasDomain = (data, kind)=>domainOf(data) === kind;
const domainOf = (data)=>{
    const builtinType = typeof data;
    return builtinType === "object" ? data === null ? "null" : "object" : builtinType === "function" ? "object" : builtinType;
};
const domainDescriptions = {
    boolean: "boolean",
    null: "null",
    undefined: "undefined",
    bigint: "a bigint",
    number: "a number",
    object: "an object",
    string: "a string",
    symbol: "a symbol"
};
const jsTypeOfDescriptions = {
    ...domainDescriptions,
    function: "a function"
};
}),
"[project]/node_modules/@ark/util/out/errors.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InternalArktypeError",
    ()=>InternalArktypeError,
    "ParseError",
    ()=>ParseError,
    "ZeroWidthSpace",
    ()=>ZeroWidthSpace,
    "noSuggest",
    ()=>noSuggest,
    "throwError",
    ()=>throwError,
    "throwInternalError",
    ()=>throwInternalError,
    "throwParseError",
    ()=>throwParseError
]);
class InternalArktypeError extends Error {
}
const throwInternalError = (message)=>throwError(message, InternalArktypeError);
const throwError = (message, ctor = Error)=>{
    throw new ctor(message);
};
class ParseError extends Error {
    name = "ParseError";
}
const throwParseError = (message)=>throwError(message, ParseError);
const noSuggest = (s)=>` ${s}`;
const ZeroWidthSpace = "\u{200B}";
}),
"[project]/node_modules/@ark/util/out/flatMorph.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "flatMorph",
    ()=>flatMorph
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$arrays$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/arrays.js [app-route] (ecmascript)");
;
const flatMorph = (o, flatMapEntry)=>{
    const result = {};
    const inputIsArray = Array.isArray(o);
    let outputShouldBeArray = false;
    for (const [i, entry] of Object.entries(o).entries()){
        const mapped = inputIsArray ? flatMapEntry(i, entry[1]) : flatMapEntry(...entry, i);
        outputShouldBeArray ||= typeof mapped[0] === "number";
        const flattenedEntries = Array.isArray(mapped[0]) || mapped.length === 0 ? // if we have an empty array (for filtering) or an array with
        // another array as its first element, treat it as a list
        mapped : [
            mapped
        ];
        for (const [k, v] of flattenedEntries){
            if (typeof k === "object") result[k.group] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$arrays$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["append"])(result[k.group], v);
            else result[k] = v;
        }
    }
    return outputShouldBeArray ? Object.values(result) : result;
};
}),
"[project]/node_modules/@ark/util/out/functions.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Callable",
    ()=>Callable,
    "DynamicFunction",
    ()=>DynamicFunction,
    "cached",
    ()=>cached,
    "envHasCsp",
    ()=>envHasCsp,
    "isThunk",
    ()=>isThunk,
    "tryCatch",
    ()=>tryCatch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/errors.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$records$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/records.js [app-route] (ecmascript)");
;
;
const cached = (thunk)=>{
    let result = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$records$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["unset"];
    return ()=>result === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$records$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["unset"] ? result = thunk() : result;
};
const isThunk = (value)=>typeof value === "function" && value.length === 0;
const tryCatch = (fn, onError)=>{
    try {
        return fn();
    } catch (e) {
        return onError?.(e);
    }
};
const DynamicFunction = class extends Function {
    constructor(...args){
        const params = args.slice(0, -1);
        const body = args[args.length - 1];
        try {
            super(...params, body);
        } catch (e) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["throwInternalError"])(`Encountered an unexpected error while compiling your definition:
                Message: ${e} 
                Source: (${args.slice(0, -1)}) => {
                    ${args[args.length - 1]}
                }`);
        }
    }
};
class Callable {
    constructor(fn, ...[opts]){
        return Object.assign(Object.setPrototypeOf(fn.bind(opts?.bind ?? this), this.constructor.prototype), opts?.attach);
    }
}
const envHasCsp = cached(()=>{
    try {
        return new Function("return false")();
    } catch  {
        return true;
    }
});
}),
"[project]/node_modules/@ark/util/out/generics.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "brand",
    ()=>brand,
    "inferred",
    ()=>inferred,
    "narrow",
    ()=>narrow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/errors.js [app-route] (ecmascript)");
;
const brand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["noSuggest"])("brand");
const narrow = (t)=>t;
const inferred = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["noSuggest"])("arkInferred");
}),
"[project]/node_modules/@ark/util/out/hkt.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Hkt",
    ()=>Hkt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/errors.js [app-route] (ecmascript)");
;
const args = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["noSuggest"])("args");
class Hkt {
    constructor(){}
}
}),
"[project]/node_modules/@ark/util/out/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$clone$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/clone.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$flatMorph$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/flatMorph.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$functions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/functions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$generics$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/generics.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$hkt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/hkt.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$numbers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/numbers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$objectKinds$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/objectKinds.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$path$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/path.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$records$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/records.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$registry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/registry.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$scanner$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/scanner.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$serialize$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/serialize.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$traits$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/traits.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/node_modules/@ark/util/out/isomorphic.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isomorphic",
    ()=>isomorphic
]);
// based on the util of the same name in @ark/fs
// isolated here for use with registry
/** get a CJS/ESM compatible string representing the current file */ const fileName = ()=>{
    try {
        const error = new Error();
        const stackLine = error.stack?.split("\n")[2]?.trim() || ""; // [1]=this func, [2]=caller
        const filePath = stackLine.match(/\(?(.+?)(?::\d+:\d+)?\)?$/)?.[1] || "unknown";
        return filePath.replace(/^file:\/\//, "");
    } catch  {
        return "unknown";
    }
};
const env = globalThis.process?.env ?? {};
const isomorphic = {
    fileName,
    env
};
}),
"[project]/node_modules/@ark/util/out/numbers.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "integerLikeMatcher",
    ()=>integerLikeMatcher,
    "isNumericString",
    ()=>isNumericString,
    "isWellFormedInteger",
    ()=>isWellFormedInteger,
    "isWellFormedNumber",
    ()=>isWellFormedNumber,
    "nearestFloat",
    ()=>nearestFloat,
    "numberLikeMatcher",
    ()=>numberLikeMatcher,
    "numericStringMatcher",
    ()=>numericStringMatcher,
    "tryParseInteger",
    ()=>tryParseInteger,
    "tryParseNumber",
    ()=>tryParseNumber,
    "tryParseWellFormedBigint",
    ()=>tryParseWellFormedBigint,
    "tryParseWellFormedNumber",
    ()=>tryParseWellFormedNumber,
    "wellFormedIntegerMatcher",
    ()=>wellFormedIntegerMatcher,
    "wellFormedNumberMatcher",
    ()=>wellFormedNumberMatcher,
    "writeMalformedNumericLiteralMessage",
    ()=>writeMalformedNumericLiteralMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/errors.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$strings$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/strings.js [app-route] (ecmascript)");
;
;
/*
 * The goal of the number literal and bigint literal regular expressions is to:
 *
 *   1. Ensure definitions form a bijection with the values they represent.
 *   2. Attempt to mirror TypeScript's own format for stringification of numeric
 *      values such that the regex should match a given definition if any only if
 *      a precise literal type will be inferred (in TS4.8+).
 */ const anchoredNegativeZeroPattern = /^-0\.?0*$/.source;
const positiveIntegerPattern = /[1-9]\d*/.source;
const looseDecimalPattern = /\.\d+/.source;
const strictDecimalPattern = /\.\d*[1-9]/.source;
const createNumberMatcher = (opts)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$strings$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["anchoredRegex"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$strings$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RegexPatterns"].negativeLookahead(anchoredNegativeZeroPattern) + __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$strings$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RegexPatterns"].nonCapturingGroup("-?" + __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$strings$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RegexPatterns"].nonCapturingGroup(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$strings$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RegexPatterns"].nonCapturingGroup("0|" + positiveIntegerPattern) + __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$strings$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RegexPatterns"].nonCapturingGroup(opts.decimalPattern) + "?") + (opts.allowDecimalOnly ? "|" + opts.decimalPattern : "") + "?"));
const wellFormedNumberMatcher = createNumberMatcher({
    decimalPattern: strictDecimalPattern,
    allowDecimalOnly: false
});
const isWellFormedNumber = wellFormedNumberMatcher.test.bind(wellFormedNumberMatcher);
const numericStringMatcher = createNumberMatcher({
    decimalPattern: looseDecimalPattern,
    allowDecimalOnly: true
});
const isNumericString = numericStringMatcher.test.bind(numericStringMatcher);
const numberLikeMatcher = /^-?\d*\.?\d*$/;
const isNumberLike = (s)=>s.length !== 0 && numberLikeMatcher.test(s);
const wellFormedIntegerMatcher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$strings$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["anchoredRegex"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$strings$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RegexPatterns"].negativeLookahead("^-0$") + "-?" + __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$strings$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RegexPatterns"].nonCapturingGroup(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$strings$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RegexPatterns"].nonCapturingGroup("0|" + positiveIntegerPattern)));
const isWellFormedInteger = wellFormedIntegerMatcher.test.bind(wellFormedIntegerMatcher);
const integerLikeMatcher = /^-?\d+$/;
const isIntegerLike = integerLikeMatcher.test.bind(integerLikeMatcher);
const numericLiteralDescriptions = {
    number: "a number",
    bigint: "a bigint",
    integer: "an integer"
};
const writeMalformedNumericLiteralMessage = (def, kind)=>`'${def}' was parsed as ${numericLiteralDescriptions[kind]} but could not be narrowed to a literal value. Avoid unnecessary leading or trailing zeros and other abnormal notation`;
const isWellFormed = (def, kind)=>kind === "number" ? isWellFormedNumber(def) : isWellFormedInteger(def);
const parseKind = (def, kind)=>kind === "number" ? Number(def) : Number.parseInt(def);
const isKindLike = (def, kind)=>kind === "number" ? isNumberLike(def) : isIntegerLike(def);
const tryParseNumber = (token, options)=>parseNumeric(token, "number", options);
const tryParseWellFormedNumber = (token, options)=>parseNumeric(token, "number", {
        ...options,
        strict: true
    });
const tryParseInteger = (token, options)=>parseNumeric(token, "integer", options);
const parseNumeric = (token, kind, options)=>{
    const value = parseKind(token, kind);
    if (!Number.isNaN(value)) {
        if (isKindLike(token, kind)) {
            if (options?.strict) {
                return isWellFormed(token, kind) ? value : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["throwParseError"])(writeMalformedNumericLiteralMessage(token, kind));
            }
            return value;
        }
    }
    return options?.errorOnFail ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["throwParseError"])(options?.errorOnFail === true ? `Failed to parse ${numericLiteralDescriptions[kind]} from '${token}'` : options?.errorOnFail) : undefined;
};
const tryParseWellFormedBigint = (def)=>{
    if (def[def.length - 1] !== "n") return;
    const maybeIntegerLiteral = def.slice(0, -1);
    let value;
    try {
        value = BigInt(maybeIntegerLiteral);
    } catch  {
        return;
    }
    if (wellFormedIntegerMatcher.test(maybeIntegerLiteral)) return value;
    if (integerLikeMatcher.test(maybeIntegerLiteral)) {
        // If the definition looks like a bigint but is
        // not well-formed, throw.
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["throwParseError"])(writeMalformedNumericLiteralMessage(def, "bigint"));
    }
};
const nearestFloat = (n, direction = "+")=>{
    const buffer = new ArrayBuffer(8);
    const f64 = new Float64Array(buffer);
    const u32 = new Uint32Array(buffer);
    f64[0] = n;
    if (n === 0) {
        u32[0] = 1;
        u32[1] = direction === "-" ? 1 << 31 : 0;
    } else if (n > 0 && direction === "+" || n < 0 && direction === "-") {
        if (u32[0]++ === 0xffffffff) u32[1]++;
    } else if (u32[0]-- === 0) u32[1]--;
    return f64[0];
};
}),
"[project]/node_modules/@ark/util/out/objectKinds.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FileConstructor",
    ()=>FileConstructor,
    "ancestorsOf",
    ()=>ancestorsOf,
    "builtinConstructors",
    ()=>builtinConstructors,
    "constructorExtends",
    ()=>constructorExtends,
    "ecmascriptConstructors",
    ()=>ecmascriptConstructors,
    "ecmascriptDescriptions",
    ()=>ecmascriptDescriptions,
    "getBuiltinNameOfConstructor",
    ()=>getBuiltinNameOfConstructor,
    "hasObjectKind",
    ()=>hasObjectKind,
    "isArray",
    ()=>isArray,
    "objectKindDescriptions",
    ()=>objectKindDescriptions,
    "objectKindOf",
    ()=>objectKindOf,
    "objectKindOrDomainOf",
    ()=>objectKindOrDomainOf,
    "platformConstructors",
    ()=>platformConstructors,
    "platformDescriptions",
    ()=>platformDescriptions,
    "typedArrayConstructors",
    ()=>typedArrayConstructors,
    "typedArrayDescriptions",
    ()=>typedArrayDescriptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$domain$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/domain.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$records$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/records.js [app-route] (ecmascript)");
;
;
const ecmascriptConstructors = {
    Array,
    Boolean,
    Date,
    Error,
    Function,
    Map,
    Number,
    Promise,
    RegExp,
    Set,
    String,
    WeakMap,
    WeakSet
};
const FileConstructor = globalThis.File ?? Blob;
const platformConstructors = {
    ArrayBuffer,
    Blob,
    File: FileConstructor,
    FormData,
    Headers,
    Request,
    Response,
    URL
};
const typedArrayConstructors = {
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
    BigInt64Array,
    BigUint64Array
};
const builtinConstructors = {
    ...ecmascriptConstructors,
    ...platformConstructors,
    ...typedArrayConstructors,
    String,
    Number,
    Boolean
};
const objectKindOf = (data)=>{
    let prototype = Object.getPrototypeOf(data);
    while(prototype?.constructor && (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$records$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isKeyOf"])(prototype.constructor.name, builtinConstructors) || !(data instanceof builtinConstructors[prototype.constructor.name])))prototype = Object.getPrototypeOf(prototype);
    const name = prototype?.constructor?.name;
    if (name === undefined || name === "Object") return undefined;
    return name;
};
const objectKindOrDomainOf = (data)=>typeof data === "object" && data !== null ? objectKindOf(data) ?? "object" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$domain$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domainOf"])(data);
const hasObjectKind = (data, kind)=>objectKindOf(data) === kind;
const isArray = Array.isArray;
const ecmascriptDescriptions = {
    Array: "an array",
    Function: "a function",
    Date: "a Date",
    RegExp: "a RegExp",
    Error: "an Error",
    Map: "a Map",
    Set: "a Set",
    String: "a String object",
    Number: "a Number object",
    Boolean: "a Boolean object",
    Promise: "a Promise",
    WeakMap: "a WeakMap",
    WeakSet: "a WeakSet"
};
const platformDescriptions = {
    ArrayBuffer: "an ArrayBuffer instance",
    Blob: "a Blob instance",
    File: "a File instance",
    FormData: "a FormData instance",
    Headers: "a Headers instance",
    Request: "a Request instance",
    Response: "a Response instance",
    URL: "a URL instance"
};
const typedArrayDescriptions = {
    Int8Array: "an Int8Array",
    Uint8Array: "a Uint8Array",
    Uint8ClampedArray: "a Uint8ClampedArray",
    Int16Array: "an Int16Array",
    Uint16Array: "a Uint16Array",
    Int32Array: "an Int32Array",
    Uint32Array: "a Uint32Array",
    Float32Array: "a Float32Array",
    Float64Array: "a Float64Array",
    BigInt64Array: "a BigInt64Array",
    BigUint64Array: "a BigUint64Array"
};
const objectKindDescriptions = {
    ...ecmascriptDescriptions,
    ...platformDescriptions,
    ...typedArrayDescriptions
};
const getBuiltinNameOfConstructor = (ctor)=>{
    const constructorName = Object(ctor).name ?? null;
    return constructorName && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$records$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isKeyOf"])(constructorName, builtinConstructors) && builtinConstructors[constructorName] === ctor ? constructorName : null;
};
const ancestorsOf = (o)=>{
    let proto = Object.getPrototypeOf(o);
    const result = [];
    while(proto !== null){
        result.push(proto.constructor);
        proto = Object.getPrototypeOf(proto);
    }
    return result;
};
const constructorExtends = (ctor, base)=>{
    let current = ctor.prototype;
    while(current !== null){
        if (current === base.prototype) return true;
        current = Object.getPrototypeOf(current);
    }
    return false;
};
}),
"[project]/node_modules/@ark/util/out/path.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReadonlyPath",
    ()=>ReadonlyPath,
    "appendStringifiedKey",
    ()=>appendStringifiedKey,
    "stringifyPath",
    ()=>stringifyPath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$arrays$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/arrays.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/errors.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$registry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/registry.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$serialize$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/serialize.js [app-route] (ecmascript)");
;
;
;
;
const appendStringifiedKey = (path, prop, ...[opts])=>{
    const stringifySymbol = opts?.stringifySymbol ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$serialize$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["printable"];
    let propAccessChain = path;
    switch(typeof prop){
        case "string":
            propAccessChain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$registry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDotAccessible"])(prop) ? path === "" ? prop : `${path}.${prop}` : `${path}[${JSON.stringify(prop)}]`;
            break;
        case "number":
            propAccessChain = `${path}[${prop}]`;
            break;
        case "symbol":
            propAccessChain = `${path}[${stringifySymbol(prop)}]`;
            break;
        default:
            if (opts?.stringifyNonKey) propAccessChain = `${path}[${opts.stringifyNonKey(prop)}]`;
            else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["throwParseError"])(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$serialize$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["printable"])(prop)} must be a PropertyKey or stringifyNonKey must be passed to options`);
            }
    }
    return propAccessChain;
};
const stringifyPath = (path, ...opts)=>path.reduce((s, k)=>appendStringifiedKey(s, k, ...opts), "");
class ReadonlyPath extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$arrays$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ReadonlyArray"] {
    // alternate strategy for caching since the base object is frozen
    cache = {};
    constructor(...items){
        super();
        this.push(...items);
    }
    toJSON() {
        if (this.cache.json) return this.cache.json;
        this.cache.json = [];
        for(let i = 0; i < this.length; i++){
            this.cache.json.push(typeof this[i] === "symbol" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$serialize$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["printable"])(this[i]) : this[i]);
        }
        return this.cache.json;
    }
    stringify() {
        if (this.cache.stringify) return this.cache.stringify;
        return this.cache.stringify = stringifyPath(this);
    }
    stringifyAncestors() {
        if (this.cache.stringifyAncestors) return this.cache.stringifyAncestors;
        let propString = "";
        const result = [
            propString
        ];
        for (const path of this){
            propString = appendStringifiedKey(propString, path);
            result.push(propString);
        }
        return this.cache.stringifyAncestors = result;
    }
}
}),
"[project]/node_modules/@ark/util/out/primitive.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "serializePrimitive",
    ()=>serializePrimitive
]);
const serializePrimitive = (value)=>typeof value === "string" ? JSON.stringify(value) : typeof value === "bigint" ? `${value}n` : `${value}`;
}),
"[project]/node_modules/@ark/util/out/records.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CastableBase",
    ()=>CastableBase,
    "DynamicBase",
    ()=>DynamicBase,
    "InnerDynamicBase",
    ()=>InnerDynamicBase,
    "NoopBase",
    ()=>NoopBase,
    "defineProperties",
    ()=>defineProperties,
    "entriesOf",
    ()=>entriesOf,
    "enumValues",
    ()=>enumValues,
    "fromEntries",
    ()=>fromEntries,
    "hasDefinedKey",
    ()=>hasDefinedKey,
    "hasKey",
    ()=>hasKey,
    "invert",
    ()=>invert,
    "isEmptyObject",
    ()=>isEmptyObject,
    "isKeyOf",
    ()=>isKeyOf,
    "keysOf",
    ()=>keysOf,
    "omit",
    ()=>omit,
    "pick",
    ()=>pick,
    "splitByKeys",
    ()=>splitByKeys,
    "stringAndSymbolicEntriesOf",
    ()=>stringAndSymbolicEntriesOf,
    "unset",
    ()=>unset,
    "withAlphabetizedKeys",
    ()=>withAlphabetizedKeys
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/errors.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$flatMorph$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/flatMorph.js [app-route] (ecmascript)");
;
;
const entriesOf = Object.entries;
const fromEntries = (entries)=>Object.fromEntries(entries);
const keysOf = (o)=>Object.keys(o);
const isKeyOf = (k, o)=>k in o;
const hasKey = (o, k)=>k in o;
const hasDefinedKey = (o, k)=>o[k] !== undefined;
const InnerDynamicBase = class {
};
class DynamicBase {
    constructor(properties){
        Object.assign(this, properties);
    }
}
const NoopBase = class {
};
class CastableBase extends NoopBase {
}
const splitByKeys = (o, leftKeys)=>{
    const l = {};
    const r = {};
    let k;
    for(k in o){
        if (k in leftKeys) l[k] = o[k];
        else r[k] = o[k];
    }
    return [
        l,
        r
    ];
};
const pick = (o, keys)=>splitByKeys(o, keys)[0];
const omit = (o, keys)=>splitByKeys(o, keys)[1];
const isEmptyObject = (o)=>Object.keys(o).length === 0;
const stringAndSymbolicEntriesOf = (o)=>[
        ...Object.entries(o),
        ...Object.getOwnPropertySymbols(o).map((k)=>[
                k,
                o[k]
            ])
    ];
const defineProperties = (base, merged)=>// declared like this to avoid https://github.com/microsoft/TypeScript/issues/55049
    Object.defineProperties(base, Object.getOwnPropertyDescriptors(merged));
const withAlphabetizedKeys = (o)=>{
    const keys = Object.keys(o).sort();
    const result = {};
    for(let i = 0; i < keys.length; i++)result[keys[i]] = o[keys[i]];
    return result;
};
const invert = (t)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$flatMorph$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["flatMorph"])(t, (k, v)=>[
            v,
            k
        ]);
const unset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["noSuggest"])(`unset${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZeroWidthSpace"]}`);
const enumValues = (tsEnum)=>Object.values(tsEnum).filter((v)=>{
        if (typeof v === "number") return true;
        return typeof tsEnum[v] !== "number";
    });
}),
"[project]/node_modules/@ark/util/out/registry.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "arkUtilVersion",
    ()=>arkUtilVersion,
    "initialRegistryContents",
    ()=>initialRegistryContents,
    "isDotAccessible",
    ()=>isDotAccessible,
    "register",
    ()=>register,
    "registry",
    ()=>registry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$domain$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/domain.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/errors.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$isomorphic$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/isomorphic.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$objectKinds$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/objectKinds.js [app-route] (ecmascript)");
;
;
;
;
const arkUtilVersion = "0.56.2";
const initialRegistryContents = {
    version: arkUtilVersion,
    filename: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$isomorphic$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isomorphic"].fileName(),
    FileConstructor: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$objectKinds$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FileConstructor"]
};
const registry = initialRegistryContents;
const namesByResolution = new Map();
const nameCounts = Object.create(null);
const register = (value)=>{
    const existingName = namesByResolution.get(value);
    if (existingName) return existingName;
    let name = baseNameFor(value);
    if (nameCounts[name]) name = `${name}${nameCounts[name]++}`;
    else nameCounts[name] = 1;
    registry[name] = value;
    namesByResolution.set(value, name);
    return name;
};
const isDotAccessible = (keyName)=>/^[$A-Z_a-z][\w$]*$/.test(keyName);
const baseNameFor = (value)=>{
    switch(typeof value){
        case "object":
            {
                if (value === null) break;
                const prefix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$objectKinds$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["objectKindOf"])(value) ?? "object";
                // convert to camelCase
                return prefix[0].toLowerCase() + prefix.slice(1);
            }
        case "function":
            return isDotAccessible(value.name) ? value.name : "fn";
        case "symbol":
            return value.description && isDotAccessible(value.description) ? value.description : "symbol";
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["throwInternalError"])(`Unexpected attempt to register serializable value of type ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$domain$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domainOf"])(value)}`);
};
}),
"[project]/node_modules/@ark/util/out/scanner.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Scanner",
    ()=>Scanner,
    "writeUnclosedGroupMessage",
    ()=>writeUnclosedGroupMessage,
    "writeUnmatchedGroupCloseMessage",
    ()=>writeUnmatchedGroupCloseMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$strings$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/strings.js [app-route] (ecmascript)");
;
class Scanner {
    chars;
    i;
    def;
    constructor(def){
        this.def = def;
        this.chars = [
            ...def
        ];
        this.i = 0;
    }
    /** Get lookahead and advance scanner by one */ shift() {
        return this.chars[this.i++] ?? "";
    }
    get lookahead() {
        return this.chars[this.i] ?? "";
    }
    get nextLookahead() {
        return this.chars[this.i + 1] ?? "";
    }
    get length() {
        return this.chars.length;
    }
    shiftUntil(condition) {
        let shifted = "";
        while(this.lookahead){
            if (condition(this, shifted)) break;
            else shifted += this.shift();
        }
        return shifted;
    }
    shiftUntilEscapable(condition) {
        let shifted = "";
        while(this.lookahead){
            if (this.lookahead === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$strings$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Backslash"]) {
                this.shift();
                if (condition(this, shifted)) shifted += this.shift();
                else if (this.lookahead === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$strings$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Backslash"]) shifted += this.shift();
                else shifted += `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$strings$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Backslash"]}${this.shift()}`;
            } else if (condition(this, shifted)) break;
            else shifted += this.shift();
        }
        return shifted;
    }
    shiftUntilLookahead(charOrSet) {
        return typeof charOrSet === "string" ? this.shiftUntil((s)=>s.lookahead === charOrSet) : this.shiftUntil((s)=>s.lookahead in charOrSet);
    }
    shiftUntilNonWhitespace() {
        return this.shiftUntil(()=>!(this.lookahead in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$strings$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["whitespaceChars"]));
    }
    jumpToIndex(i) {
        this.i = i < 0 ? this.length + i : i;
    }
    jumpForward(count) {
        this.i += count;
    }
    get location() {
        return this.i;
    }
    get unscanned() {
        return this.chars.slice(this.i, this.length).join("");
    }
    get scanned() {
        return this.chars.slice(0, this.i).join("");
    }
    sliceChars(start, end) {
        return this.chars.slice(start, end).join("");
    }
    lookaheadIs(char) {
        return this.lookahead === char;
    }
    lookaheadIsIn(tokens) {
        return this.lookahead in tokens;
    }
}
const writeUnmatchedGroupCloseMessage = (char, unscanned)=>`Unmatched ${char}${unscanned === "" ? "" : ` before ${unscanned}`}`;
const writeUnclosedGroupMessage = (missingChar)=>`Missing ${missingChar}`;
}),
"[project]/node_modules/@ark/util/out/serialize.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "describeCollapsibleDate",
    ()=>describeCollapsibleDate,
    "print",
    ()=>print,
    "printable",
    ()=>printable,
    "snapshot",
    ()=>snapshot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$domain$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/domain.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$primitive$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/primitive.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$records$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/records.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$registry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/registry.js [app-route] (ecmascript)");
;
;
;
;
const snapshot = (data, opts = {})=>_serialize(data, {
        onUndefined: `$ark.undefined`,
        onBigInt: (n)=>`$ark.bigint-${n}`,
        ...opts
    }, []);
const print = (data, opts)=>console.log(printable(data, opts));
const printable = (data, opts)=>{
    switch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$domain$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domainOf"])(data)){
        case "object":
            const o = data;
            const ctorName = o.constructor?.name ?? "Object";
            return ctorName === "Object" || ctorName === "Array" ? opts?.quoteKeys === false ? stringifyUnquoted(o, opts?.indent ?? 0, "") : JSON.stringify(_serialize(o, printableOpts, []), null, opts?.indent) : stringifyUnquoted(o, opts?.indent ?? 0, "");
        case "symbol":
            return printableOpts.onSymbol(data);
        default:
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$primitive$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializePrimitive"])(data);
    }
};
const stringifyUnquoted = (value, indent, currentIndent)=>{
    if (typeof value === "function") return printableOpts.onFunction(value);
    if (typeof value !== "object" || value === null) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$primitive$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializePrimitive"])(value);
    const nextIndent = currentIndent + " ".repeat(indent);
    if (Array.isArray(value)) {
        if (value.length === 0) return "[]";
        const items = value.map((item)=>stringifyUnquoted(item, indent, nextIndent)).join(",\n" + nextIndent);
        return indent ? `[\n${nextIndent}${items}\n${currentIndent}]` : `[${items}]`;
    }
    const ctorName = value.constructor?.name ?? "Object";
    if (ctorName === "Object") {
        const keyValues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$records$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringAndSymbolicEntriesOf"])(value).map(([key, val])=>{
            const stringifiedKey = typeof key === "symbol" ? printableOpts.onSymbol(key) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$registry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDotAccessible"])(key) ? key : JSON.stringify(key);
            const stringifiedValue = stringifyUnquoted(val, indent, nextIndent);
            return `${nextIndent}${stringifiedKey}: ${stringifiedValue}`;
        });
        if (keyValues.length === 0) return "{}";
        return indent ? `{\n${keyValues.join(",\n")}\n${currentIndent}}` : `{${keyValues.join(", ")}}`;
    }
    if (value instanceof Date) return describeCollapsibleDate(value);
    if ("expression" in value && typeof value.expression === "string") return value.expression;
    return ctorName;
};
const printableOpts = {
    onCycle: ()=>"(cycle)",
    onSymbol: (v)=>`Symbol(${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$registry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["register"])(v)})`,
    onFunction: (v)=>`Function(${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$registry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["register"])(v)})`
};
const _serialize = (data, opts, seen)=>{
    switch((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$domain$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domainOf"])(data)){
        case "object":
            {
                const o = data;
                if ("toJSON" in o && typeof o.toJSON === "function") return o.toJSON();
                if (typeof o === "function") return printableOpts.onFunction(o);
                if (seen.includes(o)) return "(cycle)";
                const nextSeen = [
                    ...seen,
                    o
                ];
                if (Array.isArray(o)) return o.map((item)=>_serialize(item, opts, nextSeen));
                if (o instanceof Date) return o.toDateString();
                const result = {};
                for(const k in o)result[k] = _serialize(o[k], opts, nextSeen);
                for (const s of Object.getOwnPropertySymbols(o)){
                    result[opts.onSymbol?.(s) ?? s.toString()] = _serialize(o[s], opts, nextSeen);
                }
                return result;
            }
        case "symbol":
            return printableOpts.onSymbol(data);
        case "bigint":
            return opts.onBigInt?.(data) ?? `${data}n`;
        case "undefined":
            return opts.onUndefined ?? "undefined";
        case "string":
            return data.replace(/\\/g, "\\\\");
        default:
            return data;
    }
};
const describeCollapsibleDate = (date)=>{
    const year = date.getFullYear();
    const month = date.getMonth();
    const dayOfMonth = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    if (month === 0 && dayOfMonth === 1 && hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 0) return `${year}`;
    const datePortion = `${months[month]} ${dayOfMonth}, ${year}`;
    if (hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 0) return datePortion;
    let timePortion = date.toLocaleTimeString();
    const suffix = timePortion.endsWith(" AM") || timePortion.endsWith(" PM") ? timePortion.slice(-3) : "";
    if (suffix) timePortion = timePortion.slice(0, -suffix.length);
    if (milliseconds) timePortion += `.${pad(milliseconds, 3)}`;
    else if (timeWithUnnecessarySeconds.test(timePortion)) timePortion = timePortion.slice(0, -3);
    return `${timePortion + suffix}, ${datePortion}`;
};
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const timeWithUnnecessarySeconds = /:\d\d:00$/;
const pad = (value, length)=>String(value).padStart(length, "0");
}),
"[project]/node_modules/@ark/util/out/strings.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Backslash",
    ()=>Backslash,
    "RegexPatterns",
    ()=>RegexPatterns,
    "alphabet",
    ()=>alphabet,
    "anchoredRegex",
    ()=>anchoredRegex,
    "anchoredSource",
    ()=>anchoredSource,
    "capitalize",
    ()=>capitalize,
    "deanchoredRegex",
    ()=>deanchoredRegex,
    "deanchoredSource",
    ()=>deanchoredSource,
    "emojiToUnicode",
    ()=>emojiToUnicode,
    "uncapitalize",
    ()=>uncapitalize,
    "whitespaceChars",
    ()=>whitespaceChars
]);
const capitalize = (s)=>s[0].toUpperCase() + s.slice(1);
const uncapitalize = (s)=>s[0].toLowerCase() + s.slice(1);
const anchoredRegex = (regex)=>new RegExp(anchoredSource(regex), typeof regex === "string" ? "" : regex.flags);
const deanchoredRegex = (regex)=>new RegExp(deanchoredSource(regex), typeof regex === "string" ? "" : regex.flags);
const anchoredSource = (regex)=>{
    const source = typeof regex === "string" ? regex : regex.source;
    return `^(?:${source})$`;
};
const deanchoredSource = (regex)=>{
    const source = typeof regex === "string" ? regex : regex.source;
    if (source.startsWith("^(?:") && source.endsWith(")$")) return source.slice(4, -2);
    return source.slice(source[0] === "^" ? 1 : 0, source[source.length - 1] === "$" ? -1 : undefined);
};
const RegexPatterns = {
    negativeLookahead: (pattern)=>`(?!${pattern})`,
    nonCapturingGroup: (pattern)=>`(?:${pattern})`
};
const Backslash = "\\";
const whitespaceChars = {
    " ": 1,
    "\n": 1,
    "\t": 1
};
const emojiToUnicode = (emoji)=>emoji.split("").map((char)=>{
        const codePoint = char.codePointAt(0);
        return codePoint ? `\\u${codePoint.toString(16).padStart(4, "0")}` : "";
    }).join("");
const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
];
}),
"[project]/node_modules/@ark/util/out/traits.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Trait",
    ()=>Trait,
    "compose",
    ()=>compose,
    "hasTrait",
    ()=>hasTrait,
    "implement",
    ()=>implement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$domain$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/domain.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/errors.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$objectKinds$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/objectKinds.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$records$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ark/util/out/records.js [app-route] (ecmascript)");
;
;
;
;
// even though the value we attach will be identical, we use this so classes
// won't be treated as instanceof a Trait
const implementedTraits = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["noSuggest"])("implementedTraits");
const hasTrait = (traitClass)=>(o)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$domain$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasDomain"])(o, "object")) return false;
        if (implementedTraits in o.constructor && o.constructor[implementedTraits].includes(traitClass)) return true;
        // emulate standard instanceof behavior
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$objectKinds$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ancestorsOf"])(o).includes(traitClass);
    };
class Trait extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ark$2f$util$2f$out$2f$records$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NoopBase"] {
    static get [Symbol.hasInstance]() {
        return hasTrait(this);
    }
    traitsOf() {
        return implementedTraits in this.constructor ? this.constructor[implementedTraits] : [];
    }
}
const collectPrototypeDescriptors = (trait)=>{
    let proto = trait.prototype;
    let result = {};
    do {
        // ensure prototypes are sorted from lowest to highest precedence
        result = Object.assign(Object.getOwnPropertyDescriptors(proto), result);
        proto = Object.getPrototypeOf(proto);
    }while (proto !== Object.prototype && proto !== null)
    return result;
};
const compose = (...traits)=>{
    const base = function(...args) {
        for (const trait of traits){
            const instance = Reflect.construct(trait, args, this.constructor);
            Object.assign(this, instance);
        }
    };
    const flatImplementedTraits = [];
    for (const trait of traits){
        // copy static properties
        Object.assign(base, trait);
        // flatten and copy prototype
        Object.defineProperties(base.prototype, collectPrototypeDescriptors(trait));
        if (implementedTraits in trait) {
            // add any ancestor traits from which the current trait was composed
            for (const innerTrait of trait[implementedTraits]){
                if (!flatImplementedTraits.includes(innerTrait)) flatImplementedTraits.push(innerTrait);
            }
        }
        if (!flatImplementedTraits.includes(trait)) flatImplementedTraits.push(trait);
    }
    Object.defineProperty(base, implementedTraits, {
        value: flatImplementedTraits,
        enumerable: false
    });
    return base;
};
const implement = (...args)=>{
    if (args[args.length - 1] instanceof Trait) return compose(...args);
    const implementation = args[args.length - 1];
    const base = compose(...args.slice(0, -1));
    // copy implementation last since it overrides traits
    Object.defineProperties(base.prototype, Object.getOwnPropertyDescriptors(implementation));
    return base;
};
}),
"[project]/node_modules/@noble/hashes/_u64.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "add",
    ()=>add,
    "add3H",
    ()=>add3H,
    "add3L",
    ()=>add3L,
    "add4H",
    ()=>add4H,
    "add4L",
    ()=>add4L,
    "add5H",
    ()=>add5H,
    "add5L",
    ()=>add5L,
    "fromBig",
    ()=>fromBig,
    "fromNumH",
    ()=>fromNumH,
    "fromNumL",
    ()=>fromNumL,
    "rotr32H",
    ()=>rotr32H,
    "rotr32L",
    ()=>rotr32L,
    "rotrBH",
    ()=>rotrBH,
    "rotrBL",
    ()=>rotrBL,
    "rotrSH",
    ()=>rotrSH,
    "rotrSL",
    ()=>rotrSL,
    "setU64FromNum",
    ()=>setU64FromNum,
    "shrSH",
    ()=>shrSH,
    "shrSL",
    ()=>shrSL,
    "split",
    ()=>split,
    "toBig",
    ()=>toBig
]);
const U32_MASK64 = /* @__PURE__ */ (()=>BigInt(2 ** 32 - 1))();
const _32n = /* @__PURE__ */ BigInt(32);
// Split bigint into two 32-bit halves. With `le=true`, returned fields become `{ h: low, l: high
// }` to match little-endian word order rather than the property names.
function fromBig(n, le = false) {
    if (le) return {
        h: Number(n & U32_MASK64),
        l: Number(n >> _32n & U32_MASK64)
    };
    return {
        h: Number(n >> _32n & U32_MASK64) | 0,
        l: Number(n & U32_MASK64) | 0
    };
}
// Split bigint list into `[highWords, lowWords]` when `le=false`; with `le=true`, the first array
// holds the low halves because `fromBig(...)` swaps the semantic meaning of `h` and `l`.
function split(lst, le = false) {
    const len = lst.length;
    let Ah = new Uint32Array(len);
    let Al = new Uint32Array(len);
    for(let i = 0; i < len; i++){
        const { h, l } = fromBig(lst[i], le);
        [Ah[i], Al[i]] = [
            h,
            l
        ];
    }
    return [
        Ah,
        Al
    ];
}
// Combine explicit `(high, low)` 32-bit halves into a bigint; `>>> 0` normalizes signed JS
// bitwise results back to uint32 first, and little-endian callers must swap.
const toBig = (h, l)=>BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
// Split a JS number into u32 halves without a BigInt allocation. Exact only for integers
// `0 <= n < 2**53`; callers use it on byte / bit counters, which JS length math caps far below
// that (an ArrayBuffer cannot exceed 2**53 - 1 bytes).
const fromNumH = (n)=>n / 2 ** 32 | 0;
const fromNumL = (n)=>n >>> 0;
// Drop-in replacement for `view.setBigUint64(byteOffset, BigInt(n), isLE)` without the per-call
// BigInt allocation. Same `n < 2**53` precondition as `fromNumH`/`fromNumL`.
function setU64FromNum(view, byteOffset, n, isLE) {
    const h = fromNumH(n);
    const l = fromNumL(n);
    view.setUint32(byteOffset, isLE ? l : h, isLE);
    view.setUint32(byteOffset + 4, isLE ? h : l, isLE);
}
// High 32-bit half of a 64-bit logical right shift for `s` in `0..31`.
const shrSH = (h, _l, s)=>h >>> s;
// Low 32-bit half of a 64-bit logical right shift, valid for `s` in `1..31`.
const shrSL = (h, l, s)=>h << 32 - s | l >>> s;
// High 32-bit half of a 64-bit right rotate, valid for `s` in `1..31`.
const rotrSH = (h, l, s)=>h >>> s | l << 32 - s;
// Low 32-bit half of a 64-bit right rotate, valid for `s` in `1..31`.
const rotrSL = (h, l, s)=>h << 32 - s | l >>> s;
// High 32-bit half of a 64-bit right rotate, valid for `s` in `33..63`; `32` uses `rotr32*`.
const rotrBH = (h, l, s)=>h << 64 - s | l >>> s - 32;
// Low 32-bit half of a 64-bit right rotate, valid for `s` in `33..63`; `32` uses `rotr32*`.
const rotrBL = (h, l, s)=>h >>> s - 32 | l << 64 - s;
// High 32-bit half of a 64-bit right rotate for `s === 32`; this is just the swapped low half.
const rotr32H = (_h, l)=>l;
// Low 32-bit half of a 64-bit right rotate for `s === 32`; this is just the swapped high half.
const rotr32L = (h, _l)=>h;
// 64-bit left rotates (rotl*) are not defined here: sha3.ts, their only consumer, keeps
// local copies so V8 inlines them into keccakP.
// Add two split 64-bit words and return the split `{ h, l }` sum.
// JS uses 32-bit signed integers for bitwise operations, so we cannot simply shift the carry out
// of the low sum and instead use division.
function add(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return {
        h: Ah + Bh + (l / 2 ** 32 | 0) | 0,
        l: l | 0
    };
}
// Addition with more than 2 elements
// Unmasked low-word accumulator for 3-way addition; pass the raw result into `add3H(...)`.
const add3L = (Al, Bl, Cl)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
// High-word finalize step for 3-way addition; `low` must be the untruncated output of `add3L(...)`.
const add3H = (low, Ah, Bh, Ch)=>Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
// Unmasked low-word accumulator for 4-way addition; pass the raw result into `add4H(...)`.
const add4L = (Al, Bl, Cl, Dl)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
// High-word finalize step for 4-way addition; `low` must be the untruncated output of `add4L(...)`.
const add4H = (low, Ah, Bh, Ch, Dh)=>Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
// Unmasked low-word accumulator for 5-way addition; pass the raw result into `add5H(...)`.
const add5L = (Al, Bl, Cl, Dl, El)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
// High-word finalize step for 5-way addition; `low` must be the untruncated output of `add5L(...)`.
const add5H = (low, Ah, Bh, Ch, Dh, Eh)=>Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
;
}),
"[project]/node_modules/@noble/hashes/sha3.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Keccak",
    ()=>Keccak,
    "keccakP",
    ()=>keccakP,
    "keccak_224",
    ()=>keccak_224,
    "keccak_256",
    ()=>keccak_256,
    "keccak_384",
    ()=>keccak_384,
    "keccak_512",
    ()=>keccak_512,
    "sha3_224",
    ()=>sha3_224,
    "sha3_256",
    ()=>sha3_256,
    "sha3_384",
    ()=>sha3_384,
    "sha3_512",
    ()=>sha3_512,
    "shake128",
    ()=>shake128,
    "shake128_32",
    ()=>shake128_32,
    "shake256",
    ()=>shake256,
    "shake256_64",
    ()=>shake256_64
]);
/**
 * SHA3 (keccak) hash function, based on a new "Sponge function" design.
 * Different from older hashes, the internal state is bigger than output size.
 *
 * Check out
 * {@link https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.202.pdf | FIPS-202},
 * {@link https://keccak.team/keccak.html | Website}, and
 * {@link https://crypto.stackexchange.com/q/15727 | the differences between
 * SHA-3 and Keccak}.
 *
 * Check out `sha3-addons` module for cSHAKE, k12, and others.
 * @module
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/_u64.js [app-route] (ecmascript)");
// prettier-ignore
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/utils.js [app-route] (ecmascript)");
;
;
// No __PURE__ annotations in sha3 header:
// EVERYTHING is in fact used on every export.
// Various per round constants calculations
const _0n = BigInt(0);
const _1n = BigInt(1);
const _2n = BigInt(2);
const _7n = BigInt(7);
const _256n = BigInt(256);
// FIPS 202 Algorithm 5 rc(): when the outgoing bit is 1, the 8-bit LFSR xors
// taps 0, 4, 5, and 6, which compresses to the feedback mask `0x71`.
const _0x71n = BigInt(0x71);
const SHA3_PI = [];
const SHA3_ROTL = [];
const _SHA3_IOTA = []; // no pure annotation: var is always used
for(let round = 0, R = _1n, x = 1, y = 0; round < 24; round++){
    // Pi
    [x, y] = [
        y,
        (2 * x + 3 * y) % 5
    ];
    SHA3_PI.push(2 * (5 * y + x));
    // Rotational
    SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
    // Iota
    let t = _0n;
    for(let j = 0; j < 7; j++){
        R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
        if (R & _2n) t ^= _1n << (_1n << BigInt(j)) - _1n;
    }
    _SHA3_IOTA.push(t);
}
const IOTAS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$_u64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["split"])(_SHA3_IOTA, true);
// `split(..., true)` keeps the local little-endian lane-word layout used by
// `state32`, so these `H` / `L` tables follow the file's first-word /
// second-word lane slots rather than `_u64.ts`'s usual high/low naming.
const SHA3_IOTA_H = IOTAS[0];
const SHA3_IOTA_L = IOTAS[1];
// 64-bit left rotates as u32 pairs. Inlined here (not imported from _u64) so V8 can
// inline them into keccakP — the import path costs ~24% on sha3_256. SHA3 is the only
// consumer of left-rotates; other hashes use right-rotates from _u64.
// Valid for s in 1..31 (SH/SL) and 33..63 (BH/BL); keccak never rotates by 0/32/64.
const rotlSH = (h, l, s)=>h << s | l >>> 32 - s;
const rotlSL = (h, l, s)=>l << s | h >>> 32 - s;
const rotlBH = (h, l, s)=>l << s - 32 | h >>> 64 - s;
const rotlBL = (h, l, s)=>h << s - 32 | l >>> 64 - s;
const rotlH = (h, l, s)=>s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
const rotlL = (h, l, s)=>s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
// Reused Theta scratch buffer (column parities), same pattern as SHA256_W in sha2.
// keccakP never calls user code, so the shared buffer cannot be observed mid-permutation.
const B = new Uint32Array(5 * 2);
function keccakP(s, rounds = 24) {
    if (!(s instanceof Uint32Array)) throw new TypeError('"s" expected Uint32Array(50), got type=' + typeof s);
    if (s.length !== 50) throw new RangeError('"s" expected Uint32Array(50), got length=' + s.length);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["anumber"])(rounds, 'rounds');
    // This implementation precomputes only the standard Keccak-f[1600] 24-round Iota table.
    if (rounds < 1 || rounds > 24) throw new Error('"rounds" expected integer 1..24');
    // NOTE: all indices are x2 since we store state as u32 instead of u64 (bigints to slow in js)
    for(let round = 24 - rounds; round < 24; round++){
        // Theta θ
        for(let x = 0; x < 10; x++)B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
        for(let x = 0; x < 10; x += 2){
            const idx1 = (x + 8) % 10;
            const idx0 = (x + 2) % 10;
            const B0 = B[idx0];
            const B1 = B[idx0 + 1];
            const Th = rotlH(B0, B1, 1) ^ B[idx1];
            const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
            for(let y = 0; y < 50; y += 10){
                s[x + y] ^= Th;
                s[x + y + 1] ^= Tl;
            }
        }
        // Rho (ρ) and Pi (π)
        let curH = s[2];
        let curL = s[3];
        for(let t = 0; t < 24; t++){
            const shift = SHA3_ROTL[t];
            const Th = rotlH(curH, curL, shift);
            const Tl = rotlL(curH, curL, shift);
            const PI = SHA3_PI[t];
            curH = s[PI];
            curL = s[PI + 1];
            s[PI] = Th;
            s[PI + 1] = Tl;
        }
        // Chi (χ)
        // Same as:
        // for (let x = 0; x < 10; x++) B[x] = s[y + x];
        // for (let x = 0; x < 10; x++) s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
        for(let y = 0; y < 50; y += 10){
            const b0 = s[y], b1 = s[y + 1], b2 = s[y + 2], b3 = s[y + 3];
            s[y] ^= ~s[y + 2] & s[y + 4];
            s[y + 1] ^= ~s[y + 3] & s[y + 5];
            s[y + 2] ^= ~s[y + 4] & s[y + 6];
            s[y + 3] ^= ~s[y + 5] & s[y + 7];
            s[y + 4] ^= ~s[y + 6] & s[y + 8];
            s[y + 5] ^= ~s[y + 7] & s[y + 9];
            s[y + 6] ^= ~s[y + 8] & b0;
            s[y + 7] ^= ~s[y + 9] & b1;
            s[y + 8] ^= ~b0 & b2;
            s[y + 9] ^= ~b1 & b3;
        }
        // Iota (ι)
        s[0] ^= SHA3_IOTA_H[round];
        s[1] ^= SHA3_IOTA_L[round];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clean"])(B);
}
class Keccak {
    state;
    pos = 0;
    posOut = 0;
    finished = false;
    state32;
    destroyed = false;
    blockLen;
    suffix;
    outputLen;
    canXOF;
    enableXOF = false;
    rounds;
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["anumber"])(blockLen, 'blockLen');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["anumber"])(suffix, 'suffix');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["anumber"])(rounds, 'rounds');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["abool"])(enableXOF, 'enableXOF');
        this.blockLen = blockLen;
        this.suffix = suffix;
        this.outputLen = outputLen;
        this.enableXOF = enableXOF;
        this.canXOF = enableXOF;
        this.rounds = rounds;
        // Can be passed from user as dkLen
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["anumber"])(outputLen, 'outputLen');
        // Only keccak-f1600 is supported: 1600 bits (5x5 matrix of 64bit) === 200 bytes of state.
        if (!(0 < blockLen && blockLen < 200)) throw new Error('"blockLen" must be 1..199');
        this.state = new Uint8Array(200);
        this.state32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["u32"])(this.state);
    }
    clone() {
        return this._cloneInto();
    }
    keccak() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["swap32IfBE"])(this.state32);
        keccakP(this.state32, this.rounds);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["swap32IfBE"])(this.state32);
        this.posOut = 0;
        this.pos = 0;
    }
    update(data) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["aexists"])(this);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["abytes"])(data);
        const { blockLen, state, state32 } = this;
        const len = data.length;
        // Absorb full blocks with u32 XORs when both sides are 4-byte aligned.
        // XOR of same-position words equals XOR of same-position bytes, so this is endianness-safe.
        const canUseU32 = blockLen % 4 === 0 && data.byteOffset % 4 === 0;
        const blockLen32 = blockLen / 4;
        const data32 = canUseU32 && len >= blockLen ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["u32"])(data) : undefined;
        for(let pos = 0; pos < len;){
            if (data32 !== undefined && this.pos === 0 && pos % 4 === 0 && len - pos >= blockLen) {
                for(let i = 0, o = pos / 4; i < blockLen32; i++)state32[i] ^= data32[o + i];
                pos += blockLen;
                // Subclasses (_KeccakPRG) read `this.pos` inside their `keccak()` override,
                // so it must reflect the fully-absorbed block before the permutation fires.
                this.pos = blockLen;
                this.keccak();
                continue;
            }
            const take = Math.min(blockLen - this.pos, len - pos);
            for(let i = 0; i < take; i++)state[this.pos++] ^= data[pos++];
            if (this.pos === blockLen) this.keccak();
        }
        return this;
    }
    finish() {
        if (this.finished) return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        // FIPS 202 appends the SHA3/SHAKE domain-separation suffix before pad10*1.
        // These byte values already include the first padding bit, while the
        // final `0x80` below supplies the closing `1` bit in the last rate byte.
        state[pos] ^= suffix;
        // If that combined suffix lands in the last rate byte and already sets
        // bit 7, absorb it first so the final pad10*1 bit can be xored into a
        // fresh block.
        if ((suffix & 0x80) !== 0 && pos === blockLen - 1) this.keccak();
        state[blockLen - 1] ^= 0x80;
        this.keccak();
    }
    writeInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["aexists"])(this, false);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["abytes"])(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for(let pos = 0, len = out.length; pos < len;){
            if (this.posOut >= blockLen) this.keccak();
            const take = Math.min(blockLen - this.posOut, len - pos);
            out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
            this.posOut += take;
            pos += take;
        }
        return out;
    }
    xofInto(out) {
        // Plain SHA3/Keccak usage with XOF is probably a mistake, but this base
        // class is also reused by SHAKE/cSHAKE/KMAC/TupleHash/ParallelHash/
        // TurboSHAKE/KangarooTwelve wrappers that intentionally enable XOF.
        if (!this.enableXOF) throw new Error('XOF is not enabled');
        return this.writeInto(out);
    }
    xof(bytes) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["anumber"])(bytes);
        return this.xofInto(new Uint8Array(bytes));
    }
    digestInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["aoutput"])(out, this);
        if (this.finished) throw new Error('digest() was already called');
        // `aoutput(...)` allows oversized buffers; digestInto() must fill only the advertised digest.
        this.writeInto(out.length === this.outputLen ? out : out.subarray(0, this.outputLen));
        this.destroy();
    }
    digest() {
        const out = new Uint8Array(this.outputLen);
        this.digestInto(out);
        return out;
    }
    destroy() {
        this.destroyed = true;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clean"])(this.state);
    }
    _cloneInto(to) {
        const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
        to ||= new Keccak(blockLen, suffix, outputLen, enableXOF, rounds);
        // Reused destinations can come from a different rate/capacity variant, so clone must rewrite
        // the sponge geometry as well as the state words.
        to.blockLen = blockLen;
        to.state32.set(this.state32);
        // Sponge padding and XOF output are positional, so both offsets are part of the clone state.
        to.pos = this.pos;
        to.posOut = this.posOut;
        to.finished = this.finished;
        to.rounds = rounds;
        // Suffix can change in cSHAKE
        to.suffix = suffix;
        to.outputLen = outputLen;
        to.enableXOF = enableXOF;
        // Clones must preserve the public capability bit too; `_KMAC` reuses this path and deep clone
        // tests compare instance fields directly, so leaving `canXOF` behind makes the clone lie.
        to.canXOF = this.canXOF;
        to.destroyed = this.destroyed;
        return to;
    }
}
const genKeccak = (suffix, blockLen, outputLen, info = {})=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createHasher"])(()=>new Keccak(blockLen, suffix, outputLen), info);
const sha3_224 = /* @__PURE__ */ genKeccak(0x06, 144, 28, /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["oidNist"])(0x07));
const sha3_256 = /* @__PURE__ */ genKeccak(0x06, 136, 32, /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["oidNist"])(0x08));
const sha3_384 = /* @__PURE__ */ genKeccak(0x06, 104, 48, /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["oidNist"])(0x09));
const sha3_512 = /* @__PURE__ */ genKeccak(0x06, 72, 64, /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["oidNist"])(0x0a));
const keccak_224 = /* @__PURE__ */ genKeccak(0x01, 144, 28);
const keccak_256 = /* @__PURE__ */ genKeccak(0x01, 136, 32);
const keccak_384 = /* @__PURE__ */ genKeccak(0x01, 104, 48);
const keccak_512 = /* @__PURE__ */ genKeccak(0x01, 72, 64);
const genShake = (suffix, blockLen, outputLen, info = {})=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createHasher"])((opts = {})=>{
        opts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkOpts"])({}, opts);
        return new Keccak(blockLen, suffix, opts.dkLen === undefined ? outputLen : opts.dkLen, true);
    }, info);
const shake128 = /* @__PURE__ */ genShake(0x1f, 168, 16, /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["oidNist"])(0x0b));
const shake256 = /* @__PURE__ */ genShake(0x1f, 136, 32, /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["oidNist"])(0x0c));
const shake128_32 = /* @__PURE__ */ genShake(0x1f, 168, 32, /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["oidNist"])(0x0b));
const shake256_64 = /* @__PURE__ */ genShake(0x1f, 136, 64, /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["oidNist"])(0x0c));
}),
"[project]/node_modules/@noble/hashes/utils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Checks if something is Uint8Array. Be careful: nodejs Buffer will return true.
 * @param a - value to test
 * @returns `true` when the value is a Uint8Array-compatible view.
 * @example
 * Check whether a value is a Uint8Array-compatible view.
 * ```ts
 * isBytes(new Uint8Array([1, 2, 3]));
 * ```
 */ __turbopack_context__.s([
    "abool",
    ()=>abool,
    "abytes",
    ()=>abytes,
    "aexists",
    ()=>aexists,
    "ahash",
    ()=>ahash,
    "anumber",
    ()=>anumber,
    "aoutput",
    ()=>aoutput,
    "asyncLoop",
    ()=>asyncLoop,
    "byteSwap",
    ()=>byteSwap,
    "byteSwap32",
    ()=>byteSwap32,
    "bytesToHex",
    ()=>bytesToHex,
    "checkOpts",
    ()=>checkOpts,
    "clean",
    ()=>clean,
    "concatBytes",
    ()=>concatBytes,
    "copyBytes",
    ()=>copyBytes,
    "createHasher",
    ()=>createHasher,
    "createView",
    ()=>createView,
    "hexToBytes",
    ()=>hexToBytes,
    "isBytes",
    ()=>isBytes,
    "isLE",
    ()=>isLE,
    "kdfInputToBytes",
    ()=>kdfInputToBytes,
    "nextTick",
    ()=>nextTick,
    "oidNist",
    ()=>oidNist,
    "randomBytes",
    ()=>randomBytes,
    "rotl",
    ()=>rotl,
    "rotr",
    ()=>rotr,
    "swap32IfBE",
    ()=>swap32IfBE,
    "swap8IfBE",
    ()=>swap8IfBE,
    "u32",
    ()=>u32,
    "u8",
    ()=>u8,
    "utf8ToBytes",
    ()=>utf8ToBytes,
    "validateObject",
    ()=>validateObject
]);
function isBytes(a) {
    // Plain `instanceof Uint8Array` is too strict for some Buffer / proxy / cross-realm cases.
    // The fallback still requires a real ArrayBuffer view, so plain
    // JSON-deserialized `{ constructor: ... }` spoofing is rejected, and
    // `BYTES_PER_ELEMENT === 1` keeps the fallback on byte-oriented views.
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === 'Uint8Array' && 'BYTES_PER_ELEMENT' in a && a.BYTES_PER_ELEMENT === 1;
}
// Shared error-message prefix builder. Only called on throw paths, so assert
// success paths never pay for the string concatenation.
const atitle = (title)=>title ? `"${title}" ` : '';
function anumber(n, title = '') {
    if (typeof n !== 'number') throw new TypeError(atitle(title) + 'expected number, got ' + typeof n);
    if (!Number.isSafeInteger(n) || n < 0) throw new RangeError(atitle(title) + 'expected integer >= 0, got ' + n);
    return n;
}
function abool(value, title = '') {
    if (typeof value !== 'boolean') throw new TypeError(atitle(title) + 'expected boolean, got type=' + typeof value);
    return value;
}
function abytes(value, length, title = '') {
    // Success path first: this runs at the start of every update() / digestInto(), and the
    // common `abytes(data)` form must not pay for length handling it does not use.
    if (isBytes(value) && (length === undefined || value.length === length)) return value;
    // Error path: recompute freely to build the exact message.
    if (length !== undefined) anumber(length, 'length');
    const bytes = isBytes(value);
    const ofLen = length !== undefined ? ` of length ${length}` : '';
    const got = bytes ? `length=${value.length}` : `type=${typeof value}`;
    const message = atitle(title) + 'expected Uint8Array' + ofLen + ', got ' + got;
    if (!bytes) throw new TypeError(message);
    throw new RangeError(message);
}
function copyBytes(bytes) {
    // `Uint8Array.from(...)` would also accept arrays / other typed arrays. Keep this helper strict
    // because callers use it at byte-validation boundaries before mutating the detached copy.
    return Uint8Array.from(abytes(bytes));
}
function ahash(h) {
    if (typeof h !== 'function' || typeof h.create !== 'function') throw new TypeError('expected hash wrapped by utils.createHasher');
    anumber(h.outputLen);
    anumber(h.blockLen);
    // HMAC and KDF callers treat these as real byte lengths; allowing zero lets fake wrappers pass
    // validation and can produce empty outputs instead of failing fast.
    if (h.outputLen < 1 || h.blockLen < 1) throw new Error('hash blockLen / outputLen must be >= 1');
}
const aobject = (value, label)=>{
    if (value === null || typeof value !== 'object' || Array.isArray(value)) throw new TypeError((label === 'object' ? '' : `"${label}" `) + 'expected object, got type=' + typeof value);
};
const aopts = (value, label)=>{
    aobject(value, label);
    const proto = Object.getPrototypeOf(value);
    if (proto !== Object.prototype && proto !== null) throw new TypeError(`"${label}" expected plain object`);
    // Object.assign() treats an own "__proto__" source key as a write to the target's legacy
    // prototype setter. Reject it before merging so inherited option values cannot be injected.
    if (Object.hasOwn(value, '__proto__')) throw new TypeError(`"${label}.__proto__" is not allowed`);
};
function aexists(instance, checkFinished = true) {
    // Runs on every update()/digestInto(); the flags are library-owned booleans, so only their
    // truthiness is checked - re-validating their type per call was pure hot-path overhead.
    if (instance.destroyed) throw new Error('hash was destroyed');
    if (checkFinished && instance.finished) throw new Error('digest() was already called');
}
function aoutput(out, instance) {
    abytes(out, undefined, 'output');
    // `outputLen` is a library-owned readonly number; the negated comparison keeps failing fast
    // when it is missing/NaN (comparisons with undefined/NaN are false) without an anumber() call.
    const min = instance.outputLen;
    if (!(out.length >= min)) {
        throw new RangeError('"output" expected length >= ' + min);
    }
}
function u8(arr) {
    return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
}
function u32(arr) {
    return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
    for(let i = 0; i < arrays.length; i++){
        arrays[i].fill(0);
    }
}
function createView(arr) {
    return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
    return word << 32 - shift | word >>> shift;
}
function rotl(word, shift) {
    return word << shift | word >>> 32 - shift >>> 0;
}
const isLE = /* @__PURE__ */ (()=>new Uint8Array(new Uint32Array([
        0x11223344
    ]).buffer)[0] === 0x44)();
function byteSwap(word) {
    return word << 24 & 0xff000000 | word << 8 & 0xff0000 | word >>> 8 & 0xff00 | word >>> 24 & 0xff;
}
const swap8IfBE = isLE ? (n)=>n : (n)=>byteSwap(n) >>> 0;
function byteSwap32(arr) {
    for(let i = 0; i < arr.length; i++){
        arr[i] = byteSwap(arr[i]);
    }
    return arr;
}
const swap32IfBE = isLE ? (u)=>u : byteSwap32;
// Built-in hex conversion https://caniuse.com/mdn-javascript_builtins_uint8array_fromhex
const hasHexBuiltin = /* @__PURE__ */ (()=>// @ts-ignore
    typeof Uint8Array.from([]).toHex === 'function' && typeof Uint8Array.fromHex === 'function')();
// Array where index 0xf0 (240) is mapped to string 'f0'
const hexes = /* @__PURE__ */ Array.from({
    length: 256
}, (_, i)=>i.toString(16).padStart(2, '0'));
function bytesToHex(bytes) {
    abytes(bytes);
    // @ts-ignore
    if (hasHexBuiltin) return bytes.toHex();
    // pre-caching improves the speed 6x
    let hex = '';
    for(let i = 0; i < bytes.length; i++){
        hex += hexes[bytes[i]];
    }
    return hex;
}
// Strict ASCII nibble parser: non-ASCII hex lookalikes are rejected as undefined.
// ASCII codes: '0'..'9' = 48..57, 'A'..'F' = 65..70, 'a'..'f' = 97..102.
// prettier-ignore
function asciiToBase16(ch) {
    return ch >= 48 && ch <= 57 ? ch - 48 // '2' => 50-48
     : ch >= 65 && ch <= 70 ? ch - (65 - 10) // 'B' => 66-(65-10)
     : ch >= 97 && ch <= 102 ? ch - (97 - 10) // 'b' => 98-(97-10)
     : undefined;
}
function hexToBytes(hex) {
    if (typeof hex !== 'string') throw new TypeError('hex string expected, got ' + typeof hex);
    if (hasHexBuiltin) {
        try {
            return Uint8Array.fromHex(hex);
        } catch (error) {
            if (error instanceof SyntaxError) throw new RangeError(error.message);
            throw error;
        }
    }
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2) throw new RangeError('hex string expected, got unpadded hex of length ' + hl);
    const array = new Uint8Array(al);
    for(let ai = 0, hi = 0; ai < al; ai++, hi += 2){
        const n1 = asciiToBase16(hex.charCodeAt(hi)); // parse first char, multiply it by 16
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1)); // parse second char
        if (n1 === undefined || n2 === undefined) {
            const char = hex[hi] + hex[hi + 1];
            throw new RangeError('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2; // example: 'A9' => 10*16 + 9
    }
    return array;
}
function nextTick(onReject) {
    const host = globalThis;
    if (typeof host.scheduler?.yield === 'function') {
        const promise = host.scheduler.yield();
        // Keep the original scheduler rejection; this handler exists only for cleanup.
        if (onReject) promise.catch(onReject);
        return promise;
    }
    return new Promise((resolve)=>host.setTimeout(resolve, 0));
}
async function asyncLoop(iters, tick, cb, onReject) {
    anumber(iters, 'iters');
    anumber(tick, 'tick');
    if (typeof cb !== 'function') throw new TypeError('callback must be a function');
    // Callback is synchronous by contract; asyncLoop only yields between sync work windows.
    let ts = Date.now();
    for(let i = 0; i < iters; i++){
        cb(i);
        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick) continue;
        await nextTick(onReject);
        // Track only synchronous work time; scheduler delay after yielding is outside our budget.
        ts = Date.now();
    }
}
function utf8ToBytes(str) {
    if (typeof str !== 'string') throw new TypeError('string expected');
    const encoded = new TextEncoder().encode(str);
    try {
        // Copy into the current realm for Firefox extension contexts. Callers that own the returned
        // buffer can then wipe it independently of TextEncoder's temporary result.
        return new Uint8Array(encoded); // https://bugzil.la/1681809
    } finally{
        clean(encoded);
    }
}
function kdfInputToBytes(data, errorTitle = '') {
    if (typeof data === 'string') return utf8ToBytes(data);
    return abytes(data, undefined, errorTitle);
}
function concatBytes(...arrays) {
    let sum = 0;
    for(let i = 0; i < arrays.length; i++){
        const a = arrays[i];
        abytes(a);
        sum += a.length;
    }
    const res = new Uint8Array(sum);
    for(let i = 0, pad = 0; i < arrays.length; i++){
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
    }
    return res;
}
const validateObject = (object, fields = {}, optFields = {}, title = 'object')=>{
    aobject(object, title);
    aobject(fields, 'fields');
    aobject(optFields, 'optFields');
    function checkField(fieldName, expectedType, isOpt) {
        const label = title === 'object' ? `param "${String(fieldName)}"` : `"${title}.${String(fieldName)}"`;
        // Config fields must be explicit own properties. Optional inherited values are rejected too
        // because callers keep reading the same options object after validation.
        const val = object[fieldName];
        // Runtime objects such as Field instances intentionally satisfy required method slots
        // via their shared prototype.
        if (!Object.hasOwn(object, fieldName) && (isOpt ? val !== undefined : expectedType !== 'function')) {
            throw new TypeError(`${label} is invalid: expected own property`);
        }
        if (isOpt && val === undefined) return;
        const current = typeof val;
        if (current !== expectedType || val === null) throw new TypeError(`${label} is invalid: expected ${expectedType}, got ${current}`);
    }
    const iter = (f, isOpt)=>Object.entries(f).forEach(([k, v])=>checkField(k, v, isOpt));
    iter(fields, false);
    iter(optFields, true);
};
function checkOpts(defaults, opts, title = 'opts') {
    aopts(defaults, 'defaults');
    if (opts !== undefined) aopts(opts, title);
    // Callers read optional fields directly, so omitted values must not fall through to ambient
    // Object.prototype pollution (for example a forged `dkLen` changing SHAKE's default output).
    const merged = Object.assign(Object.create(null), defaults, opts);
    return merged;
}
function createHasher(hashCons, info = {}) {
    if (typeof hashCons !== 'function') throw new TypeError('"hashCons" expected function, got type=' + typeof hashCons);
    info = checkOpts({}, info, 'info');
    const hashC = (msg, opts)=>hashCons(opts).update(msg).digest();
    const tmp = hashCons(undefined);
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.canXOF = tmp.canXOF;
    hashC.create = (opts)=>hashCons(opts);
    Object.assign(hashC, info);
    return Object.freeze(hashC);
}
function randomBytes(bytesLength = 32) {
    // Match the repo's other length-taking helpers instead of relying on Uint8Array coercion.
    anumber(bytesLength, 'bytesLength');
    const cr = typeof globalThis === 'object' ? globalThis.crypto : null;
    if (typeof cr?.getRandomValues !== 'function') throw new Error('crypto.getRandomValues must be defined');
    // Web Cryptography API Level 2 §10.1.1:
    // if `byteLength > 65536`, throw `QuotaExceededError`.
    // Keep the guard explicit so callers can see the quota in code
    // instead of discovering it by reading the spec or host errors.
    // This wrapper surfaces the same quota as a stable library RangeError.
    if (bytesLength > 65536) throw new RangeError(`"bytesLength" expected <= 65536, got ${bytesLength}`);
    return cr.getRandomValues(new Uint8Array(bytesLength));
}
const oidNist = (suffix)=>({
        // Current NIST hashAlgs suffixes used here fit in one DER subidentifier octet.
        // Larger suffix values would need base-128 OID encoding and a different length byte.
        oid: Uint8Array.from([
            0x06,
            0x09,
            0x60,
            0x86,
            0x48,
            0x01,
            0x65,
            0x03,
            0x04,
            0x02,
            suffix
        ])
    });
}),
"[project]/node_modules/@prisma/orm-postgres/dist/errors-DfWK9xep-CYOOg0sB.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "t",
    ()=>postgresError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$framework$2f$dist$2f$structured$2d$error$2d$BXbihKQ$2d2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__o__as__structuredError$3e$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-framework/dist/structured-error-BXbihKQ-.mjs [app-route] (ecmascript) <export o as structuredError>");
;
//#region ../../../3-extensions/postgres/dist/errors-DfWK9xep.mjs
function postgresError(code, message, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$framework$2f$dist$2f$structured$2d$error$2d$BXbihKQ$2d2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__o__as__structuredError$3e$__["structuredError"])(code, message, options);
}
;
}),
"[project]/node_modules/@prisma/orm-postgres/dist/postgres-runtime-GybTEgP4-DpGY305_.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "t",
    ()=>PostgresRuntimeImpl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$family$2d$sql$2f$dist$2f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-family-sql/dist/runtime.mjs [app-route] (ecmascript)");
;
//#region ../../../3-extensions/postgres/dist/postgres-runtime-GybTEgP4.mjs
var PostgresRuntimeImpl = class extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$family$2d$sql$2f$dist$2f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SqlRuntimeBase"] {
};
;
}),
"[project]/node_modules/@prisma/orm-postgres/dist/postgres-static-DBYpkrmX-W8VjIiiv.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "n",
    ()=>buildPostgresStaticContext,
    "r",
    ()=>postgresStatic,
    "t",
    ()=>buildNamespacedNativeEnums
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$target$2d$postgres$2f$dist$2f$codec$2d$ids$2d$D3ZEAmt2$2d$DjoKUAas$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__s__as__PG_ENUM_CODEC_ID$3e$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-target-postgres/dist/codec-ids-D3ZEAmt2-DjoKUAas.mjs [app-route] (ecmascript) <locals> <export s as PG_ENUM_CODEC_ID>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$framework$2f$dist$2f$enum$2d$accessor$2d$Db5DaTNX$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__n__as__buildNamespacedEnums$3e$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-framework/dist/enum-accessor-Db5DaTNX.mjs [app-route] (ecmascript) <export n as buildNamespacedEnums>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$framework$2f$dist$2f$enum$2d$accessor$2d$Db5DaTNX$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__r__as__createEnumAccessor$3e$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-framework/dist/enum-accessor-Db5DaTNX.mjs [app-route] (ecmascript) <export r as createEnumAccessor>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$target$2d$postgres$2f$dist$2f$adapter_$5f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-target-postgres/dist/adapter__runtime.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$family$2d$sql$2f$dist$2f$builder_$5f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-family-sql/dist/builder__runtime.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$family$2d$sql$2f$dist$2f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-family-sql/dist/runtime.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$target$2d$postgres$2f$dist$2f$target_$5f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-target-postgres/dist/target__runtime.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$target$2d$postgres$2f$dist$2f$postgres$2d$contract$2d$view$2d$dWcpuV6T$2d$CJPsHGox$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__t__as__PostgresContractSerializer$3e$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-target-postgres/dist/postgres-contract-view-dWcpuV6T-CJPsHGox.mjs [app-route] (ecmascript) <export t as PostgresContractSerializer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$framework$2f$dist$2f$casts$2d$DpaahrlC$2d$Bd5n2coI$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__t__as__blindCast$3e$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-framework/dist/casts-DpaahrlC-Bd5n2coI.mjs [app-route] (ecmascript) <export t as blindCast>");
;
;
;
;
;
;
;
//#region ../../../3-extensions/postgres/dist/postgres-static-DBYpkrmX.mjs
/**
* Reads the namespace's `valueSet` entries directly off the plain contract
* shape (`storage.namespaces[id].entries.valueSet`), not through a hydrated
* `PostgresSchema` class instance — the same plain-data path `db.enums`
* reads `domain.namespaces[id].enum` through. Works on a `validateContract`'d
* JSON contract as well as one produced by `PostgresContractSerializer`.
*
* A native enum is never re-emitted as its own entity: once `native_enum` is
* lowered, its member values live on in the `valueSet` entry it derives (the
* SQL family's generic `deriveValueSet` mechanism) — the same slot
* `column.valueSet`-typed columns read. A member is a value, not a
* name→value pair (matching `CREATE TYPE … AS ENUM ('a', 'b')`), so each
* value doubles as its own accessor name.
*/ function buildNativeEnumsMapForNamespace(storage, namespaceId) {
    const result = {};
    const valueSets = storage.namespaces[namespaceId]?.entries.valueSet;
    if (!valueSets) return result;
    for (const [name, valueSet] of Object.entries(valueSets))result[name] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$framework$2f$dist$2f$enum$2d$accessor$2d$Db5DaTNX$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__r__as__createEnumAccessor$3e$__["createEnumAccessor"])({
        codecId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$target$2d$postgres$2f$dist$2f$codec$2d$ids$2d$D3ZEAmt2$2d$DjoKUAas$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__s__as__PG_ENUM_CODEC_ID$3e$__["PG_ENUM_CODEC_ID"],
        members: valueSet.values.map((value)=>({
                name: String(value),
                value
            }))
    });
    return result;
}
function buildNamespacedNativeEnums(storage) {
    const result = {};
    for (const namespaceId of Object.keys(storage.namespaces))result[namespaceId] = buildNativeEnumsMapForNamespace(storage, namespaceId);
    return result;
}
function buildPostgresStaticContext(context, rawCodecInferer) {
    const sqlDb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$family$2d$sql$2f$dist$2f$builder_$5f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"])({
        context,
        rawCodecInferer
    });
    const raw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$family$2d$sql$2f$dist$2f$builder_$5f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRawLane"])({
        context,
        rawCodecInferer
    });
    const enums = Object.freeze((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$framework$2f$dist$2f$enum$2d$accessor$2d$Db5DaTNX$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__n__as__buildNamespacedEnums$3e$__["buildNamespacedEnums"])(context.contract.domain));
    const nativeEnums = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$framework$2f$dist$2f$casts$2d$DpaahrlC$2d$Bd5n2coI$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__t__as__blindCast$3e$__["blindCast"])(Object.freeze(buildNamespacedNativeEnums(context.contract.storage)));
    return {
        context,
        contract: context.contract,
        enums,
        nativeEnums,
        sql: sqlDb,
        raw
    };
}
function postgresStatic(options) {
    const contract = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$framework$2f$dist$2f$casts$2d$DpaahrlC$2d$Bd5n2coI$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__t__as__blindCast$3e$__["blindCast"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$target$2d$postgres$2f$dist$2f$postgres$2d$contract$2d$view$2d$dWcpuV6T$2d$CJPsHGox$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__t__as__PostgresContractSerializer$3e$__["PostgresContractSerializer"]().deserializeContract(options.contractJson));
    const stack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$family$2d$sql$2f$dist$2f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSqlExecutionStack"])({
        target: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$target$2d$postgres$2f$dist$2f$target_$5f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"],
        adapter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$target$2d$postgres$2f$dist$2f$adapter_$5f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
        extensions: options.extensions ?? []
    });
    return buildPostgresStaticContext((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$family$2d$sql$2f$dist$2f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createExecutionContext"])({
        contract,
        stack
    }), stack.adapter.rawCodecInferer);
}
;
}),
"[project]/node_modules/@prisma/orm-postgres/dist/runtime.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "default",
    ()=>postgres,
    "isPgClient",
    ()=>isPgClient,
    "isPgPool",
    ()=>isPgPool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$postgres$2f$dist$2f$errors$2d$DfWK9xep$2d$CYOOg0sB$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-postgres/dist/errors-DfWK9xep-CYOOg0sB.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$postgres$2f$dist$2f$postgres$2d$static$2d$DBYpkrmX$2d$W8VjIiiv$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-postgres/dist/postgres-static-DBYpkrmX-W8VjIiiv.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$postgres$2f$dist$2f$postgres$2d$runtime$2d$GybTEgP4$2d$DpGY305_$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-postgres/dist/postgres-runtime-GybTEgP4-DpGY305_.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$framework$2f$dist$2f$defined$2d$BQWA85QH$2d$BRSBMULx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__t__as__ifDefined$3e$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-framework/dist/defined-BQWA85QH-BRSBMULx.mjs [app-route] (ecmascript) <export t as ifDefined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$framework$2f$dist$2f$internal$2d$error$2d$ChGYPVpq$2d$DhUD05u0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__t__as__InternalError$3e$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-framework/dist/internal-error-ChGYPVpq-DhUD05u0.mjs [app-route] (ecmascript) <export t as InternalError>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$target$2d$postgres$2f$dist$2f$adapter_$5f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-target-postgres/dist/adapter__runtime.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$family$2d$sql$2f$dist$2f$builder_$5f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-family-sql/dist/builder__runtime.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$family$2d$sql$2f$dist$2f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-family-sql/dist/runtime.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$target$2d$postgres$2f$dist$2f$target_$5f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-target-postgres/dist/target__runtime.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$target$2d$postgres$2f$dist$2f$postgres$2d$contract$2d$view$2d$dWcpuV6T$2d$CJPsHGox$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__t__as__PostgresContractSerializer$3e$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-target-postgres/dist/postgres-contract-view-dWcpuV6T-CJPsHGox.mjs [app-route] (ecmascript) <export t as PostgresContractSerializer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$target$2d$postgres$2f$dist$2f$runtime$2d$Di_BFzUC$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__t__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-target-postgres/dist/runtime-Di_BFzUC.mjs [app-route] (ecmascript) <locals> <export t as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$framework$2f$dist$2f$suppress$2d$idle$2d$connection$2d$errors$2d$DzApeUb3$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__t__as__suppressIdleConnectionErrors$3e$__$3c$export__suppressIdleConnectionErrors__as__n$3e$__$3c$export__n__as__suppressIdleConnectionErrors$3e$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-framework/dist/suppress-idle-connection-errors-DzApeUb3.mjs [app-route] (ecmascript) <export t as suppressIdleConnectionErrors> <export suppressIdleConnectionErrors as n> <export n as suppressIdleConnectionErrors>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$framework$2f$dist$2f$execution$2d$BNwBzmRd$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__r__as__instantiateExecutionStack$3e$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-framework/dist/execution-BNwBzmRd.mjs [app-route] (ecmascript) <export r as instantiateExecutionStack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$family$2d$sql$2f$dist$2f$orm$2d$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/orm-family-sql/dist/orm-client.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$target$2d$postgres$2f$dist$2f$runtime$2d$Di_BFzUC$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__t__as__default$3e$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$target$2d$postgres$2f$dist$2f$runtime$2d$Di_BFzUC$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__t__as__default$3e$__, __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
;
;
;
//#region ../../../3-extensions/postgres/dist/runtime.mjs
const isPgPool = (pg)=>"totalCount" in pg && "idleCount" in pg && "waitingCount" in pg;
const isPgClient = (pg)=>"escapeIdentifier" in pg && "escapeLiteral" in pg;
function validatePostgresUrl(url) {
    const trimmed = url.trim();
    if (trimmed.length === 0) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$postgres$2f$dist$2f$errors$2d$DfWK9xep$2d$CYOOg0sB$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["t"])("RUNTIME.BINDING_INVALID", "Postgres URL must be a non-empty string", {
        meta: {
            extension: "postgres",
            reason: "empty url"
        }
    });
    let parsed;
    try {
        parsed = new URL(trimmed);
    } catch  {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$postgres$2f$dist$2f$errors$2d$DfWK9xep$2d$CYOOg0sB$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["t"])("RUNTIME.BINDING_INVALID", "Postgres URL must be a valid URL", {
            meta: {
                extension: "postgres",
                reason: "unparseable url"
            }
        });
    }
    if (parsed.protocol !== "postgres:" && parsed.protocol !== "postgresql:") throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$postgres$2f$dist$2f$errors$2d$DfWK9xep$2d$CYOOg0sB$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["t"])("RUNTIME.BINDING_INVALID", "Postgres URL must use postgres:// or postgresql://", {
        meta: {
            extension: "postgres",
            reason: "wrong scheme",
            received: parsed.protocol
        }
    });
    return trimmed;
}
function resolvePostgresBinding(options) {
    if (Number(options.binding !== void 0) + Number(options.url !== void 0) + Number(options.pg !== void 0) !== 1) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$postgres$2f$dist$2f$errors$2d$DfWK9xep$2d$CYOOg0sB$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["t"])("RUNTIME.BINDING_INVALID", "Provide one binding input: binding, url, or pg", {
        fix: "Pass exactly one of `binding`, `url`, or `pg`.",
        meta: {
            extension: "postgres",
            reason: "zero or multiple binding inputs"
        }
    });
    if (options.binding !== void 0) return options.binding;
    if (options.url !== void 0) return {
        kind: "url",
        url: validatePostgresUrl(options.url)
    };
    const pgBinding = options.pg;
    if (pgBinding === void 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$framework$2f$dist$2f$internal$2d$error$2d$ChGYPVpq$2d$DhUD05u0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__t__as__InternalError$3e$__["InternalError"]("Invariant violation: expected pg binding after validation");
    if (isPgPool(pgBinding)) return {
        kind: "pgPool",
        pool: pgBinding
    };
    if (isPgClient(pgBinding)) return {
        kind: "pgClient",
        client: pgBinding
    };
    throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$postgres$2f$dist$2f$errors$2d$DfWK9xep$2d$CYOOg0sB$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["t"])("RUNTIME.BINDING_INVALID", "Unable to determine pg binding type from pg input; use binding with explicit kind", {
        fix: "Pass `binding: { kind: \"pgPool\", pool }` or `binding: { kind: \"pgClient\", client }` instead of `pg`.",
        meta: {
            extension: "postgres",
            reason: "unrecognizable pg object"
        }
    });
}
function resolveOptionalPostgresBinding(options) {
    if (Number(options.binding !== void 0) + Number(options.url !== void 0) + Number(options.pg !== void 0) === 0) return;
    return resolvePostgresBinding(options);
}
function hasContractJson(options) {
    return "contractJson" in options;
}
const contractSerializer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$target$2d$postgres$2f$dist$2f$postgres$2d$contract$2d$view$2d$dWcpuV6T$2d$CJPsHGox$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__t__as__PostgresContractSerializer$3e$__["PostgresContractSerializer"]();
function resolveContract(options) {
    const contractJson = hasContractJson(options) ? options.contractJson : contractSerializer.serializeContract(options.contract);
    return contractSerializer.deserializeContract(contractJson);
}
function toRuntimeBinding(binding, options) {
    if (binding.kind !== "url") return binding;
    return {
        kind: "pgPool",
        pool: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$framework$2f$dist$2f$suppress$2d$idle$2d$connection$2d$errors$2d$DzApeUb3$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__t__as__suppressIdleConnectionErrors$3e$__$3c$export__suppressIdleConnectionErrors__as__n$3e$__$3c$export__n__as__suppressIdleConnectionErrors$3e$__["suppressIdleConnectionErrors"])(new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["Pool"]({
            connectionString: binding.url,
            connectionTimeoutMillis: options.poolOptions?.connectionTimeoutMillis ?? 2e4,
            idleTimeoutMillis: options.poolOptions?.idleTimeoutMillis ?? 3e4
        }))
    };
}
function postgres(options) {
    const contract = resolveContract(options);
    let binding = resolveOptionalPostgresBinding(options);
    const stack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$family$2d$sql$2f$dist$2f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSqlExecutionStack"])({
        target: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$target$2d$postgres$2f$dist$2f$target_$5f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"],
        adapter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$target$2d$postgres$2f$dist$2f$adapter_$5f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
        driver: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$target$2d$postgres$2f$dist$2f$runtime$2d$Di_BFzUC$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__t__as__default$3e$__["default"],
        extensions: options.extensions ?? []
    });
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$family$2d$sql$2f$dist$2f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createExecutionContext"])({
        contract,
        stack,
        driver: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$target$2d$postgres$2f$dist$2f$runtime$2d$Di_BFzUC$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__t__as__default$3e$__["default"]
    });
    const { sql: sql$1, raw: rawSqlTag, enums, nativeEnums } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$postgres$2f$dist$2f$postgres$2d$static$2d$DBYpkrmX$2d$W8VjIiiv$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["n"])(context, stack.adapter.rawCodecInferer);
    let runtimeInstance;
    let runtimeDriver;
    let driverConnected = false;
    let connectPromise;
    let backgroundConnectError;
    let closed = false;
    let ownedDispose;
    const connectDriver = async (resolvedBinding)=>{
        if (driverConnected) return;
        if (!runtimeDriver) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$framework$2f$dist$2f$internal$2d$error$2d$ChGYPVpq$2d$DhUD05u0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__t__as__InternalError$3e$__["InternalError"]("Postgres runtime driver missing");
        if (connectPromise) return connectPromise;
        const runtimeBinding = toRuntimeBinding(resolvedBinding, options);
        if (resolvedBinding.kind === "url" && runtimeBinding.kind === "pgPool") {
            const pool = runtimeBinding.pool;
            let disposed = false;
            ownedDispose = async ()=>{
                if (disposed) return;
                disposed = true;
                await pool.end().then(()=>void 0);
            };
        }
        connectPromise = runtimeDriver.connect(runtimeBinding).then(()=>{
            driverConnected = true;
        }).catch(async (err)=>{
            backgroundConnectError = err;
            connectPromise = void 0;
            await ownedDispose?.().catch(()=>void 0);
            throw err;
        });
        return connectPromise;
    };
    const getRuntime = ()=>{
        if (closed) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$postgres$2f$dist$2f$errors$2d$DfWK9xep$2d$CYOOg0sB$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["t"])("DRIVER.NOT_CONNECTED", "Postgres client is closed", {
            why: "close() was called on this client.",
            fix: "Create a new postgres(...) client.",
            meta: {
                extension: "postgres"
            }
        });
        if (backgroundConnectError !== void 0) throw backgroundConnectError;
        if (runtimeInstance) return runtimeInstance;
        const stackInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$framework$2f$dist$2f$execution$2d$BNwBzmRd$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__r__as__instantiateExecutionStack$3e$__["instantiateExecutionStack"])(stack);
        const driverDescriptor = stack.driver;
        if (!driverDescriptor) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$framework$2f$dist$2f$internal$2d$error$2d$ChGYPVpq$2d$DhUD05u0$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__t__as__InternalError$3e$__["InternalError"]("Driver descriptor missing from execution stack");
        const driver = driverDescriptor.create({
            cursor: {
                disabled: true
            }
        });
        runtimeDriver = driver;
        if (binding !== void 0) connectDriver(binding).catch(()=>void 0);
        runtimeInstance = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$postgres$2f$dist$2f$postgres$2d$runtime$2d$GybTEgP4$2d$DpGY305_$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["t"]({
            context,
            adapter: stackInstance.adapter,
            driver,
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$framework$2f$dist$2f$defined$2d$BQWA85QH$2d$BRSBMULx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__t__as__ifDefined$3e$__["ifDefined"])("verifyMarker", options.verifyMarker),
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$framework$2f$dist$2f$defined$2d$BQWA85QH$2d$BRSBMULx$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__t__as__ifDefined$3e$__["ifDefined"])("middleware", options.middleware)
        });
        return runtimeInstance;
    };
    return {
        sql: sql$1,
        orm: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$family$2d$sql$2f$dist$2f$orm$2d$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["orm"])({
            runtime: {
                query (plan) {
                    return getRuntime().query(plan);
                },
                execute (plan) {
                    return getRuntime().execute(plan);
                },
                connection () {
                    return getRuntime().connection();
                }
            },
            context
        }),
        enums,
        nativeEnums,
        raw: rawSqlTag,
        context,
        contract,
        stack,
        async connect (bindingInput) {
            if (closed) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$postgres$2f$dist$2f$errors$2d$DfWK9xep$2d$CYOOg0sB$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["t"])("DRIVER.NOT_CONNECTED", "Postgres client is closed", {
                why: "close() was called on this client.",
                fix: "Create a new postgres(...) client.",
                meta: {
                    extension: "postgres"
                }
            });
            if (driverConnected || connectPromise) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$postgres$2f$dist$2f$errors$2d$DfWK9xep$2d$CYOOg0sB$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["t"])("DRIVER.ALREADY_CONNECTED", "Postgres client already connected", {
                fix: "Call connect() at most once per client.",
                meta: {
                    extension: "postgres"
                }
            });
            if (bindingInput !== void 0) binding = resolvePostgresBinding(bindingInput);
            if (binding === void 0) throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$postgres$2f$dist$2f$errors$2d$DfWK9xep$2d$CYOOg0sB$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["t"])("RUNTIME.BINDING_MISSING", "Postgres binding not configured. Pass url/pg/binding to postgres(...) or call db.connect({ ... }).", {
                meta: {
                    extension: "postgres"
                }
            });
            const runtime = getRuntime();
            if (driverConnected) return runtime;
            await connectDriver(binding);
            return runtime;
        },
        runtime () {
            return getRuntime();
        },
        prepare (declaration, callback) {
            return getRuntime().prepare(declaration, (params)=>callback(sql$1, params));
        },
        transaction (fn) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$family$2d$sql$2f$dist$2f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withTransaction"])(getRuntime(), (txCtx)=>{
                const rawCodecInferer = stack.adapter.rawCodecInferer;
                const txSql = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$family$2d$sql$2f$dist$2f$builder_$5f$runtime$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"])({
                    context,
                    rawCodecInferer
                });
                const txOrm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$orm$2d$family$2d$sql$2f$dist$2f$orm$2d$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["orm"])({
                    runtime: {
                        query (plan) {
                            return txCtx.query(plan);
                        },
                        execute (plan) {
                            return txCtx.execute(plan);
                        }
                    },
                    context
                });
                return fn(Object.assign(Object.create(txCtx), {
                    sql: txSql,
                    orm: txOrm,
                    enums,
                    nativeEnums
                }));
            });
        },
        async close () {
            if (closed) return;
            closed = true;
            await connectPromise?.catch(()=>void 0);
            await ownedDispose?.();
        },
        [Symbol.asyncDispose] () {
            return this.close();
        }
    };
}
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/node_modules/arkregex/out/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$arkregex$2f$out$2f$regex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/arkregex/out/regex.js [app-route] (ecmascript)");
;
}),
"[project]/node_modules/arkregex/out/regex.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "regex",
    ()=>regex
]);
const regex = (src, flags)=>new RegExp(src, flags);
Object.assign(regex, {
    as: regex
});
}),
"[project]/node_modules/base64-js/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for(var i = 0, len = code.length; i < len; ++i){
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
}
// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;
function getLens(b64) {
    var len = b64.length;
    if (len % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4');
    }
    // Trim off extra bytes after placeholder bytes are found
    // See: https://github.com/beatgammit/base64-js/issues/42
    var validLen = b64.indexOf('=');
    if (validLen === -1) validLen = len;
    var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [
        validLen,
        placeHoldersLen
    ];
}
// base64 is 4/3 + up to two characters of the original data
function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    // if there are placeholders, only get up to the last complete 4 chars
    var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i;
    for(i = 0; i < len; i += 4){
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 0xFF;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    return arr;
}
function tripletToBase64(num) {
    return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}
function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for(var i = start; i < end; i += 3){
        tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
        output.push(tripletToBase64(tmp));
    }
    return output.join('');
}
function fromByteArray(uint8) {
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
    ;
    var parts = [];
    var maxChunkLength = 16383 // must be multiple of 3
    ;
    // go through the array every three bytes, we'll deal with trailing stuff later
    for(var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength){
        parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
    }
    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
    } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
    }
    return parts.join('');
}
}),
"[project]/node_modules/bignumber.js/bignumber.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

;
(function(globalObject) {
    'use strict';
    /*
 *      bignumber.js v9.3.1
 *      A JavaScript library for arbitrary-precision arithmetic.
 *      https://github.com/MikeMcl/bignumber.js
 *      Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
 *      MIT Licensed.
 *
 *      BigNumber.prototype methods     |  BigNumber methods
 *                                      |
 *      absoluteValue            abs    |  clone
 *      comparedTo                      |  config               set
 *      decimalPlaces            dp     |      DECIMAL_PLACES
 *      dividedBy                div    |      ROUNDING_MODE
 *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
 *      exponentiatedBy          pow    |      RANGE
 *      integerValue                    |      CRYPTO
 *      isEqualTo                eq     |      MODULO_MODE
 *      isFinite                        |      POW_PRECISION
 *      isGreaterThan            gt     |      FORMAT
 *      isGreaterThanOrEqualTo   gte    |      ALPHABET
 *      isInteger                       |  isBigNumber
 *      isLessThan               lt     |  maximum              max
 *      isLessThanOrEqualTo      lte    |  minimum              min
 *      isNaN                           |  random
 *      isNegative                      |  sum
 *      isPositive                      |
 *      isZero                          |
 *      minus                           |
 *      modulo                   mod    |
 *      multipliedBy             times  |
 *      negated                         |
 *      plus                            |
 *      precision                sd     |
 *      shiftedBy                       |
 *      squareRoot               sqrt   |
 *      toExponential                   |
 *      toFixed                         |
 *      toFormat                        |
 *      toFraction                      |
 *      toJSON                          |
 *      toNumber                        |
 *      toPrecision                     |
 *      toString                        |
 *      valueOf                         |
 *
 */ var BigNumber, isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, mathceil = Math.ceil, mathfloor = Math.floor, bignumberError = '[BigNumber Error] ', tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ', BASE = 1e14, LOG_BASE = 14, MAX_SAFE_INTEGER = 0x1fffffffffffff, // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
    POWS_TEN = [
        1,
        10,
        100,
        1e3,
        1e4,
        1e5,
        1e6,
        1e7,
        1e8,
        1e9,
        1e10,
        1e11,
        1e12,
        1e13
    ], SQRT_BASE = 1e7, // EDITABLE
    // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
    // the arguments to toExponential, toFixed, toFormat, and toPrecision.
    MAX = 1E9; // 0 to MAX_INT32
    /*
   * Create and return a BigNumber constructor.
   */ function clone(configObject) {
        var div, convertBase, parseNumeric, P = BigNumber.prototype = {
            constructor: BigNumber,
            toString: null,
            valueOf: null
        }, ONE = new BigNumber(1), //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------
        // The default values below must be integers within the inclusive ranges stated.
        // The values can also be changed at run-time using BigNumber.set.
        // The maximum number of decimal places for operations involving division.
        DECIMAL_PLACES = 20, // The rounding mode used when rounding to the above decimal places, and when using
        // toExponential, toFixed, toFormat and toPrecision, and round (default value).
        // UP         0 Away from zero.
        // DOWN       1 Towards zero.
        // CEIL       2 Towards +Infinity.
        // FLOOR      3 Towards -Infinity.
        // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
        // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
        // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
        // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
        // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
        ROUNDING_MODE = 4, // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]
        // The exponent value at and beneath which toString returns exponential notation.
        // Number type: -7
        TO_EXP_NEG = -7, // The exponent value at and above which toString returns exponential notation.
        // Number type: 21
        TO_EXP_POS = 21, // RANGE : [MIN_EXP, MAX_EXP]
        // The minimum exponent value, beneath which underflow to zero occurs.
        // Number type: -324  (5e-324)
        MIN_EXP = -1e7, // The maximum exponent value, above which overflow to Infinity occurs.
        // Number type:  308  (1.7976931348623157e+308)
        // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
        MAX_EXP = 1e7, // Whether to use cryptographically-secure random number generation, if available.
        CRYPTO = false, // The modulo mode used when calculating the modulus: a mod n.
        // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
        // The remainder (r) is calculated as: r = a - n * q.
        //
        // UP        0 The remainder is positive if the dividend is negative, else is negative.
        // DOWN      1 The remainder has the same sign as the dividend.
        //             This modulo mode is commonly known as 'truncated division' and is
        //             equivalent to (a % n) in JavaScript.
        // FLOOR     3 The remainder has the same sign as the divisor (Python %).
        // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
        // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
        //             The remainder is always positive.
        //
        // The truncated division, floored division, Euclidian division and IEEE 754 remainder
        // modes are commonly used for the modulus operation.
        // Although the other rounding modes can also be used, they may not give useful results.
        MODULO_MODE = 1, // The maximum number of significant digits of the result of the exponentiatedBy operation.
        // If POW_PRECISION is 0, there will be unlimited significant digits.
        POW_PRECISION = 0, // The format specification used by the BigNumber.prototype.toFormat method.
        FORMAT = {
            prefix: '',
            groupSize: 3,
            secondaryGroupSize: 0,
            groupSeparator: ',',
            decimalSeparator: '.',
            fractionGroupSize: 0,
            fractionGroupSeparator: '\xA0',
            suffix: ''
        }, // The alphabet used for base conversion. It must be at least 2 characters long, with no '+',
        // '-', '.', whitespace, or repeated character.
        // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
        ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz', alphabetHasNormalDecimalDigits = true;
        //------------------------------------------------------------------------------------------
        // CONSTRUCTOR
        /*
     * The BigNumber constructor and exported function.
     * Create and return a new instance of a BigNumber object.
     *
     * v {number|string|BigNumber} A numeric value.
     * [b] {number} The base of v. Integer, 2 to ALPHABET.length inclusive.
     */ function BigNumber(v, b) {
            var alphabet, c, caseChanged, e, i, isNum, len, str, x = this;
            // Enable constructor call without `new`.
            if (!(x instanceof BigNumber)) return new BigNumber(v, b);
            if (b == null) {
                if (v && v._isBigNumber === true) {
                    x.s = v.s;
                    if (!v.c || v.e > MAX_EXP) {
                        x.c = x.e = null;
                    } else if (v.e < MIN_EXP) {
                        x.c = [
                            x.e = 0
                        ];
                    } else {
                        x.e = v.e;
                        x.c = v.c.slice();
                    }
                    return;
                }
                if ((isNum = typeof v == 'number') && v * 0 == 0) {
                    // Use `1 / n` to handle minus zero also.
                    x.s = 1 / v < 0 ? (v = -v, -1) : 1;
                    // Fast path for integers, where n < 2147483648 (2**31).
                    if (v === ~~v) {
                        for(e = 0, i = v; i >= 10; i /= 10, e++);
                        if (e > MAX_EXP) {
                            x.c = x.e = null;
                        } else {
                            x.e = e;
                            x.c = [
                                v
                            ];
                        }
                        return;
                    }
                    str = String(v);
                } else {
                    if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);
                    x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
                }
                // Decimal point?
                if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
                // Exponential form?
                if ((i = str.search(/e/i)) > 0) {
                    // Determine exponent.
                    if (e < 0) e = i;
                    e += +str.slice(i + 1);
                    str = str.substring(0, i);
                } else if (e < 0) {
                    // Integer.
                    e = str.length;
                }
            } else {
                // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
                intCheck(b, 2, ALPHABET.length, 'Base');
                // Allow exponential notation to be used with base 10 argument, while
                // also rounding to DECIMAL_PLACES as with other bases.
                if (b == 10 && alphabetHasNormalDecimalDigits) {
                    x = new BigNumber(v);
                    return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
                }
                str = String(v);
                if (isNum = typeof v == 'number') {
                    // Avoid potential interpretation of Infinity and NaN as base 44+ values.
                    if (v * 0 != 0) return parseNumeric(x, str, isNum, b);
                    x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;
                    // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
                    if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
                        throw Error(tooManyDigits + v);
                    }
                } else {
                    x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
                }
                alphabet = ALPHABET.slice(0, b);
                e = i = 0;
                // Check that str is a valid base b number.
                // Don't use RegExp, so alphabet can contain special characters.
                for(len = str.length; i < len; i++){
                    if (alphabet.indexOf(c = str.charAt(i)) < 0) {
                        if (c == '.') {
                            // If '.' is not the first character and it has not be found before.
                            if (i > e) {
                                e = len;
                                continue;
                            }
                        } else if (!caseChanged) {
                            // Allow e.g. hexadecimal 'FF' as well as 'ff'.
                            if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
                                caseChanged = true;
                                i = -1;
                                e = 0;
                                continue;
                            }
                        }
                        return parseNumeric(x, String(v), isNum, b);
                    }
                }
                // Prevent later check for length on converted number.
                isNum = false;
                str = convertBase(str, b, 10, x.s);
                // Decimal point?
                if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
                else e = str.length;
            }
            // Determine leading zeros.
            for(i = 0; str.charCodeAt(i) === 48; i++);
            // Determine trailing zeros.
            for(len = str.length; str.charCodeAt(--len) === 48;);
            if (str = str.slice(i, ++len)) {
                len -= i;
                // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
                if (isNum && BigNumber.DEBUG && len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
                    throw Error(tooManyDigits + x.s * v);
                }
                // Overflow?
                if ((e = e - i - 1) > MAX_EXP) {
                    // Infinity.
                    x.c = x.e = null;
                // Underflow?
                } else if (e < MIN_EXP) {
                    // Zero.
                    x.c = [
                        x.e = 0
                    ];
                } else {
                    x.e = e;
                    x.c = [];
                    // Transform base
                    // e is the base 10 exponent.
                    // i is where to slice str to get the first element of the coefficient array.
                    i = (e + 1) % LOG_BASE;
                    if (e < 0) i += LOG_BASE; // i < 1
                    if (i < len) {
                        if (i) x.c.push(+str.slice(0, i));
                        for(len -= LOG_BASE; i < len;){
                            x.c.push(+str.slice(i, i += LOG_BASE));
                        }
                        i = LOG_BASE - (str = str.slice(i)).length;
                    } else {
                        i -= len;
                    }
                    for(; i--; str += '0');
                    x.c.push(+str);
                }
            } else {
                // Zero.
                x.c = [
                    x.e = 0
                ];
            }
        }
        // CONSTRUCTOR PROPERTIES
        BigNumber.clone = clone;
        BigNumber.ROUND_UP = 0;
        BigNumber.ROUND_DOWN = 1;
        BigNumber.ROUND_CEIL = 2;
        BigNumber.ROUND_FLOOR = 3;
        BigNumber.ROUND_HALF_UP = 4;
        BigNumber.ROUND_HALF_DOWN = 5;
        BigNumber.ROUND_HALF_EVEN = 6;
        BigNumber.ROUND_HALF_CEIL = 7;
        BigNumber.ROUND_HALF_FLOOR = 8;
        BigNumber.EUCLID = 9;
        /*
     * Configure infrequently-changing library-wide settings.
     *
     * Accept an object with the following optional properties (if the value of a property is
     * a number, it must be an integer within the inclusive range stated):
     *
     *   DECIMAL_PLACES   {number}           0 to MAX
     *   ROUNDING_MODE    {number}           0 to 8
     *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
     *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
     *   CRYPTO           {boolean}          true or false
     *   MODULO_MODE      {number}           0 to 9
     *   POW_PRECISION       {number}           0 to MAX
     *   ALPHABET         {string}           A string of two or more unique characters which does
     *                                       not contain '.'.
     *   FORMAT           {object}           An object with some of the following properties:
     *     prefix                 {string}
     *     groupSize              {number}
     *     secondaryGroupSize     {number}
     *     groupSeparator         {string}
     *     decimalSeparator       {string}
     *     fractionGroupSize      {number}
     *     fractionGroupSeparator {string}
     *     suffix                 {string}
     *
     * (The values assigned to the above FORMAT object properties are not checked for validity.)
     *
     * E.g.
     * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
     *
     * Ignore properties/parameters set to null or undefined, except for ALPHABET.
     *
     * Return an object with the properties current values.
     */ BigNumber.config = BigNumber.set = function(obj) {
            var p, v;
            if (obj != null) {
                if (typeof obj == 'object') {
                    // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
                    // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
                    if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
                        v = obj[p];
                        intCheck(v, 0, MAX, p);
                        DECIMAL_PLACES = v;
                    }
                    // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
                    // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'
                    if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
                        v = obj[p];
                        intCheck(v, 0, 8, p);
                        ROUNDING_MODE = v;
                    }
                    // EXPONENTIAL_AT {number|number[]}
                    // Integer, -MAX to MAX inclusive or
                    // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
                    // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'
                    if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
                        v = obj[p];
                        if (v && v.pop) {
                            intCheck(v[0], -MAX, 0, p);
                            intCheck(v[1], 0, MAX, p);
                            TO_EXP_NEG = v[0];
                            TO_EXP_POS = v[1];
                        } else {
                            intCheck(v, -MAX, MAX, p);
                            TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
                        }
                    }
                    // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
                    // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
                    // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'
                    if (obj.hasOwnProperty(p = 'RANGE')) {
                        v = obj[p];
                        if (v && v.pop) {
                            intCheck(v[0], -MAX, -1, p);
                            intCheck(v[1], 1, MAX, p);
                            MIN_EXP = v[0];
                            MAX_EXP = v[1];
                        } else {
                            intCheck(v, -MAX, MAX, p);
                            if (v) {
                                MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
                            } else {
                                throw Error(bignumberError + p + ' cannot be zero: ' + v);
                            }
                        }
                    }
                    // CRYPTO {boolean} true or false.
                    // '[BigNumber Error] CRYPTO not true or false: {v}'
                    // '[BigNumber Error] crypto unavailable'
                    if (obj.hasOwnProperty(p = 'CRYPTO')) {
                        v = obj[p];
                        if (v === !!v) {
                            if (v) {
                                if (typeof crypto != 'undefined' && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                                    CRYPTO = v;
                                } else {
                                    CRYPTO = !v;
                                    throw Error(bignumberError + 'crypto unavailable');
                                }
                            } else {
                                CRYPTO = v;
                            }
                        } else {
                            throw Error(bignumberError + p + ' not true or false: ' + v);
                        }
                    }
                    // MODULO_MODE {number} Integer, 0 to 9 inclusive.
                    // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'
                    if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
                        v = obj[p];
                        intCheck(v, 0, 9, p);
                        MODULO_MODE = v;
                    }
                    // POW_PRECISION {number} Integer, 0 to MAX inclusive.
                    // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'
                    if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
                        v = obj[p];
                        intCheck(v, 0, MAX, p);
                        POW_PRECISION = v;
                    }
                    // FORMAT {object}
                    // '[BigNumber Error] FORMAT not an object: {v}'
                    if (obj.hasOwnProperty(p = 'FORMAT')) {
                        v = obj[p];
                        if (typeof v == 'object') FORMAT = v;
                        else throw Error(bignumberError + p + ' not an object: ' + v);
                    }
                    // ALPHABET {string}
                    // '[BigNumber Error] ALPHABET invalid: {v}'
                    if (obj.hasOwnProperty(p = 'ALPHABET')) {
                        v = obj[p];
                        // Disallow if less than two characters,
                        // or if it contains '+', '-', '.', whitespace, or a repeated character.
                        if (typeof v == 'string' && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
                            alphabetHasNormalDecimalDigits = v.slice(0, 10) == '0123456789';
                            ALPHABET = v;
                        } else {
                            throw Error(bignumberError + p + ' invalid: ' + v);
                        }
                    }
                } else {
                    // '[BigNumber Error] Object expected: {v}'
                    throw Error(bignumberError + 'Object expected: ' + obj);
                }
            }
            return {
                DECIMAL_PLACES: DECIMAL_PLACES,
                ROUNDING_MODE: ROUNDING_MODE,
                EXPONENTIAL_AT: [
                    TO_EXP_NEG,
                    TO_EXP_POS
                ],
                RANGE: [
                    MIN_EXP,
                    MAX_EXP
                ],
                CRYPTO: CRYPTO,
                MODULO_MODE: MODULO_MODE,
                POW_PRECISION: POW_PRECISION,
                FORMAT: FORMAT,
                ALPHABET: ALPHABET
            };
        };
        /*
     * Return true if v is a BigNumber instance, otherwise return false.
     *
     * If BigNumber.DEBUG is true, throw if a BigNumber instance is not well-formed.
     *
     * v {any}
     *
     * '[BigNumber Error] Invalid BigNumber: {v}'
     */ BigNumber.isBigNumber = function(v) {
            if (!v || v._isBigNumber !== true) return false;
            if (!BigNumber.DEBUG) return true;
            var i, n, c = v.c, e = v.e, s = v.s;
            out: if (({}).toString.call(c) == '[object Array]') {
                if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {
                    // If the first element is zero, the BigNumber value must be zero.
                    if (c[0] === 0) {
                        if (e === 0 && c.length === 1) return true;
                        break out;
                    }
                    // Calculate number of digits that c[0] should have, based on the exponent.
                    i = (e + 1) % LOG_BASE;
                    if (i < 1) i += LOG_BASE;
                    // Calculate number of digits of c[0].
                    //if (Math.ceil(Math.log(c[0] + 1) / Math.LN10) == i) {
                    if (String(c[0]).length == i) {
                        for(i = 0; i < c.length; i++){
                            n = c[i];
                            if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
                        }
                        // Last element cannot be zero, unless it is the only element.
                        if (n !== 0) return true;
                    }
                }
            // Infinity/NaN
            } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
                return true;
            }
            throw Error(bignumberError + 'Invalid BigNumber: ' + v);
        };
        /*
     * Return a new BigNumber whose value is the maximum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */ BigNumber.maximum = BigNumber.max = function() {
            return maxOrMin(arguments, -1);
        };
        /*
     * Return a new BigNumber whose value is the minimum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */ BigNumber.minimum = BigNumber.min = function() {
            return maxOrMin(arguments, 1);
        };
        /*
     * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
     * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
     * zeros are produced).
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
     * '[BigNumber Error] crypto unavailable'
     */ BigNumber.random = function() {
            var pow2_53 = 0x20000000000000;
            // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
            // Check if Math.random() produces more than 32 bits of randomness.
            // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
            // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
            var random53bitInt = Math.random() * pow2_53 & 0x1fffff ? function() {
                return mathfloor(Math.random() * pow2_53);
            } : function() {
                return (Math.random() * 0x40000000 | 0) * 0x800000 + (Math.random() * 0x800000 | 0);
            };
            return function(dp) {
                var a, b, e, k, v, i = 0, c = [], rand = new BigNumber(ONE);
                if (dp == null) dp = DECIMAL_PLACES;
                else intCheck(dp, 0, MAX);
                k = mathceil(dp / LOG_BASE);
                if (CRYPTO) {
                    // Browsers supporting crypto.getRandomValues.
                    if (crypto.getRandomValues) {
                        a = crypto.getRandomValues(new Uint32Array(k *= 2));
                        for(; i < k;){
                            // 53 bits:
                            // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
                            // 11111 11111111 11111111 11111111 11100000 00000000 00000000
                            // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
                            //                                     11111 11111111 11111111
                            // 0x20000 is 2^21.
                            v = a[i] * 0x20000 + (a[i + 1] >>> 11);
                            // Rejection sampling:
                            // 0 <= v < 9007199254740992
                            // Probability that v >= 9e15, is
                            // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
                            if (v >= 9e15) {
                                b = crypto.getRandomValues(new Uint32Array(2));
                                a[i] = b[0];
                                a[i + 1] = b[1];
                            } else {
                                // 0 <= v <= 8999999999999999
                                // 0 <= (v % 1e14) <= 99999999999999
                                c.push(v % 1e14);
                                i += 2;
                            }
                        }
                        i = k / 2;
                    // Node.js supporting crypto.randomBytes.
                    } else if (crypto.randomBytes) {
                        // buffer
                        a = crypto.randomBytes(k *= 7);
                        for(; i < k;){
                            // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
                            // 0x100000000 is 2^32, 0x1000000 is 2^24
                            // 11111 11111111 11111111 11111111 11111111 11111111 11111111
                            // 0 <= v < 9007199254740992
                            v = (a[i] & 31) * 0x1000000000000 + a[i + 1] * 0x10000000000 + a[i + 2] * 0x100000000 + a[i + 3] * 0x1000000 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];
                            if (v >= 9e15) {
                                crypto.randomBytes(7).copy(a, i);
                            } else {
                                // 0 <= (v % 1e14) <= 99999999999999
                                c.push(v % 1e14);
                                i += 7;
                            }
                        }
                        i = k / 7;
                    } else {
                        CRYPTO = false;
                        throw Error(bignumberError + 'crypto unavailable');
                    }
                }
                // Use Math.random.
                if (!CRYPTO) {
                    for(; i < k;){
                        v = random53bitInt();
                        if (v < 9e15) c[i++] = v % 1e14;
                    }
                }
                k = c[--i];
                dp %= LOG_BASE;
                // Convert trailing digits to zeros according to dp.
                if (k && dp) {
                    v = POWS_TEN[LOG_BASE - dp];
                    c[i] = mathfloor(k / v) * v;
                }
                // Remove trailing elements which are zero.
                for(; c[i] === 0; c.pop(), i--);
                // Zero?
                if (i < 0) {
                    c = [
                        e = 0
                    ];
                } else {
                    // Remove leading elements which are zero and adjust exponent accordingly.
                    for(e = -1; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);
                    // Count the digits of the first element of c to determine leading zeros, and...
                    for(i = 1, v = c[0]; v >= 10; v /= 10, i++);
                    // adjust the exponent accordingly.
                    if (i < LOG_BASE) e -= LOG_BASE - i;
                }
                rand.e = e;
                rand.c = c;
                return rand;
            };
        }();
        /*
     * Return a BigNumber whose value is the sum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */ BigNumber.sum = function() {
            var i = 1, args = arguments, sum = new BigNumber(args[0]);
            for(; i < args.length;)sum = sum.plus(args[i++]);
            return sum;
        };
        // PRIVATE FUNCTIONS
        // Called by BigNumber and BigNumber.prototype.toString.
        convertBase = function() {
            var decimal = '0123456789';
            /*
       * Convert string of baseIn to an array of numbers of baseOut.
       * Eg. toBaseOut('255', 10, 16) returns [15, 15].
       * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
       */ function toBaseOut(str, baseIn, baseOut, alphabet) {
                var j, arr = [
                    0
                ], arrL, i = 0, len = str.length;
                for(; i < len;){
                    for(arrL = arr.length; arrL--; arr[arrL] *= baseIn);
                    arr[0] += alphabet.indexOf(str.charAt(i++));
                    for(j = 0; j < arr.length; j++){
                        if (arr[j] > baseOut - 1) {
                            if (arr[j + 1] == null) arr[j + 1] = 0;
                            arr[j + 1] += arr[j] / baseOut | 0;
                            arr[j] %= baseOut;
                        }
                    }
                }
                return arr.reverse();
            }
            // Convert a numeric string of baseIn to a numeric string of baseOut.
            // If the caller is toString, we are converting from base 10 to baseOut.
            // If the caller is BigNumber, we are converting from baseIn to base 10.
            return function(str, baseIn, baseOut, sign, callerIsToString) {
                var alphabet, d, e, k, r, x, xc, y, i = str.indexOf('.'), dp = DECIMAL_PLACES, rm = ROUNDING_MODE;
                // Non-integer.
                if (i >= 0) {
                    k = POW_PRECISION;
                    // Unlimited precision.
                    POW_PRECISION = 0;
                    str = str.replace('.', '');
                    y = new BigNumber(baseIn);
                    x = y.pow(str.length - i);
                    POW_PRECISION = k;
                    // Convert str as if an integer, then restore the fraction part by dividing the
                    // result by its base raised to a power.
                    y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'), 10, baseOut, decimal);
                    y.e = y.c.length;
                }
                // Convert the number as integer.
                xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet = ALPHABET, decimal) : (alphabet = decimal, ALPHABET));
                // xc now represents str as an integer and converted to baseOut. e is the exponent.
                e = k = xc.length;
                // Remove trailing zeros.
                for(; xc[--k] == 0; xc.pop());
                // Zero?
                if (!xc[0]) return alphabet.charAt(0);
                // Does str represent an integer? If so, no need for the division.
                if (i < 0) {
                    --e;
                } else {
                    x.c = xc;
                    x.e = e;
                    // The sign is needed for correct rounding.
                    x.s = sign;
                    x = div(x, y, dp, rm, baseOut);
                    xc = x.c;
                    r = x.r;
                    e = x.e;
                }
                // xc now represents str converted to baseOut.
                // The index of the rounding digit.
                d = e + dp + 1;
                // The rounding digit: the digit to the right of the digit that may be rounded up.
                i = xc[d];
                // Look at the rounding digits and mode to determine whether to round up.
                k = baseOut / 2;
                r = r || d < 0 || xc[d + 1] != null;
                r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : i > k || i == k && (rm == 4 || r || rm == 6 && xc[d - 1] & 1 || rm == (x.s < 0 ? 8 : 7));
                // If the index of the rounding digit is not greater than zero, or xc represents
                // zero, then the result of the base conversion is zero or, if rounding up, a value
                // such as 0.00001.
                if (d < 1 || !xc[0]) {
                    // 1^-dp or 0
                    str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
                } else {
                    // Truncate xc to the required number of decimal places.
                    xc.length = d;
                    // Round up?
                    if (r) {
                        // Rounding up may mean the previous digit has to be rounded up and so on.
                        for(--baseOut; ++xc[--d] > baseOut;){
                            xc[d] = 0;
                            if (!d) {
                                ++e;
                                xc = [
                                    1
                                ].concat(xc);
                            }
                        }
                    }
                    // Determine trailing zeros.
                    for(k = xc.length; !xc[--k];);
                    // E.g. [4, 11, 15] becomes 4bf.
                    for(i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++]));
                    // Add leading zeros, decimal point and trailing zeros as required.
                    str = toFixedPoint(str, e, alphabet.charAt(0));
                }
                // The caller will add the sign.
                return str;
            };
        }();
        // Perform division in the specified base. Called by div and convertBase.
        div = function() {
            // Assume non-zero x and k.
            function multiply(x, k, base) {
                var m, temp, xlo, xhi, carry = 0, i = x.length, klo = k % SQRT_BASE, khi = k / SQRT_BASE | 0;
                for(x = x.slice(); i--;){
                    xlo = x[i] % SQRT_BASE;
                    xhi = x[i] / SQRT_BASE | 0;
                    m = khi * xlo + xhi * klo;
                    temp = klo * xlo + m % SQRT_BASE * SQRT_BASE + carry;
                    carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
                    x[i] = temp % base;
                }
                if (carry) x = [
                    carry
                ].concat(x);
                return x;
            }
            function compare(a, b, aL, bL) {
                var i, cmp;
                if (aL != bL) {
                    cmp = aL > bL ? 1 : -1;
                } else {
                    for(i = cmp = 0; i < aL; i++){
                        if (a[i] != b[i]) {
                            cmp = a[i] > b[i] ? 1 : -1;
                            break;
                        }
                    }
                }
                return cmp;
            }
            function subtract(a, b, aL, base) {
                var i = 0;
                // Subtract b from a.
                for(; aL--;){
                    a[aL] -= i;
                    i = a[aL] < b[aL] ? 1 : 0;
                    a[aL] = i * base + a[aL] - b[aL];
                }
                // Remove leading zeros.
                for(; !a[0] && a.length > 1; a.splice(0, 1));
            }
            // x: dividend, y: divisor.
            return function(x, y, dp, rm, base) {
                var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0, yL, yz, s = x.s == y.s ? 1 : -1, xc = x.c, yc = y.c;
                // Either NaN, Infinity or 0?
                if (!xc || !xc[0] || !yc || !yc[0]) {
                    return new BigNumber(// Return NaN if either NaN, or both Infinity or 0.
                    !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
                    xc && xc[0] == 0 || !yc ? s * 0 : s / 0);
                }
                q = new BigNumber(s);
                qc = q.c = [];
                e = x.e - y.e;
                s = dp + e + 1;
                if (!base) {
                    base = BASE;
                    e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
                    s = s / LOG_BASE | 0;
                }
                // Result exponent may be one less then the current value of e.
                // The coefficients of the BigNumbers from convertBase may have trailing zeros.
                for(i = 0; yc[i] == (xc[i] || 0); i++);
                if (yc[i] > (xc[i] || 0)) e--;
                if (s < 0) {
                    qc.push(1);
                    more = true;
                } else {
                    xL = xc.length;
                    yL = yc.length;
                    i = 0;
                    s += 2;
                    // Normalise xc and yc so highest order digit of yc is >= base / 2.
                    n = mathfloor(base / (yc[0] + 1));
                    // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
                    // if (n > 1 || n++ == 1 && yc[0] < base / 2) {
                    if (n > 1) {
                        yc = multiply(yc, n, base);
                        xc = multiply(xc, n, base);
                        yL = yc.length;
                        xL = xc.length;
                    }
                    xi = yL;
                    rem = xc.slice(0, yL);
                    remL = rem.length;
                    // Add zeros to make remainder as long as divisor.
                    for(; remL < yL; rem[remL++] = 0);
                    yz = yc.slice();
                    yz = [
                        0
                    ].concat(yz);
                    yc0 = yc[0];
                    if (yc[1] >= base / 2) yc0++;
                    // Not necessary, but to prevent trial digit n > base, when using base 3.
                    // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;
                    do {
                        n = 0;
                        // Compare divisor and remainder.
                        cmp = compare(yc, rem, yL, remL);
                        // If divisor < remainder.
                        if (cmp < 0) {
                            // Calculate trial digit, n.
                            rem0 = rem[0];
                            if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);
                            // n is how many times the divisor goes into the current remainder.
                            n = mathfloor(rem0 / yc0);
                            //  Algorithm:
                            //  product = divisor multiplied by trial digit (n).
                            //  Compare product and remainder.
                            //  If product is greater than remainder:
                            //    Subtract divisor from product, decrement trial digit.
                            //  Subtract product from remainder.
                            //  If product was less than remainder at the last compare:
                            //    Compare new remainder and divisor.
                            //    If remainder is greater than divisor:
                            //      Subtract divisor from remainder, increment trial digit.
                            if (n > 1) {
                                // n may be > base only when base is 3.
                                if (n >= base) n = base - 1;
                                // product = divisor * trial digit.
                                prod = multiply(yc, n, base);
                                prodL = prod.length;
                                remL = rem.length;
                                // Compare product and remainder.
                                // If product > remainder then trial digit n too high.
                                // n is 1 too high about 5% of the time, and is not known to have
                                // ever been more than 1 too high.
                                while(compare(prod, rem, prodL, remL) == 1){
                                    n--;
                                    // Subtract divisor from product.
                                    subtract(prod, yL < prodL ? yz : yc, prodL, base);
                                    prodL = prod.length;
                                    cmp = 1;
                                }
                            } else {
                                // n is 0 or 1, cmp is -1.
                                // If n is 0, there is no need to compare yc and rem again below,
                                // so change cmp to 1 to avoid it.
                                // If n is 1, leave cmp as -1, so yc and rem are compared again.
                                if (n == 0) {
                                    // divisor < remainder, so n must be at least 1.
                                    cmp = n = 1;
                                }
                                // product = divisor
                                prod = yc.slice();
                                prodL = prod.length;
                            }
                            if (prodL < remL) prod = [
                                0
                            ].concat(prod);
                            // Subtract product from remainder.
                            subtract(rem, prod, remL, base);
                            remL = rem.length;
                            // If product was < remainder.
                            if (cmp == -1) {
                                // Compare divisor and new remainder.
                                // If divisor < new remainder, subtract divisor from remainder.
                                // Trial digit n too low.
                                // n is 1 too low about 5% of the time, and very rarely 2 too low.
                                while(compare(yc, rem, yL, remL) < 1){
                                    n++;
                                    // Subtract divisor from remainder.
                                    subtract(rem, yL < remL ? yz : yc, remL, base);
                                    remL = rem.length;
                                }
                            }
                        } else if (cmp === 0) {
                            n++;
                            rem = [
                                0
                            ];
                        } // else cmp === 1 and n will be 0
                        // Add the next digit, n, to the result array.
                        qc[i++] = n;
                        // Update the remainder.
                        if (rem[0]) {
                            rem[remL++] = xc[xi] || 0;
                        } else {
                            rem = [
                                xc[xi]
                            ];
                            remL = 1;
                        }
                    }while ((xi++ < xL || rem[0] != null) && s--)
                    more = rem[0] != null;
                    // Leading zero?
                    if (!qc[0]) qc.splice(0, 1);
                }
                if (base == BASE) {
                    // To calculate q.e, first get the number of digits of qc[0].
                    for(i = 1, s = qc[0]; s >= 10; s /= 10, i++);
                    round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);
                // Caller is convertBase.
                } else {
                    q.e = e;
                    q.r = +more;
                }
                return q;
            };
        }();
        /*
     * Return a string representing the value of BigNumber n in fixed-point or exponential
     * notation rounded to the specified decimal places or significant digits.
     *
     * n: a BigNumber.
     * i: the index of the last digit required (i.e. the digit that may be rounded up).
     * rm: the rounding mode.
     * id: 1 (toExponential) or 2 (toPrecision).
     */ function format(n, i, rm, id) {
            var c0, e, ne, len, str;
            if (rm == null) rm = ROUNDING_MODE;
            else intCheck(rm, 0, 8);
            if (!n.c) return n.toString();
            c0 = n.c[0];
            ne = n.e;
            if (i == null) {
                str = coeffToString(n.c);
                str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS) ? toExponential(str, ne) : toFixedPoint(str, ne, '0');
            } else {
                n = round(new BigNumber(n), i, rm);
                // n.e may have changed if the value was rounded up.
                e = n.e;
                str = coeffToString(n.c);
                len = str.length;
                // toPrecision returns exponential notation if the number of significant digits
                // specified is less than the number of digits necessary to represent the integer
                // part of the value in fixed-point notation.
                // Exponential notation.
                if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {
                    // Append zeros?
                    for(; len < i; str += '0', len++);
                    str = toExponential(str, e);
                // Fixed-point notation.
                } else {
                    i -= ne + (id === 2 && e > ne);
                    str = toFixedPoint(str, e, '0');
                    // Append zeros?
                    if (e + 1 > len) {
                        if (--i > 0) for(str += '.'; i--; str += '0');
                    } else {
                        i += e - len;
                        if (i > 0) {
                            if (e + 1 == len) str += '.';
                            for(; i--; str += '0');
                        }
                    }
                }
            }
            return n.s < 0 && c0 ? '-' + str : str;
        }
        // Handle BigNumber.max and BigNumber.min.
        // If any number is NaN, return NaN.
        function maxOrMin(args, n) {
            var k, y, i = 1, x = new BigNumber(args[0]);
            for(; i < args.length; i++){
                y = new BigNumber(args[i]);
                if (!y.s || (k = compare(x, y)) === n || k === 0 && x.s === n) {
                    x = y;
                }
            }
            return x;
        }
        /*
     * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
     * Called by minus, plus and times.
     */ function normalise(n, c, e) {
            var i = 1, j = c.length;
            // Remove trailing zeros.
            for(; !c[--j]; c.pop());
            // Calculate the base 10 exponent. First get the number of digits of c[0].
            for(j = c[0]; j >= 10; j /= 10, i++);
            // Overflow?
            if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {
                // Infinity.
                n.c = n.e = null;
            // Underflow?
            } else if (e < MIN_EXP) {
                // Zero.
                n.c = [
                    n.e = 0
                ];
            } else {
                n.e = e;
                n.c = c;
            }
            return n;
        }
        // Handle values that fail the validity test in BigNumber.
        parseNumeric = function() {
            var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i, dotAfter = /^([^.]+)\.$/, dotBefore = /^\.([^.]+)$/, isInfinityOrNaN = /^-?(Infinity|NaN)$/, whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
            return function(x, str, isNum, b) {
                var base, s = isNum ? str : str.replace(whitespaceOrPlus, '');
                // No exception on ±Infinity or NaN.
                if (isInfinityOrNaN.test(s)) {
                    x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
                } else {
                    if (!isNum) {
                        // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
                        s = s.replace(basePrefix, function(m, p1, p2) {
                            base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
                            return !b || b == base ? p1 : m;
                        });
                        if (b) {
                            base = b;
                            // E.g. '1.' to '1', '.1' to '0.1'
                            s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
                        }
                        if (str != s) return new BigNumber(s, base);
                    }
                    // '[BigNumber Error] Not a number: {n}'
                    // '[BigNumber Error] Not a base {b} number: {n}'
                    if (BigNumber.DEBUG) {
                        throw Error(bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
                    }
                    // NaN
                    x.s = null;
                }
                x.c = x.e = null;
            };
        }();
        /*
     * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
     * If r is truthy, it is known that there are more digits after the rounding digit.
     */ function round(x, sd, rm, r) {
            var d, i, j, k, n, ni, rd, xc = x.c, pows10 = POWS_TEN;
            // if x is not Infinity or NaN...
            if (xc) {
                // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
                // n is a base 1e14 number, the value of the element of array x.c containing rd.
                // ni is the index of n within x.c.
                // d is the number of digits of n.
                // i is the index of rd within n including leading zeros.
                // j is the actual index of rd within n (if < 0, rd is a leading zero).
                out: {
                    // Get the number of digits of the first element of xc.
                    for(d = 1, k = xc[0]; k >= 10; k /= 10, d++);
                    i = sd - d;
                    // If the rounding digit is in the first element of xc...
                    if (i < 0) {
                        i += LOG_BASE;
                        j = sd;
                        n = xc[ni = 0];
                        // Get the rounding digit at index j of n.
                        rd = mathfloor(n / pows10[d - j - 1] % 10);
                    } else {
                        ni = mathceil((i + 1) / LOG_BASE);
                        if (ni >= xc.length) {
                            if (r) {
                                // Needed by sqrt.
                                for(; xc.length <= ni; xc.push(0));
                                n = rd = 0;
                                d = 1;
                                i %= LOG_BASE;
                                j = i - LOG_BASE + 1;
                            } else {
                                break out;
                            }
                        } else {
                            n = k = xc[ni];
                            // Get the number of digits of n.
                            for(d = 1; k >= 10; k /= 10, d++);
                            // Get the index of rd within n.
                            i %= LOG_BASE;
                            // Get the index of rd within n, adjusted for leading zeros.
                            // The number of leading zeros of n is given by LOG_BASE - d.
                            j = i - LOG_BASE + d;
                            // Get the rounding digit at index j of n.
                            rd = j < 0 ? 0 : mathfloor(n / pows10[d - j - 1] % 10);
                        }
                    }
                    r = r || sd < 0 || // Are there any non-zero digits after the rounding digit?
                    // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
                    // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
                    xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);
                    r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
                    (i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
                    if (sd < 1 || !xc[0]) {
                        xc.length = 0;
                        if (r) {
                            // Convert sd to decimal places.
                            sd -= x.e + 1;
                            // 1, 0.1, 0.01, 0.001, 0.0001 etc.
                            xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
                            x.e = -sd || 0;
                        } else {
                            // Zero.
                            xc[0] = x.e = 0;
                        }
                        return x;
                    }
                    // Remove excess digits.
                    if (i == 0) {
                        xc.length = ni;
                        k = 1;
                        ni--;
                    } else {
                        xc.length = ni + 1;
                        k = pows10[LOG_BASE - i];
                        // E.g. 56700 becomes 56000 if 7 is the rounding digit.
                        // j > 0 means i > number of leading zeros of n.
                        xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
                    }
                    // Round up?
                    if (r) {
                        for(;;){
                            // If the digit to be rounded up is in the first element of xc...
                            if (ni == 0) {
                                // i will be the length of xc[0] before k is added.
                                for(i = 1, j = xc[0]; j >= 10; j /= 10, i++);
                                j = xc[0] += k;
                                for(k = 1; j >= 10; j /= 10, k++);
                                // if i != k the length has increased.
                                if (i != k) {
                                    x.e++;
                                    if (xc[0] == BASE) xc[0] = 1;
                                }
                                break;
                            } else {
                                xc[ni] += k;
                                if (xc[ni] != BASE) break;
                                xc[ni--] = 0;
                                k = 1;
                            }
                        }
                    }
                    // Remove trailing zeros.
                    for(i = xc.length; xc[--i] === 0; xc.pop());
                }
                // Overflow? Infinity.
                if (x.e > MAX_EXP) {
                    x.c = x.e = null;
                // Underflow? Zero.
                } else if (x.e < MIN_EXP) {
                    x.c = [
                        x.e = 0
                    ];
                }
            }
            return x;
        }
        function valueOf(n) {
            var str, e = n.e;
            if (e === null) return n.toString();
            str = coeffToString(n.c);
            str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e, '0');
            return n.s < 0 ? '-' + str : str;
        }
        // PROTOTYPE/INSTANCE METHODS
        /*
     * Return a new BigNumber whose value is the absolute value of this BigNumber.
     */ P.absoluteValue = P.abs = function() {
            var x = new BigNumber(this);
            if (x.s < 0) x.s = 1;
            return x;
        };
        /*
     * Return
     *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
     *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
     *   0 if they have the same value,
     *   or null if the value of either is NaN.
     */ P.comparedTo = function(y, b) {
            return compare(this, new BigNumber(y, b));
        };
        /*
     * If dp is undefined or null or true or false, return the number of decimal places of the
     * value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     *
     * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */ P.decimalPlaces = P.dp = function(dp, rm) {
            var c, n, v, x = this;
            if (dp != null) {
                intCheck(dp, 0, MAX);
                if (rm == null) rm = ROUNDING_MODE;
                else intCheck(rm, 0, 8);
                return round(new BigNumber(x), dp + x.e + 1, rm);
            }
            if (!(c = x.c)) return null;
            n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;
            // Subtract the number of trailing zeros of the last number.
            if (v = c[v]) for(; v % 10 == 0; v /= 10, n--);
            if (n < 0) n = 0;
            return n;
        };
        /*
     *  n / 0 = I
     *  n / N = N
     *  n / I = 0
     *  0 / n = 0
     *  0 / 0 = N
     *  0 / N = N
     *  0 / I = 0
     *  N / n = N
     *  N / 0 = N
     *  N / N = N
     *  N / I = N
     *  I / n = I
     *  I / 0 = I
     *  I / N = N
     *  I / I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
     * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */ P.dividedBy = P.div = function(y, b) {
            return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
        };
        /*
     * Return a new BigNumber whose value is the integer part of dividing the value of this
     * BigNumber by the value of BigNumber(y, b).
     */ P.dividedToIntegerBy = P.idiv = function(y, b) {
            return div(this, new BigNumber(y, b), 0, 1);
        };
        /*
     * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
     *
     * If m is present, return the result modulo m.
     * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
     * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
     *
     * The modular power operation works efficiently when x, n, and m are integers, otherwise it
     * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
     *
     * n {number|string|BigNumber} The exponent. An integer.
     * [m] {number|string|BigNumber} The modulus.
     *
     * '[BigNumber Error] Exponent not an integer: {n}'
     */ P.exponentiatedBy = P.pow = function(n, m) {
            var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y, x = this;
            n = new BigNumber(n);
            // Allow NaN and ±Infinity, but not other non-integers.
            if (n.c && !n.isInteger()) {
                throw Error(bignumberError + 'Exponent not an integer: ' + valueOf(n));
            }
            if (m != null) m = new BigNumber(m);
            // Exponent of MAX_SAFE_INTEGER is 15.
            nIsBig = n.e > 14;
            // If x is NaN, ±Infinity, ±0 or ±1, or n is ±Infinity, NaN or ±0.
            if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {
                // The sign of the result of pow when x is negative depends on the evenness of n.
                // If +n overflows to ±Infinity, the evenness of n would be not be known.
                y = new BigNumber(Math.pow(+valueOf(x), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
                return m ? y.mod(m) : y;
            }
            nIsNeg = n.s < 0;
            if (m) {
                // x % m returns NaN if abs(m) is zero, or m is NaN.
                if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);
                isModExp = !nIsNeg && x.isInteger() && m.isInteger();
                if (isModExp) x = x.mod(m);
            // Overflow to ±Infinity: >=2**1e10 or >=1.0000024**1e15.
            // Underflow to ±0: <=0.79**1e10 or <=0.9999975**1e15.
            } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0 ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7 : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {
                // If x is negative and n is odd, k = -0, else k = 0.
                k = x.s < 0 && isOdd(n) ? -0 : 0;
                // If x >= 1, k = ±Infinity.
                if (x.e > -1) k = 1 / k;
                // If n is negative return ±0, else return ±Infinity.
                return new BigNumber(nIsNeg ? 1 / k : k);
            } else if (POW_PRECISION) {
                // Truncating each coefficient array to a length of k after each multiplication
                // equates to truncating significant digits to POW_PRECISION + [28, 41],
                // i.e. there will be a minimum of 28 guard digits retained.
                k = mathceil(POW_PRECISION / LOG_BASE + 2);
            }
            if (nIsBig) {
                half = new BigNumber(0.5);
                if (nIsNeg) n.s = 1;
                nIsOdd = isOdd(n);
            } else {
                i = Math.abs(+valueOf(n));
                nIsOdd = i % 2;
            }
            y = new BigNumber(ONE);
            // Performs 54 loop iterations for n of 9007199254740991.
            for(;;){
                if (nIsOdd) {
                    y = y.times(x);
                    if (!y.c) break;
                    if (k) {
                        if (y.c.length > k) y.c.length = k;
                    } else if (isModExp) {
                        y = y.mod(m); //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
                    }
                }
                if (i) {
                    i = mathfloor(i / 2);
                    if (i === 0) break;
                    nIsOdd = i % 2;
                } else {
                    n = n.times(half);
                    round(n, n.e + 1, 1);
                    if (n.e > 14) {
                        nIsOdd = isOdd(n);
                    } else {
                        i = +valueOf(n);
                        if (i === 0) break;
                        nIsOdd = i % 2;
                    }
                }
                x = x.times(x);
                if (k) {
                    if (x.c && x.c.length > k) x.c.length = k;
                } else if (isModExp) {
                    x = x.mod(m); //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
                }
            }
            if (isModExp) return y;
            if (nIsNeg) y = ONE.div(y);
            return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
        };
        /*
     * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
     * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
     */ P.integerValue = function(rm) {
            var n = new BigNumber(this);
            if (rm == null) rm = ROUNDING_MODE;
            else intCheck(rm, 0, 8);
            return round(n, n.e + 1, rm);
        };
        /*
     * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
     * otherwise return false.
     */ P.isEqualTo = P.eq = function(y, b) {
            return compare(this, new BigNumber(y, b)) === 0;
        };
        /*
     * Return true if the value of this BigNumber is a finite number, otherwise return false.
     */ P.isFinite = function() {
            return !!this.c;
        };
        /*
     * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
     * otherwise return false.
     */ P.isGreaterThan = P.gt = function(y, b) {
            return compare(this, new BigNumber(y, b)) > 0;
        };
        /*
     * Return true if the value of this BigNumber is greater than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */ P.isGreaterThanOrEqualTo = P.gte = function(y, b) {
            return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;
        };
        /*
     * Return true if the value of this BigNumber is an integer, otherwise return false.
     */ P.isInteger = function() {
            return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
        };
        /*
     * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
     * otherwise return false.
     */ P.isLessThan = P.lt = function(y, b) {
            return compare(this, new BigNumber(y, b)) < 0;
        };
        /*
     * Return true if the value of this BigNumber is less than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */ P.isLessThanOrEqualTo = P.lte = function(y, b) {
            return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
        };
        /*
     * Return true if the value of this BigNumber is NaN, otherwise return false.
     */ P.isNaN = function() {
            return !this.s;
        };
        /*
     * Return true if the value of this BigNumber is negative, otherwise return false.
     */ P.isNegative = function() {
            return this.s < 0;
        };
        /*
     * Return true if the value of this BigNumber is positive, otherwise return false.
     */ P.isPositive = function() {
            return this.s > 0;
        };
        /*
     * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
     */ P.isZero = function() {
            return !!this.c && this.c[0] == 0;
        };
        /*
     *  n - 0 = n
     *  n - N = N
     *  n - I = -I
     *  0 - n = -n
     *  0 - 0 = 0
     *  0 - N = N
     *  0 - I = -I
     *  N - n = N
     *  N - 0 = N
     *  N - N = N
     *  N - I = N
     *  I - n = I
     *  I - 0 = I
     *  I - N = N
     *  I - I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber minus the value of
     * BigNumber(y, b).
     */ P.minus = function(y, b) {
            var i, j, t, xLTy, x = this, a = x.s;
            y = new BigNumber(y, b);
            b = y.s;
            // Either NaN?
            if (!a || !b) return new BigNumber(NaN);
            // Signs differ?
            if (a != b) {
                y.s = -b;
                return x.plus(y);
            }
            var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
            if (!xe || !ye) {
                // Either Infinity?
                if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN);
                // Either zero?
                if (!xc[0] || !yc[0]) {
                    // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
                    return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x : // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
                    ROUNDING_MODE == 3 ? -0 : 0);
                }
            }
            xe = bitFloor(xe);
            ye = bitFloor(ye);
            xc = xc.slice();
            // Determine which is the bigger number.
            if (a = xe - ye) {
                if (xLTy = a < 0) {
                    a = -a;
                    t = xc;
                } else {
                    ye = xe;
                    t = yc;
                }
                t.reverse();
                // Prepend zeros to equalise exponents.
                for(b = a; b--; t.push(0));
                t.reverse();
            } else {
                // Exponents equal. Check digit by digit.
                j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;
                for(a = b = 0; b < j; b++){
                    if (xc[b] != yc[b]) {
                        xLTy = xc[b] < yc[b];
                        break;
                    }
                }
            }
            // x < y? Point xc to the array of the bigger number.
            if (xLTy) {
                t = xc;
                xc = yc;
                yc = t;
                y.s = -y.s;
            }
            b = (j = yc.length) - (i = xc.length);
            // Append zeros to xc if shorter.
            // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
            if (b > 0) for(; b--; xc[i++] = 0);
            b = BASE - 1;
            // Subtract yc from xc.
            for(; j > a;){
                if (xc[--j] < yc[j]) {
                    for(i = j; i && !xc[--i]; xc[i] = b);
                    --xc[i];
                    xc[j] += BASE;
                }
                xc[j] -= yc[j];
            }
            // Remove leading zeros and adjust exponent accordingly.
            for(; xc[0] == 0; xc.splice(0, 1), --ye);
            // Zero?
            if (!xc[0]) {
                // Following IEEE 754 (2008) 6.3,
                // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
                y.s = ROUNDING_MODE == 3 ? -1 : 1;
                y.c = [
                    y.e = 0
                ];
                return y;
            }
            // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
            // for finite x and y.
            return normalise(y, xc, ye);
        };
        /*
     *   n % 0 =  N
     *   n % N =  N
     *   n % I =  n
     *   0 % n =  0
     *  -0 % n = -0
     *   0 % 0 =  N
     *   0 % N =  N
     *   0 % I =  0
     *   N % n =  N
     *   N % 0 =  N
     *   N % N =  N
     *   N % I =  N
     *   I % n =  N
     *   I % 0 =  N
     *   I % N =  N
     *   I % I =  N
     *
     * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
     * BigNumber(y, b). The result depends on the value of MODULO_MODE.
     */ P.modulo = P.mod = function(y, b) {
            var q, s, x = this;
            y = new BigNumber(y, b);
            // Return NaN if x is Infinity or NaN, or y is NaN or zero.
            if (!x.c || !y.s || y.c && !y.c[0]) {
                return new BigNumber(NaN);
            // Return x if y is Infinity or x is zero.
            } else if (!y.c || x.c && !x.c[0]) {
                return new BigNumber(x);
            }
            if (MODULO_MODE == 9) {
                // Euclidian division: q = sign(y) * floor(x / abs(y))
                // r = x - qy    where  0 <= r < abs(y)
                s = y.s;
                y.s = 1;
                q = div(x, y, 0, 3);
                y.s = s;
                q.s *= s;
            } else {
                q = div(x, y, 0, MODULO_MODE);
            }
            y = x.minus(q.times(y));
            // To match JavaScript %, ensure sign of zero is sign of dividend.
            if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;
            return y;
        };
        /*
     *  n * 0 = 0
     *  n * N = N
     *  n * I = I
     *  0 * n = 0
     *  0 * 0 = 0
     *  0 * N = N
     *  0 * I = N
     *  N * n = N
     *  N * 0 = N
     *  N * N = N
     *  N * I = N
     *  I * n = I
     *  I * 0 = N
     *  I * N = N
     *  I * I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
     * of BigNumber(y, b).
     */ P.multipliedBy = P.times = function(y, b) {
            var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc, base, sqrtBase, x = this, xc = x.c, yc = (y = new BigNumber(y, b)).c;
            // Either NaN, ±Infinity or ±0?
            if (!xc || !yc || !xc[0] || !yc[0]) {
                // Return NaN if either is NaN, or one is 0 and the other is Infinity.
                if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
                    y.c = y.e = y.s = null;
                } else {
                    y.s *= x.s;
                    // Return ±Infinity if either is ±Infinity.
                    if (!xc || !yc) {
                        y.c = y.e = null;
                    // Return ±0 if either is ±0.
                    } else {
                        y.c = [
                            0
                        ];
                        y.e = 0;
                    }
                }
                return y;
            }
            e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
            y.s *= x.s;
            xcL = xc.length;
            ycL = yc.length;
            // Ensure xc points to longer array and xcL to its length.
            if (xcL < ycL) {
                zc = xc;
                xc = yc;
                yc = zc;
                i = xcL;
                xcL = ycL;
                ycL = i;
            }
            // Initialise the result array with zeros.
            for(i = xcL + ycL, zc = []; i--; zc.push(0));
            base = BASE;
            sqrtBase = SQRT_BASE;
            for(i = ycL; --i >= 0;){
                c = 0;
                ylo = yc[i] % sqrtBase;
                yhi = yc[i] / sqrtBase | 0;
                for(k = xcL, j = i + k; j > i;){
                    xlo = xc[--k] % sqrtBase;
                    xhi = xc[k] / sqrtBase | 0;
                    m = yhi * xlo + xhi * ylo;
                    xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j] + c;
                    c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
                    zc[j--] = xlo % base;
                }
                zc[j] = c;
            }
            if (c) {
                ++e;
            } else {
                zc.splice(0, 1);
            }
            return normalise(y, zc, e);
        };
        /*
     * Return a new BigNumber whose value is the value of this BigNumber negated,
     * i.e. multiplied by -1.
     */ P.negated = function() {
            var x = new BigNumber(this);
            x.s = -x.s || null;
            return x;
        };
        /*
     *  n + 0 = n
     *  n + N = N
     *  n + I = I
     *  0 + n = n
     *  0 + 0 = 0
     *  0 + N = N
     *  0 + I = I
     *  N + n = N
     *  N + 0 = N
     *  N + N = N
     *  N + I = N
     *  I + n = I
     *  I + 0 = I
     *  I + N = N
     *  I + I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber plus the value of
     * BigNumber(y, b).
     */ P.plus = function(y, b) {
            var t, x = this, a = x.s;
            y = new BigNumber(y, b);
            b = y.s;
            // Either NaN?
            if (!a || !b) return new BigNumber(NaN);
            // Signs differ?
            if (a != b) {
                y.s = -b;
                return x.minus(y);
            }
            var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
            if (!xe || !ye) {
                // Return ±Infinity if either ±Infinity.
                if (!xc || !yc) return new BigNumber(a / 0);
                // Either zero?
                // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
                if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
            }
            xe = bitFloor(xe);
            ye = bitFloor(ye);
            xc = xc.slice();
            // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
            if (a = xe - ye) {
                if (a > 0) {
                    ye = xe;
                    t = yc;
                } else {
                    a = -a;
                    t = xc;
                }
                t.reverse();
                for(; a--; t.push(0));
                t.reverse();
            }
            a = xc.length;
            b = yc.length;
            // Point xc to the longer array, and b to the shorter length.
            if (a - b < 0) {
                t = yc;
                yc = xc;
                xc = t;
                b = a;
            }
            // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
            for(a = 0; b;){
                a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
                xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
            }
            if (a) {
                xc = [
                    a
                ].concat(xc);
                ++ye;
            }
            // No need to check for zero, as +x + +y != 0 && -x + -y != 0
            // ye = MAX_EXP + 1 possible
            return normalise(y, xc, ye);
        };
        /*
     * If sd is undefined or null or true or false, return the number of significant digits of
     * the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     * If sd is true include integer-part trailing zeros in the count.
     *
     * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
     *                     boolean: whether to count integer-part trailing zeros: true or false.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */ P.precision = P.sd = function(sd, rm) {
            var c, n, v, x = this;
            if (sd != null && sd !== !!sd) {
                intCheck(sd, 1, MAX);
                if (rm == null) rm = ROUNDING_MODE;
                else intCheck(rm, 0, 8);
                return round(new BigNumber(x), sd, rm);
            }
            if (!(c = x.c)) return null;
            v = c.length - 1;
            n = v * LOG_BASE + 1;
            if (v = c[v]) {
                // Subtract the number of trailing zeros of the last element.
                for(; v % 10 == 0; v /= 10, n--);
                // Add the number of digits of the first element.
                for(v = c[0]; v >= 10; v /= 10, n++);
            }
            if (sd && x.e + 1 > n) n = x.e + 1;
            return n;
        };
        /*
     * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
     * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
     *
     * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
     */ P.shiftedBy = function(k) {
            intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
            return this.times('1e' + k);
        };
        /*
     *  sqrt(-n) =  N
     *  sqrt(N) =  N
     *  sqrt(-I) =  N
     *  sqrt(I) =  I
     *  sqrt(0) =  0
     *  sqrt(-0) = -0
     *
     * Return a new BigNumber whose value is the square root of the value of this BigNumber,
     * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */ P.squareRoot = P.sqrt = function() {
            var m, n, r, rep, t, x = this, c = x.c, s = x.s, e = x.e, dp = DECIMAL_PLACES + 4, half = new BigNumber('0.5');
            // Negative/NaN/Infinity/zero?
            if (s !== 1 || !c || !c[0]) {
                return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
            }
            // Initial estimate.
            s = Math.sqrt(+valueOf(x));
            // Math.sqrt underflow/overflow?
            // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
            if (s == 0 || s == 1 / 0) {
                n = coeffToString(c);
                if ((n.length + e) % 2 == 0) n += '0';
                s = Math.sqrt(+n);
                e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);
                if (s == 1 / 0) {
                    n = '5e' + e;
                } else {
                    n = s.toExponential();
                    n = n.slice(0, n.indexOf('e') + 1) + e;
                }
                r = new BigNumber(n);
            } else {
                r = new BigNumber(s + '');
            }
            // Check for zero.
            // r could be zero if MIN_EXP is changed after the this value was created.
            // This would cause a division by zero (x/t) and hence Infinity below, which would cause
            // coeffToString to throw.
            if (r.c[0]) {
                e = r.e;
                s = e + dp;
                if (s < 3) s = 0;
                // Newton-Raphson iteration.
                for(;;){
                    t = r;
                    r = half.times(t.plus(div(x, t, dp, 1)));
                    if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {
                        // The exponent of r may here be one less than the final result exponent,
                        // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
                        // are indexed correctly.
                        if (r.e < e) --s;
                        n = n.slice(s - 3, s + 1);
                        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
                        // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
                        // iteration.
                        if (n == '9999' || !rep && n == '4999') {
                            // On the first iteration only, check to see if rounding up gives the
                            // exact result as the nines may infinitely repeat.
                            if (!rep) {
                                round(t, t.e + DECIMAL_PLACES + 2, 0);
                                if (t.times(t).eq(x)) {
                                    r = t;
                                    break;
                                }
                            }
                            dp += 4;
                            s += 4;
                            rep = 1;
                        } else {
                            // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
                            // result. If not, then there are further digits and m will be truthy.
                            if (!+n || !+n.slice(1) && n.charAt(0) == '5') {
                                // Truncate to the first rounding digit.
                                round(r, r.e + DECIMAL_PLACES + 2, 1);
                                m = !r.times(r).eq(x);
                            }
                            break;
                        }
                    }
                }
            }
            return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
        };
        /*
     * Return a string representing the value of this BigNumber in exponential notation and
     * rounded using ROUNDING_MODE to dp fixed decimal places.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */ P.toExponential = function(dp, rm) {
            if (dp != null) {
                intCheck(dp, 0, MAX);
                dp++;
            }
            return format(this, dp, rm, 1);
        };
        /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounding
     * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
     * but e.g. (-0.00001).toFixed(0) is '-0'.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */ P.toFixed = function(dp, rm) {
            if (dp != null) {
                intCheck(dp, 0, MAX);
                dp = dp + this.e + 1;
            }
            return format(this, dp, rm);
        };
        /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounded
     * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
     * of the format or FORMAT object (see BigNumber.set).
     *
     * The formatting object may contain some or all of the properties shown below.
     *
     * FORMAT = {
     *   prefix: '',
     *   groupSize: 3,
     *   secondaryGroupSize: 0,
     *   groupSeparator: ',',
     *   decimalSeparator: '.',
     *   fractionGroupSize: 0,
     *   fractionGroupSeparator: '\xA0',      // non-breaking space
     *   suffix: ''
     * };
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     * [format] {object} Formatting options. See FORMAT pbject above.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     * '[BigNumber Error] Argument not an object: {format}'
     */ P.toFormat = function(dp, rm, format) {
            var str, x = this;
            if (format == null) {
                if (dp != null && rm && typeof rm == 'object') {
                    format = rm;
                    rm = null;
                } else if (dp && typeof dp == 'object') {
                    format = dp;
                    dp = rm = null;
                } else {
                    format = FORMAT;
                }
            } else if (typeof format != 'object') {
                throw Error(bignumberError + 'Argument not an object: ' + format);
            }
            str = x.toFixed(dp, rm);
            if (x.c) {
                var i, arr = str.split('.'), g1 = +format.groupSize, g2 = +format.secondaryGroupSize, groupSeparator = format.groupSeparator || '', intPart = arr[0], fractionPart = arr[1], isNeg = x.s < 0, intDigits = isNeg ? intPart.slice(1) : intPart, len = intDigits.length;
                if (g2) {
                    i = g1;
                    g1 = g2;
                    g2 = i;
                    len -= i;
                }
                if (g1 > 0 && len > 0) {
                    i = len % g1 || g1;
                    intPart = intDigits.substr(0, i);
                    for(; i < len; i += g1)intPart += groupSeparator + intDigits.substr(i, g1);
                    if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
                    if (isNeg) intPart = '-' + intPart;
                }
                str = fractionPart ? intPart + (format.decimalSeparator || '') + ((g2 = +format.fractionGroupSize) ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'), '$&' + (format.fractionGroupSeparator || '')) : fractionPart) : intPart;
            }
            return (format.prefix || '') + str + (format.suffix || '');
        };
        /*
     * Return an array of two BigNumbers representing the value of this BigNumber as a simple
     * fraction with an integer numerator and an integer denominator.
     * The denominator will be a positive non-zero value less than or equal to the specified
     * maximum denominator. If a maximum denominator is not specified, the denominator will be
     * the lowest value necessary to represent the number exactly.
     *
     * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
     *
     * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
     */ P.toFraction = function(md) {
            var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s, x = this, xc = x.c;
            if (md != null) {
                n = new BigNumber(md);
                // Throw if md is less than one or is not an integer, unless it is Infinity.
                if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
                    throw Error(bignumberError + 'Argument ' + (n.isInteger() ? 'out of range: ' : 'not an integer: ') + valueOf(n));
                }
            }
            if (!xc) return new BigNumber(x);
            d = new BigNumber(ONE);
            n1 = d0 = new BigNumber(ONE);
            d1 = n0 = new BigNumber(ONE);
            s = coeffToString(xc);
            // Determine initial denominator.
            // d is a power of 10 and the minimum max denominator that specifies the value exactly.
            e = d.e = s.length - x.e - 1;
            d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
            md = !md || n.comparedTo(d) > 0 ? e > 0 ? d : n1 : n;
            exp = MAX_EXP;
            MAX_EXP = 1 / 0;
            n = new BigNumber(s);
            // n0 = d1 = 0
            n0.c[0] = 0;
            for(;;){
                q = div(n, d, 0, 1);
                d2 = d0.plus(q.times(d1));
                if (d2.comparedTo(md) == 1) break;
                d0 = d1;
                d1 = d2;
                n1 = n0.plus(q.times(d2 = n1));
                n0 = d2;
                d = n.minus(q.times(d2 = d));
                n = d2;
            }
            d2 = div(md.minus(d0), d1, 0, 1);
            n0 = n0.plus(d2.times(n1));
            d0 = d0.plus(d2.times(d1));
            n0.s = n1.s = x.s;
            e = e * 2;
            // Determine which fraction is closer to x, n0/d0 or n1/d1
            r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [
                n1,
                d1
            ] : [
                n0,
                d0
            ];
            MAX_EXP = exp;
            return r;
        };
        /*
     * Return the value of this BigNumber converted to a number primitive.
     */ P.toNumber = function() {
            return +valueOf(this);
        };
        /*
     * Return a string representing the value of this BigNumber rounded to sd significant digits
     * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
     * necessary to represent the integer part of the value in fixed-point notation, then use
     * exponential notation.
     *
     * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */ P.toPrecision = function(sd, rm) {
            if (sd != null) intCheck(sd, 1, MAX);
            return format(this, sd, rm, 2);
        };
        /*
     * Return a string representing the value of this BigNumber in base b, or base 10 if b is
     * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
     * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
     * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
     * TO_EXP_NEG, return exponential notation.
     *
     * [b] {number} Integer, 2 to ALPHABET.length inclusive.
     *
     * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
     */ P.toString = function(b) {
            var str, n = this, s = n.s, e = n.e;
            // Infinity or NaN?
            if (e === null) {
                if (s) {
                    str = 'Infinity';
                    if (s < 0) str = '-' + str;
                } else {
                    str = 'NaN';
                }
            } else {
                if (b == null) {
                    str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(coeffToString(n.c), e) : toFixedPoint(coeffToString(n.c), e, '0');
                } else if (b === 10 && alphabetHasNormalDecimalDigits) {
                    n = round(new BigNumber(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
                    str = toFixedPoint(coeffToString(n.c), n.e, '0');
                } else {
                    intCheck(b, 2, ALPHABET.length, 'Base');
                    str = convertBase(toFixedPoint(coeffToString(n.c), e, '0'), 10, b, s, true);
                }
                if (s < 0 && n.c[0]) str = '-' + str;
            }
            return str;
        };
        /*
     * Return as toString, but do not accept a base argument, and include the minus sign for
     * negative zero.
     */ P.valueOf = P.toJSON = function() {
            return valueOf(this);
        };
        P._isBigNumber = true;
        if (configObject != null) BigNumber.set(configObject);
        return BigNumber;
    }
    // PRIVATE HELPER FUNCTIONS
    // These functions don't need access to variables,
    // e.g. DECIMAL_PLACES, in the scope of the `clone` function above.
    function bitFloor(n) {
        var i = n | 0;
        return n > 0 || n === i ? i : i - 1;
    }
    // Return a coefficient array as a string of base 10 digits.
    function coeffToString(a) {
        var s, z, i = 1, j = a.length, r = a[0] + '';
        for(; i < j;){
            s = a[i++] + '';
            z = LOG_BASE - s.length;
            for(; z--; s = '0' + s);
            r += s;
        }
        // Determine trailing zeros.
        for(j = r.length; r.charCodeAt(--j) === 48;);
        return r.slice(0, j + 1 || 1);
    }
    // Compare the value of BigNumbers x and y.
    function compare(x, y) {
        var a, b, xc = x.c, yc = y.c, i = x.s, j = y.s, k = x.e, l = y.e;
        // Either NaN?
        if (!i || !j) return null;
        a = xc && !xc[0];
        b = yc && !yc[0];
        // Either zero?
        if (a || b) return a ? b ? 0 : -j : i;
        // Signs differ?
        if (i != j) return i;
        a = i < 0;
        b = k == l;
        // Either Infinity?
        if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;
        // Compare exponents.
        if (!b) return k > l ^ a ? 1 : -1;
        j = (k = xc.length) < (l = yc.length) ? k : l;
        // Compare digit by digit.
        for(i = 0; i < j; i++)if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;
        // Compare lengths.
        return k == l ? 0 : k > l ^ a ? 1 : -1;
    }
    /*
   * Check that n is a primitive number, an integer, and in range, otherwise throw.
   */ function intCheck(n, min, max, name) {
        if (n < min || n > max || n !== mathfloor(n)) {
            throw Error(bignumberError + (name || 'Argument') + (typeof n == 'number' ? n < min || n > max ? ' out of range: ' : ' not an integer: ' : ' not a primitive number: ') + String(n));
        }
    }
    // Assumes finite n.
    function isOdd(n) {
        var k = n.c.length - 1;
        return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
    }
    function toExponential(str, e) {
        return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) + (e < 0 ? 'e' : 'e+') + e;
    }
    function toFixedPoint(str, e, z) {
        var len, zs;
        // Negative exponent?
        if (e < 0) {
            // Prepend zeros.
            for(zs = z + '.'; ++e; zs += z);
            str = zs + str;
        // Positive exponent
        } else {
            len = str.length;
            // Append zeros.
            if (++e > len) {
                for(zs = z, e -= len; --e; zs += z);
                str += zs;
            } else if (e < len) {
                str = str.slice(0, e) + '.' + str.slice(e);
            }
        }
        return str;
    }
    // EXPORT
    BigNumber = clone();
    BigNumber['default'] = BigNumber.BigNumber = BigNumber;
    // AMD.
    if (typeof define == 'function' && define.amd) {
        ((r)=>r !== undefined && __turbopack_context__.v(r))(function() {
            return BigNumber;
        }(__turbopack_context__.r, exports, module));
    // Node.js and other environments that support module.exports.
    } else if (("TURBOPACK compile-time value", "object") != 'undefined' && module.exports) {
        module.exports = BigNumber;
    // Browser.
    } else {
        if (!globalObject) {
            globalObject = typeof self != 'undefined' && self ? self : window;
        }
        globalObject.BigNumber = BigNumber;
    }
})(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/buffer-equal-constant-time/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*jshint node:true */ var Buffer = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)").Buffer; // browserify
var SlowBuffer = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)").SlowBuffer;
module.exports = bufferEq;
function bufferEq(a, b) {
    // shortcutting on type is necessary for correctness
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
        return false;
    }
    // buffer sizes should be well-known information, so despite this
    // shortcutting, it doesn't leak any information about the *contents* of the
    // buffers.
    if (a.length !== b.length) {
        return false;
    }
    var c = 0;
    for(var i = 0; i < a.length; i++){
        /*jshint bitwise:false */ c |= a[i] ^ b[i]; // XOR
    }
    return c === 0;
}
bufferEq.install = function() {
    Buffer.prototype.equal = SlowBuffer.prototype.equal = function equal(that) {
        return bufferEq(this, that);
    };
};
var origBufEqual = Buffer.prototype.equal;
var origSlowBufEqual = SlowBuffer.prototype.equal;
bufferEq.restore = function() {
    Buffer.prototype.equal = origBufEqual;
    SlowBuffer.prototype.equal = origSlowBufEqual;
};
}),
"[project]/node_modules/dotenv/dist/config.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.r("[project]/node_modules/dotenv/dist/index.cjs [app-route] (ecmascript)").config();
}),
"[project]/node_modules/dotenv/dist/index.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var O = (e, o)=>()=>{
        try {
            return o || e((o = {
                exports: {}
            }).exports, o), o.exports;
        } catch (t) {
            throw o = 0, t;
        }
    };
var q = O((Ce, j)=>{
    function I(e) {
        return typeof e == "string" ? ![
            "false",
            "0",
            "no",
            "off",
            ""
        ].includes(e.toLowerCase()) : !!e;
    }
    function B() {
        let e = {};
        for (let o of [
            "ENCODING",
            "PATH",
            "QUIET",
            "DEBUG",
            "OVERRIDE",
            "FAST"
        ]){
            let t = process.env[`DOTENV_${o}`] != null ? process.env[`DOTENV_${o}`] : process.env[`DOTENV_CONFIG_${o}`];
            t != null && (e[o.toLowerCase()] = o === "ENCODING" || o === "PATH" ? t : I(t));
        }
        return e;
    }
    j.exports = {
        parseBoolean: I,
        optionsFromEnv: B
    };
});
var y = O((we, C)=>{
    var H = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)"), x = __turbopack_context__.r("[externals]/path [external] (path, cjs)"), L = __turbopack_context__.r("[externals]/os [external] (os, cjs)"), { URL: M, fileURLToPath: W } = __turbopack_context__.r("[externals]/url [external] (url, cjs)"), { parseBoolean: T, optionsFromEnv: Q } = q(), J = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg, v = new Uint8Array(256);
    for(let e = 48; e <= 57; e++)v[e] = 1;
    for(let e = 65; e <= 90; e++)v[e] = 1;
    for(let e = 97; e <= 122; e++)v[e] = 1;
    v[45] = 1;
    v[46] = 1;
    v[95] = 1;
    function K(e) {
        let o = {}, t = e.toString();
        t = t.replace(/\r\n?/mg, `
`);
        let n;
        for(; (n = J.exec(t)) != null;){
            let r = n[1], s = n[2] || "";
            s = s.trim();
            let i = s[0];
            s = s.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), i === '"' && (s = s.replace(/\\n/g, `
`), s = s.replace(/\\r/g, "\r")), o[r] = s;
        }
        return o;
    }
    function X(e) {
        let o = {}, t = typeof e == "string" ? e : e.toString();
        t.indexOf("\r") !== -1 && (t = t.replace(/\r\n?/g, `
`));
        let n = t.length, r = 0;
        for(; r < n;){
            let s = t.charCodeAt(r);
            for(; r < n && (s === 32 || s === 9 || s === 10 || s === 65279);)r++, s = t.charCodeAt(r);
            if (r >= n) break;
            if (s === 35) {
                for(; r < n && t.charCodeAt(r) !== 10;)r++;
                continue;
            }
            if (s === 101 && r + 6 < n && t.charCodeAt(r + 1) === 120 && t.charCodeAt(r + 2) === 112 && t.charCodeAt(r + 3) === 111 && t.charCodeAt(r + 4) === 114 && t.charCodeAt(r + 5) === 116) {
                let f = t.charCodeAt(r + 6);
                if (f === 32 || f === 9) for(r += 7; r < n && ((s = t.charCodeAt(r)) === 32 || s === 9);)r++;
                else s = t.charCodeAt(r);
            }
            let i = r, l = 0;
            for(; r < n && (l = t.charCodeAt(r), v[l]);)r++;
            if (r === i) {
                for(; r < n && t.charCodeAt(r) !== 10;)r++;
                continue;
            }
            let h = t.slice(i, r);
            if (r >= n && (l = 0), l === 32 || l === 9) do r++, l = r < n ? t.charCodeAt(r) : 0;
            while (l === 32 || l === 9)
            if (l === 61) r++;
            else if (l === 58 && r + 1 < n && (t.charCodeAt(r + 1) === 32 || t.charCodeAt(r + 1) === 9)) r++;
            else {
                for(; r < n && t.charCodeAt(r) !== 10;)r++;
                continue;
            }
            for(; r < n && ((s = t.charCodeAt(r)) === 32 || s === 9);)r++;
            let u;
            if (s = r < n ? t.charCodeAt(r) : 0, s === 39 || s === 34 || s === 96) {
                let f = s, c = r + 1, a = c;
                for(; a < n;){
                    let d = t.charCodeAt(a);
                    if (d === 92 && a + 1 < n) {
                        let p = t.charCodeAt(a + 1);
                        if (p === f || p === 92) {
                            a += 2;
                            continue;
                        }
                    }
                    if (d === f) break;
                    a++;
                }
                if (a >= n) {
                    let d = r, p = r;
                    for(; p < n;){
                        let w = t.charCodeAt(p);
                        if (w === 35 || w === 10) break;
                        p++;
                    }
                    let m = p;
                    for(; m > d;){
                        let w = t.charCodeAt(m - 1);
                        if (w === 32 || w === 9) m--;
                        else break;
                    }
                    if (u = t.slice(d, m), r = p, r < n && t.charCodeAt(r) === 35) for(; r < n && t.charCodeAt(r) !== 10;)r++;
                } else {
                    for(u = t.slice(c, a), r = a + 1, f === 34 && u.indexOf("\\") !== -1 && (u = u.replace(/\\n/g, `
`).replace(/\\r/g, "\r")); r < n && ((s = t.charCodeAt(r)) === 32 || s === 9);)r++;
                    if (r < n && t.charCodeAt(r) === 35) for(; r < n && t.charCodeAt(r) !== 10;)r++;
                }
            } else {
                let f = r, c = t.indexOf(`
`, r);
                c === -1 && (c = n);
                let a = t.indexOf("#", r);
                (a === -1 || a > c) && (a = c);
                let d = a;
                for(; d > f;){
                    let p = t.charCodeAt(d - 1);
                    if (p === 32 || p === 9) d--;
                    else break;
                }
                u = f === d ? "" : t.slice(f, d), r = a === c ? a : c;
            }
            o[h] = u;
        }
        return o;
    }
    function Y(e, o) {
        return o && T(o.fast) ? X(e) : K(e);
    }
    function b(e) {
        console.log(`\u2506 ${e}`);
    }
    function z(e) {
        console.error(`\u25C7 ${e}`);
    }
    function N(e) {
        return e[0] === "~" ? x.join(L.homedir(), e.slice(1)) : e;
    }
    function Z(e = {}) {
        return {
            ...Q(),
            ...e
        };
    }
    function ee(e) {
        e = Z(e);
        let o = x.resolve(process.cwd(), ".env"), t = "utf8", n = process.env;
        e && e.processEnv != null && (n = e.processEnv);
        let r = T(e && e.debug), s = T(e && e.quiet);
        e && e.encoding ? t = e.encoding : r && b("no encoding is specified (UTF-8 is used by default)");
        let i = [
            o
        ];
        if (e && e.path) if (!Array.isArray(e.path)) i = [
            N(e.path)
        ];
        else {
            i = [];
            for (let c of e.path)i.push(N(c));
        }
        let l, h = {}, u = {
            fast: e.fast
        };
        for (let c of i)try {
            let a = g.parse(H.readFileSync(c, {
                encoding: t
            }), u);
            g.populate(h, a, e);
        } catch (a) {
            r && b(`failed to load ${c} ${a.message}`), l = a;
        }
        let f = g.populate(n, h, e);
        if (r || !s) {
            let c = Object.keys(f).length, a = [];
            for (let d of i)try {
                let p = x.relative(process.cwd(), d instanceof M ? W(d) : d);
                a.push(p);
            } catch (p) {
                r && b(`failed to load ${d} ${p.message}`), l = p;
            }
            z(`injected env (${c}) from ${a.join(",")}`);
        }
        return l ? {
            parsed: h,
            error: l
        } : {
            parsed: h
        };
    }
    function te(e) {
        return g.configDotenv(e);
    }
    function re(e, o, t = {}) {
        let n = !!(t && t.debug), r = !!(t && t.override), s = {};
        if (e === null || typeof e != "object" || o === null || typeof o != "object") {
            let i = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
            throw i.code = "OBJECT_REQUIRED", i;
        }
        for (let i of Object.keys(o))Object.prototype.hasOwnProperty.call(e, i) ? (r === !0 && (e[i] = o[i], s[i] = o[i]), n && b(r === !0 ? `"${i}" is already defined and WAS overwritten` : `"${i}" is already defined and was NOT overwritten`)) : (e[i] = o[i], s[i] = o[i]);
        return s;
    }
    var g = {
        configDotenv: ee,
        config: te,
        parse: Y,
        populate: re
    };
    C.exports.configDotenv = g.configDotenv;
    C.exports.config = g.config;
    C.exports.parse = g.parse;
    C.exports.populate = g.populate;
    C.exports = g;
});
var F = O((be, R)=>{
    var $ = __turbopack_context__.r("[externals]/child_process [external] (child_process, cjs)"), oe = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)"), P = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
    function ne(e) {
        let o = [
            '"'
        ], t = 0;
        for (let n of e){
            if (n === "\\") {
                t++;
                continue;
            }
            n === '"' ? o.push("\\".repeat(t * 2 + 1), '"') : o.push("\\".repeat(t), n), t = 0;
        }
        return o.push("\\".repeat(t * 2), '"'), o.join("");
    }
    function _(e, o = 1) {
        for(let t = 0; t < o; t++){
            let n = [];
            for (let r of e){
                let s = r.charCodeAt(0), i = s >= 48 && s <= 57 || s >= 65 && s <= 90 || s >= 97 && s <= 122, l = "\\/:._-".includes(r);
                !i && !l && s < 128 && n.push("^"), n.push(r);
            }
            e = n.join("");
        }
        return e;
    }
    function D(e, o) {
        let t = Object.keys(e).reverse().find((n)=>n.toUpperCase() === o);
        return t === void 0 ? void 0 : e[t];
    }
    function se(e, o, t) {
        let n = (D(o, "PATHEXT") || ".COM;.EXE;.BAT;.CMD").split(";").filter(Boolean), s = n.some((l)=>e.toLowerCase().endsWith(l.toLowerCase())) ? [
            "",
            ...n
        ] : [
            ...n,
            ""
        ], i = /[\\/]/.test(e) ? [
            t
        ] : [
            t,
            ...(D(o, "PATH") || "").split(";")
        ];
        for (let l of i)for (let h of s){
            let u = P.resolve(t, l.replace(/^"|"$/g, ""), e + h);
            try {
                if (oe.statSync(u).isFile()) return u;
            } catch  {}
        }
    }
    function ie(e, o, t) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        let n = t.env || process.env, r = se(e, n, t.cwd || process.cwd());
        if (r && /\.(?:exe|com)$/i.test(r)) return $.spawn(r, o, t);
        let s = /\.(?:bat|cmd)$/i.test(r || e), i = [
            _(P.normalize(r || e))
        ];
        for (let h of o)i.push(_(ne(h), s ? 2 : 1));
        let l = i.join(" ");
        return $.spawn(D(n, "COMSPEC") || "cmd.exe", [
            "/d",
            "/v:off",
            "/s",
            "/c",
            `"${l}"`
        ], {
            ...t,
            windowsVerbatimArguments: !0
        });
    }
    R.exports = ie;
});
var V = O((Ae, S)=>{
    var ce = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)"), ae = __turbopack_context__.r("[externals]/os [external] (os, cjs)"), G = __turbopack_context__.r("[externals]/path [external] (path, cjs)"), le = __turbopack_context__.r("[externals]/child_process [external] (child_process, cjs)"), fe = F(), k = y(), { optionsFromEnv: ue } = q();
    function A() {
        console.log([
            "Usage: dotenv run [--help] [-q|--quiet] [--debug] [--override] [--fast] [-f|--file <paths>] [--] <command> [args...]",
            "",
            "Run a command with environment variables from a .env file.",
            "Place dotenv options before the command; all following arguments go to the command.",
            "",
            "Options:",
            "  -f, --file <paths>  .env paths, comma-separated or repeated (default: .env)",
            "  -q, --quiet suppress the injected env message",
            "  --debug     enable debug logging",
            "  --override  override existing environment variables",
            "  --fast      use the faster character-scanner parser",
            "",
            "Environment variables (DOTENV_CONFIG_* names remain as fallbacks):",
            "  DOTENV_PATH, DOTENV_ENCODING, DOTENV_QUIET,",
            "  DOTENV_DEBUG, DOTENV_OVERRIDE,",
            "  DOTENV_FAST"
        ].join(`
`));
    }
    function de(e) {
        let o = [], t = !1, n, r, s, i, l = -1;
        for(let u = 0; u < e.length; u++){
            let f = e[u];
            if (f === "--") {
                l = u + 1;
                break;
            }
            if (f === "--help" || f === "-h") return {
                help: !0
            };
            if (f === "--quiet" || f === "-q") {
                n = !0;
                continue;
            }
            if (f === "--debug") {
                r = !0;
                continue;
            }
            if (f === "--override") {
                s = !0;
                continue;
            }
            if (f === "--fast") {
                i = !0;
                continue;
            }
            if (f === "-f" || f === "--file" || f.startsWith("-f=") || f.startsWith("--file=")) {
                let c = f.indexOf("="), a = c === -1 ? f : f.slice(0, c), d = c === -1 ? e[++u] : f.slice(c + 1);
                if (!d || d === "--") return {
                    error: `${a} requires a path`
                };
                let p = d.split(",").map((m)=>m.trim()).filter(Boolean);
                if (p.length === 0) return {
                    error: `${a} requires a path`
                };
                o.push(...p), t = !0;
                continue;
            }
            if (f.startsWith("-")) return {
                error: `unknown option: ${f}`
            };
            l = u;
            break;
        }
        let h = l === -1 ? [] : e.slice(l);
        return {
            paths: o,
            pathSet: t,
            quiet: n,
            debug: r,
            override: s,
            fast: i,
            command: h
        };
    }
    function pe(e) {
        return e[0] === "~" ? G.join(ae.homedir(), e.slice(1)) : e;
    }
    function he(e) {
        let o = ue(), t = {
            encoding: o.encoding || "utf8",
            quiet: o.quiet === !0,
            debug: o.debug === !0,
            override: o.override === !0,
            fast: o.fast === !0,
            paths: [
                ".env"
            ],
            defaultPath: !0
        };
        return o.path != null && (t.paths = [
            o.path
        ], t.defaultPath = !1), e.pathSet && (t.paths = e.paths, t.defaultPath = !1), e.quiet != null && (t.quiet = e.quiet), e.debug != null && (t.debug = e.debug), e.override != null && (t.override = e.override), e.fast != null && (t.fast = e.fast), t;
    }
    function ge(e) {
        let o = {}, t = [], n = {
            override: e.override,
            debug: e.debug
        };
        for (let s of e.paths){
            let i = G.resolve(process.cwd(), pe(s));
            try {
                let l = k.parse(ce.readFileSync(i, {
                    encoding: e.encoding
                }), {
                    fast: e.fast
                });
                k.populate(o, l, n), t.push(s);
            } catch (l) {
                if (e.debug && console.log(`\u2506 failed to load ${s} ${l.message}`), !(e.defaultPath && l.code === "ENOENT")) throw l;
            }
        }
        return {
            injected: k.populate(process.env, o, n),
            loadedPaths: t
        };
    }
    function U(e) {
        let o = e[0];
        if (o === "--help" || o === "-h") {
            A();
            return;
        }
        if (o !== "run") {
            A(), process.exitCode = 1;
            return;
        }
        let t = de(e.slice(1));
        if (t.help) {
            A();
            return;
        }
        if (t.error) {
            console.error(`dotenv: ${t.error}`), A(), process.exitCode = 1;
            return;
        }
        if (t.command.length === 0) {
            A(), process.exitCode = 1;
            return;
        }
        let n = he(t);
        try {
            let c = ge(n);
            if (!n.quiet) {
                let a = `\u25C7 injected env (${Object.keys(c.injected).length})`;
                c.loadedPaths.length > 0 && (a += ` from ${c.loadedPaths.join(", ")}`), console.error(a);
            }
        } catch (c) {
            console.error(`dotenv: ${c.message}`), process.exitCode = 1;
            return;
        }
        let r = !!process.stdin.isTTY, s = process.platform !== "win32" && !r, i = fe(t.command[0], t.command.slice(1), {
            stdio: "inherit",
            detached: s
        }), l = new Map, h = 0;
        function u(c) {
            if (!(!i.pid || i.exitCode !== null || i.signalCode !== null)) {
                if ("TURBOPACK compile-time truthy", 1) {
                    le.spawnSync("taskkill", [
                        "/pid",
                        String(i.pid),
                        "/T",
                        "/F"
                    ], {
                        stdio: "ignore"
                    });
                    return;
                }
                //TURBOPACK unreachable
                ;
            }
        }
        function f() {
            for (let [c, a] of l)process.removeListener(c, a);
        }
        for (let c of [
            "SIGINT",
            "SIGTERM",
            "SIGHUP",
            "SIGQUIT"
        ]){
            let a = ()=>{
                if (c === "SIGINT") {
                    if (h++, r && process.platform !== "win32" && h === 1) return;
                    if (h > 1) {
                        u(h === 2 ? "SIGTERM" : "SIGKILL");
                        return;
                    }
                }
                u(c);
            };
            l.set(c, a), process.on(c, a);
        }
        i.on("error", function(c) {
            f(), console.error(`dotenv: ${c.message}`), process.exitCode = 1;
        }), i.on("exit", function(c, a) {
            f(), typeof c == "number" ? process.exit(c) : (setInterval(()=>{}, 1e3), process.kill(process.pid, a));
        });
    }
    S.exports = U;
    /*TURBOPACK member replacement*/ __turbopack_context__.t.main === S && U(process.argv.slice(2));
});
var E = y(), ve = V();
module.exports = E;
module.exports.config = E.config;
module.exports.configDotenv = E.configDotenv;
module.exports.parse = E.parse;
module.exports.populate = E.populate;
/*TURBOPACK member replacement*/ __turbopack_context__.t.main === module && ve(process.argv.slice(2));
}),
"[project]/node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Buffer = __turbopack_context__.r("[project]/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var getParamBytesForAlg = __turbopack_context__.r("[project]/node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js [app-route] (ecmascript)");
var MAX_OCTET = 0x80, CLASS_UNIVERSAL = 0, PRIMITIVE_BIT = 0x20, TAG_SEQ = 0x10, TAG_INT = 0x02, ENCODED_TAG_SEQ = TAG_SEQ | PRIMITIVE_BIT | CLASS_UNIVERSAL << 6, ENCODED_TAG_INT = TAG_INT | CLASS_UNIVERSAL << 6;
function base64Url(base64) {
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
function signatureAsBuffer(signature) {
    if (Buffer.isBuffer(signature)) {
        return signature;
    } else if ('string' === typeof signature) {
        return Buffer.from(signature, 'base64');
    }
    throw new TypeError('ECDSA signature must be a Base64 string or a Buffer');
}
function derToJose(signature, alg) {
    signature = signatureAsBuffer(signature);
    var paramBytes = getParamBytesForAlg(alg);
    // the DER encoded param should at most be the param size, plus a padding
    // zero, since due to being a signed integer
    var maxEncodedParamLength = paramBytes + 1;
    var inputLength = signature.length;
    var offset = 0;
    if (signature[offset++] !== ENCODED_TAG_SEQ) {
        throw new Error('Could not find expected "seq"');
    }
    var seqLength = signature[offset++];
    if (seqLength === (MAX_OCTET | 1)) {
        seqLength = signature[offset++];
    }
    if (inputLength - offset < seqLength) {
        throw new Error('"seq" specified length of "' + seqLength + '", only "' + (inputLength - offset) + '" remaining');
    }
    if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "r"');
    }
    var rLength = signature[offset++];
    if (inputLength - offset - 2 < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", only "' + (inputLength - offset - 2) + '" available');
    }
    if (maxEncodedParamLength < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
    }
    var rOffset = offset;
    offset += rLength;
    if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "s"');
    }
    var sLength = signature[offset++];
    if (inputLength - offset !== sLength) {
        throw new Error('"s" specified length of "' + sLength + '", expected "' + (inputLength - offset) + '"');
    }
    if (maxEncodedParamLength < sLength) {
        throw new Error('"s" specified length of "' + sLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
    }
    var sOffset = offset;
    offset += sLength;
    if (offset !== inputLength) {
        throw new Error('Expected to consume entire buffer, but "' + (inputLength - offset) + '" bytes remain');
    }
    var rPadding = paramBytes - rLength, sPadding = paramBytes - sLength;
    var dst = Buffer.allocUnsafe(rPadding + rLength + sPadding + sLength);
    for(offset = 0; offset < rPadding; ++offset){
        dst[offset] = 0;
    }
    signature.copy(dst, offset, rOffset + Math.max(-rPadding, 0), rOffset + rLength);
    offset = paramBytes;
    for(var o = offset; offset < o + sPadding; ++offset){
        dst[offset] = 0;
    }
    signature.copy(dst, offset, sOffset + Math.max(-sPadding, 0), sOffset + sLength);
    dst = dst.toString('base64');
    dst = base64Url(dst);
    return dst;
}
function countPadding(buf, start, stop) {
    var padding = 0;
    while(start + padding < stop && buf[start + padding] === 0){
        ++padding;
    }
    var needsSign = buf[start + padding] >= MAX_OCTET;
    if (needsSign) {
        --padding;
    }
    return padding;
}
function joseToDer(signature, alg) {
    signature = signatureAsBuffer(signature);
    var paramBytes = getParamBytesForAlg(alg);
    var signatureBytes = signature.length;
    if (signatureBytes !== paramBytes * 2) {
        throw new TypeError('"' + alg + '" signatures must be "' + paramBytes * 2 + '" bytes, saw "' + signatureBytes + '"');
    }
    var rPadding = countPadding(signature, 0, paramBytes);
    var sPadding = countPadding(signature, paramBytes, signature.length);
    var rLength = paramBytes - rPadding;
    var sLength = paramBytes - sPadding;
    var rsBytes = 1 + 1 + rLength + 1 + 1 + sLength;
    var shortLength = rsBytes < MAX_OCTET;
    var dst = Buffer.allocUnsafe((shortLength ? 2 : 3) + rsBytes);
    var offset = 0;
    dst[offset++] = ENCODED_TAG_SEQ;
    if (shortLength) {
        // Bit 8 has value "0"
        // bits 7-1 give the length.
        dst[offset++] = rsBytes;
    } else {
        // Bit 8 of first octet has value "1"
        // bits 7-1 give the number of additional length octets.
        dst[offset++] = MAX_OCTET | 1;
        // length, base 256
        dst[offset++] = rsBytes & 0xff;
    }
    dst[offset++] = ENCODED_TAG_INT;
    dst[offset++] = rLength;
    if (rPadding < 0) {
        dst[offset++] = 0;
        offset += signature.copy(dst, offset, 0, paramBytes);
    } else {
        offset += signature.copy(dst, offset, rPadding, paramBytes);
    }
    dst[offset++] = ENCODED_TAG_INT;
    dst[offset++] = sLength;
    if (sPadding < 0) {
        dst[offset++] = 0;
        signature.copy(dst, offset, paramBytes);
    } else {
        signature.copy(dst, offset, paramBytes + sPadding);
    }
    return dst;
}
module.exports = {
    derToJose: derToJose,
    joseToDer: joseToDer
};
}),
"[project]/node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function getParamSize(keySize) {
    var result = (keySize / 8 | 0) + (keySize % 8 === 0 ? 0 : 1);
    return result;
}
var paramBytesForAlg = {
    ES256: getParamSize(256),
    ES384: getParamSize(384),
    ES512: getParamSize(521)
};
function getParamBytesForAlg(alg) {
    var paramBytes = paramBytesForAlg[alg];
    if (paramBytes) {
        return paramBytes;
    }
    throw new Error('Unknown algorithm "' + alg + '"');
}
module.exports = getParamBytesForAlg;
}),
"[project]/node_modules/extend/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;
var isArray = function isArray(arr) {
    if (typeof Array.isArray === 'function') {
        return Array.isArray(arr);
    }
    return toStr.call(arr) === '[object Array]';
};
var isPlainObject = function isPlainObject(obj) {
    if (!obj || toStr.call(obj) !== '[object Object]') {
        return false;
    }
    var hasOwnConstructor = hasOwn.call(obj, 'constructor');
    var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
    // Not own constructor property must be Object
    if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
    }
    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    var key;
    for(key in obj){}
    return typeof key === 'undefined' || hasOwn.call(obj, key);
};
// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
var setProperty = function setProperty(target, options) {
    if (defineProperty && options.name === '__proto__') {
        defineProperty(target, options.name, {
            enumerable: true,
            configurable: true,
            value: options.newValue,
            writable: true
        });
    } else {
        target[options.name] = options.newValue;
    }
};
// Return undefined instead of __proto__ if '__proto__' is not an own property
var getProperty = function getProperty(obj, name) {
    if (name === '__proto__') {
        if (!hasOwn.call(obj, name)) {
            return void 0;
        } else if (gOPD) {
            // In early versions of node, obj['__proto__'] is buggy when obj has
            // __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
            return gOPD(obj, name).value;
        }
    }
    return obj[name];
};
module.exports = function extend() {
    var options, name, src, copy, copyIsArray, clone;
    var target = arguments[0];
    var i = 1;
    var length = arguments.length;
    var deep = false;
    // Handle a deep copy situation
    if (typeof target === 'boolean') {
        deep = target;
        target = arguments[1] || {};
        // skip the boolean and the target
        i = 2;
    }
    if (target == null || typeof target !== 'object' && typeof target !== 'function') {
        target = {};
    }
    for(; i < length; ++i){
        options = arguments[i];
        // Only deal with non-null/undefined values
        if (options != null) {
            // Extend the base object
            for(name in options){
                src = getProperty(target, name);
                copy = getProperty(options, name);
                // Prevent never-ending loop
                if (target !== copy) {
                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && isArray(src) ? src : [];
                        } else {
                            clone = src && isPlainObject(src) ? src : {};
                        }
                        // Never move original objects, clone them
                        setProperty(target, {
                            name: name,
                            newValue: extend(deep, clone, copy)
                        });
                    // Don't bring in undefined values
                    } else if (typeof copy !== 'undefined') {
                        setProperty(target, {
                            name: name,
                            newValue: copy
                        });
                    }
                }
            }
        }
    }
    // Return the modified object
    return target;
};
}),
"[project]/node_modules/gaxios/build/cjs/src/common.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright 2018 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GaxiosError = exports.GAXIOS_ERROR_SYMBOL = void 0;
exports.defaultErrorRedactor = defaultErrorRedactor;
const extend_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/extend/index.js [app-route] (ecmascript)"));
const util_cjs_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/gaxios/build/cjs/src/util.cjs [app-route] (ecmascript)"));
const pkg = util_cjs_1.default.pkg;
/**
 * Support `instanceof` operator for `GaxiosError`s in different versions of this library.
 *
 * @see {@link GaxiosError[Symbol.hasInstance]}
 */ exports.GAXIOS_ERROR_SYMBOL = Symbol.for(`${pkg.name}-gaxios-error`);
class GaxiosError extends Error {
    config;
    response;
    /**
     * An error code.
     * Can be a system error code, DOMException error name, or any error's 'code' property where it is a `string`.
     *
     * It is only a `number` when the cause is sourced from an API-level error (AIP-193).
     *
     * @see {@link https://nodejs.org/api/errors.html#errorcode error.code}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMException#error_names DOMException#error_names}
     * @see {@link https://google.aip.dev/193#http11json-representation AIP-193}
     *
     * @example
     * 'ECONNRESET'
     *
     * @example
     * 'TimeoutError'
     *
     * @example
     * 500
     */ code;
    /**
     * An HTTP Status code.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Response/status Response#status}
     *
     * @example
     * 500
     */ status;
    /**
     * @deprecated use {@link GaxiosError.cause} instead.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause Error#cause}
     *
     * @privateRemarks
     *
     * We will want to remove this property later as the modern `cause` property is better suited
     * for displaying and relaying nested errors. Keeping this here makes the resulting
     * error log larger than it needs to be.
     *
     */ error;
    /**
     * Support `instanceof` operator for `GaxiosError` across builds/duplicated files.
     *
     * @see {@link GAXIOS_ERROR_SYMBOL}
     * @see {@link GaxiosError[Symbol.hasInstance]}
     * @see {@link https://github.com/microsoft/TypeScript/issues/13965#issuecomment-278570200}
     * @see {@link https://stackoverflow.com/questions/46618852/require-and-instanceof}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/@@hasInstance#reverting_to_default_instanceof_behavior}
     */ [exports.GAXIOS_ERROR_SYMBOL] = pkg.version;
    /**
     * Support `instanceof` operator for `GaxiosError` across builds/duplicated files.
     *
     * @see {@link GAXIOS_ERROR_SYMBOL}
     * @see {@link GaxiosError[GAXIOS_ERROR_SYMBOL]}
     */ static [Symbol.hasInstance](instance) {
        if (instance && typeof instance === 'object' && exports.GAXIOS_ERROR_SYMBOL in instance && instance[exports.GAXIOS_ERROR_SYMBOL] === pkg.version) {
            return true;
        }
        // fallback to native
        return Function.prototype[Symbol.hasInstance].call(GaxiosError, instance);
    }
    constructor(message, config, response, cause){
        super(message, {
            cause
        });
        this.config = config;
        this.response = response;
        this.error = cause instanceof Error ? cause : undefined;
        // deep-copy config as we do not want to mutate
        // the existing config for future retries/use
        this.config = (0, extend_1.default)(true, {}, config);
        if (this.response) {
            this.response.config = (0, extend_1.default)(true, {}, this.response.config);
        }
        if (this.response) {
            try {
                this.response.data = translateData(this.config.responseType, // workaround for `node-fetch`'s `.data` deprecation...
                this.response?.bodyUsed ? this.response?.data : undefined);
            } catch  {
            // best effort - don't throw an error within an error
            // we could set `this.response.config.responseType = 'unknown'`, but
            // that would mutate future calls with this config object.
            }
            this.status = this.response.status;
        }
        if (cause instanceof DOMException) {
            // The DOMException's equivalent to code is its name
            // E.g.: name = `TimeoutError`, code = number
            // https://developer.mozilla.org/en-US/docs/Web/API/DOMException/name
            this.code = cause.name;
        } else if (cause && typeof cause === 'object' && 'code' in cause && (typeof cause.code === 'string' || typeof cause.code === 'number')) {
            this.code = cause.code;
        }
    }
    /**
     * An AIP-193 conforming error extractor.
     *
     * @see {@link https://google.aip.dev/193#http11json-representation AIP-193}
     *
     * @internal
     * @expiremental
     *
     * @param res the response object
     * @returns the extracted error information
     */ static extractAPIErrorFromResponse(res, defaultErrorMessage = 'The request failed') {
        let message = defaultErrorMessage;
        // Use res.data as the error message
        if (typeof res.data === 'string') {
            message = res.data;
        }
        if (res.data && typeof res.data === 'object' && 'error' in res.data && res.data.error && !res.ok) {
            if (typeof res.data.error === 'string') {
                return {
                    message: res.data.error,
                    code: res.status,
                    status: res.statusText
                };
            }
            if (typeof res.data.error === 'object') {
                // extract status from data.message
                message = 'message' in res.data.error && typeof res.data.error.message === 'string' ? res.data.error.message : message;
                // extract status from data.error
                const status = 'status' in res.data.error && typeof res.data.error.status === 'string' ? res.data.error.status : res.statusText;
                // extract code from data.error
                const code = 'code' in res.data.error && typeof res.data.error.code === 'number' ? res.data.error.code : res.status;
                if ('errors' in res.data.error && Array.isArray(res.data.error.errors)) {
                    const errorMessages = [];
                    for (const e of res.data.error.errors){
                        if (typeof e === 'object' && 'message' in e && typeof e.message === 'string') {
                            errorMessages.push(e.message);
                        }
                    }
                    return Object.assign({
                        message: errorMessages.join('\n') || message,
                        code,
                        status
                    }, res.data.error);
                }
                return Object.assign({
                    message,
                    code,
                    status
                }, res.data.error);
            }
        }
        return {
            message,
            code: res.status,
            status: res.statusText
        };
    }
}
exports.GaxiosError = GaxiosError;
function translateData(responseType, data) {
    switch(responseType){
        case 'stream':
            return data;
        case 'json':
            return JSON.parse(JSON.stringify(data));
        case 'arraybuffer':
            return JSON.parse(Buffer.from(data).toString('utf8'));
        case 'blob':
            return JSON.parse(data.text());
        default:
            return data;
    }
}
/**
 * An experimental error redactor.
 *
 * @param config Config to potentially redact properties of
 * @param response Config to potentially redact properties of
 *
 * @experimental
 */ function defaultErrorRedactor(data) {
    const REDACT = '<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.';
    function redactHeaders(headers) {
        if (!headers) return;
        headers.forEach((_, key)=>{
            // any casing of `Authentication`
            // any casing of `Authorization`
            // anything containing secret, such as 'client secret'
            if (/^authentication$/i.test(key) || /^authorization$/i.test(key) || /secret/i.test(key)) headers.set(key, REDACT);
        });
    }
    function redactString(obj, key) {
        if (typeof obj === 'object' && obj !== null && typeof obj[key] === 'string') {
            const text = obj[key];
            if (/grant_type=/i.test(text) || /assertion=/i.test(text) || /secret/i.test(text)) {
                obj[key] = REDACT;
            }
        }
    }
    function redactObject(obj) {
        if (!obj || typeof obj !== 'object') {
            return;
        } else if (obj instanceof FormData || obj instanceof URLSearchParams || 'forEach' in obj && 'set' in obj) {
            obj.forEach((_, key)=>{
                if ([
                    'grant_type',
                    'assertion'
                ].includes(key) || /secret/.test(key)) {
                    obj.set(key, REDACT);
                }
            });
        } else {
            if ('grant_type' in obj) {
                obj['grant_type'] = REDACT;
            }
            if ('assertion' in obj) {
                obj['assertion'] = REDACT;
            }
            if ('client_secret' in obj) {
                obj['client_secret'] = REDACT;
            }
        }
    }
    if (data.config) {
        redactHeaders(data.config.headers);
        redactString(data.config, 'data');
        redactObject(data.config.data);
        redactString(data.config, 'body');
        redactObject(data.config.body);
        if (data.config.url.searchParams.has('token')) {
            data.config.url.searchParams.set('token', REDACT);
        }
        if (data.config.url.searchParams.has('client_secret')) {
            data.config.url.searchParams.set('client_secret', REDACT);
        }
    }
    if (data.response) {
        defaultErrorRedactor({
            config: data.response.config
        });
        redactHeaders(data.response.headers);
        // workaround for `node-fetch`'s `.data` deprecation...
        if (data.response.bodyUsed) {
            redactString(data.response, 'data');
            redactObject(data.response.data);
        }
    }
    return data;
}
}),
"[project]/node_modules/gaxios/build/cjs/src/gaxios.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright 2018 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
var _a;
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Gaxios = void 0;
const extend_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/extend/index.js [app-route] (ecmascript)"));
const https_1 = __turbopack_context__.r("[externals]/https [external] (https, cjs)");
const common_js_1 = __turbopack_context__.r("[project]/node_modules/gaxios/build/cjs/src/common.js [app-route] (ecmascript)");
const retry_js_1 = __turbopack_context__.r("[project]/node_modules/gaxios/build/cjs/src/retry.js [app-route] (ecmascript)");
const stream_1 = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
const interceptor_js_1 = __turbopack_context__.r("[project]/node_modules/gaxios/build/cjs/src/interceptor.js [app-route] (ecmascript)");
const randomUUID = async ()=>globalThis.crypto?.randomUUID() || (await __turbopack_context__.A("[externals]/crypto [external] (crypto, cjs, async loader)")).randomUUID();
const HTTP_STATUS_NO_CONTENT = 204;
class Gaxios {
    agentCache = new Map();
    /**
     * Default HTTP options that will be used for every HTTP request.
     */ defaults;
    /**
     * Interceptors
     */ interceptors;
    /**
     * The Gaxios class is responsible for making HTTP requests.
     * @param defaults The default set of options to be used for this instance.
     */ constructor(defaults){
        this.defaults = defaults || {};
        this.interceptors = {
            request: new interceptor_js_1.GaxiosInterceptorManager(),
            response: new interceptor_js_1.GaxiosInterceptorManager()
        };
    }
    /**
     * A {@link fetch `fetch`} compliant API for {@link Gaxios}.
     *
     * @remarks
     *
     * This is useful as a drop-in replacement for `fetch` API usage.
     *
     * @example
     *
     * ```ts
     * const gaxios = new Gaxios();
     * const myFetch: typeof fetch = (...args) => gaxios.fetch(...args);
     * await myFetch('https://example.com');
     * ```
     *
     * @param args `fetch` API or `Gaxios#request` parameters
     * @returns the {@link Response} with Gaxios-added properties
     */ fetch(...args) {
        // Up to 2 parameters in either overload
        const input = args[0];
        const init = args[1];
        let url = undefined;
        const headers = new Headers();
        // prepare URL
        if (typeof input === 'string') {
            url = new URL(input);
        } else if (input instanceof URL) {
            url = input;
        } else if (input && input.url) {
            url = new URL(input.url);
        }
        // prepare headers
        if (input && typeof input === 'object' && 'headers' in input) {
            _a.mergeHeaders(headers, input.headers);
        }
        if (init) {
            _a.mergeHeaders(headers, new Headers(init.headers));
        }
        // prepare request
        if (typeof input === 'object' && !(input instanceof URL)) {
            // input must have been a non-URL object
            return this.request({
                ...init,
                ...input,
                headers,
                url
            });
        } else {
            // input must have been a string or URL
            return this.request({
                ...init,
                headers,
                url
            });
        }
    }
    /**
     * Perform an HTTP request with the given options.
     * @param opts Set of HTTP options that will be used for this HTTP request.
     */ async request(opts = {}) {
        let prepared = await this.#prepareRequest(opts);
        prepared = await this.#applyRequestInterceptors(prepared);
        return this.#applyResponseInterceptors(this._request(prepared));
    }
    async _defaultAdapter(config) {
        const fetchImpl = config.fetchImplementation || this.defaults.fetchImplementation || await _a.#getFetch();
        // node-fetch v3 warns when `data` is present
        // https://github.com/node-fetch/node-fetch/issues/1000
        const preparedOpts = {
            ...config
        };
        delete preparedOpts.data;
        const res = await fetchImpl(config.url, preparedOpts);
        const data = await this.getResponseData(config, res);
        if (!Object.getOwnPropertyDescriptor(res, 'data')?.configurable) {
            // Work-around for `node-fetch` v3 as accessing `data` would otherwise throw
            Object.defineProperties(res, {
                data: {
                    configurable: true,
                    writable: true,
                    enumerable: true,
                    value: data
                }
            });
        }
        // Keep object as an instance of `Response`
        return Object.assign(res, {
            config,
            data
        });
    }
    /**
     * Internal, retryable version of the `request` method.
     * @param opts Set of HTTP options that will be used for this HTTP request.
     */ async _request(opts) {
        try {
            let translatedResponse;
            if (opts.adapter) {
                translatedResponse = await opts.adapter(opts, this._defaultAdapter.bind(this));
            } else {
                translatedResponse = await this._defaultAdapter(opts);
            }
            if (!opts.validateStatus(translatedResponse.status)) {
                if (opts.responseType === 'stream') {
                    const response = [];
                    for await (const chunk of translatedResponse.data){
                        response.push(chunk);
                    }
                    translatedResponse.data = Buffer.concat(response.map((c)=>typeof c === 'string' ? Buffer.from(c) : c)).toString('utf8');
                }
                const errorInfo = common_js_1.GaxiosError.extractAPIErrorFromResponse(translatedResponse, `Request failed with status code ${translatedResponse.status}`);
                throw new common_js_1.GaxiosError(errorInfo?.message, opts, translatedResponse, errorInfo);
            }
            return translatedResponse;
        } catch (e) {
            let err;
            if (e instanceof common_js_1.GaxiosError) {
                err = e;
            } else if (e instanceof Error) {
                err = new common_js_1.GaxiosError(e.message, opts, undefined, e);
            } else {
                err = new common_js_1.GaxiosError('Unexpected Gaxios Error', opts, undefined, e);
            }
            const { shouldRetry, config } = await (0, retry_js_1.getRetryConfig)(err);
            if (shouldRetry && config) {
                err.config.retryConfig.currentRetryAttempt = config.retryConfig.currentRetryAttempt;
                // The error's config could be redacted - therefore we only want to
                // copy the retry state over to the existing config
                opts.retryConfig = err.config?.retryConfig;
                // re-prepare timeout for the next request
                this.#appendTimeoutToSignal(opts);
                return this._request(opts);
            }
            if (opts.errorRedactor) {
                opts.errorRedactor(err);
            }
            throw err;
        }
    }
    async getResponseData(opts, res) {
        if (res.status === HTTP_STATUS_NO_CONTENT) {
            return '';
        }
        if (opts.maxContentLength && res.headers.has('content-length') && opts.maxContentLength < Number.parseInt(res.headers?.get('content-length') || '')) {
            throw new common_js_1.GaxiosError("Response's `Content-Length` is over the limit.", opts, Object.assign(res, {
                config: opts
            }));
        }
        switch(opts.responseType){
            case 'stream':
                return res.body;
            case 'json':
                {
                    const data = await res.text();
                    try {
                        return JSON.parse(data);
                    } catch  {
                        return data;
                    }
                }
            case 'arraybuffer':
                return res.arrayBuffer();
            case 'blob':
                return res.blob();
            case 'text':
                return res.text();
            default:
                return this.getResponseDataFromContentType(res);
        }
    }
    #urlMayUseProxy(url, noProxy = []) {
        const candidate = new URL(url);
        const noProxyList = [
            ...noProxy
        ];
        const noProxyEnvList = (process.env.NO_PROXY ?? process.env.no_proxy)?.split(',') || [];
        for (const rule of noProxyEnvList){
            noProxyList.push(rule.trim());
        }
        for (const rule of noProxyList){
            // Match regex
            if (rule instanceof RegExp) {
                if (rule.test(candidate.toString())) {
                    return false;
                }
            } else if (rule instanceof URL) {
                if (rule.origin === candidate.origin) {
                    return false;
                }
            } else if (rule.startsWith('*.') || rule.startsWith('.')) {
                const cleanedRule = rule.replace(/^\*\./, '.');
                if (candidate.hostname.endsWith(cleanedRule)) {
                    return false;
                }
            } else if (rule === candidate.origin || rule === candidate.hostname || rule === candidate.href) {
                return false;
            }
        }
        return true;
    }
    /**
     * Applies the request interceptors. The request interceptors are applied after the
     * call to prepareRequest is completed.
     *
     * @param {GaxiosOptionsPrepared} options The current set of options.
     *
     * @returns {Promise<GaxiosOptionsPrepared>} Promise that resolves to the set of options or response after interceptors are applied.
     */ async #applyRequestInterceptors(options) {
        let promiseChain = Promise.resolve(options);
        for (const interceptor of this.interceptors.request.values()){
            if (interceptor) {
                promiseChain = promiseChain.then(interceptor.resolved, interceptor.rejected);
            }
        }
        return promiseChain;
    }
    /**
     * Applies the response interceptors. The response interceptors are applied after the
     * call to request is made.
     *
     * @param {GaxiosOptionsPrepared} options The current set of options.
     *
     * @returns {Promise<GaxiosOptionsPrepared>} Promise that resolves to the set of options or response after interceptors are applied.
     */ async #applyResponseInterceptors(response) {
        let promiseChain = Promise.resolve(response);
        for (const interceptor of this.interceptors.response.values()){
            if (interceptor) {
                promiseChain = promiseChain.then(interceptor.resolved, interceptor.rejected);
            }
        }
        return promiseChain;
    }
    /**
     * Validates the options, merges them with defaults, and prepare request.
     *
     * @param options The original options passed from the client.
     * @returns Prepared options, ready to make a request
     */ async #prepareRequest(options) {
        // Prepare Headers - copy in order to not mutate the original objects
        const preparedHeaders = new Headers(this.defaults.headers);
        _a.mergeHeaders(preparedHeaders, options.headers);
        // Merge options
        const opts = (0, extend_1.default)(true, {}, this.defaults, options);
        if (!opts.url) {
            throw new Error('URL is required.');
        }
        if (opts.baseURL) {
            opts.url = new URL(opts.url, opts.baseURL);
        }
        // don't modify the properties of a default or provided URL
        opts.url = new URL(opts.url);
        if (opts.params) {
            if (opts.paramsSerializer) {
                let additionalQueryParams = opts.paramsSerializer(opts.params);
                if (additionalQueryParams.startsWith('?')) {
                    additionalQueryParams = additionalQueryParams.slice(1);
                }
                const prefix = opts.url.toString().includes('?') ? '&' : '?';
                opts.url = opts.url + prefix + additionalQueryParams;
            } else {
                const url = opts.url instanceof URL ? opts.url : new URL(opts.url);
                for (const [key, value] of new URLSearchParams(opts.params)){
                    url.searchParams.append(key, value);
                }
                opts.url = url;
            }
        }
        if (typeof options.maxContentLength === 'number') {
            opts.size = options.maxContentLength;
        }
        if (typeof options.maxRedirects === 'number') {
            opts.follow = options.maxRedirects;
        }
        const shouldDirectlyPassData = typeof opts.data === 'string' || opts.data instanceof ArrayBuffer || opts.data instanceof Blob || globalThis.File && opts.data instanceof File || opts.data instanceof FormData || opts.data instanceof stream_1.Readable || opts.data instanceof ReadableStream || opts.data instanceof String || opts.data instanceof URLSearchParams || ArrayBuffer.isView(opts.data) || // `Buffer` (Node.js), `DataView`, `TypedArray`
        /**
             * @deprecated `node-fetch` or another third-party's request types
             */ [
            'Blob',
            'File',
            'FormData'
        ].includes(opts.data?.constructor?.name || '');
        if (opts.multipart?.length) {
            const boundary = await randomUUID();
            preparedHeaders.set('content-type', `multipart/related; boundary=${boundary}`);
            opts.body = stream_1.Readable.from(this.getMultipartRequest(opts.multipart, boundary));
        } else if (shouldDirectlyPassData) {
            opts.body = opts.data;
        } else if (typeof opts.data === 'object') {
            if (preparedHeaders.get('Content-Type') === 'application/x-www-form-urlencoded') {
                // If www-form-urlencoded content type has been set, but data is
                // provided as an object, serialize the content
                opts.body = opts.paramsSerializer ? opts.paramsSerializer(opts.data) : new URLSearchParams(opts.data);
            } else {
                if (!preparedHeaders.has('content-type')) {
                    preparedHeaders.set('content-type', 'application/json');
                }
                opts.body = JSON.stringify(opts.data);
            }
        } else if (opts.data) {
            opts.body = opts.data;
        }
        opts.validateStatus = opts.validateStatus || this.validateStatus;
        opts.responseType = opts.responseType || 'unknown';
        if (!preparedHeaders.has('accept') && opts.responseType === 'json') {
            preparedHeaders.set('accept', 'application/json');
        }
        const proxy = opts.proxy || process?.env?.HTTPS_PROXY || process?.env?.https_proxy || process?.env?.HTTP_PROXY || process?.env?.http_proxy;
        if (opts.agent) {
        // don't do any of the following options - use the user-provided agent.
        } else if (proxy && this.#urlMayUseProxy(opts.url, opts.noProxy)) {
            const HttpsProxyAgent = await _a.#getProxyAgent();
            if (this.agentCache.has(proxy)) {
                opts.agent = this.agentCache.get(proxy);
            } else {
                opts.agent = new HttpsProxyAgent(proxy, {
                    cert: opts.cert,
                    key: opts.key
                });
                this.agentCache.set(proxy, opts.agent);
            }
        } else if (opts.cert && opts.key) {
            // Configure client for mTLS
            if (this.agentCache.has(opts.key)) {
                opts.agent = this.agentCache.get(opts.key);
            } else {
                opts.agent = new https_1.Agent({
                    cert: opts.cert,
                    key: opts.key
                });
                this.agentCache.set(opts.key, opts.agent);
            }
        }
        if (typeof opts.errorRedactor !== 'function' && opts.errorRedactor !== false) {
            opts.errorRedactor = common_js_1.defaultErrorRedactor;
        }
        if (opts.body && !('duplex' in opts)) {
            /**
             * required for Node.js and the type isn't available today
             * @link https://github.com/nodejs/node/issues/46221
             * @link https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1483
             */ opts.duplex = 'half';
        }
        this.#appendTimeoutToSignal(opts);
        return Object.assign(opts, {
            headers: preparedHeaders,
            url: opts.url instanceof URL ? opts.url : new URL(opts.url)
        });
    }
    #appendTimeoutToSignal(opts) {
        if (opts.timeout) {
            const timeoutSignal = AbortSignal.timeout(opts.timeout);
            if (opts.signal && !opts.signal.aborted) {
                opts.signal = AbortSignal.any([
                    opts.signal,
                    timeoutSignal
                ]);
            } else {
                opts.signal = timeoutSignal;
            }
        }
    }
    /**
     * By default, throw for any non-2xx status code
     * @param status status code from the HTTP response
     */ validateStatus(status) {
        return status >= 200 && status < 300;
    }
    /**
     * Attempts to parse a response by looking at the Content-Type header.
     * @param {Response} response the HTTP response.
     * @returns a promise that resolves to the response data.
     */ async getResponseDataFromContentType(response) {
        let contentType = response.headers.get('Content-Type');
        if (contentType === null) {
            // Maintain existing functionality by calling text()
            return response.text();
        }
        contentType = contentType.toLowerCase();
        if (contentType.includes('application/json')) {
            let data = await response.text();
            try {
                data = JSON.parse(data);
            } catch  {
            // continue
            }
            return data;
        } else if (contentType.match(/^text\//)) {
            return response.text();
        } else {
            // If the content type is something not easily handled, just return the raw data (blob)
            return response.blob();
        }
    }
    /**
     * Creates an async generator that yields the pieces of a multipart/related request body.
     * This implementation follows the spec: https://www.ietf.org/rfc/rfc2387.txt. However, recursive
     * multipart/related requests are not currently supported.
     *
     * @param {GaxiosMultipartOptions[]} multipartOptions the pieces to turn into a multipart/related body.
     * @param {string} boundary the boundary string to be placed between each part.
     */ async *getMultipartRequest(multipartOptions, boundary) {
        const finale = `--${boundary}--`;
        for (const currentPart of multipartOptions){
            const partContentType = currentPart.headers.get('Content-Type') || 'application/octet-stream';
            const preamble = `--${boundary}\r\nContent-Type: ${partContentType}\r\n\r\n`;
            yield preamble;
            if (typeof currentPart.content === 'string') {
                yield currentPart.content;
            } else {
                yield* currentPart.content;
            }
            yield '\r\n';
        }
        yield finale;
    }
    /**
     * A cache for the lazily-loaded proxy agent.
     *
     * Should use {@link Gaxios[#getProxyAgent]} to retrieve.
     */ // using `import` to dynamically import the types here
    static #proxyAgent;
    /**
     * A cache for the lazily-loaded fetch library.
     *
     * Should use {@link Gaxios[#getFetch]} to retrieve.
     */ //
    static #fetch;
    /**
     * Imports, caches, and returns a proxy agent - if not already imported
     *
     * @returns A proxy agent
     */ static async #getProxyAgent() {
        this.#proxyAgent ||= (await __turbopack_context__.A("[project]/node_modules/https-proxy-agent/dist/index.js [app-route] (ecmascript, async loader)")).HttpsProxyAgent;
        return this.#proxyAgent;
    }
    static async #getFetch() {
        const hasWindow = ("TURBOPACK compile-time value", "undefined") !== 'undefined' && !!window;
        this.#fetch ||= ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : (await __turbopack_context__.A("[project]/node_modules/gaxios/node_modules/node-fetch/src/index.js [app-route] (ecmascript, async loader)")).default;
        return this.#fetch;
    }
    /**
     * Merges headers.
     * If the base headers do not exist a new `Headers` object will be returned.
     *
     * @remarks
     *
     * Using this utility can be helpful when the headers are not known to exist:
     * - if they exist as `Headers`, that instance will be used
     *   - it improves performance and allows users to use their existing references to their `Headers`
     * - if they exist in another form (`HeadersInit`), they will be used to create a new `Headers` object
     * - if the base headers do not exist a new `Headers` object will be created
     *
     * @param base headers to append/overwrite to
     * @param append headers to append/overwrite with
     * @returns the base headers instance with merged `Headers`
     */ static mergeHeaders(base, ...append) {
        base = base instanceof Headers ? base : new Headers(base);
        for (const headers of append){
            const add = headers instanceof Headers ? headers : new Headers(headers);
            add.forEach((value, key)=>{
                // set-cookie is the only header that would repeat.
                // A bit of background: https://developer.mozilla.org/en-US/docs/Web/API/Headers/getSetCookie
                key === 'set-cookie' ? base.append(key, value) : base.set(key, value);
            });
        }
        return base;
    }
}
exports.Gaxios = Gaxios;
_a = Gaxios;
}),
"[project]/node_modules/gaxios/build/cjs/src/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright 2018 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.instance = exports.Gaxios = exports.GaxiosError = void 0;
exports.request = request;
const gaxios_js_1 = __turbopack_context__.r("[project]/node_modules/gaxios/build/cjs/src/gaxios.js [app-route] (ecmascript)");
Object.defineProperty(exports, "Gaxios", {
    enumerable: true,
    get: function() {
        return gaxios_js_1.Gaxios;
    }
});
var common_js_1 = __turbopack_context__.r("[project]/node_modules/gaxios/build/cjs/src/common.js [app-route] (ecmascript)");
Object.defineProperty(exports, "GaxiosError", {
    enumerable: true,
    get: function() {
        return common_js_1.GaxiosError;
    }
});
__exportStar(__turbopack_context__.r("[project]/node_modules/gaxios/build/cjs/src/interceptor.js [app-route] (ecmascript)"), exports);
/**
 * The default instance used when the `request` method is directly
 * invoked.
 */ exports.instance = new gaxios_js_1.Gaxios();
/**
 * Make an HTTP request using the given options.
 * @param opts Options for the request
 */ async function request(opts) {
    return exports.instance.request(opts);
}
}),
"[project]/node_modules/gaxios/build/cjs/src/interceptor.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright 2024 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GaxiosInterceptorManager = void 0;
/**
 * Class to manage collections of GaxiosInterceptors for both requests and responses.
 */ class GaxiosInterceptorManager extends Set {
}
exports.GaxiosInterceptorManager = GaxiosInterceptorManager;
}),
"[project]/node_modules/gaxios/build/cjs/src/retry.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright 2018 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRetryConfig = getRetryConfig;
async function getRetryConfig(err) {
    let config = getConfig(err);
    if (!err || !err.config || !config && !err.config.retry) {
        return {
            shouldRetry: false
        };
    }
    config = config || {};
    config.currentRetryAttempt = config.currentRetryAttempt || 0;
    config.retry = config.retry === undefined || config.retry === null ? 3 : config.retry;
    config.httpMethodsToRetry = config.httpMethodsToRetry || [
        'GET',
        'HEAD',
        'PUT',
        'OPTIONS',
        'DELETE'
    ];
    config.noResponseRetries = config.noResponseRetries === undefined || config.noResponseRetries === null ? 2 : config.noResponseRetries;
    config.retryDelayMultiplier = config.retryDelayMultiplier ? config.retryDelayMultiplier : 2;
    config.timeOfFirstRequest = config.timeOfFirstRequest ? config.timeOfFirstRequest : Date.now();
    config.totalTimeout = config.totalTimeout ? config.totalTimeout : Number.MAX_SAFE_INTEGER;
    config.maxRetryDelay = config.maxRetryDelay ? config.maxRetryDelay : Number.MAX_SAFE_INTEGER;
    // If this wasn't in the list of status codes where we want
    // to automatically retry, return.
    const retryRanges = [
        // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
        // 1xx - Retry (Informational, request still processing)
        // 2xx - Do not retry (Success)
        // 3xx - Do not retry (Redirect)
        // 4xx - Do not retry (Client errors)
        // 408 - Retry ("Request Timeout")
        // 429 - Retry ("Too Many Requests")
        // 5xx - Retry (Server errors)
        [
            100,
            199
        ],
        [
            408,
            408
        ],
        [
            429,
            429
        ],
        [
            500,
            599
        ]
    ];
    config.statusCodesToRetry = config.statusCodesToRetry || retryRanges;
    // Put the config back into the err
    err.config.retryConfig = config;
    // Determine if we should retry the request
    const shouldRetryFn = config.shouldRetry || shouldRetryRequest;
    if (!await shouldRetryFn(err)) {
        return {
            shouldRetry: false,
            config: err.config
        };
    }
    const delay = getNextRetryDelay(config);
    // We're going to retry!  Increment the counter.
    err.config.retryConfig.currentRetryAttempt += 1;
    // Create a promise that invokes the retry after the backOffDelay
    const backoff = config.retryBackoff ? config.retryBackoff(err, delay) : new Promise((resolve)=>{
        setTimeout(resolve, delay);
    });
    // Notify the user if they added an `onRetryAttempt` handler
    if (config.onRetryAttempt) {
        await config.onRetryAttempt(err);
    }
    // Return the promise in which recalls Gaxios to retry the request
    await backoff;
    return {
        shouldRetry: true,
        config: err.config
    };
}
/**
 * Determine based on config if we should retry the request.
 * @param err The GaxiosError passed to the interceptor.
 */ function shouldRetryRequest(err) {
    const config = getConfig(err);
    if (err.config.signal?.aborted && err.code !== 'TimeoutError' || err.code === 'AbortError') {
        return false;
    }
    // If there's no config, or retries are disabled, return.
    if (!config || config.retry === 0) {
        return false;
    }
    // Check if this error has no response (ETIMEDOUT, ENOTFOUND, etc)
    if (!err.response && (config.currentRetryAttempt || 0) >= config.noResponseRetries) {
        return false;
    }
    // Only retry with configured HttpMethods.
    if (!config.httpMethodsToRetry || !config.httpMethodsToRetry.includes(err.config.method?.toUpperCase() || 'GET')) {
        return false;
    }
    // If this wasn't in the list of status codes where we want
    // to automatically retry, return.
    if (err.response && err.response.status) {
        let isInRange = false;
        for (const [min, max] of config.statusCodesToRetry){
            const status = err.response.status;
            if (status >= min && status <= max) {
                isInRange = true;
                break;
            }
        }
        if (!isInRange) {
            return false;
        }
    }
    // If we are out of retry attempts, return
    config.currentRetryAttempt = config.currentRetryAttempt || 0;
    if (config.currentRetryAttempt >= config.retry) {
        return false;
    }
    return true;
}
/**
 * Acquire the raxConfig object from an GaxiosError if available.
 * @param err The Gaxios error with a config object.
 */ function getConfig(err) {
    if (err && err.config && err.config.retryConfig) {
        return err.config.retryConfig;
    }
    return;
}
/**
 * Gets the delay to wait before the next retry.
 *
 * @param {RetryConfig} config The current set of retry options
 * @returns {number} the amount of ms to wait before the next retry attempt.
 */ function getNextRetryDelay(config) {
    // Calculate time to wait with exponential backoff.
    // If this is the first retry, look for a configured retryDelay.
    const retryDelay = config.currentRetryAttempt ? 0 : config.retryDelay ?? 100;
    // Formula: retryDelay + ((retryDelayMultiplier^currentRetryAttempt - 1 / 2) * 1000)
    const calculatedDelay = retryDelay + (Math.pow(config.retryDelayMultiplier, config.currentRetryAttempt) - 1) / 2 * 1000;
    const maxAllowableDelay = config.totalTimeout - (Date.now() - config.timeOfFirstRequest);
    return Math.min(calculatedDelay, maxAllowableDelay, config.maxRetryDelay);
}
}),
"[project]/node_modules/gaxios/build/cjs/src/util.cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright 2023 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
const pkg = __turbopack_context__.r("[project]/node_modules/gaxios/package.json.[json].cjs [app-route] (ecmascript)");
module.exports = {
    pkg
};
}),
"[project]/node_modules/gaxios/package.json.[json].cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "name": "gaxios",
    "version": "7.3.1",
    "description": "A simple common HTTP client specifically for Google APIs and services.",
    "main": "build/cjs/src/index.js",
    "types": "build/cjs/src/index.d.ts",
    "files": [
        "build/"
    ],
    "exports": {
        ".": {
            "import": {
                "types": "./build/esm/src/index.d.ts",
                "default": "./build/esm/src/index.js"
            },
            "require": {
                "types": "./build/cjs/src/index.d.ts",
                "default": "./build/cjs/src/index.js"
            }
        }
    },
    "scripts": {
        "lint": "gts check --no-inline-config",
        "test": "c8 mocha build/esm/test",
        "presystem-test": "npm run compile",
        "system-test": "mocha build/esm/system-test --timeout 80000",
        "compile": "tsc -b ./tsconfig.json ./tsconfig.cjs.json && node utils/enable-esm.mjs",
        "fix": "gts fix",
        "prepare": "npm run compile",
        "pretest": "npm run compile",
        "webpack": "webpack",
        "prebrowser-test": "npm run compile",
        "browser-test": "node build/browser-test/browser-test-runner.js",
        "docs": "jsdoc -c .jsdoc.js",
        "samples-test": "cd samples/ && npm link ../ && npm test && cd ../",
        "prelint": "cd samples; npm link ../; npm install",
        "clean": "gts clean"
    },
    "repository": {
        "type": "git",
        "directory": "core/packages/gaxios",
        "url": "https://github.com/googleapis/google-cloud-node.git"
    },
    "keywords": [
        "google"
    ],
    "engines": {
        "node": ">=18"
    },
    "author": "Google, LLC",
    "license": "Apache-2.0",
    "devDependencies": {
        "@babel/plugin-proposal-private-methods": "^7.18.6",
        "@types/cors": "^2.8.6",
        "@types/express": "^5.0.0",
        "@types/extend": "^3.0.1",
        "@types/mocha": "^10.0.10",
        "@types/multiparty": "4.2.1",
        "@types/mv": "^2.1.0",
        "@types/ncp": "^2.0.8",
        "@types/node": "^24.0.0",
        "@types/sinon": "^21.0.0",
        "@types/tmp": "^0.2.6",
        "assert": "^2.0.0",
        "browserify": "^17.0.0",
        "c8": "^10.1.3",
        "cors": "^2.8.5",
        "express": "^5.0.0",
        "gts": "^6.0.2",
        "is-docker": "^3.0.0",
        "jsdoc": "^4.0.4",
        "jsdoc-fresh": "^5.0.0",
        "jsdoc-region-tag": "^4.0.0",
        "karma": "^6.0.0",
        "karma-chrome-launcher": "^3.0.0",
        "karma-coverage": "^2.0.0",
        "karma-firefox-launcher": "^2.0.0",
        "karma-mocha": "^2.0.0",
        "karma-remap-coverage": "^0.1.5",
        "karma-sourcemap-loader": "^0.4.0",
        "karma-webpack": "^5.0.0",
        "mocha": "^11.1.0",
        "multiparty": "^4.2.1",
        "mv": "^2.1.1",
        "ncp": "^2.0.0",
        "nock": "14.0.5",
        "null-loader": "^4.0.1",
        "pack-n-play": "^4.0.0",
        "puppeteer": "^24.0.0",
        "sinon": "21.0.3",
        "stream-browserify": "^3.0.0",
        "tmp": "0.2.7",
        "ts-loader": "^9.5.2",
        "typescript": "5.8.3",
        "undici-types": "^7.24.1",
        "webpack": "^5.97.1",
        "webpack-cli": "^6.0.1"
    },
    "dependencies": {
        "extend": "^3.0.2",
        "https-proxy-agent": "^7.0.1",
        "node-fetch": "^3.3.2"
    },
    "homepage": "https://github.com/googleapis/google-cloud-node/tree/main/core/packages/gaxios"
};
}),
"[project]/node_modules/gcp-metadata/build/src/gcp-residency.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GCE_LINUX_BIOS_PATHS = void 0;
exports.isGoogleCloudServerless = isGoogleCloudServerless;
exports.isGoogleComputeEngineLinux = isGoogleComputeEngineLinux;
exports.isGoogleComputeEngineMACAddress = isGoogleComputeEngineMACAddress;
exports.isGoogleComputeEngine = isGoogleComputeEngine;
exports.detectGCPResidency = detectGCPResidency;
const fs_1 = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const os_1 = __turbopack_context__.r("[externals]/os [external] (os, cjs)");
/**
 * Known paths unique to Google Compute Engine Linux instances
 */ exports.GCE_LINUX_BIOS_PATHS = {
    BIOS_DATE: '/sys/class/dmi/id/bios_date',
    BIOS_VENDOR: '/sys/class/dmi/id/bios_vendor'
};
const GCE_MAC_ADDRESS_REGEX = /^42:01/;
/**
 * Determines if the process is running on a Google Cloud Serverless environment (Cloud Run or Cloud Functions instance).
 *
 * Uses the:
 * - {@link https://cloud.google.com/run/docs/container-contract#env-vars Cloud Run environment variables}.
 * - {@link https://cloud.google.com/functions/docs/env-var Cloud Functions environment variables}.
 *
 * @returns {boolean} `true` if the process is running on GCP serverless, `false` otherwise.
 */ function isGoogleCloudServerless() {
    /**
     * `CLOUD_RUN_JOB` is used for Cloud Run Jobs
     * - See {@link https://cloud.google.com/run/docs/container-contract#env-vars Cloud Run environment variables}.
     *
     * `FUNCTION_NAME` is used in older Cloud Functions environments:
     * - See {@link https://cloud.google.com/functions/docs/env-var Python 3.7 and Go 1.11}.
     *
     * `K_SERVICE` is used in Cloud Run and newer Cloud Functions environments:
     * - See {@link https://cloud.google.com/run/docs/container-contract#env-vars Cloud Run environment variables}.
     * - See {@link https://cloud.google.com/functions/docs/env-var Cloud Functions newer runtimes}.
     */ const isGFEnvironment = process.env.CLOUD_RUN_JOB || process.env.FUNCTION_NAME || process.env.K_SERVICE;
    return !!isGFEnvironment;
}
/**
 * Determines if the process is running on a Linux Google Compute Engine instance.
 *
 * @returns {boolean} `true` if the process is running on Linux GCE, `false` otherwise.
 */ function isGoogleComputeEngineLinux() {
    if ((0, os_1.platform)() !== 'linux') return false;
    //TURBOPACK unreachable
    ;
}
/**
 * Determines if the process is running on a Google Compute Engine instance with a known
 * MAC address.
 *
 * @returns {boolean} `true` if the process is running on GCE (as determined by MAC address), `false` otherwise.
 */ function isGoogleComputeEngineMACAddress() {
    const interfaces = (0, os_1.networkInterfaces)();
    for (const item of Object.values(interfaces)){
        if (!item) continue;
        for (const { mac } of item){
            if (GCE_MAC_ADDRESS_REGEX.test(mac)) {
                return true;
            }
        }
    }
    return false;
}
/**
 * Determines if the process is running on a Google Compute Engine instance.
 *
 * @returns {boolean} `true` if the process is running on GCE, `false` otherwise.
 */ function isGoogleComputeEngine() {
    return isGoogleComputeEngineLinux() || isGoogleComputeEngineMACAddress();
}
/**
 * Determines if the process is running on Google Cloud Platform.
 *
 * @returns {boolean} `true` if the process is running on GCP, `false` otherwise.
 */ function detectGCPResidency() {
    return isGoogleCloudServerless() || isGoogleComputeEngine();
}
}),
"[project]/node_modules/gcp-metadata/build/src/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.gcpResidencyCache = exports.METADATA_SERVER_DETECTION = exports.HEADERS = exports.HEADER_VALUE = exports.HEADER_NAME = exports.SECONDARY_HOST_ADDRESS = exports.HOST_ADDRESS = exports.BASE_PATH = void 0;
exports.instance = instance;
exports.project = project;
exports.universe = universe;
exports.bulk = bulk;
exports.isAvailable = isAvailable;
exports.resetIsAvailableCache = resetIsAvailableCache;
exports.getGCPResidency = getGCPResidency;
exports.setGCPResidency = setGCPResidency;
exports.requestTimeout = requestTimeout;
/**
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const gaxios_1 = __turbopack_context__.r("[project]/node_modules/gaxios/build/cjs/src/index.js [app-route] (ecmascript)");
const jsonBigint = __turbopack_context__.r("[project]/node_modules/json-bigint/index.js [app-route] (ecmascript)");
const gcp_residency_1 = __turbopack_context__.r("[project]/node_modules/gcp-metadata/build/src/gcp-residency.js [app-route] (ecmascript)");
const logger = __importStar(__turbopack_context__.r("[project]/node_modules/google-logging-utils/build/src/index.js [app-route] (ecmascript)"));
exports.BASE_PATH = '/computeMetadata/v1';
exports.HOST_ADDRESS = 'http://169.254.169.254';
exports.SECONDARY_HOST_ADDRESS = 'http://metadata.google.internal.';
exports.HEADER_NAME = 'Metadata-Flavor';
exports.HEADER_VALUE = 'Google';
exports.HEADERS = Object.freeze({
    [exports.HEADER_NAME]: exports.HEADER_VALUE
});
const log = logger.log('gcp-metadata');
/**
 * Metadata server detection override options.
 *
 * Available via `process.env.METADATA_SERVER_DETECTION`.
 */ exports.METADATA_SERVER_DETECTION = Object.freeze({
    'assume-present': "don't try to ping the metadata server, but assume it's present",
    none: "don't try to ping the metadata server, but don't try to use it either",
    'bios-only': "treat the result of a BIOS probe as canonical (don't fall back to pinging)",
    'ping-only': 'skip the BIOS probe, and go straight to pinging'
});
/**
 * Returns the base URL while taking into account the GCE_METADATA_HOST
 * environment variable if it exists.
 *
 * @returns The base URL, e.g., http://169.254.169.254/computeMetadata/v1.
 */ function getBaseUrl(baseUrl) {
    if (!baseUrl) {
        baseUrl = process.env.GCE_METADATA_IP || process.env.GCE_METADATA_HOST || exports.HOST_ADDRESS;
    }
    // If no scheme is provided default to HTTP:
    if (!/^https?:\/\//.test(baseUrl)) {
        baseUrl = `http://${baseUrl}`;
    }
    return new URL(exports.BASE_PATH, baseUrl).href;
}
// Accepts an options object passed from the user to the API. In previous
// versions of the API, it referred to a `Request` or an `Axios` request
// options object.  Now it refers to an object with very limited property
// names. This is here to help ensure users don't pass invalid options when
// they  upgrade from 0.4 to 0.5 to 0.8.
function validate(options) {
    Object.keys(options).forEach((key)=>{
        switch(key){
            case 'params':
            case 'property':
            case 'headers':
                break;
            case 'qs':
                throw new Error("'qs' is not a valid configuration option. Please use 'params' instead.");
            default:
                throw new Error(`'${key}' is not a valid configuration option.`);
        }
    });
}
async function metadataAccessor(type, options = {}, noResponseRetries = 3, fastFail = false) {
    const headers = new Headers(exports.HEADERS);
    let metadataKey = '';
    let params = {};
    if (typeof type === 'object') {
        const metadataAccessor = type;
        new Headers(metadataAccessor.headers).forEach((value, key)=>headers.set(key, value));
        metadataKey = metadataAccessor.metadataKey;
        params = metadataAccessor.params || params;
        noResponseRetries = metadataAccessor.noResponseRetries || noResponseRetries;
        fastFail = metadataAccessor.fastFail || fastFail;
    } else {
        metadataKey = type;
    }
    if (typeof options === 'string') {
        metadataKey += `/${options}`;
    } else {
        validate(options);
        if (options.property) {
            metadataKey += `/${options.property}`;
        }
        new Headers(options.headers).forEach((value, key)=>headers.set(key, value));
        params = options.params || params;
    }
    const requestMethod = fastFail ? fastFailMetadataRequest : gaxios_1.request;
    const req = {
        url: `${getBaseUrl()}/${metadataKey}`,
        headers,
        retryConfig: {
            noResponseRetries
        },
        params,
        responseType: 'text',
        timeout: requestTimeout()
    };
    log.info('instance request %j', req);
    const res = await requestMethod(req);
    log.info('instance metadata is %s', res.data);
    const metadataFlavor = res.headers.get(exports.HEADER_NAME);
    if (metadataFlavor !== exports.HEADER_VALUE) {
        throw new RangeError(`Invalid response from metadata service: incorrect ${exports.HEADER_NAME} header. Expected '${exports.HEADER_VALUE}', got ${metadataFlavor ? `'${metadataFlavor}'` : 'no header'}`);
    }
    if (typeof res.data === 'string') {
        try {
            return jsonBigint.parse(res.data);
        } catch  {
        /* ignore */ }
    }
    return res.data;
}
async function fastFailMetadataRequest(options) {
    const secondaryOptions = {
        ...options,
        url: options.url?.toString().replace(getBaseUrl(), getBaseUrl(exports.SECONDARY_HOST_ADDRESS))
    };
    // We race a connection between DNS/IP to metadata server. There are a couple
    // reasons for this:
    //
    // 1. the DNS is slow in some GCP environments; by checking both, we might
    //    detect the runtime environment significantly faster.
    // 2. we can't just check the IP, which is tarpitted and slow to respond
    //    on a user's local machine.
    //
    // Returns first resolved promise or if all promises get rejected we return an AggregateError.
    //
    // Note, however, if a failure happens prior to a success, a rejection should
    // occur, this is for folks running locally.
    //
    const r1 = (0, gaxios_1.request)(options);
    const r2 = (0, gaxios_1.request)(secondaryOptions);
    return Promise.any([
        r1,
        r2
    ]);
}
/**
 * Obtain metadata for the current GCE instance.
 *
 * @see {@link https://cloud.google.com/compute/docs/metadata/predefined-metadata-keys}
 *
 * @example
 * ```
 * const serviceAccount: {} = await instance('service-accounts/');
 * const serviceAccountEmail: string = await instance('service-accounts/default/email');
 * ```
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function instance(options) {
    return metadataAccessor('instance', options);
}
/**
 * Obtain metadata for the current GCP project.
 *
 * @see {@link https://cloud.google.com/compute/docs/metadata/predefined-metadata-keys}
 *
 * @example
 * ```
 * const projectId: string = await project('project-id');
 * const numericProjectId: number = await project('numeric-project-id');
 * ```
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function project(options) {
    return metadataAccessor('project', options);
}
/**
 * Obtain metadata for the current universe.
 *
 * @see {@link https://cloud.google.com/compute/docs/metadata/predefined-metadata-keys}
 *
 * @example
 * ```
 * const universeDomain: string = await universe('universe-domain');
 * ```
 */ function universe(options) {
    return metadataAccessor('universe', options);
}
/**
 * Retrieve metadata items in parallel.
 *
 * @see {@link https://cloud.google.com/compute/docs/metadata/predefined-metadata-keys}
 *
 * @example
 * ```
 * const data = await bulk([
 *   {
 *     metadataKey: 'instance',
 *   },
 *   {
 *     metadataKey: 'project/project-id',
 *   },
 * ] as const);
 *
 * // data.instance;
 * // data['project/project-id'];
 * ```
 *
 * @param properties The metadata properties to retrieve
 * @returns The metadata in `metadatakey:value` format
 */ async function bulk(properties) {
    const r = {};
    await Promise.all(properties.map((item)=>{
        return (async ()=>{
            const res = await metadataAccessor(item);
            const key = item.metadataKey;
            r[key] = res;
        })();
    }));
    return r;
}
/*
 * How many times should we retry detecting GCP environment.
 */ function detectGCPAvailableRetries() {
    return process.env.DETECT_GCP_RETRIES ? Number(process.env.DETECT_GCP_RETRIES) : 0;
}
let cachedIsAvailableResponse;
/**
 * Determine if the metadata server is currently available.
 */ async function isAvailable() {
    if (process.env.METADATA_SERVER_DETECTION) {
        const value = process.env.METADATA_SERVER_DETECTION.trim().toLocaleLowerCase();
        if (!(value in exports.METADATA_SERVER_DETECTION)) {
            throw new RangeError(`Unknown \`METADATA_SERVER_DETECTION\` env variable. Got \`${value}\`, but it should be \`${Object.keys(exports.METADATA_SERVER_DETECTION).join('`, `')}\`, or unset`);
        }
        switch(value){
            case 'assume-present':
                return true;
            case 'none':
                return false;
            case 'bios-only':
                return getGCPResidency();
            case 'ping-only':
        }
    }
    try {
        // If a user is instantiating several GCP libraries at the same time,
        // this may result in multiple calls to isAvailable(), to detect the
        // runtime environment. We use the same promise for each of these calls
        // to reduce the network load.
        if (cachedIsAvailableResponse === undefined) {
            cachedIsAvailableResponse = metadataAccessor('instance', undefined, detectGCPAvailableRetries(), // If the default HOST_ADDRESS has been overridden, we should not
            // make an effort to try SECONDARY_HOST_ADDRESS (as we are likely in
            // a non-GCP environment):
            !(process.env.GCE_METADATA_IP || process.env.GCE_METADATA_HOST));
        }
        await cachedIsAvailableResponse;
        return true;
    } catch (e) {
        const err = e;
        if (process.env.DEBUG_AUTH) {
            console.info(err);
        }
        if (err.type === 'request-timeout') {
            // If running in a GCP environment, metadata endpoint should return
            // within ms.
            return false;
        }
        if (err.response && err.response.status === 404) {
            return false;
        } else {
            if (!(err.response && err.response.status === 404) && // A warning is emitted if we see an unexpected err.code, or err.code
            // is not populated:
            (!err.code || ![
                'EHOSTDOWN',
                'EHOSTUNREACH',
                'ENETUNREACH',
                'ENOENT',
                'ENOTFOUND',
                'ECONNREFUSED'
            ].includes(err.code.toString()))) {
                let code = 'UNKNOWN';
                if (err.code) code = err.code.toString();
                process.emitWarning(`received unexpected error = ${err.message} code = ${code}`, 'MetadataLookupWarning');
            }
            // Failure to resolve the metadata service means that it is not available.
            return false;
        }
    }
}
/**
 * reset the memoized isAvailable() lookup.
 */ function resetIsAvailableCache() {
    cachedIsAvailableResponse = undefined;
}
/**
 * A cache for the detected GCP Residency.
 */ exports.gcpResidencyCache = null;
/**
 * Detects GCP Residency.
 * Caches results to reduce costs for subsequent calls.
 *
 * @see setGCPResidency for setting
 */ function getGCPResidency() {
    if (exports.gcpResidencyCache === null) {
        setGCPResidency();
    }
    return exports.gcpResidencyCache;
}
/**
 * Sets the detected GCP Residency.
 * Useful for forcing metadata server detection behavior.
 *
 * Set `null` to autodetect the environment (default behavior).
 * @see getGCPResidency for getting
 */ function setGCPResidency(value = null) {
    exports.gcpResidencyCache = value !== null ? value : (0, gcp_residency_1.detectGCPResidency)();
}
/**
 * Obtain the timeout for requests to the metadata server.
 *
 * In certain environments and conditions requests can take longer than
 * the default timeout to complete. This function will determine the
 * appropriate timeout based on the environment.
 *
 * @returns {number} a request timeout duration in milliseconds.
 */ function requestTimeout() {
    return getGCPResidency() ? 0 : 3000;
}
__exportStar(__turbopack_context__.r("[project]/node_modules/gcp-metadata/build/src/gcp-residency.js [app-route] (ecmascript)"), exports);
}),
"[project]/node_modules/google-logging-utils/build/src/colours.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Colours = void 0;
/**
 * Handles figuring out if we can use ANSI colours and handing out the escape codes.
 *
 * This is for package-internal use only, and may change at any time.
 *
 * @private
 * @internal
 */ class Colours {
    /**
     * @param stream The stream (e.g. process.stderr)
     * @returns true if the stream should have colourization enabled
     */ static isEnabled(stream) {
        return stream && // May happen in browsers.
        stream.isTTY && (typeof stream.getColorDepth === 'function' ? stream.getColorDepth() > 2 : true);
    }
    static refresh() {
        Colours.enabled = Colours.isEnabled(process === null || process === void 0 ? void 0 : process.stderr);
        if (!this.enabled) {
            Colours.reset = '';
            Colours.bright = '';
            Colours.dim = '';
            Colours.red = '';
            Colours.green = '';
            Colours.yellow = '';
            Colours.blue = '';
            Colours.magenta = '';
            Colours.cyan = '';
            Colours.white = '';
            Colours.grey = '';
        } else {
            Colours.reset = '\u001b[0m';
            Colours.bright = '\u001b[1m';
            Colours.dim = '\u001b[2m';
            Colours.red = '\u001b[31m';
            Colours.green = '\u001b[32m';
            Colours.yellow = '\u001b[33m';
            Colours.blue = '\u001b[34m';
            Colours.magenta = '\u001b[35m';
            Colours.cyan = '\u001b[36m';
            Colours.white = '\u001b[37m';
            Colours.grey = '\u001b[90m';
        }
    }
}
exports.Colours = Colours;
Colours.enabled = false;
Colours.reset = '';
Colours.bright = '';
Colours.dim = '';
Colours.red = '';
Colours.green = '';
Colours.yellow = '';
Colours.blue = '';
Colours.magenta = '';
Colours.cyan = '';
Colours.white = '';
Colours.grey = '';
Colours.refresh();
}),
"[project]/node_modules/google-logging-utils/build/src/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
__exportStar(__turbopack_context__.r("[project]/node_modules/google-logging-utils/build/src/logging-utils.js [app-route] (ecmascript)"), exports);
}),
"[project]/node_modules/google-logging-utils/build/src/logging-utils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright 2021-2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function() {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o) {
            var ar = [];
            for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
            for(var k = ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
    };
}();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.env = exports.DebugLogBackendBase = exports.placeholder = exports.AdhocDebugLogger = exports.LogSeverity = void 0;
exports.getNodeBackend = getNodeBackend;
exports.getDebugBackend = getDebugBackend;
exports.getStructuredBackend = getStructuredBackend;
exports.setBackend = setBackend;
exports.log = log;
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const process = __importStar(__turbopack_context__.r("[externals]/process [external] (process, cjs)"));
const util = __importStar(__turbopack_context__.r("[externals]/util [external] (util, cjs)"));
const colours_1 = __turbopack_context__.r("[project]/node_modules/google-logging-utils/build/src/colours.js [app-route] (ecmascript)");
// Some functions (as noted) are based on the Node standard library, from
// the following file:
//
// https://github.com/nodejs/node/blob/main/lib/internal/util/debuglog.js
/**
 * This module defines an ad-hoc debug logger for Google Cloud Platform
 * client libraries in Node. An ad-hoc debug logger is a tool which lets
 * users use an external, unified interface (in this case, environment
 * variables) to determine what logging they want to see at runtime. This
 * isn't necessarily fed into the console, but is meant to be under the
 * control of the user. The kind of logging that will be produced by this
 * is more like "call retry happened", not "events you'd want to record
 * in Cloud Logger".
 *
 * More for Googlers implementing libraries with it:
 * go/cloud-client-logging-design
 */ /**
 * Possible log levels. These are a subset of Cloud Observability levels.
 * https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#LogSeverity
 */ var LogSeverity;
(function(LogSeverity) {
    LogSeverity["DEFAULT"] = "DEFAULT";
    LogSeverity["DEBUG"] = "DEBUG";
    LogSeverity["INFO"] = "INFO";
    LogSeverity["WARNING"] = "WARNING";
    LogSeverity["ERROR"] = "ERROR";
})(LogSeverity || (exports.LogSeverity = LogSeverity = {}));
/**
 * Our logger instance. This actually contains the meat of dealing
 * with log lines, including EventEmitter. This contains the function
 * that will be passed back to users of the package.
 */ class AdhocDebugLogger extends events_1.EventEmitter {
    /**
     * @param upstream The backend will pass a function that will be
     *   called whenever our logger function is invoked.
     */ constructor(namespace, upstream){
        super();
        this.namespace = namespace;
        this.upstream = upstream;
        this.func = Object.assign(this.invoke.bind(this), {
            // Also add an instance pointer back to us.
            instance: this,
            // And pull over the EventEmitter functionality.
            on: (event, listener)=>this.on(event, listener)
        });
        // Convenience methods for log levels.
        this.func.debug = (...args)=>this.invokeSeverity(LogSeverity.DEBUG, ...args);
        this.func.info = (...args)=>this.invokeSeverity(LogSeverity.INFO, ...args);
        this.func.warn = (...args)=>this.invokeSeverity(LogSeverity.WARNING, ...args);
        this.func.error = (...args)=>this.invokeSeverity(LogSeverity.ERROR, ...args);
        this.func.sublog = (namespace)=>log(namespace, this.func);
    }
    invoke(fields, ...args) {
        // Push out any upstream logger first.
        if (this.upstream) {
            try {
                this.upstream(fields, ...args);
            } catch (e) {
            // Swallow exceptions to avoid interfering with other logging.
            }
        }
        // Emit sink events.
        try {
            this.emit('log', fields, args);
        } catch (e) {
        // Swallow exceptions to avoid interfering with other logging.
        }
    }
    invokeSeverity(severity, ...args) {
        this.invoke({
            severity
        }, ...args);
    }
}
exports.AdhocDebugLogger = AdhocDebugLogger;
/**
 * This can be used in place of a real logger while waiting for Promises or disabling logging.
 */ exports.placeholder = new AdhocDebugLogger('', ()=>{}).func;
/**
 * The base class for debug logging backends. It's possible to use this, but the
 * same non-guarantees above still apply (unstable interface, etc).
 *
 * @private
 * @internal
 */ class DebugLogBackendBase {
    constructor(){
        var _a;
        this.cached = new Map();
        this.filters = [];
        this.filtersSet = false;
        // Look for the Node config variable for what systems to enable. We'll store
        // these for the log method below, which will call setFilters() once.
        let nodeFlag = (_a = process.env[exports.env.nodeEnables]) !== null && _a !== void 0 ? _a : '*';
        if (nodeFlag === 'all') {
            nodeFlag = '*';
        }
        this.filters = nodeFlag.split(',');
    }
    log(namespace, fields, ...args) {
        try {
            if (!this.filtersSet) {
                this.setFilters();
                this.filtersSet = true;
            }
            let logger = this.cached.get(namespace);
            if (!logger) {
                logger = this.makeLogger(namespace);
                this.cached.set(namespace, logger);
            }
            logger(fields, ...args);
        } catch (e) {
            // Silently ignore all errors; we don't want them to interfere with
            // the user's running app.
            // e;
            console.error(e);
        }
    }
}
exports.DebugLogBackendBase = DebugLogBackendBase;
// The basic backend. This one definitely works, but it's less feature-filled.
//
// Rather than using util.debuglog, this implements the same basic logic directly.
// The reason for this decision is that debuglog checks the value of the
// NODE_DEBUG environment variable before any user code runs; we therefore
// can't pipe our own enables into it (and util.debuglog will never print unless
// the user duplicates it into NODE_DEBUG, which isn't reasonable).
//
class NodeBackend extends DebugLogBackendBase {
    constructor(){
        super(...arguments);
        // Default to allowing all systems, since we gate earlier based on whether the
        // variable is empty.
        this.enabledRegexp = /.*/g;
    }
    isEnabled(namespace) {
        return this.enabledRegexp.test(namespace);
    }
    makeLogger(namespace) {
        if (!this.enabledRegexp.test(namespace)) {
            return ()=>{};
        }
        return (fields, ...args)=>{
            var _a;
            // TODO: `fields` needs to be turned into a string here, one way or another.
            const nscolour = `${colours_1.Colours.green}${namespace}${colours_1.Colours.reset}`;
            const pid = `${colours_1.Colours.yellow}${process.pid}${colours_1.Colours.reset}`;
            let level;
            switch(fields.severity){
                case LogSeverity.ERROR:
                    level = `${colours_1.Colours.red}${fields.severity}${colours_1.Colours.reset}`;
                    break;
                case LogSeverity.INFO:
                    level = `${colours_1.Colours.magenta}${fields.severity}${colours_1.Colours.reset}`;
                    break;
                case LogSeverity.WARNING:
                    level = `${colours_1.Colours.yellow}${fields.severity}${colours_1.Colours.reset}`;
                    break;
                default:
                    level = (_a = fields.severity) !== null && _a !== void 0 ? _a : LogSeverity.DEFAULT;
                    break;
            }
            const msg = util.formatWithOptions({
                colors: colours_1.Colours.enabled
            }, ...args);
            const filteredFields = Object.assign({}, fields);
            delete filteredFields.severity;
            const fieldsJson = Object.getOwnPropertyNames(filteredFields).length ? JSON.stringify(filteredFields) : '';
            const fieldsColour = fieldsJson ? `${colours_1.Colours.grey}${fieldsJson}${colours_1.Colours.reset}` : '';
            console.error('%s [%s|%s] %s%s', pid, nscolour, level, msg, fieldsJson ? ` ${fieldsColour}` : '');
        };
    }
    // Regexp patterns below are from here:
    // https://github.com/nodejs/node/blob/c0aebed4b3395bd65d54b18d1fd00f071002ac20/lib/internal/util/debuglog.js#L36
    setFilters() {
        const totalFilters = this.filters.join(',');
        const regexp = totalFilters.replace(/[|\\{}()[\]^$+?.]/g, '\\$&').replace(/\*/g, '.*').replace(/,/g, '$|^');
        this.enabledRegexp = new RegExp(`^${regexp}$`, 'i');
    }
}
/**
 * @returns A backend based on Node util.debuglog; this is the default.
 */ function getNodeBackend() {
    return new NodeBackend();
}
class DebugBackend extends DebugLogBackendBase {
    constructor(pkg){
        super();
        this.debugPkg = pkg;
    }
    makeLogger(namespace) {
        const debugLogger = this.debugPkg(namespace);
        return (fields, ...args)=>{
            // TODO: `fields` needs to be turned into a string here.
            debugLogger(args[0], ...args.slice(1));
        };
    }
    setFilters() {
        var _a;
        const existingFilters = (_a = process.env['NODE_DEBUG']) !== null && _a !== void 0 ? _a : '';
        process.env['NODE_DEBUG'] = `${existingFilters}${existingFilters ? ',' : ''}${this.filters.join(',')}`;
    }
}
/**
 * Creates a "debug" package backend. The user must call require('debug') and pass
 * the resulting object to this function.
 *
 * ```
 *  setBackend(getDebugBackend(require('debug')))
 * ```
 *
 * https://www.npmjs.com/package/debug
 *
 * Note: Google does not explicitly endorse or recommend this package; it's just
 * being provided as an option.
 *
 * @returns A backend based on the npm "debug" package.
 */ function getDebugBackend(debugPkg) {
    return new DebugBackend(debugPkg);
}
/**
 * This pretty much works like the Node logger, but it outputs structured
 * logging JSON matching Google Cloud's ingestion specs. Rather than handling
 * its own output, it wraps another backend. The passed backend must be a subclass
 * of `DebugLogBackendBase` (any of the backends exposed by this package will work).
 */ class StructuredBackend extends DebugLogBackendBase {
    constructor(upstream){
        var _a;
        super();
        this.upstream = (_a = upstream) !== null && _a !== void 0 ? _a : undefined;
    }
    makeLogger(namespace) {
        var _a;
        const debugLogger = (_a = this.upstream) === null || _a === void 0 ? void 0 : _a.makeLogger(namespace);
        return (fields, ...args)=>{
            var _a;
            const severity = (_a = fields.severity) !== null && _a !== void 0 ? _a : LogSeverity.INFO;
            const json = Object.assign({
                severity,
                message: util.format(...args)
            }, fields);
            const jsonString = JSON.stringify(json);
            if (debugLogger) {
                debugLogger(fields, jsonString);
            } else {
                console.log('%s', jsonString);
            }
        };
    }
    setFilters() {
        var _a;
        (_a = this.upstream) === null || _a === void 0 ? void 0 : _a.setFilters();
    }
}
/**
 * Creates a "structured logging" backend. This pretty much works like the
 * Node logger, but it outputs structured logging JSON matching Google
 * Cloud's ingestion specs instead of plain text.
 *
 * ```
 *  setBackend(getStructuredBackend())
 * ```
 *
 * @param upstream If you want to use something besides the Node backend to
 *   write the actual log lines into, pass that here.
 * @returns A backend based on Google Cloud structured logging.
 */ function getStructuredBackend(upstream) {
    return new StructuredBackend(upstream);
}
/**
 * The environment variables that we standardized on, for all ad-hoc logging.
 */ exports.env = {
    /**
     * Filter wildcards specific to the Node syntax, and similar to the built-in
     * utils.debuglog() environment variable. If missing, disables logging.
     */ nodeEnables: 'GOOGLE_SDK_NODE_LOGGING'
};
// Keep a copy of all namespaced loggers so users can reliably .on() them.
// Note that these cached functions will need to deal with changes in the backend.
const loggerCache = new Map();
// Our current global backend. This might be:
let cachedBackend = undefined;
/**
 * Set the backend to use for our log output.
 * - A backend object
 * - null to disable logging
 * - undefined for "nothing yet", defaults to the Node backend
 *
 * @param backend Results from one of the get*Backend() functions.
 */ function setBackend(backend) {
    cachedBackend = backend;
    loggerCache.clear();
}
/**
 * Creates a logging function. Multiple calls to this with the same namespace
 * will produce the same logger, with the same event emitter hooks.
 *
 * Namespaces can be a simple string ("system" name), or a qualified string
 * (system:subsystem), which can be used for filtering, or for "system:*".
 *
 * @param namespace The namespace, a descriptive text string.
 * @returns A function you can call that works similar to console.log().
 */ function log(namespace, parent) {
    // If the enable environment variable isn't set, do nothing. The user
    // can still choose to set a backend of their choice using the manual
    // `setBackend()`.
    if (!cachedBackend) {
        const enablesFlag = process.env[exports.env.nodeEnables];
        if (!enablesFlag) {
            return exports.placeholder;
        }
    }
    // This might happen mostly if the typings are dropped in a user's code,
    // or if they're calling from JavaScript.
    if (!namespace) {
        return exports.placeholder;
    }
    // Handle sub-loggers.
    if (parent) {
        namespace = `${parent.instance.namespace}:${namespace}`;
    }
    // Reuse loggers so things like event sinks are persistent.
    const existing = loggerCache.get(namespace);
    if (existing) {
        return existing.func;
    }
    // Do we have a backend yet?
    if (cachedBackend === null) {
        // Explicitly disabled.
        return exports.placeholder;
    } else if (cachedBackend === undefined) {
        // One hasn't been made yet, so default to Node.
        cachedBackend = getNodeBackend();
    }
    // The logger is further wrapped so we can handle the backend changing out.
    const logger = (()=>{
        let previousBackend = undefined;
        const newLogger = new AdhocDebugLogger(namespace, (fields, ...args)=>{
            if (previousBackend !== cachedBackend) {
                // Did the user pass a custom backend?
                if (cachedBackend === null) {
                    // Explicitly disabled.
                    return;
                } else if (cachedBackend === undefined) {
                    // One hasn't been made yet, so default to Node.
                    cachedBackend = getNodeBackend();
                }
                previousBackend = cachedBackend;
            }
            cachedBackend === null || cachedBackend === void 0 ? void 0 : cachedBackend.log(namespace, fields, ...args);
        });
        return newLogger;
    })();
    loggerCache.set(namespace, logger);
    return logger.func;
}
}),
"[project]/node_modules/json-bigint/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var json_stringify = __turbopack_context__.r("[project]/node_modules/json-bigint/lib/stringify.js [app-route] (ecmascript)").stringify;
var json_parse = __turbopack_context__.r("[project]/node_modules/json-bigint/lib/parse.js [app-route] (ecmascript)");
module.exports = function(options) {
    return {
        parse: json_parse(options),
        stringify: json_stringify
    };
};
//create the default method members with no options applied for backwards compatibility
module.exports.parse = json_parse();
module.exports.stringify = json_stringify;
}),
"[project]/node_modules/json-bigint/lib/parse.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var BigNumber = null;
// regexpxs extracted from
// (c) BSD-3-Clause
// https://github.com/fastify/secure-json-parse/graphs/contributors and https://github.com/hapijs/bourne/graphs/contributors
const suspectProtoRx = /(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])/;
const suspectConstructorRx = /(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)/;
/*
    json_parse.js
    2012-06-20

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    This file creates a json_parse function.
    During create you can (optionally) specify some behavioural switches

        require('json-bigint')(options)

            The optional options parameter holds switches that drive certain
            aspects of the parsing process:
            * options.strict = true will warn about duplicate-key usage in the json.
              The default (strict = false) will silently ignore those and overwrite
              values for keys that are in duplicate use.

    The resulting function follows this signature:
        json_parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = json_parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

    This is a reference implementation. You are free to copy, modify, or
    redistribute.

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/ /*members "", "\"", "\/", "\\", at, b, call, charAt, f, fromCharCode,
    hasOwnProperty, message, n, name, prototype, push, r, t, text
*/ var json_parse = function(options) {
    'use strict';
    // This is a function that can parse a JSON text, producing a JavaScript
    // data structure. It is a simple, recursive descent parser. It does not use
    // eval or regular expressions, so it can be used as a model for implementing
    // a JSON parser in other languages.
    // We are defining the function inside of another function to avoid creating
    // global variables.
    // Default options one can override by passing options to the parse()
    var _options = {
        strict: false,
        storeAsString: false,
        alwaysParseAsBig: false,
        useNativeBigInt: false,
        protoAction: 'error',
        constructorAction: 'error'
    };
    // If there are options, then use them to override the default _options
    if (options !== undefined && options !== null) {
        if (options.strict === true) {
            _options.strict = true;
        }
        if (options.storeAsString === true) {
            _options.storeAsString = true;
        }
        _options.alwaysParseAsBig = options.alwaysParseAsBig === true ? options.alwaysParseAsBig : false;
        _options.useNativeBigInt = options.useNativeBigInt === true ? options.useNativeBigInt : false;
        if (typeof options.constructorAction !== 'undefined') {
            if (options.constructorAction === 'error' || options.constructorAction === 'ignore' || options.constructorAction === 'preserve') {
                _options.constructorAction = options.constructorAction;
            } else {
                throw new Error(`Incorrect value for constructorAction option, must be "error", "ignore" or undefined but passed ${options.constructorAction}`);
            }
        }
        if (typeof options.protoAction !== 'undefined') {
            if (options.protoAction === 'error' || options.protoAction === 'ignore' || options.protoAction === 'preserve') {
                _options.protoAction = options.protoAction;
            } else {
                throw new Error(`Incorrect value for protoAction option, must be "error", "ignore" or undefined but passed ${options.protoAction}`);
            }
        }
    }
    var at, ch, escapee = {
        '"': '"',
        '\\': '\\',
        '/': '/',
        b: '\b',
        f: '\f',
        n: '\n',
        r: '\r',
        t: '\t'
    }, text, error = function(m) {
        // Call error when something is wrong.
        throw {
            name: 'SyntaxError',
            message: m,
            at: at,
            text: text
        };
    }, next = function(c) {
        // If a c parameter is provided, verify that it matches the current character.
        if (c && c !== ch) {
            error("Expected '" + c + "' instead of '" + ch + "'");
        }
        // Get the next character. When there are no more characters,
        // return the empty string.
        ch = text.charAt(at);
        at += 1;
        return ch;
    }, number = function() {
        // Parse a number value.
        var number, string = '';
        if (ch === '-') {
            string = '-';
            next('-');
        }
        while(ch >= '0' && ch <= '9'){
            string += ch;
            next();
        }
        if (ch === '.') {
            string += '.';
            while(next() && ch >= '0' && ch <= '9'){
                string += ch;
            }
        }
        if (ch === 'e' || ch === 'E') {
            string += ch;
            next();
            if (ch === '-' || ch === '+') {
                string += ch;
                next();
            }
            while(ch >= '0' && ch <= '9'){
                string += ch;
                next();
            }
        }
        number = +string;
        if (!isFinite(number)) {
            error('Bad number');
        } else {
            if (BigNumber == null) BigNumber = __turbopack_context__.r("[project]/node_modules/bignumber.js/bignumber.js [app-route] (ecmascript)");
            //if (number > 9007199254740992 || number < -9007199254740992)
            // Bignumber has stricter check: everything with length > 15 digits disallowed
            if (string.length > 15) return _options.storeAsString ? string : _options.useNativeBigInt ? BigInt(string) : new BigNumber(string);
            else return !_options.alwaysParseAsBig ? number : _options.useNativeBigInt ? BigInt(number) : new BigNumber(number);
        }
    }, string = function() {
        // Parse a string value.
        var hex, i, string = '', uffff;
        // When parsing for string values, we must look for " and \ characters.
        if (ch === '"') {
            var startAt = at;
            while(next()){
                if (ch === '"') {
                    if (at - 1 > startAt) string += text.substring(startAt, at - 1);
                    next();
                    return string;
                }
                if (ch === '\\') {
                    if (at - 1 > startAt) string += text.substring(startAt, at - 1);
                    next();
                    if (ch === 'u') {
                        uffff = 0;
                        for(i = 0; i < 4; i += 1){
                            hex = parseInt(next(), 16);
                            if (!isFinite(hex)) {
                                break;
                            }
                            uffff = uffff * 16 + hex;
                        }
                        string += String.fromCharCode(uffff);
                    } else if (typeof escapee[ch] === 'string') {
                        string += escapee[ch];
                    } else {
                        break;
                    }
                    startAt = at;
                }
            }
        }
        error('Bad string');
    }, white = function() {
        // Skip whitespace.
        while(ch && ch <= ' '){
            next();
        }
    }, word = function() {
        // true, false, or null.
        switch(ch){
            case 't':
                next('t');
                next('r');
                next('u');
                next('e');
                return true;
            case 'f':
                next('f');
                next('a');
                next('l');
                next('s');
                next('e');
                return false;
            case 'n':
                next('n');
                next('u');
                next('l');
                next('l');
                return null;
        }
        error("Unexpected '" + ch + "'");
    }, value, array = function() {
        // Parse an array value.
        var array = [];
        if (ch === '[') {
            next('[');
            white();
            if (ch === ']') {
                next(']');
                return array; // empty array
            }
            while(ch){
                array.push(value());
                white();
                if (ch === ']') {
                    next(']');
                    return array;
                }
                next(',');
                white();
            }
        }
        error('Bad array');
    }, object = function() {
        // Parse an object value.
        var key, object = Object.create(null);
        if (ch === '{') {
            next('{');
            white();
            if (ch === '}') {
                next('}');
                return object; // empty object
            }
            while(ch){
                key = string();
                white();
                next(':');
                if (_options.strict === true && Object.hasOwnProperty.call(object, key)) {
                    error('Duplicate key "' + key + '"');
                }
                if (suspectProtoRx.test(key) === true) {
                    if (_options.protoAction === 'error') {
                        error('Object contains forbidden prototype property');
                    } else if (_options.protoAction === 'ignore') {
                        value();
                    } else {
                        object[key] = value();
                    }
                } else if (suspectConstructorRx.test(key) === true) {
                    if (_options.constructorAction === 'error') {
                        error('Object contains forbidden constructor property');
                    } else if (_options.constructorAction === 'ignore') {
                        value();
                    } else {
                        object[key] = value();
                    }
                } else {
                    object[key] = value();
                }
                white();
                if (ch === '}') {
                    next('}');
                    return object;
                }
                next(',');
                white();
            }
        }
        error('Bad object');
    };
    value = function() {
        // Parse a JSON value. It could be an object, an array, a string, a number,
        // or a word.
        white();
        switch(ch){
            case '{':
                return object();
            case '[':
                return array();
            case '"':
                return string();
            case '-':
                return number();
            default:
                return ch >= '0' && ch <= '9' ? number() : word();
        }
    };
    // Return the json_parse function. It will have access to all of the above
    // functions and variables.
    return function(source, reviver) {
        var result;
        text = source + '';
        at = 0;
        ch = ' ';
        result = value();
        white();
        if (ch) {
            error('Syntax error');
        }
        // If there is a reviver function, we recursively walk the new structure,
        // passing each name/value pair to the reviver function for possible
        // transformation, starting with a temporary root object that holds the result
        // in an empty key. If there is not a reviver function, we simply return the
        // result.
        return typeof reviver === 'function' ? function walk(holder, key) {
            var k, v, value = holder[key];
            if (value && typeof value === 'object') {
                Object.keys(value).forEach(function(k) {
                    v = walk(value, k);
                    if (v !== undefined) {
                        value[k] = v;
                    } else {
                        delete value[k];
                    }
                });
            }
            return reviver.call(holder, key, value);
        }({
            '': result
        }, '') : result;
    };
};
module.exports = json_parse;
}),
"[project]/node_modules/json-bigint/lib/stringify.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var BigNumber = __turbopack_context__.r("[project]/node_modules/bignumber.js/bignumber.js [app-route] (ecmascript)");
/*
    json2.js
    2013-05-26

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/ /*jslint evil: true, regexp: true */ /*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/ // Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.
var JSON = module.exports;
(function() {
    'use strict';
    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
    }, rep;
    function quote(string) {
        // If the string contains no control characters, no quote characters, and no
        // backslash characters, then we can safely slap some quotes around it.
        // Otherwise we must also replace the offending characters with safe escape
        // sequences.
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }
    function str(key, holder) {
        // Produce a string from holder[key].
        var i, k, v, length, mind = gap, partial, value = holder[key], isBigNumber = value != null && (value instanceof BigNumber || BigNumber.isBigNumber(value));
        // If the value has a toJSON method, call it to obtain a replacement value.
        if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }
        // If we were called with a replacer function, then call the replacer to
        // obtain a replacement value.
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }
        // What happens next depends on the value's type.
        switch(typeof value){
            case 'string':
                if (isBigNumber) {
                    return value;
                } else {
                    return quote(value);
                }
            case 'number':
                // JSON numbers must be finite. Encode non-finite numbers as null.
                return isFinite(value) ? String(value) : 'null';
            case 'boolean':
            case 'null':
            case 'bigint':
                // If the value is a boolean or null, convert it to a string. Note:
                // typeof null does not produce 'null'. The case is included here in
                // the remote chance that this gets fixed someday.
                return String(value);
            // If the type is 'object', we might be dealing with an object or an array or
            // null.
            case 'object':
                // Due to a specification blunder in ECMAScript, typeof null is 'object',
                // so watch out for that case.
                if (!value) {
                    return 'null';
                }
                // Make an array to hold the partial results of stringifying this object value.
                gap += indent;
                partial = [];
                // Is the value an array?
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    // The value is an array. Stringify every element. Use null as a placeholder
                    // for non-JSON values.
                    length = value.length;
                    for(i = 0; i < length; i += 1){
                        partial[i] = str(i, value) || 'null';
                    }
                    // Join all of the elements together, separated with commas, and wrap them in
                    // brackets.
                    v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }
                // If the replacer is an array, use it to select the members to be stringified.
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for(i = 0; i < length; i += 1){
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {
                    // Otherwise, iterate through all of the keys in the object.
                    Object.keys(value).forEach(function(k) {
                        var v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    });
                }
                // Join all of the member texts together, separated with commas,
                // and wrap them in braces.
                v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }
    // If the JSON object does not yet have a stringify method, give it one.
    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function(value, replacer, space) {
            // The stringify method takes a value and an optional replacer, and an optional
            // space parameter, and returns a JSON text. The replacer can be a function
            // that can replace values, or an array of strings that will select the keys.
            // A default replacer method can be provided. Use of the space parameter can
            // produce text that is more easily readable.
            var i;
            gap = '';
            indent = '';
            // If the space parameter is a number, make an indent string containing that
            // many spaces.
            if (typeof space === 'number') {
                for(i = 0; i < space; i += 1){
                    indent += ' ';
                }
            // If the space parameter is a string, it will be used as the indent string.
            } else if (typeof space === 'string') {
                indent = space;
            }
            // If there is a replacer, it must be a function or an array.
            // Otherwise, throw an error.
            rep = replacer;
            if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            // Make a fake root object containing our value under the key of ''.
            // Return the result of stringifying the value.
            return str('', {
                '': value
            });
        };
    }
})();
}),
"[project]/node_modules/jwa/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var Buffer = __turbopack_context__.r("[project]/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
var formatEcdsa = __turbopack_context__.r("[project]/node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js [app-route] (ecmascript)");
var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
var MSG_INVALID_ALGORITHM = '"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".';
var MSG_INVALID_SECRET = 'secret must be a string or buffer';
var MSG_INVALID_VERIFIER_KEY = 'key must be a string or a buffer';
var MSG_INVALID_SIGNER_KEY = 'key must be a string, a buffer or an object';
var supportsKeyObjects = typeof crypto.createPublicKey === 'function';
if (supportsKeyObjects) {
    MSG_INVALID_VERIFIER_KEY += ' or a KeyObject';
    MSG_INVALID_SECRET += 'or a KeyObject';
}
function checkIsPublicKey(key) {
    if (Buffer.isBuffer(key)) {
        return;
    }
    if (typeof key === 'string') {
        return;
    }
    if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
    }
    if (typeof key !== 'object') {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
    }
    if (typeof key.type !== 'string') {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
    }
    if (typeof key.asymmetricKeyType !== 'string') {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
    }
    if (typeof key.export !== 'function') {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
    }
}
;
function checkIsPrivateKey(key) {
    if (Buffer.isBuffer(key)) {
        return;
    }
    if (typeof key === 'string') {
        return;
    }
    if (typeof key === 'object') {
        return;
    }
    throw typeError(MSG_INVALID_SIGNER_KEY);
}
;
function checkIsSecretKey(key) {
    if (Buffer.isBuffer(key)) {
        return;
    }
    if (typeof key === 'string') {
        return key;
    }
    if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_SECRET);
    }
    if (typeof key !== 'object') {
        throw typeError(MSG_INVALID_SECRET);
    }
    if (key.type !== 'secret') {
        throw typeError(MSG_INVALID_SECRET);
    }
    if (typeof key.export !== 'function') {
        throw typeError(MSG_INVALID_SECRET);
    }
}
function fromBase64(base64) {
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
function toBase64(base64url) {
    base64url = base64url.toString();
    var padding = 4 - base64url.length % 4;
    if (padding !== 4) {
        for(var i = 0; i < padding; ++i){
            base64url += '=';
        }
    }
    return base64url.replace(/\-/g, '+').replace(/_/g, '/');
}
function typeError(template) {
    var args = [].slice.call(arguments, 1);
    var errMsg = util.format.bind(util, template).apply(null, args);
    return new TypeError(errMsg);
}
function bufferOrString(obj) {
    return Buffer.isBuffer(obj) || typeof obj === 'string';
}
function normalizeInput(thing) {
    if (!bufferOrString(thing)) thing = JSON.stringify(thing);
    return thing;
}
function createHmacSigner(bits) {
    return function sign(thing, secret) {
        checkIsSecretKey(secret);
        thing = normalizeInput(thing);
        var hmac = crypto.createHmac('sha' + bits, secret);
        var sig = (hmac.update(thing), hmac.digest('base64'));
        return fromBase64(sig);
    };
}
var bufferEqual;
var timingSafeEqual = 'timingSafeEqual' in crypto ? function timingSafeEqual(a, b) {
    if (a.byteLength !== b.byteLength) {
        return false;
    }
    return crypto.timingSafeEqual(a, b);
} : function timingSafeEqual(a, b) {
    if (!bufferEqual) {
        bufferEqual = __turbopack_context__.r("[project]/node_modules/buffer-equal-constant-time/index.js [app-route] (ecmascript)");
    }
    return bufferEqual(a, b);
};
function createHmacVerifier(bits) {
    return function verify(thing, signature, secret) {
        var computedSig = createHmacSigner(bits)(thing, secret);
        return timingSafeEqual(Buffer.from(signature), Buffer.from(computedSig));
    };
}
function createKeySigner(bits) {
    return function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        // Even though we are specifying "RSA" here, this works with ECDSA
        // keys as well.
        var signer = crypto.createSign('RSA-SHA' + bits);
        var sig = (signer.update(thing), signer.sign(privateKey, 'base64'));
        return fromBase64(sig);
    };
}
function createKeyVerifier(bits) {
    return function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto.createVerify('RSA-SHA' + bits);
        verifier.update(thing);
        return verifier.verify(publicKey, signature, 'base64');
    };
}
function createPSSKeySigner(bits) {
    return function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        var signer = crypto.createSign('RSA-SHA' + bits);
        var sig = (signer.update(thing), signer.sign({
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
            saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
        }, 'base64'));
        return fromBase64(sig);
    };
}
function createPSSKeyVerifier(bits) {
    return function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto.createVerify('RSA-SHA' + bits);
        verifier.update(thing);
        return verifier.verify({
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
            saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
        }, signature, 'base64');
    };
}
function createECDSASigner(bits) {
    var inner = createKeySigner(bits);
    return function sign() {
        var signature = inner.apply(null, arguments);
        signature = formatEcdsa.derToJose(signature, 'ES' + bits);
        return signature;
    };
}
function createECDSAVerifer(bits) {
    var inner = createKeyVerifier(bits);
    return function verify(thing, signature, publicKey) {
        signature = formatEcdsa.joseToDer(signature, 'ES' + bits).toString('base64');
        var result = inner(thing, signature, publicKey);
        return result;
    };
}
function createNoneSigner() {
    return function sign() {
        return '';
    };
}
function createNoneVerifier() {
    return function verify(thing, signature) {
        return signature === '';
    };
}
module.exports = function jwa(algorithm) {
    var signerFactories = {
        hs: createHmacSigner,
        rs: createKeySigner,
        ps: createPSSKeySigner,
        es: createECDSASigner,
        none: createNoneSigner
    };
    var verifierFactories = {
        hs: createHmacVerifier,
        rs: createKeyVerifier,
        ps: createPSSKeyVerifier,
        es: createECDSAVerifer,
        none: createNoneVerifier
    };
    var match = algorithm.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/);
    if (!match) throw typeError(MSG_INVALID_ALGORITHM, algorithm);
    var algo = (match[1] || match[3]).toLowerCase();
    var bits = match[2];
    return {
        sign: signerFactories[algo](bits),
        verify: verifierFactories[algo](bits)
    };
};
}),
"[project]/node_modules/jws/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*global exports*/ var SignStream = __turbopack_context__.r("[project]/node_modules/jws/lib/sign-stream.js [app-route] (ecmascript)");
var VerifyStream = __turbopack_context__.r("[project]/node_modules/jws/lib/verify-stream.js [app-route] (ecmascript)");
var ALGORITHMS = [
    'HS256',
    'HS384',
    'HS512',
    'RS256',
    'RS384',
    'RS512',
    'PS256',
    'PS384',
    'PS512',
    'ES256',
    'ES384',
    'ES512'
];
exports.ALGORITHMS = ALGORITHMS;
exports.sign = SignStream.sign;
exports.verify = VerifyStream.verify;
exports.decode = VerifyStream.decode;
exports.isValid = VerifyStream.isValid;
exports.createSign = function createSign(opts) {
    return new SignStream(opts);
};
exports.createVerify = function createVerify(opts) {
    return new VerifyStream(opts);
};
}),
"[project]/node_modules/jws/lib/data-stream.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*global module, process*/ var Buffer = __turbopack_context__.r("[project]/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
function DataStream(data) {
    this.buffer = null;
    this.writable = true;
    this.readable = true;
    // No input
    if (!data) {
        this.buffer = Buffer.alloc(0);
        return this;
    }
    // Stream
    if (typeof data.pipe === 'function') {
        this.buffer = Buffer.alloc(0);
        data.pipe(this);
        return this;
    }
    // Buffer or String
    // or Object (assumedly a passworded key)
    if (data.length || typeof data === 'object') {
        this.buffer = data;
        this.writable = false;
        process.nextTick((function() {
            this.emit('end', data);
            this.readable = false;
            this.emit('close');
        }).bind(this));
        return this;
    }
    throw new TypeError('Unexpected data type (' + typeof data + ')');
}
util.inherits(DataStream, Stream);
DataStream.prototype.write = function write(data) {
    this.buffer = Buffer.concat([
        this.buffer,
        Buffer.from(data)
    ]);
    this.emit('data', data);
};
DataStream.prototype.end = function end(data) {
    if (data) this.write(data);
    this.emit('end', data);
    this.emit('close');
    this.writable = false;
    this.readable = false;
};
module.exports = DataStream;
}),
"[project]/node_modules/jws/lib/sign-stream.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*global module*/ var Buffer = __turbopack_context__.r("[project]/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var DataStream = __turbopack_context__.r("[project]/node_modules/jws/lib/data-stream.js [app-route] (ecmascript)");
var jwa = __turbopack_context__.r("[project]/node_modules/jwa/index.js [app-route] (ecmascript)");
var Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
var toString = __turbopack_context__.r("[project]/node_modules/jws/lib/tostring.js [app-route] (ecmascript)");
var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
function base64url(string, encoding) {
    return Buffer.from(string, encoding).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
function jwsSecuredInput(header, payload, encoding) {
    encoding = encoding || 'utf8';
    var encodedHeader = base64url(toString(header), 'binary');
    var encodedPayload = base64url(toString(payload), encoding);
    return util.format('%s.%s', encodedHeader, encodedPayload);
}
function jwsSign(opts) {
    var header = opts.header;
    var payload = opts.payload;
    var secretOrKey = opts.secret || opts.privateKey;
    var encoding = opts.encoding;
    var algo = jwa(header.alg);
    var securedInput = jwsSecuredInput(header, payload, encoding);
    var signature = algo.sign(securedInput, secretOrKey);
    return util.format('%s.%s', securedInput, signature);
}
function SignStream(opts) {
    var secret = opts.secret;
    secret = secret == null ? opts.privateKey : secret;
    secret = secret == null ? opts.key : secret;
    if (/^hs/i.test(opts.header.alg) === true && secret == null) {
        throw new TypeError('secret must be a string or buffer or a KeyObject');
    }
    var secretStream = new DataStream(secret);
    this.readable = true;
    this.header = opts.header;
    this.encoding = opts.encoding;
    this.secret = this.privateKey = this.key = secretStream;
    this.payload = new DataStream(opts.payload);
    this.secret.once('close', (function() {
        if (!this.payload.writable && this.readable) this.sign();
    }).bind(this));
    this.payload.once('close', (function() {
        if (!this.secret.writable && this.readable) this.sign();
    }).bind(this));
}
util.inherits(SignStream, Stream);
SignStream.prototype.sign = function sign() {
    try {
        var signature = jwsSign({
            header: this.header,
            payload: this.payload.buffer,
            secret: this.secret.buffer,
            encoding: this.encoding
        });
        this.emit('done', signature);
        this.emit('data', signature);
        this.emit('end');
        this.readable = false;
        return signature;
    } catch (e) {
        this.readable = false;
        this.emit('error', e);
        this.emit('close');
    }
};
SignStream.sign = jwsSign;
module.exports = SignStream;
}),
"[project]/node_modules/jws/lib/tostring.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*global module*/ var Buffer = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)").Buffer;
module.exports = function toString(obj) {
    if (typeof obj === 'string') return obj;
    if (typeof obj === 'number' || Buffer.isBuffer(obj)) return obj.toString();
    return JSON.stringify(obj);
};
}),
"[project]/node_modules/jws/lib/verify-stream.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*global module*/ var Buffer = __turbopack_context__.r("[project]/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var DataStream = __turbopack_context__.r("[project]/node_modules/jws/lib/data-stream.js [app-route] (ecmascript)");
var jwa = __turbopack_context__.r("[project]/node_modules/jwa/index.js [app-route] (ecmascript)");
var Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
var toString = __turbopack_context__.r("[project]/node_modules/jws/lib/tostring.js [app-route] (ecmascript)");
var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
var JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
function isObject(thing) {
    return Object.prototype.toString.call(thing) === '[object Object]';
}
function safeJsonParse(thing) {
    if (isObject(thing)) return thing;
    try {
        return JSON.parse(thing);
    } catch (e) {
        return undefined;
    }
}
function headerFromJWS(jwsSig) {
    var encodedHeader = jwsSig.split('.', 1)[0];
    return safeJsonParse(Buffer.from(encodedHeader, 'base64').toString('binary'));
}
function securedInputFromJWS(jwsSig) {
    return jwsSig.split('.', 2).join('.');
}
function signatureFromJWS(jwsSig) {
    return jwsSig.split('.')[2];
}
function payloadFromJWS(jwsSig, encoding) {
    encoding = encoding || 'utf8';
    var payload = jwsSig.split('.')[1];
    return Buffer.from(payload, 'base64').toString(encoding);
}
function isValidJws(string) {
    return JWS_REGEX.test(string) && !!headerFromJWS(string);
}
function jwsVerify(jwsSig, algorithm, secretOrKey) {
    if (!algorithm) {
        var err = new Error("Missing algorithm parameter for jws.verify");
        err.code = "MISSING_ALGORITHM";
        throw err;
    }
    jwsSig = toString(jwsSig);
    var signature = signatureFromJWS(jwsSig);
    var securedInput = securedInputFromJWS(jwsSig);
    var algo = jwa(algorithm);
    return algo.verify(securedInput, signature, secretOrKey);
}
function jwsDecode(jwsSig, opts) {
    opts = opts || {};
    jwsSig = toString(jwsSig);
    if (!isValidJws(jwsSig)) return null;
    var header = headerFromJWS(jwsSig);
    if (!header) return null;
    var payload = payloadFromJWS(jwsSig);
    if (header.typ === 'JWT' || opts.json) payload = JSON.parse(payload, opts.encoding);
    return {
        header: header,
        payload: payload,
        signature: signatureFromJWS(jwsSig)
    };
}
function VerifyStream(opts) {
    opts = opts || {};
    var secretOrKey = opts.secret;
    secretOrKey = secretOrKey == null ? opts.publicKey : secretOrKey;
    secretOrKey = secretOrKey == null ? opts.key : secretOrKey;
    if (/^hs/i.test(opts.algorithm) === true && secretOrKey == null) {
        throw new TypeError('secret must be a string or buffer or a KeyObject');
    }
    var secretStream = new DataStream(secretOrKey);
    this.readable = true;
    this.algorithm = opts.algorithm;
    this.encoding = opts.encoding;
    this.secret = this.publicKey = this.key = secretStream;
    this.signature = new DataStream(opts.signature);
    this.secret.once('close', (function() {
        if (!this.signature.writable && this.readable) this.verify();
    }).bind(this));
    this.signature.once('close', (function() {
        if (!this.secret.writable && this.readable) this.verify();
    }).bind(this));
}
util.inherits(VerifyStream, Stream);
VerifyStream.prototype.verify = function verify() {
    try {
        var valid = jwsVerify(this.signature.buffer, this.algorithm, this.key.buffer);
        var obj = jwsDecode(this.signature.buffer, this.encoding);
        this.emit('done', valid, obj);
        this.emit('data', valid);
        this.emit('end');
        this.readable = false;
        return valid;
    } catch (e) {
        this.readable = false;
        this.emit('error', e);
        this.emit('close');
    }
};
VerifyStream.decode = jwsDecode;
VerifyStream.isValid = isValidJws;
VerifyStream.verify = jwsVerify;
module.exports = VerifyStream;
}),
"[project]/node_modules/p-retry/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const retry = __turbopack_context__.r("[project]/node_modules/p-retry/node_modules/retry/index.js [app-route] (ecmascript)");
const networkErrorMsgs = [
    'Failed to fetch',
    'NetworkError when attempting to fetch resource.',
    'The Internet connection appears to be offline.',
    'Network request failed' // `cross-fetch`
];
class AbortError extends Error {
    constructor(message){
        super();
        if (message instanceof Error) {
            this.originalError = message;
            ({ message } = message);
        } else {
            this.originalError = new Error(message);
            this.originalError.stack = this.stack;
        }
        this.name = 'AbortError';
        this.message = message;
    }
}
const decorateErrorWithCounts = (error, attemptNumber, options)=>{
    // Minus 1 from attemptNumber because the first attempt does not count as a retry
    const retriesLeft = options.retries - (attemptNumber - 1);
    error.attemptNumber = attemptNumber;
    error.retriesLeft = retriesLeft;
    return error;
};
const isNetworkError = (errorMessage)=>networkErrorMsgs.includes(errorMessage);
const pRetry = (input, options)=>new Promise((resolve, reject)=>{
        options = {
            onFailedAttempt: ()=>{},
            retries: 10,
            ...options
        };
        const operation = retry.operation(options);
        operation.attempt(async (attemptNumber)=>{
            try {
                resolve(await input(attemptNumber));
            } catch (error) {
                if (!(error instanceof Error)) {
                    reject(new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`));
                    return;
                }
                if (error instanceof AbortError) {
                    operation.stop();
                    reject(error.originalError);
                } else if (error instanceof TypeError && !isNetworkError(error.message)) {
                    operation.stop();
                    reject(error);
                } else {
                    decorateErrorWithCounts(error, attemptNumber, options);
                    try {
                        await options.onFailedAttempt(error);
                    } catch (error) {
                        reject(error);
                        return;
                    }
                    if (!operation.retry(error)) {
                        reject(operation.mainError());
                    }
                }
            }
        });
    });
module.exports = pRetry;
// TODO: remove this in the next major version
module.exports.default = pRetry;
module.exports.AbortError = AbortError;
}),
"[project]/node_modules/p-retry/node_modules/retry/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/p-retry/node_modules/retry/lib/retry.js [app-route] (ecmascript)");
}),
"[project]/node_modules/p-retry/node_modules/retry/lib/retry.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var RetryOperation = __turbopack_context__.r("[project]/node_modules/p-retry/node_modules/retry/lib/retry_operation.js [app-route] (ecmascript)");
exports.operation = function(options) {
    var timeouts = exports.timeouts(options);
    return new RetryOperation(timeouts, {
        forever: options && (options.forever || options.retries === Infinity),
        unref: options && options.unref,
        maxRetryTime: options && options.maxRetryTime
    });
};
exports.timeouts = function(options) {
    if (options instanceof Array) {
        return [].concat(options);
    }
    var opts = {
        retries: 10,
        factor: 2,
        minTimeout: 1 * 1000,
        maxTimeout: Infinity,
        randomize: false
    };
    for(var key in options){
        opts[key] = options[key];
    }
    if (opts.minTimeout > opts.maxTimeout) {
        throw new Error('minTimeout is greater than maxTimeout');
    }
    var timeouts = [];
    for(var i = 0; i < opts.retries; i++){
        timeouts.push(this.createTimeout(i, opts));
    }
    if (options && options.forever && !timeouts.length) {
        timeouts.push(this.createTimeout(i, opts));
    }
    // sort the array numerically ascending
    timeouts.sort(function(a, b) {
        return a - b;
    });
    return timeouts;
};
exports.createTimeout = function(attempt, opts) {
    var random = opts.randomize ? Math.random() + 1 : 1;
    var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
    timeout = Math.min(timeout, opts.maxTimeout);
    return timeout;
};
exports.wrap = function(obj, options, methods) {
    if (options instanceof Array) {
        methods = options;
        options = null;
    }
    if (!methods) {
        methods = [];
        for(var key in obj){
            if (typeof obj[key] === 'function') {
                methods.push(key);
            }
        }
    }
    for(var i = 0; i < methods.length; i++){
        var method = methods[i];
        var original = obj[method];
        obj[method] = (function retryWrapper(original) {
            var op = exports.operation(options);
            var args = Array.prototype.slice.call(arguments, 1);
            var callback = args.pop();
            args.push(function(err) {
                if (op.retry(err)) {
                    return;
                }
                if (err) {
                    arguments[0] = op.mainError();
                }
                callback.apply(this, arguments);
            });
            op.attempt(function() {
                original.apply(obj, args);
            });
        }).bind(obj, original);
        obj[method].options = options;
    }
};
}),
"[project]/node_modules/p-retry/node_modules/retry/lib/retry_operation.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

function RetryOperation(timeouts, options) {
    // Compatibility for the old (timeouts, retryForever) signature
    if (typeof options === 'boolean') {
        options = {
            forever: options
        };
    }
    this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
    this._timeouts = timeouts;
    this._options = options || {};
    this._maxRetryTime = options && options.maxRetryTime || Infinity;
    this._fn = null;
    this._errors = [];
    this._attempts = 1;
    this._operationTimeout = null;
    this._operationTimeoutCb = null;
    this._timeout = null;
    this._operationStart = null;
    this._timer = null;
    if (this._options.forever) {
        this._cachedTimeouts = this._timeouts.slice(0);
    }
}
module.exports = RetryOperation;
RetryOperation.prototype.reset = function() {
    this._attempts = 1;
    this._timeouts = this._originalTimeouts.slice(0);
};
RetryOperation.prototype.stop = function() {
    if (this._timeout) {
        clearTimeout(this._timeout);
    }
    if (this._timer) {
        clearTimeout(this._timer);
    }
    this._timeouts = [];
    this._cachedTimeouts = null;
};
RetryOperation.prototype.retry = function(err) {
    if (this._timeout) {
        clearTimeout(this._timeout);
    }
    if (!err) {
        return false;
    }
    var currentTime = new Date().getTime();
    if (err && currentTime - this._operationStart >= this._maxRetryTime) {
        this._errors.push(err);
        this._errors.unshift(new Error('RetryOperation timeout occurred'));
        return false;
    }
    this._errors.push(err);
    var timeout = this._timeouts.shift();
    if (timeout === undefined) {
        if (this._cachedTimeouts) {
            // retry forever, only keep last error
            this._errors.splice(0, this._errors.length - 1);
            timeout = this._cachedTimeouts.slice(-1);
        } else {
            return false;
        }
    }
    var self = this;
    this._timer = setTimeout(function() {
        self._attempts++;
        if (self._operationTimeoutCb) {
            self._timeout = setTimeout(function() {
                self._operationTimeoutCb(self._attempts);
            }, self._operationTimeout);
            if (self._options.unref) {
                self._timeout.unref();
            }
        }
        self._fn(self._attempts);
    }, timeout);
    if (this._options.unref) {
        this._timer.unref();
    }
    return true;
};
RetryOperation.prototype.attempt = function(fn, timeoutOps) {
    this._fn = fn;
    if (timeoutOps) {
        if (timeoutOps.timeout) {
            this._operationTimeout = timeoutOps.timeout;
        }
        if (timeoutOps.cb) {
            this._operationTimeoutCb = timeoutOps.cb;
        }
    }
    var self = this;
    if (this._operationTimeoutCb) {
        this._timeout = setTimeout(function() {
            self._operationTimeoutCb();
        }, self._operationTimeout);
    }
    this._operationStart = new Date().getTime();
    this._fn(this._attempts);
};
RetryOperation.prototype.try = function(fn) {
    console.log('Using RetryOperation.try() is deprecated');
    this.attempt(fn);
};
RetryOperation.prototype.start = function(fn) {
    console.log('Using RetryOperation.start() is deprecated');
    this.attempt(fn);
};
RetryOperation.prototype.start = RetryOperation.prototype.try;
RetryOperation.prototype.errors = function() {
    return this._errors;
};
RetryOperation.prototype.attempts = function() {
    return this._attempts;
};
RetryOperation.prototype.mainError = function() {
    if (this._errors.length === 0) {
        return null;
    }
    var counts = {};
    var mainError = null;
    var mainErrorCount = 0;
    for(var i = 0; i < this._errors.length; i++){
        var error = this._errors[i];
        var message = error.message;
        var count = (counts[message] || 0) + 1;
        counts[message] = count;
        if (count >= mainErrorCount) {
            mainError = error;
            mainErrorCount = count;
        }
    }
    return mainError;
};
}),
"[project]/node_modules/pg-cursor/esm/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// ESM wrapper for pg-cursor
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pg$2d$cursor$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pg-cursor/index.js [app-route] (ecmascript)");
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pg$2d$cursor$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/node_modules/pg-cursor/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// note: can remove these deep requires when we bump min version of pg to 9.x
const Result = __turbopack_context__.r("[externals]/pg/lib/result.js [external] (pg/lib/result.js, cjs, [project]/node_modules/pg)");
const prepare = __turbopack_context__.r("[externals]/pg/lib/utils.js [external] (pg/lib/utils.js, cjs, [project]/node_modules/pg)").prepareValue;
const EventEmitter = __turbopack_context__.r("[externals]/events [external] (events, cjs)").EventEmitter;
const util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
let nextUniqueID = 1 // concept borrowed from org.postgresql.core.v3.QueryExecutorImpl
;
class Cursor extends EventEmitter {
    constructor(text, values, config){
        super();
        this._conf = config || {};
        this.text = text;
        this.values = values ? values.map(prepare) : null;
        this.connection = null;
        this._queue = [];
        this.state = 'initialized';
        this._result = new Result(this._conf.rowMode, this._conf.types);
        this._Promise = this._conf.Promise || /*TURBOPACK member replacement*/ __turbopack_context__.g.Promise;
        this._cb = null;
        this._rows = null;
        this._portal = null;
        this._ifNoData = this._ifNoData.bind(this);
        this._rowDescription = this._rowDescription.bind(this);
    }
    _ifNoData() {
        this.state = 'idle';
        this._shiftQueue();
        if (this.connection) {
            this.connection.removeListener('rowDescription', this._rowDescription);
        }
    }
    _rowDescription() {
        if (this.connection) {
            this.connection.removeListener('noData', this._ifNoData);
        }
    }
    submit(connection) {
        this.state = 'submitted';
        this.connection = connection;
        this._portal = 'C_' + nextUniqueID++;
        const con = connection;
        con.parse({
            text: this.text
        }, true);
        con.bind({
            portal: this._portal,
            values: this.values
        }, true);
        con.describe({
            type: 'P',
            name: this._portal
        }, true);
        con.flush();
        if (this._conf.types) {
            this._result._getTypeParser = this._conf.types.getTypeParser;
        }
        con.once('noData', this._ifNoData);
        con.once('rowDescription', this._rowDescription);
    }
    _shiftQueue() {
        if (this._queue.length) {
            this._getRows.apply(this, this._queue.shift());
        }
    }
    _closePortal() {
        if (this.state === 'done') return;
        // because we opened a named portal to stream results
        // we need to close the same named portal.  Leaving a named portal
        // open can lock tables for modification if inside a transaction.
        // see https://github.com/brianc/node-pg-cursor/issues/56
        this.connection.close({
            type: 'P',
            name: this._portal
        });
        // If we've received an error we already sent a sync message.
        // do not send another sync as it triggers another readyForQuery message.
        if (this.state !== 'error') {
            this.connection.sync();
        }
        this.state = 'done';
    }
    handleRowDescription(msg) {
        this._result.addFields(msg.fields);
        this.state = 'idle';
        this._shiftQueue();
    }
    handleDataRow(msg) {
        const row = this._result.parseRow(msg.fields);
        this.emit('row', row, this._result);
        this._rows.push(row);
    }
    _sendRows() {
        this.state = 'idle';
        setImmediate(()=>{
            const cb = this._cb;
            // remove callback before calling it
            // because likely a new one will be added
            // within the call to this callback
            this._cb = null;
            if (cb) {
                this._result.rows = this._rows;
                cb(null, this._rows, this._result);
            }
            this._rows = [];
        });
    }
    handleCommandComplete(msg) {
        this._result.addCommandComplete(msg);
        this._closePortal();
    }
    handlePortalSuspended() {
        this._sendRows();
    }
    handleReadyForQuery() {
        this._sendRows();
        this.state = 'done';
        this.emit('end', this._result);
    }
    handleEmptyQuery() {
        this.connection.sync();
    }
    handleError(msg) {
        // If this cursor has already closed, don't try to handle the error.
        if (this.state === 'done') return;
        // If we're in an initialized state we've never been submitted
        // and don't have a connection instance reference yet.
        // This can happen if you queue a stream and close the client before
        // the client has submitted the stream.  In this scenario we don't have
        // a connection so there's nothing to unsubscribe from.
        if (this.state !== 'initialized') {
            this.connection.removeListener('noData', this._ifNoData);
            this.connection.removeListener('rowDescription', this._rowDescription);
            // call sync to trigger a readyForQuery
            this.connection.sync();
        }
        this.state = 'error';
        this._error = msg;
        // satisfy any waiting callback
        if (this._cb) {
            this._cb(msg);
        }
        // dispatch error to all waiting callbacks
        for(let i = 0; i < this._queue.length; i++){
            const queuedCallback = this._queue[i][1];
            queuedCallback.call(this, msg);
        }
        this._queue.length = 0;
        if (this.listenerCount('error') > 0) {
            // only dispatch error events if we have a listener
            this.emit('error', msg);
        }
    }
    _getRows(rows, cb) {
        this.state = 'busy';
        this._cb = cb;
        this._rows = [];
        const msg = {
            portal: this._portal,
            rows: rows
        };
        this.connection.execute(msg, true);
        this.connection.flush();
    }
    // users really shouldn't be calling 'end' here and terminating a connection to postgres
    // via the low level connection.end api
    end(cb) {
        if (this.state !== 'initialized') {
            this.connection.sync();
        }
        this.connection.once('end', cb);
        this.connection.end();
    }
    close(cb) {
        let promise;
        if (!cb) {
            promise = new this._Promise((resolve, reject)=>{
                cb = (err)=>err ? reject(err) : resolve();
            });
        }
        if (!this.connection || this.state === 'done') {
            setImmediate(cb);
            return promise;
        }
        this._closePortal();
        this.connection.once('readyForQuery', function() {
            cb();
        });
        // Return the promise (or undefined)
        return promise;
    }
    read(rows, cb) {
        let promise;
        if (!cb) {
            promise = new this._Promise((resolve, reject)=>{
                cb = (err, rows)=>err ? reject(err) : resolve(rows);
            });
        }
        if (this.state === 'idle' || this.state === 'submitted') {
            this._getRows(rows, cb);
        } else if (this.state === 'busy' || this.state === 'initialized') {
            this._queue.push([
                rows,
                cb
            ]);
        } else if (this.state === 'error') {
            setImmediate(()=>cb(this._error));
        } else if (this.state === 'done') {
            setImmediate(()=>cb(null, []));
        } else {
            throw new Error('Unknown state: ' + this.state);
        }
        // Return the promise (or undefined)
        return promise;
    }
}
Cursor.prototype.end = util.deprecate(Cursor.prototype.end, 'Cursor.end is deprecated. Call end on the client itself to end a connection to the database.');
module.exports = Cursor;
}),
"[project]/node_modules/safe-buffer/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/* eslint-disable node/no-deprecated-api */ var buffer = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)");
var Buffer = buffer.Buffer;
// alternative to using Object.keys for old browsers
function copyProps(src, dst) {
    for(var key in src){
        dst[key] = src[key];
    }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
    module.exports = buffer;
} else {
    // Copy properties from require('buffer')
    copyProps(buffer, exports);
    exports.Buffer = SafeBuffer;
}
function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer(arg, encodingOrOffset, length);
}
// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer);
SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === 'number') {
        throw new TypeError('Argument must not be a number');
    }
    return Buffer(arg, encodingOrOffset, length);
};
SafeBuffer.alloc = function(size, fill, encoding) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    var buf = Buffer(size);
    if (fill !== undefined) {
        if (typeof encoding === 'string') {
            buf.fill(fill, encoding);
        } else {
            buf.fill(fill);
        }
    } else {
        buf.fill(0);
    }
    return buf;
};
SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    return Buffer(size);
};
SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    return buffer.SlowBuffer(size);
};
}),
"[project]/node_modules/uniku/build/bytes-xqWxFYsM.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "n",
    ()=>n,
    "r",
    ()=>t,
    "t",
    ()=>e
]);
function e(e) {
    for(let t = e.length - 1; t >= 0; --t){
        if (e[t] < 255) return e[t] += 1, !0;
        e[t] = 0;
    }
    return !1;
}
function t(e, t, n) {
    e[t] = n / 1099511627776 & 255, e[t + 1] = n / 4294967296 & 255, e[t + 2] = n / 16777216 & 255, e[t + 3] = n / 65536 & 255, e[t + 4] = n / 256 & 255, e[t + 5] = n & 255;
}
function n(e, t, n) {
    e[t] = n >>> 24 & 255, e[t + 1] = n >>> 16 & 255, e[t + 2] = n >>> 8 & 255, e[t + 3] = n & 255;
}
;
}),
"[project]/node_modules/uniku/build/cuid2/cuid2.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cuid2",
    ()=>y
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$random$2d$Chp$2d$Nkzi$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/random-Chp-Nkzi.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/errors.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$sha3$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/sha3.js [app-route] (ecmascript)");
;
;
;
const i = /^[a-z][0-9a-z]+$/, a = `0123456789abcdefghijklmnopqrstuvwxyz`, o = new TextEncoder, s = {
    counter: void 0,
    fingerprint: void 0
};
function c() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$random$2d$Chp$2d$Nkzi$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["n"])() % 476782368;
}
function l(e) {
    let t = 0n;
    for (let n of e)t = t * 256n + BigInt(n);
    return t;
}
function u(e) {
    if (e === 0n) return `0`;
    let t = [];
    for(; e > 0n;)t.push(a[Number(e % 36n)]), e /= 36n;
    return t.reverse().join(``);
}
function d(e) {
    return `abcdefghijklmnopqrstuvwxyz`[Math.floor(e() * 26)];
}
function f(e, t) {
    let n = Array(e);
    for(let r = 0; r < e; r++)n[r] = a[Math.floor(t() * 36)];
    return n.join(``);
}
function p(e) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$sha3$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sha3_512"])(o.encode(e));
}
function m() {
    let e = h;
    return u(l(p(Object.keys(globalThis).toString() + f(32, e)))).slice(1, 33);
}
function h() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$random$2d$Chp$2d$Nkzi$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["n"])() / 4294967296;
}
function g(e) {
    if (e) {
        if (e.length === 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`RANDOM_BYTES_TOO_SHORT`, `Random byte array cannot be empty`, {
            strategy: `cuid`
        });
        let n = 0;
        return ()=>{
            let t = e[n % e.length] / 256;
            return n += 1, t;
        };
    }
    return h;
}
function _(e) {
    let n = e?.length;
    if (n !== void 0 && (!Number.isInteger(n) || n < 2 || n > 32)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`LENGTH_OUT_OF_RANGE`, `CUID2 length must be between 2 and 32. Received: ${n}`, {
        strategy: `cuid`
    });
    let r = n ?? 24, i = g(e?.random);
    s.counter === void 0 && (s.counter = c()), s.fingerprint === void 0 && (s.fingerprint = m());
    let a = d(i), o = Date.now().toString(36);
    s.counter += 1;
    let h = s.counter.toString(36);
    return a + u(l(p(o + f(r, i) + h + s.fingerprint))).slice(1, r);
}
function v(e) {
    return typeof e == `string` && e.length >= 2 && e.length <= 32 && i.test(e);
}
const y = Object.assign(_, {
    isValid: v
});
;
}),
"[project]/node_modules/uniku/build/errors.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BufferError",
    ()=>i,
    "ERROR_CODES",
    ()=>e,
    "InvalidInputError",
    ()=>n,
    "ParseError",
    ()=>r,
    "UniqueIdError",
    ()=>t
]);
const e = [
    `TIMESTAMP_OUT_OF_RANGE`,
    `CONFLICTING_OPTIONS`,
    `COUNTER_OUT_OF_RANGE`,
    `NODE_OUT_OF_RANGE`,
    `NODE_BITS_OUT_OF_RANGE`,
    `EPOCH_INVALID`,
    `PROCESS_ID_OUT_OF_RANGE`,
    `MACHINE_ID_BYTES_TOO_SHORT`,
    `RANDOM_BYTES_TOO_SHORT`,
    `RANDOM_OVERFLOW`,
    `LENGTH_OUT_OF_RANGE`,
    `ALPHABET_OUT_OF_RANGE`,
    `ALPHABET_INVALID_CHAR`,
    `ALPHABET_DUPLICATE`,
    `PREFIX_TOO_LONG`,
    `PREFIX_INVALID_CHAR`,
    `PREFIX_INVALID_BOUNDARY`,
    `UUID_NOT_V7`,
    `BYTES_INVALID_LENGTH`,
    `BUFFER_OUT_OF_BOUNDS`,
    `INVALID_CHAR`,
    `INVALID_LENGTH`,
    `INVALID_FORMAT`,
    `NON_CANONICAL`,
    `VALUE_OUT_OF_RANGE`
];
var t = class extends Error {
    strategy;
    constructor(e, t){
        super(e), this.name = this.constructor.name, this.strategy = t?.strategy;
    }
}, n = class extends t {
    code;
    _tag = `InvalidInputError`;
    constructor(e, t, n){
        super(t, n), this.code = e;
    }
}, r = class extends t {
    code;
    _tag = `ParseError`;
    constructor(e, t, n){
        super(t, n), this.code = e;
    }
}, i = class extends t {
    code;
    _tag = `BufferError`;
    constructor(e, t, n){
        super(t, n), this.code = e;
    }
};
;
}),
"[project]/node_modules/uniku/build/ksuid/ksuid.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ksuid",
    ()=>C
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$random$2d$Chp$2d$Nkzi$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/random-Chp-Nkzi.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$validation$2d$CTNpXm94$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/validation-CTNpXm94.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/errors.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$bytes$2d$xqWxFYsM$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/bytes-xqWxFYsM.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$timestamp$2d$ChrSuQCR$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/timestamp-ChrSuQCR.mjs [app-route] (ecmascript)");
;
;
;
;
;
const c = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`, l = 62n, u = (1n << 160n) - 1n, d = new Uint8Array(65536);
d.fill(255);
for(let e = 0; e < 62; e += 1)d[c.charCodeAt(e)] = e;
function f(e) {
    if (e.length < 20) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferError"](`BYTES_INVALID_LENGTH`, `KSUID bytes must be at least 20 bytes, got ${e.length}`, {
        strategy: `ksuid`
    });
    let t = 0n;
    for(let n = 0; n < 20; n += 1)t = t << 8n | BigInt(e[n]);
    let r = ``;
    for(; t > 0n;){
        let e = t % l;
        t /= l, r = c[Number(e)] + r;
    }
    return r.padStart(27, `0`);
}
function p(e) {
    if (e.length !== 27) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParseError"](`INVALID_LENGTH`, `KSUID string must be 27 characters, got ${e.length}`, {
        strategy: `ksuid`
    });
    let t = 0n;
    for(let n = 0; n < 27; n += 1){
        let r = d[e.charCodeAt(n)];
        if (r === 255) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParseError"](`INVALID_CHAR`, `Invalid KSUID character: ${e[n]}`, {
            strategy: `ksuid`
        });
        t = t * l + BigInt(r);
    }
    if (t > u) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParseError"](`VALUE_OUT_OF_RANGE`, `KSUID string exceeds 160-bit range`, {
        strategy: `ksuid`
    });
    let n = new Uint8Array(20);
    for(let e = 19; e >= 0; --e)n[e] = Number(t & 255n), t >>= 8n;
    return n;
}
const m = 14e8, h = f(new Uint8Array(20).fill(255)), g = /^[0-9A-Za-z]{27}$/;
function _(e, t, n, r) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$bytes$2d$xqWxFYsM$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["n"])(n, r, e);
    for(let e = 0; e < 16; e += 1)n[r + 4 + e] = t[e];
}
function v(i, a, o = 0) {
    let c = i?.random;
    if (c && c.length < 16) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`RANDOM_BYTES_TOO_SHORT`, `Random bytes length must be >= 16 for KSUID`, {
        strategy: `ksuid`
    });
    let l, u = i === void 0 ? void 0 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$timestamp$2d$ChrSuQCR$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["t"])(i, m, 5694967295, `ksuid`);
    l = u === void 0 ? Math.floor(Date.now() / 1e3) - m : u - m;
    let d = c ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$random$2d$Chp$2d$Nkzi$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["r"])();
    if (a) {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$validation$2d$CTNpXm94$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["n"])(a, o, 20)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferError"](`BUFFER_OUT_OF_BOUNDS`, `KSUID byte range ${o}:${o + 20 - 1} is out of buffer bounds`, {
            strategy: `ksuid`
        });
        return _(l, d, a, o), a;
    }
    let p = new Uint8Array(20);
    return _(l, d, p, 0), f(p);
}
function y(e) {
    return p(e);
}
function b(e) {
    if (e.length !== 20) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferError"](`BYTES_INVALID_LENGTH`, `KSUID bytes must be exactly 20 bytes, got ${e.length}`, {
        strategy: `ksuid`
    });
    return f(e);
}
function x(e) {
    let t = p(e);
    return (((t[0] << 24 | t[1] << 16 | t[2] << 8 | t[3]) >>> 0) + m) * 1e3;
}
function S(e) {
    return typeof e == `string` && e.length === 27 && g.test(e) && e <= h;
}
const C = Object.assign(v, {
    toBytes: y,
    fromBytes: b,
    timestamp: x,
    isValid: S,
    NIL: `000000000000000000000000000`,
    MAX: h
});
;
}),
"[project]/node_modules/uniku/build/nanoid/nanoid.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "URL_ALPHABET",
    ()=>n,
    "nanoid",
    ()=>h
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/errors.mjs [app-route] (ecmascript)");
;
const n = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-`, r = 2048, i = /^[A-Za-z0-9_-]+$/, a = new TextDecoder;
let o, s = ``, c = 0;
function l(e) {
    let t = Math.min(e * 128, 65536);
    if ((!o || o.length < t) && (o = new Uint8Array(t)), c + e > s.length) {
        crypto.getRandomValues(o);
        for(let e = 0; e < o.length; e++)o[e] = n.charCodeAt(o[e] & 63);
        s = a.decode(o), c = 0;
    }
}
function u(e) {
    l(e);
    let t = s.substring(c, c + e);
    return c += e, t;
}
function d(t) {
    if (t.length < 2) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`ALPHABET_OUT_OF_RANGE`, `Alphabet must contain at least 2 characters`, {
        strategy: `nanoid`
    });
    if (t.length > 256) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`ALPHABET_OUT_OF_RANGE`, `Alphabet must not exceed 256 characters`, {
        strategy: `nanoid`
    });
    let n = new Set;
    for (let r of t){
        let t = r.charCodeAt(0);
        if (t < 32 || t > 126) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`ALPHABET_INVALID_CHAR`, `Alphabet must contain only printable ASCII characters (32-126)`, {
            strategy: `nanoid`
        });
        if (n.has(r)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`ALPHABET_DUPLICATE`, `Duplicate character in alphabet: "${r}"`, {
            strategy: `nanoid`
        });
        n.add(r);
    }
}
function f(t) {
    if (!Number.isInteger(t) || t < 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`LENGTH_OUT_OF_RANGE`, `Length must be a non-negative integer`, {
        strategy: `nanoid`
    });
    if (t > r) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`LENGTH_OUT_OF_RANGE`, `Length must not exceed ${r}`, {
        strategy: `nanoid`
    });
}
function p(t) {
    if (t === void 0) return u(21);
    let r = 21, i = n, a;
    if (typeof t == `number`) r = t;
    else {
        if (t.length !== void 0 && t.size !== void 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`CONFLICTING_OPTIONS`, "Pass only one of `length` or `size`, not both", {
            strategy: `nanoid`
        });
        r = t.length ?? t.size ?? 21, i = t.alphabet ?? `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-`, a = t.random, t.alphabet !== void 0 && d(i);
    }
    if (f(r), r === 0) return ``;
    if (i === `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-` && a === void 0) return u(r);
    let o = i.length;
    if (!(o & o - 1)) {
        let t = o - 1;
        if (a && a.length < r) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`RANDOM_BYTES_TOO_SHORT`, `Insufficient random bytes: need ${r}, have ${a.length}`, {
            strategy: `nanoid`
        });
        let n = a?.subarray(0, r) ?? globalThis.crypto.getRandomValues(new Uint8Array(r)), s = ``;
        for(let e = 0; e < r; e++)s += i[n[e] & t];
        return s;
    }
    let s = (2 << 31 - Math.clz32(o - 1 | 1)) - 1, c = Math.ceil(1.6 * s * r / o), l = ``, p = 0;
    for(; l.length < r;){
        let t;
        if (a) {
            if (a.length - p < c) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`RANDOM_BYTES_TOO_SHORT`, `Insufficient random bytes: need at least ${c} more, have ${a.length - p}`, {
                strategy: `nanoid`
            });
            t = a.subarray(p, p + c), p += c;
        } else t = globalThis.crypto.getRandomValues(new Uint8Array(c));
        for(let e = 0; e < t.length && l.length < r; e++){
            let n = t[e] & s;
            n < o && (l += i[n]);
        }
    }
    return l;
}
function m(e) {
    return typeof e == `string` && e.length > 0 && i.test(e);
}
const h = Object.assign(p, {
    isValid: m
});
;
}),
"[project]/node_modules/uniku/build/random-Chp-Nkzi.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "n",
    ()=>a,
    "r",
    ()=>o,
    "t",
    ()=>i
]);
const e = globalThis.crypto.getRandomValues.bind(globalThis.crypto), t = new Uint8Array(256);
let n = 256;
function r() {
    e(t), n = 0;
}
function i(i) {
    if (i > 256) return e(new Uint8Array(i));
    n + i > 256 && r();
    let a = n;
    return n += i, t.subarray(a, n);
}
function a() {
    n > 252 && r();
    let e = t[n] * 16777216 + t[n + 1] * 65536 + t[n + 2] * 256 + t[n + 3] >>> 0;
    return n += 4, e;
}
function o() {
    n > 240 && r();
    let e = n;
    return n += 16, t.subarray(e, n);
}
;
}),
"[project]/node_modules/uniku/build/timestamp-ChrSuQCR.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "t",
    ()=>n
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$validation$2d$CTNpXm94$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/validation-CTNpXm94.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/errors.mjs [app-route] (ecmascript)");
;
;
function n(n, r, i, a) {
    let { msecs: o, secs: s } = n;
    if (o !== void 0 && s !== void 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`CONFLICTING_OPTIONS`, "Pass only one of `msecs` or `secs`, not both", {
        strategy: a
    });
    if (o !== void 0) {
        let n = r * 1e3, s = i * 1e3 + 999;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$validation$2d$CTNpXm94$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["t"])(o, n, s)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`TIMESTAMP_OUT_OF_RANGE`, `Timestamp must be an integer between ${n} and ${s} milliseconds`, {
            strategy: a
        });
        return Math.floor(o / 1e3);
    }
    if (s !== void 0) {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$validation$2d$CTNpXm94$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["t"])(s, r, i)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`TIMESTAMP_OUT_OF_RANGE`, `Timestamp must be an integer between ${r} and ${i} seconds`, {
            strategy: a
        });
        return s;
    }
}
;
}),
"[project]/node_modules/uniku/build/ulid/ulid.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ulid",
    ()=>E
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$random$2d$Chp$2d$Nkzi$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/random-Chp-Nkzi.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$validation$2d$CTNpXm94$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/validation-CTNpXm94.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/errors.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$bytes$2d$xqWxFYsM$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/bytes-xqWxFYsM.mjs [app-route] (ecmascript)");
;
;
;
;
const l = `0123456789ABCDEFGHJKMNPQRSTVWXYZ`, u = new Uint8Array(65536);
u.fill(255);
for(let e = 0; e < 32; e += 1){
    let t = l.charCodeAt(e), n = l[e].toLowerCase().charCodeAt(0);
    u[t] = e, u[n] = e;
}
function d(e, t) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParseError"](`INVALID_CHAR`, `Invalid ULID character: ${e[t]}`, {
        strategy: `ulid`
    });
}
function f() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParseError"](`TIMESTAMP_OUT_OF_RANGE`, `ULID timestamp exceeds 48 bits`, {
        strategy: `ulid`
    });
}
function p(e) {
    let t = u[e.charCodeAt(0)];
    if (t === 255) throw d(e, 0);
    if (t > 7) throw f();
    let n = t;
    for(let t = 1; t < 10; t += 1){
        let r = u[e.charCodeAt(t)];
        if (r === 255) throw d(e, t);
        n = n * 32 + r;
    }
    return n;
}
function m(e) {
    return l[Math.floor(e / 35184372088832) & 31] + l[Math.floor(e / 1099511627776) & 31] + l[Math.floor(e / 34359738368) & 31] + l[Math.floor(e / 1073741824) & 31] + l[Math.floor(e / 33554432) & 31] + l[Math.floor(e / 1048576) & 31] + l[Math.floor(e / 32768) & 31] + l[Math.floor(e / 1024) & 31] + l[Math.floor(e / 32) & 31] + l[e & 31];
}
function h(e) {
    return l[e[0] >> 3 & 31] + l[(e[0] << 2 | e[1] >> 6) & 31] + l[e[1] >> 1 & 31] + l[(e[1] << 4 | e[2] >> 4) & 31] + l[(e[2] << 1 | e[3] >> 7) & 31] + l[e[3] >> 2 & 31] + l[(e[3] << 3 | e[4] >> 5) & 31] + l[e[4] & 31] + l[e[5] >> 3 & 31] + l[(e[5] << 2 | e[6] >> 6) & 31] + l[e[6] >> 1 & 31] + l[(e[6] << 4 | e[7] >> 4) & 31] + l[(e[7] << 1 | e[8] >> 7) & 31] + l[e[8] >> 2 & 31] + l[(e[8] << 3 | e[9] >> 5) & 31] + l[e[9] & 31];
}
function g(e) {
    if (e.length !== 26) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParseError"](`INVALID_LENGTH`, `ULID string must be 26 characters`, {
        strategy: `ulid`
    });
    return p(e);
}
function _(e) {
    if (e.length !== 26) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParseError"](`INVALID_LENGTH`, `ULID string must be 26 characters`, {
        strategy: `ulid`
    });
    let t = new Uint8Array(16), n = u[e.charCodeAt(0)], r = u[e.charCodeAt(1)], i = u[e.charCodeAt(2)], o = u[e.charCodeAt(3)], s = u[e.charCodeAt(4)], c = u[e.charCodeAt(5)], l = u[e.charCodeAt(6)], p = u[e.charCodeAt(7)], m = u[e.charCodeAt(8)], h = u[e.charCodeAt(9)], g = u[e.charCodeAt(10)], _ = u[e.charCodeAt(11)], v = u[e.charCodeAt(12)], y = u[e.charCodeAt(13)], b = u[e.charCodeAt(14)], x = u[e.charCodeAt(15)], S = u[e.charCodeAt(16)], C = u[e.charCodeAt(17)], w = u[e.charCodeAt(18)], T = u[e.charCodeAt(19)], E = u[e.charCodeAt(20)], D = u[e.charCodeAt(21)], O = u[e.charCodeAt(22)], k = u[e.charCodeAt(23)], A = u[e.charCodeAt(24)], j = u[e.charCodeAt(25)];
    if ((n | r | i | o | s | c | l | p | m | h | g | _ | v | y | b | x | S | C | w | T | E | D | O | k | A | j) & 128) {
        for(let t = 0; t < 26; t += 1)if (u[e.charCodeAt(t)] === 255) throw d(e, t);
    }
    if (n > 7) throw f();
    return t[0] = n << 5 | r, t[1] = i << 3 | o >> 2, t[2] = o << 6 | s << 1 | c >> 4, t[3] = c << 4 | l >> 1, t[4] = l << 7 | p << 2 | m >> 3, t[5] = m << 5 | h, t[6] = g << 3 | _ >> 2, t[7] = _ << 6 | v << 1 | y >> 4, t[8] = y << 4 | b >> 1, t[9] = b << 7 | x << 2 | S >> 3, t[10] = S << 5 | C, t[11] = w << 3 | T >> 2, t[12] = T << 6 | E << 1 | D >> 4, t[13] = D << 4 | O >> 1, t[14] = O << 7 | k << 2 | A >> 3, t[15] = A << 5 | j, t;
}
function v(e) {
    if (e.length !== 16) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferError"](`BYTES_INVALID_LENGTH`, `ULID bytes must be exactly 16 bytes, got ${e.length}`, {
        strategy: `ulid`
    });
    let t = 0;
    for(let n = 0; n < 6; n += 1)t = t * 256 + e[n];
    return m(t) + h(e.subarray(6, 16));
}
const y = /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/i, b = 0xffffffffffff, x = {
    msecs: -1 / 0,
    lastRandom: new Uint8Array(10)
};
function S(e, t, n, r) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$bytes$2d$xqWxFYsM$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["r"])(n, r, e);
    for(let e = 0; e < 10; e += 1)n[r + 6 + e] = t[e];
}
function C(e, n, i, a) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$validation$2d$CTNpXm94$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["n"])(i, a, 16)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferError"](`BUFFER_OUT_OF_BOUNDS`, `ULID byte range ${a}:${a + 16 - 1} is out of buffer bounds`, {
        strategy: `ulid`
    });
    S(e, n, i, a);
}
function w(t, r, a = 0) {
    let o, s;
    if (t) {
        let r = t.msecs;
        if (r !== void 0 && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$validation$2d$CTNpXm94$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["t"])(r, 0, b)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`TIMESTAMP_OUT_OF_RANGE`, `Timestamp must be an integer between 0 and ${b}`, {
            strategy: `ulid`
        });
        o = r ?? Date.now();
        let a = t.random;
        if (a) {
            if (a.length < 10) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`RANDOM_BYTES_TOO_SHORT`, `Random bytes length must be >= 10 for ULID`, {
                strategy: `ulid`
            });
            s = a;
        } else s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$random$2d$Chp$2d$Nkzi$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["r"])();
    } else if (o = Date.now(), o > x.msecs) s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$random$2d$Chp$2d$Nkzi$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["r"])(), x.msecs = o, x.lastRandom.set(s.subarray(0, 10));
    else {
        if (o = x.msecs, !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$bytes$2d$xqWxFYsM$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["t"])(x.lastRandom)) throw x.lastRandom.fill(255), new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`RANDOM_OVERFLOW`, `ULID random component overflowed while preserving monotonic order`, {
            strategy: `ulid`
        });
        s = x.lastRandom;
    }
    return r ? (C(o, s, r, a), r) : m(o) + h(s);
}
function T(e) {
    return typeof e == `string` && y.test(e);
}
const E = Object.assign(w, {
    toBytes: (e)=>_(e),
    fromBytes: (e)=>v(e),
    timestamp: (e)=>g(e),
    isValid: T,
    NIL: `00000000000000000000000000`,
    MAX: `7ZZZZZZZZZZZZZZZZZZZZZZZZZ`
});
;
}),
"[project]/node_modules/uniku/build/uuid-BPebYihz.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "n",
    ()=>s,
    "r",
    ()=>c,
    "t",
    ()=>o
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/errors.mjs [app-route] (ecmascript)");
;
function n(e) {
    return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 65 + 10 : e >= 97 && e <= 102 ? e - 97 + 10 : -1;
}
const r = [
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    -1,
    4,
    4,
    5,
    5,
    -1,
    6,
    6,
    7,
    7,
    -1,
    8,
    8,
    9,
    9,
    -1,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    14,
    14,
    15,
    15
], i = [
    !0,
    !1,
    !0,
    !1,
    !0,
    !1,
    !0,
    !1,
    !1,
    !0,
    !1,
    !0,
    !1,
    !1,
    !0,
    !1,
    !0,
    !1,
    !1,
    !0,
    !1,
    !0,
    !1,
    !1,
    !0,
    !1,
    !0,
    !1,
    !0,
    !1,
    !0,
    !1,
    !0,
    !1,
    !0,
    !1
], a = Array.from({
    length: 256
}, (e, t)=>t.toString(16).padStart(2, `0`));
function o(t) {
    if (t.length !== 16) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferError"](`BYTES_INVALID_LENGTH`, `UUID bytes must be exactly 16 bytes, got ${t.length}`, {
        strategy: `uuid`
    });
    return s(t);
}
function s(e) {
    return a[e[0]] + a[e[1]] + a[e[2]] + a[e[3]] + `-` + a[e[4]] + a[e[5]] + `-` + a[e[6]] + a[e[7]] + `-` + a[e[8]] + a[e[9]] + `-` + a[e[10]] + a[e[11]] + a[e[12]] + a[e[13]] + a[e[14]] + a[e[15]];
}
function c(e) {
    if (e.length !== 36) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParseError"](`INVALID_LENGTH`, `UUID string must be 36 characters, got ${e.length}`, {
        strategy: `uuid`
    });
    if (e[8] !== `-` || e[13] !== `-` || e[18] !== `-` || e[23] !== `-`) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParseError"](`INVALID_FORMAT`, `UUID string has invalid separators at positions 8, 13, 18, 23. Received: "${e}"`, {
        strategy: `uuid`
    });
    let a = new Uint8Array(16);
    for(let o = 0; o < 36; o += 1){
        let s = r[o];
        if (s === -1) continue;
        let c = n(e.charCodeAt(o));
        if (c === -1) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParseError"](`INVALID_CHAR`, `UUID string contains invalid hex character at position ${o}`, {
            strategy: `uuid`
        });
        i[o] ? a[s] = c << 4 : a[s] |= c;
    }
    return a;
}
;
}),
"[project]/node_modules/uniku/build/uuid/v4.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "uuidv4",
    ()=>g
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$random$2d$Chp$2d$Nkzi$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/random-Chp-Nkzi.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$validation$2d$CTNpXm94$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/validation-CTNpXm94.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/errors.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$uuid$2d$BPebYihz$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/uuid-BPebYihz.mjs [app-route] (ecmascript)");
;
;
;
;
const l = globalThis.crypto.randomUUID.bind(globalThis.crypto), u = new Uint8Array(16), d = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function f(e, t, n) {
    for(let r = 0; r < 16; r += 1)t[n + r] = e[r];
    t[n + 6] = t[n + 6] & 15 | 64, t[n + 8] = t[n + 8] & 63 | 128;
}
function p(e, t, n) {
    return !t && !e ? l() : m(e, t, n);
}
function m(i, a, s) {
    let c = i?.random;
    if (c && c.length < 16) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`RANDOM_BYTES_TOO_SHORT`, `Random bytes length must be >= 16`, {
        strategy: `uuid`
    });
    let l = a ? s ?? 0 : 0;
    if (a && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$validation$2d$CTNpXm94$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["n"])(a, l, 16)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferError"](`BUFFER_OUT_OF_BOUNDS`, `UUID byte range ${l}:${l + 16 - 1} is out of buffer bounds`, {
        strategy: `uuid`
    });
    let d = a ?? u;
    return f(c ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$random$2d$Chp$2d$Nkzi$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["r"])(), d, l), a ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$uuid$2d$BPebYihz$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["n"])(d);
}
function h(e) {
    return typeof e == `string` && d.test(e);
}
const g = Object.assign(p, {
    toBytes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$uuid$2d$BPebYihz$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["r"],
    fromBytes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$uuid$2d$BPebYihz$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["t"],
    isValid: h,
    NIL: `00000000-0000-0000-0000-000000000000`,
    MAX: `ffffffff-ffff-ffff-ffff-ffffffffffff`
});
;
}),
"[project]/node_modules/uniku/build/uuid/v7.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "uuidv7",
    ()=>x
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$random$2d$Chp$2d$Nkzi$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/random-Chp-Nkzi.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$validation$2d$CTNpXm94$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/validation-CTNpXm94.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/errors.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$uuid$2d$BPebYihz$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uniku/build/uuid-BPebYihz.mjs [app-route] (ecmascript)");
;
;
;
;
const u = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, d = 0xffffffffffff, f = 4294967295, p = new Uint8Array(16), m = {
    msecs: -1 / 0,
    seq: 0
};
function h(e, t, n, r, i) {
    r[i++] = t / 1099511627776 & 255, r[i++] = t / 4294967296 & 255, r[i++] = t / 16777216 & 255, r[i++] = t / 65536 & 255, r[i++] = t / 256 & 255, r[i++] = t & 255, r[i++] = 112 | n >>> 28 & 15, r[i++] = n >>> 20 & 255, r[i++] = 128 | n >>> 14 & 63, r[i++] = n >>> 6 & 255, r[i++] = n << 2 & 255 | e[10] & 3, r[i++] = e[11], r[i++] = e[12], r[i++] = e[13], r[i++] = e[14], r[i++] = e[15];
}
function g(e, n, i, a, o) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$validation$2d$CTNpXm94$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["n"])(a, o, 16)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BufferError"](`BUFFER_OUT_OF_BOUNDS`, `UUID byte range ${o}:${o + 16 - 1} is out of buffer bounds`, {
        strategy: `uuid`
    });
    h(e, n, i, a, o);
}
function _(t, r, a = 0) {
    let o = t.msecs;
    if (o !== void 0 && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$validation$2d$CTNpXm94$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["t"])(o, 0, d)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`TIMESTAMP_OUT_OF_RANGE`, `Timestamp must be an integer between 0 and ${d}`, {
        strategy: `uuid`
    });
    if (t.counter !== void 0 && t.seq !== void 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`CONFLICTING_OPTIONS`, "Pass only one of `counter` or `seq`, not both", {
        strategy: `uuid`
    });
    let c = t.counter ?? t.seq;
    if (c !== void 0 && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$validation$2d$CTNpXm94$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["t"])(c, 0, f)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`COUNTER_OUT_OF_RANGE`, `Counter must be an integer between 0 and ${f}`, {
        strategy: `uuid`
    });
    let l = t.random;
    if (l && l.length < 16) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$errors$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidInputError"](`RANDOM_BYTES_TOO_SHORT`, `Random bytes length must be >= 16`, {
        strategy: `uuid`
    });
    let u = l ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$random$2d$Chp$2d$Nkzi$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["r"])(), m = o ?? Date.now(), _1 = c ?? u[6] << 23 | u[7] << 16 | u[8] << 8 | u[9];
    return r ? (g(u, m, _1, r, a), r) : (h(u, m, _1, p, 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$uuid$2d$BPebYihz$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["n"])(p));
}
function v(t, n, r) {
    if (t) return _(t, n, r);
    let i = Date.now(), a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$random$2d$Chp$2d$Nkzi$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["r"])();
    return i > m.msecs ? (m.seq = a[6] << 23 | a[7] << 16 | a[8] << 8 | a[9], m.msecs = i) : (m.seq = m.seq + 1 | 0, m.seq < 0 && (m.seq = 0, m.msecs++)), n ? (g(a, m.msecs, m.seq, n, r ?? 0), n) : (h(a, m.msecs, m.seq, p, 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$uuid$2d$BPebYihz$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["n"])(p));
}
function y(e) {
    let t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$uuid$2d$BPebYihz$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["r"])(e), n = 0;
    for(let e = 0; e < 6; e += 1)n = n * 256 + t[e];
    return n;
}
function b(e) {
    return typeof e == `string` && u.test(e);
}
const x = Object.assign(v, {
    toBytes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$uuid$2d$BPebYihz$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["r"],
    fromBytes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uniku$2f$build$2f$uuid$2d$BPebYihz$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["t"],
    timestamp: y,
    isValid: b,
    NIL: `00000000-0000-0000-0000-000000000000`,
    MAX: `ffffffff-ffff-ffff-ffff-ffffffffffff`
});
;
}),
"[project]/node_modules/uniku/build/validation-CTNpXm94.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "n",
    ()=>t,
    "t",
    ()=>e
]);
function e(e, t, n) {
    return Number.isInteger(e) && e >= t && e <= n;
}
function t(e, t, n) {
    return Number.isInteger(t) && t >= 0 && t + n <= e.length;
}
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1lhpq3w._.js.map