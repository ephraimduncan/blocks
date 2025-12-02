"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IconArrowRight, IconCornerDownLeft } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/", label: "Home", keywords: ["home", "main", "index"] },
  {
    href: "/dashboard",
    label: "Dashboard",
    keywords: ["dashboard", "overview"],
  },
  {
    href: "/settings",
    label: "Settings",
    keywords: ["settings", "preferences"],
  },
];

const pageGroups = [
  {
    name: "Getting Started",
    pages: [
      {
        name: "Introduction",
        href: "/docs/introduction",
        keywords: ["intro", "start"],
      },
      {
        name: "Installation",
        href: "/docs/installation",
        keywords: ["install", "setup"],
      },
      {
        name: "Quick Start",
        href: "/docs/quick-start",
        keywords: ["quick", "begin"],
      },
    ],
  },
  {
    name: "Utilities",
    pages: [
      {
        name: "Typography",
        href: "/docs/utilities/typography",
        keywords: ["text", "font"],
      },
      {
        name: "Colors",
        href: "/docs/utilities/colors",
        keywords: ["color", "theme"],
      },
      {
        name: "Spacing",
        href: "/docs/utilities/spacing",
        keywords: ["margin", "padding"],
      },
    ],
  },
];

const colorGroups = [
  {
    name: "Neutral",
    colors: [
      {
        name: "Neutral 50",
        className: "neutral-50",
        value: "oklch(0.985 0 0)",
      },
      {
        name: "Neutral 100",
        className: "neutral-100",
        value: "oklch(0.97 0 0)",
      },
      {
        name: "Neutral 200",
        className: "neutral-200",
        value: "oklch(0.922 0 0)",
      },
      {
        name: "Neutral 500",
        className: "neutral-500",
        value: "oklch(0.556 0 0)",
      },
      {
        name: "Neutral 900",
        className: "neutral-900",
        value: "oklch(0.205 0 0)",
      },
    ],
  },
  {
    name: "Blue",
    colors: [
      {
        name: "Blue 50",
        className: "blue-50",
        value: "oklch(0.97 0.014 254.604)",
      },
      {
        name: "Blue 500",
        className: "blue-500",
        value: "oklch(0.623 0.214 259.815)",
      },
      {
        name: "Blue 600",
        className: "blue-600",
        value: "oklch(0.546 0.245 262.881)",
      },
    ],
  },
];

interface ColorItem {
  name: string;
  className: string;
  value: string;
}

function CommandMenuItem({
  children,
  className,
  onHighlight,
  ...props
}: React.ComponentProps<typeof CommandItem> & {
  onHighlight?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "aria-selected" &&
          element.getAttribute("aria-selected") === "true"
        ) {
          onHighlight?.();
        }
      });
    });

    observer.observe(element, { attributes: true });
    return () => observer.disconnect();
  }, [onHighlight]);

  return (
    <CommandItem
      ref={ref}
      className={cn(
        "h-9 rounded-md border border-transparent !px-3 font-medium data-[selected=true]:border-input data-[selected=true]:bg-input/50",
        className
      )}
      {...props}
    >
      {children}
    </CommandItem>
  );
}

function CommandMenuKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "pointer-events-none flex h-5 select-none items-center justify-center gap-1 rounded border bg-background px-1 font-sans text-[0.7rem] font-medium text-muted-foreground [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  );
}

