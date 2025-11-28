'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface TableRowData {
  id: string;
  name: string;
  category: string;
  value: number;
  date: string;
  children?: TableRowData[];
}

const sampleData: TableRowData[] = [
  {
    id: '001',
    name: 'Project Alpha',
    category: 'Development',
    value: 45_000,
    date: '2024-01-15',
    children: [
      {
        id: '001-01',
        name: 'Frontend Module',
        category: 'Development',
        value: 15_000,
        date: '2024-01-16',
      },
      {
        id: '001-02',
        name: 'Backend Module',
        category: 'Development',
        value: 20_000,
        date: '2024-01-21',
      },
      {
        id: '001-03',
        name: 'Testing Suite',
        category: 'Development',
        value: 10_000,
        date: '2024-01-24',
      },
    ],
  },
  {
    id: '002',
    name: 'Marketing Campaign',
    category: 'Marketing',
    value: 28_500,
    date: '2024-01-18',
    children: [
      {
        id: '002-01',
        name: 'Social Media',
        category: 'Marketing',
        value: 12_000,
        date: '2024-01-19',
      },
      {
        id: '002-02',
        name: 'Email Marketing',
        category: 'Marketing',
        value: 8500,
        date: '2024-01-22',
      },
      {
        id: '002-03',
        name: 'SEO Optimization',
        category: 'Marketing',
        value: 8000,
        date: '2024-01-23',
      },
    ],
  },
  {
    id: '003',
    name: 'Infrastructure Upgrade',
    category: 'Operations',
    value: 67_200,
    date: '2024-01-20',
    children: [
      {
        id: '003-01',
        name: 'Cloud Migration',
        category: 'Operations',
        value: 35_000,
        date: '2024-01-21',
      },
      {
        id: '003-02',
        name: 'Security Enhancement',
        category: 'Operations',
        value: 32_200,
        date: '2024-01-24',
      },
    ],
  },
  {
    id: '004',
    name: 'Customer Support',
    category: 'Service',
    value: 19_800,
    date: '2024-01-25',
  },
];

interface AccordionRowProps {
  row: TableRowData;
  defaultOpen?: boolean;
}

function AccordionRow({ row, defaultOpen = false }: AccordionRowProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const hasChildren = row.children && row.children.length > 0;

  return (
    <>
      <TableRow
        className={cn(
          'grid grid-cols-[40px_80px_180px_110px_100px_110px] bg-muted/50 hover:bg-muted/50',
          isOpen && 'border-b-0'
        )}
      >
        <TableCell className="p-0">
          <Button
            aria-label={isOpen ? 'Collapse row' : 'Expand row'}
            className={cn(
              'h-full w-full rounded-none p-3 text-muted-foreground transition-colors',
              hasChildren && 'hover:bg-transparent hover:text-foreground',
              !hasChildren && 'cursor-default opacity-30'
            )}
            disabled={!hasChildren}
            onClick={() => setIsOpen(!isOpen)}
            size="icon"
            variant="ghost"
          >
            {hasChildren ? (
              isOpen ? (
                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
              ) : (
                <ChevronRight className="h-4 w-4 transition-transform duration-200" />
              )
            ) : (
              <div className="h-4 w-4" />
            )}
          </Button>
        </TableCell>
        <TableCell className="p-3 font-medium font-mono text-muted-foreground text-sm">
          {row.id}
        </TableCell>
        <TableCell className="p-3 font-medium text-sm">{row.name}</TableCell>
        <TableCell className="p-3 text-muted-foreground text-sm">
          {row.category}
        </TableCell>
        <TableCell className="p-3 text-right font-mono font-semibold text-sm">
          ${row.value.toLocaleString()}
        </TableCell>
        <TableCell className="p-3 text-muted-foreground text-sm">
          {row.date}
        </TableCell>
      </TableRow>

      {hasChildren && (
        <TableRow className="grid grid-cols-[40px_80px_180px_110px_100px_110px] border-b-0 hover:bg-transparent">
          <TableCell className="col-span-6 p-0" colSpan={6}>
            <div
              className={cn(
                'overflow-hidden transition-all duration-300 ease-in-out',
                isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className="w-full border-border border-b bg-muted/20">
                <Table>
                  <TableHeader>
                    <TableRow className="grid grid-cols-[40px_80px_180px_110px_100px_110px] border-b-0 bg-muted/30">
                      <TableHead className="flex h-7 items-center border-border border-y px-3 py-1.5" />
                      <TableHead className="flex h-7 items-center border-border border-y px-3 py-1.5 text-xs">
                        ID
                      </TableHead>
                      <TableHead className="flex h-7 items-center border-border border-y px-3 py-1.5 text-xs">
                        Name
                      </TableHead>
                      <TableHead className="flex h-7 items-center border-border border-y px-3 py-1.5 text-xs">
                        Category
                      </TableHead>
                      <TableHead className="flex h-7 items-center justify-end border-border border-y px-3 py-1.5 text-right text-xs">
                        Value
                      </TableHead>
                      <TableHead className="flex h-7 items-center border-border border-y px-3 py-1.5 text-xs">
                        Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {row.children?.map((childRow) => (
                      <TableRow
                        className="grid grid-cols-[40px_80px_180px_110px_100px_110px]"
                        key={childRow.id}
                      >
                        <TableCell className="px-3 py-2" />
                        <TableCell className="px-3 py-2 font-mono text-muted-foreground text-xs">
                          {childRow.id}
                        </TableCell>
                        <TableCell className="px-3 py-2 font-medium text-xs">
                          {childRow.name}
                        </TableCell>
                        <TableCell className="px-3 py-2 text-muted-foreground text-xs">
                          {childRow.category}
                        </TableCell>
                        <TableCell className="px-3 py-2 text-right font-mono font-semibold text-xs">
                          ${childRow.value.toLocaleString()}
                        </TableCell>
                        <TableCell className="px-3 py-2 text-muted-foreground text-xs">
                          {childRow.date}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default function Table01() {
  return (
    <div className="max-w-fit overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="grid grid-cols-[40px_80px_180px_110px_100px_110px] bg-muted/50">
              <TableHead className="p-3" />
              <TableHead className="p-3 font-semibold text-foreground text-sm">
                ID
              </TableHead>
              <TableHead className="p-3 font-semibold text-foreground text-sm">
                Name
              </TableHead>
              <TableHead className="p-3 font-semibold text-foreground text-sm">
                Category
              </TableHead>
              <TableHead className="p-3 text-right font-semibold text-foreground text-sm">
                Value
              </TableHead>
              <TableHead className="p-3 font-semibold text-foreground text-sm">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.map((row, index) => (
              <AccordionRow defaultOpen={index === 0} key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
