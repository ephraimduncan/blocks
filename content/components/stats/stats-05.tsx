"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const data = [
  {
    name: "Monthly recurring revenue",
    value: "$34.1K",
    change: "+6.1%",
    changeType: "positive",
    href: "#",
  },
  {
    name: "Users",
    value: "500.1K",
    change: "+19.2%",
    changeType: "positive",
    href: "#",
  },
  {
    name: "User growth",
    value: "11.3%",
    change: "-1.2%",
    changeType: "negative",
    href: "#",
  },
];

export default function Stats05() {
  return (
    <div className="flex items-center justify-center p-10 w-full">
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {data.map((item) => (
          <Card key={item.name} className="p-0 gap-0">
            <CardContent className="p-6">
              <dd className="flex items-start justify-between space-x-2">
                <span className="truncate text-sm text-muted-foreground">
                  {item.name}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    item.changeType === "positive"
                      ? "text-emerald-700 dark:text-emerald-500"
                      : "text-red-700 dark:text-red-500"
                  )}
                >
                  {item.change}
                </span>
              </dd>
              <dd className="tabular-nums mt-1 text-3xl font-semibold text-foreground">
                {item.value}
              </dd>
            </CardContent>
            <CardFooter className="flex justify-end border-t border-border p-0!">
              <a
                href={item.href}
                className="px-6 py-3 text-sm font-medium text-primary hover:text-primary/90"
              >
                View more &#8594;
              </a>
            </CardFooter>
          </Card>
        ))}
      </dl>
    </div>
  );
}
