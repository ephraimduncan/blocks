"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import { MailProvider, useMail } from "../mail-context";

function MailPreview() {
  const { selectedMail } = useMail();
  if (!selectedMail) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Select an email to preview
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <div className="text-lg font-semibold">{selectedMail.subject}</div>
        <div className="text-sm text-muted-foreground">
          From: {selectedMail.name} ({selectedMail.email})
        </div>
      </div>
      <div className="p-4 text-sm whitespace-pre-wrap">{`${selectedMail.teaser}\n\nThis is a sample message body for the selected email.\nIt demonstrates the preview area on the right side.`}</div>
    </div>
  );
}

export default function Page() {
  return (
    <SidebarProvider>
      <MailProvider>
        <div className="flex h-dvh w-full">
          <AppSidebar />
          <SidebarInset>
            <div className="flex-1 rounded-xl border m-2">
              <MailPreview />
            </div>
          </SidebarInset>
        </div>
      </MailProvider>
    </SidebarProvider>
  );
}
