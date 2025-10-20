"use client";

import {
  CheckCircle,
  FileTextIcon,
  Loader2,
  PauseIcon,
  PlayIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Task {
  id: string;
  title: string;
  assignee: string;
  status: "pending" | "in-progress" | "completed" | "blocked";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate: string;
  notes: string;
}

type TaskActionType = "start" | "pause" | "complete" | "delete" | "view";

const tasks: Task[] = [
  {
    id: "TASK-001",
    title: "Implement User Authentication",
    assignee: "Sarah Chen",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-03-25",
    notes: "OAuth 2.0 integration with Google and GitHub providers",
  },
  {
    id: "TASK-002",
    title: "Design Dashboard UI",
    assignee: "Michael Torres",
    status: "completed",
    priority: "medium",
    dueDate: "2024-03-20",
    notes: "Finalize dashboard layout with responsive grid system",
  },
  {
    id: "TASK-003",
    title: "API Performance Optimization",
    assignee: "Emma Rodriguez",
    status: "pending",
    priority: "urgent",
    dueDate: "2024-03-22",
    notes: "Reduce API response time by implementing caching strategy",
  },
  {
    id: "TASK-004",
    title: "Write Unit Tests",
    assignee: "James Wilson",
    status: "in-progress",
    priority: "medium",
    dueDate: "2024-03-28",
    notes: "Achieve 80% code coverage for authentication module",
  },
  {
    id: "TASK-005",
    title: "Database Migration",
    assignee: "Olivia Martinez",
    status: "blocked",
    priority: "high",
    dueDate: "2024-03-24",
    notes: "Waiting for infrastructure team approval before proceeding",
  },
  {
    id: "TASK-006",
    title: "Update Documentation",
    assignee: "Lucas Anderson",
    status: "pending",
    priority: "low",
    dueDate: "2024-03-30",
    notes: "Document new API endpoints and authentication flow",
  },
  {
    id: "TASK-007",
    title: "Security Audit",
    assignee: "Sophia Taylor",
    status: "completed",
    priority: "urgent",
    dueDate: "2024-03-19",
    notes:
      "Conducted comprehensive security review and vulnerability assessment",
  },
];

function getStatusBadge(status: Task["status"]) {
  switch (status) {
    case "pending":
      return (
        <Badge
          variant="outline"
          className="bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20 border-0"
        >
          Pending
        </Badge>
      );
    case "in-progress":
      return (
        <Badge
          variant="outline"
          className="bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 border-0"
        >
          In Progress
        </Badge>
      );
    case "completed":
      return (
        <Badge
          variant="outline"
          className="bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20 border-0"
        >
          Completed
        </Badge>
      );
    case "blocked":
      return (
        <Badge
          variant="outline"
          className="bg-rose-500/15 text-rose-700 hover:bg-rose-500/25 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20 border-0"
        >
          Blocked
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export default function Table02() {
  const [pendingAction, setPendingAction] = useState<{
    id: string;
    type: TaskActionType;
  } | null>(null);

  const isTaskActionPending = (action: TaskActionType, taskId: string) =>
    pendingAction?.id === taskId && pendingAction.type === action;

  const isTaskBusy = (taskId: string) => pendingAction?.id === taskId;

  const handleAction = (task: Task, actionType: TaskActionType) => {
    setPendingAction({ id: task.id, type: actionType });
    setTimeout(() => {
      setPendingAction(null);
      console.log(`Action "${actionType}" completed for task:`, task.title);
    }, 1000);
  };

  const renderTaskRow = (task: Task) => {
    const busy = isTaskBusy(task.id);
    const startPending = isTaskActionPending("start", task.id);
    const pausePending = isTaskActionPending("pause", task.id);
    const completePending = isTaskActionPending("complete", task.id);
    const deletePending = isTaskActionPending("delete", task.id);

    return (
      <TableRow key={task.id} className="hover:bg-muted/50">
        <TableCell className="h-16 px-4 font-medium">{task.title}</TableCell>
        <TableCell className="h-16 px-4 text-sm text-muted-foreground">
          {task.assignee}
        </TableCell>
        <TableCell className="h-16 px-4">
          {getStatusBadge(task.status)}
        </TableCell>

        <TableCell className="h-16 px-4 text-sm text-muted-foreground">
          {task.dueDate}
        </TableCell>
        <TableCell className="h-16 px-4 max-w-[300px] text-sm text-muted-foreground">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="block cursor-help truncate">{task.notes}</span>
              </TooltipTrigger>
              <TooltipContent className="max-w-md">{task.notes}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
        <TableCell className="h-16 px-4">
          <TooltipProvider>
            <div className="flex items-center gap-1">
              {(task.status === "pending" || task.status === "blocked") && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleAction(task, "start")}
                      disabled={busy}
                    >
                      {startPending ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <PlayIcon className="size-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Start</TooltipContent>
                </Tooltip>
              )}
              {task.status === "in-progress" && (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleAction(task, "pause")}
                        disabled={busy}
                      >
                        {pausePending ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <PauseIcon className="size-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Pause</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleAction(task, "complete")}
                        disabled={busy}
                      >
                        {completePending ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <CheckCircle className="size-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Complete</TooltipContent>
                  </Tooltip>
                </>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive hover:text-white"
                    onClick={() => handleAction(task, "delete")}
                    disabled={busy}
                  >
                    {deletePending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2Icon className="size-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleAction(task, "view")}
                    disabled={busy}
                  >
                    <FileTextIcon className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View Details</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="rounded-lg border bg-card w-[95%]">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="h-12 px-4 font-medium">Title</TableHead>
            <TableHead className="h-12 px-4 font-medium">Assignee</TableHead>
            <TableHead className="h-12 px-4 font-medium w-[120px]">
              Status
            </TableHead>

            <TableHead className="h-12 px-4 font-medium">Due Date</TableHead>
            <TableHead className="h-12 px-4 font-medium">Notes</TableHead>
            <TableHead className="h-12 px-4 font-medium w-[180px]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{tasks.map(renderTaskRow)}</TableBody>
      </Table>
    </div>
  );
}
