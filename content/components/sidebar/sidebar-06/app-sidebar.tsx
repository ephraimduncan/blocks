"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  IconActivityHeartbeat,
  IconArchive,
  IconArrowLeft,
  IconBackground,
  IconBellRinging,
  IconBrandGoogle,
  IconBrandMeta,
  IconBrandNpm,
  IconBrandOpenai,
  IconBug,
  IconChartBar,
  IconChevronRight,
  IconCloud,
  IconDatabase,
  IconFileText,
  IconFolder,
  IconFolders,
  IconGitCommit,
  IconGitMerge,
  IconGitPullRequest,
  IconHome,
  IconKey,
  IconLockExclamation,
  IconLockPassword,
  IconLogout,
  IconNorthStar,
  IconPackageExport,
  IconPackages,
  IconPasswordFingerprint,
  IconPlayerPlay,
  IconScanEye,
  IconSettings,
  IconShieldLock,
  IconStar,
  IconTarget,
  IconTerminal2,
  IconUser,
  IconUserPlus,
  IconWebhook,
} from "@tabler/icons-react";
import type React from "react";
import { useState } from "react";
import { TeamSwitcher } from "./team-switcher";

const data = {
  teams: [
    {
      name: "OpenAI",
      logo: IconBrandOpenai,
      plan: "Enterprise",
    },
    {
      name: "Anthropic",
      logo: IconNorthStar,
      plan: "Pro",
    },
    {
      name: "Google",
      logo: IconBrandGoogle,
      plan: "Free",
    },
    {
      name: "Meta",
      logo: IconBrandMeta,
      plan: "Free",
    },
  ],
};

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  hasSubItems?: boolean;
  route?: string;
  subItems?: {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    route?: string;
  }[];
}

