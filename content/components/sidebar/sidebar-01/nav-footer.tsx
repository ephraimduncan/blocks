'use client';

import {
  BookmarkPlus,
  CircleHelp,
  LogOut,
  Plus,
  PlusCircle,
  Puzzle,
  Settings,
  User,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function NavFooter({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  return (
    <SidebarFooter className="p-4">
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger
                  nativeButton={false}
                  render={<Avatar className="h-8 w-8 rounded-full" />}
                >
                  <AvatarImage alt={user.name} src={user.avatar} />
                  <AvatarFallback className="rounded-full">CN</AvatarFallback>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="m-2">
                  <DropdownMenuItem>
                    <User aria-hidden="true" className="opacity-80" size={16} />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings
                      aria-hidden="true"
                      className="opacity-80"
                      size={16}
                    />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut
                      aria-hidden="true"
                      className="opacity-80"
                      size={16}
                    />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <TooltipProvider delay={0}>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <CircleHelp
                        aria-hidden="true"
                        className="cursor-pointer opacity-60 hover:opacity-100"
                        size={16}
                      />
                    }
                  />
                  <TooltipContent
                    className="m-2 max-w-[150px] border bg-popover px-2 py-1 text-popover-foreground"
                    side="top"
                  >
                    <div className="space-y-1 text-xs">
                      <p className="font-medium">User Information</p>
                      <p className="text-muted-foreground">
                        More details about the current user or section can be
                        displayed here.
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    aria-label="Open edit menu"
                    className="rounded-full shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    size="icon"
                    variant="ghost"
                  />
                }
              >
                <Plus aria-hidden="true" size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="pb-2">
                <DropdownMenuLabel>Add New</DropdownMenuLabel>
                <DropdownMenuItem>
                  <PlusCircle
                    aria-hidden="true"
                    className="mr-2 opacity-80"
                    size={16}
                  />
                  Add New Item
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookmarkPlus
                    aria-hidden="true"
                    className="mr-2 opacity-80"
                    size={16}
                  />
                  Add Bookmark
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Puzzle
                    aria-hidden="true"
                    className="mr-2 opacity-80"
                    size={16}
                  />
                  Add Integration
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
