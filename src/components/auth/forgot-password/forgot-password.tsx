"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import logo from "../../../../public/KervahLogo1Logo.svg";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

function ForgotPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-black">
            <Image
              src={logo}
              alt="logo"
              width={70}
              height={70}
              className="mt-1"
            />
          </div>
          <CardTitle className="text-center">Forgot password</CardTitle>
          <CardDescription className="text-center">
            Enter your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="register-email"
              className="text-sm font-medium text-card-foreground"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              className=" border-border focus:ring-primary focus:border-primary"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full"
            onClick={() => router.push("/auth/forgot-password/verify")}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Verifying email...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ForgotPassword;
