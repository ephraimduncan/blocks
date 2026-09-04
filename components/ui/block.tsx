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
import { blocksComponents } from '@/content/blocks-components';
import type { BlocksProps } from '@/lib/blocks';
import { cn } from '@/lib/utils';
import { AddCommand } from '../add-command';
import { buttonVariants } from './button';
import { Separator } from './separator';
import { Tabs, TabsList, TabsTrigger } from './tabs';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';

interface BlockViewState {
  view: 'preview' | 'code';
  size: 'desktop' | 'tablet' | 'mobile';
}

const CODE_BLOCK_REGEX = /`{3,4}(?:[a-zA-Z0-9#+-]+)?\n([\s\S]*?)`{3,4}/;
const CODE_LANG_REGEX = /^`{3,4}([a-zA-Z0-9#+-]+)\n/;

const sizeItem =
  'h-full w-6.5 min-w-0 rounded-md p-0 text-foreground/60 hover:text-foreground aria-pressed:bg-background aria-pressed:text-foreground aria-pressed:shadow-sm dark:aria-pressed:border dark:aria-pressed:border-input dark:aria-pressed:bg-input/30';

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
  priority = false,
}: BlocksProps & { priority?: boolean }) => {
  const [state, setState] = useState<BlockViewState>({
    view: 'preview',
    size: 'desktop',
  });

  const resizablePanelRef = useRef<PanelImperativeHandle>(null);
  const iframeHeight = meta?.iframeHeight ?? '930px';

  // Single-file blocks render inline instead of in an iframe at desktop size.
  // Dialogs and command menus portal to the page body, so they keep the iframe.
  // Tablet and mobile keep the iframe so the block's media queries respond
  // to the panel width instead of the browser window.
  const InlineBlock =
    meta?.type === 'file' &&
    blocksCategory !== 'dialogs' &&
    blocksCategory !== 'command-menu' &&
    state.size === 'desktop'
      ? blocksComponents[blocksId]
      : null;

  // Same-origin iframes share the parent's main thread, so every offscreen
  // preview that boots early delays the visible ones. Mount only near the viewport.
  const [showFrame, setShowFrame] = useState(priority);
  const watchFrame = (node: HTMLDivElement | null) => {
    if (!node || showFrame) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowFrame(true);
        }
      },
      { rootMargin: '300px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  };

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
            resizablePanelRef.current.resize('100%');
            break;
          case 'tablet':
            resizablePanelRef.current.resize('60%');
            break;
          case 'mobile':
            resizablePanelRef.current.resize('30%');
            break;
          default:
            resizablePanelRef.current.resize('100%');
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
          prefetch={false}
        >
          {name}
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <Tabs
            className="hidden lg:flex"
            onValueChange={handleViewChange}
            value={state.view}
          >
            <TabsList>
              <TabsTrigger
                className="px-2.5"
                data-umami-event="View Block Preview"
                value="preview"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                className="px-2.5"
                data-umami-event="View Block Code"
                value="code"
              >
                Code
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="hidden h-8 items-center gap-0.5 rounded-lg bg-muted p-[3px] lg:flex">
            <ToggleGroup
              className="h-full gap-0.5"
              onValueChange={(value) => {
                const size = value[0];
                if (size) {
                  handleSizeChange(size);
                }
              }}
              value={[state.size]}
            >
              <ToggleGroupItem
                className={sizeItem}
                data-umami-event="Set Preview Desktop"
                title="Desktop"
                value="desktop"
              >
                <Monitor className="size-3.5" />
              </ToggleGroupItem>
              <ToggleGroupItem
                className={sizeItem}
                data-umami-event="Set Preview Tablet"
                title="Tablet"
                value="tablet"
              >
                <Tablet className="size-3.5" />
              </ToggleGroupItem>
              <ToggleGroupItem
                className={sizeItem}
                data-umami-event="Set Preview Mobile"
                title="Mobile"
                value="mobile"
              >
                <Smartphone className="size-3.5" />
              </ToggleGroupItem>
            </ToggleGroup>

            <Separator className="mx-0.5 h-4" orientation="vertical" />

            <Link
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'h-full w-6.5 rounded-md text-foreground/60 hover:text-foreground'
              )}
              data-umami-event="Open Block Fullscreen Preview"
              href={`/preview/${blocksId}`}
              prefetch={false}
              target="_blank"
              title="Open in New Tab"
            >
              <span className="sr-only">Open in New Tab</span>
              <Fullscreen className="size-3.5" />
            </Link>
          </div>

          <Separator className="hidden h-4 lg:block" orientation="vertical" />

          <AddCommand name={blocksId} />

          {meta?.type === 'file' && <OpenInPlaygroundButton name={blocksId} />}
          <OpenInV0Button name={blocksId} />
        </div>
      </div>

      <div className="relative mt-4 w-full">
        {state.view === 'preview' && (
          <ResizablePanelGroup
            className="md:h-(--height)"
            orientation="horizontal"
          >
            <ResizablePanel
              className="overflow-hidden rounded-2xl border border-black/10 bg-background dark:border-white/10"
              defaultSize={100}
              minSize={30}
              panelRef={resizablePanelRef}
            >
              {InlineBlock ? (
                <div className="overflow-auto" style={{ height: iframeHeight }}>
                  <div className="flex min-h-full w-full items-center justify-center [&_.h-dvh]:h-(--height) [&_.min-h-dvh]:min-h-0">
                    <InlineBlock />
                  </div>
                </div>
              ) : (
                <div ref={watchFrame} style={{ height: iframeHeight }}>
                  {showFrame && (
                    <iframe
                      className="w-full bg-background"
                      height={meta?.iframeHeight ?? 930}
                      src={`/preview/${blocksId}`}
                      title={`${name} preview`}
                    />
                  )}
                </div>
              )}
            </ResizablePanel>
            <ResizableHandle className="after:-translate-y-1/2 relative hidden w-3 bg-transparent p-0 after:absolute after:top-1/2 after:left-1/2 after:h-8 after:w-1.5 after:rounded-full after:bg-border after:transition-[height,background-color] after:hover:h-10 after:hover:bg-foreground/30 md:block" />
            <ResizablePanel defaultSize={0} minSize={0} />
          </ResizablePanelGroup>
        )}

        {state.view === 'code' && meta?.type === 'file' && (
          <SingleFileCodeView
            code={activeSingleFileCode.code}
            fileName={activeSingleFileCode.fileName}
            language={activeSingleFileCode.language}
          />
        )}

        {state.view === 'code' && meta?.type === 'directory' && (
          <div className="overflow-auto rounded-lg md:h-(--height)">
            <CodeBlockEditor blockTitle={name} fileTree={fileTree ?? []} />
          </div>
        )}
      </div>
    </div>
  );
};
