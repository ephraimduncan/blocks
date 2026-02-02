import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const data = [
  {
    name: "Profit",
    value: "$287,654.00",
    change: "+8.32%",
    changeType: "positive",
  },
  {
    name: "Late payments",
    value: "$9,435.00",
    change: "-12.64%",
    changeType: "negative",
  },
  {
    name: "Pending orders",
    value: "$173,229.00",
    change: "+2.87%",
    changeType: "positive",
  },
  {
    name: "Operating costs",
    value: "$52,891.00",
    change: "-5.73%",
    changeType: "negative",
  },
];

export default function Stats01() {
  return (
    <div className="flex items-center justify-center p-10">
      <div className="mx-auto grid grid-cols-1 gap-px rounded-xl bg-border sm:grid-cols-2 lg:grid-cols-4">
        {data.map((stat, index) => (
          <Card
            key={stat.name}
            className={cn(
              "rounded-none border-0 shadow-none py-0",
              index === 0 && "rounded-l-xl",
              index === data.length - 1 && "rounded-r-xl"
            )}
          >
            <CardContent className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 p-4 sm:p-6">
              <div className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </div>
              <div
                className={cn(
                  "tabular-nums text-xs font-medium",
                  stat.changeType === "positive"
                    ? "text-green-800 dark:text-green-400"
                    : "text-red-800 dark:text-red-400"
                )}
              >
                {stat.change}
              </div>
              <div className="tabular-nums w-full flex-none text-3xl font-medium tracking-tight text-foreground">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
