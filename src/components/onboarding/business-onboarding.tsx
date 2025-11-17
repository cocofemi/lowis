"use client";

import type React from "react";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import logo from "../../../public/KervahLogo1Logo.svg";
import { useMutation, useQuery } from "@apollo/client/react";
import { REGISTER_BUSINESS } from "@/app/graphql/queries/business-queries/business.queries";
import { GET_USER } from "@/app/graphql/queries/user-queries/user.queries";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Form } from "../ui/form";

interface GetUserResponse {
  user: {
    id: string;
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
}

interface UserProps {
  id: string;
  token: string;
}

const businessSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone number is required"),
  serviceType: z.string().min(1, "Service type is required"),
});

export function BusinessOnboarding({ id, token }: UserProps) {
  const [registerBusiness] = useMutation(REGISTER_BUSINESS);
  const { refetch } = useQuery(GET_USER);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  type BusinessInput = z.infer<typeof businessSchema>;

  const form = useForm<BusinessInput>({
    resolver: zodResolver(businessSchema),
  });
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (data: BusinessInput) => {
    setIsLoading(true);
    try {
      await registerBusiness({ variables: data });
      const { data: userData } = (await refetch()) as { data: GetUserResponse };

      const updatedUser = userData?.user;

      const formattedBusinesses = updatedUser.businesses.map((b) => ({
        id: b?.business?.id,
        name: b?.business?.name,
        role: b.role,
      }));

      await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({
          user: {
            ...updatedUser,
            businesses: formattedBusinesses,
          },
          activeBusinessId: formattedBusinesses[0]?.id,
          activeBusinessName: formattedBusinesses[0]?.name,
          activeBusinessRole: formattedBusinesses[0]?.role,
        }),
      });
      router.push("/dashboard");
    } catch (err) {
      setIsLoading(false);
      console.log(
        "There was a problem creating your organization. Please try again!",
        err
      );

      setError("root", { type: "server", message: err.message });
    }
  };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setIsLoading(true);

  //   // Simulate API call
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   setIsLoading(false);
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-black">
            <Image
              src={logo}
              alt="logo"
              width={70}
              height={70}
              className="mt-1"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-card-foreground">
            Personalisation
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Please choose the option that describes you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="register" className="w-full">
            <TabsContent value="register">
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-card-foreground"
                    >
                      Organization Name
                    </Label>
                    <Input
                      {...register("name")}
                      id="name"
                      type="text"
                      placeholder="Enter name"
                      className=" border-border focus:ring-primary focus:border-primary"
                    />
                    {errors?.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors?.name?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="address"
                      className="text-sm font-medium text-card-foreground"
                    >
                      Organization Address
                    </Label>
                    <Input
                      {...register("address")}
                      id="address"
                      type="text"
                      placeholder="Enter  address"
                      className=" border-border focus:ring-primary focus:border-primary"
                    />
                    {errors?.address && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors?.address?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-card-foreground"
                    >
                      Phone number
                    </Label>
                    <Input
                      {...register("phone")}
                      id="phone"
                      type="number"
                      placeholder="Enter phone number"
                      className=" border-border focus:ring-primary focus:border-primary"
                    />
                    {errors?.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors?.phone?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="service-type"
                      className="text-sm font-bold text-card-foreground"
                    >
                      What service type do you offer?
                    </Label>
                    <Controller
                      control={control}
                      name="serviceType"
                      defaultValue="member"
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
                    {errors?.serviceType && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors?.serviceType?.message}
                      </p>
                    )}
                  </div>
                  {errors.root && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.root.message}
                    </p>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? "Continue..." : "Continue"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
