'use client';

import { preloadHighlighter } from '@pierre/diffs';
import { File, type SupportedLanguages } from '@pierre/diffs/react';
import {
  IconCheck,
  IconColorDark,
  IconColorLight,
  IconCopy,
  IconFileCode,
} from '@pierre/icons';
import {
  IconFile,
  IconFileTypeTs,
  IconFileTypeTsx,
  IconFolder,
  IconFolderOpen,
} from '@tabler/icons-react';
import { ChevronRight } from 'lucide-react';
import posthog from 'posthog-js';
import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

preloadHighlighter({
  themes: ['pierre-dark', 'pierre-light'],
  langs: ['tsx'],
});

const COLOR_MODE_STORAGE_KEY = 'blocks-code-preview-color-mode';

type FileItem = {
  name: string;
  path: string;
  content?: string;
  type: 'file';
};

export type FolderItem = {
  name: string;
  path: string;
  type: 'folder';
  children: FileTreeItem[];
};

export type FileTreeItem = FileItem | FolderItem;

type CodeBlockEditorContext = {
  activeFile: string | null;
  setActiveFile: (file: string) => void;
  openFiles: string[];
  fileTree: FileTreeItem[];
  expandedFolders: Set<string>;
  toggleFolder: (path: string) => void;
  blockTitle?: string;
  blockId?: string;
  categoryId?: string;
};

const CodeBlockEditorContext =
  React.createContext<CodeBlockEditorContext | null>(null);

function useCodeBlockEditor() {
  const context = React.useContext(CodeBlockEditorContext);
  if (!context) {
    throw new Error(
      'useCodeBlockEditor must be used within a CodeBlockEditorProvider'
    );
  }
  return context;
}

