import type { MetadataRoute } from 'next';

import { blocksCategoriesMetadata } from '@/content/blocks-categories';
import { blocksMetadata } from '@/content/blocks-metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: 'https://blocks.so',
    changeFrequency: 'weekly' as const,
    priority: 1,
  };

  const blocksPages = blocksCategoriesMetadata.map((category) => ({
    url: `https://blocks.so/${category.id}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blockPages = blocksMetadata.map((block) => ({
    url: `https://blocks.so/${block.category}/${block.id}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [home, ...blocksPages, ...blockPages];
}
