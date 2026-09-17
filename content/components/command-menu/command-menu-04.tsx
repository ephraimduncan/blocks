'use client';

import {
  IconFileText,
  IconFileTypeDocx,
  IconFileTypePdf,
  IconFileTypeXls,
  IconFileZip,
  IconFolder,
  IconMessageCircle,
  IconPhoto,
  IconX,
} from '@tabler/icons-react';
import { Command as CommandPrimitive } from 'cmdk';
import { type ComponentType, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

export type SearchResultKind = 'chat' | 'image' | 'document' | 'project';

export type SearchResult = {
  id: string;
  kind: SearchResultKind;
  title: string;
  /** Shown under the title while searching. Chats use a text excerpt; files use their type. */
  snippet: string;
  date: string;
  /** Images only: CSS background for the thumbnail. */
  thumbnail?: string;
};

type Filter = 'all' | SearchResultKind;

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'chat', label: 'Chats' },
  { value: 'image', label: 'Images' },
  { value: 'document', label: 'Documents' },
  { value: 'project', label: 'Projects' },
];

const fileIcons: Record<string, ComponentType<{ className?: string }>> = {
  pdf: IconFileTypePdf,
  docx: IconFileTypeDocx,
  xlsx: IconFileTypeXls,
  zip: IconFileZip,
};

const kindIcons: Record<
  SearchResultKind,
  ComponentType<{ className?: string }>
> = {
  chat: IconMessageCircle,
  image: IconPhoto,
  document: IconFileText,
  project: IconFolder,
};

const lastOpenedChats: SearchResult[] = [
  {
    id: 'c1',
    kind: 'chat',
    title: 'Q3 launch checklist',
    snippet: 'Pin the launch date once legal signs off on the new terms.',
    date: 'Today',
  },
  {
    id: 'c2',
    kind: 'chat',
    title: 'Draft onboarding email sequence',
    snippet:
      'Three emails over five days, starting the morning after launch, each with one clear action.',
    date: 'Today',
  },
];

const recentChats: SearchResult[] = [
  {
    id: 'c3',
    kind: 'chat',
    title: 'Compare pricing page layouts',
    snippet:
      'Three-column pricing works when the middle tier is the one most people should pick. Ship it with the launch.',
    date: 'Yesterday',
  },
  {
    id: 'c4',
    kind: 'chat',
    title: 'Summarize customer interviews',
    snippet:
      'Eight of twelve customers mentioned invoice export first. Nobody brought up the dashboard redesign.',
    date: 'Yesterday',
  },
  {
    id: 'c5',
    kind: 'chat',
    title: 'Fix flaky checkout test',
    snippet:
      'The test races the payment webhook. Wait for the order status instead of a fixed delay.',
    date: 'Sep 4',
  },
  {
    id: 'c6',
    kind: 'chat',
    title: 'Write release notes for v2.4',
    snippet:
      'Lead with the two launch features people asked for most, then list fixes in one short block.',
    date: 'Sep 2',
  },
  {
    id: 'c7',
    kind: 'chat',
    title: 'Plan database index cleanup',
    snippet:
      'Drop the four unused indexes on orders first; they cost the most on writes.',
    date: 'Aug 30',
  },
  {
    id: 'c8',
    kind: 'chat',
    title: 'Brainstorm team offsite agenda',
    snippet:
      'Half a day on the roadmap, half a day on the launch retro, evening free.',
    date: 'Aug 28',
  },
  {
    id: 'c9',
    kind: 'chat',
    title: 'Review API rate limit options',
    snippet:
      'Token bucket per API key, 600 requests a minute. Raise the ceiling for launch week.',
    date: 'Aug 26',
  },
];

