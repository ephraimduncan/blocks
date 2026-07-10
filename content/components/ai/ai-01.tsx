'use client';

import {
  IconMicrophone,
  IconPaperclip,
  IconPlus,
  IconSearch,
  IconSend,
  IconSparkles,
  IconWaveSine,
} from '@tabler/icons-react';
import type React from 'react';
import { useRef, useState } from 'react';
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

export default function Ai01() {
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim()) {
      setMessage('');
      setIsExpanded(false);

      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    setIsExpanded(e.target.value.length > 100 || e.target.value.includes('\n'));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="w-full">
      <h1 className="mx-auto mb-8 max-w-2xl whitespace-pre-wrap text-balance text-pretty px-1 text-center font-semibold text-2xl text-foreground leading-9">
        How can I help you today?
      </h1>

      <form className="group/composer w-full" onSubmit={handleSubmit}>
        <input
          className="sr-only"
          multiple
          onChange={(e) => {}}
          ref={fileInputRef}
          type="file"
        />

        <div
          className={cn(
            'mx-auto w-full max-w-2xl cursor-text overflow-clip border border-border bg-transparent bg-clip-padding p-2.5 shadow-lg transition-[border-radius] duration-200 ease-out dark:bg-muted/50',
            isExpanded
              ? "grid rounded-3xl [grid-template-areas:'header'_'primary'_'footer'] [grid-template-columns:1fr] [grid-template-rows:auto_1fr_auto]"
              : "grid rounded-3xl [grid-template-areas:'header_header_header'_'leading_primary_trailing'_'._footer_.'] [grid-template-columns:auto_1fr_auto] [grid-template-rows:auto_1fr_auto]"
          )}
        >
          <div
            className={cn(
              'flex min-h-14 items-center overflow-x-hidden px-1.5',
              {
                'mb-0 px-2 py-1': isExpanded,
                '-my-2.5': !isExpanded,
              }
            )}
            style={{ gridArea: 'primary' }}
          >
            <div className="max-h-52 flex-1 overflow-auto">
              <Textarea
                className="scrollbar-thin min-h-0 resize-none rounded-none border-0 p-0 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent"
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything"
                ref={textareaRef}
                rows={1}
                value={message}
              />
            </div>
          </div>

          <div
            className={cn('flex', { hidden: isExpanded })}
            style={{ gridArea: 'leading' }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    aria-label="Add attachments"
                    className="rounded-full outline-none ring-0 hover:bg-accent"
                    size="icon"
                    type="button"
                    variant="ghost"
                  />
                }
              >
                <IconPlus className="size-6 text-muted-foreground" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                className="max-w-xs rounded-2xl p-1.5"
              >
                <DropdownMenuGroup className="space-y-1">
                  <DropdownMenuItem
                    className="rounded-md"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <IconPaperclip className="opacity-60" size={20} />
                    Add photos & files
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-md" onClick={() => {}}>
                    <div className="flex items-center gap-2">
                      <IconSparkles className="opacity-60" size={20} />
                      Agent mode
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-md" onClick={() => {}}>
                    <IconSearch className="opacity-60" size={20} />
                    Deep Research
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div
            className="flex items-center gap-2"
            style={{ gridArea: isExpanded ? 'footer' : 'trailing' }}
          >
            <div className="ms-auto flex items-center gap-1.5">
              <Button
                aria-label="Record audio message"
                className="rounded-full hover:bg-accent"
                size="icon"
                type="button"
                variant="ghost"
              >
                <IconMicrophone className="size-5 text-muted-foreground" />
              </Button>

              <Button
                aria-label="Audio visualization"
                className="relative h-9 w-9 rounded-full hover:bg-accent"
                size="icon"
                type="button"
                variant="ghost"
              >
                <IconWaveSine className="size-5 text-muted-foreground" />
              </Button>

              {message.trim() && (
                <Button
                  aria-label="Send message"
                  className="rounded-full"
                  size="icon"
                  type="submit"
                >
                  <IconSend className="size-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
