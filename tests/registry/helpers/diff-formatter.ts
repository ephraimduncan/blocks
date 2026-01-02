const SAFE_KEY = /^[A-Za-z_$][A-Za-z0-9_$-]*$/;

export function formatJsonPath(pointer: string): string {
  if (!pointer || pointer === "/") {
    return "$";
  }

  const parts = pointer
    .split("/")
    .filter(Boolean)
    .map((part) => part.replace(/~1/g, "/").replace(/~0/g, "~"));

  let path = "";
  for (const part of parts) {
    if (/^\d+$/.test(part)) {
      path += `[${part}]`;
      continue;
    }

    if (SAFE_KEY.test(part)) {
      path += path.length === 0 ? part : `.${part}`;
      continue;
    }

    path += `["${part}"]`;
  }

  return path.length === 0 ? "$" : path;
}

export function formatArrayDiff(
  label: string,
  received: string[],
  expected: string[]
): string {
  const receivedValue = JSON.stringify(received);
  const expectedValue = JSON.stringify(expected);

  return [
    "Diff:",
    `  - ${label}: ${receivedValue}`,
    `  + ${label}: ${expectedValue}`,
  ].join("\n");
}

export function formatMissingRegistryDependencies(params: {
  blockId: string;
  used: string[];
  declared: string[];
  missing: string[];
}): string {
  const { blockId, used, declared, missing } = params;
  const suggestion = missing.length
    ? `Add ${missing.map((dep) => `"${dep}"`).join(", ")} to registryDependencies`
    : "Ensure registryDependencies includes all UI imports";
  const expected = declared.concat(missing).sort();

  return [
    `Missing Registry Dependencies: ${blockId}`,
    `  Uses: ${used.join(", ") || "none"}`,
    `  Declared: ${JSON.stringify(declared)}`,
    `  Missing: ${JSON.stringify(missing)}`,
    "",
    formatArrayDiff("registryDependencies", declared, expected),
    "",
    `  Suggested Fix: ${suggestion}`,
  ].join("\n");
}

export function formatUnusedRegistryDependencies(params: {
  blockId: string;
  unused: string[];
}): string {
  const { blockId, unused } = params;
  const suggestion = unused.length
    ? `Remove ${unused.map((dep) => `"${dep}"`).join(", ")} from registryDependencies`
    : "No unused registryDependencies detected";

  return [
    `Unused Registry Dependencies: ${blockId}`,
    `  Unused: ${JSON.stringify(unused)}`,
    "",
    `  Suggested Fix: ${suggestion}`,
  ].join("\n");
}

export function formatImportResolutionError(params: {
  blockId: string;
  filePath: string;
  importPath: string;
  expectedTargets: string[];
}): string {
  const { blockId, filePath, importPath, expectedTargets } = params;

  return [
    `Import Resolution Failed: ${blockId}`,
    `  File: ${filePath}`,
    `  Import: ${importPath}`,
    `  Available Targets: ${JSON.stringify(expectedTargets)}`,
    "",
    "  Suggested Fix: Ensure the import matches a file target in the registry item",
  ].join("\n");
}

export function formatSchemaValidationError(params: {
  itemName: string;
  jsonPath: string;
  message: string;
  expected?: string;
  received?: string;
  suggestion?: string;
}): string {
  const { itemName, jsonPath, message, expected, received, suggestion } =
    params;

  const lines = [
    `Schema Validation Failed: ${itemName}`,
    `  Location: ${jsonPath}`,
    `  Message: ${message}`,
  ];

  if (expected) {
    lines.push(`  Expected: ${expected}`);
  }

  if (received) {
    lines.push(`  Received: ${received}`);
  }

  lines.push("", `  Suggested Fix: ${suggestion || "Align value with schema"}`);

  return lines.join("\n");
}
