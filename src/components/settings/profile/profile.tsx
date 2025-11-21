"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/hooks/useSession";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { useMutation } from "@apollo/client/react";
import { UPDATE_PROFILE } from "@/app/graphql/queries/user-queries/user.queries";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const profileSchema = z.object({
  fname: z.string().min(1, "First name is required"),
  lname: z.string().min(1, "Last name is required"),
  email: z.string().email().optional(),
  bio: z
    .string()
    .nullable()
    .transform((v) => (v === "" ? undefined : v))
    .optional(),
  occupation: z
    .string()
    .nullable()
    .transform((v) => (v === "" ? undefined : v))
    .optional(),
  serviceType: z
    .string()
    .nullable()
    .transform((v) => (v === "" ? undefined : v))
    .optional(),
  avatar: z
    .instanceof(File)
    .optional()
    .nullable()
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/gif"].includes(file.type),
      "Only JPG, PNG or GIF files are allowed"
    )
    .refine(
      (file) => !file || file.size <= 8 * 1024 * 1024,
      "Max file size is 10MB"
    ),
});

function Profile() {
  const router = useRouter();
  const { data, loading, refetch } = useSession();
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const [isLoading, setIsLoading] = useState(false);

  type ProfileInput = z.infer<typeof profileSchema>;

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fname: data?.user?.fname ?? "",
      lname: data?.user?.lname ?? "",
      email: data?.user?.email ?? "",
      bio: data?.user?.bio ?? "",
      occupation: data?.user?.occupation ?? "",
      serviceType: data?.user?.serviceType ?? "",
      avatar: undefined,
    },
  });
  const {
    register,
    handleSubmit,
    setError,
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const avatarFile = watch("avatar");

  const handlePickFile = () => {
    document.getElementById("avatarInput")?.click();
  };

  useEffect(() => {
    if (data && !loading) {
      form.reset({
        fname: data?.user?.fname,
        lname: data?.user?.lname,
        email: data?.user?.email,
        bio: data?.user?.bio,
        occupation: data?.user?.occupation,
        serviceType: data?.user?.serviceType,
      });
    }
  }, [data, loading, form]);

  const getSignature = async () => {
    const res = await fetch("/api/course-videos");
    return res.json();
  };

  const onSubmit = async (formData: ProfileInput) => {
    setIsLoading(true);
    try {
      let avatarUrl = data?.user?.avatar;

      if (formData.avatar instanceof File) {
        const { timestamp, signature, apiKey, cloudName } =
          await getSignature();
        const uploadData = new FormData();
        uploadData.append("file", formData.avatar);
        uploadData.append("api_key", apiKey);
        uploadData.append("timestamp", timestamp.toString());
        uploadData.append("signature", signature);
        uploadData.append("folder", "kervah_user_avatars");

        const upload = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: uploadData,
          }
        );

        const uploaded = await upload.json();
        avatarUrl = uploaded.url;
      }

      const submitPayload = {
        fname: formData.fname,
        lname: formData.lname,
        bio: formData.bio,
        occupation: formData.occupation,
        serviceType: formData.serviceType,
        avatar: avatarUrl,
      };

      await updateProfile({ variables: submitPayload });
      setIsLoading(false);
      toast.success("Profile updated successfully");

      router.refresh();
      await refetch();
    } catch (err) {
      setIsLoading(false);
      console.log("There was a problem updating profile", err);
      setError("root", { type: "server", message: err.message });
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
        <span className="ml-3 text-gray-500">Loading profile...</span>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Profile</CardTitle>
        <CardDescription>
          Update your personal information and profile picture
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-6">
              <Avatar className="size-24">
                {avatarFile ? (
                  <AvatarImage src={URL.createObjectURL(avatarFile)} />
                ) : (
                  <AvatarImage src={data?.user?.avatar} />
                )}
                <AvatarFallback className="text-2xl">
                  {form.getValues("fname")?.[0]?.toUpperCase() ?? "?"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePickFile}
                  type="button"
                >
                  Change Photo
                </Button>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
                <input
                  id="avatarInput"
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setValue("avatar", file, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                />
                {errors?.avatar && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors?.avatar?.message}
                  </p>
                )}
              </div>
            </div>

            <Separator className="mt-4" />

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <div className="space-y-2 mt-4">
                <Label htmlFor="fname">First Name</Label>
                <Input {...register("fname")} id="fname" />
                {errors?.fname && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors?.fname?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="lname">Last Name</Label>
                <Input {...register("lname")} id="lname" />
                {errors?.lname && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors?.lname?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <div className="space-y-2 mt-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  disabled
                />
              </div>

              <div className="space-y-2 mt-4">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  {...register("occupation")}
                  id="occupation"
                  placeholder="Registered Manager, Support Worker"
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label
                htmlFor="register-email"
                className="text-sm font-bold text-card-foreground"
              >
                Where do you work?
              </Label>
              <Controller
                control={control}
                name="serviceType"
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="CH" id="r1" />
                      <Label htmlFor="r1">Childrens Home</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="SA" id="r2" />
                      <Label htmlFor="r2">Supported Accomodation</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="BOTH" id="r3" />
                      <Label htmlFor="r3">Both</Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                {...register("bio")}
                id="bio"
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Tell us about yourself..."
                defaultValue="AI enthusiast and administrator of kervah platform."
              />
            </div>
            {errors.root && (
              <p className="mt-1 text-sm text-red-500">{errors.root.message}</p>
            )}
            <div className="flex justify-end gap-2 mt-4">
              {/* <Button variant="outline">Cancel</Button> */}
              <Button
                disabled={isLoading}
                type="submit"
                className="cursor-pointer"
              >
                {isLoading ? "Saving changes..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default Profile;
