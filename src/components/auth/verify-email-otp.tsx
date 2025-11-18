"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import logo from "../../../public/KervahLogo1Logo.svg";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useMutation } from "@apollo/client/react";
import { VERIFY_OTP } from "@/app/graphql/queries/user-queries/user.queries";
import { SEND_VERIFICATION_CODE } from "@/app/graphql/queries/user-queries/user.queries";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useOtpTimer } from "@/hooks/use-otpTimer";
import { useSession } from "@/hooks/useSession";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface GenerateOtpResponse {
  generateOtp: {
    email: string;
    otp: string;
  };
}

interface GenerateOtpVariables {
  email: string;
  type: string;
}

function VerifyEmailOtp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const fname = searchParams.get("fname");
  const invite = searchParams.get("invite");

  const [verifyOtp] = useMutation(VERIFY_OTP);
  const [generateOtp] = useMutation<GenerateOtpResponse, GenerateOtpVariables>(
    SEND_VERIFICATION_CODE
  );
  const { data, loading, refetch } = useSession();

  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);
  const [complete, setComplete] = useState<Boolean>(false);

  const { secondsLeft, start, extend, isExpired } = useOtpTimer(30);

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      const res = await verifyOtp({
        variables: { email: email, otp: value },
      });
      setIsLoading(false);

      await fetch("/api/send-welcome", {
        method: "POST",
        body: JSON.stringify({
          email,
          fname,
        }),
      });
      if (invite) {
        setInviteLoading(true);
        const session = await refetch();
        const sessionUser = session.data?.user;

        const formattedBusinesses =
          sessionUser?.businesses.map((b) => ({
            id: b.id,
            name: b?.name,
            role: b.role,
          })) || [];

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

        setInviteLoading(false);
        setComplete(true);
        return;
      }
      router.push("/login/onboarding");
    } catch (error) {
      setIsLoading(false);
      console.log("Error verifying otp:", error);
      setError("Failed to verify otp. Please try again.");
      setInviteLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      extend(30);
      const otpRes = await generateOtp({
        variables: { email, type: "verification" },
      });

      const otp = otpRes?.data?.generateOtp?.otp;

      await fetch("/api/send-verification", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          verificationCode: otp,
          fname: fname,
        }),
      });
    } catch (error) {
      console.log("Error getting otp:", error);
      setError("Failed to get otp. Please try again.");
    }
  };

  useEffect(() => {
    start();
  }, [start]);

  if (complete) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle2 className="size-8 text-green-500" />
            </div>
            <CardTitle>Welcome to kervah!</CardTitle>
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
              <Link href="/dashboard">
                <span>Go to Dashboard</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (inviteLoading) {
    return (
      <div className="w-full max-w-md mx-auto mt-20">
        <Card className="p-6 text-center">
          <CardHeader>
            <CardTitle className="text-xl">Setting up your account…</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-lg">
            Please wait while we complete your invite setup.
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <CardTitle className="text-center">Verify Otp</CardTitle>
          <CardDescription className="text-center">
            Enter the code sent to your email below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center items-center gap-3 rounded-lg border bg-muted/50 p-4">
            <InputOTP
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              maxLength={6}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          <Button
            onClick={handleVerifyOtp}
            variant="outline"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium cursor-pointer hover:text-white"
          >
            {isLoading ? "Verifying..." : "Verify Otp"}
          </Button>
          {!isExpired ? (
            <p className="text-gray-500 text-sm mt-3">
              Resend code in <b>{secondsLeft}s</b>
            </p>
          ) : (
            <Button
              onClick={handleResendOtp}
              disabled={!isExpired}
              className={`mt-3 font-medium ${
                isExpired
                  ? "text-white cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              Resend Code
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default VerifyEmailOtp;
