"use client";

import { useQuery } from "@apollo/client/react";
import { GET_USER } from "@/app/graphql/queries/user-queries/user.queries";

interface SessionPayload {
  user: {
    id: string;
    fname: string;
    lname: string;
    email: string;
    avatar: string;
    bio: string;
    occupation: string;
    role:string;
    serviceType:string;
    businesses: {
      id: string;
      name: string;
      role: "admin" | "member | super-admin";
    }[];
    createdAt:string;
  };
}

export function useSession() {
  const { data, loading, error, refetch } = useQuery<SessionPayload>(GET_USER);
  return {
    data: data || null,
    loading,
    error,
    refetch,
  };
}
