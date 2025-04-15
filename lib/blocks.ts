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

export interface BlocksProps {
  name: string;
  code?: string | ReactNode;
  codeSource?: string | ReactNode;
  fileTree?: FileTreeItem[];
  copyCode?: ReactNode;
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
        if (block.type === "directory") {
          console.log(`Skipping directory block: ${block.id}`);
          return;
        }

        let codeSource: string | ReactNode | undefined = undefined;

        codeSource = getBlocksMDX(block.category).find(
          (b) => b.blocksCategory === block.id
        )?.content;
        if (!codeSource) {
          console.warn(`MDX content not found for file block: ${block.id}`);
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
