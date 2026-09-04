'use client';

import { ShadcnLogo } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function OpenInPlaygroundButton({
  name,
  className,
}: { name: string } & React.ComponentProps<'a'>) {
  return (
    <a
      aria-label="Open in shadcn playground"
      className={cn(buttonVariants({ variant: 'outline' }), 'gap-1', className)}
      data-umami-event="Open Block in Playground"
      href={`https://play.blocks.so/api/open?url=${
        process.env.NEXT_PUBLIC_BASE_URL || 'https://blocks.so'
      }/r/${name}.json`}
      rel="noreferrer"
      target="_blank"
    >
      Open in{' '}
      <ShadcnLogo className="size-4 text-current" />
    </a>
  );
}
