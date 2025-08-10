"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarContent } from "./sidebar-content";

export default function Sidebar01() {
  return (
    <SidebarProvider>
      <SidebarContent />
    </SidebarProvider>
  );
}
