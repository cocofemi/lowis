import React from "react";

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BusinessOnboarding } from "@/components/onboarding/business-onboarding";

export const generateMetadata = async () => {
  return {
    title: `Onboarding Page`,
    description: "Onboarding page for new users",
  };
};

export default async function Page() {
  const session = await getSession();

  if (!session) redirect("/login");
  const { user, token } = session;
  return <BusinessOnboarding id={user._id} token={token} />;
}
