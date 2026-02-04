"use client";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import {
  IconAd2,
  IconBellRinging,
  IconCalendar,
  IconCalendarStats,
  IconListDetails,
  IconNews,
  IconNotebook,
  IconProgressCheck,
  IconLayoutDashboard,
  IconPackage,
  IconSettingsCode,
} from "@tabler/icons-react";
import { NavCollapsible } from "./nav-collapsible";
import { NavFooter } from "./nav-footer";
import { NavHeader } from "./nav-header";
import { NavMain } from "./nav-main";
import type { SidebarData } from "./types";

const data: SidebarData = {
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
      icon: IconLayoutDashboard,
      isActive: true,
    },
    {
      id: "tasks",
      title: "Tasks",
      url: "#",
      icon: IconListDetails,
    },
    {
      id: "meetings",
      title: "Meetings",
      url: "#",
      icon: IconCalendarStats,
    },
    {
      id: "notes",
      title: "Notes",
      url: "#",
      icon: IconNotebook,
    },
    {
      id: "calendar",
      title: "Calendar",
      url: "#",
      icon: IconCalendar,
    },
    {
      id: "completed",
      title: "Completed",
      url: "#",
      icon: IconProgressCheck,
    },
    {
      id: "notifications",
      title: "Notifications",
      url: "#",
      icon: IconBellRinging,
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
        icon: IconSettingsCode,
      },
      {
        id: "marketing",
        title: "Marketing",
        icon: IconAd2,
      },
    ],
    topics: [
      {
        id: "product-updates",
        title: "Product Updates",
        icon: IconPackage,
      },
      {
        id: "company-news",
        title: "Company News",
        icon: IconNews,
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
