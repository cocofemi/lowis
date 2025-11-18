import React from "react";

import AccessPage from "@/components/access/access-page";
import { getSession } from "@/lib/auth";

export const generateMetadata = async () => {
  return {
    title: `Access`,
    description: "Manage your team members and their access levels",
  };
};

const session = await getSession();
const { activeBusinessId } = session;

export default async function Page() {
  return <AccessPage organisationId={activeBusinessId} />;
}
