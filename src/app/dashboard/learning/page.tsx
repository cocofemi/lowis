import React from "react";

import Courses from "@/components/courses/courses";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import OrganisationCourses from "@/components/courses/organisation-courses";
import Learning from "@/components/courses/learning";

export const generateMetadata = async () => {
  return {
    title: `Learning`,
    description: "Explore available learning modules",
  };
};

export default async function Page() {
  const session = await getSession();

  const { activeBusinessRole, activeBusinessId, user } = session;
  return <Learning organisationId={activeBusinessId} userId={user?.id} />;
}
