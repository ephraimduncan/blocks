import { Agentation } from 'agentation';
import '@/app/globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
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
    <html className="light" lang="en" suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === 'development' && (
          <Script
            crossOrigin="anonymous"
            src="//unpkg.com/react-grab/dist/index.global.js"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body
        className={cn(fontSans.variable, fontMono.variable, 'antialiased')}
        suppressHydrationWarning
      >
        <TooltipProvider delay={0}>
          {children}
          <Toaster />
          {process.env.NODE_ENV === 'development' && <Agentation />}
        </TooltipProvider>
      </body>
    </html>
  );
}
