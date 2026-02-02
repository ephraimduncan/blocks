import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface UsageItem {
  label: string;
  amount: number;
  percentage: number;
  color: "emerald" | "amber" | "rose";
}

const data: UsageItem[] = [
  { label: "Compute", amount: 450, percentage: 52.3, color: "emerald" },
  { label: "Storage", amount: 285, percentage: 33.1, color: "amber" },
  { label: "Bandwidth", amount: 125, percentage: 14.6, color: "rose" },
];

const colorClasses = {
  emerald: "bg-emerald-500 dark:bg-emerald-400",
  amber: "bg-amber-500 dark:bg-amber-400",
  rose: "bg-rose-500 dark:bg-rose-400",
};

export function Stats14() {
  return (
    <Card className="w-full max-w-sm shadow-none">
      <CardContent className="flex flex-col justify-between pt-0">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-balance text-sm font-bold text-foreground">Usage</h3>
            <Badge
              variant="secondary"
              className="bg-amber-50 text-amber-700 ring-1 ring-amber-500/30 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20"
            >
              +12.5%
            </Badge>
          </div>

          <p className="text-pretty mt-2 flex items-baseline gap-2">
            <span className="text-xl text-foreground">$860</span>
            <span className="text-sm text-muted-foreground">this month</span>
          </p>

          <div className="mt-4">
            <p className="text-pretty text-sm font-medium text-foreground">
              Resource breakdown
            </p>
            <div className="mt-2 flex items-center gap-0.5">
              {data.map((item, index) => (
                <div
                  key={index}
                  className={`${colorClasses[item.color]} h-1.5 rounded-xs`}
                  style={{ width: `${item.percentage}%` }}
                />
              ))}
            </div>
          </div>

          <ul role="list" className="mt-5 space-y-2">
            {data.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-xs">
                <span
                  className={`${colorClasses[item.color]} size-2.5 rounded-xs`}
                  aria-hidden="true"
                />
                <span className="text-foreground">{item.label}</span>
                <span className="text-muted-foreground">
                  (${item.amount} / {item.percentage}%)
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-pretty mt-6 text-xs text-muted-foreground">
          Configure limits in{" "}
          <a
            href="#"
            className="text-emerald-600 hover:underline dark:text-emerald-400"
          >
            resource settings.
          </a>
        </p>
      </CardContent>
    </Card>
  );
}
