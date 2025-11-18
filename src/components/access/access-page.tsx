import { MembersTable } from "../members-table";

interface Props {
  organisationId: string;
}

export default function AccessPage({ organisationId }: Props) {
  return (
    <div className="flex flex-col gap-4 px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team Members</h1>
          <p className="text-sm text-muted-foreground">
            Manage your team members and their access levels
          </p>
        </div>
      </div>

      <MembersTable organisationId={organisationId} />
    </div>
  );
}
