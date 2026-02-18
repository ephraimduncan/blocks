// https://github.com/shadcn-ui/alpine-registry/blob/main/components/registry-setup.tsx
'use client';

import { CheckIcon, CopyIcon } from 'lucide-react';
import type * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCopyToClipboard } from '@/hooks/use-copy';
import { capture } from '@/lib/analytics/capture';
import { cn } from '@/lib/utils';

export function RegistrySetup({
  className,
}: React.ComponentProps<typeof Button>) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(className, 'rounded-full')}
          size="default"
          variant="ghost"
        >
          <svg
            aria-hidden="true"
            className="size-4"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect fill="none" height="256" width="256" />
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              x1="208"
              x2="128"
              y1="128"
              y2="208"
            />
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              x1="192"
              x2="40"
              y1="40"
              y2="192"
            />
          </svg>
          Registry
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Setup Registry</DialogTitle>
          <DialogDescription>
            Use the code below to configure the @blocks registry for your
            project.
          </DialogDescription>
        </DialogHeader>
        <div className="font-medium">
          Copy and paste the code into{' '}
          <code className="font-mono text-foreground">components.json</code>
        </div>
        <div className="relative">
          <Button
            className="absolute top-4 right-4 z-10 size-8 rounded-md bg-background"
            onClick={() => {
              copyToClipboard(registrySetupCode);
              capture('snippet_copied', {
                snippet_type: 'registry_config',
                language: 'json',
                ui_surface: 'registry_dialog',
              });
            }}
            size="icon"
            variant="outline"
          >
            {isCopied ? <CheckIcon /> : <CopyIcon />}
          </Button>
          <div className="min-h-[120px] overflow-x-auto rounded-md bg-muted p-8">
            <pre className="font-mono text-sm">
              <code>{registrySetupCode}</code>
            </pre>
          </div>
        </div>
        <div className="font-medium">
          Then use the following command to add components:
        </div>
        <div className="min-h-[50px] overflow-x-auto rounded-md bg-muted p-8">
          <pre className="font-mono text-sm">
            <code>npx shadcn@latest add @blocks/[component-name]</code>
          </pre>
        </div>
        <div className="font-medium">
          To setup the MCP server, run the following command:
        </div>
        <div className="min-h-[50px] overflow-x-auto rounded-md bg-muted p-8">
          <pre className="font-mono text-sm">
            <code>npx shadcn@latest mcp init</code>
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const registrySetupCode = `"registries": {
  "@blocks": "https://blocks.so/r/{name}.json"
}
`;
