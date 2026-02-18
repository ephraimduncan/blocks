'use client';

import { PostHogProvider as PHProvider } from '@posthog/react';
import posthog from 'posthog-js';
import { useEffect } from 'react';

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;
const IS_PRODUCTION = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!(POSTHOG_KEY && IS_PRODUCTION)) {
      return;
    }

    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST ?? '/ingest',
      ui_host: 'https://us.posthog.com',
      defaults: '2025-11-30',
      capture_pageview: false,
      disable_session_recording: true,
      person_profiles: 'always',
    });
  }, []);

  if (!(POSTHOG_KEY && IS_PRODUCTION)) {
    return children;
  }

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
