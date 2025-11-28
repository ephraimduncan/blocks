'use client';

import { Fragment } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface AssignedPerson {
  name: string;
  initials: string;
}

interface TaskItem {
  id: string;
  task: string;
  budget: string;
  deadline: string;
  assigned: AssignedPerson[];
  status: string;
}

interface TaskGroup {
  name: string;
  items: TaskItem[];
}

type StatusVariant = 'success' | 'warning' | 'default' | 'secondary';

const avatarColors = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-emerald-500',
  'bg-cyan-500',
  'bg-rose-500',
  'bg-indigo-500',
];

function getAvatarColor(initials: string) {
  const seed = initials
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return avatarColors[seed % avatarColors.length];
}

function AvatarStack({ people }: { people: AssignedPerson[] }) {
  return (
    <div className="flex -space-x-2">
      {people.map((person, index) => (
        <Avatar
          key={index}
          className={cn(
            'h-6 w-6 border-2 border-background text-[10px]',
            getAvatarColor(person.initials)
          )}
        >
          <AvatarFallback
            className={cn('font-medium text-white', getAvatarColor(person.initials))}
          >
            {person.initials}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

const statusStyles: Record<StatusVariant, { badge: string; dot: string }> = {
  success: {
    badge:
      'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    dot: 'bg-emerald-500',
  },
  warning: {
    badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
  default: {
    badge: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
    dot: 'bg-blue-500',
  },
  secondary: {
    badge: 'bg-muted text-muted-foreground',
    dot: 'bg-muted-foreground',
  },
};

function StatusBadge({
  status,
  variant = 'default',
}: {
  status: string;
  variant?: StatusVariant;
}) {
  const styles = statusStyles[variant];
  return (
    <Badge variant="outline" className={cn('gap-1.5 rounded-full', styles.badge)}>
      <span className={cn('size-1.5 rounded-full', styles.dot)} aria-hidden="true" />
      {status}
    </Badge>
  );
}

const data: TaskGroup[] = [
  {
    name: 'Engineering',
    items: [
      {
        id: '1',
        task: 'API Integration Overhaul',
        budget: '$32,000',
        deadline: 'Dec 15, 2024',
        assigned: [
          { name: 'Marcus Chen', initials: 'MC' },
          { name: 'Priya Sharma', initials: 'PS' },
        ],
        status: 'In Progress',
      },
      {
        id: '2',
        task: 'Database Migration',
        budget: '$18,500',
        deadline: 'Jan 20, 2025',
        assigned: [{ name: 'David Kim', initials: 'DK' }],
        status: 'Completed',
      },
      {
        id: '3',
        task: 'Mobile App Redesign',
        budget: '$55,000',
        deadline: 'Feb 28, 2025',
        assigned: [
          { name: 'Lena Rodriguez', initials: 'LR' },
          { name: 'Tom Anderson', initials: 'TA' },
          { name: 'Nina Patel', initials: 'NP' },
        ],
        status: 'Planning',
      },
    ],
  },
  {
    name: 'Marketing',
    items: [
      {
        id: '4',
        task: 'Q1 Campaign Launch',
        budget: '$24,000',
        deadline: 'Jan 5, 2025',
        assigned: [
          { name: 'Rachel Green', initials: 'RG' },
          { name: 'Chris Evans', initials: 'CE' },
        ],
        status: 'In Progress',
      },
      {
        id: '5',
        task: 'Brand Refresh Project',
        budget: '$42,000',
        deadline: 'Mar 1, 2025',
        assigned: [{ name: 'Monica Geller', initials: 'MG' }],
        status: 'Planning',
      },
    ],
  },
  {
    name: 'Operations',
    items: [
      {
        id: '6',
        task: 'Vendor Contract Review',
        budget: '$8,000',
        deadline: 'Dec 30, 2024',
        assigned: [
          { name: 'Joe Tribbiani', initials: 'JT' },
          { name: 'Phoebe Buffay', initials: 'PB' },
        ],
        status: 'Completed',
      },
      {
        id: '7',
        task: 'Office Expansion Setup',
        budget: '$120,000',
        deadline: 'Apr 15, 2025',
        assigned: [{ name: 'Ross Geller', initials: 'RG' }],
        status: 'On Hold',
      },
    ],
  },
];

function getStatusVariant(status: string): StatusVariant {
  switch (status) {
    case 'Completed':
      return 'success';
    case 'In Progress':
      return 'default';
    case 'Planning':
      return 'secondary';
    case 'On Hold':
      return 'warning';
    default:
      return 'default';
  }
}

export default function Table04() {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-48 font-medium">Task</TableHead>
            <TableHead className="font-medium">Budget</TableHead>
            <TableHead className="font-medium">Deadline</TableHead>
            <TableHead className="font-medium">Assigned</TableHead>
            <TableHead className="w-28 font-medium">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((group) => (
            <Fragment key={group.name}>
              <TableRow
                className="bg-muted/50 hover:bg-muted/50"
              >
                <TableCell colSpan={5} className="py-2 font-semibold">
                  {group.name}
                  <span className="ml-2 font-normal text-muted-foreground">
                    {group.items.length}
                  </span>
                </TableCell>
              </TableRow>
              {group.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.task}</TableCell>
                  <TableCell>{item.budget}</TableCell>
                  <TableCell>{item.deadline}</TableCell>
                  <TableCell>
                    <AvatarStack people={item.assigned} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status={item.status}
                      variant={getStatusVariant(item.status)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
