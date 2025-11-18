"use client";
import { useState } from "react";

import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { TabsContent } from "../ui/tabs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import {
  LOGIN_USER,
  SEND_VERIFICATION_CODE,
} from "@/app/graphql/queries/user-queries/user.queries";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import {
  GenerateLoginResponnse,
  GenerateOtpResponse,
  GenerateOtpVariables,
  OrganisationInviteResponse,
} from "@/types/index.types";
import { Form } from "../ui/form";
import { ACCEPT_INVITE } from "@/app/graphql/queries/organisation-queries/organisation.queries";

const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(1, "Password is required"),
});

interface Props {
  inviteToken: string;
  organisationName: string;
  setInviteState: (state: "idle" | "loading" | "complete") => void;
}

function SignIn({ inviteToken, setInviteState }: Props) {
  const router = useRouter();
  const [loginUser, { data, loading, error }] =
    useMutation<GenerateLoginResponnse>(LOGIN_USER);
  const [generateOtpMutation] = useMutation<
    GenerateOtpResponse,
    GenerateOtpVariables
  >(SEND_VERIFICATION_CODE);

  const [acceptInvitation] =
    useMutation<OrganisationInviteResponse>(ACCEPT_INVITE);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  type LoginInput = z.infer<typeof loginSchema>;

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const onSubmit = async (data: LoginInput) => {
    setInviteState("loading");
    try {
      const res = await loginUser({ variables: data });
      const user = res?.data?.login?.user;
      const checkEmail = res?.data?.login?.user?.emailVerified;

      const formattedBusinesses = user.businesses.map((b) => ({
        id: b?.business?.id,
        name: b?.business?.name,
        role: b.role,
      }));

      await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({
          user: {
            ...user,
            businesses: formattedBusinesses,
          },
          activeBusinessId: formattedBusinesses[0]?.id,
          activeBusinessName: formattedBusinesses[0]?.name,
          activeBusinessRole: formattedBusinesses[0]?.role,
        }),
      });

      await acceptInvitation({
        variables: { token: inviteToken },
      });

      if (checkEmail === false) {
        const otpRes = await generateOtpMutation({
          variables: { email: data?.email, type: "verification" },
        });

        const otp = otpRes?.data?.generateOtp?.otp;
        await fetch("/api/send-verification", {
          method: "POST",
          body: JSON.stringify({
            email: res?.data?.login?.user?.email,
            verificationCode: otp,
            fname: res?.data?.login?.user?.fname,
          }),
        });
        setInviteState("idle");
        router.push(
          `/login/verify-email?email=${res?.data?.login?.user?.email}&fname=${res?.data?.login?.user?.fname}&invite=true`
        );
        return;
      }
      setInviteState("complete");
      return;
    } catch (err: any) {
      console.log(err);
      setError("root", { type: "server", message: err.message });
      setInviteState("idle");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TabsContent value="signin" className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">
            Already have a lowis account? Sign in to accept this invitation.
          </p>

          <div className="space-y-2">
            <Label
              htmlFor="login-email"
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

          <div className="relative space-y-2">
            <div className="flex justify-between">
              <Label
                htmlFor="login-password"
                className="text-sm font-medium text-card-foreground"
              >
                Password
              </Label>
            </div>

            <Input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className=" border-border focus:ring-primary focus:border-primary"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute inset-y-7 right-0 flex items-center pr-3 text-muted-foreground"
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
          {errors.root && (
            <p className="mt-1 text-sm text-red-500">{`Invalid email or password. Please try again.`}</p>
          )}

          <div className="flex items-center justify-end">
            <Link
              href="/auth/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            className="w-full cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In & Accept"
            )}
          </Button>
        </TabsContent>
      </form>
    </Form>
  );
}

export default SignIn;
