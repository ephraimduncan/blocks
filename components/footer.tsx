import { IconSquareRoundedFilled } from '@tabler/icons-react';
import { siteConfig } from '@/config';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="mx-auto w-full max-w-(--breakpoint-xl) px-4 sm:px-8">
      <footer className="flex flex-col gap-6 py-12">
        <div className="flex items-center gap-1.5">
          <IconSquareRoundedFilled className="size-5" />
          <span className="font-medium text-sm tracking-tight">blocks.so</span>
        </div>

        <div className="flex flex-col gap-1 text-sm text-zinc-400">
          <p>
            Built by{' '}
            <a
              className="text-zinc-500 underline underline-offset-4 transition-colors hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground"
              data-umami-event="View Ephraim Duncan's Website"
              href={siteConfig.links.website}
              rel="noreferrer"
              target="_blank"
            >
              Ephraim Duncan
            </a>
            . Source on{' '}
            <a
              className="text-zinc-500 underline underline-offset-4 transition-colors hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground"
              data-umami-event="View GitHub Repository"
              href={siteConfig.links.github}
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            .
          </p>
          <p>&copy; {year} Blocks.so</p>
        </div>
      </footer>
    </div>
  );
}
