"use client";

import {
  IconBell,
  IconBolt,
  IconCalendar,
  IconChartBar,
  IconChartPie,
  IconClock,
  IconFileText,
  IconHelp,
  IconKeyboard,
  IconLayoutDashboard,
  IconLayoutKanban,
  IconLogout,
  IconMessage,
  IconPalette,
  IconSettings,
  IconSquareCheck,
  IconTarget,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";

const workspaceItems = [
  { icon: IconLayoutDashboard, label: "Dashboard" },
  { icon: IconLayoutKanban, label: "Projects" },
  { icon: IconSquareCheck, label: "Tasks" },
  { icon: IconCalendar, label: "Calendar" },
  { icon: IconUsers, label: "Team members" },
  { icon: IconMessage, label: "Messages" },
  { icon: IconFileText, label: "Documents" },
  { icon: IconBell, label: "Notifications" },
  { icon: IconClock, label: "Time tracking" },
  { icon: IconTarget, label: "Goals" },
];

const analyticsItems = [
  { icon: IconChartBar, label: "Overview" },
  { icon: IconTrendingUp, label: "Performance" },
  { icon: IconChartPie, label: "Reports" },
  { icon: IconBolt, label: "Insights" },
];

const settingsItems = [
  { icon: IconSettings, label: "Preferences" },
  { icon: IconPalette, label: "Appearance" },
  { icon: IconKeyboard, label: "Keyboard shortcuts" },
  { icon: IconHelp, label: "Help & support" },
  { icon: IconLogout, label: "Sign out" },
];

export function CommandMenu01() {
  const [open, setOpen] = useState(true);

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

      <CommandDialog onOpenChange={setOpen} open={open} showCloseButton={false}>
        <CommandInput
          className="h-12"
          placeholder="Type a command or search..."
        />
        <CommandList className="h-[320px] max-h-[320px]">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Workspace">
            {workspaceItems.map((item) => (
              <CommandItem key={item.label}>
                <item.icon className="mr-2 h-5 w-5" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Analytics">
            {analyticsItems.map((item) => (
              <CommandItem key={item.label}>
                <item.icon className="mr-2 h-5 w-5" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Settings">
            {settingsItems.map((item) => (
              <CommandItem key={item.label}>
                <item.icon className="mr-2 h-5 w-5" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
        <div className="flex h-12 items-center justify-end border-t px-3">
          <button
            className="flex items-center gap-1 text-muted-foreground text-sm hover:text-foreground"
            onClick={() => setOpen(false)}
            type="button"
          >
            <span>Close</span>
            <Kbd className="ml-1">Esc</Kbd>
          </button>
        </div>
      </CommandDialog>
    </>
  );
}
