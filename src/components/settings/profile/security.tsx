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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { CHANGE_PASSWORD } from "@/app/graphql/queries/user-queries/user.queries";
import { useMutation } from "@apollo/client/react";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Enter old password"),
    password: z.string().min(1, "Enter new password"),
    reenterPassword: z.string().min(1, "Re-enter new password"),
  })
  .refine((data) => data.password === data.reenterPassword, {
    message: "Passwords do not match",
    path: ["reenterPassword"],
  });

function Security() {
  const router = useRouter();
  const [changePassword] = useMutation(CHANGE_PASSWORD);
  type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const onSubmit = async (data: ChangePasswordInput) => {
    setIsLoading(true);
    try {
      await changePassword({
        variables: {
          oldPassword: data?.oldPassword,
          newPassword: data?.password,
        },
      });

      console.log("Password reset successful");

      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.log("Error resetting password:", error);
      setIsLoading(false);
      setError("root", {
        type: "server",
        message: "Failed to reset password. Please try again.",
      });
    }
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <CardContent className="space-y-6 grid w-xl">
                <div className="relative w-full">
                  <Label
                    htmlFor="oldPassword"
                    className="text-sm font-medium text-card-foreground"
                  >
                    Old Password
                  </Label>
                  <Input
                    {...register("oldPassword")}
                    id="oldPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter old password"
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
                  {errors?.oldPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors?.oldPassword?.message}
                    </p>
                  )}
                </div>
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
                    Re-enter password
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
                <p className="mt-1 ms-8 text-sm text-red-500">
                  {errors.root.message}
                </p>
              )}
              <CardFooter className="flex flex-col gap-2 w-xl">
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
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Enable 2FA</div>
              <div className="text-sm text-muted-foreground">
                Require a verification code in addition to your password
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card> */}

      {/* <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Manage your active sessions across devices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Chrome on MacOS</p>
                <p className="text-xs text-muted-foreground">
                  San Francisco, CA • Current session
                </p>
              </div>
              <Button variant="ghost" size="sm" disabled>
                Current
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Safari on iPhone</p>
                <p className="text-xs text-muted-foreground">
                  San Francisco, CA • 2 hours ago
                </p>
              </div>
              <Button variant="ghost" size="sm">
                Revoke
              </Button>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </>
  );
}

export default Security;
