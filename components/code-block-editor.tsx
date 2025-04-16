"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronRight, Clipboard, File, Folder } from "lucide-react";
import * as React from "react";
import { createHighlighter } from "shiki";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarProvider,
} from "@/components/ui/sidebar";

type FileItem = {
  name: string;
  path: string;
  content?: string;
  type: "file";
};

export type FolderItem = {
  name: string;
  path: string;
  type: "folder";
  children: FileTreeItem[];
};

export type FileTreeItem = FileItem | FolderItem;

type CodeBlockEditorContext = {
  activeFile: string | null;
  setActiveFile: (file: string) => void;
  fileTree: FileTreeItem[];
  expandedFolders: Set<string>;
  toggleFolder: (path: string) => void;
};

const CodeBlockEditorContext =
  React.createContext<CodeBlockEditorContext | null>(null);

function useCodeBlockEditor() {
  const context = React.useContext(CodeBlockEditorContext);
  if (!context) {
    throw new Error(
      "useCodeBlockEditor must be used within a CodeBlockEditorProvider"
    );
  }
  return context;
}

function CodeBlockEditorProvider({
  children,
  fileTree,
}: {
  children: React.ReactNode;
  fileTree: FileTreeItem[];
}) {
  const [activeFile, setActiveFile] = React.useState<string | null>(
    findFirstFile(fileTree)?.path || null
  );
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(
    () => {
      const expanded = new Set<string>();
      const addFolderPaths = (items: FileTreeItem[]) => {
        items.forEach((item) => {
          if (item.type === "folder") {
            expanded.add(item.path);
            addFolderPaths(item.children);
          }
        });
      };
      addFolderPaths(fileTree);
      return expanded;
    }
  );

  const toggleFolder = React.useCallback((path: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  }, []);

  return (
    <CodeBlockEditorContext.Provider
      value={{
        activeFile,
        setActiveFile,
        fileTree,
        expandedFolders,
        toggleFolder,
      }}
    >
      <div className="flex min-w-0 flex-col items-stretch rounded-lg border">
        {children}
      </div>
    </CodeBlockEditorContext.Provider>
  );
}

function findFirstFile(items: FileTreeItem[]): FileItem | null {
  for (const item of items) {
    if (item.type === "file") {
      return item;
    } else if (item.type === "folder") {
      const file = findFirstFile(item.children);
      if (file) return file;
    }
  }
  return null;
}

function findFileByPath(items: FileTreeItem[], path: string): FileItem | null {
  for (const item of items) {
    if (item.type === "file" && item.path === path) {
      return item;
    } else if (item.type === "folder") {
      const file = findFileByPath(item.children, path);
      if (file) return file;
    }
  }
  return null;
}

let highlighterInstance: Awaited<ReturnType<typeof createHighlighter>> | null =
  null;
let highlighterPromise: Promise<
  Awaited<ReturnType<typeof createHighlighter>>
> | null = null;

async function getHighlighter() {
  if (highlighterInstance) return highlighterInstance;

  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark"],
      langs: ["javascript", "typescript", "tsx", "jsx", "html", "css"],
    });
  }

  highlighterInstance = await highlighterPromise;
  return highlighterInstance;
}

function CodeBlockEditorToolbar() {
  const { activeFile, fileTree } = useCodeBlockEditor();
  const [isCopied, setIsCopied] = React.useState(false);

  const file = activeFile ? findFileByPath(fileTree, activeFile) : null;
  const content = file?.content || "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex h-10 items-center gap-2 border-b px-4 text-sm font-medium">
      <File className="h-4 w-4" />
      {file?.path || "Select a file"}
      <div className="ml-auto flex items-center gap-2">
        <Button
          onClick={copyToClipboard}
          className="h-7 w-7 rounded-md p-0"
          variant="ghost"
          size="sm"
        >
          {isCopied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Clipboard className="h-4 w-4" />
          )}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
    </div>
  );
}

