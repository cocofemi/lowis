import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function InviteLoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="p-6 text-center">
        <CardHeader>
          <CardTitle>Setting up your account…</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-lg">
          Please wait while we complete your invitation.
        </CardContent>
      </Card>
    </div>
  );
}
