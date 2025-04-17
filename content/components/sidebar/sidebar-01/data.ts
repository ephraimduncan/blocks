import {
  Command,
  CreditCard,
  Frame,
  Home,
  LucideIcon,
  PieChart,
  Send,
  Trash2,
} from "lucide-react";

export type MenuItem = {
  title: string;
  url: string;
  count?: number;
  icon?: LucideIcon;
  color?: string;
};

export type SidebarSection = {
  title: string | null;
  items: MenuItem[];
  canAdd?: boolean;
  addLabel?: string;
};

export type SecondaryNavData = {
  title: string;
  sections: SidebarSection[];
};

export const data = {
  navPrimary: [
    {
      title: "Support",
      url: "#",
      icon: Home,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  navSecondary: {
    title: "Opportunities",
    sections: [
      {
        title: null,
        items: [
          {
            title: "All",
            icon: Command,
            count: 4,
            url: "#",
          },
          {
            title: "Archived",
            icon: Trash2,
            count: 0,
            url: "#",
          },
        ],
      },
      {
        title: "Status",
        items: [
          {
            title: "New",
            color: "bg-blue-400",
            count: 5,
            url: "#",
          },
          {
            title: "Open",
            color: "bg-green-400",
            count: 2,
            url: "#",
          },
          {
            title: "Solved",
            color: "bg-purple-400",
            count: 1,
            url: "#",
          },
        ],
        canAdd: true,
        addLabel: "Add Status",
      },
      {
        title: "Group",
        items: [
          {
            title: "Marketing",
            icon: PieChart,
            count: 3,
            url: "#",
          },
          {
            title: "Sales",
            icon: CreditCard,
            count: 1,
            url: "#",
          },
          {
            title: "Design",
            icon: Frame,
            count: 4,
            url: "#",
          },
        ],
        canAdd: true,
        addLabel: "Add Group",
      },
    ],
  } as SecondaryNavData,
};
