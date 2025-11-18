"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import logo from "../../../../public/KervahLogo1Logo.svg";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Form } from "@/components/ui/form";
import { RESET_PASSWORD } from "@/app/graphql/queries/user-queries/user.queries";
import { useMutation } from "@apollo/client/react";

const newPasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Enter old password"),
    password: z.string().min(1, "Password is required"),
    reenterPassword: z.string().min(1, "Re-enter password"),
  })
  .refine((data) => data.password === data.reenterPassword, {
    message: "Passwords do not match",
    path: ["reenterPassword"],
  });
function NewPassword() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const otp = searchParams.get("otp");

  const [reset] = useMutation(RESET_PASSWORD);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  type NewPasswordInput = z.infer<typeof newPasswordSchema>;

  const form = useForm<NewPasswordInput>({
    resolver: zodResolver(newPasswordSchema),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const onSubmit = async (data: NewPasswordInput) => {
    setIsLoading(true);
    try {
      const res = await reset({
        variables: {
          email,
          otp,
          newPassword: data?.reenterPassword,
        },
      });
      console.log("Password reset successful");

      await fetch("/api/reset-password", {
        method: "POST",
      });

      router.push("/login");
    } catch (error) {
      console.log("Error resetting password:", error);
      setIsLoading(false);
      setError("root", {
        type: "server",
        message: "Failed to reset password. Please try again.",
      });
    }

    setIsLoading(false);
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
          <CardTitle className="text-center">New password</CardTitle>
          <CardDescription className="text-center">
            Enter your new password to reset your password
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <CardContent className="space-y-6">
              <div className="relative w-full">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-card-foreground"
                >
                  Password
                </Label>
                <Input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className=" border-border focus:ring-primary focus:border-primary"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute inset-y-5 right-0 flex items-center pr-3 text-muted-foreground"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </Button>
                {errors?.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors?.password?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="reenterPassword"
                  className="text-sm font-medium text-card-foreground"
                >
                  Confirm password
                </Label>
                <Input
                  {...register("reenterPassword")}
                  id="reenterPassword"
                  type="password"
                  placeholder="Renter your password"
                  className=" border-border focus:ring-primary focus:border-primary"
                />
                {errors?.reenterPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors?.reenterPassword?.message}
                  </p>
                )}
              </div>
            </CardContent>
            {errors.root && (
              <p className="mt-1 text-sm text-red-500">{errors.root.message}</p>
            )}
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full cursor-pointer" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Changing password...
                  </>
                ) : (
                  "Change Password"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default NewPassword;
