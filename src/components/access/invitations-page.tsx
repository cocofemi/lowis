import { InvitationsTable } from "./pending-invites";

interface Props {
  organisationId: string;
}

function InvitationsPage({ organisationId }: Props) {
  return (
    <div className="flex flex-col gap-4 px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pending Invitations</h1>
          <p className="text-sm text-muted-foreground">
            Track and manage pending member invitations
          </p>
        </div>
      </div>
      <InvitationsTable organisationId={organisationId} />
    </div>
  );
}

export default InvitationsPage;
