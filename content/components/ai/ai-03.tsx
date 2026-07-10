'use client';

import {
  IconBolt,
  IconChevronDown,
  IconCircle,
  IconCircleDashed,
  IconCloud,
  IconCode,
  IconDeviceLaptop,
  IconHistory,
  IconPaperclip,
  IconPlus,
  IconProgress,
  IconRobot,
  IconSend,
  IconUser,
  IconWand,
  IconWorld,
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
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export default function Ai03() {
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('Local');
  const [selectedAgent, setSelectedAgent] = useState('Agent');
  const [selectedPerformance, setSelectedPerformance] = useState('High');
  const [autoMode, setAutoMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
    }
  };

  return (
    <div className="w-xl">
      <div className="overflow-hidden rounded-2xl border border-border bg-background">
        <input
          className="sr-only"
          multiple
          onChange={(e) => {}}
          ref={fileInputRef}
          type="file"
        />

        <div className="grow px-3 pt-3 pb-2">
          <form onSubmit={handleSubmit}>
            <Textarea
              className="max-h-[25vh] min-h-10 w-full resize-none border-0 border-none bg-transparent! p-0 text-foreground text-sm placeholder-muted-foreground shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => setInput(e.target.value)}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = target.scrollHeight + 'px';
              }}
              placeholder="Ask anything"
              rows={1}
              value={input}
            />
          </form>
        </div>

        <div className="mb-2 flex items-center justify-between px-2">
          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    className="h-7 w-7 rounded-full border border-border p-0 hover:bg-accent"
                    size="sm"
                    variant="ghost"
                  />
                }
              >
                <IconPlus className="size-3" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                className="max-w-xs rounded-2xl p-1.5"
              >
                <DropdownMenuGroup className="space-y-1">
                  <DropdownMenuItem
                    className="rounded-[calc(1rem-6px)] text-xs"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <IconPaperclip className="opacity-60" size={16} />
                    Attach Files
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="rounded-[calc(1rem-6px)] text-xs"
                    onClick={() => {}}
                  >
                    <IconCode className="opacity-60" size={16} />
                    Code Interpreter
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="rounded-[calc(1rem-6px)] text-xs"
                    onClick={() => {}}
                  >
                    <IconWorld className="opacity-60" size={16} />
                    Web Search
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="rounded-[calc(1rem-6px)] text-xs"
                    onClick={() => {}}
                  >
                    <IconHistory className="opacity-60" size={16} />
                    Chat History
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className={cn(
                'h-7 rounded-full border border-border px-2 hover:bg-accent ',
                {
                  'border-primary/30 bg-primary/10 text-primary': autoMode,
                  'text-muted-foreground': !autoMode,
                }
              )}
              onClick={() => setAutoMode(!autoMode)}
              size="sm"
              variant="ghost"
            >
              <IconWand className="size-3" />
              <span className="text-xs">Auto</span>
            </Button>
          </div>

          <div>
            <Button
              className="size-7 rounded-full bg-primary p-0 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!input.trim()}
              onClick={handleSubmit}
              type="submit"
            >
              <IconSend className="size-3 fill-primary" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-0 pt-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                className="h-6 rounded-full border border-transparent px-2 text-muted-foreground text-xs hover:bg-accent"
                size="sm"
                variant="ghost"
              />
            }
          >
            <IconDeviceLaptop className="size-3" />
            <span>{selectedModel}</span>
            <IconChevronDown className="size-3" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="max-w-xs rounded-2xl border-border bg-popover p-1.5"
          >
            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuItem
                className="rounded-[calc(1rem-6px)] text-xs"
                onClick={() => setSelectedModel('Local')}
              >
                <IconDeviceLaptop className="opacity-60" size={16} />
                Local
              </DropdownMenuItem>
              <DropdownMenuItem
                className="rounded-[calc(1rem-6px)] text-xs"
                onClick={() => setSelectedModel('Cloud')}
              >
                <IconCloud className="opacity-60" size={16} />
                Cloud
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                className="h-6 rounded-full border border-transparent px-2 text-muted-foreground text-xs hover:bg-accent"
                size="sm"
                variant="ghost"
              />
            }
          >
            <IconUser className="size-3" />
            <span>{selectedAgent}</span>
            <IconChevronDown className="size-3" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="max-w-xs rounded-2xl border-border bg-popover p-1.5"
          >
            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuItem
                className="rounded-[calc(1rem-6px)] text-xs"
                onClick={() => setSelectedAgent('Agent')}
              >
                <IconUser className="opacity-60" size={16} />
                Agent
              </DropdownMenuItem>
              <DropdownMenuItem
                className="rounded-[calc(1rem-6px)] text-xs"
                onClick={() => setSelectedAgent('Assistant')}
              >
                <IconRobot className="opacity-60" size={16} />
                Assistant
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                className="h-6 rounded-full border border-transparent px-2 text-muted-foreground text-xs hover:bg-accent"
                size="sm"
                variant="ghost"
              />
            }
          >
            <IconBolt className="size-3" />
            <span>{selectedPerformance}</span>
            <IconChevronDown className="size-3" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="max-w-xs rounded-2xl border-border bg-popover p-1.5"
          >
            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuItem
                className="rounded-[calc(1rem-6px)] text-xs"
                onClick={() => setSelectedPerformance('High')}
              >
                <IconCircle className="opacity-60" size={16} />
                High
              </DropdownMenuItem>
              <DropdownMenuItem
                className="rounded-[calc(1rem-6px)] text-xs"
                onClick={() => setSelectedPerformance('Medium')}
              >
                <IconProgress className="opacity-60" size={16} />
                Medium
              </DropdownMenuItem>
              <DropdownMenuItem
                className="rounded-[calc(1rem-6px)] text-xs"
                onClick={() => setSelectedPerformance('Low')}
              >
                <IconCircleDashed className="opacity-60" size={16} />
                Low
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex-1" />
      </div>
    </div>
  );
}
