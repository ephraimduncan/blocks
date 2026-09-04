'use client';

import {
  IconArrowUp,
  IconChevronDown,
  IconCopy,
  IconDots,
  IconMicrophone,
  IconPaperclip,
  IconPencil,
  IconPhoto,
  IconPlayerStopFilled,
  IconPlus,
  IconRefresh,
  IconThumbDown,
  IconThumbUp,
  IconVolume,
  IconWorldSearch,
} from '@tabler/icons-react';
import type React from 'react';
import { useState } from 'react';
import { Bubble, BubbleContent } from '@/components/ui/bubble';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import {
  Message,
  MessageContent,
  MessageFooter,
} from '@/components/ui/message';
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/components/ui/message-scroller';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type Turn = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  streaming?: boolean;
};

const thread: Turn[] = [
  {
    id: '1',
    role: 'user',
    text: 'Is it true that a day on Venus is longer than its year?',
  },
  {
    id: '2',
    role: 'assistant',
    text: 'Yes. Venus takes 243 Earth days to rotate once, but only 225 days to orbit the Sun, so its day is longer than its year.\n\nIt also spins in the opposite direction to most planets, which means the Sun rises in the west there.',
  },
  { id: '3', role: 'user', text: 'How hot does it get on the surface?' },
  {
    id: '4',
    role: 'assistant',
    text: 'The surface sits around 465°C, hot enough to melt lead. The atmosphere traps so much heat that Venus stays hotter than Mercury, even though Mercury is much closer to the Sun.',
  },
  {
    id: '5',
    role: 'user',
    text: 'How long would a person survive there without a suit?',
  },
  {
    id: '6',
    role: 'assistant',
    text: "A few seconds at most. The pressure down there is 92 times Earth's, similar to being 900 meters underwater, and the heat alone would be fatal almost immediately.\n\nFor reference, the Soviet Venera landers were built for those conditions and still failed within about two hours.",
  },
];

const replies = [
  'Good question. Venus has no moons and no rings, which makes it unusual among the inner planets. Most explanations point to its slow, retrograde spin: any moon it once had would have drifted inward and been pulled apart by tidal forces.\n\nMercury is the only other moonless planet in the solar system.',
  'The clouds are mostly sulfuric acid droplets, sitting about 50 to 70 km above the surface. They reflect roughly 75% of incoming sunlight, which is why Venus is the brightest object in our sky after the Moon.\n\nBelow the clouds the air is almost entirely carbon dioxide, with pressure about 92 times that of Earth at sea level.',
  'Several landers have made it down. The Soviet Venera 7 was the first to transmit from the surface in 1970, and Venera 13 survived for 127 minutes in 1982, long enough to send back the first color photos.\n\nNothing has lasted more than a couple of hours; the heat and pressure destroy electronics quickly.',
];

const levels = [
  { name: 'Instant', hint: '5.5' },
  { name: 'Medium' },
  { name: 'High' },
  { name: 'Extra High' },
  { name: 'Pro' },
];

const models = [
  'GPT-6',
  'GPT-5.6 Sol',
  'GPT-6 Astra',
  'GPT-5.6 Terra',
  'GPT-5.6 Luna',
];

const thinkDelay = 600;
const wordDelay = 35;

const easeOut = 'ease-[cubic-bezier(0.23,1,0.32,1)]';
const press = `${easeOut} transition-[scale,background-color] duration-150 active:scale-[0.96] motion-reduce:active:scale-100`;
const enter = `${easeOut} motion-reduce:slide-in-from-bottom-0 fade-in slide-in-from-bottom-1 animate-in duration-200`;
const swap = `${easeOut} fade-in zoom-in-95 motion-reduce:zoom-in-100 animate-in duration-150`;
const item = 'rounded-lg px-2.5 py-1.75 text-[13px]';

