import Ajv, { ErrorObject } from "ajv";
import addFormats from "ajv-formats";
import draft7Schema from "ajv/dist/refs/json-schema-draft-07.json";
import fs from "fs/promises";
import path from "path";
import { describe, it } from "vitest";
import {
  fetchSchema,
  getSchemaHashes,
  schemaHashesFixture,
} from "../helpers/schema-fetcher";
import {
  formatJsonPath,
  formatSchemaValidationError,
} from "../helpers/diff-formatter";

const registryPath = path.join(process.cwd(), "public", "r", "registry.json");
const registryDir = path.join(process.cwd(), "public", "r");

function buildAjv(): Ajv {
  const ajv = new Ajv({
    allErrors: true,
    strict: false,
    allowUnionTypes: true,
    verbose: true,
  });
  addFormats(ajv);
  const draft7HttpId = "http://json-schema.org/draft-07/schema#";
  const draft7HttpIdNoHash = "http://json-schema.org/draft-07/schema";
  const draft7HttpsId = "https://json-schema.org/draft-07/schema#";

  if (!ajv.getSchema(draft7HttpId) && !ajv.getSchema(draft7HttpIdNoHash)) {
    ajv.addMetaSchema(draft7Schema);
  }

  if (!ajv.getSchema(draft7HttpsId)) {
    ajv.addMetaSchema({ ...draft7Schema, $id: draft7HttpsId });
  }
  return ajv;
}

function getValueAtPointer(data: unknown, pointer: string): unknown {
  if (!pointer || pointer === "/") {
    return data;
  }

  const parts = pointer
    .split("/")
    .filter(Boolean)
    .map((part) => part.replace(/~1/g, "/").replace(/~0/g, "~"));

  let current: any = data;
  for (const part of parts) {
    if (current === null || current === undefined) {
      return undefined;
    }

    if (Array.isArray(current)) {
      const index = Number(part);
      current = Number.isNaN(index) ? undefined : current[index];
      continue;
    }

    if (typeof current === "object") {
      current = (current as Record<string, unknown>)[part];
      continue;
    }

    return undefined;
  }

  return current;
}

function formatExpected(error: ErrorObject): string | undefined {
  switch (error.keyword) {
    case "type":
      return `type ${JSON.stringify((error.params as any).type)}`;
    case "enum":
      return JSON.stringify((error.params as any).allowedValues);
    case "required":
      return `property ${(error.params as any).missingProperty} is required`;
    case "additionalProperties":
      return `no additional property ${(error.params as any).additionalProperty}`;
    default:
      return undefined;
  }
}

function formatSchemaErrors(
  itemName: string,
  errors: ErrorObject[],
  data: unknown
): string {
  return errors
    .map((error) => {
      const pointer = error.instancePath || "";
      const jsonPath = formatJsonPath(pointer);
      const expected = formatExpected(error);
      const value =
        (error as ErrorObject & { data?: unknown }).data ??
        getValueAtPointer(data, pointer);
      const received =
        value === undefined ? undefined : JSON.stringify(value, null, 0);

      let suggestion = "Align value with schema";
      if (error.keyword === "enum" && (error.params as any).allowedValues) {
        suggestion = `Update value to one of ${(error.params as any).allowedValues
          .map((item: string) => `"${item}"`)
          .join(", ")}`;
      } else if (error.keyword === "required") {
        suggestion = `Add required property ${(error.params as any).missingProperty}`;
      } else if (error.keyword === "type") {
        suggestion = `Update value to type ${(error.params as any).type}`;
      }

      return formatSchemaValidationError({
        itemName,
        jsonPath,
        message: error.message || "Schema validation error",
        expected,
        received,
        suggestion,
      });
    })
    .join("\n\n---\n\n");
}

describe("registry schema validation", () => {
  it("detects shadcn schema changes via hash comparison", async () => {
    const expectedRaw = await fs.readFile(schemaHashesFixture, "utf-8");
    const expected = JSON.parse(expectedRaw) as Record<string, string>;
    const actual = await getSchemaHashes();

    const mismatches: string[] = [];
    (Object.keys(actual) as Array<keyof typeof actual>).forEach((key) => {
      if (expected[key] !== actual[key]) {
        mismatches.push(
          `${key}: expected ${expected[key] || "<missing>"}, received ${
            actual[key]
          }`
        );
      }
    });

    if (mismatches.length > 0) {
      throw new Error(
        [
          "Shadcn schema hash mismatch detected.",
          ...mismatches.map((line) => `  ${line}`),
          "",
          "Suggested Fix: Update tests/registry/fixtures/shadcn-schema-hashes.json",
        ].join("\n")
      );
    }
  });

  it("validates registry.json against live schema", async () => {
    const registrySchema = await fetchSchema("registry");
    const itemSchema = await fetchSchema("item");
    const registry = JSON.parse(await fs.readFile(registryPath, "utf-8"));

    const ajv = buildAjv();
    ajv.addSchema(itemSchema.schema, itemSchema.url);
    const validate = ajv.compile(registrySchema.schema);
    const valid = validate(registry);

    if (!valid && validate.errors) {
      throw new Error(
        formatSchemaErrors("registry.json", validate.errors, registry)
      );
    }
  });

  it("validates each registry item against live item schema", async () => {
    const itemSchema = await fetchSchema("item");
    const ajv = buildAjv();
    const validate = ajv.compile(itemSchema.schema);

    const entries = await fs.readdir(registryDir);
    const itemFiles = entries.filter(
      (file) => file.endsWith(".json") && file !== "registry.json"
    );

    const errors: string[] = [];

    for (const file of itemFiles) {
      const filePath = path.join(registryDir, file);
      const item = JSON.parse(await fs.readFile(filePath, "utf-8"));
      const valid = validate(item);

      if (!valid && validate.errors) {
        const itemName = item.name || file;
        errors.push(formatSchemaErrors(itemName, validate.errors, item));
      }
    }

    if (errors.length > 0) {
      throw new Error(errors.join("\n\n---\n\n"));
    }
  });
});
