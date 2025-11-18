import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Building2 } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Invitations } from "@/types/index.types";
import CreateAccount from "./create-account";
import SignIn from "./sign-in";
import { InviteLoadingScreen } from "./invite-loading";
import { InviteSuccessScreen } from "./success-loading";

interface Props {
  token: string;
  invite: {
    validateInvite: Invitations;
  };
}

export function NewUserInviteFlow({ token, invite }: Props) {
  const [inviteState, setInviteState] = useState<
    "idle" | "loading" | "complete"
  >("idle");

  if (inviteState === "loading") {
    return <InviteLoadingScreen />;
  }

  if (inviteState === "complete") {
    return (
      <InviteSuccessScreen
        organisationName={invite?.validateInvite?.business?.name}
      />
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
            <UserPlus className="size-8 text-primary" />
          </div>
          <CardTitle className="text-center">You're Invited!</CardTitle>
          <CardDescription className="text-center">
            Join{" "}
            <span className="font-semibold">
              {invite?.validateInvite?.business?.name}
            </span>{" "}
            on kervah
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

          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Create Account</TabsTrigger>
              <TabsTrigger value="signin">Sign In</TabsTrigger>
            </TabsList>

            <CreateAccount inviteToken={token} />

            <SignIn
              inviteToken={token}
              organisationName={invite?.validateInvite?.business?.name}
              setInviteState={setInviteState}
            />
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full bg-transparent" asChild>
            <Link href="/">Decline Invitation</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
