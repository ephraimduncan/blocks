'use client';

import type { SupportedLanguages } from '@pierre/diffs/react';
import { Fullscreen, Monitor, Smartphone, Tablet } from 'lucide-react';
import Link from 'next/link';
import posthog from 'posthog-js';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import type { ImperativePanelHandle } from 'react-resizable-panels';
import { OpenInPlaygroundButton } from '@/components/open-in-playground-button';
import { OpenInV0Button } from '@/components/open-in-v0-button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import type { BlocksProps } from '@/lib/blocks';
import { AddCommand } from '../add-command';
import { CodeBlockEditor } from '../code-block-editor';
import { SingleFileCodeView } from '../single-file-code-view';
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

  const resizablePanelRef = useRef<ImperativePanelHandle>(null);
  const hasTrackedPreview = useRef(false);
  const iframeHeight = meta?.iframeHeight ?? '930px';

  useEffect(() => {
    if (state.view === 'preview' && !hasTrackedPreview.current) {
      hasTrackedPreview.current = true;
      posthog.capture('block_preview_opened', {
        block_id: blocksId,
        category_id: blocksCategory,
      });
    }
  }, [state.view, blocksId, blocksCategory]);

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

    if (value === 'preview' && !hasTrackedPreview.current) {
      hasTrackedPreview.current = true;
      posthog.capture('block_preview_opened', {
        block_id: blocksId,
        category_id: blocksCategory,
      });
    }
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
      className="my-24 first:mt-8"
      data-view={state.view}
      id={blocksId}
      style={{ '--height': iframeHeight } as React.CSSProperties}
    >
      <div className="">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex cursor-pointer items-center gap-4 font-medium text-foreground sm:text-lg">
            <Link
              className="font-semibold text-base underline-offset-2 hover:underline"
              href={`/${blocksCategory}/${blocksId}`}
            >
              {name}
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-0">
            <Tabs
              className="hidden lg:flex"
              onValueChange={handleViewChange}
              value={state.view}
            >
              <TabsList className="h-8 items-center rounded-lg px-[calc(--spacing(1)-2px)] dark:border dark:bg-background dark:text-foreground">
                <TabsTrigger
                  className="h-7 rounded-md px-2 "
                  data-umami-event="View Block Preview"
                  value="preview"
                >
                  Preview
                </TabsTrigger>
                <TabsTrigger
                  className="h-7 rounded-md px-2"
                  data-umami-event="View Block Code"
                  value="code"
                >
                  Code
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Separator
              className="mx-2 hidden h-4 lg:flex"
              orientation="vertical"
            />
            <div className="ml-auto hidden h-8 items-center gap-1.5 rounded-md border p-0.5 shadow-none lg:flex">
              <ToggleGroup
                className="gap-0.5"
                onValueChange={(value) => {
                  handleSizeChange(value);
                }}
                type="single"
                value={state.size}
              >
                <ToggleGroupItem
                  className="h-[25px] w-[25px] min-w-0 rounded-sm p-0"
                  data-umami-event="Set Preview Desktop"
                  title="Desktop"
                  value="desktop"
                >
                  <Monitor className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="h-[25px] w-[25px] min-w-0 rounded-sm p-0"
                  data-umami-event="Set Preview Tablet"
                  title="Tablet"
                  value="tablet"
                >
                  <Tablet className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="h-[25px] w-[25px] min-w-0 rounded-sm p-0"
                  data-umami-event="Set Preview Mobile"
                  title="Mobile"
                  value="mobile"
                >
                  <Smartphone className="h-4 w-4" />
                </ToggleGroupItem>
                <Separator className="h-4.5" orientation="vertical" />
                <Button
                  asChild
                  className="h-[25px] w-[25px] rounded-sm p-0"
                  data-umami-event="Open Block Fullscreen Preview"
                  size="icon"
                  title="Open in New Tab"
                  variant="ghost"
                >
                  <Link href={`/blocks/preview/${blocksId}`} target="_blank">
                    <span className="sr-only">Open in New Tab</span>
                    <Fullscreen className="h-4 w-4" />
                  </Link>
                </Button>
              </ToggleGroup>
            </div>
            <Separator
              className="mx-1 hidden h-4 md:flex"
              orientation="vertical"
            />

            <div className="flex items-center gap-1">
              <AddCommand category={blocksCategory} name={blocksId} />
            </div>

            <Separator
              className="mx-1 hidden h-4 xl:flex"
              orientation="vertical"
            />
            <div className="flex items-center gap-2">
              {meta?.type === 'file' && (
                <OpenInPlaygroundButton
                  category={blocksCategory}
                  name={blocksId}
                />
              )}
              <OpenInV0Button category={blocksCategory} name={blocksId} />
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-4 w-full">
        {state.view === 'preview' && (
          <div className="md:h-(--height)">
            <div className="grid w-full gap-4">
              <ResizablePanelGroup
                className="relative z-10"
                direction="horizontal"
              >
                <ResizablePanel
                  className="relative rounded-lg border border-accent bg-background"
                  defaultSize={100}
                  minSize={30}
                  ref={resizablePanelRef}
                >
                  <iframe
                    className="relative z-20 w-full bg-background"
                    height={meta?.iframeHeight ?? 930}
                    src={`/blocks/preview/${blocksId}`}
                    title={`${name} preview`}
                  />
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
              blockId={blocksId}
              categoryId={blocksCategory}
              code={activeSingleFileCode.code}
              fileName={activeSingleFileCode.fileName}
              language={activeSingleFileCode.language}
            />
          </div>
        )}

        {state.view === 'code' && meta?.type === 'directory' && (
          <div className="overflow-auto rounded-lg group-data-[view=preview]/block-view-wrapper:hidden md:h-(--height)">
            <CodeBlockEditor
              blockId={blocksId}
              blockTitle={name}
              categoryId={blocksCategory}
              fileTree={fileTree ?? []}
            />
          </div>
        )}
      </div>
    </div>
  );
};
