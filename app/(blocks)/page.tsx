import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config";
import { blocksCategoriesMetadata } from "@/content/blocks-categories";

export const metadata: Metadata = {
  title: "Shadcn Blocks - 60+ Free shadcn/ui Components for React",
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shadcn Blocks - 60+ Free shadcn/ui Components for React",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "blocks.so",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "blocks.so - Free shadcn/ui blocks and components",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadcn Blocks - 60+ Free shadcn/ui Components for React",
    description: siteConfig.description,
    creator: "@ephraimduncan_",
    site: "@ephraimduncan_",
    images: [siteConfig.ogImage],
  },
};

export default function Home() {
  return (
    <div className="w-full">
      <div className="mb-15">
        <h1 className="mb-4 font-bold text-4xl/[1.1] text-foreground tracking-tight md:text-5xl/[1.1]">
          Building Blocks for the Web
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Clean, modern building blocks. Copy and paste into your apps. Works
          with all React frameworks. Open Source. Free forever.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-10">
        {blocksCategoriesMetadata.map((block) => (
          <Link href={`/${block.id}`} key={`${block.id}-${block.name}`}>
            <div className="space-y-3">
              <block.thumbnail className="w-full rounded-lg border border-border grayscale" />
              <div className="flex flex-col gap-1">
                <div className="font-medium text-base leading-none tracking-tight">
                  {block.name}
                </div>
                <div className="text-muted-foreground text-sm">
                  {block.count} blocks
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
