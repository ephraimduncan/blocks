import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlockJsonLd } from '@/components/block-jsonld';
import { BreadcrumbJsonLd } from '@/components/breadcrumb-jsonld';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config';
import { blocksCategoriesMetadata } from '@/content/blocks-categories';
import { blocksMetadata } from '@/content/blocks-metadata';
import { getBlocks } from '@/lib/blocks';

type Params = {
  params: Promise<{
    blocksCategory: string;
    blockId: string;
  }>;
};

export function generateStaticParams() {
  return blocksMetadata.map((block) => ({
    blocksCategory: block.category,
    blockId: block.id,
  }));
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const category = blocksCategoriesMetadata.find(
    (item) => item.id === params.blocksCategory
  );
  const block = blocksMetadata.find(
    (item) =>
      item.category === params.blocksCategory && item.id === params.blockId
  );

  if (!(category && block)) {
    return {};
  }

  const blockName = block.name;
  const categoryName = category.name;
  const title = `${blockName} - Free ${categoryName} shadcn/ui component`;
  const description = `Copy and paste ${blockName} from blocks.so. A free ${categoryName.toLowerCase()} shadcn/ui block built with React, Tailwind CSS, and Next.js.`;
  const canonicalPath = `/${params.blocksCategory}/${params.blockId}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    keywords: [
      blockName.toLowerCase(),
      `${categoryName.toLowerCase()} component`,
      `${categoryName.toLowerCase()} shadcn block`,
      `free ${categoryName.toLowerCase()} component`,
      `${blockName.toLowerCase()} react`,
      `${blockName.toLowerCase()} tailwind`,
      'shadcn/ui component',
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      siteName: 'blocks.so',
      url: `${siteConfig.url}${canonicalPath}`,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${blockName} preview from blocks.so`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@ephraimduncan_',
      site: '@ephraimduncan_',
      images: [siteConfig.ogImage],
    },
  };
}

export default async function BlockPage({ params }: Params) {
  const { blocksCategory, blockId } = await params;
  const categoryBlocks = getBlocks({ blocksCategory });
  const category = blocksCategoriesMetadata.find(
    (item) => item.id === blocksCategory
  );
  const block = categoryBlocks.blocksData.find(
    (item) => item.blocksId === blockId
  );

  if (!(category && block)) {
    notFound();
  }

  const relatedBlocks = categoryBlocks.blocksData
    .filter((item) => item.blocksId !== block.blocksId)
    .slice(0, 6);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Shadcn Blocks' },
          { name: category.name, path: `/${blocksCategory}` },
          { name: block.name, path: `/${blocksCategory}/${block.blocksId}` },
        ]}
      />
      <BlockJsonLd
        blockId={block.blocksId}
        blockName={block.name}
        blocksCategory={blocksCategory}
        categoryName={category.name}
      />

      <article className="py-6 md:py-10">
        <div className="space-y-4">
          <Link
            className="font-medium text-sm text-zinc-500 transition-colors hover:text-foreground"
            href={`/${blocksCategory}`}
          >
            Back to {category.name}
          </Link>
          <h1 className="text-balance font-semibold text-3xl tracking-tight md:text-5xl">
            {block.name}
          </h1>
          <p className="text-pretty text-base text-zinc-500 md:text-lg">
            Free {category.name.toLowerCase()} component built with shadcn/ui,
            React, Tailwind CSS, and Next.js. Use it as a copy-paste block or
            add it directly from the blocks registry.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href={`/${blocksCategory}#${block.blocksId}`}>
              Preview in category
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/preview/${block.blocksId}`} target="_blank">
              Open full preview
            </Link>
          </Button>
        </div>

        <section className="mt-10 rounded-2xl bg-zinc-50 p-6 ring-1 ring-black/5">
          <h2 className="font-semibold text-xl">Install this block</h2>
          <p className="mt-2 text-muted-foreground text-sm">
            Add this block to your project with the shadcn CLI.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-white px-4 py-3 text-sm ring-1 ring-black/5">
            <code>{`npx shadcn@latest add @blocks-so/${block.blocksId}`}</code>
          </pre>
        </section>

        <section className="mt-10">
          <h2 className="font-semibold text-xl">
            Related {category.name} blocks
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {relatedBlocks.map((related) => (
              <Link
                className="rounded-xl bg-zinc-50 p-4 ring-1 ring-black/5 transition-all duration-200 hover:shadow-md hover:shadow-zinc-200/50 hover:ring-black/10"
                href={`/${blocksCategory}/${related.blocksId}`}
                key={related.blocksId}
              >
                <p className="font-medium">{related.name}</p>
                <p className="mt-1 text-muted-foreground text-sm">
                  View code, preview, and copy instructions
                </p>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
