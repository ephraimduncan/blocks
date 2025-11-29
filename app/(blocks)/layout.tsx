import "@/app/globals.css";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProductHuntBanner } from "@/components/product-hunt-banner";
import Script from "next/script";

export default function BlockLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <ProductHuntBanner />
      <Header />
      <div className="flex flex-1 flex-col">
        {/* border-border  border-dotted border-r border-l */}
        <div className="mx-auto w-full max-w-(--breakpoint-xl) flex-1 px-8">
          <div className="min-h-[calc(100%-2rem)] w-full pt-10 pb-20">
            {children}
          </div>
        </div>
      </div>
      <Footer />

      {process.env.NODE_ENV === "production" && (
        <Script
          async
          data-website-id="1671be23-4bb0-43b1-9632-962a463265e8"
          src="https://analytics.duncan.land/script.js"
        />
      )}
    </div>
  );
}
