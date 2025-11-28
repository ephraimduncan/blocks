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
      const category = item.categories?.[0] ?? "uncategorized";
      return `/${category}#${item.name}`;
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
