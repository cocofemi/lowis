import { Form } from "../ui/form";
import { Label } from "../ui/label";
import { TabsContent } from "../ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@apollo/client/react";
import {
  REGISTER_USER,
  SEND_VERIFICATION_CODE,
} from "@/app/graphql/queries/user-queries/user.queries";
import { ACCEPT_INVITE } from "@/app/graphql/queries/organisation-queries/organisation.queries";
import { Button } from "../ui/button";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import {
  GenerateOtpResponse,
  GenerateOtpVariables,
  OrganisationInviteResponse,
  RegisterResponse,
} from "@/types/index.types";
import { useRouter } from "next/navigation";

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

interface Props {
  inviteToken: string;
}

function CreateAccount({ inviteToken }: Props) {
  const router = useRouter();
  const [registerUser, { data, loading, error }] =
    useMutation<RegisterResponse>(REGISTER_USER, {});

  const [generateOtpMutation] = useMutation<
    GenerateOtpResponse,
    GenerateOtpVariables
  >(SEND_VERIFICATION_CODE);

  const [acceptInvitation] =
    useMutation<OrganisationInviteResponse>(ACCEPT_INVITE);

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

      const resInvite = await acceptInvitation({
        variables: { token: inviteToken },
      });
      router.push(
        `/login/verify-email?email=${data?.email}&fname=${data?.fname}&invite=true`
      );
    } catch (err) {
      console.log(err);
      setError("root", { type: "server", message: err.message });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TabsContent value="create" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
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
          {errors.root && (
            <p className="mt-1 text-sm text-red-500">{`There was a problem with creating your account. Please try again`}</p>
          )}

          <p className="text-xs text-muted-foreground">
            By accepting this invitation, you agree to lowis's Terms of Service
            and Privacy Policy.
          </p>

          <Button
            className="w-full cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account & Accept"
            )}
          </Button>
        </TabsContent>
      </form>
    </Form>
  );
}

export default CreateAccount;
