import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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

interface GenerateLoginResponnse {
  login: {
    token: string;
    user: {
      fname: string;
      lname: string;
      email: string;
      emailVerified: boolean;
      businesses: [
        {
          business: {
            id: string;
            name: string;
          };

          role: string;
        },
      ];
    };
  };
}

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

const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(1, "Password is required"),
});

function Login() {
  const [loginUser] = useMutation<GenerateLoginResponnse>(LOGIN_USER);
  const [generateOtpMutation] = useMutation<
    GenerateOtpResponse,
    GenerateOtpVariables
  >(SEND_VERIFICATION_CODE);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    try {
      const res = await loginUser({ variables: data });
      const user = res?.data?.login?.user;
      const checkEmail = res?.data?.login?.user?.emailVerified;

      const formattedBusinesses = user.businesses.map((b) => ({
        id: b?.business?.id,
        name: b?.business?.name,
        role: b.role,
      }));

      console.log(user);

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

      if (checkEmail === false) {
        setIsLoading(false);
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

        router.push(
          "/login/verify-email?email=" + res?.data?.login?.user?.email
        );
        return;
      }
      router.push("/dashboard");
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
      setError("root", { type: "server", message: err.message });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-card-foreground hover:underline hover:text-gray-500"
            >
              Forgot password?
            </Link>
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

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}

export default Login;
