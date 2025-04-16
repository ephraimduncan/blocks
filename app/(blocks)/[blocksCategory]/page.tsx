import { Block } from "@/components/ui/block";
import { CustomMDX } from "@/components/ui/mdx";
import { blocksCategoriesMetadata } from "@/content/blocks-categories";
import { getBlocks } from "@/lib/blocks";
import { ArrowLeftIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ blocksCategory: string }>;
};

type Params = {
  params: Promise<{
    blocksCategory: string;
  }>;
};

export async function generateStaticParams() {
  return blocksCategoriesMetadata.map((category) => ({
    blocksCategory: category.id,
  }));
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const blocksCategory = blocksCategoriesMetadata.find(
    (category) => category.id === params.blocksCategory
  );

  if (!blocksCategory) {
    return {};
  }

  return {
    title: `${blocksCategory.name} blocks built with React and Tailwind CSS for shadcn/ui - blocks.so`,
    description: `A collection of beautiful and accessible ${blocksCategory.name} blocks built with React and Tailwind CSS for shadcn/ui.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { blocksCategory } = await params;
  const blocks = getBlocks({ blocksCategory });

  if (!blocks) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <div className="space-y-2">
        <Link
          href="/"
          className="text-sm text-muted-foreground flex gap-1 items-center"
        >
          <ArrowLeftIcon className="w-3 h-3" />
          <span>Back to blocks</span>
        </Link>

        <h1 className="text-3xl font-bold tracking-tight">{blocks.name}</h1>
      </div>

      <div className="mt-0 overflow-hidden px-px pb-px">
        {blocks.blocksData?.map((block) => (
          <Block
            key={block.blocksId}
            name={block.name}
            code={block.codeSource}
            meta={block.meta}
            codeSource={
              block.codeSource && (
                <CustomMDX source={block.codeSource.toString()} />
              )
            }
            blocksId={block.blocksId}
            blocksCategory={block.blocksCategory}
            fileTree={block.fileTree}
          />
        ))}
      </div>
    </div>
  );
}
