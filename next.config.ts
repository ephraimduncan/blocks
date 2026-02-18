import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['next-mdx-remote'],
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/og',
        destination: '/opengraph-image.png',
        permanent: true,
      },
      {
        source: '/og.png',
        destination: '/opengraph-image.png',
        permanent: true,
      },
      {
        source: '/og-image',
        destination: '/opengraph-image.png',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
