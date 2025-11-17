"use client";

import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import logo from "../../../public/KervahLogo1Logo.svg";
import Login from "./login";
import Register from "./register";

export function AuthForm() {
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
              <Register />
            </TabsContent>

            <TabsContent value="login">
              <Login />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
