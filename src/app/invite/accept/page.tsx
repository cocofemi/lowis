import InvitePage from "@/components/invite/invite-page";
import { getSession } from "@/lib/auth";

export const generateMetadata = async () => {
  return {
    title: `Invite verification`,
    description: "Accept/Deny invitation from organisations ",
  };
};
type tParams = Promise<{ token: string }>;

const session = await getSession();
let checkSession: boolean;

if (session) {
  checkSession = true;
} else {
  checkSession = false;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [token: string]: string | undefined }>;
}) {
  const token = (await searchParams).token;

  return <InvitePage session={checkSession} token={token} />;
}
