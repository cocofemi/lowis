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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import logo from "../../../public/KervahLogo1Logo.svg";

export function AuthForm() {
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
            Welcome
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Create an account or sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="register" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="register" className="text-sm">
                Register
              </TabsTrigger>
              <TabsTrigger value="login" className="text-sm">
                Login
              </TabsTrigger>
            </TabsList>

            <TabsContent value="register">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="register-name"
                    className="text-sm font-medium text-card-foreground"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className="bg-input border-border focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="register-email"
                    className="text-sm font-medium text-card-foreground"
                  >
                    Email
                  </Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="bg-input border-border focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="register-password"
                    className="text-sm font-medium text-card-foreground"
                  >
                    Password
                  </Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Create a password"
                    required
                    className="bg-input border-border focus:ring-primary focus:border-primary"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  disabled={isLoading}
                  onClick={() => router.push("/auth-info")}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="login-email"
                    className="text-sm font-medium text-card-foreground"
                  >
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="bg-input border-border focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="login-password"
                    className="text-sm font-medium text-card-foreground"
                  >
                    Password
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    className="bg-input border-border focus:ring-primary focus:border-primary"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  disabled={isLoading}
                  onClick={() => router.push("/dashboard")}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
