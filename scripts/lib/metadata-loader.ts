import fs from "fs/promises";
import path from "path";
import { pathToFileURL } from "url";
import { BlockMetadata, GeneratorConfig } from "./types";

export class MetadataLoader {
  private config: GeneratorConfig;

  constructor(config: GeneratorConfig) {
    this.config = config;
  }

  async loadMetadata(): Promise<Map<string, BlockMetadata>> {
    try {
      console.log(`Loading metadata from ${this.config.metadataFile}...`);

      const metadataPath = path.resolve(this.config.metadataFile);
      await fs.access(metadataPath);

      const metadataModule = await import(pathToFileURL(metadataPath).href);
      const blocksMetadata = metadataModule.blocksMetadata;

      if (!Array.isArray(blocksMetadata)) {
        throw new Error(
          `Expected blocksMetadata to be an array in ${this.config.metadataFile
          }, got ${typeof blocksMetadata}`
        );
      }

      console.log(`Loaded ${blocksMetadata.length} metadata entries`);

      const metadataMap = new Map<string, BlockMetadata>();
      const errors: string[] = [];

      for (const [index, item] of blocksMetadata.entries()) {
        const validationError = this.validateMetadataItem(item, index);
        if (validationError) {
          errors.push(validationError);
          continue;
        }

        if (metadataMap.has(item.id)) {
          errors.push(
            `Duplicate block ID found: "${item.id}" at index ${index}`
          );
          continue;
        }

        metadataMap.set(item.id, item);
      }

      if (errors.length > 0) {
        console.warn(`Found ${errors.length} metadata validation errors:`);
        errors.forEach((error) => console.warn(`  - ${error}`));
      }

      console.log(`Successfully loaded ${metadataMap.size} valid blocks`);
      return metadataMap;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("ENOENT")) {
          throw new Error(
            `Metadata file not found: ${this.config.metadataFile}. ` +
            `Please ensure the file exists and contains exported blocksMetadata array.`
          );
        } else if (error.message.includes("Cannot resolve module")) {
          throw new Error(
            `Failed to import metadata file: ${this.config.metadataFile}. ` +
            `Ensure you are running this script with TypeScript support (e.g., 'tsx scripts/generate-registry.ts').`
          );
        }
      }

      throw new Error(
        `Error loading metadata file ${this.config.metadataFile}: ${error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  private validateMetadataItem(item: any, index: number): string | null {
    if (!item || typeof item !== "object") {
      return `Invalid metadata entry at index ${index}: expected object, got ${typeof item}`;
    }

    if (!item.id || typeof item.id !== "string") {
      return `Invalid metadata entry at index ${index}: missing or invalid 'id' field`;
    }

    if (!item.name || typeof item.name !== "string") {
      return `Invalid metadata entry at index ${index} (id: ${item.id}): missing or invalid 'name' field`;
    }

    if (!item.category || typeof item.category !== "string") {
      return `Invalid metadata entry at index ${index} (id: ${item.id}): missing or invalid 'category' field`;
    }

    if (item.type && !["file", "directory"].includes(item.type)) {
      return `Invalid metadata entry at index ${index} (id: ${item.id}): 'type' must be 'file' or 'directory'`;
    }

    return null;
  }

  formatTitle(filename: string): string {
    return filename
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  getBlockMetadata(
    blockId: string,
    metadataMap: Map<string, BlockMetadata>
  ): {
    title: string;
    metadata: BlockMetadata | null;
  } {
    const metadata = metadataMap.get(blockId);

    if (!metadata) {
      console.warn(
        `Warning: Metadata not found for block ID "${blockId}". Using generated title.`
      );
      return {
        title: this.formatTitle(blockId),
        metadata: null,
      };
    }

    return {
      title: metadata.name,
      metadata,
    };
  }
}
