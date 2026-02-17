import { siteConfig } from '@/config';

type CategoryItemListJsonLdProps = {
  categoryName: string;
  categoryPath: string;
  items: Array<{ id: string; name: string }>;
};

export function CategoryItemListJsonLd({
  categoryName,
  categoryPath,
  items,
}: CategoryItemListJsonLdProps) {
  const categoryUrl = `${siteConfig.url}${categoryPath}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${categoryName} shadcn/ui blocks`,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    url: categoryUrl,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: `${siteConfig.url}${categoryPath}/${item.id}`,
    })),
  };

  return <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>;
}
