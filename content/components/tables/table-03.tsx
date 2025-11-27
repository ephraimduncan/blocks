'use client';

import { useState } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Status = 'active' | 'pending' | 'discontinued' | 'on-hold';

interface Product {
  sku: string;
  productName: string;
  stockLevel: number;
  category: string;
  status: Status;
  unitPrice: string;
  lastRestocked: string;
}

const data: Product[] = [
  {
    sku: 'SKU-8472',
    productName: 'Wireless Mouse Pro',
    stockLevel: 245,
    category: 'Electronics',
    status: 'active',
    unitPrice: '$24.99',
    lastRestocked: 'Oct 15, 2024',
  },
  {
    sku: 'SKU-3391',
    productName: 'Ergonomic Keyboard',
    stockLevel: 89,
    category: 'Electronics',
    status: 'active',
    unitPrice: '$79.99',
    lastRestocked: 'Oct 18, 2024',
  },
  {
    sku: 'SKU-7156',
    productName: 'Office Chair Deluxe',
    stockLevel: 12,
    category: 'Furniture',
    status: 'pending',
    unitPrice: '$299.99',
    lastRestocked: 'Oct 12, 2024',
  },
  {
    sku: 'SKU-9204',
    productName: 'USB-C Hub Adapter',
    stockLevel: 456,
    category: 'Accessories',
    status: 'active',
    unitPrice: '$34.50',
    lastRestocked: 'Oct 19, 2024',
  },
  {
    sku: 'SKU-1638',
    productName: 'Standing Desk Frame',
    stockLevel: 5,
    category: 'Furniture',
    status: 'on-hold',
    unitPrice: '$449.00',
    lastRestocked: 'Oct 10, 2024',
  },
  {
    sku: 'SKU-5529',
    productName: 'Laptop Stand Aluminum',
    stockLevel: 178,
    category: 'Accessories',
    status: 'active',
    unitPrice: '$45.99',
    lastRestocked: 'Oct 17, 2024',
  },
  {
    sku: 'SKU-4817',
    productName: 'Mechanical Keyboard RGB',
    stockLevel: 0,
    category: 'Electronics',
    status: 'discontinued',
    unitPrice: '$129.99',
    lastRestocked: 'Oct 05, 2024',
  },
];

function getStatusBadge(status: Status) {
  switch (status) {
    case 'active':
      return (
        <Badge
          variant="outline"
          className="border-0 bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20"
        >
          Active
        </Badge>
      );
    case 'pending':
      return (
        <Badge
          variant="outline"
          className="border-0 bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20"
        >
          Pending
        </Badge>
      );
    case 'discontinued':
      return (
        <Badge
          variant="outline"
          className="border-0 bg-rose-500/15 text-rose-700 hover:bg-rose-500/25 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20"
        >
          Discontinued
        </Badge>
      );
    case 'on-hold':
      return (
        <Badge
          variant="outline"
          className="border-0 bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
        >
          On Hold
        </Badge>
      );
    default:
      return null;
  }
}

export default function Table03() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredData = data.filter((item) => {
    const categoryMatch =
      selectedCategory === 'all' || item.category === selectedCategory;
    return categoryMatch;
  });

  const uniqueCategories = Array.from(
    new Set(data.map((item) => item.category))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Product Inventory
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Track and manage product stock levels across all warehouse
            locations.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-b hover:bg-transparent">
              <TableHead className="h-12 px-4 font-medium">SKU</TableHead>
              <TableHead className="h-12 px-4 font-medium">
                Product Name
              </TableHead>
              <TableHead className="h-12 px-4 font-medium">Category</TableHead>
              <TableHead className="h-12 px-4 font-medium">Status</TableHead>
              <TableHead className="h-12 px-4 text-right font-medium">
                Unit Price
              </TableHead>
              <TableHead className="h-12 px-4 text-right font-medium">
                Last Restocked
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item.sku} className="hover:bg-muted/50">
                  <TableCell className="h-14 px-4 font-mono text-sm font-medium">
                    {item.sku}
                  </TableCell>
                  <TableCell className="h-14 px-4 font-medium">
                    {item.productName}
                  </TableCell>
                  <TableCell className="h-14 px-4 text-sm text-muted-foreground">
                    {item.category}
                  </TableCell>
                  <TableCell className="h-14 px-4">
                    {getStatusBadge(item.status)}
                  </TableCell>
                  <TableCell className="h-14 px-4 text-right font-mono text-sm font-semibold">
                    {item.unitPrice}
                  </TableCell>
                  <TableCell className="h-14 px-4 text-right text-sm text-muted-foreground">
                    {item.lastRestocked}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  No products found matching the selected filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
