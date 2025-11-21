import { useQuery } from "@apollo/client/react";
import { GET_COURSE_ID } from "@/app/graphql/queries/course/course.queries";
import { Course } from "@/types/index.types";


interface CourseResponse {
  course: Course
}

export function useCourseById(id: string) {
  const { data, loading, error, refetch } = useQuery<CourseResponse>(GET_COURSE_ID, {
    variables: {id: id},
    fetchPolicy: "network-only"
  });


  return {
    data: data?.course ?? null,
    loading,
    error,
    refetch,
  };
}