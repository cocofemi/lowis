import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Building2, CheckCircle2, Loader2, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Invitations, OrganisationInviteResponse } from "@/types/index.types";
import { ACCEPT_INVITE } from "@/app/graphql/queries/organisation-queries/organisation.queries";
import { useMutation } from "@apollo/client/react";
import { useSession } from "@/hooks/useSession";

const mockInvitation = {
  email: "newuser@example.com",
  role: "learner",
  businessName: "Acme Corporation",
  invitedBy: "Sarah Johnson",
  expiresAt: "2025-12-31",
  isValid: true,
};

interface Props {
  token: string;
  invite: {
    validateInvite: Invitations;
  };
  setInviteState: (state: "idle" | "loading" | "complete") => void;
}

export function AuthenticatedInviteFlow({
  token,
  invite,
  setInviteState,
}: Props) {
  const router = useRouter();
  const [acceptInvitation, { loading }] =
    useMutation<OrganisationInviteResponse>(ACCEPT_INVITE);
  const { data, refetch } = useSession();

  const handleAcceptInvite = async () => {
    try {
      const session = await refetch();
      const sessionUser = session.data?.user;
      const formattedBusinesses = sessionUser.businesses.map((b) => ({
        id: b?.id,
        name: b?.name,
        role: b.role,
      }));

      await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({
          user: {
            ...sessionUser,
            businesses: formattedBusinesses,
          },
          activeBusinessId: formattedBusinesses[0]?.id,
          activeBusinessName: formattedBusinesses[0]?.name,
          activeBusinessRole: formattedBusinesses[0]?.role,
        }),
      });

      await acceptInvitation({ variables: { token: token } });

      setInviteState("complete");
      return;
    } catch (err: any) {
      console.log(err);
      setInviteState("idle");
    }
  };

  const handleDecline = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
            <UserPlus className="size-8 text-primary" />
          </div>
          <CardTitle className="text-center">Join Organization</CardTitle>
          <CardDescription className="text-center">
            You've been invited to join{" "}
            <span className="font-semibold">
              {invite?.validateInvite?.business?.name}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-4">
            <Building2 className="size-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium">
                {invite?.validateInvite?.business?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                Invited by{" "}
                {`${invite?.validateInvite?.invitedBy?.fname} ${invite?.validateInvite?.invitedBy?.lname}`}
              </p>
            </div>
            <Badge
              variant={
                invite?.validateInvite?.role === "admin"
                  ? "default"
                  : "secondary"
              }
            >
              {invite?.validateInvite?.role === "admin" ? "Admin" : "Learner"}
            </Badge>
          </div>

          <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium">Your Account</p>
            <div className="space-y-1">
              {/* <p className="text-sm text-muted-foreground">{invite?.}</p> */}
              <p className="text-sm text-muted-foreground">
                {invite?.validateInvite?.email}
              </p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            By accepting this invitation, you'll be added to{" "}
            {mockInvitation.businessName} as a {mockInvitation.role}.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full cursor-pointer"
            onClick={handleAcceptInvite}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Joining...
              </>
            ) : (
              "Accept & Join"
            )}
          </Button>
          <Button
            variant="outline"
            className="w-full bg-transparent cursor-pointer"
            onClick={handleDecline}
          >
            Decline
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
