'use client';

import { format, parseISO } from 'date-fns';
import {
  Bell,
  CalendarDays,
  ChartNoAxesCombined,
  ChevronDown,
  LockKeyhole,
  LogOut,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
  UserRound,
} from 'lucide-react';
import { type ComponentProps, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import type { DashboardCharts } from './dashboard-charts';

type ChartOptions = ComponentProps<typeof DashboardCharts>;
type DateRange = Pick<ChartOptions, 'from' | 'to'>;

const press =
  'ease-[cubic-bezier(0.23,1,0.32,1)] transition-[scale,background-color] duration-150 active:scale-[0.96] motion-reduce:active:scale-100';

export function DashboardHeader({
  period,
  range,
  onPeriodChange,
  onRangeChange,
}: {
  period: ChartOptions['period'];
  range: DateRange;
  onPeriodChange: (period: ChartOptions['period']) => void;
  onRangeChange: (range: DateRange) => void;
}) {
  const { isMobile, openMobile, state, toggleSidebar } = useSidebar();
  const sidebarOpen = isMobile ? openMobile : state === 'expanded';
  const [customRange, setCustomRange] = useState<DateRange | null>(null);
  const [unread, setUnread] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const from = parseISO(range.from);
  const to = parseISO(range.to);
  const rangeLabel =
    range.from === range.to
      ? format(to, 'd MMM')
      : `${format(from, from.getMonth() === to.getMonth() && from.getFullYear() === to.getFullYear() ? 'd' : 'd MMM')} – ${format(to, 'd MMM')}`;

  return (
    <>
      <header className="flex min-h-15 flex-wrap items-center justify-between gap-3 border-b px-4 py-3 lg:px-7 lg:py-2">
        <div className="flex items-center gap-3">
          <Button
            aria-expanded={sidebarOpen}
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            onClick={toggleSidebar}
            size="icon-sm"
            type="button"
            variant="ghost"
          >
            {sidebarOpen ? (
              <PanelLeftClose aria-hidden="true" />
            ) : (
              <PanelLeftOpen aria-hidden="true" />
            )}
          </Button>
          <h1 className="font-semibold text-lg tracking-tight">Overview</h1>
          <p className="text-[0.8125rem] text-muted-foreground max-sm:hidden">
            Updated 2 min ago
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <ToggleGroup
            aria-label="Chart period"
            className="rounded-[9px] border bg-muted/50 p-0.75"
            onValueChange={(values) => {
              const next = periods.find((item) => item.value === values[0]);
              if (!next) {
                return;
              }
              onPeriodChange(next.value);
              onRangeChange({ from: next.from, to: '2025-11-16' });
            }}
            size="sm"
            spacing={0.5}
            value={[period]}
          >
            {periods.map((item) => (
              <ToggleGroupItem
                className="h-7 min-w-0 rounded-md px-3 text-[0.8125rem]"
                key={item.value}
                value={item.value}
              >
                {item.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  aria-label={`Date range: ${rangeLabel}`}
                  className={press}
                  size="lg"
                  variant="outline"
                />
              }
            >
              <CalendarDays data-icon="inline-start" />
              {rangeLabel}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-50 rounded-[10px] p-1.5"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="sr-only">
                  Date range
                </DropdownMenuLabel>
                <DropdownMenuRadioGroup
                  onValueChange={(value) => {
                    const next = ranges.find((item) => item.from === value);
                    if (next) {
                      onRangeChange({ from: next.from, to: '2025-11-16' });
                    }
                  }}
                  value={range.to === '2025-11-16' ? range.from : ''}
                >
                  {ranges.map((item) => (
                    <DropdownMenuRadioItem
                      className="min-h-8.5 px-2.5"
                      key={item.label}
                      value={item.from}
                    >
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="min-h-8.5 px-2.5"
                  onClick={() => setCustomRange(range)}
                >
                  Custom range…
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Separator className="h-5! max-sm:hidden" orientation="vertical" />
          <Button
            aria-label="Toggle dark mode"
            className={cn(press, 'relative')}
            onClick={() => document.documentElement.classList.toggle('dark')}
            size="icon-lg"
            title="Toggle dark mode (Shift+D)"
            type="button"
            variant="ghost"
          >
            <Sun className="scale-100 opacity-100 transition-[opacity,scale] duration-150 ease-out dark:scale-50 dark:opacity-0" />
            <Moon className="absolute scale-50 opacity-0 transition-[opacity,scale] duration-150 ease-out dark:scale-100 dark:opacity-100" />
          </Button>
          <Popover onOpenChange={setNotificationsOpen} open={notificationsOpen}>
            <PopoverTrigger
              render={
                <Button
                  aria-label={
                    unread ? 'Notifications, unread updates' : 'Notifications'
                  }
                  className={cn(press, 'relative')}
                  size="icon-lg"
                  variant="ghost"
                />
              }
            >
              <Bell />
              {unread && (
                <span className="absolute top-2 right-2 size-1.5 rounded-full bg-blue-500 ring-2 ring-background" />
              )}
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-90 max-w-[calc(100vw-2rem)] gap-0 overflow-hidden rounded-xl p-0"
              sideOffset={8}
            >
              <div className="flex h-13 items-center justify-between gap-3 border-b px-4">
                <PopoverTitle>Notifications</PopoverTitle>
                <div className="text-muted-foreground text-xs tabular-nums">
                  {unread ? '2 unread' : 'All read'}
                </div>
                <PopoverDescription className="sr-only">
                  Recent workspace activity.
                </PopoverDescription>
              </div>
              <Button
                className="h-auto w-full items-start justify-start gap-3 whitespace-normal rounded-none p-4 text-left font-normal"
                onClick={() => setNotificationsOpen(false)}
                render={
                  <a href="#revenue">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background">
                      <ChartNoAxesCombined
                        aria-hidden="true"
                        className="size-4 text-muted-foreground"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="font-medium">Weekly report</span>
                        <time className="shrink-0 text-muted-foreground text-xs">
                          2m ago
                        </time>
                      </div>
                      <p className="text-[0.8125rem] text-muted-foreground leading-5">
                        10–16 Nov · $42,910 in revenue
                      </p>
                      <p className="text-muted-foreground text-xs">
                        3,482 charges processed
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className={
                        unread
                          ? 'mt-1.5 size-1.5 shrink-0 rounded-full bg-blue-500'
                          : 'mt-1.5 size-1.5 shrink-0'
                      }
                    />
                  </a>
                }
                variant="ghost"
              />
              <Separator />
              <Button
                className="h-auto w-full items-start justify-start gap-3 whitespace-normal rounded-none p-4 text-left font-normal"
                onClick={() => setNotificationsOpen(false)}
                render={
                  <a href="#customers">
                    <Avatar className="size-9 rounded-lg after:rounded-lg">
                      <AvatarImage
                        alt=""
                        className="rounded-lg"
                        src="https://i.pravatar.cc/96?img=47"
                      />
                      <AvatarFallback className="rounded-lg">PR</AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="font-medium">
                          Priya Raman signed up
                        </span>
                        <time className="shrink-0 text-muted-foreground text-xs">
                          18m ago
                        </time>
                      </div>
                      <p className="text-[0.8125rem] text-muted-foreground leading-5">
                        Joined Lumen Labs on the Pro plan.
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className={
                        unread
                          ? 'mt-1.5 size-1.5 shrink-0 rounded-full bg-blue-500'
                          : 'mt-1.5 size-1.5 shrink-0'
                      }
                    />
                  </a>
                }
                variant="ghost"
              />
              <div className="flex items-center justify-end border-t px-3 py-2">
                <Button
                  disabled={!unread}
                  onClick={() => setUnread(false)}
                  size="sm"
                  type="button"
                  variant="ghost"
                >
                  Mark all as read
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  aria-label="Account menu"
                  className={cn(press, 'gap-2 rounded-full pr-2.5 pl-1')}
                  size="lg"
                  variant="outline"
                />
              }
            >
              <Avatar className="size-7">
                <AvatarFallback className="bg-muted font-semibold text-[0.6875rem] text-foreground">
                  EB
                </AvatarFallback>
              </Avatar>
              <ChevronDown data-icon="inline-end" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-60 rounded-[10px] p-1.5"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="flex flex-col gap-0.5 px-2.5 py-2">
                  <div className="font-medium text-foreground text-sm">
                    Ephraim Brooks
                  </div>
                  <div className="font-normal text-[0.8125rem]">
                    ephraim@lumenlabs.io
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="min-h-8.5 gap-2.5 px-2.5"
                  render={
                    <a aria-label="Profile" href="/settings/profile">
                      <UserRound />
                      Profile
                    </a>
                  }
                />
                <DropdownMenuItem
                  className="min-h-8.5 gap-2.5 px-2.5"
                  render={
                    <a
                      aria-label="Notifications"
                      href="/settings/notifications"
                    >
                      <Bell />
                      Notifications
                    </a>
                  }
                />
                <DropdownMenuItem
                  className="min-h-8.5 gap-2.5 px-2.5"
                  render={
                    <a aria-label="Security" href="/settings/security">
                      <LockKeyhole />
                      Security
                    </a>
                  }
                />
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="min-h-8.5 gap-2.5 px-2.5"
                  render={
                    <a aria-label="Log out" href="/login">
                      <LogOut />
                      Log out
                    </a>
                  }
                  variant="destructive"
                />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            setCustomRange(null);
          }
        }}
        open={customRange !== null}
      >
        <DialogContent>
          {customRange && (
            <form
              className="flex flex-col gap-5"
              onSubmit={(event) => {
                event.preventDefault();
                if (
                  customRange.from &&
                  customRange.to &&
                  customRange.from <= customRange.to
                ) {
                  onRangeChange(customRange);
                  setCustomRange(null);
                }
              }}
            >
              <DialogHeader>
                <DialogTitle>Custom date range</DialogTitle>
                <DialogDescription>
                  Choose the dates to include in your charts.
                </DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="dashboard-from">Start date</FieldLabel>
                  <Input
                    id="dashboard-from"
                    max={customRange.to}
                    name="from"
                    onChange={(event) =>
                      setCustomRange({
                        ...customRange,
                        from: event.target.value,
                      })
                    }
                    required
                    type="date"
                    value={customRange.from}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="dashboard-to">End date</FieldLabel>
                  <Input
                    id="dashboard-to"
                    min={customRange.from}
                    name="to"
                    onChange={(event) =>
                      setCustomRange({ ...customRange, to: event.target.value })
                    }
                    required
                    type="date"
                    value={customRange.to}
                  />
                </Field>
              </FieldGroup>
              <DialogFooter>
                <Button
                  onClick={() => setCustomRange(null)}
                  type="button"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button className={press} type="submit">
                  Apply range
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

const periods = [
  { label: 'Day', value: 'day', from: '2025-11-16' },
  { label: 'Week', value: 'week', from: '2025-11-10' },
  { label: 'Month', value: 'month', from: '2025-10-18' },
  { label: 'Year', value: 'year', from: '2025-01-01' },
] as const;

const ranges = [
  { label: 'Last 7 days', from: '2025-11-10' },
  { label: 'Last 14 days', from: '2025-11-03' },
  { label: 'Last 30 days', from: '2025-10-18' },
  { label: 'This quarter', from: '2025-10-01' },
  { label: 'Year to date', from: '2025-01-01' },
];
