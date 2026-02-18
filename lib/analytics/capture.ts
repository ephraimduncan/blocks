import posthog from 'posthog-js';
import type { AnalyticsEventMap, AnalyticsEventName } from './events';
import { extractHostname, sanitizeProperties } from './sanitize';

function getBaseProperties() {
  return {
    route_path: window.location.pathname,
    route_query_keys: Array.from(
      new URLSearchParams(window.location.search).keys()
    ),
    referrer_host: document.referrer ? extractHostname(document.referrer) : '',
    vercel_env: process.env.NEXT_PUBLIC_VERCEL_ENV ?? 'development',
    app_version: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? 'unknown',
  };
}

function isTrackingEnabled(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') {
    return false;
  }

  const env = process.env.NEXT_PUBLIC_VERCEL_ENV;
  return env === 'production';
}

export function capture<E extends AnalyticsEventName>(
  eventName: E,
  properties: Omit<
    AnalyticsEventMap[E],
    | 'route_path'
    | 'route_query_keys'
    | 'referrer_host'
    | 'vercel_env'
    | 'app_version'
  >
) {
  if (!isTrackingEnabled()) {
    return;
  }

  const merged = {
    ...getBaseProperties(),
    ...properties,
  };

  const sanitized = sanitizeProperties(merged);
  posthog.capture(eventName, sanitized);
}
