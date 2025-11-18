import InviteExpiredPage from "@/components/invite/expired-invite";

type tParams = Promise<{ token: string }>;

export default async function Page() {
  return <InviteExpiredPage />;
}
