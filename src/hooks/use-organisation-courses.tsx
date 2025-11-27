import { useQuery } from "@apollo/client/react";
import {
  GET_ORGANISATION,
  GET_ORGANISATION_COURSES,
} from "@/app/graphql/queries/organisation-queries/organisation.queries";
import { Course } from "@/types/index.types";

export function useOrganisationCourses(organisationId?: string) {
  const { data, loading, error, refetch } = useQuery<{
    businessCourses: Course[] | [];
  }>(GET_ORGANISATION_COURSES, {
    variables: { id: organisationId },
    skip: !organisationId, // Do not run until ID exists
    fetchPolicy: "cache-and-network", // always refresh UI
  });

  return {
    data: data ?? null,
    loading,
    error,
    organisationId,
    refetch,
  };
}