export default function Chat02() {
  const [turns, setTurns] = useState(thread);
  const [draft, setDraft] = useState('');
  const [tall, setTall] = useState(false);
  const [listening, setListening] = useState(false);
  const [level, setLevel] = useState('Extra High');
  const [model, setModel] = useState('GPT-5.6 Sol');
  const [replyIndex, setReplyIndex] = useState(0);
  const [edit, setEdit] = useState<{ id: string; text: string } | null>(null);
  const streaming = turns.some((t) => t.streaming);

  const stream = (replyId: string) => {
    const words = replies[replyIndex % replies.length].split(' ');
    setReplyIndex(replyIndex + 1);
    setTurns((prev) =>
      prev.map((t) =>
        t.id === replyId ? { ...t, text: '', streaming: true } : t
      )
    );
    let shown = 0;
    setTimeout(() => {
      const timer = setInterval(() => {
        shown += 1;
        const done = shown >= words.length;
        setTurns((prev) =>
          prev.map((t) =>
            t.id === replyId
              ? {
                  ...t,
                  text: words.slice(0, shown).join(' '),
                  streaming: !done,
                }
              : t
          )
        );
        if (done) {
          clearInterval(timer);
        }
      }, wordDelay);
    }, thinkDelay);
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || streaming) {
      return;
    }
    const replyId = crypto.randomUUID();
    setTurns([
      ...turns,
      { id: crypto.randomUUID(), role: 'user', text },
      { id: replyId, role: 'assistant', text: '' },
    ]);
    setDraft('');
    setTall(false);
    stream(replyId);
  };

  const resend = () => {
    const text = edit?.text.trim();
    if (!(edit && text) || streaming) {
      return;
    }
    const at = turns.findIndex((t) => t.id === edit.id);
    const reply = turns[at + 1];
    setTurns(turns.map((t) => (t.id === edit.id ? { ...t, text } : t)));
    setEdit(null);
    if (reply?.role === 'assistant') {
      stream(reply.id);
    }
  };

  const body = (turn: Turn, align: 'start' | 'end') => {
    if (edit?.id === turn.id) {
      return (
        <>
          <Textarea
            aria-label="Edit message"
            autoFocus
            className={cn(
              enter,
              'min-h-0 w-md max-w-full resize-none rounded-[18px] border-0 bg-muted px-3.5 py-2.5 text-[15px]/6 focus-visible:ring-0 md:text-[15px]/6'
            )}
            onChange={(e) => setEdit({ ...edit, text: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setEdit(null);
              }
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                resend();
              }
            }}
            value={edit.text}
          />
          <div className={cn(enter, 'flex items-center gap-1.5 self-end')}>
            <Button
              className={cn(press, 'rounded-full')}
              onClick={() => setEdit(null)}
              size="sm"
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              className={cn(press, 'rounded-full')}
              disabled={!edit.text.trim() || streaming}
              onClick={resend}
              size="sm"
            >
              Send
            </Button>
          </div>
        </>
      );
    }
    if (turn.streaming && !turn.text) {
      return (
        <span className="shimmer text-[15px]/6 text-muted-foreground">
          Thinking…
        </span>
      );
    }
    return turn.text.split('\n\n').map((paragraph) => (
      <Bubble
        align={align}
        className="max-w-md data-[variant=ghost]:max-w-full"
        key={paragraph}
        variant={turn.role === 'user' ? 'muted' : 'ghost'}
      >
        <BubbleContent className="rounded-[18px] px-3.5 py-1.75 text-[15px]/5.5 group-data-[variant=ghost]/bubble:text-[15px]/6">
          {paragraph}
        </BubbleContent>
      </Bubble>
    ));
  };

  const action = (
    label: string,
    icon: React.ReactNode,
    onClick?: () => void
  ) => (
    <Button
      aria-label={label}
      className={cn(press, 'rounded-lg')}
      onClick={onClick}
      size="icon-sm"
      variant="ghost"
    >
      {icon}
    </Button>
  );

  return (
    <div className="flex h-dvh w-full flex-col bg-background">
      <MessageScrollerProvider autoScroll>
        <MessageScroller>
          <MessageScrollerViewport>
            <MessageScrollerContent className="mx-auto w-full max-w-2xl gap-4.5 px-4 pt-10 pb-4">
              {turns.map((turn) => {
                const mine = turn.role === 'user';
                const align = mine ? 'end' : 'start';
                return (
                  <MessageScrollerItem
                    className={cn(
                      mine && 'pt-4.5 first:pt-0',
                      !thread.some((t) => t.id === turn.id) && enter
                    )}
                    key={turn.id}
                    messageId={turn.id}
                  >
                    <Message align={align}>
                      <MessageContent className="gap-2.5">
                        {body(turn, align)}
                        {turn.text && edit?.id !== turn.id && (
                          <MessageFooter className="-mx-2 gap-0.5">
                            {action('Copy', <IconCopy stroke={1.6} />, () =>
                              navigator.clipboard.writeText(turn.text)
                            )}
                            {mine
                              ? action(
                                  'Edit',
                                  <IconPencil stroke={1.6} />,
                                  () =>
                                    setEdit({ id: turn.id, text: turn.text })
                                )
                              : action(
                                  'Regenerate',
                                  <IconRefresh stroke={1.6} />,
                                  () => stream(turn.id)
                                )}
                            {!mine && (
                              <DropdownMenu>
                                <DropdownMenuTrigger
                                  render={action(
                                    'More',
                                    <IconDots stroke={1.6} />
                                  )}
                                />
                                <DropdownMenuContent
                                  align="start"
                                  className="w-44 rounded-[14px] p-1.5"
                                >
                                  <DropdownMenuGroup className="flex flex-col gap-0.5">
                                    <DropdownMenuItem
                                      className={cn(item, 'gap-2.5')}
                                    >
                                      <IconThumbUp stroke={1.6} />
                                      Good response
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className={cn(item, 'gap-2.5')}
                                    >
                                      <IconThumbDown stroke={1.6} />
                                      Bad response
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className={cn(item, 'gap-2.5')}
                                    >
                                      <IconVolume stroke={1.6} />
                                      Read aloud
                                    </DropdownMenuItem>
                                  </DropdownMenuGroup>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </MessageFooter>
                        )}
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                );
              })}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton
            className={cn(
              easeOut,
              'bottom-2 h-7 gap-1.5 rounded-full border-0 px-3.5 font-medium text-muted-foreground text-xs shadow-[0_0_0_1px_oklch(0_0_0/0.06),0_2px_8px_oklch(0_0_0/0.08)] transition-[translate,scale,opacity,background-color] hover:text-foreground active:not-aria-[haspopup]:translate-y-0 data-[active=true]:active:scale-[0.96] dark:shadow-[0_0_0_1px_oklch(1_0_0/0.1),0_2px_8px_oklch(0_0_0/0.3)]'
            )}
            size="sm"
          >
            <IconChevronDown className="size-3.5" stroke={1.75} />
            Jump to latest
          </MessageScrollerButton>
        </MessageScroller>
      </MessageScrollerProvider>

      <form
        className="mx-auto flex w-full max-w-2xl flex-col items-center gap-2.5 px-4 pt-2 pb-3.5"
        onSubmit={send}
      >
        <InputGroup
          className={cn(
            'min-h-11 items-end rounded-[22px] bg-background px-0.5 shadow-xs has-[[data-slot=input-group-control]:focus-visible]:ring-0',
            tall && 'flex-wrap rounded-3xl'
          )}
        >
          <InputGroupAddon
            className={cn('pb-1.25 pl-2.5', tall && 'order-none')}
          >
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <InputGroupButton
                    aria-label="Add attachment"
                    className={cn(press, 'rounded-full')}
                    size="icon-sm"
                  />
                }
              >
                <IconPlus stroke={1.8} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-56 rounded-[14px] p-1.5"
                sideOffset={10}
              >
                <DropdownMenuGroup className="flex flex-col gap-0.5">
                  <DropdownMenuItem className={cn(item, 'gap-2.5')}>
                    <IconPaperclip stroke={1.6} />
                    Add files
                  </DropdownMenuItem>
                  <DropdownMenuItem className={cn(item, 'gap-2.5')}>
                    <IconPhoto stroke={1.6} />
                    Add photos
                  </DropdownMenuItem>
                  <DropdownMenuItem className={cn(item, 'gap-2.5')}>
                    <IconWorldSearch stroke={1.6} />
                    Search the web
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </InputGroupAddon>
          <InputGroupTextarea
            className={cn(
              'max-h-48 min-h-0 py-2.5 pl-1 text-[15px]/6 md:text-[15px]/6',
              tall && '-order-1 basis-full px-2.75 py-1.5'
            )}
            onChange={(e) => {
              setDraft(e.target.value);
              setTall(e.target.scrollHeight > 44);
            }}
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
          <InputGroupAddon
            align="inline-end"
            className={cn('gap-1.5 pr-2.5 pb-1.25', tall && 'ml-auto')}
          >
            {draft.trim() ? (
              <InputGroupButton
                aria-label="Send"
                className={cn(swap, press, 'rounded-full')}
                disabled={streaming}
                size="icon-sm"
                type="submit"
                variant="default"
              >
                <IconArrowUp stroke={2} />
              </InputGroupButton>
            ) : (
              <InputGroupButton
                aria-label={listening ? 'Stop listening' : 'Voice input'}
                aria-pressed={listening}
                className={cn(
                  swap,
                  press,
                  'rounded-full',
                  listening &&
                    'bg-destructive/15 text-destructive hover:bg-destructive/25'
                )}
                onClick={() => setListening(!listening)}
                size="icon-sm"
              >
                {listening ? (
                  <IconPlayerStopFilled className="animate-pulse motion-reduce:animate-none" />
                ) : (
                  <IconMicrophone stroke={1.8} />
                )}
              </InputGroupButton>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <InputGroupButton
                    aria-label="Intelligence level"
                    className={cn(
                      press,
                      'h-8 gap-1.25 rounded-full bg-muted px-3 font-medium text-[13px] text-muted-foreground hover:bg-muted'
                    )}
                    size="sm"
                  />
                }
              >
                {level}
                <IconChevronDown className="size-3" stroke={2} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-49 rounded-[14px] p-1.5"
                side="top"
                sideOffset={10}
              >
                <DropdownMenuGroup className="flex flex-col gap-0.5">
                  <DropdownMenuLabel className="px-2.5 pt-1 pb-0.5 text-[11px]">
                    Intelligence
                  </DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    onValueChange={setLevel}
                    value={level}
                  >
                    {levels.map((l) => (
                      <DropdownMenuRadioItem
                        className={cn(item, 'pr-8 pl-2.5')}
                        key={l.name}
                        value={l.name}
                      >
                        {l.name}
                        {l.hint && (
                          <span className="text-muted-foreground text-xs">
                            {l.hint}
                          </span>
                        )}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                  <DropdownMenuSeparator className="mx-1.5 my-1" />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger
                      className={cn(
                        item,
                        '[&>svg]:size-3.5 [&>svg]:text-muted-foreground'
                      )}
                    >
                      {model}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-44 rounded-[14px] p-1.5">
                      <DropdownMenuRadioGroup
                        className="flex flex-col gap-0.5"
                        onValueChange={setModel}
                        value={model}
                      >
                        {models.map((m) => (
                          <DropdownMenuRadioItem
                            className={cn(item, 'pr-8 pl-2.5')}
                            key={m}
                            value={m}
                          >
                            {m}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </InputGroupAddon>
        </InputGroup>
        <p className="text-muted-foreground text-xs">
          AI can make mistakes. Check important info.
        </p>
      </form>
    </div>
  );
}
