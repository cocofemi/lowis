import React from "react";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { Breadcrumbs } from "./breadcrumbs";
import { Notifications } from "./notifications";
import SearchInput from "./search-input";
import { CommandBar } from "@/components/command-bar";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger />
        {/* <SidebarTrigger className="" /> */}
        <Separator orientation="vertical" className="h-4" />
        {/* <p className="text-bold text-black">Dashboard </p> */}
        <Breadcrumbs />
      </div>
      <div className="flex items-center gap-2 px-4">
        <div className="hidden md:flex">
          <CommandBar />
        </div>
        <Notifications />
        {/* <UserNav /> */}
      </div>
    </header>
  );
}
