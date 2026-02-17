import { siteConfig } from '@/config';
import { blocksCategoriesMetadata } from '@/content/blocks-categories';

export function SeoJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'blocks.so - Shadcn Blocks',
        url: siteConfig.url,
        description: siteConfig.description,
      },
      {
        '@type': 'Organization',
        name: 'blocks.so',
        url: siteConfig.url,
        logo: `${siteConfig.url}/opengraph-image.png`,
        sameAs: [siteConfig.links.twitter, siteConfig.links.github],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Support',
          url: siteConfig.links.github,
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'blocks.so - Shadcn UI Blocks Library',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: siteConfig.description,
        url: siteConfig.url,
        author: {
          '@type': 'Person',
          name: 'Ephraim Duncan',
          url: 'https://ephraimduncan.com',
        },
        keywords:
          'shadcn blocks, shadcn ui blocks, shadcn/ui components, React UI blocks, Tailwind CSS components, Next.js components, free UI blocks, shadcn, shadcn ui, radix ui',
        softwareVersion: '1.0',
      },
      {
        '@type': 'ItemList',
        name: 'Free Shadcn UI Blocks',
        description:
          '60+ free shadcn/ui blocks and components for React, Tailwind CSS, and Next.js',
        numberOfItems: blocksCategoriesMetadata.length,
        itemListElement: blocksCategoriesMetadata.map((category, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${category.name} Shadcn UI Blocks`,
          description: `Free shadcn/ui ${category.name.toLowerCase()} components and blocks`,
          url: `${siteConfig.url}/${category.id}`,
        })),
      },
    ],
  };

  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
}
