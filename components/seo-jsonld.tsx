import { siteConfig } from "@/config";
import { blocksCategoriesMetadata } from "@/content/blocks-categories";

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
          "shadcn blocks, shadcn ui blocks, shadcn/ui components, React UI blocks, Tailwind CSS components, Next.js components, free UI blocks, shadcn, shadcn ui, radix ui",
        softwareVersion: "1.0",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          ratingCount: "1",
        },
      },
      {
        "@type": "ItemList",
        name: "Free Shadcn UI Blocks",
        description:
          "60+ free shadcn/ui blocks and components for React, Tailwind CSS, and Next.js",
        numberOfItems: blocksCategoriesMetadata.length,
        itemListElement: blocksCategoriesMetadata.map((category, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${category.name} Shadcn UI Blocks`,
          description: `Free shadcn/ui ${category.name.toLowerCase()} components and blocks`,
          url: `${siteConfig.url}/${category.id}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What are shadcn blocks?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Shadcn blocks are pre-built, copy-paste UI components built with shadcn/ui, React, and Tailwind CSS. They are ready-to-use building blocks that you can copy directly into your projects without installing any dependencies. blocks.so provides 60+ free shadcn blocks including dialogs, forms, tables, sidebars, login pages, and more.",
            },
          },
          {
            "@type": "Question",
            name: "How do I use shadcn/ui blocks?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Using shadcn blocks is simple: 1) Browse the collection at blocks.so to find the component you need, 2) Click on the block to view the code, 3) Copy the code directly into your React or Next.js project, 4) Customize the styling and functionality as needed. No npm install required - just copy and paste.",
            },
          },
          {
            "@type": "Question",
            name: "Are shadcn blocks free to use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, all shadcn blocks on blocks.so are completely free to use in personal and commercial projects. The blocks are open source and you can use them without attribution. They are built with shadcn/ui, Tailwind CSS, and React.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between shadcn/ui and blocks.so?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "shadcn/ui is a component library that provides individual UI primitives like buttons, inputs, and dialogs. blocks.so provides complete, pre-designed UI blocks built using shadcn/ui components - like full login forms, dashboard sidebars, data tables with sorting, and AI chat interfaces. Think of blocks.so as ready-made combinations of shadcn/ui components.",
            },
          },
          {
            "@type": "Question",
            name: "Do shadcn blocks work with Next.js?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, all shadcn blocks on blocks.so are fully compatible with Next.js (both App Router and Pages Router), as well as other React frameworks like Remix, Vite, and Create React App. The blocks use React and Tailwind CSS, making them framework-agnostic.",
            },
          },
          {
            "@type": "Question",
            name: "What components are available in shadcn blocks?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "blocks.so offers 60+ free shadcn blocks across multiple categories including: Dialogs and Modals, File Upload components, Form Layouts, Login and Signup pages, Stats and Dashboard widgets, Grid Lists, Sidebars and Navigation, AI Chat interfaces, and Data Tables. New blocks are added regularly.",
            },
          },
        ],
      },
    ],
  };

  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
}
