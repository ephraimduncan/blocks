import fs from "fs/promises";
import path from "path";
import { ImportTransformer } from "./import-transformer";
import { FileInfo, GeneratorConfig, RegistryItemType } from "./types";

export class FileScanner {
  private config: GeneratorConfig;
  private importTransformer: ImportTransformer;

  constructor(config: GeneratorConfig, importTransformer: ImportTransformer) {
    this.config = config;
    this.importTransformer = importTransformer;
  }

  async scanBlock(
    blockPath: string,
    isDirectory: boolean,
    blockId?: string
  ): Promise<FileInfo[]> {
    if (isDirectory) {
      return this.scanDirectory(blockPath, blockId);
    } else {
      return this.scanSingleFile(blockPath);
    }
  }

  private async scanSingleFile(filePath: string): Promise<FileInfo[]> {
    const fileInfo = await this.processFile(filePath);

    return [fileInfo];
  }

  private async scanDirectory(
    dirPath: string,
    blockId?: string
  ): Promise<FileInfo[]> {
    const files: FileInfo[] = [];
    await this.scanDirectoryRecursive(dirPath, dirPath, files, blockId);

    return files;
  }

  private async scanDirectoryRecursive(
    currentDir: string,
    rootDir: string,
    files: FileInfo[],
    blockId?: string
  ): Promise<void> {
    try {
      const entries = await fs.readdir(currentDir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);

        if (entry.isDirectory()) {
          await this.scanDirectoryRecursive(fullPath, rootDir, files, blockId);
        } else if (entry.isFile() && this.isSourceFile(entry.name)) {
          const fileInfo = await this.processFile(fullPath, rootDir, blockId);

          files.push(fileInfo);
        }
      }
    } catch (error) {
      console.warn(
        `Warning: Failed to scan directory ${currentDir}:`,
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  private async processFile(
    filePath: string,
    rootDir?: string,
    blockId?: string
  ): Promise<FileInfo> {
    const absolutePath = path.resolve(filePath);
    const relativePath = path.relative(
      path.resolve(this.config.componentsDir),
      absolutePath
    );
    const sourcePathRelative = path
      .join(this.config.componentsDir, relativePath)
      .replace(/\\/g, "/");

    const { type, targetPath } = this.determineFileTypeAndTarget(
      absolutePath,
      rootDir,
      blockId
    );

    const transformedContent = await this.importTransformer.transformImports(
      absolutePath,
      type,
      blockId
    );

    return {
      absolutePath,
      relativePath: relativePath.replace(/\\/g, "/"),
      sourcePathRelative,
      targetPath: targetPath.replace(/\\/g, "/"),
      type,
      content: transformedContent,
    };
  }

  private determineFileTypeAndTarget(
    filePath: string,
    rootDir?: string,
    blockId?: string
  ): {
    type: RegistryItemType;
    targetPath: string;
  } {
    const relativePath = path.relative(
      path.resolve(this.config.componentsDir),
      filePath
    );
    const pathParts = relativePath.split(path.sep);
    const fileName = path.basename(filePath);

    const specialDirs = ["app", "lib", "hooks"];
    const specialDirIndex = pathParts.findIndex((part) =>
      specialDirs.includes(part)
    );

    if (specialDirIndex !== -1) {
      const specialDir = pathParts[specialDirIndex];
      const pathAfterSpecialDir = pathParts
        .slice(specialDirIndex + 1)
        .join("/");

      switch (specialDir) {
        case "app":
          return {
            type: "registry:page",
            targetPath: path
              .join("app", pathAfterSpecialDir)
              .replace(/\\/g, "/"),
          };

        case "lib":
          return {
            type: "registry:lib",
            targetPath: path
              .join("lib", pathAfterSpecialDir)
              .replace(/\\/g, "/"),
          };

        case "hooks":
          return {
            type: "registry:hook",
            targetPath: path
              .join("hooks", pathAfterSpecialDir)
              .replace(/\\/g, "/"),
          };
      }
    }

    // For directory blocks with blockId, prefix paths with blockId
    if (rootDir && blockId) {
      const relativeToRoot = path.relative(rootDir, filePath);

      // Detect type files
      if (this.isTypeFile(filePath)) {
        return {
          type: "registry:file",
          targetPath: `components/${blockId}/${relativeToRoot}`.replace(
            /\\/g,
            "/"
          ),
        };
      }

      if (relativeToRoot.includes("lib/")) {
        return {
          type: "registry:lib",
          targetPath: `lib/${blockId}/${path.basename(filePath)}`.replace(
            /\\/g,
            "/"
          ),
        };
      }

      if (relativeToRoot.includes("hooks/")) {
        return {
          type: "registry:hook",
          targetPath: `hooks/${blockId}/${path.basename(filePath)}`.replace(
            /\\/g,
            "/"
          ),
        };
      }

      // All other files in directory blocks get prefixed with blockId
      return {
        type: "registry:component",
        targetPath: `components/${blockId}/${relativeToRoot}`.replace(
          /\\/g,
          "/"
        ),
      };
    }

    // Legacy handling for directory blocks without blockId (shouldn't happen)
    if (rootDir) {
      const relativeToRoot = path.relative(rootDir, filePath);

      if (relativeToRoot.includes("lib/")) {
        return {
          type: "registry:lib",
          targetPath: path
            .join("lib", path.basename(filePath))
            .replace(/\\/g, "/"),
        };
      }

      if (relativeToRoot.includes("hooks/")) {
        return {
          type: "registry:hook",
          targetPath: path
            .join("hooks", path.basename(filePath))
            .replace(/\\/g, "/"),
        };
      }

      return {
        type: "registry:component",
        targetPath: path.join("components", relativeToRoot).replace(/\\/g, "/"),
      };
    }

    // Single-file blocks - no prefix needed
    return {
      type: "registry:component",
      targetPath: path.join("components", fileName).replace(/\\/g, "/"),
    };
  }

  private isTypeFile(filePath: string): boolean {
    const fileName = path.basename(filePath);
    return (
      fileName === "types.ts" ||
      fileName === "types.tsx" ||
      fileName.endsWith(".types.ts") ||
      filePath.includes("/types/")
    );
  }

  private isSourceFile(filename: string): boolean {
    const validExtensions = [".tsx", ".ts", ".jsx", ".js"];
    const extension = path.extname(filename).toLowerCase();

    if (!validExtensions.includes(extension)) {
      return false;
    }

    const skipFiles = [
      "index.d.ts",
      ".d.ts",
      ".test.ts",
      ".test.tsx",
      ".spec.ts",
      ".spec.tsx",
      ".stories.ts",
      ".stories.tsx",
    ];

    return !skipFiles.some((skip) => filename.includes(skip));
  }

  async getBlockEntry(
    categoryPath: string,
    entryName: string
  ): Promise<{
    blockId: string;
    entryPath: string;
    isDirectory: boolean;
  }> {
    const entryPath = path.join(categoryPath, entryName);
    const stats = await fs.stat(entryPath);

    const blockId = stats.isDirectory()
      ? entryName
      : path.basename(entryName, path.extname(entryName));

    return {
      blockId,
      entryPath,
      isDirectory: stats.isDirectory(),
    };
  }

  async listCategories(): Promise<string[]> {
    const componentsPath = path.resolve(this.config.componentsDir);

    try {
      const entries = await fs.readdir(componentsPath, { withFileTypes: true });

      return entries
        .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
        .map((entry) => entry.name)
        .sort();
    } catch (error) {
      throw new Error(
        `Failed to read components directory ${componentsPath}: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  async listCategoryEntries(categoryPath: string): Promise<string[]> {
    try {
      const entries = await fs.readdir(categoryPath, { withFileTypes: true });

      return entries
        .filter((entry) => {
          if (entry.name.startsWith(".") || entry.name.startsWith("index.")) {
            return false;
          }

          return entry.isDirectory() || this.isSourceFile(entry.name);
        })
        .map((entry) => entry.name)
        .sort();
    } catch (error) {
      console.warn(
        `Warning: Failed to read category directory ${categoryPath}:`,
        error instanceof Error ? error.message : String(error)
      );
      return [];
    }
  }
}
