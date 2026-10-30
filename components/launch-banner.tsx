'use client';

import { IconArrowUpRight } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const launchUrl =
  'https://www.producthunt.com/products/telemetry-dev?launch=telemetry-dev';

// Product Hunt launches go live at 12:01 am Pacific Time. On 31 October 2026, that is UTC-7.
const launchStart = Date.parse('2026-10-31T00:01:00-07:00');
// The banner stays until the end of 31 December Pacific Time, which is UTC-8 by then.
const bannerEnd = Date.parse('2027-01-01T00:00:00-08:00');

/**
 * The telemetry.dev Product Hunt launch: a teaser before the launch day, then a link to the
 * launch until the end of 2026. The pages are static, so the first render uses the time of the
 * build to match the HTML. After mount, it uses the browser's time.
 */
export function LaunchBanner({ renderedAt }: { renderedAt: number }) {
  const [now, setNow] = useState(renderedAt);

  useEffect(() => {
    setNow(Date.now());
  }, []);

  if (now >= bannerEnd) {
    return null;
  }

  const [text, action] =
    now < launchStart
      ? ['telemetry.dev launches on Product Hunt tomorrow.', 'Get notified']
      : ['telemetry.dev is live on Product Hunt.', 'Support the launch'];

  return (
    <a
      className="block text-balance bg-primary px-4 py-2.5 text-center text-primary-foreground text-sm outline-none transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset sm:px-8"
      data-umami-event="View telemetry.dev Product Hunt launch"
      href={launchUrl}
      rel="noreferrer"
      target="_blank"
    >
      {text}{' '}
      <span className="inline-flex items-center gap-1 font-medium underline underline-offset-4">
        {action}
        <IconArrowUpRight className="size-3.5" />
      </span>
    </a>
  );
}
