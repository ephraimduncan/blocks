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
import * as React from 'react';
import { useCopyToClipboard } from '@/hooks/use-copy';
import type { FileItem, FileTreeItem } from '@/lib/blocks';
import { cn } from '@/lib/utils';

preloadHighlighter({ themes: ['pierre-dark', 'pierre-light'], langs: ['tsx'] });

const COLOR_MODE_STORAGE_KEY = 'blocks-code-preview-color-mode';

type EditorContext = {
  activeFile: string | null;
  setActiveFile: (file: string) => void;
  openFiles: string[];
  fileTree: FileTreeItem[];
  expandedFolders: Set<string>;
  toggleFolder: (path: string) => void;
};

const EditorContext = React.createContext<EditorContext | null>(null);

function useEditor() {
  const context = React.useContext(EditorContext);
  if (!context) throw new Error('useEditor must be used within EditorProvider');
  return context;
}

function EditorProvider({
  children,
  fileTree,
}: {
  children: React.ReactNode;
  fileTree: FileTreeItem[];
}) {
  const firstFile = findFirstFile(fileTree)?.path ?? null;
  const [activeFile, setActiveFileState] = React.useState(firstFile);
  const [openFiles, setOpenFiles] = React.useState(
    firstFile ? [firstFile] : []
  );
  const [expandedFolders, setExpandedFolders] = React.useState(
    () =>
      new Set(
        fileTree
          .filter((item) => item.type === 'folder')
          .map((item) => item.path)
      )
  );
  const toggleFolder = React.useCallback((path: string) => {
    setExpandedFolders((old) => {
      const next = new Set(old);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);
  const setActiveFile = React.useCallback((path: string) => {
    setOpenFiles((old) => (old.includes(path) ? old : [...old, path]));
    setActiveFileState(path);
  }, []);

  return (
    <EditorContext.Provider
      value={{
        activeFile,
        setActiveFile,
        openFiles,
        fileTree,
        expandedFolders,
        toggleFolder,
      }}
    >
      <div className="flex min-w-0 flex-col items-stretch rounded-lg border">
        {children}
      </div>
    </EditorContext.Provider>
  );
}

function findFirstFile(items: FileTreeItem[]): FileItem | null {
  for (const item of items) {
    if (item.type === 'file') return item;
    const file = findFirstFile(item.children);
    if (file) return file;
  }
  return null;
}

function findFile(items: FileTreeItem[], path: string): FileItem | null {
  for (const item of items) {
    if (item.type === 'file' && item.path === path) return item;
    if (item.type === 'folder') {
      const file = findFile(item.children, path);
      if (file) return file;
    }
  }
  return null;
}

function getFileIcon(name: string) {
  if (name.endsWith('.tsx')) return IconFileTypeTsx;
  if (name.endsWith('.ts')) return IconFileTypeTs;
  return IconFile;
}

const languages: Record<string, SupportedLanguages> = {
  ts: 'typescript',
  tsx: 'tsx',
  js: 'javascript',
  jsx: 'jsx',
  css: 'css',
  html: 'html',
  json: 'json',
  md: 'markdown',
  mdx: 'markdown',
};

function FileTreeView() {
  const { fileTree } = useEditor();
  return (
    <div className="flex min-h-full flex-col gap-0.5 border-r bg-muted/50">
      {fileTree.map((item) => (
        <TreeItem depth={0} item={item} key={item.path} />
      ))}
    </div>
  );
}

function TreeItem({ item, depth }: { item: FileTreeItem; depth: number }) {
  const { activeFile, setActiveFile, expandedFolders, toggleFolder } =
    useEditor();
  const isExpanded = item.type === 'folder' && expandedFolders.has(item.path);

  return (
    <>
      <button
        className={cn(
          'flex w-full items-center gap-2 whitespace-nowrap py-1.5 text-left text-sm hover:bg-muted',
          'pl-[calc(0.5rem+0.8rem*var(--depth))]',
          item.type === 'file' &&
            item.path === activeFile &&
            'bg-muted font-medium'
        )}
        onClick={() =>
          item.type === 'file'
            ? setActiveFile(item.path)
            : toggleFolder(item.path)
        }
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
      {item.type === 'folder' && isExpanded
        ? item.children.map((child) => (
            <TreeItem depth={depth + 1} item={child} key={child.path} />
          ))
        : null}
    </>
  );
}

function CodeView() {
  const { activeFile, fileTree, openFiles, setActiveFile } = useEditor();
  const [colorMode, setColorMode] = React.useState<'light' | 'dark'>(() =>
    window.localStorage.getItem(COLOR_MODE_STORAGE_KEY) === 'dark'
      ? 'dark'
      : 'light'
  );
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 1200 });
  const file = activeFile ? findFile(fileTree, activeFile) : null;
  const content = file?.content ?? '';
  const openTabs = React.useMemo(
    () =>
      openFiles
        .map((path) => findFile(fileTree, path))
        .filter((item): item is FileItem => item !== null),
    [fileTree, openFiles]
  );
  const isDark = colorMode === 'dark';
  const styles = {
    container: isDark
      ? 'border-neutral-700/50 bg-[#1b1d23]'
      : 'border-neutral-300/70 bg-[#f9f9fb]',
    tabBar: isDark
      ? 'border-neutral-700/50 bg-neutral-900'
      : 'border-neutral-200 bg-neutral-50',
    tabActive: isDark
      ? 'border-neutral-700/50 bg-neutral-950 text-neutral-100'
      : 'border-neutral-200 bg-[#fff] text-neutral-900',
    controls: isDark ? 'text-neutral-300' : 'text-neutral-700',
    tabIdle: isDark
      ? 'text-neutral-300 hover:bg-neutral-800/70'
      : 'text-neutral-700 hover:bg-neutral-100',
  };

  if (!file)
    return <div className="p-4">Select a file to view its content</div>;

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
              {openTabs.map((tab) => (
                <button
                  className={cn(
                    'relative flex items-center gap-2 whitespace-nowrap border-transparent border-r border-l px-4 py-2 font-medium text-sm',
                    tab.path === file.path
                      ? styles.tabActive
                      : cn('border-transparent bg-transparent', styles.tabIdle)
                  )}
                  key={tab.path}
                  onClick={() => setActiveFile(tab.path)}
                  title={tab.path}
                  type="button"
                >
                  <IconFileCode className="size-4 text-blue-400" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mr-2 flex shrink-0 items-center gap-1">
            <button
              aria-label={
                isDark ? 'Switch to light mode' : 'Switch to dark mode'
              }
              className={cn(
                'inline-flex size-6 items-center justify-center transition-opacity hover:opacity-80',
                styles.controls
              )}
              onClick={() => {
                const mode = isDark ? 'light' : 'dark';
                window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, mode);
                setColorMode(mode);
              }}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              type="button"
            >
              {isDark ? (
                <IconColorLight className="size-3.5" />
              ) : (
                <IconColorDark className="size-3.5" />
              )}
            </button>
            <button
              aria-label={isCopied ? 'Copied' : 'Copy code'}
              className={cn(
                'inline-flex size-6 items-center justify-center transition-opacity hover:opacity-80',
                styles.controls
              )}
              onClick={() => copyToClipboard(content)}
              title={isCopied ? 'Copied' : 'Copy code'}
              type="button"
            >
              {isCopied ? (
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
            lang:
              languages[file.path.split('.').pop()?.toLowerCase() ?? ''] ??
              'tsx',
            contents: content,
          }}
          options={{
            theme: isDark ? 'pierre-dark' : 'pierre-light',
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

export function CodeBlockEditor({ fileTree }: { fileTree: FileTreeItem[] }) {
  if (fileTree.length === 0) {
    return (
      <div className="rounded-lg border p-4 text-muted-foreground">
        No files to display
      </div>
    );
  }
  const singleFile = fileTree.length === 1 && fileTree[0]?.type === 'file';

  return (
    <EditorProvider fileTree={fileTree}>
      <div className="flex w-full overflow-hidden" style={{ height: '700px' }}>
        {singleFile ? null : (
          <div className="w-[240px] shrink-0">
            <FileTreeView />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <CodeView />
        </div>
      </div>
    </EditorProvider>
  );
}
