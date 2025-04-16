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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  Bell,
  Command,
  CreditCard,
  LogOut,
  Plus,
  Settings2,
  Sparkles,
} from "lucide-react";
import { data, MenuItem, SidebarSection } from "./data";
import { Logo } from "./logo";

export function SidebarContent() {
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
