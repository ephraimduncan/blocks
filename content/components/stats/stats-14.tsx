import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface UsageItem {
  label: string;
  amount: number;
  percentage: number;
  color: 'emerald' | 'amber' | 'rose';
}

const data: UsageItem[] = [
  { label: 'Compute', amount: 450, percentage: 52.3, color: 'emerald' },
  { label: 'Storage', amount: 285, percentage: 33.1, color: 'amber' },
  { label: 'Bandwidth', amount: 125, percentage: 14.6, color: 'rose' },
];

const colorClasses = {
  emerald: 'bg-emerald-500 dark:bg-emerald-400',
  amber: 'bg-amber-500 dark:bg-amber-400',
  rose: 'bg-rose-500 dark:bg-rose-400',
};

export function Stats14() {
  return (
    <Card className="w-full max-w-sm shadow-none">
      <CardContent className="flex flex-col justify-between pt-0">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-balance font-bold text-foreground text-sm">
              Usage
            </h3>
            <Badge
              className="bg-amber-50 text-amber-700 ring-1 ring-amber-500/30 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20"
              variant="secondary"
            >
              +12.5%
            </Badge>
          </div>

          <p className="mt-2 flex items-baseline gap-2 text-pretty">
            <span className="text-foreground text-xl">$860</span>
            <span className="text-muted-foreground text-sm">this month</span>
          </p>

          <div className="mt-4">
            <p className="text-pretty font-medium text-foreground text-sm">
              Resource breakdown
            </p>
            <div className="mt-2 flex items-center gap-0.5">
              {data.map((item, index) => (
                <div
                  className={`${colorClasses[item.color]} h-1.5 rounded-xs`}
                  key={index}
                  style={{ width: `${item.percentage}%` }}
                />
              ))}
            </div>
          </div>

          <ul className="mt-5 space-y-2" role="list">
            {data.map((item, index) => (
              <li className="flex items-center gap-2 text-xs" key={index}>
                <span
                  aria-hidden="true"
                  className={`${colorClasses[item.color]} size-2.5 rounded-xs`}
                />
                <span className="text-foreground">{item.label}</span>
                <span className="text-muted-foreground">
                  (${item.amount} / {item.percentage}%)
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-pretty text-muted-foreground text-xs">
          Configure limits in{' '}
          <a
            className="text-emerald-600 hover:underline dark:text-emerald-400"
            href="#"
          >
            resource settings.
          </a>
        </p>
      </CardContent>
    </Card>
  );
}
