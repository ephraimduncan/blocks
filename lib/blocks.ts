import { blocksCategoriesMetadata } from "@/content/blocks-categories";
import { blocksMetadata } from "@/content/blocks-metadata";
import fs from "fs";
import { notFound } from "next/navigation";
import path from "path";
import { ReactNode } from "react";

type Metadata = {
  title: string;
  publishedAt?: string;
  summary?: string;
  image?: string;
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return {
      metadata: {},
      content: fileContent.trim(),
    };
  }

  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");
    metadata[key.trim() as keyof Metadata] = value;
  });

  return {
    metadata: metadata as Metadata,
    content,
  };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const blocksCategory = path.basename(file, path.extname(file));
    return {
      metadata,
      blocksCategory,
      content,
    };
  });
}

export function getBlocksMDX(blocksCategory: string) {
  return getMDXData(
    path.join(process.cwd(), "content", "markdown", blocksCategory)
  );
}

interface BaseItem {
  name: string;
  path: string;
}

export interface FileItem extends BaseItem {
  type: "file";
  content: string;
}

export interface FolderItem extends BaseItem {
  type: "folder";
  children: FileTreeItem[];
}

export type FileTreeItem = FileItem | FolderItem;

function generateFileTree(
  dirPath: string,
  basePath: string = dirPath
): FileTreeItem[] {
  const items: FileTreeItem[] = [];
  try {
    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
      console.warn(`Directory not found or is not a directory: ${dirPath}`);
      return [];
    }
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith(".")) {
        continue;
      }

      const entryPath = path.join(dirPath, entry.name);
      const relativePath = path.relative(basePath, entryPath);

      if (entry.isDirectory()) {
        items.push({
          name: entry.name,
          path: relativePath,
          type: "folder",
          children: generateFileTree(entryPath, basePath),
        });
      } else if (entry.isFile()) {
        try {
          const content = fs.readFileSync(entryPath, "utf-8");
          items.push({
            name: entry.name,
            path: relativePath,
            type: "file",
            content: content,
          });
        } catch (readError) {
          console.error(`Error reading file ${entryPath}:`, readError);
          items.push({
            name: entry.name,
            path: relativePath,
            type: "file",
            content: `// Error reading file: ${(readError as Error).message}`,
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }

  items.sort((a, b) => {
    if (a.type === "folder" && b.type === "file") return -1;
    if (a.type === "file" && b.type === "folder") return 1;
    return a.name.localeCompare(b.name);
  });
  return items;
}

export interface BlocksProps {
  name: string;
  code?: string | ReactNode; // Keep for potential future use or consistency
  codeSource?: string | ReactNode; // Primarily for type: 'file'
  fileTree?: FileTreeItem[]; // Use the discriminated union type
  copyCode?: ReactNode; // This seems unused in Block.tsx, maybe remove?
  blocksId: string;
  blocksCategory: string;
  meta?: {
    iframeHeight?: string;
    type?: "file" | "directory";
    sourcePath?: string;
  };
}

export function getBlocks(params: { blocksCategory: string }) {
  const categoryMetadata = blocksCategoriesMetadata.find(
    (metadata) => metadata.id === params.blocksCategory
  );

  const blocksData: BlocksProps[] = [];
  blocksMetadata
    .filter((blocks) => blocks.category === params.blocksCategory)
    .forEach((block) => {
      try {
        let codeSource: string | ReactNode | undefined = undefined;
        let fileTree: FileTreeItem[] | undefined = undefined;

        if (block.type === "directory") {
          const blockDirPath = path.join(
            process.cwd(),
            "content",
            "components",
            block.category,
            block.id
          );

          console.log(blockDirPath);

          fileTree = generateFileTree(blockDirPath);

          if (fileTree.length === 0) {
            console.warn(
              `No files found or error generating file tree for directory block: ${block.id}`
            );
          }
        } else {
          codeSource = getBlocksMDX(block.category).find(
            (b) => b.blocksCategory === block.id
          )?.content;
          if (!codeSource) {
            console.warn(`MDX content not found for file block: ${block.id}`);
          }
        }

        blocksData.push({
          name: block.name,
          blocksId: block.id,
          blocksCategory: block.category,
          meta: {
            iframeHeight: block.iframeHeight,
            type: block.type,
          },
          ...(codeSource && { codeSource }),
          ...(fileTree && { fileTree }),
        });
      } catch (err) {
        console.error(`Error processing block ${block.id}:`, err);
      }
    });

  if (categoryMetadata) {
    return {
      name: categoryMetadata.name,
      blocksData: blocksData,
    };
  }

  return notFound();
}
