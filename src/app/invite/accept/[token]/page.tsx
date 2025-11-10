import InvitePage from "@/components/invite/invite-page";

export default async function Page({ params }: { params: { token: string } }) {
  const { token } = params;
  return <InvitePage params={{ token }} />;
}
