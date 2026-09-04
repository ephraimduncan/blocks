import '@/app/globals.css';
import type { Metadata } from 'next';
import { fontMono, fontSans } from '@/app/fonts';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Blocks.so — Preview',
};

export default function PreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="light" lang="en">
      <body className={cn(fontSans.variable, fontMono.variable, 'antialiased')}>
        <TooltipProvider delay={0}>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
