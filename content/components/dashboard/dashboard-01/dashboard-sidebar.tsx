'use client';

import {
  ArrowLeftRight,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Check,
  ChevronsUpDown,
  CircleHelp,
  CirclePlus,
  CreditCard,
  LayoutDashboard,
  Moon,
  Settings,
  Users,
} from 'lucide-react';
import { useState } from 'react';
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function DashboardSidebar() {
  const { isMobile, setOpenMobile, state } = useSidebar();
  const [workspaces, setWorkspaces] = useState([
    'Lumen Labs',
    'Halcyon Studio',
    'Pinecrest Co.',
  ]);
  const [workspace, setWorkspace] = useState('Lumen Labs');
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="px-3 pt-3.5 pb-5">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <SidebarMenuButton
                      aria-label={`${workspace}, switch workspace`}
                      className="h-11 gap-2.5 rounded-[10px] border px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0!"
                      size="lg"
                    />
                  }
                >
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-blue-500 font-semibold text-white">
                    {workspace.slice(0, 1)}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-sm group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-medium">{workspace}</span>
                    <div className="text-muted-foreground text-xs">
                      Pro workspace
                    </div>
                  </div>
                  <ChevronsUpDown className="text-muted-foreground group-data-[collapsible=icon]:hidden" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className={cn(
                    'rounded-[10px] p-1.5',
                    state === 'collapsed' && !isMobile
                      ? 'w-56'
                      : 'w-(--anchor-width)'
                  )}
                  side={state === 'collapsed' && !isMobile ? 'right' : 'bottom'}
                  sideOffset={8}
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="px-2.5 py-2">
                      Workspaces
                    </DropdownMenuLabel>
                    {workspaces.map((item, index) => (
                      <DropdownMenuItem
                        className={cn(
                          'min-h-9 gap-2.5 px-2.5',
                          item === workspace && 'bg-accent'
                        )}
                        key={item}
                        onClick={() => setWorkspace(item)}
                      >
                        <div
                          className={cn(
                            'flex size-5.5 shrink-0 items-center justify-center rounded-full text-xs',
                            index === 0
                              ? 'rounded-md bg-blue-500 text-white'
                              : 'bg-muted text-muted-foreground'
                          )}
                        >
                          {item.slice(0, 1)}
                        </div>
                        <span className="flex-1 truncate">{item}</span>
                        {item === workspace && <Check aria-label="Selected" />}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="min-h-9 gap-2.5 px-2.5"
                      onClick={() => setCreating(true)}
                    >
                      <CirclePlus />
                      Create workspace
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-3 py-0">
            <SidebarGroupLabel className="px-2.5 text-[0.6875rem] tracking-wider">
              WORKSPACE
            </SidebarGroupLabel>
            <SidebarMenu className="gap-0.5">
              {navigation.map((item) => (
                <SidebarMenuItem
                  className={
                    item.label === 'Overview'
                      ? 'before:-left-3 before:absolute before:top-2.5 before:h-4 before:w-0.75 before:rounded-r-sm before:bg-blue-500'
                      : undefined
                  }
                  key={item.label}
                >
                  <SidebarMenuButton
                    className="h-9 gap-2.5 rounded-lg px-2.5"
                    isActive={item.label === 'Overview'}
                    onClick={() => setOpenMobile(false)}
                    render={
                      <a aria-label={item.label} href={item.href}>
                        <item.icon
                          aria-hidden="true"
                          className={
                            item.label === 'Overview'
                              ? undefined
                              : 'text-muted-foreground'
                          }
                        />
                        <span className="flex-1 group-data-[collapsible=icon]:hidden">
                          {item.label}
                        </span>
                        {item.label === 'Customers' && (
                          <div className="rounded-full bg-muted px-1.5 text-[0.6875rem] text-muted-foreground tabular-nums group-data-[collapsible=icon]:hidden">
                            12
                          </div>
                        )}
                      </a>
                    }
                    tooltip={item.label}
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="gap-3 px-3 pb-5">
          <SidebarMenu className="gap-0.5">
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <SidebarMenuButton
                      aria-label="Settings"
                      className="h-9 gap-2.5 rounded-lg px-2.5"
                      tooltip="Settings"
                    />
                  }
                >
                  <Settings className="text-muted-foreground" />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Settings
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 rounded-[10px] p-1.5"
                  side="top"
                  sideOffset={8}
                >
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="min-h-9 gap-2.5 px-2.5"
                      render={
                        <a
                          aria-label="Company profile"
                          href="/settings/company"
                        >
                          <BriefcaseBusiness />
                          Company profile
                        </a>
                      }
                    />
                    <DropdownMenuItem
                      className="min-h-9 gap-2.5 px-2.5"
                      render={
                        <a aria-label="Team" href="/settings/team">
                          <Users />
                          Team
                        </a>
                      }
                    />
                    <DropdownMenuItem
                      className="min-h-9 gap-2.5 px-2.5"
                      render={
                        <a aria-label="Billing" href="/settings/billing">
                          <CreditCard />
                          Billing
                        </a>
                      }
                    />
                    <DropdownMenuItem
                      className="min-h-9 gap-2.5 px-2.5"
                      closeOnClick={false}
                      onClick={() =>
                        document.documentElement.classList.toggle('dark')
                      }
                    >
                      <Moon />
                      <span className="flex-1">Appearance</span>
                      <div className="text-muted-foreground text-xs">
                        <span className="dark:hidden">Light</span>
                        <span className="not-dark:hidden">Dark</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="h-9 gap-2.5 rounded-lg px-2.5"
                render={
                  <a
                    aria-label="Help and support"
                    href="mailto:support@lumenlabs.io"
                  >
                    <CircleHelp className="text-muted-foreground" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      Help &amp; support
                    </span>
                  </a>
                }
                tooltip="Help and support"
              />
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="flex flex-col gap-3 rounded-[10px] border border-border bg-background p-3 group-data-[collapsible=icon]:hidden dark:border-input dark:bg-input/30">
            <div className="flex items-center justify-between text-[0.8125rem]">
              <span className="font-medium">Monthly volume</span>
              <div className="text-[0.8125rem] text-muted-foreground tabular-nums">
                72%
              </div>
            </div>
            <Progress
              aria-label="Monthly volume used"
              className="[&_[data-slot=progress-indicator]]:bg-blue-500 [&_[data-slot=progress-track]]:bg-border"
              value={72.4}
            />
            <p className="text-muted-foreground text-xs tabular-nums">
              $72,400 of $100,000 used
            </p>
          </div>
        </SidebarFooter>
      </Sidebar>
      <Dialog onOpenChange={setCreating} open={creating}>
        <DialogContent>
          <form
            className="flex flex-col gap-5"
            onSubmit={(event) => {
              event.preventDefault();
              const nextName = name.trim();
              if (!nextName) {
                return;
              }
              if (!workspaces.includes(nextName)) {
                setWorkspaces([...workspaces, nextName]);
              }
              setWorkspace(nextName);
              setName('');
              setCreating(false);
            }}
          >
            <DialogHeader>
              <DialogTitle>Create workspace</DialogTitle>
              <DialogDescription>
                Add a workspace to this dashboard preview.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="workspace-name">Workspace name</FieldLabel>
                <Input
                  autoComplete="organization"
                  id="workspace-name"
                  maxLength={60}
                  name="workspace-name"
                  onChange={(event) => setName(event.target.value)}
                  pattern=".*\S.*"
                  required
                  value={name}
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <Button
                onClick={() => setCreating(false)}
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
              <Button type="submit">Create workspace</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

const navigation = [
  { label: 'Overview', href: '#overview', icon: LayoutDashboard },
  { label: 'Customers', href: '#customers', icon: Users },
  { label: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
  { label: 'Payouts', href: '/payouts', icon: CreditCard },
  { label: 'Reports', href: '#revenue', icon: ChartNoAxesCombined },
];
