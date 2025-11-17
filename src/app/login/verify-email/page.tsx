import React from "react";

import VerifyEmailOtp from "@/components/auth/verify-email-otp";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const generateMetadata = async () => {
  return {
    title: `Verify Otp`,
    description: "Verify otp page",
  };
};

export default async function Page() {
  const cookieStore = await cookies();
  const session = cookieStore.get("emailVerification")?.value;

  if (!session) {
    redirect("/login");
  }
  return <VerifyEmailOtp />;
}
