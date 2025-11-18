import React from "react";

import { getSession } from "@/lib/auth";
import InvitePage from "@/components/invite/invite-page";
import InvitationsPage from "@/components/access/invitations-page";

export const generateMetadata = async () => {
  return {
    title: `Invitations`,
    description:
      "Manage your invitations and invite members to your organisation",
  };
};

const session = await getSession();
const { activeBusinessId } = session;

export default async function Page() {
  return <InvitationsPage organisationId={activeBusinessId} />;
}
