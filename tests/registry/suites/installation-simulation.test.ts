import fs from "fs/promises";
import http from "http";
import path from "path";
import { AddressInfo } from "net";
import { spawn } from "child_process";
import { describe, it } from "vitest";
import { createMockProject, ensureNodeModules } from "../helpers/mock-project";
import { representativeBlocks } from "../helpers/representative-blocks";

const publicRoot = path.join(process.cwd(), "public");
const registryDir = path.join(process.cwd(), "public", "r");

type CommandResult = {
  code: number | null;
  stdout: string;
  stderr: string;
};

function runCommand(
  command: string,
  args: string[],
  options: { cwd: string; env?: NodeJS.ProcessEnv }
): Promise<CommandResult> {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: { ...process.env, CI: "1", ...(options.env || {}) },
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("close", (code) => {
      resolve({ code, stdout, stderr });
    });
  });
}

async function startRegistryServer(): Promise<{
  baseUrl: string;
  close: () => Promise<void>;
}> {
  const server = http.createServer(async (req, res) => {
    if (!req.url) {
      res.statusCode = 400;
      res.end("Missing request URL");
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const filePath = path.join(publicRoot, url.pathname);

    if (!filePath.startsWith(publicRoot)) {
      res.statusCode = 403;
      res.end("Forbidden");
      return;
    }

    try {
      const content = await fs.readFile(filePath);
      if (filePath.endsWith(".json")) {
        res.setHeader("content-type", "application/json");
      }
      res.statusCode = 200;
      res.end(content);
    } catch (error) {
      res.statusCode = 404;
      res.end("Not found");
    }
  });

  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve());
  });

  const address = server.address() as AddressInfo;
  const baseUrl = `http://127.0.0.1:${address.port}`;

  return {
    baseUrl,
    close: () =>
      new Promise((resolve) => {
        server.close(() => resolve());
      }),
  };
}

async function verifyInstalledFiles(
  projectRoot: string,
  blockId: string
): Promise<string[]> {
  const registryItemPath = path.join(registryDir, `${blockId}.json`);
  const item = JSON.parse(await fs.readFile(registryItemPath, "utf-8"));
  const missing: string[] = [];

  for (const file of item.files || []) {
    if (!file.target) {
      continue;
    }

    const resolvedPath = path.join(projectRoot, file.target);
    try {
      await fs.access(resolvedPath);
    } catch {
      missing.push(file.target);
    }
  }

  return missing;
}

describe("installation simulation", () => {
  it(
    "installs representative blocks into a mock project",
    async () => {
      const server = await startRegistryServer();
      let project: Awaited<ReturnType<typeof createMockProject>> | null = null;

      try {
        project = await createMockProject();

        for (const block of representativeBlocks) {
          const url = `${server.baseUrl}/r/${block.id}.json`;
          const result = await runCommand(
            "bunx",
            ["shadcn", "add", url, "--yes", "--overwrite"],
            { cwd: project.root }
          );

          if (result.code !== 0) {
            throw new Error(
              [
                `Installation failed for ${block.id}`,
                `  Command: bunx shadcn add ${url} --yes --overwrite`,
                `  Exit Code: ${result.code}`,
                `  stdout: ${result.stdout.trim() || "<empty>"}`,
                `  stderr: ${result.stderr.trim() || "<empty>"}`,
              ].join("\n")
            );
          }

          const missing = await verifyInstalledFiles(project.root, block.id);
          if (missing.length > 0) {
            throw new Error(
              [
                `Missing installed files for ${block.id}`,
                `  Missing: ${missing.join(", ")}`,
                "",
                "  Suggested Fix: Ensure registry targets map to real files",
              ].join("\n")
            );
          }
        }

        await ensureNodeModules(project.root);

        const tscPath = path.join(
          process.cwd(),
          "node_modules",
          ".bin",
          "tsc"
        );
        const tscResult = await runCommand(
          tscPath,
          ["--noEmit", "--project", path.join(project.root, "tsconfig.json")],
          { cwd: project.root }
        );

        if (tscResult.code !== 0) {
          throw new Error(
            [
              "TypeScript check failed for mock project",
              `  Exit Code: ${tscResult.code}`,
              `  stdout: ${tscResult.stdout.trim() || "<empty>"}`,
              `  stderr: ${tscResult.stderr.trim() || "<empty>"}`,
            ].join("\n")
          );
        }
      } finally {
        if (project) {
          await project.cleanup();
        }
        await server.close();
      }
    },
    600000
  );
});
