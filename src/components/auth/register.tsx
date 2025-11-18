import { useState } from "react";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import {
  REGISTER_USER,
  SEND_VERIFICATION_CODE,
} from "@/app/graphql/queries/user-queries/user.queries";
import { EyeIcon, EyeOffIcon } from "lucide-react";

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

interface RegisterResponse {
  register: {
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
const registerSchema = z
  .object({
    fname: z.string().min(1, "First name is required"),
    lname: z.string().min(1, "Last name is required"),
    email: z.string().email({ message: "Enter a valid email address" }),
    password: z.string().min(1, "Password is required"),
    reenterPassword: z.string().min(1, "Re-enter password"),
  })
  .refine((data) => data.password === data.reenterPassword, {
    message: "Passwords do not match",
    path: ["reenterPassword"],
  });

function Register() {
  const [registerUser] = useMutation<RegisterResponse>(REGISTER_USER);
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

  type RegisterInput = z.infer<typeof registerSchema>;

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);

    try {
      const res = await registerUser({ variables: data });

      const token = res?.data?.register?.token;
      const user = res?.data?.register?.user;

      // Step 2: generate OTP
      const otpRes = await generateOtpMutation({
        variables: { email: data?.email, type: "verification" },
      });
      const otp = otpRes?.data?.generateOtp?.otp;

      await fetch("/api/send-verification", {
        method: "POST",
        body: JSON.stringify({
          email: data?.email,
          verificationCode: otp,
          fname: data?.fname,
        }),
      });

      await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({
          token,
          user: {
            ...user,
            businesses: [],
          },
          activeBusinessId: null,
          activeBusinessName: null,
          activeBusinessRole: null,
        }),
      });

      router.push("/login/verify-email?email=" + data?.email);
    } catch (err) {
      console.log(err);
      setError("root", { type: "server", message: err.message });
    }
    setIsLoading(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="fname"
            className="text-sm font-medium text-card-foreground"
          >
            First Name
          </Label>
          <Input
            {...register("fname")}
            id="fname"
            type="text"
            placeholder="Enter your first name"
            className="border-border focus:ring-primary focus:border-primary"
          />
          {errors?.fname && (
            <p className="mt-1 text-sm text-red-500">
              {errors?.fname?.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="lname"
            className="text-sm font-medium text-card-foreground"
          >
            Last Name
          </Label>
          <Input
            {...register("lname")}
            id="lname"
            type="text"
            placeholder="Enter your last name"
            className="border-border focus:ring-primary focus:border-primary"
          />
          {errors?.lname && (
            <p className="mt-1 text-sm text-red-500">
              {errors?.lname?.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
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
        {errors.root && (
          <p className="mt-1 text-sm text-red-500">{errors.root.message}</p>
        )}

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}

export default Register;
