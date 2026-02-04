"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  IconActivity,
  IconBuildingStore,
  IconChartPie,
  IconCurrencyDollar,
  IconHome,
  IconInfinity,
  IconLink,
  IconPackage,
  IconPercentage,
  IconSettings,
  IconShoppingBag,
  IconSparkles,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";
import { Logo } from "./logo";
import type { Route } from "./nav-main";
import DashboardNavigation from "./nav-main";
import { NotificationsPopover } from "./nav-notifications";
import { TeamSwitcher } from "./team-switcher";

const sampleNotifications = [
  {
    id: "1",
    avatar: "/avatars/01.png",
    fallback: "OM",
    text: "New order received.",
    time: "10m ago",
  },
  {
    id: "2",
    avatar: "/avatars/02.png",
    fallback: "JL",
    text: "Server upgrade completed.",
    time: "1h ago",
  },
  {
    id: "3",
    avatar: "/avatars/03.png",
    fallback: "HH",
    text: "New user signed up.",
    time: "2h ago",
  },
];

const dashboardRoutes: Route[] = [
  {
    id: "home",
    title: "Home",
    icon: <IconHome className="size-4" />,
    link: "#",
  },
  {
    id: "products",
    title: "Products",
    icon: <IconPackage className="size-4" />,
    link: "#",
    subs: [
      {
        title: "Catalogue",
        link: "#",
        icon: <IconPackage className="size-4" />,
      },
      {
        title: "Checkout Links",
        link: "#",
        icon: <IconLink className="size-4" />,
      },
      {
        title: "Discounts",
        link: "#",
        icon: <IconPercentage className="size-4" />,
      },
    ],
  },
  {
    id: "usage-billing",
    title: "Usage Billing",
    icon: <IconChartPie className="size-4" />,
    link: "#",
    subs: [
      {
        title: "Meters",
        link: "#",
        icon: <IconChartPie className="size-4" />,
      },
      {
        title: "Events",
        link: "#",
        icon: <IconActivity className="size-4" />,
      },
    ],
  },
  {
    id: "benefits",
    title: "Benefits",
    icon: <IconSparkles className="size-4" />,
    link: "#",
  },
  {
    id: "customers",
    title: "Customers",
    icon: <IconUsers className="size-4" />,
    link: "#",
  },
  {
    id: "sales",
    title: "Sales",
    icon: <IconShoppingBag className="size-4" />,
    link: "#",
    subs: [
      {
        title: "Orders",
        link: "#",
        icon: <IconShoppingBag className="size-4" />,
      },
      {
        title: "Subscriptions",
        link: "#",
        icon: <IconInfinity className="size-4" />,
      },
    ],
  },
  {
    id: "storefront",
    title: "Storefront",
    icon: <IconBuildingStore className="size-4" />,
    link: "#",
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: <IconTrendingUp className="size-4" />,
    link: "#",
  },
  {
    id: "finance",
    title: "Finance",
    icon: <IconCurrencyDollar className="size-4" />,
    link: "#",
    subs: [
      { title: "Incoming", link: "#" },
      { title: "Outgoing", link: "#" },
      { title: "Payout Account", link: "#" },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    icon: <IconSettings className="size-4" />,
    link: "#",
    subs: [
      { title: "General", link: "#" },
      { title: "Webhooks", link: "#" },
      { title: "Custom Fields", link: "#" },
    ],
  },
];

const teams = [
  { id: "1", name: "Alpha Inc.", logo: Logo, plan: "Free" },
  { id: "2", name: "Beta Corp.", logo: Logo, plan: "Free" },
  { id: "3", name: "Gamma Tech", logo: Logo, plan: "Free" },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader
        className={cn(
          "flex md:pt-3.5",
          isCollapsed
            ? "flex-row items-center justify-between gap-y-4 md:flex-col md:items-start md:justify-start"
            : "flex-row items-center justify-between"
        )}
      >
        <a href="#" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          {!isCollapsed && (
            <span className="font-semibold text-black dark:text-white">
              Acme
            </span>
          )}
        </a>

        <motion.div
          key={isCollapsed ? "header-collapsed" : "header-expanded"}
          className={cn(
            "flex items-center gap-2",
            isCollapsed ? "flex-row md:flex-col-reverse" : "flex-row"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <NotificationsPopover notifications={sampleNotifications} />
          <SidebarTrigger />
        </motion.div>
      </SidebarHeader>
      <SidebarContent className="gap-4 px-2 py-4">
        <DashboardNavigation routes={dashboardRoutes} />
      </SidebarContent>
      <SidebarFooter className="px-2">
        <TeamSwitcher teams={teams} />
      </SidebarFooter>
    </Sidebar>
  );
}
