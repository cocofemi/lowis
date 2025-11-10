import React from "react";

import VerifyOtp from "@/components/auth/verify-otp";

export const generateMetadata = async () => {
  return {
    title: `Verify otp`,
    description: "Verify otp page",
  };
};

function Page() {
  return <VerifyOtp />;
}

export default Page;
