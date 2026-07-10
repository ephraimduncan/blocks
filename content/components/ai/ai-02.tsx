'use client';

import {
  IconAlertTriangle,
  IconArrowUp,
  IconCloud,
  IconFileSpark,
  IconGauge,
  IconPhotoScan,
} from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const PROMPTS = [
  {
    icon: IconFileSpark,
    text: 'Write documentation',
    prompt:
      'Write comprehensive documentation for this codebase, including setup instructions, API references, and usage examples.',
  },
  {
    icon: IconGauge,
    text: 'Optimize performance',
    prompt:
      'Analyze the codebase for performance bottlenecks and suggest optimizations to improve loading times and runtime efficiency.',
  },
  {
    icon: IconAlertTriangle,
    text: 'Find and fix 3 bugs',
    prompt:
      'Scan through the codebase to identify and fix 3 critical bugs, providing detailed explanations for each fix.',
  },
];

const MODELS = [
  {
    value: 'gpt-5',
    name: 'GPT-5',
    description: 'Most advanced model',
    max: true,
  },
  {
    value: 'gpt-4o',
    name: 'GPT-4o',
    description: 'Fast and capable',
  },
  {
    value: 'gpt-4',
    name: 'GPT-4',
    description: 'Reliable and accurate',
  },
  {
    value: 'claude-3.5',
    name: 'Claude 3.5 Sonnet',
    description: 'Great for coding tasks',
  },
];

export default function Ai02() {
  const [inputValue, setInputValue] = useState('');
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handlePromptClick = (prompt: string) => {
    if (inputRef.current) {
      inputRef.current.value = prompt;
      setInputValue(prompt);
      inputRef.current.focus();
    }
  };

  const handleModelChange = (value: string) => {
    const model = MODELS.find((m) => m.value === value);
    if (model) {
      setSelectedModel(model);
    }
  };

  const renderMaxBadge = () => (
    <div className="flex h-[14px] items-center gap-1.5 rounded border border-border px-1 py-0">
      <span
        className="font-bold text-[9px] uppercase"
        style={{
          background:
            'linear-gradient(to right, rgb(129, 161, 193), rgb(125, 124, 155))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        MAX
      </span>
    </div>
  );

  return (
    <div className="flex w-[calc(42rem-5rem)] flex-col gap-4">
      <div className="flex min-h-[120px] cursor-text flex-col rounded-2xl border border-border bg-card shadow-lg">
        <div className="relative max-h-[258px] flex-1 overflow-y-auto">
          <Textarea
            className="min-h-[48.4px] w-full resize-none whitespace-pre-wrap break-words border-0 bg-transparent! p-3 text-[16px] text-foreground shadow-none outline-none transition-[padding] duration-200 ease-in-out focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask anything"
            ref={inputRef}
            value={inputValue}
          />
        </div>

        <div className="flex min-h-[40px] items-center gap-2 p-2 pb-1">
          <div className="flex aspect-1 items-center gap-1 rounded-full bg-muted p-1.5 text-xs">
            <IconCloud className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="relative flex items-center">
            <Select
              onValueChange={(value) => {
                if (value) {
                  handleModelChange(value);
                }
              }}
              value={selectedModel.value}
            >
              <SelectTrigger className="w-fit border-none bg-transparent! p-0 text-muted-foreground text-sm shadow-none hover:text-foreground focus:ring-0">
                <SelectValue>
                  {selectedModel.max ? (
                    <div className="flex items-center gap-1">
                      <span>{selectedModel.name}</span>
                      {renderMaxBadge()}
                    </div>
                  ) : (
                    <span>{selectedModel.name}</span>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {MODELS.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.max ? (
                      <div className="flex items-center gap-1">
                        <span>{model.name}</span>
                        {renderMaxBadge()}
                      </div>
                    ) : (
                      <span>{model.name}</span>
                    )}
                    <span className="block text-muted-foreground text-xs">
                      {model.description}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Button
              aria-label="Attach images"
              className="text-muted-foreground transition-colors duration-100 ease-out hover:text-foreground"
              size="icon-sm"
              title="Attach images"
              variant="ghost"
            >
              <IconPhotoScan className="h-5 w-5" />
            </Button>

            <Button
              aria-label="Send message"
              className={cn(
                'cursor-pointer rounded-full bg-primary transition-colors duration-100 ease-out',
                inputValue && 'bg-primary hover:bg-primary/90!'
              )}
              disabled={!inputValue}
              size="icon-sm"
              variant="ghost"
            >
              <IconArrowUp className="h-4 w-4 text-primary-foreground" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {PROMPTS.map((button) => {
          const IconComponent = button.icon;
          return (
            <Button
              className="group flex h-auto items-center gap-2 rounded-full border bg-transparent px-3 py-2 text-foreground text-sm transition-colors duration-200 ease-out hover:bg-muted/30 dark:bg-muted"
              key={button.text}
              onClick={() => handlePromptClick(button.prompt)}
              variant="ghost"
            >
              <IconComponent className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
              <span>{button.text}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