function FileTreeView() {
  const { fileTree, expandedFolders } = useCodeBlockEditor();

  const renderableTree = React.useMemo(() => {
    const itemMap = new Map<
      string,
      FileTreeItem & { depth: number; visible: boolean }
    >();

    const addToMap = (
      items: FileTreeItem[],
      depth: number,
      parentVisible = true
    ) => {
      items.forEach((item) => {
        const isVisible =
          parentVisible &&
          (item.type === "folder" ||
            (item.type === "file" &&
              (!item.path.includes("/") ||
                expandedFolders.has(
                  item.path.substring(0, item.path.lastIndexOf("/"))
                ))));

        itemMap.set(item.path, { ...item, depth, visible: isVisible });

        if (item.type === "folder") {
          const folderVisible = isVisible && expandedFolders.has(item.path);
          addToMap(item.children, depth + 1, folderVisible);
        }
      });
    };

    addToMap(fileTree, 0);

    return Array.from(itemMap.values()).filter((item) => item.visible);
  }, [fileTree, expandedFolders]);

  return (
    <SidebarProvider className="flex !min-h-full flex-col">
      <Sidebar
        collapsible="none"
        className="w-full flex-1 border-r bg-muted/50"
      >
        <SidebarGroupLabel className="h-10 rounded-none border-b px-4 text-sm">
          Files
        </SidebarGroupLabel>
        <SidebarContent>
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <div className="flex flex-col gap-1 rounded-none">
                {renderableTree.map((item) => (
                  <TreeItem key={item.path} item={item} depth={item.depth} />
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}

function TreeItem({ item, depth }: { item: FileTreeItem; depth: number }) {
  const { activeFile, setActiveFile, expandedFolders, toggleFolder } =
    useCodeBlockEditor();
  const isExpanded = item.type === "folder" && expandedFolders.has(item.path);

  const handleClick = () => {
    if (item.type === "file") {
      setActiveFile(item.path);
    } else {
      toggleFolder(item.path);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex w-full items-center gap-2 whitespace-nowrap py-1.5 text-left text-sm hover:bg-muted",
        "pl-[calc(0.5rem+0.8rem*var(--depth))]",
        item.type === "file" &&
          item.path === activeFile &&
          "bg-muted font-medium"
      )}
      style={{ "--depth": depth } as React.CSSProperties}
    >
      {item.type === "folder" ? (
        <>
          <ChevronRight
            className={cn(
              "h-4 w-4 shrink-0 transition-transform",
              isExpanded && "rotate-90"
            )}
          />
          <Folder className="h-4 w-4 shrink-0" />
          <span className="font-medium truncate">{item.name}</span>
        </>
      ) : (
        <>
          <span className="w-4" /> {/* Spacer to align with folder items */}
          <File className="h-4 w-4 shrink-0" />
          <span className="truncate">{item.name}</span>
        </>
      )}
    </button>
  );
}

function CodeView() {
  const { activeFile, fileTree } = useCodeBlockEditor();
  const [highlightedCode, setHighlightedCode] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(true);

  const file = activeFile ? findFileByPath(fileTree, activeFile) : null;
  const content = file?.content || "";

  React.useEffect(() => {
    async function highlightCode() {
      if (!file) {
        setHighlightedCode("");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const highlighter = await getHighlighter();

        const extension = file.path.split(".").pop() || "";
        let lang = "typescript";

        if (extension === "css") lang = "css";
        else if (extension === "html") lang = "html";
        else if (extension === "js") lang = "javascript";
        else if (extension === "jsx") lang = "jsx";
        else if (extension === "tsx") lang = "tsx";

        const html = highlighter.codeToHtml(content, {
          lang,
          theme: "github-dark",
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHighlightedCode(`<pre>${content}</pre>`);
      } finally {
        setIsLoading(false);
      }
    }

    highlightCode();
  }, [file, content]);

  if (!file) {
    return <div className="p-4">Select a file to view its content</div>;
  }

  if (isLoading) {
    return <div className="p-4">Loading syntax highlighting...</div>;
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col code-block-editor-view">
      <div
        className="flex-1 overflow-auto bg-muted/30 p-4 text-sm !rounded-l-none !rounded-tr-none"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  );
}

export interface CodeBlockEditorProps {
  fileTree: FileTreeItem[];
}

export function CodeBlockEditor({ fileTree }: CodeBlockEditorProps) {
  if (!fileTree) {
    return <div>Loading editor...</div>;
  }

  return (
    <CodeBlockEditorProvider fileTree={fileTree}>
      <CodeBlockEditorToolbar />

      <div className="flex h-[700px] w-full overflow-hidden">
        <div className="w-[240px]">
          <FileTreeView />
        </div>
        <CodeView />
      </div>
    </CodeBlockEditorProvider>
  );
}
