"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { AuthenticatedInviteFlow } from "./authenticated-invite";
import { NewUserInviteFlow } from "./new-user-invite";

// Mock function to check if user is authenticated
const checkAuth = (): {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
} => {
  // TODO: Replace with actual JWT validation
  // This would check localStorage, cookies, or API for valid session
  const mockAuth = true; // Change to true to test authenticated flow

  if (mockAuth) {
    return {
      isAuthenticated: true,
      user: {
        name: "John Doe",
        email: "john@example.com",
      },
    };
  }

  return { isAuthenticated: false, user: null };
};

export default function InvitePage({ params }: { params: { token: string } }) {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    user: { name: string; email: string } | null;
  }>({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const auth = checkAuth();
    setAuthState(auth);
    setIsCheckingAuth(false);
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (authState.isAuthenticated && authState.user) {
    return (
      <AuthenticatedInviteFlow token={params.token} user={authState.user} />
    );
  }

  return <NewUserInviteFlow token={params.token} />;
}
