import type { MetadataRoute } from "next";

import { blocksCategoriesMetadata } from "@/content/blocks-categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: "https://blocks.so",
  };

  const blocksPages = blocksCategoriesMetadata.map((category) => ({
    url: `https://blocks.so/${category.id}`,
  }));

  return [home, ...blocksPages];
}
