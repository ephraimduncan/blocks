'use client';

import { useState } from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { CustomersTable } from '../customers-table';
import { DashboardCharts } from '../dashboard-charts';
import { DashboardHeader } from '../dashboard-header';
import { DashboardSidebar } from '../dashboard-sidebar';

export default function Page() {
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>(
    'week'
  );
  const [range, setRange] = useState({ from: '2025-11-10', to: '2025-11-16' });

  const bindTheme = (node: HTMLElement | null) => {
    if (!node) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        event.key === 'D' &&
        event.shiftKey &&
        !target.isContentEditable &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
      ) {
        document.documentElement.classList.toggle('dark');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  };

  return (
    <SidebarProvider
      className="isolate min-h-dvh bg-background font-sans text-foreground antialiased [--chart-1:#3b82f6] [--chart-2:#d4d4d8] [--font-sans:system-ui,sans-serif] [--sidebar-width-icon:3.5rem]! [--sidebar-width:15.5rem]! **:data-[slot=sidebar-group-label]:transition-none **:data-[slot=sidebar-menu-button]:transition-none **:data-[slot=sidebar-container]:ease-[cubic-bezier(0.23,1,0.32,1)] **:data-[slot=sidebar-gap]:ease-[cubic-bezier(0.23,1,0.32,1)] dark:[--chart-2:#3f3f46] dark:[--sidebar-accent:#1a1a1a] dark:[--sidebar:#0d0d0d]"
      defaultOpen={false}
    >
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-background focus:p-3"
        href="#overview"
      >
        Skip to dashboard
      </a>
      <DashboardSidebar />
      <SidebarInset className="min-w-0" id="overview" ref={bindTheme}>
        <DashboardHeader
          onPeriodChange={setPeriod}
          onRangeChange={setRange}
          period={period}
          range={range}
        />
        <div className="@container/metrics border-b">
          <dl className="grid @3xl/metrics:grid-cols-4 grid-cols-2">
            {metrics.map((metric) => (
              <div
                className="flex min-w-0 flex-col justify-center gap-2 border-b @3xl/metrics:border-b-0 @3xl/metrics:not-first:border-l @3xl/metrics:px-7 px-4 py-6 even:border-l [&:nth-last-child(-n+2)]:border-b-0"
                key={metric.label}
              >
                <dt className="truncate text-muted-foreground text-sm sm:text-[0.9375rem]">
                  {metric.label}
                </dt>
                <dd className="flex flex-wrap items-baseline gap-2.5">
                  <span className="font-semibold text-[1.75rem] tabular-nums tracking-tight">
                    {metric.value}
                  </span>
                  <span
                    className={cn(
                      'font-medium text-[0.8125rem] tabular-nums',
                      metric.changeClass
                    )}
                  >
                    {metric.change}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <DashboardCharts from={range.from} period={period} to={range.to} />
        <CustomersTable />
      </SidebarInset>
    </SidebarProvider>
  );
}

const metrics = [
  {
    label: 'New customers',
    value: '1,284',
    change: '+8.2%',
    changeClass: 'text-green-600 dark:text-green-400',
  },
  {
    label: 'Success rate',
    value: '97.4%',
    change: '+0.6%',
    changeClass: 'text-green-600 dark:text-green-400',
  },
  {
    label: 'Failure rate',
    value: '2.6%',
    change: '-0.6%',
    changeClass: 'text-red-600 dark:text-red-400',
  },
  {
    label: 'Refunds',
    value: '38',
    change: '0.0%',
    changeClass: 'text-muted-foreground',
  },
];
