import { Block } from "@/components/ui/block";
import { CustomMDX } from "@/components/ui/mdx";
import { blocksCategoriesMetadata } from "@/content/blocks-categories";
import { getBlocks } from "@/lib/blocks";
import { ArrowLeftIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config";

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

  const categoryName = blocksCategory.name;
  const blockCount = blocksCategory.count || 0;

  return {
    title: `${categoryName} Shadcn Blocks - ${blockCount} Free shadcn/ui ${categoryName} Components`,
    description: `Free shadcn/ui ${categoryName.toLowerCase()} blocks and components built with React, Tailwind CSS, and Next.js. Copy and paste ${blockCount} beautifully designed, accessible ${categoryName.toLowerCase()} UI blocks into your projects.`,
    alternates: { canonical: `/${params.blocksCategory}` },
    keywords: [
      `shadcn ${categoryName.toLowerCase()} blocks`,
      `shadcn/ui ${categoryName.toLowerCase()} components`,
      `${categoryName.toLowerCase()} UI blocks`,
      `React ${categoryName.toLowerCase()} components`,
      `Tailwind ${categoryName.toLowerCase()}`,
      `Next.js ${categoryName.toLowerCase()}`,
      `free ${categoryName.toLowerCase()} blocks`,
    ],
    openGraph: {
      title: `${categoryName} Shadcn Blocks - ${blockCount} Free shadcn/ui Components`,
      description: `Free shadcn/ui ${categoryName.toLowerCase()} blocks and components built with React, Tailwind CSS, and Next.js. Copy and paste ${blockCount} beautifully designed, accessible ${categoryName.toLowerCase()} UI blocks.`,
      url: `${siteConfig.url}/${params.blocksCategory}`,
      siteName: "blocks.so",
      type: "website",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${categoryName} shadcn/ui blocks - blocks.so`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} Shadcn Blocks - ${blockCount} Free Components`,
      description: `Free shadcn/ui ${categoryName.toLowerCase()} blocks built with React, Tailwind CSS, and Next.js. Copy and paste ${blockCount} accessible UI blocks.`,
      creator: "@ephraimduncan_",
      site: "@ephraimduncan_",
      images: [siteConfig.ogImage],
    },
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
