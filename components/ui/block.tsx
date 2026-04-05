'use client';

import type { SupportedLanguages } from '@pierre/diffs/react';
import { Fullscreen, Monitor, Smartphone, Tablet } from 'lucide-react';
import Link from 'next/link';
import posthog from 'posthog-js';
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
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
import { Skeleton } from './skeleton';

interface BlockViewState {
  view: 'preview' | 'code';
  size: 'desktop' | 'tablet' | 'mobile';
}

const CODE_BLOCK_REGEX = /`{3,4}(?:[a-zA-Z0-9#+-]+)?\n([\s\S]*?)`{3,4}/;
const CODE_LANG_REGEX = /^`{3,4}([a-zA-Z0-9#+-]+)\n/;
const CHECKERBOARD = `url("data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Crect%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22rgba(0%2C0%2C0%2C0.01)%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2210%22%20y%3D%220%22%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22transparent%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%2210%22%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22transparent%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2210%22%20y%3D%2210%22%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22rgba(0%2C0%2C0%2C0.01)%22%2F%3E%0A%20%20%3C%2Fsvg%3E")`;

const BlockComponent = ({
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

  const [isMounted, setIsMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const hasTrackedPreview = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeHeight = meta?.iframeHeight ?? '930px';

  useEffect(() => {
    setIsMounted(true);

    // Setup native IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once it's in view, we stop observing (achieves "once: true")
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      { rootMargin: '300px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (state.view === 'preview' && !hasTrackedPreview.current) {
      hasTrackedPreview.current = true;
      posthog.capture('block_preview_opened', {
        block_id: blocksId,
        category_id: blocksCategory,
      });
    }
  }, [state.view, blocksId, blocksCategory]);

  const getCleanCode = useCallback((rawCode: string | ReactNode): string => {
    const cleanCode = typeof rawCode === 'string' ? rawCode : '';
    if (cleanCode.startsWith('```')) {
      const fencedCode = cleanCode.match(CODE_BLOCK_REGEX);
      if (fencedCode?.[1]) return fencedCode[1];
    }
    return cleanCode;
  }, []);

  const getCodeLanguage = useCallback((rawCode: string | ReactNode): SupportedLanguages => {
    const cleanCode = typeof rawCode === 'string' ? rawCode : '';
    const language = cleanCode.match(CODE_LANG_REGEX)?.[1]?.toLowerCase();

    switch (language) {
      case 'ts': case 'typescript': return 'typescript';
      case 'tsx': return 'tsx';
      case 'js': case 'javascript': return 'javascript';
      case 'jsx': return 'jsx';
      case 'css': return 'css';
      case 'html': return 'html';
      case 'json': return 'json';
      case 'md': case 'markdown': return 'markdown';
      default: return 'tsx';
    }
  }, []);

  const activeSingleFileCode = useMemo(() => ({
    code: getCleanCode(code),
    language: getCodeLanguage(code),
    fileName: `${blocksId}.tsx`,
  }), [code, blocksId, getCleanCode, getCodeLanguage]);

  const handleViewChange = useCallback((value: string) => {
    setState((prev) => ({ ...prev, view: value as 'preview' | 'code' }));
  }, []);

  const handleSizeChange = useCallback((value: string) => {
    if (value) {
      setState((prev) => ({ ...prev, size: value as 'desktop' | 'tablet' | 'mobile' }));
    }
  }, []);

  const currentSizes = useMemo(() => {
    switch (state.size) {
      case 'tablet': return { left: 60, right: 40 };
      case 'mobile': return { left: 30, right: 70 };
      default: return { left: 100, right: 0 };
    }
  }, [state.size]);

  return (
    <div
      className="my-24 first:mt-8 w-full max-w-full"
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
            <Tabs className="hidden lg:flex" onValueChange={handleViewChange} value={state.view}>
              <TabsList className="h-8 items-center rounded-lg px-[calc(--spacing(1)-2px)] dark:border dark:bg-background dark:text-foreground">
                <TabsTrigger className="h-7 rounded-md px-2" value="preview">Preview</TabsTrigger>
                <TabsTrigger className="h-7 rounded-md px-2" value="code">Code</TabsTrigger>
              </TabsList>
            </Tabs>
            <Separator className="mx-2 hidden h-4 lg:flex" orientation="vertical" />
            <div className="ml-auto hidden h-8 items-center gap-1.5 rounded-md border p-0.5 shadow-none lg:flex">
              <ToggleGroup className="gap-0.5" onValueChange={handleSizeChange} type="single" value={state.size}>
                <ToggleGroupItem className="h-[25px] w-[25px] min-w-0 rounded-sm p-0" title="Desktop" value="desktop">
                  <Monitor className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem className="h-[25px] w-[25px] min-w-0 rounded-sm p-0" title="Tablet" value="tablet">
                  <Tablet className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem className="h-[25px] w-[25px] min-w-0 rounded-sm p-0" title="Mobile" value="mobile">
                  <Smartphone className="h-4 w-4" />
                </ToggleGroupItem>
                <Separator className="h-4.5" orientation="vertical" />
                <Button asChild className="h-[25px] w-[25px] rounded-sm p-0" size="icon" variant="ghost">
                  <Link href={`/blocks/preview/${blocksId}`} target="_blank">
                    <Fullscreen className="h-4 w-4" />
                  </Link>
                </Button>
              </ToggleGroup>
            </div>
            <Separator className="mx-1 hidden h-4 md:flex" orientation="vertical" />
            <div className="flex items-center gap-1">
              <AddCommand category={blocksCategory} name={blocksId} />
            </div>
            <Separator className="mx-1 hidden h-4 xl:flex" orientation="vertical" />
            <div className="flex items-center gap-2">
              {meta?.type === 'file' && (
                <OpenInPlaygroundButton category={blocksCategory} name={blocksId} />
              )}
              <OpenInV0Button category={blocksCategory} name={blocksId} />
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-4 w-full">
        {state.view === 'preview' && (
          <div ref={containerRef} className="md:h-(--height) w-full">
            {!isMounted ? (
              <div className="relative w-full rounded-lg border border-accent bg-background">
                <Skeleton
                  className="relative z-20 w-full"
                  style={{ display: 'block', height: meta?.iframeHeight ?? 930 }}
                />
              </div>
            ) : !isInView ? (
              <div
                className="flex items-center justify-center border rounded-lg text-sm text-muted-foreground"
                style={{ height: meta?.iframeHeight ?? 930 }}
              >
                Loading preview...
              </div>
            ) : (
              <div className="flex w-full overflow-hidden">
                <ResizablePanelGroup key={state.size} className="relative z-10 w-full" orientation="horizontal">
                  <ResizablePanel className="relative rounded-lg border border-accent bg-background" defaultSize={currentSizes.left} minSize={20}>
                    <iframe
                      className="relative z-20 w-full bg-background"
                      height={meta?.iframeHeight ?? 930}
                      src={`/blocks/preview/${blocksId}`}
                      title={`${name} preview`}
                      style={{ display: 'block' }}
                    />
                  </ResizablePanel>
                  <ResizableHandle className="after:-translate-y-1/2 after:-translate-x-px relative hidden w-3 bg-transparent p-0 after:absolute after:top-1/2 after:right-0 after:h-8 after:w-[6px] after:rounded-full after:bg-border md:block cursor-col-resize" />
                  <ResizablePanel defaultSize={currentSizes.right} minSize={0}>
                    <div
                      className="bg-muted/30"
                      style={{
                        backgroundImage: CHECKERBOARD,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '20px 20px',
                        height: '100%',
                        width: '100%',
                      }}
                    />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            )}
          </div>
        )}

        {state.view === 'code' && meta?.type === 'file' && (
          <SingleFileCodeView
            blockId={blocksId}
            categoryId={blocksCategory}
            code={activeSingleFileCode.code}
            fileName={activeSingleFileCode.fileName}
            language={activeSingleFileCode.language}
          />
        )}

        {state.view === 'code' && meta?.type === 'directory' && (
          <div className="overflow-auto rounded-lg md:h-(--height)">
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

export const Block = memo(BlockComponent);