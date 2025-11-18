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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import logo from "../../../public/KervahLogo1Logo.svg";

export function UserOnboarding() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="register-name"
                    className="text-sm font-bold text-card-foreground"
                  >
                    What role describes you?
                  </Label>
                  <div className="flex items-center gap-3">
                    <Checkbox id="support-worker" />
                    <Label htmlFor="terms"> Support Worker</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox id="registered-manager" />
                    <Label htmlFor="terms"> Registered Manager</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox id="responsible-individual" />
                    <Label htmlFor="terms">
                      Responsible Individual / Provider Lead
                    </Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="register-email"
                    className="text-sm font-bold text-card-foreground"
                  >
                    Where do you work?
                  </Label>
                  <RadioGroup defaultValue="childrens">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="childrens" id="r1" />
                      <Label htmlFor="r1">Childrens Home</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="supported" id="r2" />
                      <Label htmlFor="r2">Supported Accomodation</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="both" id="r3" />
                      <Label htmlFor="r3">Both</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  disabled={isLoading}
                  onClick={() => router.push("/dashboard")}
                >
                  {isLoading ? "Continue..." : "Continue"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
