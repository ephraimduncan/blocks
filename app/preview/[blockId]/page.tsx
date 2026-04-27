import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blocksMetadata } from '@/content/blocks-metadata';
import { BlockPreviewClient } from './block-preview-client';

type Params = {
  params: Promise<{
    blockId: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blocksMetadata.map((block) => ({
    blockId: block.id,
  }));
}

export default async function BlockPreviewPage({ params }: Params) {
  const { blockId } = await params;
  const block = blocksMetadata.find((item) => item.id === blockId);

  if (!block) {
    notFound();
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center">
      <BlockPreviewClient blockId={blockId} />
    </div>
  );
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Blocks.so — Preview',
};
