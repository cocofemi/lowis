import { useQuery } from "@apollo/client/react";
import {  GET_ORGANISATION_MEMBERS } from "@/app/graphql/queries/organisation-queries/organisation.queries";
import { Member, User } from "@/types/index.types";



interface BusinessMembers {
  members: Member[];
}

export function useMembers(organisationId?: string) {
  const { data, loading, error, refetch } = useQuery<{business: BusinessMembers}>(GET_ORGANISATION_MEMBERS, {
    variables: { businessId: organisationId },
    skip: !organisationId, // Do not run until ID exists
    fetchPolicy: "cache-and-network", // always refresh UI
  });
  return {
    data: data?.business ?? null,
    loading,
    error,
    organisationId,
    refetch,
  };
}