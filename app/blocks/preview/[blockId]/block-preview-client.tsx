'use client';

import { blocksComponents } from '@/content/blocks-components';

type BlockPreviewClientProps = {
  blockId: string;
};

export function BlockPreviewClient({ blockId }: BlockPreviewClientProps) {
  const BlocksComponent = blocksComponents[blockId];

  if (!BlocksComponent) {
    return null;
  }

  return <BlocksComponent />;
}
