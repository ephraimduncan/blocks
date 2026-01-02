import fs from "fs/promises";
import path from "path";
import { describe, it } from "vitest";
import { analyzeImports } from "../helpers/import-analyzer";
import {
  formatImportResolutionError,
  formatArrayDiff,
} from "../helpers/diff-formatter";

const registryPath = path.join(process.cwd(), "public", "r", "registry.json");
const libUtilsPath = path.join(process.cwd(), "lib", "utils.ts");

async function loadRegistry(): Promise<any> {
  return JSON.parse(await fs.readFile(registryPath, "utf-8"));
}

async function readFileContent(file: { content?: string; path: string }) {
  if (file.content !== undefined) {
    return file.content;
  }

  const absolutePath = path.join(process.cwd(), file.path);
  return fs.readFile(absolutePath, "utf-8");
}

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

function isUiImport(moduleSpecifier: string): boolean {
  return moduleSpecifier.startsWith("@/components/ui/");
}

function isAllowedSharedImport(moduleSpecifier: string): boolean {
  return moduleSpecifier === "@/lib/utils";
}

describe("import resolution", () => {
  it("resolves internal imports and external dependencies", async () => {
    const registry = await loadRegistry();
    const errors: string[] = [];

    for (const item of registry.items || []) {
      const { targets, matchSet } = buildTargetMatchSet(item.files || []);
      const dependencies = new Set<string>(item.dependencies || []);
      const devDependencies = new Set<string>(item.devDependencies || []);

      for (const file of item.files || []) {
        const content = await readFileContent(file);
        const analysis = analyzeImports(content, file.path);

        if (analysis.relativeImports.length > 0) {
          const baseTarget = file.target;
          if (!baseTarget) {
            errors.push(
              [
                `Relative Imports Unresolved: ${item.name}`,
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
                  `Relative Imports Unresolved: ${item.name}`,
                  `  File: ${file.path}`,
                  `  Imports: ${unresolved.join(", ")}`,
                  "",
                  "  Suggested Fix: Ensure the relative import targets are included in the registry item files",
                ].join("\n")
              );
            }
          }
        }

        for (const moduleSpecifier of analysis.internalImports) {
          if (isUiImport(moduleSpecifier)) {
            continue;
          }

          if (isAllowedSharedImport(moduleSpecifier)) {
            try {
              await fs.access(libUtilsPath);
            } catch {
              errors.push(
                [
                  `Missing Shared Dependency: ${item.name}`,
                  `  Import: ${moduleSpecifier}`,
                  "",
                  "  Suggested Fix: Ensure lib/utils.ts is present in the consumer project",
                ].join("\n")
              );
            }
            continue;
          }

          const normalized = moduleSpecifier.replace(/^@\//, "");
          if (!matchSet.has(normalized)) {
            errors.push(
              formatImportResolutionError({
                blockId: item.name,
                filePath: file.path,
                importPath: moduleSpecifier,
                expectedTargets: targets,
              })
            );
          }
        }

        if (analysis.externalPackages.length > 0) {
          const missing = analysis.externalPackages.filter(
            (pkg) => !dependencies.has(pkg) && !devDependencies.has(pkg)
          );

          if (missing.length > 0) {
            const declared = Array.from(
              new Set<string>([...dependencies, ...devDependencies])
            ).sort();
            errors.push(
              [
                `Missing External Dependencies: ${item.name}`,
                `  Uses: ${analysis.externalPackages.join(", ")}`,
                `  Declared: ${JSON.stringify(declared)}`,
                `  Missing: ${JSON.stringify(missing)}`,
                "",
                formatArrayDiff(
                  "dependencies",
                  declared,
                  declared.concat(missing).sort()
                ),
                "",
                `  Suggested Fix: Add ${missing
                  .map((dep) => `"${dep}"`)
                  .join(", ")} to dependencies`,
              ].join("\n")
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
