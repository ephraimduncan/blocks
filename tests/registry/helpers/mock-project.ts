import fs from "fs/promises";
import path from "path";
import os from "os";
import { pathToFileURL } from "url";

const fixturesDir = path.join(
  process.cwd(),
  "tests",
  "registry",
  "fixtures"
);

async function pathExists(targetPath: string): Promise<boolean> {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function writeJson(targetPath: string, data: unknown): Promise<void> {
  await fs.writeFile(targetPath, JSON.stringify(data, null, 2));
}

export type MockProject = {
  root: string;
  cleanup: () => Promise<void>;
};

export async function createMockProject(): Promise<MockProject> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "blocks-registry-"));

  const packageJsonPath = path.join(fixturesDir, "mock-package.json");
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf-8"));

  await writeJson(path.join(root, "package.json"), packageJson);

  const componentsConfig = {
    $schema: "https://ui.shadcn.com/schema.json",
    style: "new-york",
    rsc: true,
    tsx: true,
    tailwind: {
      config: "tailwind.config.ts",
      css: "app/globals.css",
      baseColor: "neutral",
      cssVariables: true,
      prefix: "",
    },
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui",
      lib: "@/lib",
      hooks: "@/hooks",
    },
    iconLibrary: "lucide",
  };

  await writeJson(path.join(root, "components.json"), componentsConfig);

  const tsconfig = {
    compilerOptions: {
      target: "ES2020",
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "react-jsx",
      baseUrl: ".",
      paths: {
        "@/*": ["./*"]
      }
    },
    include: ["**/*.ts", "**/*.tsx"],
    exclude: ["node_modules"]
  };

  await writeJson(path.join(root, "tsconfig.json"), tsconfig);

  await fs.writeFile(
    path.join(root, "next.config.js"),
    "module.exports = { reactStrictMode: true };\n"
  );

  await fs.mkdir(path.join(root, "app"), { recursive: true });
  await fs.writeFile(
    path.join(root, "app", "page.tsx"),
    "export default function Page() {\n  return <div />;\n}\n"
  );
  await fs.writeFile(
    path.join(root, "app", "globals.css"),
    "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n"
  );

  await fs.writeFile(
    path.join(root, "tailwind.config.ts"),
    [
      "import type { Config } from \"tailwindcss\";",
      "",
      "const config: Config = {",
      "  content: [\"./app/**/*.{ts,tsx}\", \"./components/**/*.{ts,tsx}\"],",
      "  theme: { extend: {} },",
      "  plugins: [],",
      "};",
      "",
      "export default config;",
      "",
    ].join("\n")
  );

  await fs.mkdir(path.join(root, "components", "ui"), { recursive: true });
  await fs.mkdir(path.join(root, "lib"), { recursive: true });

  const sourceUtilsPath = path.join(process.cwd(), "lib", "utils.ts");
  const utilsContent = await fs.readFile(sourceUtilsPath, "utf-8");
  await fs.writeFile(path.join(root, "lib", "utils.ts"), utilsContent);

  return {
    root,
    cleanup: async () => {
      await fs.rm(root, { recursive: true, force: true });
    },
  };
}

export async function ensureNodeModules(projectRoot: string): Promise<void> {
  const nodeModulesPath = path.join(projectRoot, "node_modules");
  const rootNodeModules = path.join(process.cwd(), "node_modules");
  if (!(await pathExists(rootNodeModules))) {
    throw new Error("Root node_modules missing; cannot link for mock project");
  }

  if (!(await pathExists(nodeModulesPath))) {
    await fs.symlink(rootNodeModules, nodeModulesPath, "dir");
    return;
  }

  const requiredPackages = ["clsx", "tailwind-merge"];

  for (const pkg of requiredPackages) {
    const packagePath = path.join(nodeModulesPath, pkg);
    if (await pathExists(packagePath)) {
      continue;
    }

    const sourcePath = path.join(rootNodeModules, pkg);
    if (!(await pathExists(sourcePath))) {
      throw new Error(`Missing ${pkg} in root node_modules`);
    }

    await fs.symlink(sourcePath, packagePath, "dir");
  }
}

export function resolveFixtureUrl(filePath: string): string {
  return pathToFileURL(path.join(fixturesDir, filePath)).toString();
}