const sidebarItems: SidebarItem[] = [
  {
    id: "overview",
    label: "Overview",
    icon: IconHome,
    hasSubItems: true,
    subItems: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: IconChartBar,
        route: "/overview/dashboard",
      },
      {
        id: "activity",
        label: "Activity",
        icon: IconActivityHeartbeat,
        route: "/overview/activity",
      },
      {
        id: "insights",
        label: "Insights",
        icon: IconTarget,
        route: "/overview/insights",
      },
    ],
  },
  {
    id: "repositories",
    label: "Repositories",
    icon: IconFolders,
    badge: "12",
    hasSubItems: true,
    subItems: [
      {
        id: "all-repos",
        label: "All Repositories",
        icon: IconFolder,
        route: "/repositories",
      },
      {
        id: "starred",
        label: "Starred",
        icon: IconStar,
        route: "/repositories/starred",
      },
      {
        id: "archived",
        label: "Archived",
        icon: IconArchive,
        route: "/repositories/archived",
      },
    ],
  },
  {
    id: "pull-requests",
    label: "Pull Requests",
    icon: IconGitPullRequest,
    badge: "3",
    hasSubItems: true,
    subItems: [
      {
        id: "open-prs",
        label: "Open",
        icon: IconGitPullRequest,
        route: "/pull-requests/open",
      },
      {
        id: "review-requests",
        label: "Review Requests",
        icon: IconScanEye,
        route: "/pull-requests/review",
      },
      {
        id: "merged",
        label: "Merged",
        icon: IconGitMerge,
        route: "/pull-requests/merged",
      },
    ],
  },
  {
    id: "issues",
    label: "Issues",
    icon: IconBug,
    badge: "7",
    hasSubItems: true,
    subItems: [
      {
        id: "open-issues",
        label: "Open Issues",
        icon: IconBug,
        route: "/issues/open",
      },
      {
        id: "assigned",
        label: "Assigned to Me",
        icon: IconUserPlus,
        route: "/issues/assigned",
      },
      {
        id: "created",
        label: "Created by Me",
        icon: IconGitCommit,
        route: "/issues/created",
      },
    ],
  },
  {
    id: "actions",
    label: "Actions",
    icon: IconBackground,
    hasSubItems: true,
    subItems: [
      {
        id: "workflows",
        label: "Workflows",
        icon: IconPlayerPlay,
        route: "/actions/workflows",
      },
      {
        id: "runners",
        label: "Runners",
        icon: IconTerminal2,
        route: "/actions/runners",
      },
      {
        id: "deployments",
        label: "Deployments",
        icon: IconCloud,
        route: "/actions/deployments",
      },
    ],
  },
  {
    id: "packages",
    label: "Packages",
    icon: IconPackages,
    hasSubItems: true,
    subItems: [
      {
        id: "published",
        label: "Published",
        icon: IconPackageExport,
        route: "/packages/published",
      },
      {
        id: "container-registry",
        label: "Container Registry",
        icon: IconDatabase,
        route: "/packages/containers",
      },
      {
        id: "npm-packages",
        label: "npm Packages",
        icon: IconBrandNpm,
        route: "/packages/npm",
      },
    ],
  },
  {
    id: "security",
    label: "Security",
    icon: IconLockPassword,
    badge: "2",
    hasSubItems: true,
    subItems: [
      {
        id: "alerts",
        label: "Security Alerts",
        icon: IconLockExclamation,
        route: "/security/alerts",
      },
      {
        id: "advisories",
        label: "Advisories",
        icon: IconShieldLock,
        route: "/security/advisories",
      },
      {
        id: "secrets",
        label: "Secrets",
        icon: IconPasswordFingerprint,
        route: "/security/secrets",
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: IconSettings,
    hasSubItems: true,
    subItems: [
      {
        id: "profile",
        label: "Profile",
        icon: IconUser,
        route: "/settings/profile",
      },
      {
        id: "notifications",
        label: "Notifications",
        icon: IconBellRinging,
        route: "/settings/notifications",
      },
      {
        id: "webhooks",
        label: "Webhooks",
        icon: IconWebhook,
        route: "/settings/webhooks",
      },
      {
        id: "api-keys",
        label: "API Keys",
        icon: IconKey,
        route: "/settings/api-keys",
      },
    ],
  },
  {
    id: "docs",
    label: "Documentation",
    icon: IconFileText,
    hasSubItems: false,
    route: "/docs",
  },
];

export function AppSidebar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);

  const activeItemData = sidebarItems.find((item) => item.id === activeItem);

  const handleItemClick = (item: SidebarItem) => {
    if (item.hasSubItems) {
      setActiveItem(item.id);
      setSelectedSubItem(null);
    } else {
      console.log(`[v0] Navigating to: ${item.route}`);
    }
  };

  const handleSubItemClick = (subItem: { id: string; route?: string }) => {
    setSelectedSubItem(selectedSubItem === subItem.id ? null : subItem.id);
    if (subItem.route) {
      console.log(`[v0] Navigating to: ${subItem.route}`);
    }
  };

  const handleBackToMain = () => {
    setActiveItem(null);
    setSelectedSubItem(null);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        side="left"
        variant="sidebar"
        collapsible="none"
        className="w-64 border-r"
      >
        {!activeItem ? (
          <>
            <SidebarHeader>
              <TeamSwitcher teams={data.teams} />
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {sidebarItems.map((item) => {
                      const Icon = item.icon;
                      const chevronIndicator = (
                        <IconChevronRight className="h-4 w-4 transition-transform flex-shrink-0" />
                      );

                      return (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton
                            className="w-full h-10 px-3"
                            onClick={() => handleItemClick(item)}
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <Icon className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{item.label}</span>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0 ml-auto min-w-fit">
                              {(item.badge || item.hasSubItems) &&
                                (item.badge ? (
                                  <SidebarMenuBadge
                                    className={cn(
                                      "min-w-fit",
                                      item.hasSubItems && "gap-x-3"
                                    )}
                                  >
                                    {item.badge}
                                    {item.hasSubItems && chevronIndicator}
                                  </SidebarMenuBadge>
                                ) : (
                                  chevronIndicator
                                ))}
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full h-12 px-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Avatar className="h-8 w-8 rounded-full">
                        <AvatarImage src="/avatar-01.png" alt="ephraim" />
                        <AvatarFallback className="rounded-full">E</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left min-w-0">
                        <div className="text-sm font-medium truncate">ephraim</div>
                        <div className="text-xs text-muted-foreground truncate">
                          ephraim@blocks.so
                        </div>
                      </div>
                    </div>
                    <IconLogout className="h-4 w-4 flex-shrink-0" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </>
        ) : (
          activeItemData?.subItems && (
            <>
              <SidebarHeader className="flex flex-row items-center justify-between border-b px-4">
                <button
                  onClick={handleBackToMain}
                  className="h-8 w-8 p-0 rounded-md hover:bg-sidebar-accent flex items-center justify-center"
                >
                  <IconArrowLeft className="h-4 w-4" />
                </button>
                <h3 className="font-medium flex-1 text-center">{activeItemData.label}</h3>
                <div className="w-8" />
              </SidebarHeader>

              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {activeItemData.subItems.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSelected = selectedSubItem === subItem.id;

                        return (
                          <SidebarMenuItem key={subItem.id}>
                            <SidebarMenuButton
                              isActive={isSelected}
                              className="w-full h-10 px-3"
                              onClick={() => handleSubItemClick(subItem)}
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <SubIcon className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">{subItem.label}</span>
                              </div>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </>
          )
        )}
      </Sidebar>
    </div>
  );
}