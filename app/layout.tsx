import '@/app/globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import { PostHogProvider } from '@/app/providers/posthog-provider';
import { SeoJsonLd } from '@/components/seo-jsonld';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { Toaster } from '@/components/ui/sonner';
import { siteConfig } from '@/config';
import { cn } from '@/lib/utils';

const fontSans = localFont({
  src: '../public/font/font-medium.otf',
  variable: '--font-sans',
  fallback: ['DM Sans', 'system-ui', 'sans-serif'],
});

const fontMono = localFont({
  src: '../public/font/BerkeleyMonoVariable.woff2',
  variable: '--font-mono',
  display: 'swap',
  fallback: [
    'SF Mono',
    'Monaco',
    'Consolas',
    'Ubuntu Mono',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: 'blocks.so',
  title: {
    default: 'Shadcn Blocks - 60+ Free shadcn/ui Components for React',
    template: '%s | blocks.so - shadcn/ui blocks',
  },
  description: siteConfig.description,
  keywords: [
    'shadcn blocks',
    'shadcn ui blocks',
    'shadcn/ui blocks',
    'shadcn components',
    'shadcn ui components',
    'shadcn/ui components',
    'free shadcn blocks',
    'shadcn ui examples',
    'shadcn code snippets',
    'React UI blocks',
    'Tailwind CSS components',
    'Next.js components',
    'shadcn/ui',
    'copy paste components',
    'Open source UI blocks',
    'accessible components',
    'React components library',
    'UI blocks for developers',
    'shadcn previews',
    'shadcn templates',
    'shadcn',
    'shadcn ui',
    'shadcn ui library',
    'shadcn examples',
    'shadcn starter',
    'radix ui blocks',
    'radix ui components',
    'shadcn dialog component',
    'shadcn form component',
    'shadcn table component',
    'shadcn sidebar',
    'shadcn login',
    'how to use shadcn',
    'best shadcn components',
    'shadcn react components',
    'shadcn next.js',
    'shadcn tailwind',
    'ui components react',
    'free react ui kit',
    'shadcn ui kit',
    'react component library',
    'tailwind ui components',
  ],
  authors: [
    {
      name: 'Ephraim Duncan',
      url: 'https://ephraimduncan.com',
    },
  ],
  creator: 'Ephraim Duncan',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: 'Shadcn Blocks - 60+ Free shadcn/ui Components for React',
    description: siteConfig.description,
    siteName: 'blocks.so',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'blocks.so - Free shadcn/ui blocks and components',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shadcn Blocks - 60+ Free shadcn/ui Components for React',
    description: siteConfig.description,
    creator: '@ephraimduncan_',
    site: '@ephraimduncan_',
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
  category: 'Developer Tools',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
            enableSystem={false}
            forcedTheme="light"
          >
            {children}

            <TailwindIndicator />
            <Toaster />
            <SeoJsonLd />
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
