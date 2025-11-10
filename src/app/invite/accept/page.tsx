import React from "react";

import InvitePage from "@/components/invite/invite-page";

export default async function Page({ params }: { params: { token: string } }) {
  const { token } = params;
  //   const { token: tokenParam } = useParams();
  //   const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam ?? "";

  return <InvitePage params={{ token }} />;
}
