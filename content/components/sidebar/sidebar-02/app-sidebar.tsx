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
  Activity,
  DollarSign,
  Home,
  Infinity,
  LinkIcon,
  Package2,
  Percent,
  PieChart,
  Settings,
  ShoppingBag,
  Sparkles,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";
import { Logo } from "./logo";
import type { Route } from "./nav-main";
import DashboardNavigation from "./nav-main";
import { NotificationsPopover } from "./nav-notifications";
import { TeamSwitcher } from "./team-switcher";

interface Organization {
  id: string;
  name: string;
  slug: string;
  avatar_url?: string;
  feature_settings?: {
    usage_based_billing_enabled?: boolean;
  };
}

interface DashboardSidebarProps {
  organizations: Organization[];
}

const appName = "Acme";

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
    icon: <Home className="size-4" />,
    link: "#",
  },
  {
    id: "products",
    title: "Products",
    icon: <Package2 className="size-4" />,
    link: "#",
    subs: [
      {
        title: "Catalogue",
        link: "#",
        icon: <Package2 className="size-4" />,
      },
      {
        title: "Checkout Links",
        link: "#",
        icon: <LinkIcon className="size-4" />,
      },
      {
        title: "Discounts",
        link: "#",
        icon: <Percent className="size-4" />,
      },
    ],
  },
  {
    id: "usage-billing",
    title: "Usage Billing",
    icon: <PieChart className="size-4" />,
    link: "#",
    subs: [
      {
        title: "Meters",
        link: "#",
        icon: <PieChart className="size-4" />,
      },
      {
        title: "Events",
        link: "#",
        icon: <Activity className="size-4" />,
      },
    ],
  },
  {
    id: "benefits",
    title: "Benefits",
    icon: <Sparkles className="size-4" />,
    link: "#",
  },
  {
    id: "customers",
    title: "Customers",
    icon: <Users className="size-4" />,
    link: "#",
  },
  {
    id: "sales",
    title: "Sales",
    icon: <ShoppingBag className="size-4" />,
    link: "#",
    subs: [
      {
        title: "Orders",
        link: "#",
        icon: <ShoppingBag className="size-4" />,
      },
      {
        title: "Subscriptions",
        link: "#",
        icon: <Infinity className="size-4" />,
      },
    ],
  },
  {
    id: "storefront",
    title: "Storefront",
    icon: <Store className="size-4" />,
    link: "#",
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: <TrendingUp className="size-4" />,
    link: "#",
  },
  {
    id: "finance",
    title: "Finance",
    icon: <DollarSign className="size-4" />,
    link: "#",
    subs: [
      {
        title: "Incoming",
        link: "#",
      },
      {
        title: "Outgoing",
        link: "#",
      },
      {
        title: "Payout Account",
        link: "#",
      },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    icon: <Settings className="size-4" />,
    link: "#",
    subs: [
      {
        title: "General",
        link: "#",
      },
      {
        title: "Webhooks",
        link: "#",
      },
      {
        title: "Custom Fields",
        link: "#",
      },
    ],
  },
];

export function DashboardSidebar({ organizations }: DashboardSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader
        className={`flex md:pt-3.5 ${
          isCollapsed
            ? "flex-row items-center justify-between gap-y-4 md:flex-col md:items-start md:justify-start"
            : "flex-row items-center justify-between"
        }`}
      >
        <a href="#" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          {!isCollapsed && (
            <span className="font-semibold text-black dark:text-white">
              {appName}
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
        <motion.div
          key={isCollapsed ? "nav-collapsed" : "nav-expanded"}
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <DashboardNavigation routes={dashboardRoutes} />
        </motion.div>
      </SidebarContent>

      <SidebarFooter>
        <TeamSwitcher
          teams={organizations.map((org) => ({
            name: org.name,
            logo: Logo,
            plan: "Free",
          }))}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
