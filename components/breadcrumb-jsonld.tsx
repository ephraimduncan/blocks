import { siteConfig } from "@/config";

type BreadcrumbItem = {
  name: string;
  path?: string;
};

type BreadcrumbJsonLdProps = {
  items: BreadcrumbItem[];
};

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path ? `${siteConfig.url}${item.path}` : siteConfig.url,
    })),
  };

  return (
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  );
}
