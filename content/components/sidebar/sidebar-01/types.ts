import * as React from "react";

export interface NavItem {
  id: string;
  title: string;
  icon: React.ElementType;
  url?: string;
  isActive?: boolean;
}

export interface FavoriteItem {
  id: string;
  title: string;
  href: string;
  color: string;
}

export interface TeamItem {
  id: string;
  title: string;
  icon: React.ElementType;
}

export interface TopicItem {
  id: string;
  title: string;
  icon: React.ElementType;
}

export interface SidebarData {
  navMain: NavItem[];
  navCollapsible: {
    favorites: FavoriteItem[];
    teams: TeamItem[];
    topics: TopicItem[];
  };
}
