import fs from "fs/promises";
import path from "path";
import { describe, it } from "vitest";
import { analyzeImports } from "../helpers/import-analyzer";
import {
  formatMissingRegistryDependencies,
  formatUnusedRegistryDependencies,
} from "../helpers/diff-formatter";

const registryPath = path.join(process.cwd(), "public", "r", "registry.json");
const uiDir = path.join(process.cwd(), "components", "ui");

async function loadRegistry(): Promise<any> {
  return JSON.parse(await fs.readFile(registryPath, "utf-8"));
}

async function loadUiComponents(): Promise<Set<string>> {
  const entries = await fs.readdir(uiDir);
  const components = entries
    .filter((file) => /\.(tsx|ts|jsx|js)$/.test(file))
    .map((file) => file.replace(/\.(tsx|ts|jsx|js)$/, ""));
  return new Set(components);
}

async function readFileContent(file: { content?: string; path: string }) {
  if (file.content !== undefined) {
    return file.content;
  }

  const absolutePath = path.join(process.cwd(), file.path);
  return fs.readFile(absolutePath, "utf-8");
}

describe("registry dependencies", () => {
  it("ensures registryDependencies matches UI imports", async () => {
    const registry = await loadRegistry();
    const uiComponents = await loadUiComponents();

    const errors: string[] = [];
    const warnings: string[] = [];

    for (const item of registry.items || []) {
      const declared = Array.from(
        new Set<string>(item.registryDependencies || [])
      ).sort();
      const used = new Set<string>();

      for (const file of item.files || []) {
        const content = await readFileContent(file);
        const analysis = analyzeImports(content, file.path);

        analysis.uiImports.forEach((component) => {
          used.add(component);

          if (!uiComponents.has(component)) {
            errors.push(
              [
                `Unknown UI Import: ${item.name}`,
                `  Import: @/components/ui/${component}`,
                "",
                "  Suggested Fix: Add the missing UI component or update the import",
              ].join("\n")
            );
          }
        });
      }

      const usedList = Array.from(used).sort();
      const missing = usedList.filter((dep) => !declared.includes(dep));
      const unused = declared.filter((dep) => !used.has(dep));

      if (missing.length > 0) {
        errors.push(
          formatMissingRegistryDependencies({
            blockId: item.name,
            used: usedList,
            declared,
            missing,
          })
        );
      }

      if (unused.length > 0) {
        warnings.push(
          formatUnusedRegistryDependencies({
            blockId: item.name,
            unused,
          })
        );
      }
    }

    if (warnings.length > 0) {
      console.warn(warnings.join("\n\n---\n\n"));
    }

    if (errors.length > 0) {
      throw new Error(errors.join("\n\n---\n\n"));
    }
  });
});
