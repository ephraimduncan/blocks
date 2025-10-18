import { siteConfig } from "@/config";

export function SeoJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "blocks.so - Shadcn Blocks",
        url: siteConfig.url,
        description: siteConfig.description,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.url}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        name: "blocks.so",
        url: siteConfig.url,
        logo: `${siteConfig.url}/opengraph-image.png`,
        sameAs: [siteConfig.links.twitter, siteConfig.links.github],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Support",
          url: siteConfig.links.github,
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "blocks.so - Shadcn UI Blocks Library",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description: siteConfig.description,
        url: siteConfig.url,
        author: {
          "@type": "Person",
          name: "Ephraim Duncan",
          url: "https://ephraimduncan.com",
        },
        keywords:
          "shadcn blocks, shadcn ui blocks, shadcn/ui components, React UI blocks, Tailwind CSS components, Next.js components, free UI blocks",
        softwareVersion: "1.0",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          ratingCount: "1",
        },
      },
      {
        "@type": "ItemList",
        name: "Shadcn UI Block Categories",
        description: "Collection of shadcn/ui block categories",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "File Upload Blocks",
            url: `${siteConfig.url}/file-upload`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Form Layout Blocks",
            url: `${siteConfig.url}/form-layout`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Login Blocks",
            url: `${siteConfig.url}/login`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Stats Blocks",
            url: `${siteConfig.url}/stats`,
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Grid List Blocks",
            url: `${siteConfig.url}/grid-list`,
          },
          {
            "@type": "ListItem",
            position: 6,
            name: "Dialog Blocks",
            url: `${siteConfig.url}/dialogs`,
          },
          {
            "@type": "ListItem",
            position: 7,
            name: "Sidebar Blocks",
            url: `${siteConfig.url}/sidebar`,
          },
          {
            "@type": "ListItem",
            position: 8,
            name: "AI Blocks",
            url: `${siteConfig.url}/ai`,
          },
          {
            "@type": "ListItem",
            position: 9,
            name: "Table Blocks",
            url: `${siteConfig.url}/tables`,
          },
        ],
      },
    ],
  } as const;

  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
}