const images: SearchResult[] = [
  {
    id: 'i1',
    kind: 'image',
    title: 'launch-hero-banner.png',
    snippet: 'Image',
    date: 'Sep 3',
    thumbnail: 'linear-gradient(135deg, #f97316, #db2777)',
  },
  {
    id: 'i2',
    kind: 'image',
    title: 'launch-pricing-table.png',
    snippet: 'Image',
    date: 'Aug 20',
    thumbnail: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
  },
  {
    id: 'i3',
    kind: 'image',
    title: 'launch-onboarding-flow.png',
    snippet: 'Image',
    date: 'Aug 27',
    thumbnail: 'linear-gradient(135deg, #22c55e, #0d9488)',
  },
  {
    id: 'i4',
    kind: 'image',
    title: 'dashboard-dark-mode.png',
    snippet: 'Image',
    date: 'Aug 15',
    thumbnail: 'linear-gradient(135deg, #1e293b, #475569)',
  },
  {
    id: 'i5',
    kind: 'image',
    title: 'launch-social-card.jpg',
    snippet: 'Image',
    date: 'Aug 12',
    thumbnail: 'linear-gradient(135deg, #a855f7, #f43f5e)',
  },
  {
    id: 'i6',
    kind: 'image',
    title: 'checkout-error-states.png',
    snippet: 'Image',
    date: 'Jul 30',
    thumbnail: 'linear-gradient(135deg, #eab308, #f97316)',
  },
];

const documents: SearchResult[] = [
  {
    id: 'd1',
    kind: 'document',
    title: 'Q3_launch_plan.pdf',
    snippet: 'PDF',
    date: 'Sep 1',
  },
  {
    id: 'd2',
    kind: 'document',
    title: 'launch-pricing-proposal.docx',
    snippet: 'Document',
    date: 'Aug 22',
  },
  {
    id: 'd3',
    kind: 'document',
    title: 'pre-launch-interview-notes.md',
    snippet: 'Document',
    date: 'Aug 19',
  },
  {
    id: 'd4',
    kind: 'document',
    title: 'launch-assets-final.zip',
    snippet: 'File',
    date: 'Aug 11',
  },
  {
    id: 'd5',
    kind: 'document',
    title: 'pricing-experiments.xlsx',
    snippet: 'Spreadsheet',
    date: 'Aug 14',
  },
];

const projects: SearchResult[] = [
  {
    id: 'p1',
    kind: 'project',
    title: 'Q3 product launch',
    snippet: 'Project',
    date: 'Sep 5',
  },
  {
    id: 'p2',
    kind: 'project',
    title: 'Launch pricing and packaging',
    snippet: 'Project',
    date: 'Aug 30',
  },
  {
    id: 'p3',
    kind: 'project',
    title: 'Post-launch onboarding redesign',
    snippet: 'Project',
    date: 'Aug 21',
  },
  {
    id: 'p4',
    kind: 'project',
    title: 'Checkout reliability',
    snippet: 'Project',
    date: 'Jul 28',
  },
];

const searchResults: SearchResult[] = [
  ...lastOpenedChats,
  ...recentChats,
  ...images,
  ...documents,
  ...projects,
];

export function CommandMenu04() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline">
        Search
      </Button>

      <GlobalSearch
        lastOpened={lastOpenedChats}
        onOpenChange={setOpen}
        onSelect={() => setOpen(false)}
        open={open}
        recent={recentChats}
        results={searchResults}
      />
    </>
  );
}

