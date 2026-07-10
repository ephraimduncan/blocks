'use client';

import {
  IconBrandAmongUs,
  IconCarambola,
  IconHourglassHigh,
  IconMailbox,
} from '@tabler/icons-react';
import { Archive, Flag } from 'lucide-react';
import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useMail } from './mail-context';
import { NavUser } from './nav-user';

// This is sample data
const data = {
  user: {
    name: 'ephraim',
    email: 'ephraim@blocks.so',
    avatar: '/avatar-01.png',
  },
  navMain: [
    {
      title: 'Inbox',
      url: '#',
      icon: IconMailbox,
      isActive: true,
    },
    {
      title: 'Starred',
      url: '#',
      icon: IconCarambola,
      isActive: false,
    },
    {
      title: 'Important',
      url: '#',
      icon: Flag,
      isActive: false,
    },
    {
      title: 'Scheduled',
      url: '#',
      icon: IconHourglassHigh,
      isActive: false,
    },
    {
      title: 'Archive',
      url: '#',
      icon: Archive,
      isActive: false,
    },
  ],
  labels: [
    { title: 'Personal', color: 'bg-green-400 dark:bg-green-300' },
    { title: 'Work', color: 'bg-blue-400 dark:bg-blue-300' },
    { title: 'Travel', color: 'bg-orange-400 dark:bg-orange-300' },
    { title: 'Receipts', color: 'bg-purple-400 dark:bg-purple-300' },
  ],
  mails: [
    {
      name: 'Nora Patel',
      email: 'nora@acme.co',
      subject: 'Welcome to Acme Mail',
      date: '08:15 AM',
      teaser:
        "Hi there — here's a quick tour of your new inbox.\nPin, label, and schedule messages to stay organized.",
    },
    {
      name: 'Stripe',
      email: 'no-reply@stripe.com',
      subject: 'Your payout has arrived',
      date: 'Yesterday',
      teaser:
        'A payout of $3,245.90 was sent to your bank account.\nView details in your dashboard.',
    },
    {
      name: 'GitHub',
      email: 'noreply@github.com',
      subject: 'New activity on acme/app',
      date: 'Tue',
      teaser:
        '3 pull requests need your review. CI passed on main.\nClick to open the review queue.',
    },
    {
      name: 'Ava Chen',
      email: 'ava.chen@example.com',
      subject: 'Agenda for Friday standup',
      date: 'Mon',
      teaser:
        "Let's cover onboarding, billing bugs, and Q4 goals.\nReply with anything you want to add.",
    },
    {
      name: 'Figma',
      email: 'updates@figma.com',
      subject: "What's new in Figma",
      date: 'Sep 12',
      teaser:
        'Variables, auto layout improvements, and dev mode updates.\nWatch the recap to learn more.',
    },
    {
      name: 'Linear',
      email: 'bot@linear.app',
      subject: '[ACME-432] Edit modal broken',
      date: 'Sep 11',
      teaser:
        'Issue created by Wendy. Repro steps included.\nSeverity: high, priority: P1.',
    },
    {
      name: 'Airbnb',
      email: 'booking@airbnb.com',
      subject: 'Your trip to Kyoto',
      date: 'Sep 10',
      teaser:
        'Get ready for your stay. Check-in details and local recommendations inside.',
    },
    {
      name: 'Notion',
      email: 'team@notion.so',
      subject: 'Weekly team recap',
      date: 'Sep 09',
      teaser:
        'Marketing shipped pricing page revamp. Eng closed 14 issues.\nSee full notes in the doc.',
    },
    {
      name: 'Google Calendar',
      email: 'calendar@google.com',
      subject: 'Design sync moved',
      date: 'Sep 09',
      teaser:
        "Event 'Design sync' moved to 3:30 PM. Meet link updated in the invite.",
    },
    {
      name: 'HN Daily',
      email: 'digest@ycombinator.com',
      subject: 'Top stories today',
      date: 'Sep 08',
      teaser:
        'OpenAI releases new API, SQLite 3.46, and why we left Kubernetes.\nRead the full digest.',
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const [mails, setMails] = React.useState(data.mails);
  const [query, setQuery] = React.useState('');
  const { setOpen } = useSidebar();
  const { setSelectedMail } = useMail();

  const filteredMails = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mails;
    return mails.filter((m) =>
      [m.name, m.email, m.subject, m.teaser]
        .join('\n')
        .toLowerCase()
        .includes(q)
    );
  }, [mails, query]);

  return (
    <div className="flex">
      {/* This is the first sidebar */}
      <Sidebar
        className="border-r p-2 px-1"
        collapsible="none"
        style={{ '--sidebar-width': '12rem' } as React.CSSProperties}
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="md:h-8 md:p-0"
                render={<a href="#" />}
                size="lg"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-accent-foreground">
                  <IconBrandAmongUs className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="px-2.5 md:px-2"
                      isActive={activeItem?.title === item.title}
                      onClick={() => {
                        setActiveItem(item);
                        const mail = data.mails.sort(() => Math.random() - 0.5);
                        setMails(
                          mail.slice(
                            0,
                            Math.max(5, Math.floor(Math.random() * 10) + 1)
                          )
                        );
                        setOpen(true);
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel className="px-1.5 text-xs md:px-0">
              Labels
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.labels.map((label) => (
                  <SidebarMenuItem key={label.title}>
                    <SidebarMenuButton
                      className="px-2.5 md:px-2"
                      render={<div className="flex items-center gap-3" />}
                    >
                      <div className={`h-3 w-3 rounded ${label.color}`} />
                      <span>{label.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar
        className="hidden min-w-96 flex-1 border-r md:flex"
        collapsible="none"
      >
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="font-medium text-base text-foreground">
              {activeItem?.title}
            </div>
          </div>
          <SidebarInput
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search..."
            value={query}
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0 pt-0">
            <SidebarGroupContent>
              {filteredMails.length === 0 && (
                <div className="p-4 text-muted-foreground text-sm">
                  No results
                </div>
              )}
              {filteredMails.map((mail) => (
                <a
                  className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  href="#"
                  key={mail.email}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedMail(mail);
                  }}
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{mail.name}</span>{' '}
                    <span className="ml-auto text-xs">{mail.date}</span>
                  </div>
                  <span className="font-medium">{mail.subject}</span>
                  <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                    {mail.teaser}
                  </span>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
