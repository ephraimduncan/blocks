import { cn } from "@/lib/utils";

const data = [
  {
    label: "After 1 year",
    value: "$2,400",
    percentage: "+8.2%",
  },
  {
    label: "After 5 years",
    value: "$14,800",
    percentage: "+24.6%",
  },
  {
    label: "After 10 years",
    value: "$38,500",
    percentage: "+52.1%",
  },
];

export function Stats15() {
  return (
    <div className="w-full max-w-2xs">
      <h3 className="text-balance text-sm font-medium text-foreground">
        Investment growth projection
      </h3>
      <ul role="list" className="mt-2 divide-y divide-border text-sm">
        {data.map((item, index) => (
          <li key={index} className="flex items-center justify-between py-3">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="flex items-center gap-3 tabular-nums">
              <span className="text-right font-medium text-foreground">
                {item.value}
              </span>
              <span className="h-5 w-px bg-border" aria-hidden="true" />
              <span
                className={cn(
                  "rounded px-1.5 py-1 text-center text-xs font-semibold w-15",
                  "bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400"
                )}
              >
                {item.percentage}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
