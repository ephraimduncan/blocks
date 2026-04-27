#!/usr/bin/env bun
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

interface BlockArgs {
  category: string;
  id: string;
  name: string;
  type: 'file' | 'directory';
  height?: string;
}

const ARG_PREFIX_REGEX = /^--/;
const METADATA_ARRAY_END_REGEX = /(\];)$/m;
const COMPONENTS_OBJECT_END_REGEX = /(\};)$/m;

function writeLine(message = '') {
  process.stdout.write(`${message}\n`);
}

function writeErrorLine(message = '') {
  process.stderr.write(`${message}\n`);
}

function parseArgs(): BlockArgs {
  const args = process.argv.slice(2);
  const parsed: Partial<BlockArgs> = {};

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]?.replace(ARG_PREFIX_REGEX, '');
    const value = args[i + 1];

    if (!(key && value)) {
      continue;
    }

    switch (key) {
      case 'category':
        parsed.category = value;
        break;
      case 'id':
        parsed.id = value;
        break;
      case 'name':
        parsed.name = value;
        break;
      case 'type':
        parsed.type = value as 'file' | 'directory';
        break;
      case 'height':
        parsed.height = value;
        break;
      default:
        break;
    }
  }

  if (!(parsed.category && parsed.id && parsed.name && parsed.type)) {
    writeErrorLine(
      'Usage: bun run scripts/add-block.ts --category <category> --id <block-id> --name <display-name> --type <file|directory> [--height <height>]'
    );
    writeErrorLine('Examples:');
    writeErrorLine(
      '  bun run scripts/add-block.ts --category tables --id table-01 --name "Basic Data Table" --type file'
    );
    writeErrorLine(
      '  bun run scripts/add-block.ts --category forms --id form-01 --name "Contact Form" --type directory --height 600px'
    );
    process.exit(1);
  }

  return parsed as BlockArgs;
}

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

function createFileTypeBlock(newBlockArgs: BlockArgs) {
  const { category, id, name } = newBlockArgs;
  const componentName = toPascalCase(id);
  const componentPath = join(
    process.cwd(),
    `content/components/${category}/${id}.tsx`
  );

  // Create basic component template
  const componentContent = `import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ${componentName}() {
  return (
    <div className="flex items-center justify-center p-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>${name}</CardTitle>
          <CardDescription>
            This is a placeholder component. Update with your implementation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">
            Example Button
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
`;

  writeFileSync(componentPath, componentContent);
  writeLine(`✓ Created ${componentPath}`);
}

function createDirectoryTypeBlock(newBlockArgs: BlockArgs) {
  const { category, id, name } = newBlockArgs;
  const componentName = toPascalCase(id);
  const blockDir = join(process.cwd(), `content/components/${category}/${id}`);

  // Create directory
  mkdirSync(blockDir, { recursive: true });

  // Create main index.tsx
  const indexPath = join(blockDir, 'index.tsx');
  const indexContent = `import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ${componentName}() {
  return (
    <div className="flex items-center justify-center p-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>${name}</CardTitle>
          <CardDescription>
            This is a placeholder component. Update with your implementation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">
            Example Button
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
`;

  writeFileSync(indexPath, indexContent);
  writeLine(`✓ Created ${blockDir}/ with index.tsx`);
}

function runGenerateMarkdown(): Promise<void> {
  return new Promise((resolve, reject) => {
    writeLine('Running bun run generate:markdown...');
    const child = spawn('bun', ['run', 'generate:markdown'], {
      stdio: 'inherit',
      cwd: process.cwd(),
    });

    child.on('close', (code) => {
      if (code === 0) {
        writeLine('✓ Generated MDX documentation');
        resolve();
      } else {
        reject(new Error(`generate:markdown failed with code ${code}`));
      }
    });

    child.on('error', reject);
  });
}

const blockArgs = parseArgs();

writeLine(
  `Adding ${blockArgs.type} block: ${blockArgs.name} (ID: ${blockArgs.id}) to category: ${blockArgs.category}`
);

try {
  // 1. Create component files
  if (blockArgs.type === 'file') {
    createFileTypeBlock(blockArgs);
  } else {
    createDirectoryTypeBlock(blockArgs);
  }

  // 2. Update blocks-metadata.ts
  const metadataPath = join(process.cwd(), 'content/blocks-metadata.ts');
  let metadataContent = readFileSync(metadataPath, 'utf8');

  const newEntry = `
  {
    id: "${blockArgs.id}",
    category: categoryIds.${toPascalCase(blockArgs.category)},
    name: "${blockArgs.name}",${
      blockArgs.height ? `\n    iframeHeight: "${blockArgs.height}",` : ''
    }
    type: "${blockArgs.type}",
  },`;

  // Find the end of the array and insert before the closing bracket
  const arrayEndMatch = metadataContent.match(METADATA_ARRAY_END_REGEX);
  if (arrayEndMatch) {
    metadataContent = metadataContent.replace(
      arrayEndMatch[0],
      `${newEntry}\n${arrayEndMatch[0]}`
    );
  }

  writeFileSync(metadataPath, metadataContent);
  writeLine('✓ Updated content/blocks-metadata.ts');

  // 3. Update blocks-components.tsx
  const componentsPath = join(process.cwd(), 'content/blocks-components.tsx');
  let componentsContent = readFileSync(componentsPath, 'utf8');

  const componentName = toPascalCase(blockArgs.id);
  const newComponentEntry = `  '${blockArgs.id}': dynamic(() => import('./components/${blockArgs.category}/${blockArgs.id}'), { ssr: false }),\n`;

  // Find the end of the object and insert before the closing brace
  const objectEndMatch = componentsContent.match(COMPONENTS_OBJECT_END_REGEX);
  if (objectEndMatch) {
    componentsContent = componentsContent.replace(
      objectEndMatch[0],
      newComponentEntry + objectEndMatch[0]
    );
  }

  writeFileSync(componentsPath, componentsContent);
  writeLine('✓ Updated content/blocks-components.tsx');

  // 4. Update category index.ts
  const categoryIndexPath = join(
    process.cwd(),
    `content/components/${blockArgs.category}/index.ts`
  );
  let categoryIndexContent = readFileSync(categoryIndexPath, 'utf8');

  const exportEntry = `export { default as ${componentName} } from "./${blockArgs.id}";\n`;
  categoryIndexContent += exportEntry;

  writeFileSync(categoryIndexPath, categoryIndexContent);
  writeLine(`✓ Updated content/components/${blockArgs.category}/index.ts`);

  // 5. Generate markdown for file-type blocks
  if (blockArgs.type === 'file') {
    await runGenerateMarkdown();
  }

  writeLine(
    `\n🎉 Successfully added ${blockArgs.type} block "${blockArgs.name}"!`
  );
  writeLine('\nNext steps:');
  if (blockArgs.type === 'file') {
    writeLine(
      `1. Update the component implementation in content/components/${blockArgs.category}/${blockArgs.id}.tsx`
    );
  } else {
    writeLine(
      `1. Update the component implementation in content/components/${blockArgs.category}/${blockArgs.id}/`
    );
    writeLine('2. Add additional component files as needed in the directory');
  }
  writeLine("3. Run 'bun run generate:registry' to update the registry");
} catch (error) {
  writeErrorLine('Error adding block:');
  writeErrorLine(
    error instanceof Error ? (error.stack ?? error.message) : String(error)
  );
  process.exit(1);
}
