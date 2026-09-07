'use client';
import { ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { FavoriteItem, TeamItem, TopicItem } from './types';

interface NavCollapsibleProps {
  favorites: FavoriteItem[];
  teams: TeamItem[];
  topics: TopicItem[];
}

export function NavCollapsible({
  favorites,
  teams,
  topics,
}: NavCollapsibleProps) {
  return (
    <div className="space-y-0">
      {favorites && favorites.length > 0 && (
        <Collapsible className="group/collapsible" defaultOpen>
          <SidebarGroup>
            <SidebarGroupLabel
              className="text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              render={<CollapsibleTrigger />}
            >
              Favorites
              <ChevronDown className="ml-auto transition-transform group-data-open/collapsible:rotate-180" />
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {favorites.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        render={
                          <a
                            className="flex items-center gap-3"
                            href={item.href}
                          />
                        }
                      >
                        <div className={`h-3 w-3 rounded ${item.color}`} />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      )}

      {[
        { label: 'Teams', items: teams },
        { label: 'Topics', items: topics },
      ].map(
        ({ label, items }) =>
          items &&
          items.length > 0 && (
            <Collapsible className="group/collapsible" key={label}>
              <SidebarGroup>
                <SidebarGroupLabel
                  className="text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  render={<CollapsibleTrigger />}
                >
                  {label}
                  <ChevronDown className="ml-auto transition-transform group-data-open/collapsible:rotate-180" />
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <SidebarMenuItem key={item.id}>
                            <SidebarMenuButton>
                              <Icon className="mr-2 h-4 w-4" />
                              {item.title}
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          )
      )}
    </div>
  );
}
