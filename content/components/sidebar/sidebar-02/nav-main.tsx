"use client";

import type React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuItem as SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export type Route = {
  id: string;
  title: string;
  icon?: React.ReactNode;
  link: string;
  subs?: {
    title: string;
    link: string;
    icon?: React.ReactNode;
  }[];
};

export default function DashboardNavigation({ routes }: { routes: Route[] }) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);

  const handleMenuItemClick = (route: Route) => {
    if (!route.subs) {
      setOpenCollapsible(null);
    }
  };

  return (
    <SidebarMenu>
      {routes.map((route) => {
        const isOpen = !isCollapsed && openCollapsible === route.id;

        return (
          <SidebarMenuItem key={route.id}>
            {route.subs ? (
              <Collapsible
                open={isOpen}
                onOpenChange={(open) =>
                  setOpenCollapsible(open ? route.id : null)
                }
                className="w-full"
                disabled={!route.subs?.length}
              >
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className={cn(
                      "flex w-full flex-row items-center rounded-lg px-2 transition-colors",
                      isOpen
                        ? "bg-sidebar-muted text-foreground"
                        : "text-muted-foreground hover:bg-sidebar-muted hover:text-foreground",
                      isCollapsed && "justify-center"
                    )}
                    onClick={() => {
                      setOpenCollapsible(isOpen ? null : route.id);
                    }}
                  >
                    {route.icon}
                    {!isCollapsed && (
                      <span className={cn("ml-2 flex-1 text-sm font-medium")}>
                        {route.title}
                      </span>
                    )}
                    {!isCollapsed && !!route.subs?.length && (
                      <span className="ml-auto">
                        {isOpen ? (
                          <ChevronUp className="size-4" />
                        ) : (
                          <ChevronDown className="size-4" />
                        )}
                      </span>
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {!isCollapsed && (
                  <CollapsibleContent>
                    <SidebarMenuSub className="my-1 ml-2">
                      {route.subs.map((subRoute) => {
                        return (
                          <SidebarMenuSubItem
                            key={`${route.id}-${subRoute.title}`}
                            className="h-auto"
                          >
                            <SidebarMenuSubButton asChild>
                              <Link
                                href={subRoute.link}
                                prefetch={true}
                                className={cn(
                                  "flex items-center rounded-md px-2 py-1.5 text-sm font-medium",
                                  "text-muted-foreground hover:bg-sidebar-muted hover:text-foreground"
                                )}
                              >
                                {subRoute.title}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </Collapsible>
            ) : (
              <SidebarMenuButton
                tooltip={route.title}
                asChild
                onClick={() => handleMenuItemClick(route)}
              >
                <Link
                  href={route.link}
                  prefetch={true}
                  className={cn(
                    "flex flex-row items-center rounded-lg px-2 transition-colors",
                    "text-muted-foreground hover:bg-sidebar-muted hover:text-foreground",
                    isCollapsed && "justify-center"
                  )}
                >
                  {route.icon}
                  {!isCollapsed && (
                    <span className="ml-2 text-sm font-medium">
                      {route.title}
                    </span>
                  )}
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
