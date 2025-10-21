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

interface Product {
  sku: string;
  productName: string;
  supplier: string;
  stockLevel: number;
  warehouse: string;
  category: string;
  unitPrice: string;
  lastRestocked: string;
}

const data: Product[] = [
  {
    sku: 'SKU-8472',
    productName: 'Wireless Mouse Pro',
    supplier: 'TechSupply Inc.',
    stockLevel: 245,
    warehouse: 'Dallas TX',
    category: 'Electronics',
    unitPrice: '$24.99',
    lastRestocked: '15/10/2024 09:30',
  },
  {
    sku: 'SKU-3391',
    productName: 'Ergonomic Keyboard',
    supplier: 'KeyMasters Ltd.',
    stockLevel: 89,
    warehouse: 'Seattle WA',
    category: 'Electronics',
    unitPrice: '$79.99',
    lastRestocked: '18/10/2024 14:20',
  },
  {
    sku: 'SKU-7156',
    productName: 'Office Chair Deluxe',
    supplier: 'ComfortSeating Co.',
    stockLevel: 12,
    warehouse: 'Chicago IL',
    category: 'Furniture',
    unitPrice: '$299.99',
    lastRestocked: '12/10/2024 08:15',
  },
  {
    sku: 'SKU-9204',
    productName: 'USB-C Hub Adapter',
    supplier: 'ConnectAll Corp.',
    stockLevel: 456,
    warehouse: 'Dallas TX',
    category: 'Accessories',
    unitPrice: '$34.50',
    lastRestocked: '19/10/2024 11:45',
  },
  {
    sku: 'SKU-1638',
    productName: 'Standing Desk Frame',
    supplier: 'ComfortSeating Co.',
    stockLevel: 5,
    warehouse: 'Seattle WA',
    category: 'Furniture',
    unitPrice: '$449.00',
    lastRestocked: '10/10/2024 16:00',
  },
  {
    sku: 'SKU-5529',
    productName: 'Laptop Stand Aluminum',
    supplier: 'TechSupply Inc.',
    stockLevel: 178,
    warehouse: 'Austin TX',
    category: 'Accessories',
    unitPrice: '$45.99',
    lastRestocked: '17/10/2024 10:30',
  },
  {
    sku: 'SKU-4817',
    productName: 'Mechanical Keyboard RGB',
    supplier: 'KeyMasters Ltd.',
    stockLevel: 0,
    warehouse: 'Chicago IL',
    category: 'Electronics',
    unitPrice: '$129.99',
    lastRestocked: '05/10/2024 13:20',
  },
];

function getStockLevelBadge(stockLevel: number) {
  if (stockLevel === 0) {
    return (
      <Badge
        variant="outline"
        className="border-0 bg-rose-500/15 text-rose-700 hover:bg-rose-500/25 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20"
      >
        Out of Stock
      </Badge>
    );
  } else if (stockLevel <= 20) {
    return (
      <Badge
        variant="outline"
        className="border-0 bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20"
      >
        Low Stock
      </Badge>
    );
  } else if (stockLevel <= 100) {
    return (
      <Badge
        variant="outline"
        className="border-0 bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
      >
        In Stock
      </Badge>
    );
  } else {
    return (
      <Badge
        variant="outline"
        className="border-0 bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20"
      >
        Well Stocked
      </Badge>
    );
  }
}

export default function Table03() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('all');

  const filteredData = data.filter((item) => {
    const categoryMatch =
      selectedCategory === 'all' || item.category === selectedCategory;
    const warehouseMatch =
      selectedWarehouse === 'all' || item.warehouse === selectedWarehouse;
    return categoryMatch && warehouseMatch;
  });

  const uniqueCategories = Array.from(
    new Set(data.map((item) => item.category))
  );
  const uniqueWarehouses = Array.from(
    new Set(data.map((item) => item.warehouse))
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
          <Select
            value={selectedWarehouse}
            onValueChange={setSelectedWarehouse}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by warehouse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Warehouses</SelectItem>
              {uniqueWarehouses.map((warehouse) => (
                <SelectItem key={warehouse} value={warehouse}>
                  {warehouse}
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
              <TableHead className="h-12 px-4 font-medium">Supplier</TableHead>
              <TableHead className="h-12 px-4 font-medium">Category</TableHead>
              <TableHead className="h-12 px-4 font-medium">Warehouse</TableHead>
              <TableHead className="h-12 px-4 text-right font-medium">
                Stock Level
              </TableHead>
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
                    {item.supplier}
                  </TableCell>
                  <TableCell className="h-14 px-4 text-sm text-muted-foreground">
                    {item.category}
                  </TableCell>
                  <TableCell className="h-14 px-4 text-sm text-muted-foreground">
                    {item.warehouse}
                  </TableCell>
                  <TableCell className="h-14 px-4">
                    <div className="flex items-center justify-end">
                      {getStockLevelBadge(item.stockLevel)}
                    </div>
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
                  colSpan={8}
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
