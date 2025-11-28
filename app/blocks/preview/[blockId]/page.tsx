import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { blocksComponents } from "@/content/blocks-components";

type Params = {
  params: Promise<{
    blockId: string;
  }>;
};

export function generateStaticParams() {
  const blockIds = Object.keys(blocksComponents);

  return blockIds.map((blockId) => ({
    blockId,
  }));
}

export default async function BlockPreviewPage({ params }: Params) {
  const { blockId } = await params;
  const BlocksComponent = blocksComponents[blockId];

  if (!BlocksComponent) {
    notFound();
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center">
      <BlocksComponent />
    </div>
  );
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Blocks.so — Preview",
};
