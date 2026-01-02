import fs from "fs/promises";
import path from "path";
import { describe, it } from "vitest";
import { blocksMetadata } from "../../../content/blocks-metadata";
import { analyzeImports } from "../helpers/import-analyzer";
import { formatImportResolutionError } from "../helpers/diff-formatter";

const registryPath = path.join(process.cwd(), "public", "r", "registry.json");

function normalizeTargetPath(target: string): string {
  return target.replace(/\\/g, "/").replace(/^\//, "");
}

function buildTargetMatchSet(files: Array<{ target?: string }>): {
  targets: string[];
  matchSet: Set<string>;
} {
  const targets = files
    .map((file) => file.target)
    .filter((target): target is string => Boolean(target))
    .map((target) => normalizeTargetPath(target));

  const matchSet = new Set<string>();

  for (const target of targets) {
    matchSet.add(target);

    const withoutExt = target.replace(/\.(tsx|ts|jsx|js)$/, "");
    matchSet.add(withoutExt);

    if (withoutExt.endsWith("/index")) {
      matchSet.add(withoutExt.slice(0, -"/index".length));
    }
  }

  return { targets, matchSet };
}

function isTypeFile(filePath: string): boolean {
  const normalized = filePath.replace(/\\/g, "/");
  const name = path.posix.basename(normalized);
  return (
    name === "types.ts" ||
    name === "types.tsx" ||
    name.endsWith(".types.ts") ||
    normalized.includes("/types/")
  );
}

async function readFileContent(file: { content?: string; path: string }) {
  if (file.content !== undefined) {
    return file.content;
  }

  const absolutePath = path.join(process.cwd(), file.path);
  return fs.readFile(absolutePath, "utf-8");
}

describe("directory block validation", () => {
  it("validates directory block structure and internal imports", async () => {
    const registry = JSON.parse(await fs.readFile(registryPath, "utf-8"));
    const directoryBlocks = blocksMetadata.filter(
      (block) => block.type === "directory"
    );

    const errors: string[] = [];

    for (const block of directoryBlocks) {
      const item = registry.items.find((entry: any) => entry.name === block.id);
      if (!item) {
        errors.push(
          [
            `Missing Registry Item: ${block.id}`,
            "",
            "  Suggested Fix: Regenerate registry.json to include this block",
          ].join("\n")
        );
        continue;
      }

      const { targets, matchSet } = buildTargetMatchSet(item.files || []);
      const expectedEntry = `components/${block.id}/index`;
      const hasIndexEntry = matchSet.has(expectedEntry);
      const hasPageEntry = (item.files || []).some(
        (file: { type?: string }) => file.type === "registry:page"
      );
      if (!hasIndexEntry && !hasPageEntry) {
        errors.push(
          [
            `Missing Directory Entry Point: ${block.id}`,
            `  Expected: ${expectedEntry}(.ts|.tsx|.js|.jsx) or a registry:page entry`,
            "",
            "  Suggested Fix: Add an index.tsx or an app/page entry to the directory block",
          ].join("\n")
        );
      }

      for (const file of item.files || []) {
        const filePath = file.path || file.target || "";
        if (isTypeFile(filePath) && file.type !== "registry:file") {
          errors.push(
            [
              `Type File Mismatch: ${block.id}`,
              `  File: ${filePath}`,
              `  Received: ${file.type}`,
              "",
              "  Suggested Fix: Set type to \"registry:file\" for type definitions",
            ].join("\n")
          );
        }
      }

      const blockPrefixes = [
        `@/components/${block.id}`,
        `@/lib/${block.id}`,
        `@/hooks/${block.id}`,
      ];

      for (const file of item.files || []) {
        const content = await readFileContent(file);
        const analysis = analyzeImports(content, file.path);

        if (analysis.relativeImports.length > 0) {
          const baseTarget = file.target;
          if (!baseTarget) {
            errors.push(
              [
                `Relative Imports Unresolved: ${block.id}`,
                `  File: ${file.path}`,
                `  Imports: ${analysis.relativeImports.join(", ")}`,
                "",
                "  Suggested Fix: Ensure registry targets exist for this file",
              ].join("\n")
            );
          } else {
            const baseDir = path.posix.dirname(baseTarget.replace(/\\/g, "/"));
            const unresolved = analysis.relativeImports.filter((specifier) => {
              const resolved = path.posix.normalize(
                path.posix.join(baseDir, specifier)
              );
              return !matchSet.has(resolved);
            });

            if (unresolved.length > 0) {
              errors.push(
                [
                  `Relative Imports Unresolved: ${block.id}`,
                  `  File: ${file.path}`,
                  `  Imports: ${unresolved.join(", ")}`,
                  "",
                  "  Suggested Fix: Ensure the relative import targets are included in the block files",
                ].join("\n")
              );
            }
          }
        }

        for (const moduleSpecifier of analysis.internalImports) {
          const usesBlockImport = blockPrefixes.some((prefix) =>
            moduleSpecifier.startsWith(prefix)
          );
          if (!usesBlockImport) {
            continue;
          }

          const normalized = moduleSpecifier.replace(/^@\//, "");
          if (!matchSet.has(normalized)) {
            errors.push(
              formatImportResolutionError({
                blockId: block.id,
                filePath: file.path,
                importPath: moduleSpecifier,
                expectedTargets: targets,
              })
            );
          }
        }
      }
    }

    if (errors.length > 0) {
      throw new Error(errors.join("\n\n---\n\n"));
    }
  });
});
