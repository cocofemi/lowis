import { getSession } from "@/lib/auth";
import CourseViewClient from "./course-view-client";

export default async function CourseViewPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  const session = await getSession();

  const { activeBusinessRole, activeBusinessId, user } = session;

  return (
    <div className="space-y-6">
      <CourseViewClient courseId={courseId} organisationId={activeBusinessId} />
    </div>
  );
}
