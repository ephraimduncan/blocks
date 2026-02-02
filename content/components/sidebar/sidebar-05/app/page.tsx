"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <div className="flex h-dvh w-full">
        <AppSidebar />
      </div>
    </SidebarProvider>
  );
}
