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

const mockInvitation = {
  email: "newuser@example.com",
  role: "learner",
  businessName: "Acme Corporation",
  invitedBy: "Sarah Johnson",
  expiresAt: "2025-12-31",
  isValid: true,
};

export function AuthenticatedInviteFlow({
  token,
  user,
}: {
  token: string;
  user: { name: string; email: string };
}) {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAcceptInvite = async () => {
    setIsLoading(true);
    console.log("[v0] Authenticated user accepting invitation:", {
      token,
      userEmail: user.email,
    });

    // TODO: Implement API call to add user to business
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setAccepted(true);
  };

  const handleDecline = () => {
    router.push("/dashboard");
  };

  if (!mockInvitation.isValid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Invalid Invitation</CardTitle>
            <CardDescription>
              This invitation link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (accepted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle2 className="size-8 text-green-500" />
            </div>
            <CardTitle>Successfully Joined!</CardTitle>
            <CardDescription>
              You're now a member of {mockInvitation.businessName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm text-muted-foreground">
              You can now access the organization's courses and resources.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

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
            <span className="font-semibold">{mockInvitation.businessName}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-4">
            <Building2 className="size-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium">
                {mockInvitation.businessName}
              </p>
              <p className="text-xs text-muted-foreground">
                Invited by {mockInvitation.invitedBy}
              </p>
            </div>
            <Badge
              variant={
                mockInvitation.role === "admin" ? "default" : "secondary"
              }
            >
              {mockInvitation.role === "admin" ? "Admin" : "Learner"}
            </Badge>
          </div>

          <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium">Your Account</p>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            By accepting this invitation, you'll be added to{" "}
            {mockInvitation.businessName} as a {mockInvitation.role}.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full"
            onClick={handleAcceptInvite}
            disabled={isLoading}
          >
            {isLoading ? (
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
            className="w-full bg-transparent"
            onClick={handleDecline}
          >
            Decline
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
