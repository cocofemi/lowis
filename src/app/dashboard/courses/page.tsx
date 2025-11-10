import React from "react";

import Courses from "@/components/courses/courses";

export const generateMetadata = async () => {
  return {
    title: `Courses`,
    description: "Explore available learning modules",
  };
};

export default async function Page() {
  return <Courses />;
}
