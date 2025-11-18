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
import { useSession } from "@/hooks/useSession";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  GET_ORGANISATION,
  UPDATE_ORGANISATION,
} from "@/app/graphql/queries/business-queries/business.queries";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useOrganisation } from "@/hooks/use-organisation";
import { toast } from "sonner";

interface OrganisationProps {
  organisationId: string;
  organisationRole: string;
}

const businessProfileSchema = z.object({
  name: z.string().min(1, "Name name is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone number is required"),
  serviceType: z.string().min(1, "Service type is required"),
  logo: z
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

function Profile({ organisationId }: OrganisationProps) {
  const router = useRouter();
  const { data, loading, refetch } = useOrganisation(organisationId);
  const { data: userData } = useSession();
  const [updateOrganisationProfile] = useMutation(UPDATE_ORGANISATION);

  const [isLoading, setIsLoading] = useState(false);

  type BusinessProfileInput = z.infer<typeof businessProfileSchema>;

  const form = useForm<BusinessProfileInput>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      name: data?.business?.name ?? "",
      address: data?.business?.address ?? "",
      phone: data?.business?.phone ?? "",
      serviceType: data?.business?.serviceType ?? "",
      logo: undefined,
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

  const logoFile = watch("logo");

  useEffect(() => {
    if (data && !loading) {
      form.reset({
        name: data?.business?.name,
        address: data?.business?.address,
        phone: data?.business?.phone,
        serviceType: data?.business?.serviceType,
      });
    }
  }, [data, loading, form]);

  const handlePickFile = () => {
    document.getElementById("avatarInput")?.click();
  };

  const getSignature = async () => {
    const res = await fetch("/api/cloudinary-signature");
    return res.json();
  };

  const onSubmit = async (formData: BusinessProfileInput) => {
    setIsLoading(true);
    try {
      let avatarUrl = data?.business?.logo;
      if (formData.logo instanceof File) {
        const { timestamp, signature, apiKey, cloudName } =
          await getSignature();
        const uploadData = new FormData();
        uploadData.append("file", formData.logo);
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
        id: organisationId,
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        serviceType: formData.serviceType,
        logo: avatarUrl,
      };

      await updateOrganisationProfile({ variables: submitPayload });
      setIsLoading(false);
      toast.success("Business profile updated successfully");

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
          Update your organisation's information and logo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center gap-6">
              <Avatar className="size-24">
                {logoFile ? (
                  <AvatarImage src={URL.createObjectURL(logoFile)} />
                ) : (
                  <AvatarImage src={data?.business.logo} />
                )}
                <AvatarFallback className="text-2xl">
                  {" "}
                  {form.getValues("name")?.[0]?.toUpperCase() ?? "?"}
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
                    setValue("logo", file, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                />
                {errors?.logo && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors?.logo?.message}
                  </p>
                )}
              </div>
            </div>

            <Separator className="mt-10 mb-4" />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 mt-4">
                <Label htmlFor="name">Organisation Name</Label>
                <Input {...register("name")} id="name" />
                {errors?.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors?.name?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="address">Organisation Address</Label>
                <Input {...register("address")} id="address" />
                {errors?.address && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors?.address?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2 mt-4">
                <Label htmlFor="phone">Phone number</Label>
                <Input {...register("phone")} id="phone" />
                {errors?.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors?.phone?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2 mt-4">
                <Label
                  htmlFor="register-email"
                  className="text-sm font-bold text-card-foreground"
                >
                  What service type do you offer?
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
            </div>
            {errors.root && (
              <p className="mt-1 text-sm text-red-500">{`There was a problem updating business profile`}</p>
            )}
            <div className="flex justify-end gap-2">
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
