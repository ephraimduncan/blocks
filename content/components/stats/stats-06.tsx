'use client';

import { AlertTriangle, Check, ChevronRight, Eye } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const data = [
  {
    name: 'Europe',
    stat: '$10,023',
    goalsAchieved: 3,
    status: 'observe',
    href: '#',
  },
  {
    name: 'North America',
    stat: '$14,092',
    goalsAchieved: 5,
    status: 'within',
    href: '#',
  },
  {
    name: 'Asia',
    stat: '$113,232',
    goalsAchieved: 1,
    status: 'critical',
    href: '#',
  },
];

export default function Stats06() {
  return (
    <div className="flex w-full items-center justify-center p-10">
      <dl className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <Card className="relative p-6 shadow-2xs" key={item.name}>
            <CardContent className="p-0">
              <dt className="font-medium text-muted-foreground text-sm">
                {item.name}
              </dt>
              <dd className="font-semibold text-3xl text-foreground tabular-nums">
                {item.stat}
              </dd>
              <div className="group relative mt-6 flex items-center space-x-4 rounded-md bg-muted/60 p-2 hover:bg-muted">
                <div className="flex w-full items-center justify-between truncate">
                  <div className="flex items-center space-x-3">
                    <span
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded',
                        item.status === 'within'
                          ? 'bg-emerald-500 text-white'
                          : item.status === 'observe'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-red-500 text-white'
                      )}
                    >
                      {item.status === 'within' ? (
                        <Check aria-hidden={true} className="size-4 shrink-0" />
                      ) : item.status === 'observe' ? (
                        <Eye aria-hidden={true} className="size-4 shrink-0" />
                      ) : (
                        <AlertTriangle
                          aria-hidden={true}
                          className="size-4 shrink-0"
                        />
                      )}
                    </span>
                    <dd>
                      <p className="text-pretty text-muted-foreground text-sm">
                        <Link className="focus:outline-none" href={item.href}>
                          {/* Extend link to entire card */}
                          <span
                            aria-hidden={true}
                            className="absolute inset-0"
                          />
                          {item.goalsAchieved}/5 goals
                        </Link>
                      </p>
                      <p
                        className={cn(
                          'font-medium text-sm',
                          item.status === 'within'
                            ? 'text-emerald-800 dark:text-emerald-500'
                            : item.status === 'observe'
                              ? 'text-yellow-800 dark:text-yellow-500'
                              : 'text-red-800 dark:text-red-500'
                        )}
                      >
                        {item.status}
                      </p>
                    </dd>
                  </div>
                  <ChevronRight
                    aria-hidden={true}
                    className="size-5 shrink-0 text-muted-foreground/60 group-hover:text-muted-foreground"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </dl>
    </div>
  );
}
