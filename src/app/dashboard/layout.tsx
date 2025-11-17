import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Header from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) redirect("/login");
  const {
    token,
    user,
    activeBusinessId,
    activeBusinessName,
    activeBusinessRole,
  } = session;

  return (
    <SidebarProvider>
      <AppSidebar
        activeBusinessId={activeBusinessId}
        activeBusinessName={activeBusinessName}
        activeBusinessRole={activeBusinessRole}
      />
      <SidebarInset>
        <Header />
        {/* page main content */}
        {children}
        {/* page main content ends */}
      </SidebarInset>
    </SidebarProvider>
  );
}
