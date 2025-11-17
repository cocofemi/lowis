"use client";

import {
  Home,
  NotebookPen,
  ChevronDown,
  GalleryVerticalEnd,
  Briefcase,
  BookOpenCheck,
  Users,
  Award,
  ViewIcon,
  Activity,
  UploadIcon,
} from "lucide-react";

import kervah from "../../public/KervahLogo1Logo(1).svg";

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
import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher } from "./organization-switcher";

// Menu items.
const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "New chat", url: "/dashboard/chat", icon: NotebookPen },
  // { title: "Learning", url: "/dashboard/learning", icon: BookOpenCheck },
  // { title: "Jobs", url: "#", icon: Briefcase },
];

const courseManagement = [
  { title: "Courses", url: "/dashboard/courses", icon: BookOpenCheck },
  {
    title: "Upload course",
    url: "/dashboard/courses/upload",
    icon: UploadIcon,
  },
  { title: "Groups", url: "/dashboard/courses/groups", icon: Briefcase },
  {
    title: "Course matrix",
    url: "/dashboard/courses/matrix",
    icon: Activity,
  },
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
  name: "Help plus",
  logo: GalleryVerticalEnd,
};

interface ActiveBusinessProps {
  activeBusinessId: string;
  activeBusinessName: string;
  activeBusinessRole: string;
}

export function AppSidebar({
  activeBusinessId,
  activeBusinessName,
  activeBusinessRole,
}: ActiveBusinessProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex gap-1 text-sidebar-accent-foreground">
          <div className="flex px-2 pb-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg border shadow-sm text-sidebar-primary-foreground mt-2">
              <Image
                src={kervah}
                alt="logo"
                width={500}
                height={500}
                className="object-contain scale-150 mt-1.5 ms-1"
              />
            </div>
            {!isCollapsed && (
              <OrganizationSwitcher
                activeBusinessId={activeBusinessId}
                activeBusinessName={activeBusinessName}
                activeBusinessRole={activeBusinessRole}
              />
            )}
          </div>
          {/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg border shadow-sm text-sidebar-primary-foreground">
            <Image
              src={kervah}
              alt="logo"
              width={500}
              height={500}
              className="object-contain scale-150 mt-1.5 ms-1"
            />
          </div>

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold mt-2">{company.name}</span>
            <span className="truncate text-xs">Admin</span>
          </div> */}
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Primary items (always visible) */}
              {items.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <div className="mt-5">
                <SidebarGroupLabel>Course Management</SidebarGroupLabel>
                {/* <span className="px-2 py-1 text-sidebar-foreground/50 text-xs"></span> */}
                {courseManagement.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </div>

              <div className="mt-5">
                <SidebarGroupLabel>Certificate</SidebarGroupLabel>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/certificate">
                      <Award className="h-5 w-5" />
                      <span>View Certificates</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </div>

              <div className="mt-5">
                <SidebarGroupLabel>Results</SidebarGroupLabel>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/results">
                      <ViewIcon className="h-5 w-5" />
                      <span>View results</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </div>

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
                </>
              )}
              <div className="mt-5">
                <SidebarGroupLabel> User Management</SidebarGroupLabel>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/access">
                      <Users className="h-5 w-5" />
                      <span>Members</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </div>
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
