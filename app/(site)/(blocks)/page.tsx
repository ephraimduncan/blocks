import { IconBrandReact, IconCode } from '@tabler/icons-react';
import Link from 'next/link';

import { BreadcrumbJsonLd } from '@/components/breadcrumb-jsonld';
import { blocksCategoriesMetadata } from '@/content/blocks-categories';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Shadcn Blocks' }]} />

      <div className="w-full">
        <div className="pt-16 pb-12">
          <h1 className="max-w-[20ch] text-balance font-semibold text-5xl text-foreground tracking-tight md:text-7xl">
            Building blocks for the web
          </h1>

          <p className="mt-5 max-w-[48ch] text-pretty text-lg text-zinc-500 dark:text-zinc-400">
            Copy-paste React components built with shadcn/ui and Tailwind CSS.
            Open source, accessible, production-ready.
          </p>

          <div className="mt-6 flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-sky-50 py-1 pr-2.5 pl-1.5 font-medium text-sky-700 text-sm ring-1 ring-sky-200/60 dark:bg-sky-950/50 dark:text-sky-300 dark:ring-sky-800">
              <IconBrandReact className="size-4 text-sky-500 dark:text-sky-400" />
              All React frameworks
            </div>

            <div className="flex items-center gap-1.5 rounded-full bg-zinc-50 py-1 pr-2.5 pl-1.5 font-medium text-sm text-zinc-600 ring-1 ring-zinc-200/60 dark:bg-white/5 dark:text-zinc-300 dark:ring-white/[0.06]">
              <IconCode className="size-4 text-zinc-400 dark:text-zinc-500" />
              Open Source
            </div>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blocksCategoriesMetadata.map((block) => (
            <Link href={`/${block.id}`} key={`${block.id}-${block.name}`}>
              <div className="group space-y-3">
                <div className="relative grid aspect-square w-full place-items-center overflow-hidden rounded-2xl bg-zinc-50 ring-1 ring-black/5 transition-shadow duration-200 group-hover:shadow-lg group-hover:shadow-zinc-200/50 group-hover:ring-black/10 dark:bg-white/[0.025] dark:shadow-none dark:ring-white/[0.06] dark:group-hover:shadow-none dark:group-hover:ring-white/10">
                  <img
                    alt={`${block.name} - Free shadcn/ui ${block.name.toLowerCase()} blocks and components`}
                    className={cn(block.thumbnailCustomClasses, 'dark:hidden')}
                    src={`/thumbnails/${block.id}.svg`}
                  />
                  <img
                    alt=""
                    aria-hidden="true"
                    className={cn(
                      block.thumbnailCustomClasses,
                      'hidden dark:block'
                    )}
                    src={`/thumbnails/${block.id}-dark.svg`}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="font-medium text-[0.9375rem] text-foreground tracking-tight">
                    {block.name}
                  </div>
                  <div className="rounded-full bg-zinc-100 px-2 py-0.5 font-medium text-xs text-zinc-600 tabular-nums ring-1 ring-zinc-200/60 dark:bg-white/5 dark:text-zinc-300 dark:ring-white/[0.06]">
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
