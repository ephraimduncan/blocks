'use client';

import {
  IconAlertCircle,
  IconChevronDown,
  IconChevronRight,
  IconCopy,
  IconPencil,
  IconRefresh,
  IconThumbDown,
  IconThumbUp,
} from '@tabler/icons-react';
import React, { Fragment } from 'react';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/components/ui/message-scroller';
import { cn } from '@/lib/utils';

export type Turn = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  reasoning?: string;
  thought?: number;
  streaming?: boolean;
  error?: boolean;
  day?: Thread['group'];
};

export type Thread = {
  id: string;
  title: string;
  preview: string;
  updated: string;
  group: 'today' | 'yesterday' | 'week';
  pinned?: boolean;
  turns: Turn[];
};

const easeOut = 'ease-[cubic-bezier(0.23,1,0.32,1)]';
const press = `${easeOut} transition-[scale,background-color] duration-150 active:scale-[0.96] motion-reduce:active:scale-100`;
const enter = `${easeOut} motion-reduce:slide-in-from-bottom-0 fade-in slide-in-from-bottom-1 animate-in duration-200`;

type Props = {
  thread: Thread | null;
  recent: Thread[];
  altModel: string;
  onOpen: (id: string) => void;
  onEdit: (turn: Turn) => void;
  onRetry: (turnId: string, model?: string) => void;
};

export function Conversation({
  thread,
  recent,
  altModel,
  onOpen,
  onEdit,
  onRetry,
}: Props) {
  if (!thread) {
    return (
      <div className="flex grow items-center justify-center px-8">
        <div className={cn(enter, 'flex w-full max-w-160 flex-col gap-10')}>
          <div className="flex flex-col gap-1.5">
            <h1 className="font-semibold text-[34px]/10 tracking-[-0.025em]">
              Where were we?
            </h1>
            <p className="text-[15px]/5.5 text-muted-foreground">
              Nothing here yet. Ask anything, or pick up a thread.
            </p>
          </div>
          <div className="flex flex-col">
            <p className="pb-1 font-semibold text-[10px] text-muted-foreground/80 uppercase tracking-[0.08em]">
              Continue
            </p>
            {recent.map((t) => (
              <button
                className="-mx-2 flex h-13 items-center gap-3.5 rounded-lg not-last:border-muted not-last:border-b px-2 text-left transition-colors hover:bg-muted/60"
                key={t.id}
                onClick={() => onOpen(t.id)}
                type="button"
              >
                <span className="flex grow flex-col gap-0.5">
                  <span className="font-medium text-sm/4.5">{t.title}</span>
                  <span className="text-muted-foreground text-xs">
                    {t.preview}
                  </span>
                </span>
                <span className="font-mono text-[11px] text-muted-foreground/80">
                  {t.updated}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const action = (
    label: string,
    icon: React.ReactNode,
    onClick?: () => void
  ) => (
    <Button
      aria-label={label}
      className={cn(press, 'size-6.5 rounded-lg text-muted-foreground')}
      onClick={onClick}
      size="icon-sm"
      variant="ghost"
    >
      {icon}
    </Button>
  );

  return (
    <MessageScrollerProvider autoScroll>
      <MessageScroller className="grow">
        <MessageScrollerViewport>
          <MessageScrollerContent className="mx-auto w-full max-w-160 gap-4.5 px-4 pt-6 pb-4">
            {thread.turns.map((turn, i) => {
              const day = turn.day ?? thread.group;
              const prev = thread.turns[i - 1];
              const divider = !prev || (prev.day ?? thread.group) !== day;
              return (
                <Fragment key={turn.id}>
                  {divider && (
                    <div className="flex items-center gap-3">
                      <div className="h-px grow bg-muted" />
                      <span className="font-medium text-[11px] text-muted-foreground/80">
                        {
                          {
                            today: 'Today',
                            yesterday: 'Yesterday',
                            week: 'This week',
                          }[day]
                        }
                      </span>
                      <div className="h-px grow bg-muted" />
                    </div>
                  )}
                  {turn.role === 'user' ? (
                    <MessageScrollerItem
                      className="group/turn flex flex-row-reverse items-center gap-2"
                      key={turn.id}
                      messageId={turn.id}
                    >
                      <div className="max-w-105 rounded-[20px] bg-muted px-4 py-2.5 text-[15px]/5.5">
                        {turn.text}
                      </div>
                      <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-focus-within/turn:opacity-100 group-hover/turn:opacity-100">
                        {action('Edit', <IconPencil stroke={1.8} />, () =>
                          onEdit(turn)
                        )}
                        {action('Copy', <IconCopy stroke={1.8} />, () =>
                          navigator.clipboard.writeText(turn.text)
                        )}
                      </div>
                    </MessageScrollerItem>
                  ) : (
                    <MessageScrollerItem
                      className={cn(
                        'flex flex-col gap-2.5',
                        turn.streaming && enter
                      )}
                      {!turn.streaming && (
                        <div className="-ml-1.5 flex items-center gap-0.5">
                          {action('Copy', <IconCopy stroke={1.8} />, () =>
                            navigator.clipboard.writeText(turn.text)
                          )}
                          {action(
                            'Good response',
                            <IconThumbUp stroke={1.8} />
                          )}
                          {action(
                            'Bad response',
                            <IconThumbDown stroke={1.8} />
                          )}
                          {!turn.streaming && (
                            <div className="-ml-1.5 flex items-center gap-0.5">
                              {action('Copy', <IconCopy stroke={1.8} />, () =>
                                navigator.clipboard.writeText(turn.text)
                              )}
                              {action(
                                'Good response',
                                <IconThumbUp stroke={1.8} />
                              )}
                              {action(
                                'Bad response',
                                <IconThumbDown stroke={1.8} />
                              )}
                              {action(
                                'Regenerate',
                                <IconRefresh stroke={1.8} />,
                                () => onRetry(turn.id)
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </MessageScrollerItem>
                  )}
                </Fragment>
              );
            })}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton
          className={cn(
            easeOut,
            'bottom-2 h-8 gap-1.5 rounded-full border-border bg-background px-3.5 font-medium text-[13px] shadow-xs transition-[translate,scale,opacity,background-color]'
          )}
          size="sm"
          variant="outline"
        >
          <IconChevronDown className="size-3.5" stroke={2} />
          Jump to latest
        </MessageScrollerButton>
      </MessageScroller>
    </MessageScrollerProvider>
  );
}
