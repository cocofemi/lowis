import ManageCourseClient from "./manage-course-client";

export default async function ManageCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return <ManageCourseClient courseId={courseId} />;
}
