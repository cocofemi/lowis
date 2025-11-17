import React from "react";
import { cookies } from "next/headers";

import NewPassword from "@/components/auth/forgot-password/new-password";
import { redirect } from "next/navigation";

export const generateMetadata = async () => {
  return {
    title: `Change password`,
    description: "Change password page",
  };
};

async function Page() {
  const cookieStore = await cookies();
  const session = cookieStore.get("verifiedReset")?.value;

  if (!session) {
    redirect("/auth/forgot-password");
  }
  return <NewPassword />;
}

export default Page;
