"use client";

import { OpenInV0Button } from "@/components/open-in-v0-button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useCopy } from "@/hooks/use-copy";
import { BlocksProps } from "@/lib/blocks";
import {
  Check,
  Code,
  Copy,
  Fullscreen,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import CliCommands from "../cli-commands";
import { CodeBlockEditor } from "../code-block-editor";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Separator } from "./separator";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

interface BlockViewState {
  view: "preview" | "code";
  size: "desktop" | "tablet" | "mobile";
}

export const Block = ({
  name,
  blocksId,
  codeSource,
  code,
  meta,
  fileTree,
}: BlocksProps) => {
  const [hasCopied, setHasCopied] = useState(false);
  const [state, setState] = useState<BlockViewState>({
    view: "preview",
    size: "desktop",
  });

  const resizablePanelRef = useRef<ImperativePanelHandle>(null);
  const iframeHeight = meta?.iframeHeight ?? "930px";

  const [, copy] = useCopy();

  const getCleanCode = (rawCode: string | ReactNode): string => {
    let cleanCode = typeof rawCode === "string" ? rawCode : "";

    if (cleanCode.startsWith("````")) {
      try {
        const codeBlockRegex = /^````(?:\\w+)?\\s*\\n([\\s\\S]*?)\\n````\\s*$/;
        const [, extractedCode] = cleanCode.match(codeBlockRegex) || [];

        if (extractedCode) {
          cleanCode = extractedCode;
        }
      } catch (error) {
        console.error("Error parsing markdown for copy:", error);
      }
    }

    return cleanCode;
  };

  const handleViewChange = (value: string) => {
    setState((prev) => ({ ...prev, view: value as "preview" | "code" }));
  };

  const handleSizeChange = (value: string) => {
    if (value) {
      setState((prev) => ({
        ...prev,
        size: value as "desktop" | "tablet" | "mobile",
      }));

      if (resizablePanelRef?.current) {
        switch (value) {
          case "desktop":
            resizablePanelRef.current.resize(100);
            break;
          case "tablet":
            resizablePanelRef.current.resize(60);
            break;
          case "mobile":
            resizablePanelRef.current.resize(30);
            break;
        }
      }
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (hasCopied) {
      timeoutId = setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [hasCopied]);

  return (
    <div
      className="my-24 first:mt-8"
      id={blocksId}
      data-view={state.view}
      style={{ "--height": iframeHeight } as React.CSSProperties}
    >
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer font-medium text-foreground sm:text-lg">
            <a
              href={`#${blocksId}`}
              className="text-sm font-medium underline-offset-2 hover:underline"
            >
              {name}
            </a>
          </div>
          <div className="flex items-center">
            <Tabs
              value={state.view}
              onValueChange={handleViewChange}
              className="hidden lg:flex"
            >
              <TabsList className="h-7 items-center rounded-md p-0 px-[calc(theme(spacing.1)_-_2px)] py-[theme(spacing.1)] dark:bg-background dark:text-foreground dark:border">
                <TabsTrigger
                  value="preview"
                  className="h-[1.45rem] rounded-sm px-2 text-xs"
                  data-umami-event="View Block Preview"
                >
                  Preview
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="h-[1.45rem] rounded-sm px-2 text-xs"
                  data-umami-event="View Block Code"
                >
                  Code
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Separator
              orientation="vertical"
              className="mx-2 hidden h-4 lg:flex"
            />
            <div className="ml-auto hidden h-7 items-center gap-1.5 rounded-md border p-[2px] shadow-none lg:flex">
              <ToggleGroup
                type="single"
                value={state.size}
                onValueChange={(value) => {
                  handleSizeChange(value);
                }}
              >
                <ToggleGroupItem
                  value="desktop"
                  className="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
                  title="Desktop"
                  data-umami-event="Set Preview Desktop"
                >
                  <Monitor className="h-3.5 w-3.5" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="tablet"
                  className="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
                  title="Tablet"
                  data-umami-event="Set Preview Tablet"
                >
                  <Tablet className="h-3.5 w-3.5" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="mobile"
                  className="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
                  title="Mobile"
                  data-umami-event="Set Preview Mobile"
                >
                  <Smartphone className="h-3.5 w-3.5" />
                </ToggleGroupItem>
                <Separator orientation="vertical" className="h-4" />
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-[22px] w-[22px] rounded-sm p-0"
                  asChild
                  title="Open in New Tab"
                  data-umami-event="Open Block Fullscreen Preview"
                >
                  <Link href={`/blocks/preview/${blocksId}`} target="_blank">
                    <span className="sr-only">Open in New Tab</span>
                    <Fullscreen className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </ToggleGroup>
            </div>
            <Separator
              orientation="vertical"
              className="mx-1 hidden h-4 md:flex"
            />

            <div className="flex items-center gap-1">
              <Button
                onClick={() => {
                  const cleanCode = getCleanCode(code);
                  copy(cleanCode);
                  setHasCopied(true);
                }}
                variant="outline"
                size="icon"
                className="h-7 w-7"
                data-umami-event="Copy Block Code"
              >
                {hasCopied ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    data-umami-event="Copy shadcn cli command"
                  >
                    <Code className="h-3 w-3" />
                  </Button>
                </DialogTrigger>

                <DialogPortal>
                  <DialogOverlay className="backdrop-blur-sm" />
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-left">
                        Installation
                      </DialogTitle>
                      <DialogDescription className="sr-only">
                        Use the CLI to add blocks to your project
                      </DialogDescription>
                    </DialogHeader>
                    <CliCommands name={blocksId} />
                  </DialogContent>
                </DialogPortal>
              </Dialog>
            </div>

            <Separator
              orientation="vertical"
              className="mx-1 hidden h-4 xl:flex"
            />
            <OpenInV0Button name={blocksId} />
          </div>
        </div>
      </div>

      <div className="relative mt-4 w-full">
        {state.view === "preview" && (
          <div className="md:h-[--height]">
            <div className="grid w-full gap-4">
              <ResizablePanelGroup
                direction="horizontal"
                className="relative z-10"
              >
                <ResizablePanel
                  ref={resizablePanelRef}
                  className="relative rounded-lg border border-accent bg-background"
                  defaultSize={100}
                  minSize={30}
                >
                  <iframe
                    src={`/blocks/preview/${blocksId}`}
                    title={`${name} preview`}
                    height={meta?.iframeHeight ?? 930}
                    className="relative z-20 w-full bg-background"
                  />
                </ResizablePanel>
                <ResizableHandle className="relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:translate-x-[-1px] after:rounded-full after:bg-border after:transition-all after:hover:h-10 md:block" />
                <ResizablePanel defaultSize={0} minSize={0} />
              </ResizablePanelGroup>
            </div>
          </div>
        )}

        {state.view === "code" && meta?.type === "file" && (
          <div className="group-data-[view=preview]/block-view-wrapper:hidden md:h-[--height] rounded-lg overflow-auto">
            {codeSource}
          </div>
        )}

        {state.view === "code" && meta?.type === "directory" && (
          <div className="group-data-[view=preview]/block-view-wrapper:hidden md:h-[--height] rounded-lg overflow-auto">
            <CodeBlockEditor fileTree={fileTree ?? []} />
          </div>
        )}
      </div>
    </div>
  );
};
