'use client';

import { usePostHog } from '@posthog/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (!(pathname && posthog)) {
      return;
    }

    let url = window.origin + pathname;
    const params = searchParams?.toString();
    if (params) {
      url = `${url}?${params}`;
    }

    posthog.capture('$pageview', { $current_url: url });
  }, [pathname, searchParams, posthog]);

  return null;
}
