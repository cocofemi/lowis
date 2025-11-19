import React from "react";

import GroupsPage from "@/components/courses/groups/groups-page";
import { getSession } from "@/lib/auth";

export const generateMetadata = async () => {
  return {
    title: `Groups`,
    description: "Create course groups",
  };
};

const session = await getSession();
const { activeBusinessId } = session;

export default async function Page() {
  return <GroupsPage organisationId={activeBusinessId} />;
}