export function GlobalSearch({
  open,
  onOpenChange,
  onSelect,
  lastOpened,
  recent,
  results,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (result: SearchResult) => void;
  lastOpened: SearchResult[];
  recent: SearchResult[];
  results: SearchResult[];
}) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const needle = query.trim().toLowerCase();

  const matches = results.filter(
    (result) =>
      (filter === 'all' || result.kind === filter) &&
      `${result.title} ${result.snippet}`.toLowerCase().includes(needle)
  );

  const reset = () => {
    setQuery('');
    setFilter('all');
  };

  return (
    <CommandDialog
      className="-translate-y-1/2 top-1/2 rounded-2xl! sm:max-w-[720px]"
      description="Search chats, images, documents, and projects"
      onOpenChange={(next) => {
        if (!next) {
          reset();
        }
        onOpenChange(next);
      }}
      open={open}
      title="Global search"
    >
      <Command shouldFilter={false}>
        <div className="flex h-16 shrink-0 items-center py-5 pr-4 pl-6">
          <CommandPrimitive.Input
            className="min-w-0 flex-1 bg-transparent text-base tracking-[-0.02em] outline-hidden placeholder:text-muted-foreground"
            onValueChange={setQuery}
            placeholder="Search..."
            value={query}
          />
          <div className="flex shrink-0 items-center gap-1">
            {query && (
              <>
                <button
                  className="px-2 text-muted-foreground text-sm hover:text-foreground"
                  onClick={reset}
                  type="button"
                >
                  Clear
                </button>
                <span aria-hidden className="mx-1 h-5 w-px bg-border" />
              </>
            )}
            <button
              aria-label="Close search"
              className="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => onOpenChange(false)}
              type="button"
            >
              <IconX className="size-5" />
            </button>
          </div>
        </div>

        <CommandList className="h-[396px] max-h-[396px] pb-3">
          {needle ? (
            <>
              <div
                aria-label="Result type filters"
                className="sticky top-0 z-10 flex gap-1 bg-popover px-6 pb-3"
                role="tablist"
              >
                {filters.map((option) => {
                  const selected = option.value === filter;
                  return (
                    <button
                      aria-selected={selected}
                      className={cn(
                        'rounded-full px-3.5 py-1.5 text-sm transition-colors',
                        selected
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                      key={option.value}
                      onClick={() => setFilter(option.value)}
                      role="tab"
                      type="button"
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
              <CommandEmpty>No results for “{query}”.</CommandEmpty>
              {filter === 'image' ? (
                <div className="grid grid-cols-4 gap-3 px-6">
                  {matches.map((result) => (
                    <CommandItem
                      className="block aspect-square rounded-xl! bg-transparent! p-0 [&_svg]:hidden"
                      key={result.id}
                      onSelect={() => onSelect(result)}
                      value={result.id}
                    >
                      <span
                        aria-label={result.title}
                        className="block size-full rounded-xl ring-1 ring-foreground/10 ring-offset-2 ring-offset-popover group-data-selected/command-item:ring-foreground/40"
                        role="img"
                        style={{ background: result.thumbnail }}
                      />
                    </CommandItem>
                  ))}
                </div>
              ) : (
                matches.map((result) => (
                  <ResultRow
                    key={result.id}
                    needle={needle}
                    onSelect={onSelect}
                    result={result}
                  />
                ))
              )}
            </>
          ) : (
            <>
              <CommandGroup
                className="p-0 **:[[cmdk-group-heading]]:px-6 **:[[cmdk-group-heading]]:py-2 **:[[cmdk-group-heading]]:font-normal! **:[[cmdk-group-heading]]:text-sm!"
                heading="Last opened"
              >
                {lastOpened.map((result) => (
                  <ResultRow
                    key={result.id}
                    onSelect={onSelect}
                    result={result}
                  />
                ))}
              </CommandGroup>
              <CommandGroup
                className="mt-5 p-0 **:[[cmdk-group-heading]]:px-6 **:[[cmdk-group-heading]]:py-2 **:[[cmdk-group-heading]]:font-normal! **:[[cmdk-group-heading]]:text-sm!"
                heading="Recent chats"
              >
                {recent.map((result) => (
                  <ResultRow
                    key={result.id}
                    onSelect={onSelect}
                    result={result}
                  />
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}

function ResultRow({
  result,
  needle,
  onSelect,
}: {
  result: SearchResult;
  needle?: string;
  onSelect: (result: SearchResult) => void;
}) {
  const extension = result.title.split('.').pop() ?? '';
  const Icon =
    result.kind === 'document'
      ? (fileIcons[extension] ?? IconFileText)
      : kindIcons[result.kind];

  return (
    <CommandItem
      className="mx-3 min-h-12 gap-3 rounded-xl! px-3 py-2 text-sm"
      onSelect={() => onSelect(result)}
      value={result.id}
    >
      <span className="flex size-8 shrink-0 items-center justify-center">
        <Icon
          className={cn('size-5!', extension === 'pdf' && 'text-red-500')}
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate leading-5">
          <Highlight needle={needle} text={result.title} />
        </span>
        {needle && (
          <span className="block truncate pt-0.5 text-muted-foreground leading-5">
            <Highlight needle={needle} text={result.snippet} />
          </span>
        )}
      </span>
      {needle && (
        <span className="shrink-0 pl-4 text-muted-foreground text-sm">
          {result.date}
        </span>
      )}
    </CommandItem>
  );
}

function Highlight({ text, needle }: { text: string; needle?: string }) {
  const start = needle ? text.toLowerCase().indexOf(needle) : -1;
  if (!needle || start === -1) {
    return text;
  }
  const end = start + needle.length;
  return (
    <>
      {text.slice(0, start)}
      <mark className="bg-transparent font-semibold text-foreground">
        {text.slice(start, end)}
      </mark>
      {text.slice(end)}
    </>
  );
}
