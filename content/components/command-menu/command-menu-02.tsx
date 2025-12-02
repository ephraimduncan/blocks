"use client";

import {
  IconArrowRight,
  IconAt,
  IconCopy,
  IconDeviceDesktop,
  IconDownload,
  IconFile,
  IconFileSearch,
  IconKeyboard,
  IconLink,
  IconLogout,
  IconMessage,
  IconPencil,
  IconPlus,
  IconSend,
  IconSettings,
  IconTemplate,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
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
import { Kbd, KbdGroup } from "@/components/ui/kbd";

export function CommandMenu02() {
  const [open, setOpen] = useState(true);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline">
        Open Command Menu
      </Button>

      <Dialog onOpenChange={setOpen} open={open}>
        <DialogHeader className="sr-only">
          <DialogTitle>Command Menu</DialogTitle>
          <DialogDescription>
            Use the command menu to navigate through the app.
          </DialogDescription>
        </DialogHeader>
        <DialogContent
          className="gap-0 overflow-hidden rounded-xl border-border/50 p-0 shadow-lg sm:max-w-lg"
          showCloseButton={false}
        >
          <Command className="flex h-full w-full flex-col overflow-hidden bg-popover **:data-[slot=command-input-wrapper]:h-auto **:data-[slot=command-input-wrapper]:grow **:data-[slot=command-input-wrapper]:border-0 **:data-[slot=command-input-wrapper]:px-0">
            <div className="flex h-12 items-center gap-2 border-border/50 border-b px-4">
              <CommandInput
                className="h-10 text-[15px]"
                onValueChange={setInputValue}
                placeholder="What do you need?"
                value={inputValue}
              />
              <button
                className="flex shrink-0 items-center"
                onClick={() => setOpen(false)}
                type="button"
              >
                <Kbd>Esc</Kbd>
              </button>
            </div>

            <CommandList className="max-h-[400px] py-2">
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup>
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconSettings aria-hidden />
                  Account Settings...
                  <KbdGroup className="ml-auto">
                    <Kbd>⌘</Kbd>
                    <Kbd>,</Kbd>
                  </KbdGroup>
                </CommandItem>
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconUser aria-hidden />
                  Switch Workspace...
                </CommandItem>
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconLogout aria-hidden />
                  Log Out
                  <KbdGroup className="ml-auto">
                    <Kbd>⌘</Kbd>
                    <Kbd>Q</Kbd>
                  </KbdGroup>
                </CommandItem>
              </CommandGroup>

              <CommandGroup heading="Documents">
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconFile aria-hidden />
                  Search Documents...
                  <KbdGroup className="ml-auto">
                    <Kbd>⌘</Kbd>
                    <Kbd>F</Kbd>
                  </KbdGroup>
                </CommandItem>
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconPlus aria-hidden />
                  Create New Document...
                  <KbdGroup className="ml-auto">
                    <Kbd>⌘</Kbd>
                    <Kbd>N</Kbd>
                  </KbdGroup>
                </CommandItem>
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconFile aria-hidden />
                  Upload Document...
                  <KbdGroup className="ml-auto">
                    <Kbd>⌘</Kbd>
                    <Kbd>U</Kbd>
                  </KbdGroup>
                </CommandItem>
              </CommandGroup>

              <CommandGroup heading="Signing">
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconSend aria-hidden />
                  Request Signature...
                </CommandItem>
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconPencil aria-hidden />
                  Sign a Document...
                </CommandItem>
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconUsers aria-hidden />
                  Bulk Send for Signature...
                </CommandItem>
              </CommandGroup>

              <CommandGroup heading="Templates">
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconTemplate aria-hidden />
                  Search Templates...
                </CommandItem>
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconPlus aria-hidden />
                  Create New Template...
                </CommandItem>
              </CommandGroup>

              <CommandGroup heading="General">
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconDeviceDesktop aria-hidden />
                  Change Theme...
                  <KbdGroup className="ml-auto">
                    <Kbd>⌘</Kbd>
                    <Kbd>T</Kbd>
                  </KbdGroup>
                </CommandItem>
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconCopy aria-hidden />
                  Copy Current URL
                  <KbdGroup className="ml-auto">
                    <Kbd>⌘</Kbd>
                    <Kbd>⇧</Kbd>
                    <Kbd>C</Kbd>
                  </KbdGroup>
                </CommandItem>
              </CommandGroup>

              <CommandGroup heading="Navigation">
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconArrowRight aria-hidden />
                  <span>
                    Go to&nbsp;<strong className="font-semibold">Inbox</strong>
                  </span>
                </CommandItem>
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconArrowRight aria-hidden />
                  <span>
                    Go to&nbsp;
                    <strong className="font-semibold">Action Required</strong>
                  </span>
                </CommandItem>
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconArrowRight aria-hidden />
                  <span>
                    Go to&nbsp;
                    <strong className="font-semibold">
                      Waiting for Others
                    </strong>
                  </span>
                </CommandItem>
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconArrowRight aria-hidden />
                  <span>
                    Go to&nbsp;
                    <strong className="font-semibold">Completed</strong>
                  </span>
                </CommandItem>
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconArrowRight aria-hidden />
                  <span>
                    Go to&nbsp;<strong className="font-semibold">Drafts</strong>
                  </span>
                </CommandItem>
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconArrowRight aria-hidden />
                  <span>
                    Go to&nbsp;
                    <strong className="font-semibold">Templates</strong>
                  </span>
                </CommandItem>
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconArrowRight aria-hidden />
                  <span>
                    Go to&nbsp;
                    <strong className="font-semibold">Archive</strong>
                  </span>
                </CommandItem>
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconArrowRight aria-hidden />
                  <span>
                    Go to&nbsp;<strong className="font-semibold">Trash</strong>
                  </span>
                </CommandItem>
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconArrowRight aria-hidden />
                  <span>
                    Go to&nbsp;
                    <strong className="font-semibold">Settings</strong>
                  </span>
                </CommandItem>
              </CommandGroup>

              <CommandGroup heading="Quick Actions">
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconLink aria-hidden />
                  Copy Signing Link
                </CommandItem>
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconDownload aria-hidden />
                  Download Document
                </CommandItem>
              </CommandGroup>

              <CommandGroup heading="Help">
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconFileSearch aria-hidden />
                  Search Help Center...
                </CommandItem>
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconMessage aria-hidden />
                  Send Feedback...
                </CommandItem>
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconAt aria-hidden />
                  Contact Support
                </CommandItem>
              </CommandGroup>

              <CommandGroup heading="Keyboard Shortcuts">
                <CommandItem
                  className="mx-2 rounded-lg py-2.5"
                  onSelect={() => setOpen(false)}
                >
                  <IconKeyboard aria-hidden />
                  View Keyboard Shortcuts
                  <KbdGroup className="ml-auto">
                    <Kbd>⌘</Kbd>
                    <Kbd>/</Kbd>
                  </KbdGroup>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
