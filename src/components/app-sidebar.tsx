"use client";

import {
  Calendar,
  Home,
  Plus,
  NotebookPen,
  Inbox,
  Search,
  Settings,
  ChevronDown,
  GalleryVerticalEnd,
  Briefcase,
  PenTool,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { SidebarUserNav } from "./sidebar-user-nav";

// Menu items.
const items = [
  { title: "New Chat", url: "#", icon: NotebookPen },
  { title: "Search", url: "#", icon: Search },
  { title: "Tools", url: "#", icon: PenTool },
  // { title: "Jobs", url: "#", icon: Briefcase },
];

const chats = [
  { title: "Child in distress", url: "#" },
  { title: "Missing from home", url: "#" },
  {
    title: "What must a registered person....",
    url: "#",
  },
];

export const company = {
  name: "OWIS",
  logo: GalleryVerticalEnd,
};

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex gap-1 text-sidebar-accent-foreground">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            {/* <company.logo className="size-4" /> */}
            <span className="font-semibold">L</span>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold mt-2">{company.name}</span>
            <span className="truncate text-xs">Support Worker</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Primary items (always visible) */}
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Collapsible: Older Chats */}
              {!isCollapsed && (
                <>
                  <div className="mt-5">
                    <Collapsible defaultOpen>
                      <CollapsibleTrigger
                        className="flex w-full items-center justify-between px-2 py-1 text-xs text-sidebar-foreground/50 hover:text-sidebar-foreground rounded-md
                               transition-colors [&[data-state=open]>svg]:rotate-180"
                      >
                        <span>Older Chats</span>
                        <ChevronDown className="h-4 w-4 transition-transform" />
                      </CollapsibleTrigger>

                      <CollapsibleContent className="mt-2 space-y-1">
                        {chats.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                              <a href={item.url}>
                                <span>{item.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                  <div className="mt-5">
                    <span className="px-2 py-1 text-sidebar-foreground/50 text-xs">
                      Practice
                    </span>

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="">
                          <span>Take a test</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </div>{" "}
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarUserNav />
      </SidebarFooter>
    </Sidebar>
  );
}
