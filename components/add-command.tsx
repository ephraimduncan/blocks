'use client';

import { CheckIcon } from 'lucide-react';
import { toast } from 'sonner';
import { ShadcnLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useCopyToClipboard } from '@/hooks/use-copy';

export function AddCommand({ name }: { name: string }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <Button
      className="pl-2"
      onClick={() => {
        copyToClipboard(`npx shadcn@latest add @blocks-so/${name}`);
        toast.success('npx command copied to clipboard');
      }}
      variant="outline"
    >
      {isCopied ? (
        <CheckIcon />
      ) : (
        <ShadcnLogo />
      )}
      {`@blocks-so/${name}`}
    </Button>
  );
}
