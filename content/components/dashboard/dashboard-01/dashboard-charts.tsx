'use client';

import { format, parseISO } from 'date-fns';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';

export function DashboardCharts({
  period,
  from,
  to,
}: {
  period: 'day' | 'week' | 'month' | 'year';
  from: string;
  to: string;
}) {
  const data = samples.filter(
    (row) => row.date.slice(0, 10) >= from && row.date.slice(0, 10) <= to
  );
  const tickStep = Math.max(1, Math.ceil(data.length / 7));
  const ticks = data
    .filter((_, index) => index % tickStep === 0)
    .map((row) => row.date);
  const tickFormat = from === to ? 'ha' : 'd MMM';

  return (
    <div className="@container/charts border-b">
      <div className="grid @4xl/charts:grid-cols-2">
        {panels.map((panel) => {
          const total = data.reduce((sum, row) => sum + row[panel.current], 0);
          const previous = data.reduce(
            (sum, row) => sum + row[panel.previous],
            0
          );
          const change = previous ? ((total - previous) / previous) * 100 : 0;
          const config = {
            [panel.current]: {
              label: `This ${period}`,
              color: 'var(--chart-1)',
            },
            [panel.previous]: {
              label: `Last ${period}`,
              color: 'var(--chart-2)',
            },
          } satisfies ChartConfig;

          return (
            <section
              aria-labelledby={`${panel.id}-title`}
              className="@container/panel flex min-h-100 min-w-0 flex-col gap-7 border-t @4xl/charts:border-t-0 @4xl/charts:not-first:border-l p-4 py-7 first:border-t-0 sm:px-7"
              id={panel.id}
              key={panel.id}
            >
              <div className="relative flex flex-col gap-2">
                <h2
                  className="text-[0.9375rem] text-muted-foreground"
                  id={`${panel.id}-title`}
                >
                  {panel.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-semibold text-[1.75rem] tabular-nums tracking-tight">
                    {panel.currency ? '$' : ''}
                    {total.toLocaleString('en-US')}
                  </p>
                  <Badge
                    className={cn(
                      'rounded-full border-0 px-2 tabular-nums',
                      change < 0
                        ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                        : 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
                    )}
                    variant="secondary"
                  >
                    {change > 0 ? '+' : ''}
                    {change.toFixed(1)}%
                  </Badge>
                  <p className="text-[0.8125rem] text-muted-foreground">
                    vs. last {period}
                  </p>
                </div>
                <div className="@lg/panel:absolute @lg/panel:top-1 @lg/panel:right-0 flex items-center gap-4 text-[0.8125rem]">
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-0.75 w-2.5 rounded-full bg-chart-1"
                    />
                    This {period}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-0.75 w-2.5 rounded-full bg-chart-2"
                    />
                    Last {period}
                  </div>
                </div>
              </div>
              {data.length ? (
                <ChartContainer
                  className="aspect-auto h-63 w-full"
                  config={config}
                >
                  <ComposedChart
                    accessibilityLayer
                    data={data}
                    margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
                  >
                    <CartesianGrid
                      stroke="var(--border)"
                      strokeDasharray="3 4"
                      vertical={false}
                    />
                    <XAxis
                      axisLine={false}
                      dataKey="date"
                      height={40}
                      minTickGap={24}
                      tickFormatter={(date: string) =>
                        format(parseISO(date), tickFormat)
                      }
                      tickLine={false}
                      tickMargin={16}
                      ticks={ticks}
                    />
                    <YAxis
                      axisLine={false}
                      domain={[0, 'auto']}
                      tickCount={4}
                      tickFormatter={(value: number) =>
                        `${panel.currency ? '$' : ''}${value >= 1000 ? `${value / 1000}k` : value}`
                      }
                      tickLine={false}
                      tickMargin={8}
                      width={48}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          className="w-47.5 rounded-[10px] bg-popover px-3 py-2.5"
                          formatter={(value, name) => (
                            <div className="flex w-full items-center gap-2">
                              <span
                                aria-hidden="true"
                                className={cn(
                                  'size-2 shrink-0 rounded-xs',
                                  name === panel.current
                                    ? 'bg-chart-1'
                                    : 'bg-chart-2'
                                )}
                              />
                              <span className="flex-1 text-muted-foreground">
                                {name === panel.current
                                  ? `This ${period}`
                                  : `Last ${period}`}
                              </span>
                              <span className="font-medium text-foreground tabular-nums">
                                {panel.currency ? '$' : ''}
                                {Number(value).toLocaleString('en-US')}
                              </span>
                            </div>
                          )}
                          labelClassName="font-normal text-muted-foreground"
                          labelFormatter={(label) =>
                            typeof label === 'string'
                              ? format(parseISO(label), 'EEE, d MMM, ha')
                              : label
                          }
                        />
                      }
                      cursor={{
                        stroke: 'var(--chart-1)',
                        strokeDasharray: '3 3',
                      }}
                    />
                    <Area
                      activeDot={false}
                      dataKey={panel.current}
                      fill="var(--chart-1)"
                      fillOpacity={0.1}
                      isAnimationActive={false}
                      stroke="none"
                      tooltipType="none"
                      type="linear"
                    />
                    <Line
                      activeDot={{
                        r: 5,
                        fill: 'var(--chart-1)',
                        stroke: 'var(--background)',
                        strokeWidth: 2,
                      }}
                      dataKey={panel.current}
                      dot={data.length === 1}
                      isAnimationActive={false}
                      stroke="var(--chart-1)"
                      strokeWidth={2.5}
                      type="linear"
                    />
                    <Line
                      activeDot={{
                        r: 4,
                        fill: 'var(--chart-2)',
                        stroke: 'var(--background)',
                        strokeWidth: 2,
                      }}
                      dataKey={panel.previous}
                      dot={data.length === 1}
                      isAnimationActive={false}
                      stroke="var(--chart-2)"
                      strokeWidth={2}
                      type="linear"
                    />
                  </ComposedChart>
                </ChartContainer>
              ) : (
                <p className="flex flex-1 items-center justify-center text-muted-foreground text-sm">
                  No data for this date range.
                </p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

const panels = [
  {
    id: 'revenue',
    title: 'Revenue',
    current: 'revenue',
    previous: 'priorRevenue',
    currency: true,
  },
  {
    id: 'charges',
    title: 'Charges',
    current: 'charges',
    previous: 'priorCharges',
    currency: false,
  },
] as const;

const dailyTotals = [
  {
    date: '2025-11-03',
    revenue: 4890,
    priorRevenue: 4710,
    charges: 335,
    priorCharges: 315,
  },
  {
    date: '2025-11-04',
    revenue: 6210,
    priorRevenue: 5900,
    charges: 410,
    priorCharges: 390,
  },
  {
    date: '2025-11-05',
    revenue: 5620,
    priorRevenue: 5300,
    charges: 365,
    priorCharges: 320,
  },
  {
    date: '2025-11-06',
    revenue: 7670,
    priorRevenue: 7250,
    charges: 285,
    priorCharges: 270,
  },
  {
    date: '2025-11-07',
    revenue: 6820,
    priorRevenue: 6510,
    charges: 480,
    priorCharges: 460,
  },
  {
    date: '2025-11-08',
    revenue: 5840,
    priorRevenue: 5560,
    charges: 601,
    priorCharges: 570,
  },
  {
    date: '2025-11-09',
    revenue: 7232,
    priorRevenue: 6900,
    charges: 650,
    priorCharges: 610,
  },
  {
    date: '2025-11-10',
    revenue: 5260,
    priorRevenue: 4890,
    charges: 370,
    priorCharges: 335,
  },
  {
    date: '2025-11-11',
    revenue: 6480,
    priorRevenue: 6210,
    charges: 475,
    priorCharges: 410,
  },
  {
    date: '2025-11-12',
    revenue: 8140,
    priorRevenue: 5620,
    charges: 390,
    priorCharges: 365,
  },
  {
    date: '2025-11-13',
    revenue: 5890,
    priorRevenue: 7670,
    charges: 315,
    priorCharges: 285,
  },
  {
    date: '2025-11-14',
    revenue: 7010,
    priorRevenue: 6820,
    charges: 552,
    priorCharges: 480,
  },
  {
    date: '2025-11-15',
    revenue: 4320,
    priorRevenue: 5840,
    charges: 650,
    priorCharges: 601,
  },
  {
    date: '2025-11-16',
    revenue: 5810,
    priorRevenue: 7232,
    charges: 730,
    priorCharges: 650,
  },
];

const activity = [
  0.54, 0.46, 0.38, 0.35, 0.41, 0.58, 0.74, 0.97, 1.12, 1.38, 1.21, 1.53, 1.29,
  1.41, 1.67, 1.48, 1.31, 1.58, 1.36, 1.19, 1.04, 0.86, 0.72, 0.63,
];
const variation = [
  1.08, 0.82, 1.16, 0.94, 1.28, 0.76, 1.02, 1.19, 0.88, 1.12, 0.91, 1.24, 0.84,
  1.06, 0.97, 1.31, 0.79,
];

// Hourly demo activity preserves each day's totals in both comparison series.
const samples = dailyTotals.flatMap((day, index) => {
  const weights = activity.map(
    (weight, hour) =>
      weight * variation[(hour * 3 + index * 7) % variation.length]
  );
  const previousWeights = activity.map(
    (weight, hour) =>
      weight * variation[(hour * 5 + index * 11) % variation.length]
  );
  const sum = weights.reduce((total, weight) => total + weight, 0);
  const previousSum = previousWeights.reduce(
    (total, weight) => total + weight,
    0
  );
  let share = 0;
  let previousShare = 0;

  return weights.map((weight, hour) => {
    const start = share;
    const previousStart = previousShare;
    share += weight / sum;
    previousShare += previousWeights[hour] / previousSum;
    return {
      date: `${day.date}T${String(hour).padStart(2, '0')}:00:00`,
      revenue:
        Math.round(day.revenue * share) - Math.round(day.revenue * start),
      priorRevenue:
        Math.round(day.priorRevenue * previousShare) -
        Math.round(day.priorRevenue * previousStart),
      charges:
        Math.round(day.charges * share) - Math.round(day.charges * start),
      priorCharges:
        Math.round(day.priorCharges * previousShare) -
        Math.round(day.priorCharges * previousStart),
    };
  });
});
