'use client';

import { IconMoon, IconSun } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      size="icon"
      title="Switch color theme"
      type="button"
      variant="ghost"
    >
      <IconMoon aria-hidden="true" className="dark:hidden" />
      <IconSun aria-hidden="true" className="hidden dark:block" />
      <span className="sr-only">
        <span className="dark:hidden">Switch to dark mode</span>
        <span className="hidden dark:inline">Switch to light mode</span>
      </span>
    </Button>
  );
}
