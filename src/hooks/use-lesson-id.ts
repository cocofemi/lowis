import { useQuery } from "@apollo/client/react";
import {  Lesson } from "@/types/index.types";
import { GET_LESSON_ID } from "@/app/graphql/queries/lesson/lesson.queries";


interface CourseResponse {
  lesson: Lesson
}

export function useLessonById(id: string) {
  const { data, loading, error, refetch } = useQuery<CourseResponse>(GET_LESSON_ID, {
    variables: {id: id},
    fetchPolicy: "network-only"
  });
  
  return {
    data: data ?? null,
    loading,
    error,
    refetch,
  };
}