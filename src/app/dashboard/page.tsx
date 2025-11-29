import React from "react";

import DashboardPage from "@/components/dashboard";
import { getSession } from "@/lib/auth";

export const generateMetadata = async () => {
  return {
    title: `Dashboard`,
    description: "Overview of your dashboard",
  };
};

export default async function Page() {
  const session = await getSession();

  const { activeBusinessId } = session;
  return <DashboardPage organisationId={activeBusinessId} />;
}