export function CommandMenu03() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [selectedType, setSelectedType] = useState<"page" | "color" | null>(
    null
  );
  const [copyPayload, setCopyPayload] = useState("");

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  const handlePageHighlight = useCallback(
    (isComponent: boolean, href: string) => {
      setSelectedType("page");
      if (isComponent) {
        const componentName = href.split("/").pop();
        setCopyPayload(`pnpm dlx shadcn@latest add ${componentName}`);
      } else {
        setCopyPayload("");
      }
    },
    []
  );

  const handleColorHighlight = useCallback((color: ColorItem) => {
    setSelectedType("color");
    setCopyPayload(color.className);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }
        e.preventDefault();
        setOpen((open) => !open);
      }

      if (e.key === "c" && (e.metaKey || e.ctrlKey) && open && copyPayload) {
        copyToClipboard(copyPayload);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [copyPayload, open, copyToClipboard]);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open Command Menu
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-xl border-none bg-clip-padding p-2 pb-11 shadow-2xl ring-4 ring-neutral-200/80 dark:bg-neutral-900 dark:ring-neutral-800">
          <DialogHeader className="sr-only">
            <DialogTitle>Search documentation...</DialogTitle>
            <DialogDescription>
              Search for a command to run...
            </DialogDescription>
          </DialogHeader>

          <Command className="rounded-none bg-transparent **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:!h-9 **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border **:data-[slot=command-input-wrapper]:border-input **:data-[slot=command-input-wrapper]:bg-input/50 **:data-[slot=command-input]:!h-9 **:data-[slot=command-input]:py-0">
            <CommandInput placeholder="Search documentation..." />
            <CommandList className="no-scrollbar min-h-80 scroll-pb-1.5 scroll-pt-2">
              <CommandEmpty className="py-12 text-center text-sm text-muted-foreground">
                No results found.
              </CommandEmpty>

              {navItems.length > 0 && (
                <CommandGroup
                  heading="Pages"
                  className="!p-0 [&_[cmdk-group-heading]]:!p-3 [&_[cmdk-group-heading]]:!pb-1 [&_[cmdk-group-heading]]:scroll-mt-16"
                >
                  {navItems.map((item) => (
                    <CommandMenuItem
                      key={item.href}
                      value={`Navigation ${item.label}`}
                      keywords={item.keywords}
                      onHighlight={() => {
                        setSelectedType("page");
                        setCopyPayload("");
                      }}
                      onSelect={() => {
                        runCommand(() => router.push(item.href));
                      }}
                    >
                      <IconArrowRight aria-hidden="true" className="size-4" />
                      {item.label}
                    </CommandMenuItem>
                  ))}
                </CommandGroup>
              )}

              {pageGroups.map((group) => (
                <CommandGroup
                  key={group.name}
                  heading={group.name}
                  className="!p-0 [&_[cmdk-group-heading]]:!p-3 [&_[cmdk-group-heading]]:!pb-1 [&_[cmdk-group-heading]]:scroll-mt-16"
                >
                  {group.pages.map((page) => {
                    const isComponent = page.href.includes("/components/");
                    return (
                      <CommandMenuItem
                        key={page.href}
                        value={`${group.name} ${page.name}`}
                        keywords={page.keywords}
                        onHighlight={() =>
                          handlePageHighlight(isComponent, page.href)
                        }
                        onSelect={() => {
                          runCommand(() => router.push(page.href));
                        }}
                      >
                        {isComponent ? (
                          <div className="aspect-square size-4 rounded-full border border-dashed border-muted-foreground" />
                        ) : (
                          <IconArrowRight
                            aria-hidden="true"
                            className="size-4"
                          />
                        )}
                        {page.name}
                      </CommandMenuItem>
                    );
                  })}
                </CommandGroup>
              ))}

              {colorGroups.map((colorGroup) => (
                <CommandGroup
                  key={colorGroup.name}
                  heading={colorGroup.name}
                  className="!p-0 [&_[cmdk-group-heading]]:!p-3"
                >
                  {colorGroup.colors.map((color) => (
                    <CommandMenuItem
                      key={color.className}
                      value={color.className}
                      keywords={["color", color.name, color.className]}
                      onHighlight={() => handleColorHighlight(color)}
                      onSelect={() => {
                        runCommand(() => copyToClipboard(color.value));
                      }}
                    >
                      <div
                        className="aspect-square size-4 rounded-sm border"
                        style={{ backgroundColor: color.value }}
                      />
                      {color.className}
                      <span className="ml-auto font-mono text-xs font-normal tabular-nums text-muted-foreground">
                        {color.value}
                      </span>
                    </CommandMenuItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>

          <div className="absolute inset-x-0 bottom-0 z-20 flex h-10 items-center gap-2 rounded-b-xl border-t border-t-neutral-100 bg-neutral-50 px-4 text-xs font-medium text-muted-foreground dark:border-t-neutral-700 dark:bg-neutral-800">
            <div className="flex items-center gap-2">
              <CommandMenuKbd>
                <IconCornerDownLeft aria-hidden="true" className="size-3" />
              </CommandMenuKbd>
              {selectedType === "page" && "Go to Page"}
              {selectedType === "color" && "Copy Value"}
              {!selectedType && "Select"}
            </div>
            {copyPayload && (
              <>
                <Separator orientation="vertical" className="h-4!" />
                <div className="flex items-center gap-1">
                  <CommandMenuKbd>⌘</CommandMenuKbd>
                  <CommandMenuKbd>C</CommandMenuKbd>
                  <span className="max-w-48 truncate">{copyPayload}</span>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
