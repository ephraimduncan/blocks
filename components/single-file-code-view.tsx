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
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { cn } from '@/lib/utils';

preloadHighlighter({
  themes: ['pierre-dark', 'pierre-light'],
  langs: ['tsx'],
});

const COLOR_MODE_STORAGE_KEY = 'blocks-code-preview-color-mode';

interface SingleFileCodeViewProps {
  code: string;
  language?: SupportedLanguages;
  fileName?: string;
}

export function SingleFileCodeView({
  code,
  language = 'tsx',
  fileName = 'App.tsx',
}: SingleFileCodeViewProps) {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  const copiedTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);

    const storedColorMode = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY);
    if (storedColorMode === 'light' || storedColorMode === 'dark') {
      setColorMode(storedColorMode);
    }
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, colorMode);
  }, [colorMode, mounted]);

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current !== null) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  const isDark = colorMode === 'dark';
  const themeName = isDark ? 'pierre-dark' : 'pierre-light';

  const styles = useMemo(
    () => ({
      container: isDark
        ? 'border-neutral-700/50 bg-[#1b1d23]'
        : 'border-neutral-300/70 bg-[#f7f8fc]',
      tabBar: isDark
        ? 'border-neutral-700/50 bg-neutral-900'
        : 'border-neutral-200 bg-neutral-50',
      tabActive: isDark
        ? 'border-neutral-700/50 bg-neutral-950 text-neutral-100'
        : 'border-neutral-200 bg-[#fff] text-neutral-900',
      controls: isDark ? 'text-neutral-300' : 'text-neutral-700',
    }),
    [isDark]
  );

  const file = useMemo(
    () => ({
      name: fileName,
      lang: language,
      contents: code,
    }),
    [code, fileName, language]
  );

  const handleColorModeToggle = () => {
    setColorMode((mode) => (mode === 'dark' ? 'light' : 'dark'));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(file.contents);
      setCopied(true);

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

  if (!mounted) {
    return (
      <div className="aspect-[16/10] w-full animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
    );
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border transition-colors',
        styles.container
      )}
    >
      <div
        className={cn(
          '-ml-[1px] flex items-center justify-between border-b',
          styles.tabBar
        )}
      >
        <div
          className={cn(
            'relative flex items-center gap-2 border-transparent border-r border-l px-4 py-2 font-medium text-sm',
            styles.tabActive
          )}
        >
          <IconFileCode className="size-4 text-blue-400" />
          {file.name}
        </div>

        <div className="mr-2 flex items-center gap-1">
          <button
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={cn(
              'inline-flex size-6 items-center justify-center transition-opacity hover:opacity-80',
              styles.controls
            )}
            onClick={handleColorModeToggle}
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
        className="max-h-[720px] overflow-auto"
        file={file}
        options={{
          theme: themeName,
          themeType: colorMode,
          disableFileHeader: true,
        }}
        style={
          {
            '--diffs-font-family':
              'var(--font-mono), var(--diffs-font-fallback)',
          } as CSSProperties
        }
      />
    </div>
  );
}
