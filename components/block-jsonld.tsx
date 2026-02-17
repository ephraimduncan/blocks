import { siteConfig } from '@/config';

type BlockJsonLdProps = {
  blockName: string;
  blockId: string;
  blocksCategory: string;
  categoryName: string;
};

export function BlockJsonLd({
  blockName,
  blockId,
  blocksCategory,
  categoryName,
}: BlockJsonLdProps) {
  const blockUrl = `${siteConfig.url}/${blocksCategory}/${blockId}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${blockName} - ${categoryName} shadcn/ui block`,
    description: `Copy and paste ${blockName} from blocks.so. A free shadcn/ui ${categoryName.toLowerCase()} block built with React, Tailwind CSS, and Next.js.`,
    url: blockUrl,
    mainEntityOfPage: blockUrl,
    author: {
      '@type': 'Person',
      name: 'Ephraim Duncan',
      url: 'https://ephraimduncan.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'blocks.so',
      url: siteConfig.url,
    },
    about: ['shadcn/ui', 'React', 'Tailwind CSS', `${categoryName} components`],
  };

  return <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>;
}
