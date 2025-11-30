import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

interface RegistryItem {
  name: string;
  title?: string;
  description?: string;
  categories?: string[];
  files?: Array<{ path: string }>;
}

interface Registry {
  items: RegistryItem[];
}

function getLastCommitDate(filePath: string): string {
  try {
    const date = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', filePath],
      { encoding: 'utf-8' }
    ).trim();
    return date || new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const registryPath = 'public/r/registry.json';

if (!fs.existsSync(registryPath)) {
  // biome-ignore lint/suspicious/noConsole: CLI script needs console output
  console.error(
    `Error: ${registryPath} not found. Run generate:registry first.`
  );
  process.exit(1);
}

const registry: Registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

const items = registry.items
  .map((item) => {
    const filePath = item.files?.[0]?.path ?? '';
    const category = item.categories?.[0] ?? 'uncategorized';
    const dateStr = getLastCommitDate(filePath);
    const date = new Date(dateStr);
    const title = escapeXml(item.title || item.name);
    const description = escapeXml(item.description || `A ${item.name} block.`);
    const link = `https://blocks.so/${category}#${item.name}`;

    return { date, title, description, link };
  })
  .sort((a, b) => a.date.getTime() - b.date.getTime())
  .map(
    ({ date, title, description, link }) => `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <description>${description}</description>
      <pubDate>${date.toUTCString()}</pubDate>
      <guid>${link}</guid>
    </item>`
  )
  .join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>@blocks</title>
    <link>https://blocks.so</link>
    <description>Subscribe to @blocks updates</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

fs.writeFileSync('public/rss.xml', rss);
// biome-ignore lint/suspicious/noConsole: CLI script needs console output
console.log(`✓ Generated public/rss.xml with ${registry.items.length} items`);
