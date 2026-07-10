'use client';

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

type Status = 'completed' | 'pending' | 'processing' | 'cancelled';

interface Item {
  id: string;
  name: string;
  date: string;
  status: Status;
  amount: string;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  completed: {
    label: 'Completed',
    className:
      'bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  },
  pending: {
    label: 'Pending',
    className:
      'bg-amber-500/15 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  },
  processing: {
    label: 'Processing',
    className:
      'bg-blue-500/15 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  },
  cancelled: {
    label: 'Cancelled',
    className:
      'bg-rose-500/15 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
  },
};

function StatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status];
  return (
    <Badge className={cn('border-0', config.className)} variant="outline">
      {config.label}
    </Badge>
  );
}

const columns: ColumnDef<Item>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue('name')}</span>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.getValue('status')} />,
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue('amount')}</div>
    ),
  },
  {
    id: 'actions',
    cell: () => (
      <div className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button className="h-8 w-8" size="icon" variant="ghost" />}
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

const data: Item[] = [
  {
    id: '1',
    name: 'Project Alpha',
    date: 'Jan 15, 2024',
    status: 'completed',
    amount: '$2,500',
  },
  {
    id: '2',
    name: 'Website Redesign',
    date: 'Feb 3, 2024',
    status: 'processing',
    amount: '$4,200',
  },
  {
    id: '3',
    name: 'Mobile App MVP',
    date: 'Feb 18, 2024',
    status: 'pending',
    amount: '$8,750',
  },
  {
    id: '4',
    name: 'Brand Identity',
    date: 'Mar 5, 2024',
    status: 'completed',
    amount: '$1,800',
  },
  {
    id: '5',
    name: 'Marketing Campaign',
    date: 'Mar 22, 2024',
    status: 'cancelled',
    amount: '$3,400',
  },
  {
    id: '6',
    name: 'Analytics Dashboard',
    date: 'Apr 8, 2024',
    status: 'processing',
    amount: '$5,600',
  },
  {
    id: '7',
    name: 'E-commerce Platform',
    date: 'Apr 25, 2024',
    status: 'pending',
    amount: '$12,000',
  },
  {
    id: '8',
    name: 'API Integration',
    date: 'May 10, 2024',
    status: 'completed',
    amount: '$3,200',
  },
];

export default function Table05() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    state: {
      sorting,
      rowSelection,
      globalFilter,
    },
    initialState: {
      pagination: { pageSize: 5 },
    },
  });

  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

  return (
    <div className="w-full max-w-3xl space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Show</span>
          <Select
            onValueChange={(value) => table.setPageSize(Number(value))}
            value={String(table.getState().pagination.pageSize)}
          >
            <SelectTrigger className="h-8 w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-muted-foreground text-sm">entries</span>
        </div>
        <Input
          className="h-8 w-full sm:w-64"
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          value={globalFilter}
        />
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  data-state={row.getIsSelected() && 'selected'}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-pretty text-muted-foreground text-sm">
          Showing{' '}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{' '}
          to{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{' '}
          of {table.getFilteredRowModel().rows.length} entries
        </p>
        <div className="flex items-center gap-1">
          <Button
            aria-label="Previous page"
            className="h-8 w-8"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            size="icon"
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
            <Button
              aria-label={`Go to page ${page}`}
              className="h-8 w-8"
              key={page}
              onClick={() => table.setPageIndex(page - 1)}
              size="icon"
              variant={currentPage === page ? 'default' : 'outline'}
            >
              {page}
            </Button>
          ))}
          <Button
            aria-label="Next page"
            className="h-8 w-8"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            size="icon"
            variant="outline"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
