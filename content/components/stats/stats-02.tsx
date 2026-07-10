import { TrendingDown, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const stats = [
  {
    metric: 'Active Users',
    current: '128,456',
    previous: '115,789',
    difference: '10.9%',
    trend: 'up',
  },
  {
    metric: 'Conversion Rate',
    current: '5.32%',
    previous: '6.18%',
    difference: '0.86%',
    trend: 'down',
  },
  {
    metric: 'Avg. Session Duration',
    current: '3m 42s',
    previous: '3m 15s',
    difference: '13.8%',
    trend: 'up',
  },
];

export default function Stats02() {
  return (
    <div className="flex items-center justify-center p-10">
      <div className="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-lg bg-border md:grid-cols-3 md:divide-x md:divide-y-0">
        {stats.map((item) => (
          <Card
            className="rounded-none border-0 py-0 shadow-sm"
            key={item.metric}
          >
            <CardContent className="p-4 sm:p-6">
              <CardTitle className="font-normal text-base">
                {item.metric}
              </CardTitle>
              <div className="mt-1 flex items-baseline gap-2 md:block lg:flex">
                <div className="flex items-baseline font-semibold text-2xl text-primary tabular-nums">
                  {item.current}
                  <span className="ml-2 font-medium text-muted-foreground text-sm tabular-nums">
                    from {item.previous}
                  </span>
                </div>

                <Badge
                  className={cn(
                    'inline-flex items-center px-1.5 py-0.5 ps-2.5 font-medium text-xs tabular-nums md:mt-2 lg:mt-0',
                    item.trend === 'up'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  )}
                  variant="outline"
                >
                  {item.trend === 'up' ? (
                    <TrendingUp className="-ml-1 mr-0.5 h-5 w-5 shrink-0 self-center text-green-500" />
                  ) : (
                    <TrendingDown className="-ml-1 mr-0.5 h-5 w-5 shrink-0 self-center text-red-500" />
                  )}

                  <span className="sr-only">
                    {' '}
                    {item.trend === 'up' ? 'Increased' : 'Decreased'} by{' '}
                  </span>
                  {item.difference}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
