"use client";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import {
  Bell,
  CalendarClock,
  CalendarDays,
  CheckCircle,
  CheckSquare,
  Code,
  LayoutDashboard,
  Megaphone,
  Newspaper,
  NotebookText,
  Package,
} from "lucide-react";
import { NavCollapsible } from "./nav-collapsible";
import { NavFooter } from "./nav-footer";
import { NavHeader } from "./nav-header";
import { NavMain } from "./nav-main";

const data = {
  user: {
    name: "ephraim",
    email: "ephraim@blocks.so",
    avatar: "/avatar-01.png",
  },
  navMain: [
    {
      id: "overview",
      title: "Overview",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      id: "tasks",
      title: "Tasks",
      url: "#",
      icon: CheckSquare,
    },
    {
      id: "meetings",
      title: "Meetings",
      url: "#",
      icon: CalendarClock,
    },
    {
      id: "notes",
      title: "Notes",
      url: "#",
      icon: NotebookText,
    },
    {
      id: "calendar",
      title: "Calendar",
      url: "#",
      icon: CalendarDays,
    },
    {
      id: "completed",
      title: "Completed",
      url: "#",
      icon: CheckCircle,
    },
    {
      id: "notifications",
      title: "Notifications",
      url: "#",
      icon: Bell,
    },
  ],
  navCollapsible: {
    favorites: [
      {
        id: "design",
        title: "Design",
        href: "#",
        color: "bg-green-400 dark:bg-green-300",
      },
      {
        id: "development",
        title: "Development",
        href: "#",
        color: "bg-blue-400 dark:bg-blue-300",
      },
      {
        id: "workshop",
        title: "Workshop",
        href: "#",
        color: "bg-orange-400 dark:bg-orange-300",
      },
      {
        id: "personal",
        title: "Personal",
        href: "#",
        color: "bg-red-400 dark:bg-red-300",
      },
    ],
    teams: [
      {
        id: "engineering",
        title: "Engineering",
        icon: Code,
      },
      {
        id: "marketing",
        title: "Marketing",
        icon: Megaphone,
      },
    ],
    topics: [
      {
        id: "product-updates",
        title: "Product Updates",
        icon: Package,
      },
      {
        id: "company-news",
        title: "Company News",
        icon: Newspaper,
      },
    ],
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <NavHeader data={data} />
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavCollapsible
          favorites={data.navCollapsible.favorites}
          teams={data.navCollapsible.teams}
          topics={data.navCollapsible.topics}
        />
      </SidebarContent>
      <NavFooter user={data.user} />
    </Sidebar>
  );
}
