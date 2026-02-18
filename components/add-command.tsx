'use client';

import { CheckIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useCopyToClipboard } from '@/hooks/use-copy';
import { capture } from '@/lib/analytics/capture';

export function AddCommand({
  name,
  category,
}: {
  name: string;
  category: string;
}) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <Button
      className="rounded-lg pl-2!"
      onClick={() => {
        copyToClipboard(`npx shadcn@latest add @blocks/${name}`);
        toast.success('npx command copied to clipboard');
        capture('registry_install_clicked', {
          block_id: name,
          category_id: category,
          ui_surface: 'block_card',
        });
      }}
      size="sm"
      variant="outline"
    >
      {isCopied ? (
        <CheckIcon />
      ) : (
        <svg
          aria-hidden="true"
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
      )}
      {`@blocks/${name}`}
    </Button>
  );
}
