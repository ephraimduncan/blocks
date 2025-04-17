"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./app-sidebar";

const organizations = [
  {
    id: "1",
    name: "Acme Inc",
    slug: "acme",
  },
  {
    id: "2",
    name: "Globex Corporation",
    slug: "globex",
  },
  {
    id: "3",
    name: "Initech",
    slug: "initech",
  },
];

export default function Sidebar02() {
  return (
    <SidebarProvider>
      <div className="relative flex h-screen w-full">
        <DashboardSidebar organizations={organizations} />
        <SidebarInset className="flex flex-col"></SidebarInset>
      </div>
    </SidebarProvider>
  );
}
