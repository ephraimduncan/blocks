import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

const config = defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});

export default {
  ...config,
  buildCommand: 'bun run build:next',
};
