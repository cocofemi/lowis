import InvitePage from "@/components/invite/invite-page";

type tParams = Promise<{ token: string }>;

export default async function Page({ params }: { params: tParams }) {
  const { token }: { token: string } = await params;
  return <InvitePage params={{ token }} />;
}
