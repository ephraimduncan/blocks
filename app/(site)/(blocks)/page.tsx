import type { Metadata } from 'next';
import Link from 'next/link';

import { BreadcrumbJsonLd } from '@/components/breadcrumb-jsonld';
import { CodeIcon, ReactIcon } from '@/components/icons';
import { siteConfig } from '@/config';
import { blocksCategoriesMetadata } from '@/content/blocks-categories';

export const metadata: Metadata = {
  title: 'Shadcn Blocks - 60+ Free shadcn/ui Components for React',
  description: siteConfig.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Shadcn Blocks - 60+ Free shadcn/ui Components for React',
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: 'blocks.so',
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'blocks.so - Free shadcn/ui blocks and components',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shadcn Blocks - 60+ Free shadcn/ui Components for React',
    description: siteConfig.description,
    creator: '@ephraimduncan_',
    site: '@ephraimduncan_',
    images: [siteConfig.ogImage],
  },
};

export default function Home() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Shadcn Blocks' }]} />

      <div className="w-full">
        <div className="pt-16 pb-12">
          <h1 className="max-w-[20ch] text-balance font-semibold text-5xl text-foreground tracking-tight md:text-7xl">
            Building blocks for the web
          </h1>

          <p className="mt-5 max-w-[48ch] text-pretty text-lg text-zinc-500">
            Copy-paste React components built with shadcn/ui and Tailwind CSS.
            Open source, accessible, production-ready.
          </p>

          <div className="mt-6 flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-sky-50 py-1 pr-2.5 pl-1.5 font-medium text-sky-700 text-sm ring-1 ring-sky-200/60">
              <ReactIcon className="size-4 text-sky-500" />
              All React frameworks
            </div>

            <div className="flex items-center gap-1.5 rounded-full bg-zinc-50 py-1 pr-2.5 pl-1.5 font-medium text-sm text-zinc-600 ring-1 ring-zinc-200/60">
              <CodeIcon className="size-4 text-zinc-400" />
              Open Source
            </div>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blocksCategoriesMetadata.map((block) => (
            <Link href={`/${block.id}`} key={`${block.id}-${block.name}`}>
              <div className="group space-y-3">
                <div className="grid aspect-square w-full place-items-center rounded-2xl bg-zinc-50 ring-1 ring-black/5 transition-shadow duration-200 group-hover:shadow-lg group-hover:shadow-zinc-200/50 group-hover:ring-black/10">
                  <img
                    alt={`${block.name} - Free shadcn/ui ${block.name.toLowerCase()} blocks and components`}
                    className={block.thumbnailCustomClasses}
                    src={`/thumbnails/${block.id}.svg`}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="font-medium text-[0.9375rem] text-foreground tracking-tight">
                    {block.name}
                  </div>
                  <div className="rounded-full bg-zinc-100 px-2 py-0.5 font-medium text-xs text-zinc-600 tabular-nums ring-1 ring-zinc-200/60">
                    {block.count} blocks
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
