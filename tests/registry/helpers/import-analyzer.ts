import { Project, ScriptKind } from "ts-morph";

export type ImportAnalysis = {
  allImports: string[];
  uiImports: string[];
  internalImports: string[];
  relativeImports: string[];
  externalPackages: string[];
};

const project = new Project({
  useInMemoryFileSystem: true,
  compilerOptions: {
    allowJs: true,
    jsx: 2,
  },
});

const builtinModules = new Set([
  "react",
  "react-dom",
  "react/jsx-runtime",
  "react/jsx-dev-runtime",

  "next",
  "next/app",
  "next/document",
  "next/head",
  "next/image",
  "next/link",
  "next/navigation",
  "next/router",
  "next/script",

  "fs",
  "fs/promises",
  "path",
  "crypto",
  "util",
  "os",
  "stream",
  "events",
  "buffer",
  "url",
  "querystring",
  "http",
  "https",
  "zlib",
  "assert",
]);

const builtinPrefixes = ["@next/", "react/", "next/", "node:"];

function isBuiltinModule(moduleSpecifier: string): boolean {
  if (builtinModules.has(moduleSpecifier)) {
    return true;
  }

  return builtinPrefixes.some((prefix) => moduleSpecifier.startsWith(prefix));
}

function extractPackageName(moduleSpecifier: string): string | null {
  if (moduleSpecifier.startsWith("@")) {
    const parts = moduleSpecifier.split("/");
    if (parts.length >= 2) {
      return `${parts[0]}/${parts[1]}`;
    }
    return parts[0];
  }

  const parts = moduleSpecifier.split("/");
  return parts[0] ?? null;
}

function getUiComponentName(moduleSpecifier: string): string | null {
  if (!moduleSpecifier.startsWith("@/components/ui/")) {
    return null;
  }

  const parts = moduleSpecifier.split("/");
  return parts[parts.length - 1] ?? null;
}

function isRelativeImport(moduleSpecifier: string): boolean {
  return (
    moduleSpecifier.startsWith("./") || moduleSpecifier.startsWith("../")
  );
}

function isInternalAlias(moduleSpecifier: string): boolean {
  return moduleSpecifier.startsWith("@/");
}

function collectModuleSpecifiers(
  content: string,
  virtualPath: string
): string[] {
  const sourceFile = project.createSourceFile(virtualPath, content, {
    overwrite: true,
    scriptKind: ScriptKind.TSX,
  });

  const moduleSpecifiers: string[] = [];

  sourceFile.getImportDeclarations().forEach((declaration) => {
    moduleSpecifiers.push(declaration.getModuleSpecifierValue());
  });

  sourceFile.getExportDeclarations().forEach((declaration) => {
    const specifier = declaration.getModuleSpecifierValue();
    if (specifier) {
      moduleSpecifiers.push(specifier);
    }
  });

  project.removeSourceFile(sourceFile);

  return moduleSpecifiers.filter((specifier) => specifier.length > 0);
}

export function analyzeImports(
  content: string,
  virtualPath: string
): ImportAnalysis {
  const allImports = collectModuleSpecifiers(content, virtualPath);
  const uiImports = new Set<string>();
  const internalImports = new Set<string>();
  const relativeImports = new Set<string>();
  const externalPackages = new Set<string>();

  for (const moduleSpecifier of allImports) {
    if (isRelativeImport(moduleSpecifier)) {
      relativeImports.add(moduleSpecifier);
      continue;
    }

    if (isInternalAlias(moduleSpecifier)) {
      internalImports.add(moduleSpecifier);

      const uiComponent = getUiComponentName(moduleSpecifier);
      if (uiComponent) {
        uiImports.add(uiComponent);
      }

      continue;
    }

    if (isBuiltinModule(moduleSpecifier)) {
      continue;
    }

    const packageName = extractPackageName(moduleSpecifier);
    if (packageName) {
      externalPackages.add(packageName);
    }
  }

  return {
    allImports,
    uiImports: Array.from(uiImports).sort(),
    internalImports: Array.from(internalImports).sort(),
    relativeImports: Array.from(relativeImports).sort(),
    externalPackages: Array.from(externalPackages).sort(),
  };
}
