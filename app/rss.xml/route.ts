import {
  generateRegistryRssFeed,
  UrlResolverByItem,
} from "@wandry/analytics-sdk";
import type { NextRequest } from "next/server";

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const baseUrl = new URL(request.url).origin;

  const rssXml = await generateRegistryRssFeed({
    baseUrl,
    blocksUrl: ((item) => {
      /**
       * This is necessary in order to correctly select the link to the block.
       * Since you do not have a separate link to the block, but only to the block category,
       * I made it possible to obtain the category from the block
       */
      return `/${item.name.split("-")?.[0] ?? "uncategorized"}`;
    }) as UrlResolverByItem,
    rss: {
      title: "@blocks",
      description: "Subscribe to @blocks updates",
      link: "https://blocks.so",
      pubDateStrategy: "githubLastEdit",
    },
    github: {
      owner: "ephraimduncan",
      repo: "blocks",
      token: process.env.GITHUB_TOKEN,
    },
  });

  if (!rssXml) {
    return new Response("RSS feed not available", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
