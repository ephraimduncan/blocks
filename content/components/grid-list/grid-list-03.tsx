import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Bell,
  FolderKanban,
  Settings,
  UserCog,
} from "lucide-react";

const actions = [
  {
    title: "Manage Profile",
    href: "#",
    icon: UserCog,
    iconForeground: "text-blue-700",
    iconBackground: "bg-blue-50 dark:bg-blue-950/30",
    ringColorClass: "ring-blue-700/30",
  },
  {
    title: "View Projects",
    href: "#",
    icon: FolderKanban,
    iconForeground: "text-green-700",
    iconBackground: "bg-green-50 dark:bg-green-950/30",
    ringColorClass: "ring-green-700/30",
  },
  {
    title: "Check Notifications",
    href: "#",
    icon: Bell,
    iconForeground: "text-red-700",
    iconBackground: "bg-red-50 dark:bg-red-950/30",
    ringColorClass: "ring-red-700/30",
  },
  {
    title: "Access Settings",
    href: "#",
    icon: Settings,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50 dark:bg-purple-950/30",
    ringColorClass: "ring-purple-700/30",
  },
];

export default function ActionGrid() {
  return (
    <div className="overflow-hidden rounded-[1rem] bg-muted shadow-sm sm:grid sm:grid-cols-2 sm:gap-0.5 space-y-0.5 sm:space-y-0 p-0.5">
      {actions.map((action) => (
        <Card
          key={action.title}
          className={cn(
            "group relative rounded-xl border-0 bg-card p-0 focus-within:ring-2 focus-within:ring-ring focus-within:ring-inset"
          )}
        >
          <CardContent className="p-6">
            <div>
              <span
                className={cn(
                  action.iconBackground,
                  action.iconForeground,
                  "inline-flex rounded-lg p-3 ring-2 ring-inset",
                  action.ringColorClass
                )}
              >
                <action.icon aria-hidden="true" className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-base font-semibold text-foreground">
                <a href={action.href} className="focus:outline-none">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {action.title}
                </a>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Pariatur, perspiciatis?
              </p>
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-6 right-6 text-muted-foreground/50 group-hover:text-muted-foreground/60"
            >
              <ArrowUpRight className="h-6 w-6" />
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
