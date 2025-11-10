import React from "react";

import CertificatesPage from "@/components/certificates/certificates-page";

export const generateMetadata = async () => {
  return {
    title: `Certificates`,
    description: "View certificates",
  };
};

export default async function Page() {
  return <CertificatesPage />;
}
