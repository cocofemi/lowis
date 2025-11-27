import { useQuery } from "@apollo/client/react";
import { GET_MEMBER_COURSE_PROGRESS } from "@/app/graphql/queries/members/members.queries";
import { Course, Progress } from "@/types/index.types";

export interface CourseWithProgressItem {
  course: Course;
  progress: Progress | null;
}

interface CourseWithProgressData {
  userCoursesWithProgress: CourseWithProgressItem[];
}

export function useMemberCourseProgress(organisationId?: string) {
  const { data, loading, error, refetch } = useQuery<CourseWithProgressData>(
    GET_MEMBER_COURSE_PROGRESS,
    {
      variables: { businessId: organisationId },
      skip: !organisationId,
      fetchPolicy: "cache-and-network",
    }
  );

  return {
    data: data?.userCoursesWithProgress ?? null,
    loading,
    error,
    organisationId,
    refetch,
  };
}
