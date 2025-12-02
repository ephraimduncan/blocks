"use client";

import * as React from "react";
import { useState } from "react";
import {
  IconChevronRight,
  IconDots,
  IconArchive,
  IconMail,
  IconCircleDashed,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  actionLabel: string;
  actionHref: string;
}

interface OnboardingChecklistProps {
  title?: string;
  steps: OnboardingStep[];
  onDismiss?: () => void;
  onFeedback?: () => void;
  onStepAction?: (step: OnboardingStep) => void;
  className?: string;
}

function CircularProgress({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const progress = total > 0 ? ((total - completed) / total) * 100 : 0;
  const strokeDashoffset = 100 - progress;

  return (
    <svg
      className="-rotate-90 scale-y-[-1]"
      height="14"
      width="14"
      viewBox="0 0 14 14"
    >
      <circle
        className="stroke-muted"
        cx="7"
        cy="7"
        fill="none"
        r="6"
        strokeWidth="2"
        pathLength="100"
      />
      <circle
        className="stroke-primary"
        cx="7"
        cy="7"
        fill="none"
        r="6"
        strokeWidth="2"
        pathLength="100"
        strokeDasharray="100"
        strokeLinecap="round"
        style={{ strokeDashoffset }}
      />
    </svg>
  );
}

function StepIndicator({ completed }: { completed: boolean }) {
  if (completed) {
    return <IconCircleCheckFilled className="mt-1 size-4.5 text-primary" />;
  }
  return (
    <IconCircleDashed
      className="size-5 mt-1 stroke-muted-foreground/40"
      strokeWidth={2}
    />
  );
}

export function OnboardingChecklist({
  title = "Get the most out of your product",
  steps,
  onDismiss,
  onFeedback,
  onStepAction,
  className,
}: OnboardingChecklistProps) {
  const [openStepId, setOpenStepId] = React.useState<string | null>(() => {
    const firstIncomplete = steps.find((s) => !s.completed);
    return firstIncomplete?.id ?? steps[0]?.id ?? null;
  });

  const completedCount = steps.filter((s) => s.completed).length;
  const remainingCount = steps.length - completedCount;

  const handleStepClick = (stepId: string) => {
    setOpenStepId(openStepId === stepId ? null : stepId);
  };

  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-4 text-card-foreground shadow-xs w-xl",
        className
      )}
    >
      <div className="mb-4 mr-2 flex flex-col justify-between sm:flex-row sm:items-center">
        <h3 className="ml-2 font-semibold text-foreground">{title}</h3>
        <div className="mt-2 flex items-center justify-end sm:mt-0">
          <CircularProgress completed={remainingCount} total={steps.length} />
          <div className="ml-1.5 mr-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {remainingCount}
            </span>{" "}
            out of{" "}
            <span className="font-medium text-foreground">
              {steps.length} steps
            </span>{" "}
            left
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <IconDots className="h-4 w-4" />
                <span className="sr-only">Options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {onDismiss && (
                <DropdownMenuItem onClick={onDismiss}>
                  <IconArchive className="mr-2 h-4 w-4" />
                  Dismiss
                </DropdownMenuItem>
              )}
              {onFeedback && (
                <DropdownMenuItem onClick={onFeedback}>
                  <IconMail className="mr-2 h-4 w-4" />
                  Give feedback
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-0">
        {steps.map((step, index) => {
          const isOpen = openStepId === step.id;
          const isFirst = index === 0;
          const prevStep = steps[index - 1];
          const isPrevOpen = prevStep && openStepId === prevStep.id;

          const showBorderTop = !isFirst && !isOpen && !isPrevOpen;

          return (
            <div
              key={step.id}
              className={cn(
                "group",
                isOpen && "rounded-lg",
                showBorderTop && "border-t border-border"
              )}
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleStepClick(step.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleStepClick(step.id);
                  }
                }}
                className={cn(
                  "block w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isOpen && "rounded-lg"
                )}
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-lg transition-colors",
                    isOpen && "border border-border bg-muted"
                  )}
                >
                  <div className="relative flex items-center justify-between gap-3 py-3 pl-4 pr-2">
                    <div className="flex w-full gap-3">
                      <div className="shrink-0">
                        <StepIndicator completed={step.completed} />
                      </div>
                      <div className="mt-0.5 grow">
                        <h4
                          className={cn(
                            "font-semibold",
                            step.completed ? "text-primary" : "text-foreground"
                          )}
                        >
                          {step.title}
                        </h4>
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-200",
                            isOpen ? "h-auto opacity-100" : "h-0 opacity-0"
                          )}
                        >
                          <p className="mt-2 text-sm text-muted-foreground sm:max-w-64 md:max-w-xs">
                            {step.description}
                          </p>
                          <Button
                            size="sm"
                            className="mt-3"
                            onClick={(e) => {
                              e.stopPropagation();
                              onStepAction?.(step);
                            }}
                            asChild
                          >
                            <a href={step.actionHref}>{step.actionLabel}</a>
                          </Button>
                        </div>
                      </div>
                    </div>
                    {!isOpen && (
                      <IconChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const initialSteps: OnboardingStep[] = [
  {
    id: "document",
    title: "Send your first document",
    description:
      "Upload a PDF and send it for signature. You'll see how easy it is to get documents signed.",
    completed: true,
    actionLabel: "Upload document",
    actionHref: "#",
  },
  {
    id: "template",
    title: "Create a reusable template",
    description:
      "Save time by creating templates for documents you send frequently, like NDAs or contracts.",
    completed: false,
    actionLabel: "Create template",
    actionHref: "#",
  },
  {
    id: "team",
    title: "Invite your team",
    description:
      "Add team members to collaborate on documents and manage signing workflows together.",
    completed: false,
    actionLabel: "Invite team",
    actionHref: "#",
  },
  {
    id: "branding",
    title: "Customize your branding",
    description:
      "Add your logo and brand colors to create a professional signing experience for recipients.",
    completed: false,
    actionLabel: "Add branding",
    actionHref: "#",
  },
  {
    id: "api",
    title: "Explore the API",
    description:
      "Integrate document signing directly into your application with our developer-friendly API.",
    completed: false,
    actionLabel: "View API docs",
    actionHref: "#",
  },
  {
    id: "integrations",
    title: "Connect your tools",
    description:
      "Link Documenso with Zapier, Slack, or your CRM to automate your document workflows.",
    completed: false,
    actionLabel: "Browse integrations",
    actionHref: "#",
  },
];

export function Onboarding01() {
  const [steps, setSteps] = useState(initialSteps);
  const [dismissed, setDismissed] = useState(false);

  const handleStepAction = (step: OnboardingStep) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === step.id ? { ...s, completed: true } : s))
    );
  };

  if (dismissed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="text-center">
          <p className="text-muted-foreground">Checklist dismissed</p>
          <button
            onClick={() => setDismissed(false)}
            className="mt-2 text-sm text-primary underline"
          >
            Show again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-xl">
        <OnboardingChecklist
          title="Get started with Documenso"
          steps={steps}
          onDismiss={() => setDismissed(true)}
          onFeedback={() =>
            window.open("mailto:hello@example.com?subject=Feedback")
          }
          onStepAction={handleStepAction}
        />
      </div>
    </div>
  );
}
