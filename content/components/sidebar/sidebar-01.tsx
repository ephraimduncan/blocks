"use client";

import * as React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Separator } from "@/components/ui/separator"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

import {
  Command,
  Frame,
  LifeBuoy,
  PieChart,
  Send,
  Settings2,
  CreditCard,
  Plus,
  Trash2,
  LucideIcon
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";

// Define minimal types needed for the component
type MenuItem = {
  title: string;
  url: string;
  count?: number;
  icon?: LucideIcon;
  color?: string;
}

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
}

type SidebarSection = {
  title: string | null;
  items: MenuItem[];
  canAdd?: boolean;
  addLabel?: string;
}

type SecondaryNavData = {
  title: string;
  sections: SidebarSection[];
}

// Central data structure for all sidebar content
const data = {
  navPrimary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ] as NavItem[],
  navSecondary: {
    title: "Opportunities",
    sections: [
      {
        title: null, // No title for this section
        items: [
          {
            title: "All",
            icon: Command,
            count: 4,
            url: "#"
          },
          {
            title: "Archived",
            icon: Trash2,
            count: 0,
            url: "#"
          }
        ]
      },
      {
        title: "Status",
        items: [
          {
            title: "New",
            color: "bg-blue-400",
            count: 5,
            url: "#"
          },
          {
            title: "Open",
            color: "bg-green-400",
            count: 2,
            url: "#"
          },
          {
            title: "Solved",
            color: "bg-purple-400",
            count: 1,
            url: "#"
          }
        ],
        canAdd: true,
        addLabel: "Add Status"
      },
      {
        title: "Group",
        items: [
          {
            title: "Marketing",
            icon: PieChart,
            count: 3,
            url: "#"
          },
          {
            title: "Sales",
            icon: CreditCard,
            count: 1,
            url: "#"
          },
          {
            title: "Design",
            icon: Frame,
            count: 4,
            url: "#"
          }
        ],
        canAdd: true,
        addLabel: "Add Group"
      }
    ]
  } as SecondaryNavData
};

export default function Sidebar01() {
  return (
    <SidebarProvider>
      <SidebarContent />
    </SidebarProvider>
  )
}

// Separate component that uses the useSidebar hook
function SidebarContent() {
  const { state, isMobile, openMobile, setOpenMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  // Render menu item with appropriate icon or color indicator
  const renderMenuItemIcon = (item: MenuItem) => {
    if (item.icon) {
      const Icon = item.icon;
      return <Icon className="h-4 w-4" />;
    } else if (item.color) {
      return <div className={`h-2 w-2 rounded-full ${item.color}`}></div>;
    }
    return null;
  };
  
  // Render a section of menu items
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

  // Primary sidebar for both mobile and desktop
  const PrimarySidebar = () => (
    <div className="bg-sidebar text-sidebar-foreground w-16 h-full flex flex-col items-center py-4">
      {/* Logo/Home button */}
      <div className="mb-8">
        <a href="#" className="flex items-center justify-center w-10 h-10 text-sidebar-foreground">
          <Command className="h-6 w-6" />
        </a>
      </div>
      
      {/* Navigation icons */}
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
      
      {/* Bottom settings icon */}
      <div className="mt-auto mb-4">
        <a href="#" className="flex items-center justify-center w-10 h-10 text-sidebar-foreground rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <Settings2 className="h-5 w-5" />
        </a>
      </div>
    </div>
  );

  // Mobile view
  if (isMobile) {
    return (
      <>
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent side="left" className="p-0 flex border-r-0 w-[320px] max-w-full h-full">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            
            {/* Mobile sidebar layout - container for both sidebars */}
            <div className="flex h-full w-full">
              <PrimarySidebar />
              
              {/* Secondary white sidebar with detailed menu - always visible in sheet on mobile */}
              <div className="bg-background h-full flex-1 overflow-y-auto">
                <div className="p-6 pt-10">
                  <h2 className="text-xl font-semibold mb-6">{data.navSecondary.title}</h2>
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

  // Desktop view
  return (
    <>
      <div className="flex h-full">
        {/* Main wrapper for sidebars */}
        <div className="relative flex h-full">
          {/* Primary dark sidebar with icons - floating design with margins */}
          <div className="bg-sidebar text-sidebar-foreground w-16 h-[calc(100vh-32px)] my-4 ml-4 flex flex-col items-center py-4 rounded-xl shadow-md">
            {/* Logo/Home button */}
            <div className="mb-8">
              <a href="#" className="flex items-center justify-center w-10 h-10 text-sidebar-foreground">
                <Command className="h-6 w-6" />
              </a>
            </div>
            
            {/* Navigation icons */}
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
            
            {/* Bottom settings icon */}
            <div className="mt-auto mb-4">
              <a href="#" className="flex items-center justify-center w-10 h-10 text-sidebar-foreground rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Settings2 className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Secondary white sidebar with detailed menu */}
          <div 
            className={`
              bg-background h-[calc(100vh-32px)] my-4 border-r border-border rounded-xl
              ${isCollapsed ? 'w-0 opacity-0 ml-0' : 'w-64 opacity-100'}
              transition-all duration-300 overflow-hidden shadow-sm
            `}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">{data.navSecondary.title}</h2>
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