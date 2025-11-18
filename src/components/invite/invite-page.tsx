"use client";

import { Loader2 } from "lucide-react";
import { AuthenticatedInviteFlow } from "./authenticated-invite";
import { NewUserInviteFlow } from "./new-user-invite";
import { VALIDATE_INVITE_TOKEN } from "@/app/graphql/queries/organisation-queries/organisation.queries";
import { useQuery } from "@apollo/client/react";
import { Invitations } from "@/types/index.types";
import InviteExpiredPage from "./expired-invite";
import { useState } from "react";
import { InviteLoadingScreen } from "./invite-loading";
import { InviteSuccessScreen } from "./success-loading";

interface Props {
  session: boolean;
  token: string;
}

interface Invite {
  validateInvite: Invitations;
}

export default function InvitePage({ session, token }: Props) {
  const { data, loading, error } = useQuery<Invite>(VALIDATE_INVITE_TOKEN, {
    variables: { token: token },
    skip: !token,
    fetchPolicy: "cache-and-network", // always refresh UI
  });
  const [inviteState, setInviteState] = useState<
    "idle" | "loading" | "complete"
  >("idle");

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return <InviteExpiredPage />;
  }

  if (inviteState === "loading") {
    return <InviteLoadingScreen />;
  }

  if (inviteState === "complete") {
    return (
      <InviteSuccessScreen
        organisationName={data?.validateInvite?.business?.name}
      />
    );
  }

  if (session && data) {
    return (
      <AuthenticatedInviteFlow
        token={token}
        invite={data}
        setInviteState={setInviteState}
      />
    );
  }

  return <NewUserInviteFlow token={token} invite={data} />;
}
