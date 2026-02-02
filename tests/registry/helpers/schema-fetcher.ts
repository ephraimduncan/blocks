import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

export type SchemaName = "registry" | "item";

export type SchemaCacheEntry = {
  name: SchemaName;
  url: string;
  schema: unknown;
  hash: string;
  fetchedAt: string;
};

const SCHEMA_URLS: Record<SchemaName, string> = {
  registry: "https://ui.shadcn.com/schema/registry.json",
  item: "https://ui.shadcn.com/schema/registry-item.json",
};

const schemaCache = new Map<SchemaName, SchemaCacheEntry>();

export const schemaCacheDir = path.join(
  process.cwd(),
  "tests",
  "registry",
  ".cache"
);

export const schemaHashesFixture = path.join(
  process.cwd(),
  "tests",
  "registry",
  "fixtures",
  "shadcn-schema-hashes.json"
);

function hashSchema(schema: unknown): string {
  const payload = JSON.stringify(schema);
  return crypto.createHash("sha256").update(payload).digest("hex");
}

async function writeSchemaCache(entry: SchemaCacheEntry): Promise<void> {
  await fs.mkdir(schemaCacheDir, { recursive: true });
  const cachePath = path.join(schemaCacheDir, `${entry.name}.json`);
  await fs.writeFile(cachePath, JSON.stringify(entry, null, 2));
}

export async function fetchSchema(
  name: SchemaName
): Promise<SchemaCacheEntry> {
  const cached = schemaCache.get(name);
  if (cached) {
    return cached;
  }

  const url = SCHEMA_URLS[name];
  const response = await fetch(url, {
    headers: {
      "user-agent": "blocks-registry-tests",
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${name} schema (${response.status} ${response.statusText})`
    );
  }

  const schema = (await response.json()) as unknown;
  const entry: SchemaCacheEntry = {
    name,
    url,
    schema,
    hash: hashSchema(schema),
    fetchedAt: new Date().toISOString(),
  };

  schemaCache.set(name, entry);
  await writeSchemaCache(entry);

  return entry;
}

export async function ensureSchemaCache(): Promise<void> {
  await Promise.all([fetchSchema("registry"), fetchSchema("item")]);
}

export async function getSchemaHashes(): Promise<
  Record<SchemaName, string>
> {
  const [registrySchema, itemSchema] = await Promise.all([
    fetchSchema("registry"),
    fetchSchema("item"),
  ]);

  return {
    registry: registrySchema.hash,
    item: itemSchema.hash,
  };
}
