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
  IconX,
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
    description?: string;
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
        description: "Project overview and activity",
        route: "/overview/dashboard",
      },
      {
        id: "activity",
        label: "Activity",
        icon: IconActivityHeartbeat,
        description: "Recent commits and changes",
        route: "/overview/activity",
      },
      {
        id: "insights",
        label: "Insights",
        icon: IconTarget,
        description: "Code analytics and metrics",
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
        description: "Browse all your repositories",
        route: "/repositories",
      },
      {
        id: "starred",
        label: "Starred",
        icon: IconStar,
        description: "Your starred repositories",
        route: "/repositories/starred",
      },
      {
        id: "archived",
        label: "Archived",
        icon: IconArchive,
        description: "Archived repositories",
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
        description: "Open pull requests",
        route: "/pull-requests/open",
      },
      {
        id: "review-requests",
        label: "Review Requests",
        icon: IconScanEye,
        description: "PRs awaiting your review",
        route: "/pull-requests/review",
      },
      {
        id: "merged",
        label: "Merged",
        icon: IconGitMerge,
        description: "Recently merged PRs",
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
        description: "Active issues and bugs",
        route: "/issues/open",
      },
      {
        id: "assigned",
        label: "Assigned to Me",
        icon: IconUserPlus,
        description: "Issues assigned to you",
        route: "/issues/assigned",
      },
      {
        id: "created",
        label: "Created by Me",
        icon: IconGitCommit,
        description: "Issues you've created",
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
        description: "CI/CD workflows and pipelines",
        route: "/actions/workflows",
      },
      {
        id: "runners",
        label: "Runners",
        icon: IconTerminal2,
        description: "Self-hosted runners",
        route: "/actions/runners",
      },
      {
        id: "deployments",
        label: "Deployments",
        icon: IconCloud,
        description: "Deployment history",
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
        description: "Your published packages",
        route: "/packages/published",
      },
      {
        id: "container-registry",
        label: "Container Registry",
        icon: IconDatabase,
        description: "Docker images and containers",
        route: "/packages/containers",
      },
      {
        id: "npm-packages",
        label: "npm Packages",
        icon: IconBrandNpm,
        description: "Node.js packages",
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
        description: "Vulnerability alerts",
        route: "/security/alerts",
      },
      {
        id: "advisories",
        label: "Advisories",
        icon: IconShieldLock,
        description: "Security advisories",
        route: "/security/advisories",
      },
      {
        id: "secrets",
        label: "Secrets",
        icon: IconPasswordFingerprint,
        description: "Repository secrets",
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
        description: "Your profile settings",
        route: "/settings/profile",
      },
      {
        id: "notifications",
        label: "Notifications",
        icon: IconBellRinging,
        description: "Notification preferences",
        route: "/settings/notifications",
      },
      {
        id: "webhooks",
        label: "Webhooks",
        icon: IconWebhook,
        description: "Webhook configurations",
        route: "/settings/webhooks",
      },
      {
        id: "api-keys",
        label: "API Keys",
        icon: IconKey,
        description: "Personal access tokens",
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
  const [activeItem, setActiveItem] = useState<string | null>("overview");
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);

  const activeItemData = sidebarItems.find((item) => item.id === activeItem);

  const handleItemClick = (item: SidebarItem) => {
    if (item.hasSubItems) {
      const isActive = activeItem === item.id;
      setActiveItem(isActive ? null : item.id);
      if (isActive) {
        setSelectedSubItem(null);
      }
    } else {
      if (activeItem) {
        setActiveItem(null);
        setSelectedSubItem(null);
      }
      console.log(`[v0] Navigating to: ${item.route}`);
    }
  };

  const handleSubItemClick = (subItem: { id: string; route?: string }) => {
    setSelectedSubItem(selectedSubItem === subItem.id ? null : subItem.id);
    if (subItem.route) {
      console.log(`[v0] Navigating to: ${subItem.route}`);
    }
  };

  return (
    <div className="flex h-dvh bg-background">
      <Sidebar
        side="left"
        variant="sidebar"
        collapsible="none"
        className="w-64 border-r"
      >
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.id;
                  const chevronIndicator = (
                    <IconChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform shrink-0",
                        isActive && "rotate-90"
                      )}
                    />
                  );

                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={isActive}
                        className="w-full h-10 px-3"
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <Icon className="h-4 w-4 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0 ml-auto min-w-fit">
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
                <IconLogout className="h-4 w-4 shrink-0" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {activeItem && activeItemData?.subItems && (
        <Sidebar
          side="left"
          variant="sidebar"
          collapsible="none"
          className="w-72 animate-in slide-in-from-left-5 duration-200 border-r"
        >
          <SidebarHeader className="flex flex-row items-center justify-between border-b px-4">
            <h3 className="font-medium">{activeItemData.label}</h3>
            <button
              onClick={() => setActiveItem(null)}
              className="h-6 w-6 p-0 rounded-md hover:bg-sidebar-accent flex items-center justify-center"
            >
              <IconX className="h-4 w-4" />
            </button>
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
                          className="w-full justify-start gap-3 h-auto py-2 px-3"
                          onClick={() => handleSubItemClick(subItem)}
                        >
                          <SubIcon className="h-5 w-5 shrink-0 self-start mt-0.5" />

                          <div className="flex-1 text-left min-w-0">
                            <div className="font-medium">{subItem.label}</div>
                            {subItem.description && (
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {subItem.description}
                              </div>
                            )}
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      )}
    </div>
  );
}
