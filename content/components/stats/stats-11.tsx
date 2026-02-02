"use client";

import type React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Box, Edit } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  limit: string;
  percentage: number;
  status?: string;
  statusColor?: string;
  progressColor: string;
  details?: Array<{ label: string; value: string; color: string }>;
  actionLabel: string;
  actionIcon: React.ReactNode;
  warningMessage?: string;
  onActionClick?: () => void;
}

function MetricCard({
  title,
  value,
  limit,
  percentage,
  status,
  statusColor = "text-emerald-600 dark:text-emerald-400",
  progressColor,
  details,
  actionLabel,
  actionIcon,
  warningMessage,
  onActionClick,
}: MetricCardProps) {
  const renderProgressBar = () => {
    if (details && title === "Commands") {
      const writes = Number.parseInt(details[0].value.replace(/,/g, ""));
      const reads = Number.parseInt(details[1].value.replace(/,/g, ""));
      const total = writes + reads;
      const writesPercentage = (writes / total) * 100;
      const readsPercentage = (reads / total) * 100;

      return (
        <div className="relative h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="absolute left-0 h-full w-full origin-left bg-emerald-500 transition-transform duration-200 ease-out"
            style={{ transform: `scaleX(${writesPercentage / 100})` }}
          />
          <div
            className="absolute left-0 h-full w-full origin-left bg-blue-500 transition-transform duration-200 ease-out"
            style={{
              transform: `translateX(${writesPercentage}%) scaleX(${readsPercentage / 100})`,
            }}
          />
        </div>
      );
    }

    return (
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full w-full origin-left transition-transform duration-200 ease-out ${progressColor}`}
          style={{ transform: `scaleX(${Math.min(percentage, 100) / 100})` }}
        />
      </div>
    );
  };

  return (
    <Card className="relative overflow-hidden max-w-[280px]">
      <CardContent className="p-4 py-0">
        <h5 className="text-xs font-normal leading-none tracking-wide text-muted-foreground dark:text-foreground/80 uppercase">
          {title}
        </h5>

        <div className="mt-2 flex items-baseline gap-1">
          <div className="text-[1.2rem] font-medium leading-none text-foreground tabular-nums">
            {value}
          </div>
          <div className="text-xs leading-none text-muted-foreground">
            / {limit}
          </div>
        </div>

        <div className="mt-3">
          {renderProgressBar()}

          {details && (
            <div className="my-6 mb-8">
              <div className="flex flex-col gap-3">
                {details.map((detail, index) => (
                  <div
                    key={index}
                    className="flex w-full items-center text-xs leading-none text-muted-foreground dark:text-foreground/70"
                  >
                    <div
                      className={`mr-[6px] h-2 w-2 rounded-full ${detail.color}`}
                    />
                    <div className="mr-1">{detail.label}</div>
                    <div className="h-[9px] flex-1 border-b-2 border-dotted border-border" />
                    <div className="ml-1 tabular-nums">{detail.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {status && (
            <div className="pt-2">
              <div className={statusColor}>{status}</div>
            </div>
          )}

          {warningMessage && (
            <div className="pt-2">
              <div className="text-sm text-amber-700 dark:text-amber-400">
                {warningMessage}
              </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <Button
            variant="ghost"
            className="h-8 w-full rounded-none text-blue-500 gap-0 justify-start hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 bg-muted/50"
            onClick={onActionClick}
          >
            {actionIcon}
            <span className="ml-1 text-xs">{actionLabel}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function BudgetDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [budget, setBudget] = useState("150");

  const handleUpdate = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update budget</DialogTitle>
          <DialogDescription>
            When your monthly cost reaches the max budget, we send an email and
            throttle your database. You will not be charged beyond your set
            budget for this database.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="budget">Max budget per month</Label>
          <Input
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            type="number"
            placeholder="150"
          />
        </div>

        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function Stats11() {
  const [budgetDialogOpen, setBudgetDialogOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Commands"
          value="13.8M"
          limit="Unlimited"
          percentage={67}
          progressColor="bg-blue-500"
          details={[
            { label: "Writes", value: "11,276,493", color: "bg-emerald-500" },
            { label: "Reads", value: "2,548,921", color: "bg-blue-500" },
          ]}
          actionLabel="Upgrade"
          actionIcon={<Box className="h-4 w-4" />}
        />

        <MetricCard
          title="Bandwidth"
          value="141 GB"
          limit="150 GB"
          percentage={94}
          progressColor="bg-orange-500"
          warningMessage="There will be a charge for the excessive bandwidth over the limit."
          actionLabel="Upgrade"
          actionIcon={<Box className="h-4 w-4" />}
        />

        <MetricCard
          title="Storage"
          value="37 GB"
          limit="500 GB"
          percentage={7.4}
          progressColor="bg-emerald-500"
          status="It's all right."
          actionLabel="Upgrade"
          actionIcon={<Box className="h-4 w-4" />}
        />

        <MetricCard
          title="Cost"
          value="$73.42"
          limit="$150 Budget"
          percentage={48.95}
          progressColor="bg-emerald-500"
          status="It's all right."
          actionLabel="Change Budget"
          actionIcon={<Edit className="h-4 w-4" />}
          onActionClick={() => setBudgetDialogOpen(true)}
        />
      </div>

      <BudgetDialog
        open={budgetDialogOpen}
        onOpenChange={setBudgetDialogOpen}
      />
    </>
  );
}
