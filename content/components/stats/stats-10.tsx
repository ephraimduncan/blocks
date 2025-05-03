"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { Area, AreaChart, XAxis } from "recharts";

const data = [
  {
    date: "Nov 24, 2023",
    "Alpha Corp": 142.87,
    "Beta Solutions": 65.32,
    "Gamma Industries": 83.25,
  },
  {
    date: "Nov 25, 2023",
    "Alpha Corp": 151.43,
    "Beta Solutions": 59.78,
    "Gamma Industries": 79.64,
  },
  {
    date: "Nov 26, 2023",
    "Alpha Corp": 157.28,
    "Beta Solutions": 64.21,
    "Gamma Industries": 76.19,
  },
  {
    date: "Nov 27, 2023",
    "Alpha Corp": 162.94,
    "Beta Solutions": 57.46,
    "Gamma Industries": 72.84,
  },
  {
    date: "Nov 28, 2023",
    "Alpha Corp": 148.37,
    "Beta Solutions": 49.82,
    "Gamma Industries": 81.56,
  },
  {
    date: "Nov 29, 2023",
    "Alpha Corp": 139.56,
    "Beta Solutions": 55.63,
    "Gamma Industries": 92.38,
  },
  {
    date: "Nov 30, 2023",
    "Alpha Corp": 145.83,
    "Beta Solutions": 61.27,
    "Gamma Industries": 88.75,
  },
  {
    date: "Dec 01, 2023",
    "Alpha Corp": 138.29,
    "Beta Solutions": 68.94,
    "Gamma Industries": 93.42,
  },
  {
    date: "Dec 02, 2023",
    "Alpha Corp": 129.64,
    "Beta Solutions": 74.56,
    "Gamma Industries": 97.18,
  },
  {
    date: "Dec 03, 2023",
    "Alpha Corp": 119.82,
    "Beta Solutions": 71.38,
    "Gamma Industries": 89.43,
  },
  {
    date: "Dec 04, 2023",
    "Alpha Corp": 128.54,
    "Beta Solutions": 63.95,
    "Gamma Industries": 92.76,
  },
  {
    date: "Dec 05, 2023",
    "Alpha Corp": 137.21,
    "Beta Solutions": 58.47,
    "Gamma Industries": 84.29,
  },
  {
    date: "Dec 06, 2023",
    "Alpha Corp": 134.68,
    "Beta Solutions": 69.12,
    "Gamma Industries": 79.38,
  },
  {
    date: "Dec 07, 2023",
    "Alpha Corp": 152.73,
    "Beta Solutions": 73.89,
    "Gamma Industries": 81.42,
  },
  {
    date: "Dec 08, 2023",
    "Alpha Corp": 168.59,
    "Beta Solutions": 78.54,
    "Gamma Industries": 75.68,
  },
];

const summary = [
  {
    name: "Alpha Corp",
    tickerSymbol: "ACP",
    value: "$168.59",
    change: "+15.86",
    percentageChange: "+10.4%",
    changeType: "positive",
  },
  {
    name: "Beta Solutions",
    tickerSymbol: "BTS",
    value: "$78.54",
    change: "+4.65",
    percentageChange: "+6.3%",
    changeType: "positive",
  },
  {
    name: "Gamma Industries",
    tickerSymbol: "GMI",
    value: "$75.68",
    change: "-5.74",
    percentageChange: "-7.1%",
    changeType: "negative",
  },
];

const sanitizeName = (name: string) => {
  return name
    .replace(/\\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "_")
    .toLowerCase();
};

export default function Stats10() {
  return (
    <div className="flex items-center justify-center p-10 w-full">
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {summary.map((item) => {
          const sanitizedName = sanitizeName(item.name);
          const gradientId = `gradient-${sanitizedName}`;

          const color =
            item.changeType === "positive"
              ? "hsl(142.1 76.2% 36.3%)"
              : "hsl(0 72.2% 50.6%)";

          return (
            <Card key={item.name} className="p-0">
              <CardContent className="p-4 pb-0">
                <div>
                  <dt className="text-sm font-medium text-foreground">
                    {item.name}{" "}
                    <span className="font-normal text-muted-foreground">
                      ({item.tickerSymbol})
                    </span>
                  </dt>
                  <div className="flex items-baseline justify-between">
                    <dd
                      className={cn(
                        item.changeType === "positive"
                          ? "text-green-600 dark:text-green-500"
                          : "text-red-600 dark:text-red-500",
                        "text-lg font-semibold",
                      )}
                    >
                      {item.value}
                    </dd>
                    <dd className="flex items-center space-x-1 text-sm">
                      <span className="font-medium text-foreground">
                        {item.change}
                      </span>
                      <span
                        className={cn(
                          item.changeType === "positive"
                            ? "text-green-600 dark:text-green-500"
                            : "text-red-600 dark:text-red-500",
                        )}
                      >
                        ({item.percentageChange})
                      </span>
                    </dd>
                  </div>
                </div>

                <div className="mt-2 h-16 overflow-hidden">
                  <ChartContainer
                    className="w-full h-full"
                    config={{
                      [item.name]: {
                        label: item.name,
                        color: color,
                      },
                    }}
                  >
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient
                          id={gradientId}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={color}
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor={color}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" hide={true} />
                      <Area
                        dataKey={item.name}
                        stroke={color}
                        fill={`url(#${gradientId})`}
                        fillOpacity={0.4}
                        strokeWidth={1.5}
                        type="monotone"
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </dl>
    </div>
  );
}
