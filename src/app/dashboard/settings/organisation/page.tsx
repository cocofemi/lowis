import React from "react";

import OrganisationSettingsPage from "@/components/settings/organisation/organisation-settings";

export const generateMetadata = async () => {
  return {
    title: `Organisation settings`,
    description: "Organisation settings page",
  };
};

function Page() {
  return <OrganisationSettingsPage />;
}

export default Page;
