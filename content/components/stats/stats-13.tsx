"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  used?: number;
  total?: number;
  usedLabel?: string;
  totalLabel?: string;
  segments?: {
    label: string;
    value: number;
    color: string;
  }[];
  className?: string;
}

const defaultSegments: NonNullable<Props["segments"]> = [
  { label: "Documents", value: 2400, color: "bg-blue-500" },
  { label: "Photos", value: 1800, color: "bg-emerald-500" },
  { label: "Videos", value: 3200, color: "bg-amber-500" },
  { label: "Music", value: 900, color: "bg-purple-500" },
];

export default function Stats13({
  title = "Using Storage",
  used = 8300,
  total = 15,
  usedLabel = "MB",
  totalLabel = "GB",
  segments = defaultSegments,
  className,
}: Props) {
  const totalValue = total * 1000;
  const freeValue = totalValue - used;

  return (
    <Card className={cn("w-full max-w-4xl shadow-sm", className)}>
      <CardContent className="py-0">
        <p className="mb-4 text-base text-muted-foreground">
          {title}{" "}
          <span className="font-semibold tabular-nums text-foreground">
            {used.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}{" "}
            {usedLabel}
          </span>{" "}
          of {total} {totalLabel}
        </p>

        <div className="mb-4 flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
          {segments.map((segment) => {
            const percentage = (segment.value / totalValue) * 100;
            return (
              <div
                key={segment.label}
                className={cn("h-full", segment.color)}
                style={{ width: `${percentage}%` }}
                role="progressbar"
                aria-label={segment.label}
                aria-valuenow={segment.value}
                aria-valuemin={0}
                aria-valuemax={totalValue}
              />
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          {segments.map((segment) => (
            <div key={segment.label} className="flex items-center gap-2">
              <span
                className={cn("size-3 shrink-0 rounded", segment.color)}
                aria-hidden="true"
              />
              <span className="text-sm text-muted-foreground">
                {segment.label}
              </span>
              <span className="text-sm tabular-nums text-muted-foreground">
                {Math.round(segment.value)}
                {usedLabel}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span
              className="size-3 shrink-0 rounded-sm bg-muted"
              aria-hidden="true"
            />
            <span className="text-sm text-muted-foreground">Free</span>
            <span className="text-sm tabular-nums text-muted-foreground">
              {Math.round(freeValue)}
              {usedLabel}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
