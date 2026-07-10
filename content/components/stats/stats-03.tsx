'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const data = [
  {
    name: 'Unique visitors',
    stat: '10,450',
    change: '-12.5%',
    changeType: 'negative',
  },
  {
    name: 'Bounce rate',
    stat: '56.1%',
    change: '+1.8%',
    changeType: 'positive',
  },
  {
    name: 'Visit duration',
    stat: '5.2min',
    change: '+19.7%',
    changeType: 'positive',
  },
  {
    name: 'Conversion rate',
    stat: '3.2%',
    change: '-2.4%',
    changeType: 'negative',
  },
];

export default function Stats03() {
  return (
    <div className="flex w-full items-center justify-center p-10">
      <dl className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((item) => (
          <Card className="p-6 py-4 shadow-2xs" key={item.name}>
            <CardContent className="p-0">
              <dt className="font-medium text-muted-foreground text-sm">
                {item.name}
              </dt>
              <dd className="mt-2 flex items-baseline space-x-2.5">
                <span className="font-semibold text-3xl text-foreground tabular-nums">
                  {item.stat}
                </span>
                <span
                  className={cn(
                    item.changeType === 'positive'
                      ? 'text-green-800 dark:text-green-400'
                      : 'text-red-800 dark:text-red-400',
                    'font-medium text-sm'
                  )}
                >
                  {item.change}
                </span>
              </dd>
            </CardContent>
          </Card>
        ))}
      </dl>
    </div>
  );
}
