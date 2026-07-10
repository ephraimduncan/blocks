'use client';

// Install AI Elements components:
// npx ai-elements@latest add conversation message prompt-input

import {
  IconAdjustmentsHorizontal,
  IconBolt,
  IconMessageCircle,
  IconPaperclip,
  IconRefresh,
  IconSparkles,
} from '@tabler/icons-react';
import type { ChatStatus } from 'ai';
import { useEffect, useRef, useState } from 'react';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputButton,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DemoMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGES: DemoMessage[] = [
  {
    id: 'intro',
    role: 'assistant',
    content:
      '**Welcome back.** I can help you explore this chat block.\n\n- Draft UI copy\n- Summarize docs\n- Turn notes into tasks\n\nAsk me anything and I will respond with a demo reply.',
  },
  {
    id: 'question',
    role: 'user',
    content: 'What makes this chat block reusable?',
  },
  {
    id: 'answer',
    role: 'assistant',
    content:
      'It is built with **AI Elements** for conversation layout and input, plus shadcn/ui for the chrome. That means you can drop it into other screens and wire it up to a real AI backend later.',
  },
];

const RESPONSES = [
  'Here is a quick outline you can reuse:\n\n1. Swap the mock response with a real API call.\n2. Stream tokens into `MessageResponse`.\n3. Keep the layout exactly as-is for a consistent UI.',
  'If you want multi-model support, add a small model selector next to the status badge and pass the selection to your backend.',
  'You can also inject tools like file upload or voice input by adding buttons to the prompt footer.',
];

const pickResponse = (index: number) => RESPONSES[index % RESPONSES.length];

export default function Ai05() {
  const [messages, setMessages] = useState<DemoMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<ChatStatus>('ready');
  const replyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) {
        window.clearTimeout(replyTimeoutRef.current);
      }
    };
  }, []);

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    const newMessage: DemoMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
    setStatus('submitted');

    replyTimeoutRef.current = window.setTimeout(() => {
      const response: DemoMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: pickResponse(messages.length),
      };

      setMessages((prev) => [...prev, response]);
      setStatus('ready');
    }, 900);
  };

  return (
    <div className="w-full px-4">
      <div className="mx-auto flex h-96 w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg sm:w-3/5">
        <header className="flex items-center justify-between gap-4 border-border/80 border-b px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-balance font-semibold text-sm">
                Documenso Chat
              </div>
              <div className="flex items-center gap-2 text-pretty text-muted-foreground text-xs">
                <span className="inline-flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Live preview
                </span>
                <span className="hidden sm:inline">- Powered by shadcn/ui</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              aria-label="Refresh"
              className="size-8"
              size="icon"
              title="Refresh"
              variant="ghost"
            >
              <IconRefresh className="size-4" />
            </Button>
            <Button
              aria-label="Settings"
              className="size-8"
              size="icon"
              title="Settings"
              variant="ghost"
            >
              <IconAdjustmentsHorizontal className="size-4" />
            </Button>
          </div>
        </header>

        <Conversation className="bg-muted/30">
          <ConversationContent className="gap-6 pl-1">
            {messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent
                  className={cn(
                    'leading-relaxed',
                    message.role === 'assistant' && 'max-w-prose'
                  )}
                >
                  {message.role === 'assistant' ? (
                    <MessageResponse>{message.content}</MessageResponse>
                  ) : (
                    <p className="whitespace-pre-wrap text-pretty">
                      {message.content}
                    </p>
                  )}
                </MessageContent>
              </Message>
            ))}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="bg-background">
          <PromptInput
            className="w-full [&>[data-slot=input-group]]:rounded-none [&>[data-slot=input-group]]:border-border/80 [&>[data-slot=input-group]]:border-x-0 [&>[data-slot=input-group]]:border-t [&>[data-slot=input-group]]:border-b-0 [&>[data-slot=input-group]]:shadow-none [&>[data-slot=input-group]]:focus-within:border-border/80 [&>[data-slot=input-group]]:focus-within:outline-none [&>[data-slot=input-group]]:focus-within:ring-0 [&>[data-slot=input-group]]:focus-within:ring-transparent [&>[data-slot=input-group]]:focus-within:ring-offset-0"
            onSubmit={(message) => handleSend(message.text)}
          >
            <PromptInputTextarea
              onChange={(event) => setInputValue(event.currentTarget.value)}
              placeholder="Ask about the block, UI patterns, or an AI workflow"
              value={inputValue}
            />
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputButton aria-label="Attach">
                  <IconPaperclip className="size-4" />
                </PromptInputButton>
                <PromptInputButton aria-label="Quick prompt">
                  <IconBolt className="size-4" />
                </PromptInputButton>
                <PromptInputButton aria-label="New chat">
                  <IconMessageCircle className="size-4" />
                </PromptInputButton>
              </PromptInputTools>
              <PromptInputSubmit
                disabled={!inputValue.trim() || status !== 'ready'}
                status={status}
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
}
