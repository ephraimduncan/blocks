#!/usr/bin/env bun

import fs from 'node:fs/promises';
import { builtinModules } from 'node:module';
import path from 'node:path';
import { blocksMetadata } from '@/content/blocks-metadata';

const root = 'content/components';
const out = 'public/r';
const skipPattern = /\.(d|test|spec|stories)\.[jt]sx?$/;
const builtins: Record<string, true> = Object.fromEntries(
  [
    ...builtinModules,
    ...builtinModules.map((name) => `node:${name}`),
    'react',
    'react-dom',
    'react/jsx-runtime',
    'react/jsx-dev-runtime',
    'next',
  ].map((name) => [name, true])
);
const metadata = new Map(blocksMetadata.map((block) => [block.id, block]));

type File = {
  path: string;
  type:
    | 'registry:component'
    | 'registry:file'
    | 'registry:hook'
    | 'registry:lib'
    | 'registry:page';
  target: string;
  content: string;
};

type Item = {
  name: string;
  type: 'registry:block';
  title: string;
  description: string;
  author: string;
  registryDependencies: string[];
  dependencies: string[];
  files: File[];
  categories?: string[];
};

async function walk(dir: string): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(file)));
    else if (
      entry.isFile() &&
      /\.[jt]sx?$/.test(entry.name) &&
      !skipPattern.test(entry.name)
    )
      files.push(file);
  }
  return files;
}

function place(file: string, dir: string | undefined, id: string) {
  const parts = path.relative(root, file).replaceAll('\\', '/').split('/');
  const special = parts.findIndex(
    (part) => part === 'app' || part === 'lib' || part === 'hooks'
  );
  if (special !== -1) {
    const name = parts[special];
    return {
      type:
        name === 'app'
          ? 'registry:page'
          : name === 'lib'
            ? 'registry:lib'
            : 'registry:hook',
      target: `${name}/${parts.slice(special + 1).join('/')}`,
    } as const;
  }
  if (!dir)
    return {
      type: 'registry:component',
      target: `components/${path.basename(file)}`,
    } as const;
  const relative = path.relative(dir, file).replaceAll('\\', '/');
  const name = path.basename(file);
  const types =
    name === 'types.ts' ||
    name === 'types.tsx' ||
    name.endsWith('.types.ts') ||
    file.includes('/types/');
  return {
    type: types ? 'registry:file' : 'registry:component',
    target: `components/${id}/${relative}`,
  } as const;
}

function rewrite(code: string, type: File['type'], id: string) {
  const base =
    type === 'registry:lib' || type === 'registry:hook'
      ? `@/lib/${id}`
      : `@/components/${id}`;
  return code.replace(
    /import\s+(type\s+)?({[^}]+}|\*\s+as\s+\w+|\w+)\s+from\s+["'](\.\.\/|\.\/)((?![/]).+)["']/g,
    (_match, typeWord, imported, _prefix, relative) =>
      `import ${typeWord ?? ''}${imported} from '${base}/${relative}'`
  );
}

function addDep(name: string, registry: Set<string>, packages: Set<string>) {
  if (name.startsWith('@/components/ui/')) {
    registry.add(name.split('/').pop()!);
    return;
  }
  if (name.startsWith('.') || name.startsWith('/') || name.startsWith('@/'))
    return;
  if (
    builtins[name] ||
    name.startsWith('react/') ||
    name.startsWith('next/') ||
    name.startsWith('@next/')
  )
    return;
  packages.add(
    name.startsWith('@')
      ? name.split('/').slice(0, 2).join('/')
      : name.split('/')[0]
  );
}

const items: Item[] = [];
const categories = (await fs.readdir(root, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
  .map((entry) => entry.name)
  .sort();

for (const category of categories) {
  const dir = path.join(root, category);
  const entries = (await fs.readdir(dir, { withFileTypes: true }))
    .filter(
      (entry) =>
        !entry.name.startsWith('.') &&
        !entry.name.startsWith('index.') &&
        (entry.isDirectory() || isSource(entry.name))
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of entries) {
    const source = path.join(dir, entry.name);
    const id = entry.isDirectory()
      ? entry.name
      : path.basename(entry.name, path.extname(entry.name));
    const meta = metadata.get(id);
    const title =
      meta?.name ??
      id
        .split('-')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ');
    const registry = new Set<string>();
    const packages = new Set<string>();
    const paths = entry.isDirectory() ? await walk(source) : [source];
    const files: File[] = [];

    for (const file of paths) {
      const code = await fs.readFile(file, 'utf8');
      for (const match of code.matchAll(/\bfrom\s+["']([^"']+)["']/g))
        addDep(match[1], registry, packages);
      const { type, target } = place(
        file,
        entry.isDirectory() ? source : undefined,
        id
      );
      files.push({
        path: file.replaceAll('\\', '/'),
        type,
        target,
        content: rewrite(code, type, entry.isDirectory() ? id : ''),
      });
    }

    items.push({
      name: id,
      type: 'registry:block',
      title,
      description: `A ${title.toLowerCase()} block.`,
      author: 'ephraim duncan <https://ephraimduncan.com>',
      registryDependencies: [...registry].sort(),
      dependencies: [...packages].sort(),
      files,
      ...(meta?.category ? { categories: [meta.category] } : {}),
    });
  }
}

items.sort((a, b) => a.name.localeCompare(b.name));
const all = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: 'blocks',
  homepage: 'https://blocks.so',
  items,
};
await fs.mkdir(out, { recursive: true });
await fs.writeFile(
  path.join(out, 'registry.json'),
  JSON.stringify(all, null, 2)
);
await Promise.all(
  items.map((item) =>
    fs.writeFile(
      path.join(out, `${item.name}.json`),
      JSON.stringify(
        { $schema: 'https://ui.shadcn.com/schema/registry-item.json', ...item },
        null,
        2
      )
    )
  )
);
console.log(
  `Wrote ${items.length} registry items (${items.reduce((sum, item) => sum + item.files.length, 0)} files)`
);
