import React from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BusinessInfo } from "@/components/auth/business-info";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  return <BusinessInfo />;
}
