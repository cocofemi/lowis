import React from "react";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger />
        {/* <SidebarTrigger className="" /> */}
        <Separator orientation="vertical" className="h-4" />
        <p className="text-bold text-white">Lowis </p>
      </div>
    </header>
  );
}
