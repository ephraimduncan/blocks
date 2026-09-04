// https://github.com/shadcn-ui/alpine-registry/blob/main/components/registry-setup.tsx
'use client';

import { CheckIcon, CopyIcon } from 'lucide-react';
import type * as React from 'react';
import { ShadcnLogo } from '@/components/icons';
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
import { cn } from '@/lib/utils';

export function RegistrySetup({
  className,
}: React.ComponentProps<typeof Button>) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            className={cn(className, 'rounded-full')}
            size="default"
            variant="ghost"
          />
        }
      >
        <ShadcnLogo className="size-4" />
        Registry
      </DialogTrigger>
      <DialogContent className="md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Setup Registry</DialogTitle>
          <DialogDescription>
            Use the code below to configure the @blocks-so registry for your
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
            <code>npx shadcn@latest add @blocks-so/[component-name]</code>
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
  "@blocks-so": "https://blocks.so/r/{name}.json"
}
`;
