import React from "react";

import VerifyOtp from "@/components/auth/verify-otp";

export const generateMetadata = async ({ params }) => {
  return {
    title: `Verify Otp`,
    description: "Verify otp page",
  };
};

export default async function Page() {
  return <VerifyOtp />;
}
