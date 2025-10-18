import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
  async redirects() {
    return [
      // Redirect common OG image paths that crawlers might try
      {
        source: "/og",
        destination: "/opengraph-image.png",
        permanent: true,
      },
      {
        source: "/og.png",
        destination: "/opengraph-image.png",
        permanent: true,
      },
      {
        source: "/og-image",
        destination: "/opengraph-image.png",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
