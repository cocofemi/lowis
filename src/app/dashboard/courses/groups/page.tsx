import React from "react";

import GroupsPage from "@/components/courses/groups/groups-page";

export const generateMetadata = async () => {
  return {
    title: `Groups`,
    description: "Create course groups",
  };
};

export default async function Page() {
  return <GroupsPage />;
}
