import { beforeAll } from "vitest";
import { ensureSchemaCache } from "./helpers/schema-fetcher";

beforeAll(async () => {
  await ensureSchemaCache();
});
