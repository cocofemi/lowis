"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../../public/KervahLogo1Logo.svg";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useMutation } from "@apollo/client/react";
import {
  FORGOT_PASSWORD,
  VERIFY_RESET_PASSWORD_OTP,
} from "@/app/graphql/queries/user-queries/user.queries";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useOtpTimer } from "@/hooks/use-otpTimer";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GenerateOtpResponse {
  email: string;
  otp: string;
}

function VerifyOtp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [verifyOtp] = useMutation(VERIFY_RESET_PASSWORD_OTP);
  const [generateOtp] = useMutation<GenerateOtpResponse>(FORGOT_PASSWORD);

  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  const { secondsLeft, start, extend, isExpired } = useOtpTimer(30);

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      const res = await verifyOtp({
        variables: { email: email, otp: value },
      });
      setIsLoading(false);
      console.log("Otp verified:", res?.data);

      await fetch("/api/verify-otp", {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      });

      router.push(
        `/auth/forgot-password/change-password?email=${email}&otp=${value}`
      );
    } catch (error) {
      setIsLoading(false);
      console.log("Error verifying otp:", error);
      setError("Failed to verify otp. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    try {
      extend(30);
      const otpRes = await generateOtp({
        variables: { email },
      });

      const otp = otpRes?.data?.otp;

      await fetch("/api/send-reset-password", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          otpCode: otp,
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
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium cursor-pointer"
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

export default VerifyOtp;
