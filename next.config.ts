import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  redirects() {
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

import('@opennextjs/cloudflare').then((m) => m.initOpenNextCloudflareForDev());
