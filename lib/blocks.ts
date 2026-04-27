import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { blocksCategoriesMetadata } from '@/content/blocks-categories';
import { blocksSource, blocksTree } from '@/content/blocks-data';
import { blocksMetadata } from '@/content/blocks-metadata';

interface BaseItem {
  name: string;
  path: string;
}

export interface FileItem extends BaseItem {
  type: 'file';
  content: string;
}

export interface FolderItem extends BaseItem {
  type: 'folder';
  children: FileTreeItem[];
}

export type FileTreeItem = FileItem | FolderItem;

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
    type?: 'file' | 'directory';
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
      let codeSource: string | undefined;
      let fileTree: FileTreeItem[] | undefined;

      if (block.type === 'directory') {
        fileTree = blocksTree[block.id];
        if (!fileTree || fileTree.length === 0) {
          console.warn(
            `No file tree bundled for directory block: ${block.id}. Run \`bun run generate:blocks-data\`.`
          );
        }
      } else {
        codeSource = blocksSource[block.id];
        if (!codeSource) {
          console.warn(
            `No source bundled for file block: ${block.id}. Run \`bun run generate:blocks-data\`.`
          );
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
    });

  if (categoryMetadata) {
    return {
      name: categoryMetadata.name,
      blocksData,
    };
  }

  return notFound();
}
