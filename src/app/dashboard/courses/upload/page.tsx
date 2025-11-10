import React from "react";

import UploadCoursePage from "@/components/courses/upload-courses";

export const generateMetadata = async ({ params }) => {
  return {
    title: `Upload Course`,
    description: "Upload new courses ",
  };
};

export default async function Page() {
  return <UploadCoursePage />;
}
