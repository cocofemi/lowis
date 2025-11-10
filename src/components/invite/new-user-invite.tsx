import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, UserPlus, Building2, Loader2 } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const mockInvitation = {
  email: "newuser@example.com",
  role: "learner",
  businessName: "Acme Corporation",
  invitedBy: "Sarah Johnson",
  expiresAt: "2025-12-31",
  isValid: true,
};

export function NewUserInviteFlow({ token }: { token: string }) {
  // const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const handleAcceptInvite = async () => {
    setIsLoading(true);
    console.log("[v0] New user accepting invitation:", {
      token,
      ...formData,
    });

    // TODO: Implement API call to create account and add to business
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setAccepted(true);
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    console.log("[v0] Existing user signing in to accept invite:", {
      token,
      ...signInData,
    });

    // TODO: Implement API call to authenticate user, then accept invite
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setAccepted(true);
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
              <Link href="/">Go to Homepage</Link>
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
            <CardTitle>Welcome to lowis!</CardTitle>
            <CardDescription>
              Your account has been successfully created.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm text-muted-foreground">
              You can now access your courses and start learning.
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
          <CardTitle className="text-center">You're Invited!</CardTitle>
          <CardDescription className="text-center">
            Join{" "}
            <span className="font-semibold">{mockInvitation.businessName}</span>{" "}
            on lowis
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

          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Create Account</TabsTrigger>
              <TabsTrigger value="signin">Sign In</TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={mockInvitation.email}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>

              <p className="text-xs text-muted-foreground">
                By accepting this invitation, you agree to lowis's Terms of
                Service and Privacy Policy.
              </p>

              <Button
                className="w-full"
                onClick={handleAcceptInvite}
                disabled={
                  isLoading ||
                  !formData.firstName ||
                  !formData.lastName ||
                  !formData.password ||
                  formData.password !== formData.confirmPassword
                }
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account & Accept"
                )}
              </Button>
            </TabsContent>

            <TabsContent value="signin" className="space-y-4 pt-4">
              <p className="text-sm text-muted-foreground">
                Already have a lowis account? Sign in to accept this invitation.
              </p>

              <div className="space-y-2">
                <Label htmlFor="signin-email">Email Address</Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="your@email.com"
                  value={signInData.email}
                  onChange={(e) =>
                    setSignInData({ ...signInData, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  type="password"
                  placeholder="Enter your password"
                  value={signInData.password}
                  onChange={(e) =>
                    setSignInData({ ...signInData, password: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center justify-end">
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                className="w-full"
                onClick={handleSignIn}
                disabled={
                  isLoading || !signInData.email || !signInData.password
                }
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In & Accept"
                )}
              </Button>
            </TabsContent>
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
