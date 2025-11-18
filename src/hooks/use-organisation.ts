import { useQuery } from "@apollo/client/react";
import { GET_ORGANISATION } from "@/app/graphql/queries/organisation-queries/organisation.queries";


interface Business {
  business: {
    id: string;
    name: string;
    address: string;
    phone:string
    logo: string;
    serviceType:string;
    createdAt:string;
  };
}

export function useOrganisation(organisationId?: string) {
  const { data, loading, error, refetch } = useQuery<Business>(GET_ORGANISATION, {
    variables: { businessId: organisationId },
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