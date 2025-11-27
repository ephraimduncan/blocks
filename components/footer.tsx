"use client";

import { siteConfig } from "@/config";
import { IconSquareRoundedFilled } from "@tabler/icons-react";

export function Footer() {
  return (
    <div className="mx-auto w-full max-w-(--breakpoint-xl) px-4 sm:px-8 border-border border-dotted border-r border-l">
      <footer className="flex items-center justify-center w-full sm:flex-row sm:items-center gap-4 py-5 pb-20">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center gap-0.5">
            <IconSquareRoundedFilled className="size-10 mx-auto" />
            <span className="text-2xl font-bold">Blocks</span>
          </div>

          <div className="text-center font-xl font-semibold tracking-tight text-[#C6C6C6]">
            <span>© Blocks.so 2025</span>
            <br />
            <span>All rights reserved</span>
          </div>

          <div className="text-center font-xl font-semibold tracking-tight text-[#C6C6C6]">
            Built by{" "}
            <a
              href={siteConfig.links.website}
              target="_blank"
              rel="noreferrer"
              className="hover:font-black transition-all duration-200 underline underline-offset-4"
              data-umami-event="View Ephraim Duncan's Website"
            >
              Ephraim Duncan
            </a>
            .
            <br />
            The source code is available on{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
              data-umami-event="View GitHub Repository"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
