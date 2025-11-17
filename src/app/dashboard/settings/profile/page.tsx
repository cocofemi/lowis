import React from "react";

import ProfileSettingsPage from "@/components/settings/profile/profile-settings";

export const generateMetadata = async () => {
  return {
    title: `Profile page`,
    description: "Profile settings page for users",
  };
};

function Page() {
  return <ProfileSettingsPage />;
}

export default Page;