function CodeBlockEditorProvider({
  children,
  fileTree,
  blockTitle,
  blockId,
  categoryId,
}: {
  children: React.ReactNode;
  fileTree: FileTreeItem[];
  blockTitle?: string;
  blockId?: string;
  categoryId?: string;
}) {
  const initialFilePath = findFirstFile(fileTree)?.path || null;

  const [activeFile, setActiveFileState] = React.useState<string | null>(
    initialFilePath
  );
  const [openFiles, setOpenFiles] = React.useState<string[]>(
    initialFilePath ? [initialFilePath] : []
  );
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(
    () => {
      const expanded = new Set<string>();
      const addFirstLevelFolders = (items: FileTreeItem[]) => {
        items.forEach((item) => {
          if (item.type === 'folder' && !item.path.includes('/')) {
            expanded.add(item.path);
          }
        });
      };
      addFirstLevelFolders(fileTree);
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

  const setActiveFile = React.useCallback((filePath: string) => {
    setOpenFiles((prev) =>
      prev.includes(filePath) ? prev : [...prev, filePath]
    );
    setActiveFileState(filePath);
  }, []);

  return (
    <CodeBlockEditorContext.Provider
      value={{
        activeFile,
        setActiveFile,
        openFiles,
        fileTree,
        expandedFolders,
        toggleFolder,
        blockTitle,
        blockId,
        categoryId,
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
    if (item.type === 'file') {
      return item;
    }
    if (item.type === 'folder') {
      const file = findFirstFile(item.children);
      if (file) return file;
    }
  }
  return null;
}

function findFileByPath(items: FileTreeItem[], path: string): FileItem | null {
  for (const item of items) {
    if (item.type === 'file' && item.path === path) {
      return item;
    }
    if (item.type === 'folder') {
      const file = findFileByPath(item.children, path);
      if (file) return file;
    }
  }
  return null;
}

function getFileIcon(filename: string) {
  if (filename.endsWith('.tsx')) return IconFileTypeTsx;
  if (filename.endsWith('.ts')) return IconFileTypeTs;
  return IconFile;
}

function getLanguageFromPath(filePath: string): SupportedLanguages {
  const extension = filePath.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'ts':
      return 'typescript';
    case 'tsx':
      return 'tsx';
    case 'js':
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
    case 'mdx':
      return 'markdown';
    default:
      return 'tsx';
  }
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
          (item.type === 'folder' ||
            (item.type === 'file' &&
              (!item.path.includes('/') ||
                expandedFolders.has(
                  item.path.substring(0, item.path.lastIndexOf('/'))
                ))));

        itemMap.set(item.path, { ...item, depth, visible: isVisible });

        if (item.type === 'folder') {
          const folderVisible = isVisible && expandedFolders.has(item.path);
          addToMap(item.children, depth + 1, folderVisible);
        }
      });
    };

    addToMap(fileTree, 0);

    return Array.from(itemMap.values()).filter((item) => item.visible);
  }, [fileTree, expandedFolders]);

  return (
    <SidebarProvider className="flex min-h-full! flex-col">
      <Sidebar
        className="w-full flex-1 border-r bg-muted/50"
        collapsible="none"
      >
        <SidebarContent>
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <div className="flex flex-col gap-0.5 rounded-none">
                {renderableTree.map((item) => (
                  <TreeItem depth={item.depth} item={item} key={item.path} />
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
  const isExpanded = item.type === 'folder' && expandedFolders.has(item.path);

  const handleClick = () => {
    if (item.type === 'file') {
      setActiveFile(item.path);
    } else {
      toggleFolder(item.path);
    }
  };

  return (
    <button
      className={cn(
        'flex w-full items-center gap-2 whitespace-nowrap py-1.5 text-left text-sm hover:bg-muted',
        'pl-[calc(0.5rem+0.8rem*var(--depth))]',
        item.type === 'file' &&
          item.path === activeFile &&
          'bg-muted font-medium'
      )}
      onClick={handleClick}
      style={{ '--depth': depth } as React.CSSProperties}
      type="button"
    >
      {item.type === 'folder' ? (
        <>
          <ChevronRight
            className={cn(
              'h-4 w-4 shrink-0 transition-transform',
              isExpanded && 'rotate-90'
            )}
          />
          {isExpanded ? (
            <IconFolderOpen className="h-4 w-4 shrink-0" />
          ) : (
            <IconFolder className="h-4 w-4 shrink-0" />
          )}

          <span className="truncate font-medium">{item.name}</span>
        </>
      ) : (
        <>
          <span className="w-4" />
          {React.createElement(getFileIcon(item.name), {
            className: 'h-4 w-4 shrink-0',
          })}
          <span className="truncate">{item.name}</span>
        </>
      )}
    </button>
  );
}

function CodeView() {
  const {
    activeFile,
    fileTree,
    openFiles,
    setActiveFile,
    blockId,
    categoryId,
  } = useCodeBlockEditor();
  const [colorMode, setColorMode] = React.useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const copiedTimeoutRef = React.useRef<number | null>(null);

  const file = activeFile ? findFileByPath(fileTree, activeFile) : null;
  const content = file?.content ?? '';

  const openTabs = React.useMemo(() => {
    return openFiles
      .map((path) => findFileByPath(fileTree, path))
      .filter((item): item is FileItem => item !== null);
  }, [fileTree, openFiles]);

  React.useEffect(() => {
    setMounted(true);

    const storedColorMode = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY);
    if (storedColorMode === 'light' || storedColorMode === 'dark') {
      setColorMode(storedColorMode);
    }
  }, []);

  React.useEffect(() => {
    if (!mounted) {
      return;
    }

    window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, colorMode);
  }, [colorMode, mounted]);

  React.useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current !== null) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  const styles = React.useMemo(
    () => ({
      container:
        colorMode === 'dark'
          ? 'border-neutral-700/50 bg-[#1b1d23]'
          : 'border-neutral-300/70 bg-[#f9f9fb]',
      tabBar:
        colorMode === 'dark'
          ? 'border-neutral-700/50 bg-neutral-900'
          : 'border-neutral-200 bg-neutral-50',
      tabActive:
        colorMode === 'dark'
          ? 'border-neutral-700/50 bg-neutral-950 text-neutral-100'
          : 'border-neutral-200 bg-[#fff] text-neutral-900',
      controls: colorMode === 'dark' ? 'text-neutral-300' : 'text-neutral-700',
      tabIdle:
        colorMode === 'dark'
          ? 'text-neutral-300 hover:bg-neutral-800/70'
          : 'text-neutral-700 hover:bg-neutral-100',
    }),
    [colorMode]
  );

  if (!file) {
    return <div className="p-4">Select a file to view its content</div>;
  }

  if (!mounted) {
    return <div className="p-4">Loading syntax highlighting...</div>;
  }

  const themeName = colorMode === 'dark' ? 'pierre-dark' : 'pierre-light';

  const handleColorModeToggle = () => {
    setColorMode((mode) => (mode === 'dark' ? 'light' : 'dark'));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);

      if (file && blockId && categoryId) {
        posthog.capture('snippet_copied', {
          block_id: blockId,
          category_id: categoryId,
          snippet_type: 'source_code',
          language: getLanguageFromPath(file.path),
        });
      }

      if (copiedTimeoutRef.current !== null) {
        window.clearTimeout(copiedTimeoutRef.current);
      }

      copiedTimeoutRef.current = window.setTimeout(
        () => setCopied(false),
        1200
      );
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="code-block-editor-view flex h-full min-w-0 flex-1 flex-col">
      <div
        className={cn(
          'flex h-full min-h-0 flex-col overflow-hidden rounded-r-sm border-y border-r transition-colors',
          styles.container
        )}
      >
        <div
          className={cn(
            '-ml-[1px] flex items-center justify-between border-b',
            styles.tabBar
          )}
        >
          <div className="min-w-0 flex-1 overflow-x-auto">
            <div className="flex min-w-max items-center">
              {openTabs.map((openTab) => {
                const isActive = openTab.path === file.path;

                return (
                  <button
                    className={cn(
                      'relative flex items-center gap-2 whitespace-nowrap border-transparent border-r border-l px-4 py-2 font-medium text-sm',
                      isActive
                        ? styles.tabActive
                        : cn(
                            'border-transparent bg-transparent',
                            styles.tabIdle
                          )
                    )}
                    key={openTab.path}
                    onClick={() => setActiveFile(openTab.path)}
                    title={openTab.path}
                    type="button"
                  >
                    <IconFileCode className="size-4 text-blue-400" />
                    <span>{openTab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mr-2 flex shrink-0 items-center gap-1">
            <button
              aria-label={
                colorMode === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
              className={cn(
                'inline-flex size-6 items-center justify-center transition-opacity hover:opacity-80',
                styles.controls
              )}
              onClick={handleColorModeToggle}
              title={
                colorMode === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
              type="button"
            >
              {colorMode === 'dark' ? (
                <IconColorLight className="size-3.5" />
              ) : (
                <IconColorDark className="size-3.5" />
              )}
            </button>

            <button
              aria-label={copied ? 'Copied' : 'Copy code'}
              className={cn(
                'inline-flex size-6 items-center justify-center transition-opacity hover:opacity-80',
                styles.controls
              )}
              onClick={handleCopy}
              title={copied ? 'Copied' : 'Copy code'}
              type="button"
            >
              {copied ? (
                <IconCheck className="size-3.5" />
              ) : (
                <IconCopy className="size-3.5" />
              )}
            </button>
          </div>
        </div>

        <File
          className="min-h-0 flex-1 overflow-auto"
          file={{
            name: file.path,
            lang: getLanguageFromPath(file.path),
            contents: content,
          }}
          options={{
            theme: themeName,
            themeType: colorMode,
            disableFileHeader: true,
          }}
          style={
            {
              '--diffs-font-family':
                'var(--font-mono), var(--diffs-font-fallback)',
              '--diffs-font-size': '14px',
              '--diffs-line-height': '22px',
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}

export interface CodeBlockEditorProps {
  fileTree: FileTreeItem[];
  blockTitle?: string;
  height?: string;
  blockId?: string;
  categoryId?: string;
}

export function buildFileTree(paths: string[]): FileTreeItem[] {
  const root: { [key: string]: any } = {};

  paths.forEach((path) => {
    const parts = path.split('/').filter(Boolean);
    let current = root;
    let currentPath = '';

    parts.forEach((part, index) => {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      const isFile = index === parts.length - 1;

      if (!current[part]) {
        current[part] = {
          name: part,
          path: currentPath,
          type: isFile ? 'file' : 'folder',
          ...(isFile
            ? { content: `// Content for ${currentPath}` }
            : { children: {} }),
        };
      }

      if (!isFile && current[part].type === 'folder') {
        current = current[part].children;
      }
    });
  });

  const convertToArray = (obj: any, parentPath = ''): FileTreeItem[] => {
    return Object.values(obj)
      .map((node: any) => {
        if (node.type === 'folder' && node.children) {
          return {
            ...node,
            children: convertToArray(node.children, node.path),
          };
        }
        return node;
      })
      .sort((a: FileTreeItem, b: FileTreeItem) => {
        if (a.type !== b.type) {
          return a.type === 'folder' ? -1 : 1;
        }

        return a.name.localeCompare(b.name);
      });
  };

  return convertToArray(root);
}

export function CodeBlockEditor({
  fileTree,
  blockTitle,
  height = '700px',
  blockId,
  categoryId,
}: CodeBlockEditorProps) {
  if (!fileTree || fileTree.length === 0) {
    return (
      <div className="rounded-lg border p-4 text-muted-foreground">
        No files to display
      </div>
    );
  }

  const sortedFileTree = React.useMemo(() => {
    const sortTree = (items: FileTreeItem[]): FileTreeItem[] => {
      return [...items]
        .sort((a, b) => {
          if (a.type !== b.type) {
            return a.type === 'folder' ? -1 : 1;
          }
          return a.name.localeCompare(b.name);
        })
        .map((item) => {
          if (item.type === 'folder' && item.children) {
            return { ...item, children: sortTree(item.children) };
          }
          return item;
        });
    };
    return sortTree(fileTree);
  }, [fileTree]);

  return (
    <CodeBlockEditorProvider
      blockId={blockId}
      blockTitle={blockTitle}
      categoryId={categoryId}
      fileTree={sortedFileTree}
    >
      <div className="flex w-full overflow-hidden" style={{ height }}>
        <div className="w-[240px] shrink-0 border-r">
          <FileTreeView />
        </div>
        <div className="min-w-0 flex-1">
          <CodeView />
        </div>
      </div>
    </CodeBlockEditorProvider>
  );
}
