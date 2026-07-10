'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function OpenInPlaygroundButton({
  name,
  className,
}: { name: string } & React.ComponentProps<'a'>) {
  return (
    <a
      aria-label="Open in shadcn playground"
      className={cn(
        buttonVariants(),
        'h-8 gap-1 rounded-lg bg-black text-white hover:bg-black hover:text-white dark:bg-white dark:text-black',
        className
      )}
      data-umami-event="Open Block in Playground"
      href={`https://play.blocks.so/api/open?url=${
        process.env.NEXT_PUBLIC_BASE_URL || 'https://blocks.so'
      }/r/${name}.json`}
      rel="noreferrer"
      target="_blank"
    >
      Open in{' '}
      <svg
        aria-hidden="true"
        className="size-4 text-current"
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
    </a>
  );
}
