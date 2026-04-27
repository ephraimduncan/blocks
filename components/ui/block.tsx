'use client';

import type { SupportedLanguages } from '@pierre/diffs/react';
import { Fullscreen, Monitor, Smartphone, Tablet } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { type ReactNode, useRef, useState } from 'react';
import type { PanelImperativeHandle } from 'react-resizable-panels';
import { OpenInPlaygroundButton } from '@/components/open-in-playground-button';
import { OpenInV0Button } from '@/components/open-in-v0-button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import type { BlocksProps } from '@/lib/blocks';
import { AddCommand } from '../add-command';
import { Button } from './button';
import { Separator } from './separator';
import { Tabs, TabsList, TabsTrigger } from './tabs';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';

interface BlockViewState {
  view: 'preview' | 'code';
  size: 'desktop' | 'tablet' | 'mobile';
}

const CODE_BLOCK_REGEX = /`{3,4}(?:[a-zA-Z0-9#+-]+)?\n([\s\S]*?)`{3,4}/;
const CODE_LANG_REGEX = /^`{3,4}([a-zA-Z0-9#+-]+)\n/;

const CodeBlockEditor = dynamic(
  () => import('../code-block-editor').then((mod) => mod.CodeBlockEditor),
  { ssr: false }
);

const SingleFileCodeView = dynamic(
  () =>
    import('../single-file-code-view').then((mod) => mod.SingleFileCodeView),
  { ssr: false }
);

export const Block = ({
  name,
  blocksId,
  blocksCategory,
  code,
  meta,
  fileTree,
}: BlocksProps) => {
  const [state, setState] = useState<BlockViewState>({
    view: 'preview',
    size: 'desktop',
  });

  const resizablePanelRef = useRef<PanelImperativeHandle>(null);
  const iframeHeight = meta?.iframeHeight ?? '930px';

  const getCleanCode = (rawCode: string | ReactNode): string => {
    const cleanCode = typeof rawCode === 'string' ? rawCode : '';

    if (cleanCode.startsWith('```')) {
      const fencedCode = cleanCode.match(CODE_BLOCK_REGEX);
      if (fencedCode?.[1]) {
        return fencedCode[1];
      }
    }

    return cleanCode;
  };

  const getCodeLanguage = (rawCode: string | ReactNode): SupportedLanguages => {
    const cleanCode = typeof rawCode === 'string' ? rawCode : '';
    const language = cleanCode.match(CODE_LANG_REGEX)?.[1]?.toLowerCase();

    switch (language) {
      case 'ts':
      case 'typescript':
        return 'typescript';
      case 'tsx':
        return 'tsx';
      case 'js':
      case 'javascript':
        return 'javascript';
      case 'jsx':
        return 'jsx';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      case 'json':
        return 'json';
      case 'md':
      case 'markdown':
        return 'markdown';
      default:
        return 'tsx';
    }
  };

  const activeSingleFileCode = {
    code: getCleanCode(code),
    language: getCodeLanguage(code),
    fileName: `${blocksId}.tsx`,
  };

  const handleViewChange = (value: string) => {
    setState((prev) => ({ ...prev, view: value as 'preview' | 'code' }));
  };

  const handleSizeChange = (value: string) => {
    if (value) {
      setState((prev) => ({
        ...prev,
        size: value as 'desktop' | 'tablet' | 'mobile',
      }));

      if (resizablePanelRef?.current) {
        switch (value) {
          case 'desktop':
            resizablePanelRef.current.resize(100);
            break;
          case 'tablet':
            resizablePanelRef.current.resize(60);
            break;
          case 'mobile':
            resizablePanelRef.current.resize(30);
            break;
          default:
            resizablePanelRef.current.resize(100);
            break;
        }
      }
    }
  };

  return (
    <div
      className="mt-16 first:mt-0"
      data-view={state.view}
      id={blocksId}
      style={{ '--height': iframeHeight } as React.CSSProperties}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          className="font-medium text-[0.9375rem] text-foreground tracking-tight underline-offset-2 hover:underline"
          href={`/${blocksCategory}/${blocksId}`}
        >
          {name}
        </Link>

        <div className="flex flex-wrap items-center gap-1.5">
          <Tabs
            className="hidden lg:flex"
            onValueChange={handleViewChange}
            value={state.view}
          >
            <TabsList className="h-8 rounded-lg">
              <TabsTrigger
                className="h-7 rounded-md px-2.5"
                data-umami-event="View Block Preview"
                value="preview"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                className="h-7 rounded-md px-2.5"
                data-umami-event="View Block Code"
                value="code"
              >
                Code
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="ml-auto hidden h-8 items-center gap-0.5 rounded-lg bg-zinc-50 p-1 ring-1 ring-black/5 lg:flex">
            <ToggleGroup
              className="gap-0.5"
              onValueChange={(value) => {
                handleSizeChange(value);
              }}
              type="single"
              value={state.size}
            >
              <ToggleGroupItem
                className="size-6 min-w-0 rounded-md p-0"
                data-umami-event="Set Preview Desktop"
                title="Desktop"
                value="desktop"
              >
                <Monitor className="size-3.5" />
              </ToggleGroupItem>
              <ToggleGroupItem
                className="size-6 min-w-0 rounded-md p-0"
                data-umami-event="Set Preview Tablet"
                title="Tablet"
                value="tablet"
              >
                <Tablet className="size-3.5" />
              </ToggleGroupItem>
              <ToggleGroupItem
                className="size-6 min-w-0 rounded-md p-0"
                data-umami-event="Set Preview Mobile"
                title="Mobile"
                value="mobile"
              >
                <Smartphone className="size-3.5" />
              </ToggleGroupItem>
            </ToggleGroup>

            <Separator className="h-4" orientation="vertical" />

            <Button
              asChild
              className="size-6 rounded-md p-0"
              data-umami-event="Open Block Fullscreen Preview"
              size="icon"
              title="Open in New Tab"
              variant="ghost"
            >
              <Link href={`/blocks/preview/${blocksId}`} target="_blank">
                <span className="sr-only">Open in New Tab</span>
                <Fullscreen className="size-3.5" />
              </Link>
            </Button>
          </div>

          <Separator
            className="mx-0.5 hidden h-4 md:flex"
            orientation="vertical"
          />

          <AddCommand name={blocksId} />

          <Separator
            className="mx-0.5 hidden h-4 xl:flex"
            orientation="vertical"
          />

          <div className="flex items-center gap-1.5">
            {meta?.type === 'file' && (
              <OpenInPlaygroundButton name={blocksId} />
            )}
            <OpenInV0Button name={blocksId} />
          </div>
        </div>
      </div>

      <div className="relative mt-4 w-full">
        {state.view === 'preview' && (
          <div className="md:h-(--height)">
            <div className="grid w-full gap-4">
              <ResizablePanelGroup
                className="relative z-10"
                orientation="horizontal"
              >
                <ResizablePanel
                  className="relative"
                  defaultSize={100}
                  minSize={30}
                  panelRef={resizablePanelRef}
                >
                  <div className="h-full overflow-hidden rounded-2xl ring-1 ring-black/5">
                    <iframe
                      className="relative z-20 w-full bg-background"
                      height={meta?.iframeHeight ?? 930}
                      loading="lazy"
                      src={`/blocks/preview/${blocksId}`}
                      title={`${name} preview`}
                    />
                  </div>
                </ResizablePanel>
                <ResizableHandle className="after:-translate-y-1/2 after:-translate-x-px relative hidden w-3 bg-transparent p-0 after:absolute after:top-1/2 after:right-0 after:h-8 after:w-[6px] after:rounded-full after:bg-border after:transition-all after:hover:h-10 md:block" />
                <ResizablePanel defaultSize={0} minSize={0} />
              </ResizablePanelGroup>
            </div>
          </div>
        )}

        {state.view === 'code' && meta?.type === 'file' && (
          <div className="group-data-[view=preview]/block-view-wrapper:hidden">
            <SingleFileCodeView
              code={activeSingleFileCode.code}
              fileName={activeSingleFileCode.fileName}
              language={activeSingleFileCode.language}
            />
          </div>
        )}

        {state.view === 'code' && meta?.type === 'directory' && (
          <div className="overflow-auto rounded-lg group-data-[view=preview]/block-view-wrapper:hidden md:h-(--height)">
            <CodeBlockEditor blockTitle={name} fileTree={fileTree ?? []} />
          </div>
        )}
      </div>
    </div>
  );
};
