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
import { useMutation } from "@apollo/client/react";
import { FORGOT_PASSWORD } from "@/app/graphql/queries/user-queries/user.queries";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

interface ForgotPasswordResponse {
  forgotPassword: {
    otp: string;
    email: string;
    sucess: boolean;
  };
}

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
});

function ForgotPassword() {
  const [forgotPassword] = useMutation<ForgotPasswordResponse>(FORGOT_PASSWORD);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true);
    try {
      const res = await forgotPassword({
        variables: {
          email: data?.email,
        },
      });
      const otp = res?.data?.forgotPassword?.otp;

      await fetch("/api/send-reset-password", {
        method: "POST",
        body: JSON.stringify({
          email: data?.email,
          otpCode: otp,
        }),
      });

      router.push("/auth/forgot-password/verify?email=" + data?.email);
    } catch (err: any) {
      console.log("Error sending OTP:", err);
      setIsLoading(false);
      setError("root", { type: "server", message: err.message });
    }
  };
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
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            <div className="space-y-2 mb-4">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-card-foreground"
              >
                Email
              </Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="Enter your email"
                className=" border-border focus:ring-primary focus:border-primary"
              />
              {errors?.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors?.email?.message}
                </p>
              )}
            </div>

            {errors.root && (
              <p className="mt-1 text-sm text-red-500">{`Error sending otp. Please try again!`}</p>
            )}

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Sending otp..." : "Continue"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default ForgotPassword;
