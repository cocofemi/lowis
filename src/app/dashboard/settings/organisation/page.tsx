import React from "react";

import OrganisationSettingsPage from "@/components/settings/organisation/organisation-settings";
import { getSession } from "@/lib/auth";

export const generateMetadata = async () => {
  return {
    title: `Organisation settings`,
    description: "Organisation settings page",
  };
};

const session = await getSession();

const { activeBusinessId, activeBusinessRole } = session;

function Page() {
  return (
    <OrganisationSettingsPage
      organisationId={activeBusinessId}
      organisationRole={activeBusinessRole}
    />
  );
}

export default Page;
