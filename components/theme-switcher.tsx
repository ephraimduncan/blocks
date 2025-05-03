/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { type ComponentProps, useDeferredValue } from "react";

const THEMES = [
  {
    type: "system",
    icon: Monitor,
    label: "system theme",
  },
  {
    type: "light",
    icon: Sun,
    label: "light theme",
  },
  {
    type: "dark",
    icon: Moon,
    label: "dark theme",
  },
] as const;

type Theme = (typeof THEMES)[number]["type"];

interface ThemeSwitcherProps
  extends Omit<ComponentProps<"div">, "onChange" | "value" | "defaultValue"> {
  value?: Theme;
  onChange?: (theme: Theme) => void;
  defaultValue?: Theme;
}

function ThemeSwitcher({
  value,
  onChange,
  defaultValue,
  className,
  ...props
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const deferredTheme = useDeferredValue(theme, "system");

  return (
    <div
      className={cn(
        "relative isolate inline-flex h-8 items-center rounded-full border border-dotted px-1",
        className,
      )}
      {...props}
    >
      {THEMES.map(({ type, icon: Icon, label }) => {
        const isActive = deferredTheme === type;

        return (
          <button
            aria-label={`Switch to ${label}`}
            className="group relative size-6 rounded-full transition duration-200 ease-out"
            key={type}
            onClick={() => setTheme(type)}
            title={`Switch to ${label}`}
            type="button"
            data-umami-event={`Switch Theme to ${type}`}
          >
            {isActive && (
              <div className="-z-1 absolute inset-0 rounded-full bg-muted" />
            )}
            <Icon
              className={cn(
                "relative m-auto size-3.5",
                "transition duration-200 ease-out",
                isActive
                  ? "text-foreground"
                  : "text-secondary-foreground group-hover:text-foreground group-focus-visible:text-foreground",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

export { ThemeSwitcher };
