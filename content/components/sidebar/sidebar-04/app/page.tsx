'use client';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../app-sidebar';
import { MailProvider, useMail } from '../mail-context';

function MailPreview() {
  const { selectedMail } = useMail();
  if (!selectedMail) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
        Select an email to preview
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <div className="font-semibold text-lg">{selectedMail.subject}</div>
        <div className="text-muted-foreground text-sm">
          From: {selectedMail.name} ({selectedMail.email})
        </div>
      </div>
      <div className="whitespace-pre-wrap p-4 text-sm">{`${selectedMail.teaser}\n\nThis is a sample message body for the selected email.\nIt demonstrates the preview area on the right side.`}</div>
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
            <div className="m-2 flex-1 rounded-xl border">
              <MailPreview />
            </div>
          </SidebarInset>
        </div>
      </MailProvider>
    </SidebarProvider>
  );
}
