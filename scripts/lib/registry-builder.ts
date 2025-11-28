import fs from "fs/promises";
import path from "path";
import { DependencyExtractor } from "./dependency-extractor";
import { FileScanner } from "./file-scanner";
import { MetadataLoader } from "./metadata-loader";
import {
  BlockInfo,
  BlockMetadata,
  FileInfo,
  GeneratorConfig,
  Registry,
  RegistryItem,
} from "./types";

export class RegistryBuilder {
  private config: GeneratorConfig;
  private metadataLoader: MetadataLoader;
  private fileScanner: FileScanner;
  private dependencyExtractor: DependencyExtractor;

  constructor(
    config: GeneratorConfig,
    metadataLoader: MetadataLoader,
    fileScanner: FileScanner,
    dependencyExtractor: DependencyExtractor
  ) {
    this.config = config;
    this.metadataLoader = metadataLoader;
    this.fileScanner = fileScanner;
    this.dependencyExtractor = dependencyExtractor;
  }

  async buildRegistry(): Promise<Registry> {
    console.log("Building registry...");

    const metadataMap = await this.metadataLoader.loadMetadata();
    const blocks = await this.discoverBlocks(metadataMap);
    const registryItems = await this.buildRegistryItems(blocks, metadataMap);

    const registry: Registry = {
      $schema: this.config.schema,
      name: this.config.name,
      homepage: this.config.homepage,
      items: registryItems.sort((a, b) => a.name.localeCompare(b.name)),
    };

    console.log(`✓ Built registry with ${registryItems.length} items`);
    return registry;
  }

  private async discoverBlocks(
    metadataMap: Map<string, BlockMetadata>
  ): Promise<BlockInfo[]> {
    console.log("Discovering blocks...");

    const blocks: BlockInfo[] = [];
    const categories = await this.fileScanner.listCategories();

    console.log(
      `Found ${categories.length} categories: ${categories.join(", ")}`
    );

    for (const category of categories) {
      const categoryPath = path.join(
        path.resolve(this.config.componentsDir),
        category
      );
      const entries = await this.fileScanner.listCategoryEntries(categoryPath);

      console.log(`  ${category}: ${entries.length} entries`);

      for (const entryName of entries) {
        try {
          const { blockId, entryPath, isDirectory } =
            await this.fileScanner.getBlockEntry(categoryPath, entryName);

          const { title, metadata } = this.metadataLoader.getBlockMetadata(
            blockId,
            metadataMap
          );
          const description = `A ${title.toLowerCase()} block.`;

          const files = await this.fileScanner.scanBlock(
            entryPath,
            isDirectory,
            blockId
          );

          if (files.length === 0) {
            console.warn(`Warning: No files found for block ${blockId}`);
            continue;
          }

          const filePaths = files.map((f) => f.absolutePath);
          const dependencies =
            this.dependencyExtractor.extractFromFiles(filePaths);

          const blockInfo: BlockInfo = {
            id: blockId,
            title,
            description,
            category,
            files,
            dependencies,
          };

          blocks.push(blockInfo);
        } catch (error) {
          console.error(
            `Error processing block ${entryName} in category ${category}:`,
            error instanceof Error ? error.message : String(error)
          );
        }
      }
    }

    console.log(`✓ Discovered ${blocks.length} blocks`);
    return blocks;
  }

  private async buildRegistryItems(
    blocks: BlockInfo[],
    metadataMap: Map<string, BlockMetadata>
  ): Promise<RegistryItem[]> {
    console.log("Building registry items...");

    const registryItems: RegistryItem[] = [];

    for (const block of blocks) {
      try {
        const registryItem = this.buildRegistryItem(block, metadataMap);
        registryItems.push(registryItem);
      } catch (error) {
        console.error(
          `Error building registry item for block ${block.id}:`,
          error instanceof Error ? error.message : String(error)
        );
      }
    }

    return registryItems;
  }

  private buildRegistryItem(
    block: BlockInfo,
    metadataMap: Map<string, BlockMetadata>
  ): RegistryItem {
    const registryFiles = block.files.map((file) =>
      this.buildRegistryFile(file)
    );

    const registryItem: RegistryItem = {
      name: block.id,
      type: "registry:block",
      title: block.title,
      description: block.description,
      author: this.config.author,
      registryDependencies: block.dependencies.registryDependencies,
      dependencies: block.dependencies.dependencies,
      files: registryFiles,
    };

    const metadata = metadataMap.get(block.id);
    if (metadata) {
      if (metadata.category) {
        registryItem.categories = [metadata.category];
      }
    }

    return registryItem;
  }

  private buildRegistryFile(fileInfo: FileInfo) {
    const registryFile: any = {
      path: fileInfo.sourcePathRelative,
      type: fileInfo.type,
      target: fileInfo.targetPath,
    };

    if (fileInfo.content !== undefined) {
      registryFile.content = fileInfo.content;
    }

    return registryFile;
  }

  async writeRegistry(registry: Registry): Promise<void> {
    console.log("Writing registry files...");

    await fs.writeFile(
      this.config.outputFile,
      JSON.stringify(registry, null, 2)
    );

    console.log(`✓ Wrote main registry to ${this.config.outputFile}`);

    await fs.mkdir(this.config.individualOutputDir, { recursive: true });

    let writtenCount = 0;
    for (const item of registry.items) {
      try {
        const individualItem = {
          $schema: this.config.itemSchema,
          ...item,
        };

        const filename = `${item.name}.json`;
        const filepath = path.join(this.config.individualOutputDir, filename);

        await fs.writeFile(filepath, JSON.stringify(individualItem, null, 2));
        writtenCount++;
      } catch (error) {
        console.error(
          `Error writing individual registry file for ${item.name}:`,
          error instanceof Error ? error.message : String(error)
        );
      }
    }

    console.log(
      `✓ Wrote ${writtenCount} individual registry files to ${this.config.individualOutputDir}/`
    );
  }

  validateRegistry(registry: Registry): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!registry.name) {
      errors.push("Registry name is required");
    }

    if (!registry.homepage) {
      errors.push("Registry homepage is required");
    }

    if (!Array.isArray(registry.items)) {
      errors.push("Registry items must be an array");
      return { isValid: false, errors, warnings };
    }

    const itemNames = new Set<string>();

    for (const [index, item] of registry.items.entries()) {
      if (itemNames.has(item.name)) {
        errors.push(`Duplicate item name "${item.name}" found`);
      } else {
        itemNames.add(item.name);
      }

      if (!item.name) {
        errors.push(`Item at index ${index} is missing name`);
      }

      if (!item.type) {
        errors.push(`Item "${item.name}" is missing type`);
      }

      if (!Array.isArray(item.files) || item.files.length === 0) {
        errors.push(`Item "${item.name}" has no files`);
      }

      for (const [fileIndex, file] of (item.files || []).entries()) {
        if (!file.path) {
          errors.push(
            `Item "${item.name}" file at index ${fileIndex} is missing path`
          );
        }

        if (!file.type) {
          errors.push(
            `Item "${item.name}" file at index ${fileIndex} is missing type`
          );
        }
      }

      if (!item.description) {
        warnings.push(`Item "${item.name}" is missing description`);
      }

      if (
        !item.registryDependencies ||
        item.registryDependencies.length === 0
      ) {
        if (!item.dependencies || item.dependencies.length === 0) {
          warnings.push(
            `Item "${item.name}" has no dependencies - this might be unusual`
          );
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }
}
