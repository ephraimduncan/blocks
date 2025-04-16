import "@/app/globals.css";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist_Mono, Inter } from "next/font/google";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "blocks.so",
  metadataBase: new URL("https://blocks.so"),
  description: "blocks.so",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
    "shadcn",
    "shadcn/ui",
    "blocks.so",
    "blocks",
  ],
  authors: [
    {
      name: "Ephraim Duncan",
      url: "https://ephraimduncan.com",
    },
  ],
  creator: "Ephraim Duncan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blocks.so",
    title: "blocks.so",
    description: "blocks.so",
    siteName: "blocks.so",
    images: [
      {
        url: "https://blocks.so/og",
        width: 1200,
        height: 630,
        alt: "blocks.so",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "blocks.so",
    description: "blocks.so",
    images: ["https://blocks.so/og"],
    creator: "Ephraim Duncan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(fontSans.variable, fontMono.variable, "antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          {children}

          <TailwindIndicator />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
