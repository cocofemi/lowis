import { useQuery } from "@apollo/client/react";
import { GET_COURSES } from "@/app/graphql/queries/course/course.queries";
import { Course } from "@/types/index.types";


interface CourseResponse {
  courses: Course[]
}

export function useCourse() {
  const { data, loading, error, refetch } = useQuery<CourseResponse>(GET_COURSES, {
    fetchPolicy: "network-only"
  });

  return {
    data: data?.courses ?? null,
    loading,
    error,
    refetch,
  };
}