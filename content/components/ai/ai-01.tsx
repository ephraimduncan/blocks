"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  IconMicrophone,
  IconPaperclip,
  IconPlus,
  IconSearch,
  IconSend,
  IconSparkles,
  IconWaveSine,
} from "@tabler/icons-react";
import { useRef, useState } from "react";

export default function Ai01() {
  const [message, setMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim()) {
      setMessage("");
      setIsExpanded(false);

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    setIsExpanded(e.target.value.length > 100 || e.target.value.includes("\n"));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-balance mb-8 mx-auto max-w-2xl text-center text-2xl font-semibold leading-9 text-foreground px-1 text-pretty whitespace-pre-wrap">
        How can I help you today?
      </h1>

      <form onSubmit={handleSubmit} className="group/composer w-full">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="sr-only"
          onChange={(e) => {}}
        />

        <div
          className={cn(
            "w-full max-w-2xl mx-auto bg-transparent dark:bg-muted/50 cursor-text overflow-clip bg-clip-padding p-2.5 shadow-lg border border-border transition-[border-radius] duration-200 ease-out",
            isExpanded
              ? "rounded-3xl grid [grid-template-columns:1fr] [grid-template-rows:auto_1fr_auto] [grid-template-areas:'header'_'primary'_'footer']"
              : "rounded-3xl grid [grid-template-columns:auto_1fr_auto] [grid-template-rows:auto_1fr_auto] [grid-template-areas:'header_header_header'_'leading_primary_trailing'_'._footer_.']"
          )}
        >
          <div
            className={cn(
              "flex min-h-14 items-center overflow-x-hidden px-1.5",
              {
                "px-2 py-1 mb-0": isExpanded,
                "-my-2.5": !isExpanded,
              }
            )}
            style={{ gridArea: "primary" }}
          >
            <div className="flex-1 overflow-auto max-h-52">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything"
                className="min-h-0 resize-none rounded-none border-0 p-0 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 scrollbar-thin dark:bg-transparent"
                rows={1}
              />
            </div>
          </div>

          <div
            className={cn("flex", { hidden: isExpanded })}
            style={{ gridArea: "leading" }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-accent outline-none ring-0"
                  aria-label="Add attachments"
                >
                  <IconPlus className="size-6 text-muted-foreground" />
                </Button>
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
                    <IconPaperclip size={20} className="opacity-60" />
                    Add photos & files
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="rounded-md"
                    onClick={() => {}}
                  >
                    <div className="flex items-center gap-2">
                      <IconSparkles size={20} className="opacity-60" />
                      Agent mode
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="rounded-md"
                    onClick={() => {}}
                  >
                    <IconSearch size={20} className="opacity-60" />
                    Deep Research
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div
            className="flex items-center gap-2"
            style={{ gridArea: isExpanded ? "footer" : "trailing" }}
          >
            <div className="ms-auto flex items-center gap-1.5">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-accent"
                aria-label="Record audio message"
              >
                <IconMicrophone className="size-5 text-muted-foreground" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-accent relative"
                aria-label="Audio visualization"
              >
                <IconWaveSine className="size-5 text-muted-foreground" />
              </Button>

              {message.trim() && (
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full"
                  aria-label="Send message"
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
