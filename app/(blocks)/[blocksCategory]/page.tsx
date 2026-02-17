import { IconChevronLeft } from '@tabler/icons-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BreadcrumbJsonLd } from '@/components/breadcrumb-jsonld';
import { CategoryItemListJsonLd } from '@/components/category-itemlist-jsonld';
import { Block } from '@/components/ui/block';
import { CustomMDX } from '@/components/ui/mdx';
import { siteConfig } from '@/config';
import { blocksCategoriesMetadata } from '@/content/blocks-categories';
import { getBlocks } from '@/lib/blocks';

type PageProps = {
  params: Promise<{ blocksCategory: string }>;
};

type Params = {
  params: Promise<{
    blocksCategory: string;
  }>;
};

export function generateStaticParams() {
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
      `shadcn ${categoryName.toLowerCase()}`,
      `shadcn ${categoryName.toLowerCase()} blocks`,
      `shadcn/ui ${categoryName.toLowerCase()}`,
      `shadcn/ui ${categoryName.toLowerCase()} components`,
      `shadcn ui ${categoryName.toLowerCase()}`,
      `${categoryName.toLowerCase()} UI blocks`,
      `${categoryName.toLowerCase()} component react`,
      `${categoryName.toLowerCase()} UI tailwind`,
      `React ${categoryName.toLowerCase()} components`,
      `Tailwind ${categoryName.toLowerCase()}`,
      `Next.js ${categoryName.toLowerCase()}`,
      `free ${categoryName.toLowerCase()} blocks`,
      `free ${categoryName.toLowerCase()} component`,
      `copy paste ${categoryName.toLowerCase()}`,
      `${categoryName.toLowerCase()} examples`,
      `${categoryName.toLowerCase()} template`,
      `radix ${categoryName.toLowerCase()}`,
    ],
    openGraph: {
      title: `${categoryName} Shadcn Blocks - ${blockCount} Free shadcn/ui Components`,
      description: `Free shadcn/ui ${categoryName.toLowerCase()} blocks and components built with React, Tailwind CSS, and Next.js. Copy and paste ${blockCount} beautifully designed, accessible ${categoryName.toLowerCase()} UI blocks.`,
      url: `${siteConfig.url}/${params.blocksCategory}`,
      siteName: 'blocks.so',
      type: 'website',
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
      card: 'summary_large_image',
      title: `${categoryName} Shadcn Blocks - ${blockCount} Free Components`,
      description: `Free shadcn/ui ${categoryName.toLowerCase()} blocks built with React, Tailwind CSS, and Next.js. Copy and paste ${blockCount} accessible UI blocks.`,
      creator: '@ephraimduncan_',
      site: '@ephraimduncan_',
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
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Shadcn Blocks' },
          { name: blocks.name, path: `/${blocksCategory}` },
        ]}
      />
      <CategoryItemListJsonLd
        categoryName={blocks.name}
        categoryPath={`/${blocksCategory}`}
        items={blocks.blocksData.map((block) => ({
          id: block.blocksId,
          name: block.name,
        }))}
      />
      <div className="flex flex-col">
        <div className="my-10 flex flex-col items-center justify-center space-y-2">
          <Link
            className="flex items-center gap-0.5 text-muted-foreground text-sm"
            href="/"
          >
            <IconChevronLeft className="size-5 text-[#A6A6A6] " />
            <span className="font-medium text-[#A6A6A6] text-base">
              Back to blocks
            </span>
          </Link>

          <h1 className="font-bold text-3xl/[1.1] tracking-tight sm:text-4xl/[1.1] md:text-5xl/[1.1]">
            {blocks.name}
          </h1>
        </div>

        <div className="mt-0 overflow-hidden px-px pb-px">
          {blocks.blocksData?.map((block) => (
            <Block
              blocksCategory={block.blocksCategory}
              blocksId={block.blocksId}
              code={block.codeSource}
              codeSource={
                block.codeSource && (
                  <CustomMDX source={block.codeSource.toString()} />
                )
              }
              fileTree={block.fileTree}
              key={block.blocksId}
              meta={block.meta}
              name={block.name}
            />
          ))}
        </div>
      </div>
    </>
  );
}
