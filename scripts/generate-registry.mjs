import fs from "fs/promises";
import path from "path";
import { Project } from "ts-morph";

const COMPONENTS_DIR = "content/components";
const METADATA_FILE = "content/blocks-metadata.ts";
const OUTPUT_FILE = "registry.json";
const AUTHOR = "ephraim duncan <https://ephraimduncan.com>";
const SCHEMA = "https://ui.shadcn.com/schema/registry.json";
const HOMEPAGE = "https://blocks.so";
const NAME = "blocks";

function formatTitle(filename) {
  return filename
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function loadMetadata() {
  try {
    const metadataModule = await import(path.resolve(METADATA_FILE));
    const blocksMetadata = metadataModule.blocksMetadata;

    if (!Array.isArray(blocksMetadata)) {
      console.error(
        `Error: Expected blocksMetadata to be an array in ${METADATA_FILE}`
      );
      process.exit(1);
    }

    const metadataMap = new Map();
    for (const item of blocksMetadata) {
      if (item.id && item.name) {
        metadataMap.set(item.id, item.name);
      } else {
        console.warn(
          `Warning: Invalid metadata entry found in ${METADATA_FILE}:`,
          item
        );
      }
    }
    return metadataMap;
  } catch (error) {
    console.error(
      `Error loading or parsing metadata file ${METADATA_FILE}:`,
      error
    );
    console.error(
      "Ensure you are running this script in an environment that can handle TypeScript imports (e.g., using 'tsx scripts/generate-registry.mjs')."
    );
    process.exit(1);
  }
}

function extractDependencies(project, filePath) {
  const registryDeps = new Set();
  const externalDeps = new Set();

  try {
    const sourceFile = project.addSourceFileAtPath(filePath);

    sourceFile.getImportDeclarations().forEach((importDecl) => {
      const moduleSpecifier = importDecl.getModuleSpecifierValue();

      if (moduleSpecifier.startsWith("@/components/ui/")) {
        const componentName = moduleSpecifier.split("/").pop();
        if (componentName) {
          registryDeps.add(componentName);
        }
      } else if (
        !moduleSpecifier.startsWith(".") &&
        !moduleSpecifier.startsWith("@/") &&
        !moduleSpecifier.startsWith("react") &&
        !moduleSpecifier.startsWith("next") &&
        !moduleSpecifier.startsWith("@next/")
      ) {
        externalDeps.add(moduleSpecifier);
      }
    });
  } catch (error) {
    console.error(`Error parsing file ${filePath}:`, error);
  }

  return {
    registryDependencies: [...registryDeps].sort(),
    dependencies: [...externalDeps].sort(),
  };
}

async function findTsxFiles(dirPath, baseSourceDir, baseTargetDir) {
  const files = [];
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(baseSourceDir, fullPath);
    const targetPath = path
      .join(baseTargetDir, relativePath)
      .replace(/\\/g, "/");
    const sourcePathRelative = path
      .join(
        COMPONENTS_DIR,
        path.relative(path.resolve(process.cwd(), COMPONENTS_DIR), fullPath)
      )
      .replace(/\\/g, "/");

    if (entry.isDirectory()) {
      files.push(
        ...(await findTsxFiles(fullPath, baseSourceDir, baseTargetDir))
      );
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      files.push({
        path: sourcePathRelative,
        absolutePath: fullPath,
        target: targetPath,
        type: "registry:block",
      });
    }
  }
  return files;
}

async function generateRegistry() {
  const metadataMap = await loadMetadata();
  const project = new Project();
  const registryItems = [];
  const absoluteComponentsDir = path.resolve(process.cwd(), COMPONENTS_DIR);

  try {
    const categories = await fs.readdir(absoluteComponentsDir, {
      withFileTypes: true,
    });

    for (const categoryDirent of categories) {
      if (categoryDirent.isDirectory()) {
        const category = categoryDirent.name;
        if (category.startsWith(".")) {
          continue;
        }
        const categoryPath = path.join(absoluteComponentsDir, category);
        const entries = await fs.readdir(categoryPath, { withFileTypes: true });

        for (const entry of entries) {
          if (entry.name.startsWith(".") || entry.name.startsWith("index.")) {
            continue;
          }

          const blockId = entry.isDirectory()
            ? entry.name
            : path.basename(entry.name, ".tsx");
          const entryPath = path.join(categoryPath, entry.name);

          let title = metadataMap.get(blockId);
          if (!title) {
            console.warn(
              `Warning: Metadata not found for block ID "${blockId}". Using generated title.`
            );
            title = formatTitle(blockId);
          }
          const description = `A ${title.toLowerCase()} block.`;

          const allRegistryDeps = new Set();
          const allExternalDeps = new Set();
          const blockFiles = [];

          if (entry.isFile() && entry.name.endsWith(".tsx")) {
            // Single-file block
            const absoluteFilePath = entryPath;
            const filePathRelative = path
              .join(COMPONENTS_DIR, category, entry.name)
              .replace(/\\/g, "/");
            const targetPath = path
              .join("/components/blocks", entry.name)
              .replace(/\\/g, "/");

            const { registryDependencies, dependencies } = extractDependencies(
              project,
              absoluteFilePath
            );
            registryDependencies.forEach((dep) => allRegistryDeps.add(dep));
            dependencies.forEach((dep) => allExternalDeps.add(dep));

            blockFiles.push({
              path: filePathRelative,
              type: "registry:block",
              target: targetPath,
            });
          } else if (entry.isDirectory()) {
            const blockSourceDir = entryPath;
            const blockTargetDir = path
              .join("/components/blocks", blockId)
              .replace(/\\/g, "/");

            const foundFiles = await findTsxFiles(
              blockSourceDir,
              blockSourceDir,
              blockTargetDir
            );

            for (const fileInfo of foundFiles) {
              const { registryDependencies, dependencies } =
                extractDependencies(project, fileInfo.absolutePath);
              registryDependencies.forEach((dep) => allRegistryDeps.add(dep));
              dependencies.forEach((dep) => allExternalDeps.add(dep));

              blockFiles.push({
                path: fileInfo.path,
                type: fileInfo.type,
                target: fileInfo.target,
              });
            }
          } else {
            continue;
          }

          if (blockFiles.length > 0) {
            registryItems.push({
              name: blockId,
              type: "registry:block",
              title: title,
              description: description,
              author: AUTHOR,
              registryDependencies: [...allRegistryDeps].sort(),
              dependencies: [...allExternalDeps].sort(),
              files: blockFiles,
            });
          }
        }
      }
    }

    const registry = {
      $schema: SCHEMA,
      name: NAME,
      homepage: HOMEPAGE,
      items: registryItems.sort((a, b) => a.name.localeCompare(b.name)),
    };

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(registry, null, 2));
    console.log(
      `Successfully generated ${OUTPUT_FILE} with ${registryItems.length} items.`
    );
  } catch (error) {
    console.error("Error generating registry:", error);
    process.exit(1);
  }
}

generateRegistry();
