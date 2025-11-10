import React from "react";

import AccessPage from "@/components/access/access-page";

export const generateMetadata = async ({ params }) => {
  return {
    title: `Access`,
    description: "Manage your team members and their access levels",
  };
};

export default async function Page() {
  return <AccessPage />;
}
