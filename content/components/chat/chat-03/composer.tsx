'use client';

import {
  IconArrowUp,
  IconMicrophone,
  IconPaperclip,
  IconPhoto,
  IconPlayerStopFilled,
  IconPlus,
  IconWorld,
  IconX,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export type Attachment = { name: string; meta: string; kind: string };

const easeOut = 'ease-[cubic-bezier(0.23,1,0.32,1)]';
const press = `${easeOut} transition-[scale,background-color] duration-150 active:scale-[0.96] motion-reduce:active:scale-100`;
const swap = `${easeOut} fade-in zoom-in-95 motion-reduce:zoom-in-100 animate-in duration-150`;
const round = 'size-7.5 rounded-full';

type Props = {
  draft: string;
  onDraft: (v: string) => void;
  attachment: Attachment | null;
  onAttachment: (a: Attachment | null) => void;
  streaming: boolean;
  onSend: () => void;
  onStop: () => void;
};

export function Composer({
  draft,
  onDraft,
  attachment,
  onAttachment,
  streaming,
  onSend,
  onStop,
}: Props) {
  const [search, setSearch] = useState(false);
  const [listening, setListening] = useState(false);
  const canSend = draft.trim().length > 0 && !streaming;

  return (
    <form
      className="mx-auto flex w-full max-w-160 flex-col px-4 pt-3 pb-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (canSend) {
          onSend();
        }
      }}
    >
      <div
        className={cn(
          easeOut,
          'flex flex-col gap-2.5 rounded-3xl border border-border bg-background p-3 shadow-[0_1px_2px_oklch(0_0_0/0.04),0_8px_24px_oklch(0_0_0/0.05)] transition-[box-shadow,border-color] duration-150 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/12'
        )}
      >
        {attachment && (
          <div className={cn(swap, 'flex')}>
            <div className="flex h-12 items-center gap-2.5 rounded-xl border border-border bg-muted/50 pr-3 pl-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10 font-mono font-semibold text-[9px] text-destructive tracking-[0.04em]">
                {attachment.kind}
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-medium text-[13px]/4">
                  {attachment.name}
                </span>
                <span className="text-[11px]/3.5 text-muted-foreground">
                  {attachment.meta}
                </span>
              </span>
              <button
                aria-label="Remove attachment"
                className="rounded-md p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => onAttachment(null)}
                type="button"
              >
                <IconX className="size-3.5" stroke={2} />
              </button>
            </div>
          </div>
        )}
        <Textarea
          aria-label="Message"
          className="field-sizing-content max-h-48 min-h-0 resize-none rounded-none border-0 bg-transparent px-1.5 py-0.5 text-sm/5 shadow-none focus-visible:ring-0 md:text-sm/5 dark:bg-transparent"
          onChange={(e) => onDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
          placeholder={listening ? 'Listening…' : 'Ask anything'}
          rows={1}
          value={draft}
        />
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  aria-label="Add attachment"
                  className={cn(press, round)}
                  size="icon-sm"
                  variant="outline"
                />
              }
            >
              <IconPlus stroke={2} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-52 rounded-xl p-1.5"
              side="top"
              sideOffset={10}
            >
              <DropdownMenuGroup className="flex flex-col gap-0.5">
                <DropdownMenuItem
                  className="h-8 gap-2.5 rounded-md px-2.5 text-[13px]"
                  onClick={() =>
                    onAttachment({
                      name: 'installer-quote.pdf',
                      meta: '2 pages · 412 KB',
                      kind: 'PDF',
                    })
                  }
                >
                  <IconPaperclip stroke={1.8} />
                  Add files
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="h-8 gap-2.5 rounded-md px-2.5 text-[13px]"
                  onClick={() =>
                    onAttachment({
                      name: 'boiler-room.jpg',
                      meta: '3024 × 4032 · 2.1 MB',
                      kind: 'JPG',
                    })
                  }
                >
                  <IconPhoto stroke={1.8} />
                  Add photos
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            aria-pressed={search}
            className={cn(
              press,
              'h-7.5 rounded-full px-2.75 text-xs',
              search &&
                'border-primary/30 bg-primary/8 text-primary hover:bg-primary/12'
            )}
            onClick={() => setSearch(!search)}
            size="sm"
            variant="outline"
          >
            <IconWorld stroke={2} />
            Search
          </Button>
          <div className="grow" />
          <Button
            aria-label={listening ? 'Stop listening' : 'Voice input'}
            aria-pressed={listening}
            className={cn(
              press,
              round,
              listening &&
                'bg-destructive/15 text-destructive hover:bg-destructive/25'
            )}
            onClick={() => setListening(!listening)}
            size="icon-sm"
            variant="ghost"
          >
            {listening ? (
              <IconPlayerStopFilled className="animate-pulse motion-reduce:animate-none" />
            ) : (
              <IconMicrophone stroke={2} />
            )}
          </Button>
          {streaming ? (
            <Button
              aria-label="Stop generating"
              className={cn(swap, press, round)}
              onClick={onStop}
              size="icon-sm"
            >
              <IconPlayerStopFilled className="size-3" />
            </Button>
          ) : (
            <Button
              aria-label="Send"
              className={cn(
                swap,
                press,
                round,
                !canSend &&
                  'bg-muted text-muted-foreground/70 hover:bg-muted disabled:opacity-100'
              )}
              disabled={!canSend}
              size="icon-sm"
              type="submit"
            >
              <IconArrowUp stroke={2.2} />
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
