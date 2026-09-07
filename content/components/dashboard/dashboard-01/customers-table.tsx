'use client';

import {
  DownloadIcon,
  EllipsisIcon,
  EyeIcon,
  FunnelIcon,
  MailIcon,
  SearchIcon,
  XIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

export function CustomersTable() {
  const [query, setQuery] = useState('');
  const [selectedPlans, setSelectedPlans] = useState<readonly Plan[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<readonly Status[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [customer, setCustomer] = useState<Customer | null>(null);

  const bindSearch = (node: HTMLInputElement | null) => {
    if (!node) {
      return;
    }

    const focusSearch = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        node.focus();
      }
    };
    window.addEventListener('keydown', focusSearch);
    return () => window.removeEventListener('keydown', focusSearch);
  };

  const term = query.trim().toLocaleLowerCase();
  const filtered = customers.filter(
    (item) =>
      (!term ||
        item.name.toLocaleLowerCase().includes(term) ||
        item.email.toLocaleLowerCase().includes(term)) &&
      (!selectedPlans.length || selectedPlans.includes(item.plan)) &&
      (!selectedStatuses.length || selectedStatuses.includes(item.status))
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / 9));
  const visibleCustomers = filtered.slice((page - 1) * 9, page * 9);
  const filterCount = selectedPlans.length + selectedStatuses.length;

  const exportCustomers = () => {
    const csv = [
      ['Customer', 'Email', 'Signed up', 'Plan', 'Status'],
      ...filtered.map((item) => [
        item.name,
        item.email,
        item.signedUp,
        item.plan,
        item.status,
      ]),
    ]
      .map((row) =>
        row.map((value) => `"${value.replaceAll('"', '""')}"`).join(',')
      )
      .join('\n');
    const url = URL.createObjectURL(
      new Blob([csv], { type: 'text/csv;charset=utf-8' })
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = 'customers.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="@container/customers w-full" id="customers">
      <div className="flex @3xl/customers:flex-row flex-col @3xl/customers:items-center @3xl/customers:justify-between gap-4 p-4 sm:p-7 sm:py-6">
        <div>
          <h2 className="font-semibold text-[18px] leading-6">New customers</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Recent signups across all plans
          </p>
        </div>
        <div className="flex min-w-0 flex-1 flex-wrap items-center @3xl/customers:justify-end gap-2">
          {filterCount > 0 && (
            <fieldset
              aria-label="Active customer filters"
              className="flex flex-wrap items-center gap-2"
            >
              {selectedPlans.length > 0 && (
                <div className="flex h-9 items-center rounded-full border border-border bg-background text-[0.8125rem] dark:border-input dark:bg-input/30">
                  <div className="flex h-full items-center border-r px-3 font-medium">
                    Plan
                  </div>
                  <div className="flex h-full items-center border-r px-2 text-muted-foreground">
                    {selectedPlans.length === 1 ? 'is' : 'is any of'}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          className="h-full rounded-none px-2.5 text-[0.8125rem]"
                          variant="ghost"
                        />
                      }
                    >
                      {selectedPlans.join(', ')}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-44 rounded-[10px] p-1.5">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Plan</DropdownMenuLabel>
                        {plans.map((plan) => (
                          <DropdownMenuCheckboxItem
                            checked={selectedPlans.includes(plan)}
                            className="min-h-9 px-2.5"
                            closeOnClick={false}
                            key={plan}
                            onCheckedChange={() => {
                              setSelectedPlans((current) =>
                                current.includes(plan)
                                  ? current.filter((item) => item !== plan)
                                  : [...current, plan]
                              );
                              setPage(1);
                            }}
                          >
                            {plan}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    aria-label="Remove plan filter"
                    className="h-full w-8 rounded-none rounded-r-full border-l"
                    onClick={() => {
                      setSelectedPlans([]);
                      setPage(1);
                    }}
                    size="icon-sm"
                    type="button"
                    variant="ghost"
                  >
                    <XIcon aria-hidden="true" />
                  </Button>
                </div>
              )}
              {selectedStatuses.length > 0 && (
                <div className="flex h-9 items-center rounded-full border border-border bg-background text-[0.8125rem] dark:border-input dark:bg-input/30">
                  <div className="flex h-full items-center border-r px-3 font-medium">
                    Status
                  </div>
                  <div className="flex h-full items-center border-r px-2 text-muted-foreground">
                    {selectedStatuses.length === 1 ? 'is' : 'is any of'}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          className="h-full max-w-40 rounded-none px-2.5 text-[0.8125rem]"
                          variant="ghost"
                        />
                      }
                    >
                      <span className="truncate">
                        {selectedStatuses.join(', ')}
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 rounded-[10px] p-1.5">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Status</DropdownMenuLabel>
                        {statuses.map((status) => (
                          <DropdownMenuCheckboxItem
                            checked={selectedStatuses.includes(status)}
                            className="min-h-9 px-2.5"
                            closeOnClick={false}
                            key={status}
                            onCheckedChange={() => {
                              setSelectedStatuses((current) =>
                                current.includes(status)
                                  ? current.filter((item) => item !== status)
                                  : [...current, status]
                              );
                              setPage(1);
                            }}
                          >
                            {status}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    aria-label="Remove status filter"
                    className="h-full w-8 rounded-none rounded-r-full border-l"
                    onClick={() => {
                      setSelectedStatuses([]);
                      setPage(1);
                    }}
                    size="icon-sm"
                    type="button"
                    variant="ghost"
                  >
                    <XIcon aria-hidden="true" />
                  </Button>
                </div>
              )}
              <Button
                onClick={() => {
                  setSelectedPlans([]);
                  setSelectedStatuses([]);
                  setPage(1);
                }}
                size="sm"
                type="button"
                variant="ghost"
              >
                Clear all
              </Button>
            </fieldset>
          )}
          <label className="sr-only" htmlFor="customer-search">
            Search customers
          </label>
          <InputGroup className="h-9 @3xl/customers:w-60 w-full border-border bg-background dark:border-input">
            <InputGroupAddon>
              <InputGroupText>
                <SearchIcon aria-hidden="true" />
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              className="text-[16px] sm:text-sm"
              id="customer-search"
              name="customer-search"
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search customers"
              ref={bindSearch}
              type="search"
              value={query}
            />
            <InputGroupAddon align="inline-end">
              <kbd className="hidden rounded border bg-muted px-1.5 py-0.5 font-medium text-[10px] sm:block">
                ⌘K
              </kbd>
            </InputGroupAddon>
          </InputGroup>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    className="h-9 flex-1 sm:flex-none"
                    size="lg"
                    variant="outline"
                  />
                }
              >
                <FunnelIcon aria-hidden="true" />
                Filter{filterCount ? ` (${filterCount})` : ''}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Plan</DropdownMenuLabel>
                  {plans.map((plan) => (
                    <DropdownMenuCheckboxItem
                      checked={selectedPlans.includes(plan)}
                      key={plan}
                      onCheckedChange={() => {
                        setSelectedPlans((current) =>
                          current.includes(plan)
                            ? current.filter((item) => item !== plan)
                            : [...current, plan]
                        );
                        setPage(1);
                      }}
                    >
                      {plan}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Status</DropdownMenuLabel>
                  {statuses.map((status) => (
                    <DropdownMenuCheckboxItem
                      checked={selectedStatuses.includes(status)}
                      key={status}
                      onCheckedChange={() => {
                        setSelectedStatuses((current) =>
                          current.includes(status)
                            ? current.filter((item) => item !== status)
                            : [...current, status]
                        );
                        setPage(1);
                      }}
                    >
                      {status}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
                {filterCount > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedPlans([]);
                          setSelectedStatuses([]);
                          setPage(1);
                        }}
                      >
                        Clear filters
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              className="h-9 flex-1 sm:flex-none"
              onClick={exportCustomers}
              size="lg"
              variant="outline"
            >
              <DownloadIcon aria-hidden="true" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t">
        <Table className="min-w-245 table-fixed [&_td:first-child]:pl-4 sm:[&_td:first-child]:pl-7 [&_td:last-child]:pr-4 sm:[&_td:last-child]:pr-7 [&_th:first-child]:pl-4 sm:[&_th:first-child]:pl-7 [&_th:last-child]:pr-4 sm:[&_th:last-child]:pr-7">
          <colgroup>
            <col className="w-[27%]" />
            <col className="w-[23%]" />
            <col className="w-[18%]" />
            <col className="w-[12%]" />
            <col className="w-[calc(20%-68px)]" />
            <col className="w-17" />
          </colgroup>
          <TableHeader>
            <TableRow className="h-11 hover:bg-transparent">
              <TableHead className="px-2 text-muted-foreground text-xs">
                Customer
              </TableHead>
              <TableHead className="px-2 text-muted-foreground text-xs">
                Email
              </TableHead>
              <TableHead className="px-2 text-muted-foreground text-xs">
                Signed up
              </TableHead>
              <TableHead className="px-2 text-muted-foreground text-xs">
                Plan
              </TableHead>
              <TableHead className="px-2 text-muted-foreground text-xs">
                Status
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleCustomers.map((item) => (
              <TableRow className="h-14" key={item.email}>
                <TableCell className="px-2 py-0 font-medium text-sm">
                  {item.name}
                </TableCell>
                <TableCell className="px-2 py-0 text-muted-foreground text-sm">
                  {item.email}
                </TableCell>
                <TableCell className="px-2 py-0 text-muted-foreground text-sm">
                  {item.signedUp}
                </TableCell>
                <TableCell className="px-2 py-0 text-sm">{item.plan}</TableCell>
                <TableCell className="px-2 py-0">
                  <StatusBadge status={item.status} />
                </TableCell>
                <TableCell className="px-0 py-0 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          aria-label={`Actions for ${item.name}`}
                          size="icon-sm"
                          variant="ghost"
                        />
                      }
                    >
                      <EllipsisIcon aria-hidden="true" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-60 rounded-[10px] p-1.5"
                      sideOffset={6}
                    >
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="flex flex-col gap-1 px-2.5 py-2">
                          <div className="truncate font-medium text-foreground text-sm">
                            {item.name}
                          </div>
                          <div className="truncate font-normal text-xs">
                            {item.email}
                          </div>
                        </DropdownMenuLabel>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          className="min-h-9 gap-2.5 px-2.5"
                          onClick={() => setCustomer(item)}
                        >
                          <EyeIcon
                            aria-hidden="true"
                            className="text-muted-foreground"
                          />
                          View customer
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="min-h-9 gap-2.5 px-2.5"
                          render={
                            <a
                              aria-label={`Send email to ${item.name}`}
                              href={`mailto:${item.email}`}
                            >
                              <MailIcon
                                aria-hidden="true"
                                className="text-muted-foreground"
                              />
                              Send email
                            </a>
                          }
                        />
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {!visibleCustomers.length && (
              <TableRow className="h-28 hover:bg-transparent">
                <TableCell
                  className="text-center text-muted-foreground text-sm"
                  colSpan={6}
                >
                  No customers match your search and filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <p aria-live="polite" className="text-[13px] text-muted-foreground">
          {filtered.length
            ? `${(page - 1) * 9 + 1}–${Math.min(page * 9, filtered.length)} of ${filtered.length} customers`
            : '0 customers'}
        </p>
        <nav aria-label="Customer pages" className="flex items-center gap-1">
          <Button
            disabled={page === 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            size="sm"
            variant="outline"
          >
            Previous
          </Button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map(
            (number) => (
              <Button
                aria-current={page === number ? 'page' : undefined}
                key={number}
                onClick={() => setPage(number)}
                size="icon-sm"
                variant={page === number ? 'secondary' : 'ghost'}
              >
                {number}
              </Button>
            )
          )}
          <Button
            disabled={page === pageCount}
            onClick={() =>
              setPage((current) => Math.min(pageCount, current + 1))
            }
            size="sm"
            variant="outline"
          >
            Next
          </Button>
        </nav>
      </div>

      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            setCustomer(null);
          }
        }}
        open={customer !== null}
      >
        <DialogContent className="sm:max-w-md">
          {customer && (
            <>
              <DialogHeader>
                <DialogTitle>{customer.name}</DialogTitle>
                <DialogDescription>
                  Customer details and signup information.
                </DialogDescription>
              </DialogHeader>
              <dl className="grid grid-cols-[88px_1fr] gap-x-4 gap-y-3 text-sm">
                <dt className="text-muted-foreground">Email</dt>
                <dd className="min-w-0 break-all">{customer.email}</dd>
                <dt className="text-muted-foreground">Signed up</dt>
                <dd>{customer.signedUp}</dd>
                <dt className="text-muted-foreground">Plan</dt>
                <dd>{customer.plan}</dd>
                <dt className="text-muted-foreground">Status</dt>
                <dd>
                  <StatusBadge status={customer.status} />
                </dd>
              </dl>
              <DialogFooter>
                <Button
                  render={
                    <a
                      aria-label={`Contact ${customer.name}`}
                      href={`mailto:${customer.email}`}
                    >
                      <MailIcon aria-hidden="true" />
                      Contact customer
                    </a>
                  }
                />
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function StatusBadge({ status }: { readonly status: Status }) {
  return (
    <Badge
      className={cn(
        'h-5 gap-1.5 border-0 px-2 font-medium text-[11px]',
        statusStyles[status]
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {status}
    </Badge>
  );
}
type Plan = 'Starter' | 'Pro' | 'Team';
type Status = 'Active' | 'Pending' | 'Under review' | 'Rejected' | 'Inactive';

type Customer = {
  readonly name: string;
  readonly email: string;
  readonly signedUp: string;
  readonly plan: Plan;
  readonly status: Status;
};

const customers: readonly Customer[] = [
  {
    name: 'Priya Raman',
    email: 'priya.raman@lumenlabs.io',
    signedUp: 'Today, 9:12 AM',
    plan: 'Pro',
    status: 'Active',
  },
  {
    name: 'Daniel Okafor',
    email: 'd.okafor@fastmail.com',
    signedUp: 'Today, 8:40 AM',
    plan: 'Starter',
    status: 'Pending',
  },
  {
    name: 'Mei Lin Chen',
    email: 'meilin@outlook.com',
    signedUp: 'Yesterday, 6:05 PM',
    plan: 'Team',
    status: 'Active',
  },
  {
    name: 'Tomás Herrera',
    email: 'tomas.h@gmail.com',
    signedUp: 'Yesterday, 2:31 PM',
    plan: 'Pro',
    status: 'Under review',
  },
  {
    name: 'Aisha Bello',
    email: 'aisha.bello@proton.me',
    signedUp: '11 Nov, 4:18 PM',
    plan: 'Starter',
    status: 'Rejected',
  },
  {
    name: 'Lucas Moreau',
    email: 'l.moreau@yahoo.fr',
    signedUp: '11 Nov, 11:02 AM',
    plan: 'Team',
    status: 'Active',
  },
  {
    name: 'Hannah Weiss',
    email: 'hannah.w@gmail.com',
    signedUp: '10 Nov, 7:44 PM',
    plan: 'Pro',
    status: 'Pending',
  },
  {
    name: 'Kenji Sato',
    email: 'kenji.sato@icloud.com',
    signedUp: '10 Nov, 3:15 PM',
    plan: 'Starter',
    status: 'Inactive',
  },
  {
    name: 'Olivia Brooks',
    email: 'olivia@brooks.studio',
    signedUp: '9 Nov, 10:27 AM',
    plan: 'Team',
    status: 'Active',
  },
  {
    name: 'Sofia Alvarez',
    email: 'sofia@northstar.co',
    signedUp: '9 Nov, 8:16 AM',
    plan: 'Pro',
    status: 'Active',
  },
  {
    name: 'Marcus Johnson',
    email: 'marcus.j@hey.com',
    signedUp: '8 Nov, 5:42 PM',
    plan: 'Team',
    status: 'Under review',
  },
  {
    name: 'Elena Petrova',
    email: 'elena@kinetic.design',
    signedUp: '8 Nov, 1:20 PM',
    plan: 'Starter',
    status: 'Pending',
  },
  {
    name: 'Noah Williams',
    email: 'noah@fieldnotes.app',
    signedUp: '7 Nov, 4:55 PM',
    plan: 'Pro',
    status: 'Active',
  },
  {
    name: 'Fatima Zahra',
    email: 'fatima.z@proton.me',
    signedUp: '7 Nov, 11:09 AM',
    plan: 'Team',
    status: 'Active',
  },
  {
    name: 'Ethan Park',
    email: 'ethan.park@icloud.com',
    signedUp: '6 Nov, 6:33 PM',
    plan: 'Starter',
    status: 'Inactive',
  },
  {
    name: 'Amara Nwosu',
    email: 'amara@woven.studio',
    signedUp: '6 Nov, 2:08 PM',
    plan: 'Pro',
    status: 'Rejected',
  },
  {
    name: 'Gabriel Silva',
    email: 'gabriel@orbit.dev',
    signedUp: '5 Nov, 9:47 AM',
    plan: 'Team',
    status: 'Active',
  },
  {
    name: 'Leila Haddad',
    email: 'leila.h@fastmail.com',
    signedUp: '4 Nov, 3:26 PM',
    plan: 'Starter',
    status: 'Pending',
  },
];

const plans: readonly Plan[] = ['Starter', 'Pro', 'Team'];
const statuses: readonly Status[] = [
  'Active',
  'Pending',
  'Under review',
  'Rejected',
  'Inactive',
];

const statusStyles: Record<Status, string> = {
  Active: 'bg-[#DCFCE7] text-[#15803D] dark:bg-[#14301F] dark:text-[#4ADE80]',
  Pending: 'bg-[#FEF3C7] text-[#B45309] dark:bg-[#3D2E14] dark:text-[#FCD34D]',
  'Under review':
    'bg-[#DBEAFE] text-[#1D4ED8] dark:bg-[#1E2A44] dark:text-[#93C5FD]',
  Rejected: 'bg-[#FEE2E2] text-[#B91C1C] dark:bg-[#3A1D1D] dark:text-[#F87171]',
  Inactive: 'bg-[#F4F4F5] text-[#71717A] dark:bg-[#1F1F1F] dark:text-[#A1A1AA]',
};
