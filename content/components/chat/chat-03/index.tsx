'use client';

import {
  IconCheck,
  IconChevronDown,
  IconLayoutSidebar,
  IconShare,
} from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Kbd } from '@/components/ui/kbd';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { ChatSidebar } from './chat-sidebar';
import { CommandMenu } from './command-menu';
import { type Attachment, Composer } from './composer';
import { Conversation } from './conversation';
import { models, replies, threads as seed, type Turn } from './data';

const thinkDelay = 900;
const wordDelay = 35;

export default function Chat03() {
  const [threads, setThreads] = useState(seed);
  const [activeId, setActiveId] = useState<string | null>('heat-pump');
  const [draft, setDraft] = useState('');
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [model, setModel] = useState(models[0].name);
  const [search, setSearch] = useState(false);
  const [replyIndex, setReplyIndex] = useState(0);
  const timer = useRef<number | null>(null);

  const thread = threads.find((t) => t.id === activeId) ?? null;
  const streaming = thread?.turns.some((t) => t.streaming) ?? false;
  const altModel = models.find((m) => m.name !== model)?.name ?? model;

  const patch = (threadId: string, turnId: string, fn: (t: Turn) => Turn) =>
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? { ...t, turns: t.turns.map((m) => (m.id === turnId ? fn(m) : m)) }
          : t
      )
    );

  const stream = (threadId: string, turnId: string) => {
    const reply = replies[replyIndex % replies.length];
    setReplyIndex(replyIndex + 1);
    const words = reply.text.split(' ');
    patch(threadId, turnId, (t) => ({
      ...t,
      text: '',
      reasoning: reply.reasoning,
      thought: undefined,
      error: undefined,
      streaming: true,
    }));
    let shown = 0;
    timer.current = window.setInterval(() => {
      shown += 1;
      const done = shown >= words.length;
      patch(threadId, turnId, (t) => ({
        ...t,
        text: words.slice(0, shown).join(' '),
        thought: done ? 4 + Math.round(reply.reasoning.length / 40) : t.thought,
        streaming: !done,
      }));
      if (done && timer.current) {
        window.clearInterval(timer.current);
        timer.current = null;
      }
    }, wordDelay);
  };

  const stop = () => {
    if (timer.current) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
    const live = thread?.turns.find((t) => t.streaming);
    if (thread && live) {
      patch(thread.id, live.id, (t) => ({
        ...t,
        streaming: false,
        error: true,
      }));
    }
  };

  const send = () => {
    const text = draft.trim();
    const replyId = crypto.randomUUID();
    const turns: Turn[] = [
      { id: crypto.randomUUID(), role: 'user', text },
      { id: replyId, role: 'assistant', text: '', streaming: true },
    ];
    const id = thread?.id ?? crypto.randomUUID();
    setThreads((prev) =>
      thread
        ? prev.map((t) =>
            t.id === id ? { ...t, turns: [...t.turns, ...turns] } : t
          )
        : [
            {
              id,
              title: text.split(' ').slice(0, 5).join(' '),
              preview: text,
              updated: 'now',
              group: 'today',
              turns,
            },
            ...prev,
          ]
    );
    setActiveId(id);
    setDraft('');
    setAttachment(null);
    window.setTimeout(() => stream(id, replyId), thinkDelay);
  };

  const retry = (turnId: string, next?: string) => {
    if (!thread) {
      return;
    }
    if (next) {
      setModel(next);
    }
    patch(thread.id, turnId, (t) => ({
      ...t,
      text: '',
      thought: undefined,
      error: undefined,
      streaming: true,
    }));
    window.setTimeout(() => stream(thread.id, turnId), thinkDelay);
  };

  const edit = (turn: Turn) => {
    if (!thread) {
      return;
    }
    const at = thread.turns.findIndex((t) => t.id === turn.id);
    setThreads((prev) =>
      prev.map((t) =>
        t.id === thread.id ? { ...t, turns: t.turns.slice(0, at) } : t
      )
    );
    setDraft(turn.text);
  };

  return (
    <SidebarProvider
      className="h-dvh min-h-0"
      style={{ '--sidebar-width': '260px' } as React.CSSProperties}
    >
      <ChatSidebar
        activeId={activeId}
        onChange={(next) => {
          setThreads(next);
          if (activeId && !next.some((t) => t.id === activeId)) {
            setActiveId(null);
          }
        }}
        onNew={() => setActiveId(null)}
        onSearch={() => setSearch(true)}
        onSelect={setActiveId}
        threads={threads}
      />
      <SidebarInset className="min-h-0 bg-background">
        <header className="flex h-13 shrink-0 items-center gap-2.5 border-b px-4">
          <SidebarTrigger className="size-7.5 rounded-lg text-muted-foreground">
            <IconLayoutSidebar className="size-4" stroke={1.8} />
          </SidebarTrigger>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  className="h-8 gap-1.5 rounded-lg px-2.5 text-[13px]"
                  variant="secondary"
                />
              }
            >
              {model}
              <IconChevronDown
                className="size-3 text-muted-foreground"
                stroke={2}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-75 rounded-xl p-1.5"
              sideOffset={6}
            >
              <DropdownMenuGroup className="flex flex-col gap-0.5">
                {models.map((m) => (
                  <DropdownMenuItem
                    className={cn(
                      'gap-2.5 rounded-md px-2.5 py-2',
                      m.name === model && 'bg-muted'
                    )}
                    key={m.name}
                    onClick={() => setModel(m.name)}
                  >
                    <span className="flex grow flex-col gap-0.5">
                      <span className="font-medium text-[13px]/4">
                        {m.name}
                      </span>
                      <span className="text-[11px]/3.5 text-muted-foreground">
                        {m.hint}
                      </span>
                    </span>
                    {m.name === model && (
                      <IconCheck className="size-3.5" stroke={2.2} />
                    )}
                    <Kbd className="h-4.5 border border-border bg-background px-1.5 font-mono text-[10px]">
                      {m.context}
                    </Kbd>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="grow" />
          {thread && (
            <Button
              aria-label="Share thread"
              className="size-7.5 rounded-lg text-muted-foreground"
              size="icon-sm"
              variant="ghost"
            >
              <IconShare className="size-4" stroke={1.8} />
            </Button>
          )}
        </header>

        <Conversation
          altModel={altModel}
          onEdit={edit}
          onOpen={setActiveId}
          onRetry={retry}
          recent={threads.filter((t) => !t.pinned).slice(0, 3)}
          thread={thread}
        />

        <Composer
          attachment={attachment}
          draft={draft}
          onAttachment={setAttachment}
          onDraft={setDraft}
          onSend={send}
          onStop={stop}
          streaming={streaming}
        />
      </SidebarInset>

      <CommandMenu
        onNew={(text) => {
          setActiveId(null);
          setDraft(text);
        }}
        onOpen={setActiveId}
        onOpenChange={setSearch}
        open={search}
        threads={threads}
      />
    </SidebarProvider>
  );
}
