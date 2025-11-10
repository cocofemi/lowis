import React from "react";

import DashboardPage from "@/components/dashboard";

export const generateMetadata = async () => {
  return {
    title: `Dashboard`,
    description: "Overview of your dashboard",
  };
};

export default async function Page() {
  return <DashboardPage />;
}
