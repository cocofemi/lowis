import React from "react";

import ForgotPassword from "@/components/auth/forgot-password/forgot-password";

export const generateMetadata = async () => {
  return {
    title: `Forgot password`,
    description: "Forgot password page",
  };
};

function Page() {
  return <ForgotPassword />;
}

export default Page;
