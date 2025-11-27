import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config";
import { blocksCategoriesMetadata } from "@/content/blocks-categories";
import { CodeIcon, ReactIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

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
      {/* remove the mb-10 */}
      <div className="mb-10">
        <div className="gap-4 mt-20">
          <h1 className="mb-4 font-semibold text-6xl/[1.1] leading-tight text-foreground tracking-tight md:text-7xl/[1.1] text-center">
            Building Blocks
            <br />
            for the Web
          </h1>

          <p className="mb-6 text-lg text-[#898989] text-center">
            Clean, modern building blocks. Copy and paste into your apps.
          </p>
        </div>

        <div className="flex w-fit mx-auto items-center gap-2">
          <div className="flex items-center gap-0.5 border border-[#93E2FF] bg-[#93E2FF33] rounded-full px-2.5 py-1 text-sm text-[#535353] font-medium leading-normal tracking-tight">
            <ReactIcon className="size-5 text-[#23B2E7]" />
            Works on all React frameworks
          </div>

          <div className="flex items-center gap-0.5 border border-[#E1E1E1] bg-[#E1E1E133] rounded-full px-2.5 py-1 text-sm text-[#535353] font-medium leading-normal tracking-tight">
            <CodeIcon className="size-5 text-[#B1B1B1] stroke-2.5" />
            Open Source
          </div>
        </div>
      </div>

      <div
        className={cn(
          "grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-10",
          "mt-20"
        )}
      >
        {blocksCategoriesMetadata.map((block) => (
          <Link href={`/${block.id}`} key={`${block.id}-${block.name}`}>
            <div className="space-y-4">
              <div className="w-full border border-border rounded-xl aspect-square flex items-center justify-center bg-[#F4F4F4]">
                <block.thumbnail className="w-full h-full object-cover grayscale" />
              </div>

              <div className="flex flex-col gap-1 text-center">
                <div className="font-medium text-[18px] leading-none tracking-tight">
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
