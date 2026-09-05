'use client';

import {
  IconArchive,
  IconDots,
  IconHelpCircle,
  IconKeyboard,
  IconLogout,
  IconPencil,
  IconPin,
  IconPlus,
  IconSearch,
  IconSelector,
  IconSettings,
  IconShare,
  IconSunMoon,
  IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import type { Thread } from './conversation';

const groups: { key: Thread['group'] | 'pinned'; label: string }[] = [
  { key: 'pinned', label: 'Pinned' },
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'week', label: 'Previous 7 days' },
];

const item = 'h-8 gap-2.5 rounded-md px-2.5 text-[13px]';

type Props = {
  user: {
    name: string;
    email: string;
    plan: string;
    renews: string;
    avatar: string;
  };
  threads: Thread[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onSearch: () => void;
  onChange: (threads: Thread[]) => void;
};

export function ChatSidebar({
  user,
  threads,
  activeId,
  onSelect,
  onNew,
  onSearch,
  onChange,
}: Props) {
  const [renameId, setRenameId] = useState<string | null>(null);
  const [name, setName] = useState('');

  const commitRename = () => {
    if (renameId && name.trim()) {
      onChange(
        threads.map((t) =>
          t.id === renameId ? { ...t, title: name.trim() } : t
        )
      );
    }
    setRenameId(null);
  };

  return (
    <Sidebar className="border-sidebar-border" collapsible="offcanvas">
      <SidebarHeader className="gap-2 px-3 pt-3 pb-1">
        <Button className="h-8.5 rounded-lg text-[13px]" onClick={onNew}>
          <IconPlus className="size-3.5" stroke={2.2} />
          New chat
        </Button>
        <button
          className="flex h-8 items-center gap-1.75 rounded-lg border border-border pr-1.5 pl-2.5 text-[13px] text-muted-foreground transition-colors hover:bg-muted/60 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/20"
          onClick={onSearch}
          type="button"
        >
          <IconSearch className="size-3.5" stroke={2} />
          <span className="grow text-left">Search chats</span>
          <Kbd className="h-4.5 border border-border bg-sidebar px-1.25 text-[10px]">
            ⌘K
          </Kbd>
        </button>
      </SidebarHeader>

      <SidebarContent className="gap-0 px-3 pt-2">
        {groups.map(({ key, label }) => {
          const list = threads.filter((t) =>
            key === 'pinned' ? t.pinned : !t.pinned && t.group === key
          );
          if (list.length === 0) {
            return null;
          }
          return (
            <SidebarGroup className="p-0 pb-2" key={key}>
              <SidebarGroupLabel className="h-5 px-2 font-semibold text-[10px] text-muted-foreground/80 uppercase tracking-[0.08em]">
                {label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-0.5">
                  {list.map((t) => (
                    <SidebarMenuItem key={t.id}>
                      {renameId === t.id ? (
                        <input
                          aria-label="Thread name"
                          autoFocus
                          className="h-7 w-full rounded-md border border-primary bg-background px-2 text-[13px] outline-none ring-3 ring-primary/20"
                          onBlur={commitRename}
                          onChange={(e) => setName(e.target.value)}
                          onFocus={(e) => e.target.select()}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              commitRename();
                            }
                            if (e.key === 'Escape') {
                              setRenameId(null);
                            }
                          }}
                          value={name}
                        />
                      ) : (
                        <>
                          <SidebarMenuButton
                            className="h-7 px-2 text-[13px] data-active:bg-muted"
                            isActive={t.id === activeId}
                            onClick={() => onSelect(t.id)}
                          >
                            <span>{t.title}</span>
                          </SidebarMenuButton>
                          <SidebarMenuBadge
                            className={cn(
                              'top-1! right-1.5 font-mono font-normal text-[11px] text-muted-foreground/80 group-focus-within/menu-item:opacity-0 group-hover/menu-item:opacity-0 group-has-aria-expanded/menu-item:opacity-0',
                              t.pinned && 'right-1'
                            )}
                          >
                            {t.pinned ? (
                              <IconPin className="size-3" stroke={1.8} />
                            ) : (
                              t.updated
                            )}
                          </SidebarMenuBadge>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <SidebarMenuAction
                                  aria-label="Thread actions"
                                  className="top-1! text-muted-foreground"
                                  showOnHover
                                />
                              }
                            >
                              <IconDots className="size-3.5" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="start"
                              className="w-48 rounded-xl p-1.5"
                              finalFocus={false}
                              side="bottom"
                              sideOffset={6}
                            >
                              <DropdownMenuGroup className="flex flex-col gap-0.5">
                                <DropdownMenuItem
                                  className={item}
                                  onClick={() =>
                                    onChange(
                                      threads.map((x) =>
                                        x.id === t.id
                                          ? { ...x, pinned: !x.pinned }
                                          : x
                                      )
                                    )
                                  }
                                >
                                  <IconPin stroke={1.8} />
                                  {t.pinned ? 'Unpin' : 'Pin'}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className={item}
                                  onClick={() => {
                                    setRenameId(t.id);
                                    setName(t.title);
                                  }}
                                >
                                  <IconPencil stroke={1.8} />
                                  Rename
                                </DropdownMenuItem>
                                <DropdownMenuItem className={item}>
                                  <IconShare stroke={1.8} />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className={item}
                                  onClick={() =>
                                    onChange(
                                      threads.filter((x) => x.id !== t.id)
                                    )
                                  }
                                >
                                  <IconArchive stroke={1.8} />
                                  Archive
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                              <DropdownMenuSeparator className="my-1" />
                              <DropdownMenuItem
                                className={item}
                                onClick={() =>
                                  onChange(threads.filter((x) => x.id !== t.id))
                                }
                                variant="destructive"
                              >
                                <IconTrash stroke={1.8} />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border border-t p-0">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                className="flex h-14 w-full items-center gap-2.5 px-3 text-left outline-none transition-colors hover:bg-muted/60 focus-visible:bg-muted/60 aria-expanded:bg-muted/60"
                type="button"
              />
            }
          >
            <Avatar className="size-7.5 rounded-lg">
              <AvatarImage
                alt={user.name}
                className="rounded-lg"
                src={user.avatar}
              />
              <AvatarFallback className="rounded-lg">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <span className="flex min-w-0 grow flex-col gap-px">
              <span className="truncate font-medium text-[13px]">
                {user.name}
              </span>
              <span className="truncate text-[11px] text-muted-foreground">
                {user.plan} · {user.email}
              </span>
            </span>
            <IconSelector
              className="size-3.5 shrink-0 text-muted-foreground/80"
              stroke={2}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            className="w-[calc(var(--anchor-width)-1rem)] rounded-xl p-1.5"
            side="top"
            sideOffset={8}
          >
            <div className="flex items-center gap-2.5 px-2 pt-1.5 pb-2.5">
              <Avatar className="size-8 rounded-lg">
                <AvatarImage
                  alt={user.name}
                  className="rounded-lg"
                  src={user.avatar}
                />
                <AvatarFallback className="rounded-lg">
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col gap-px">
                <span className="font-medium text-[13px]">{user.name}</span>
                <span className="text-[11px] text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="flex flex-col gap-0.5 py-0.5">
              <DropdownMenuItem className={item}>
                <IconSettings stroke={1.8} />
                Settings
                <KbdGroup className="ml-auto">
                  <Kbd>⌘</Kbd>
                  <Kbd>,</Kbd>
                </KbdGroup>
              </DropdownMenuItem>
              <DropdownMenuItem className={item}>
                <IconSunMoon stroke={1.8} />
                Appearance
                <DropdownMenuShortcut className="text-xs tracking-normal">
                  System
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className={item}>
                <IconKeyboard stroke={1.8} />
                Keyboard shortcuts
                <KbdGroup className="ml-auto">
                  <Kbd>⌘</Kbd>
                  <Kbd>/</Kbd>
                </KbdGroup>
              </DropdownMenuItem>
              <DropdownMenuItem className={item}>
                <IconHelpCircle stroke={1.8} />
                Help & feedback
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <div className="my-0.5 flex items-center justify-between rounded-lg bg-muted/60 px-2.5 py-2">
              <div className="flex flex-col gap-px">
                <span className="font-medium text-xs">{user.plan} plan</span>
                <span className="text-[11px] text-muted-foreground">
                  Renews {user.renews}
                </span>
              </div>
              <Button className="h-auto p-0 text-xs" size="sm" variant="link">
                Manage
              </Button>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={item}>
              <IconLogout stroke={1.8} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
