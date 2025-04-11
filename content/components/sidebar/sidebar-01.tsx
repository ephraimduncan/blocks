"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  Bell,
  Command,
  CreditCard,
  Frame,
  Home,
  LogOut,
  LucideIcon,
  PieChart,
  Plus,
  Send,
  Settings2,
  Sparkles,
  Trash2,
} from "lucide-react";
import { JSX, SVGProps } from "react";

type MenuItem = {
  title: string;
  url: string;
  count?: number;
  icon?: LucideIcon;
  color?: string;
};

type SidebarSection = {
  title: string | null;
  items: MenuItem[];
  canAdd?: boolean;
  addLabel?: string;
};

type SecondaryNavData = {
  title: string;
  sections: SidebarSection[];
};

const data = {
  navPrimary: [
    {
      title: "Support",
      url: "#",
      icon: Home,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  navSecondary: {
    title: "Opportunities",
    sections: [
      {
        title: null,
        items: [
          {
            title: "All",
            icon: Command,
            count: 4,
            url: "#",
          },
          {
            title: "Archived",
            icon: Trash2,
            count: 0,
            url: "#",
          },
        ],
      },
      {
        title: "Status",
        items: [
          {
            title: "New",
            color: "bg-blue-400",
            count: 5,
            url: "#",
          },
          {
            title: "Open",
            color: "bg-green-400",
            count: 2,
            url: "#",
          },
          {
            title: "Solved",
            color: "bg-purple-400",
            count: 1,
            url: "#",
          },
        ],
        canAdd: true,
        addLabel: "Add Status",
      },
      {
        title: "Group",
        items: [
          {
            title: "Marketing",
            icon: PieChart,
            count: 3,
            url: "#",
          },
          {
            title: "Sales",
            icon: CreditCard,
            count: 1,
            url: "#",
          },
          {
            title: "Design",
            icon: Frame,
            count: 4,
            url: "#",
          },
        ],
        canAdd: true,
        addLabel: "Add Group",
      },
    ],
  } as SecondaryNavData,
};

const Logo = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    height="48"
    viewBox="0 0 40 48"
    width="40"
    {...props}
  >
    <clipPath id="a">
      <path d="m0 0h40v48h-40z" />
    </clipPath>
    <g clipPath="url(#a)">
      <path d="m25.0887 5.05386-3.933-1.05386-3.3145 12.3696-2.9923-11.16736-3.9331 1.05386 3.233 12.0655-8.05262-8.0526-2.87919 2.8792 8.83271 8.8328-10.99975-2.9474-1.05385625 3.933 12.01860625 3.2204c-.1376-.5935-.2104-1.2119-.2104-1.8473 0-4.4976 3.646-8.1436 8.1437-8.1436 4.4976 0 8.1436 3.646 8.1436 8.1436 0 .6313-.0719 1.2459-.2078 1.8359l10.9227 2.9267 1.0538-3.933-12.0664-3.2332 11.0005-2.9476-1.0539-3.933-12.0659 3.233 8.0526-8.0526-2.8792-2.87916-8.7102 8.71026z" />
      <path d="m27.8723 26.2214c-.3372 1.4256-1.0491 2.7063-2.0259 3.7324l7.913 7.9131 2.8792-2.8792z" />
      <path d="m25.7665 30.0366c-.9886 1.0097-2.2379 1.7632-3.6389 2.1515l2.8794 10.746 3.933-1.0539z" />
      <path d="m21.9807 32.2274c-.65.1671-1.3313.2559-2.0334.2559-.7522 0-1.4806-.102-2.1721-.2929l-2.882 10.7558 3.933 1.0538z" />
      <path d="m17.6361 32.1507c-1.3796-.4076-2.6067-1.1707-3.5751-2.1833l-7.9325 7.9325 2.87919 2.8792z" />
      <path d="m13.9956 29.8973c-.9518-1.019-1.6451-2.2826-1.9751-3.6862l-10.95836 2.9363 1.05385 3.933z" />
    </g>
  </svg>
);

export default function Sidebar01() {
  return (
    <SidebarProvider>
      <SidebarContent />
    </SidebarProvider>
  );
}

function SidebarContent() {
  const { state, isMobile, openMobile, setOpenMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  const renderMenuItemIcon = (item: MenuItem) => {
    if (item.icon) {
      const Icon = item.icon;
      return <Icon className="h-4 w-4" />;
    } else if (item.color) {
      return <div className={`h-2 w-2 rounded-full ${item.color}`}></div>;
    }

    return null;
  };

  const renderSection = (section: SidebarSection, sectionIndex: number) => (
    <div key={`section-${sectionIndex}`}>
      {section.title && (
        <h3 className="text-sm font-medium text-muted-foreground px-3 mb-2">
          {section.title}
        </h3>
      )}

      <div className="space-y-1">
        {section.items.map((item, itemIndex) => (
          <a
            key={`item-${sectionIndex}-${itemIndex}`}
            href={item.url}
            className="flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-muted"
          >
            <div className="flex items-center gap-3">
              {renderMenuItemIcon(item)}
              <span>{item.title}</span>
            </div>
            <span className="text-muted-foreground">{item.count}</span>
          </a>
        ))}
      </div>

      {section.canAdd && (
        <button className="cursor-pointer mt-2 px-3 text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
          <Plus className="h-3 w-3" />
          <span>{section.addLabel}</span>
        </button>
      )}
    </div>
  );

  const PrimarySidebar = () => (
    <div className="bg-sidebar text-sidebar-foreground w-16 h-full flex flex-col items-center py-4">
      <div className="mb-8">
        <a
          href="#"
          className="flex items-center justify-center w-10 h-10 text-sidebar-foreground"
        >
          <Command className="h-6 w-6" />
        </a>
      </div>

      <div className="flex flex-col gap-4">
        {data.navPrimary.map((item) => (
          <a
            key={item.title}
            href={item.url}
            className="flex items-center justify-center w-10 h-10 text-sidebar-foreground rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <item.icon className="h-5 w-5" />
          </a>
        ))}
      </div>

      <div className="mb-4">
        <a
          href="#"
          className="flex items-center justify-center w-10 h-10 text-sidebar-foreground rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Settings2 className="h-5 w-5" />
        </a>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent
            side="left"
            className="p-0 flex border-r-0 w-[320px] max-w-full h-full"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>

            <div className="flex h-full w-full">
              <PrimarySidebar />

              <div className="bg-background h-full flex-1 overflow-y-auto">
                <div className="p-6 pt-10">
                  <h2 className="text-xl font-semibold mb-6">
                    {data.navSecondary.title}
                  </h2>
                  <div className="space-y-5">
                    {data.navSecondary.sections.map(renderSection)}
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <SidebarInset className="w-full h-screen flex flex-col">
          <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto pt-2">
            <div className="flex flex-col gap-4 p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="w-full aspect-video rounded-xl bg-muted/50 flex justify-center items-center text-lg font-bold" />
                <div className="aspect-video rounded-xl bg-muted/50 flex justify-center items-center" />
                <div className="aspect-video rounded-xl bg-muted/50 flex justify-center items-center" />
              </div>
              <div className="h-64 md:h-[calc(100vh-350px)] rounded-xl bg-muted/50 flex justify-center items-center" />
            </div>
          </div>
        </SidebarInset>
      </>
    );
  }

  return (
    <>
      <div className="flex h-full">
        <div className="relative flex h-full">
          <div className="bg-sidebar text-sidebar-foreground w-16 my-4 ml-4 flex flex-col items-center pt-4 rounded-xl shadow-md h-[calc(100vh-32px)] justify-between">
            <div className="flex flex-col gap-16">
              <div>
                <a
                  href="#"
                  className="flex items-center justify-center w-10 h-10 text-sidebar-foreground"
                >
                  <Logo className="h-6 w-6" />
                </a>
              </div>

              <div className="flex flex-col gap-2">
                {data.navPrimary.map((item) => (
                  <a
                    key={item.title}
                    href={item.url}
                    className="flex items-center justify-center w-10 h-10 text-sidebar-foreground rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <item.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src="https://blocks.so/avatar-01.png"
                      alt="user.name"
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="min-w-56 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src="https://blocks.so/avatar-01.png"
                          alt="Avatar"
                        />
                        <AvatarFallback className="rounded-lg">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          Ephraim Duncan
                        </span>
                        <span className="truncate text-xs">
                          ephraim@blocks.so
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Sparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div
            className={cn(
              "bg-background h-[calc(100vh-32px)] my-4 border-r border-border rounded-xl",
              "transition-all duration-300 overflow-hidden shadow-sm",
              isCollapsed ? "w-0 opacity-0 ml-0" : "w-64 opacity-100"
            )}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">
                {data.navSecondary.title}
              </h2>
              <div className="space-y-5">
                {data.navSecondary.sections.map(renderSection)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SidebarInset className="w-full h-screen flex flex-col">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto pt-2">
          <div className="flex flex-col gap-4 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="w-full aspect-video rounded-xl bg-muted/50 flex justify-center items-center text-lg font-bold" />
              <div className="aspect-video rounded-xl bg-muted/50 flex justify-center items-center" />
              <div className="aspect-video rounded-xl bg-muted/50 flex justify-center items-center" />
            </div>
            <div className="h-64 md:h-[calc(100vh-350px)] rounded-xl bg-muted/50 flex justify-center items-center" />
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
