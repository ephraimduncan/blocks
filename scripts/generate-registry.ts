#!/usr/bin/env node
import { Command } from "commander";
import { DependencyExtractor } from "./lib/dependency-extractor";
import { FileScanner } from "./lib/file-scanner";
import { ImportTransformer } from "./lib/import-transformer";
import { MetadataLoader } from "./lib/metadata-loader";
import { RegistryBuilder } from "./lib/registry-builder";
import { SchemaValidator } from "./lib/schema-validator";
import { GeneratorConfig } from "./lib/types";

const DEFAULT_CONFIG: GeneratorConfig = {
  componentsDir: "content/components",
  metadataFile: "content/blocks-metadata.ts",
  outputFile: "public/r/registry.json",
  individualOutputDir: "public/r",
  author: "ephraim duncan <https://ephraimduncan.com>",
  schema: "https://ui.shadcn.com/schema/registry.json",
  itemSchema: "https://ui.shadcn.com/schema/registry-item.json",
  homepage: "https://blocks.so",
  name: "blocks",
};

class RegistryGenerator {
  private config: GeneratorConfig;
  private metadataLoader: MetadataLoader;
  private importTransformer: ImportTransformer;
  private fileScanner: FileScanner;
  private dependencyExtractor: DependencyExtractor;
  private registryBuilder: RegistryBuilder;
  private schemaValidator: SchemaValidator;

  constructor(config: GeneratorConfig) {
    this.config = config;

    this.metadataLoader = new MetadataLoader(config);
    this.importTransformer = new ImportTransformer();
    this.fileScanner = new FileScanner(config, this.importTransformer);
    this.dependencyExtractor = new DependencyExtractor();
    this.registryBuilder = new RegistryBuilder(
      config,
      this.metadataLoader,
      this.fileScanner,
      this.dependencyExtractor
    );
    this.schemaValidator = new SchemaValidator();
  }

  async generate(options: GenerateOptions): Promise<void> {
    const startTime = Date.now();

    try {
      console.log("🚀 Starting registry generation...");
      console.log(`📁 Components directory: ${this.config.componentsDir}`);
      console.log(`📋 Metadata file: ${this.config.metadataFile}`);
      console.log(`📤 Output file: ${this.config.outputFile}`);

      if (options.verbose) {
        console.log("📊 Config:", JSON.stringify(this.config, null, 2));
      }

      const registry = await this.registryBuilder.buildRegistry();

      if (options.validate) {
        console.log("🔍 Validating registry...");
        const validation = this.schemaValidator.validateRegistry(registry);

        if (options.verbose || !validation.isValid) {
          console.log(this.schemaValidator.generateReport(validation));
        }

        if (!validation.isValid) {
          if (options.strict) {
            throw new Error(
              "Registry validation failed and strict mode is enabled"
            );
          } else {
            console.warn(
              "⚠️  Registry has validation issues but continuing..."
            );
          }
        } else {
          console.log("✅ Registry validation passed");
        }
      }

      await this.registryBuilder.writeRegistry(registry);

      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;

      console.log("");
      console.log("📊 Generation Summary:");
      console.log(`   • Total items: ${registry.items.length}`);
      console.log(
        `   • Total files: ${registry.items.reduce(
          (sum, item) => sum + item.files.length,
          0
        )}`
      );
      console.log(`   • Duration: ${duration.toFixed(2)}s`);

      if (options.verbose) {
        const cacheStats = this.importTransformer.getCacheStats();
        console.log(`   • Cache hits: ${cacheStats.size} entries`);
      }

      console.log("");
      console.log("🎉 Registry generation completed successfully!");
    } catch (error) {
      console.error("❌ Registry generation failed:");
      console.error(error instanceof Error ? error.message : String(error));

      if (options.verbose && error instanceof Error && error.stack) {
        console.error("\nStack trace:");
        console.error(error.stack);
      }

      process.exit(1);
    } finally {
      this.dependencyExtractor.cleanup();
      this.importTransformer.clearCache();
    }
  }

  async validate(
    registryPath: string,
    options: ValidateOptions
  ): Promise<void> {
    try {
      console.log(`🔍 Validating registry at ${registryPath}...`);

      const fs = await import("fs/promises");
      const registryContent = await fs.readFile(registryPath, "utf-8");
      const registry = JSON.parse(registryContent);

      const validation = this.schemaValidator.validateRegistry(registry);
      console.log(this.schemaValidator.generateReport(validation));

      if (!validation.isValid) {
        process.exit(1);
      }
    } catch (error) {
      console.error("❌ Validation failed:");
      console.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  }
}

interface GenerateOptions {
  verbose?: boolean;
  validate?: boolean;
  strict?: boolean;
  config?: string;
}

interface ValidateOptions {
  verbose?: boolean;
}

async function main() {
  const program = new Command();

  program
    .name("generate-registry")
    .description("Generate shadcn-compatible component registry")
    .version("2.0.0");

  program
    .command("generate", { isDefault: true })
    .description("Generate the component registry")
    .option("-v, --verbose", "Enable verbose logging")
    .option("--validate", "Validate registry after generation", true)
    .option("--no-validate", "Skip registry validation")
    .option("--strict", "Exit with error if validation fails")
    .option("-c, --config <path>", "Custom configuration file path")
    .action(async (options: GenerateOptions) => {
      let config = DEFAULT_CONFIG;

      if (options.config) {
        try {
          const customConfig = await import(options.config);
          config = { ...DEFAULT_CONFIG, ...customConfig.default };
        } catch (error) {
          console.error(`Failed to load config from ${options.config}:`, error);
          process.exit(1);
        }
      }

      const generator = new RegistryGenerator(config);
      await generator.generate(options);
    });

  program
    .command("validate <registry-file>")
    .description("Validate an existing registry file")
    .option("-v, --verbose", "Enable verbose logging")
    .action(async (registryFile: string, options: ValidateOptions) => {
      const generator = new RegistryGenerator(DEFAULT_CONFIG);
      await generator.validate(registryFile, options);
    });

  program
    .command("info")
    .description("Show registry generator information")
    .action(() => {
      console.log("Registry Generator v2.0.0");
      console.log("");
      console.log(
        "A modern TypeScript-based registry generator for shadcn-compatible components"
      );
      console.log("");
      console.log("Features:");
      console.log("  • Full TypeScript support with type safety");
      console.log("  • Comprehensive dependency extraction");
      console.log("  • Smart import transformation");
      console.log("  • Schema validation against shadcn registry spec");
      console.log("  • Performance optimizations with caching");
      console.log("  • Detailed error reporting and validation");
      console.log("");
      console.log("Configuration:");
      console.log(`  • Components: ${DEFAULT_CONFIG.componentsDir}`);
      console.log(`  • Metadata: ${DEFAULT_CONFIG.metadataFile}`);
      console.log(`  • Output: ${DEFAULT_CONFIG.outputFile}`);
      console.log(`  • Individual: ${DEFAULT_CONFIG.individualOutputDir}/`);
    });

  await program.parseAsync(process.argv);
}

process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection:", error);
  process.exit(1);
});

main().catch(console.error);
