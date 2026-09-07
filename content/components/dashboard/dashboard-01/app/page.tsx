'use client';

import { CircleCheck, CircleX, RotateCcw, UserRoundPlus } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
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

  return (
    <SidebarProvider
      className="isolate min-h-dvh bg-background font-sans text-foreground antialiased [--chart-1:#3b82f6] [--chart-2:#d4d4d8] [--font-sans:system-ui,sans-serif] [--sidebar-width-icon:3.5rem]! [--sidebar-width:15.5rem]! dark:[--chart-2:#3f3f46] dark:[--sidebar-accent:#1a1a1a] dark:[--sidebar:#0d0d0d]"
      defaultOpen={false}
    >
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-background focus:p-3"
        href="#overview"
      >
        Skip to dashboard
      </a>
      <DashboardSidebar />
      <SidebarInset className="min-w-0" id="overview">
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
                className="flex min-w-0 flex-col justify-center gap-3.5 border-b @3xl/metrics:border-b-0 @3xl/metrics:not-first:border-l @3xl/metrics:px-7 px-4 py-6 even:border-l [&:nth-last-child(-n+2)]:border-b-0"
                key={metric.label}
              >
                <dt className="flex min-w-0 items-center gap-2.5 text-muted-foreground text-sm sm:text-[0.9375rem]">
                  <div
                    className={cn(
                      'flex size-7 shrink-0 items-center justify-center rounded-lg',
                      metric.iconClass
                    )}
                  >
                    <metric.icon aria-hidden="true" className="size-4" />
                  </div>
                  <span className="truncate">{metric.label}</span>
                </dt>
                <dd className="flex flex-wrap items-center gap-3">
                  <div className="font-semibold text-[1.75rem] tabular-nums tracking-tight">
                    {metric.value}
                  </div>
                  <Badge
                    className={cn(
                      'rounded-full border-0 px-2 font-medium tabular-nums',
                      metric.changeClass
                    )}
                    variant="secondary"
                  >
                    {metric.change}
                  </Badge>
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
    icon: UserRoundPlus,
    iconClass: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
    changeClass:
      'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400',
  },
  {
    label: 'Success rate',
    value: '97.4%',
    change: '+0.6%',
    icon: CircleCheck,
    iconClass:
      'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400',
    changeClass:
      'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400',
  },
  {
    label: 'Failing rate',
    value: '2.6%',
    change: '-0.6%',
    icon: CircleX,
    iconClass: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
    changeClass: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
  },
  {
    label: 'Refunds',
    value: '38',
    change: '0.0%',
    icon: RotateCcw,
    iconClass:
      'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    changeClass: 'bg-muted text-muted-foreground',
  },
];
