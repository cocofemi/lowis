import { useQuery } from "@apollo/client/react";
import { Group } from "@/types/index.types";
import { GET_GROUPS } from "@/app/graphql/queries/groups/group-queries";



export function useGroup(organisationId?: string) {
  const { data, loading, error, refetch } = useQuery<{groupsByBusiness: Group[]}>(GET_GROUPS, {
    variables: { businessId: organisationId },
    skip: !organisationId,
    fetchPolicy: "cache-and-network", 
  });

  return {
    data: data?.groupsByBusiness ?? [],
    loading,
    error,
    organisationId,
    refetch,
  };
}
