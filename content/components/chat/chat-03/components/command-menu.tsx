'use client';

import { IconFileText, IconMessage, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';
import { Kbd } from '@/components/ui/kbd';
import type { Thread } from './conversation';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  threads: Thread[];
  onOpen: (id: string) => void;
  onNew: (draft: string) => void;
};

const heading =
  '**:[[cmdk-group-heading]]:px-2.5 **:[[cmdk-group-heading]]:font-semibold **:[[cmdk-group-heading]]:text-[10px] **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-[0.08em] **:[[cmdk-group-heading]]:text-muted-foreground/80';
const row = 'h-10 gap-3 rounded-lg px-2.5 text-[13px]';

function useCommandKey(onToggle: () => void) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onToggle();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [onToggle]);
}

export function CommandMenu({
  open,
  onOpenChange,
  threads,
  onOpen,
  onNew,
}: Props) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  useCommandKey(() => onOpenChange(!open));

  const messages = q
    ? threads.flatMap((t) =>
        t.turns
          .filter(
            (m) => m.role === 'assistant' && m.text.toLowerCase().includes(q)
          )
          .slice(0, 1)
          .map((m) => {
            const at = m.text.toLowerCase().indexOf(q);
            const start = Math.max(0, at - 40);
            return {
              id: m.id,
              threadId: t.id,
              thread: t.title,
              snippet: `${start > 0 ? '…' : ''}${m.text.slice(start, start + 90)}…`,
            };
          })
      )
    : [];

  const pick = (fn: () => void) => {
    fn();
    onOpenChange(false);
    setQuery('');
  };

  return (
    <CommandDialog
      className="max-w-140 rounded-[14px]!"
      description="Search chats and messages"
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) {
          setQuery('');
        }
      }}
      open={open}
      title="Search"
    >
      <Command
        className="p-0"
        filter={(value, search) =>
          value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
        }
      >
        <CommandInput
          onValueChange={setQuery}
          placeholder="Search chats…"
          value={query}
        />
        <CommandList className="max-h-80 p-1">
          <CommandEmpty className="py-8 text-[13px] text-muted-foreground">
            No results for “{query}”
          </CommandEmpty>
          <CommandGroup className={heading} heading="Chats">
            {threads.map((t) => (
              <CommandItem
                className={row}
                key={t.id}
                onSelect={() => pick(() => onOpen(t.id))}
                value={`${t.title} ${t.preview}`}
              >
                <IconMessage className="text-muted-foreground" stroke={1.8} />
                <span className="flex min-w-0 grow items-baseline gap-1.5">
                  <span className="shrink-0 font-medium">{t.title}</span>
                  <span className="truncate text-muted-foreground text-xs">
                    {t.preview}
                  </span>
                </span>
                <CommandShortcut className="font-mono text-[11px] tracking-normal">
                  {t.updated}
                </CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          {messages.length > 0 && (
            <CommandGroup className={heading} heading="Messages">
              {messages.map((m) => (
                <CommandItem
                  className={row}
                  key={m.id}
                  onSelect={() => pick(() => onOpen(m.threadId))}
                  value={m.snippet}
                >
                  <IconFileText
                    className="text-muted-foreground"
                    stroke={1.8}
                  />
                  <span className="grow truncate text-muted-foreground">
                    {m.snippet}
                  </span>
                  <CommandShortcut className="shrink-0 whitespace-nowrap text-[11px] tracking-normal">
                    {m.thread}
                  </CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          <CommandGroup className={heading} forceMount heading="Actions">
            <CommandItem
              className={row}
              forceMount
              onSelect={() => pick(() => onNew(query.trim()))}
              value={`new chat ${query}`}
            >
              <IconPlus className="text-muted-foreground" stroke={2} />
              <span className="grow">
                {q ? `New chat about “${query.trim()}”` : 'New chat'}
              </span>
              <CommandShortcut className="font-mono text-[11px] tracking-normal">
                ⌘N
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <div className="flex h-9 items-center gap-3.5 border-t bg-muted/40 px-3.5 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.25">
            <Kbd className="h-4.5 bg-background px-1.25 font-mono text-[10px] ring-1 ring-border">
              ↑↓
            </Kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1.25">
            <Kbd className="h-4.5 bg-background px-1.25 font-mono text-[10px] ring-1 ring-border">
              ↵
            </Kbd>
            Open
          </span>
        </div>
      </Command>
    </CommandDialog>
  );
}
