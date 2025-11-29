import React from "react";

import CertificatesPage from "@/components/certificates/certificates-page";
import { getSession } from "@/lib/auth";

export const generateMetadata = async () => {
  return {
    title: `Certificates`,
    description: "View certificates",
  };
};

export default async function Page() {
  const session = await getSession();

  const { activeBusinessId } = session;

  return <CertificatesPage organisationId={activeBusinessId} />;
}
