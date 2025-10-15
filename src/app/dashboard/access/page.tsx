import { MembersTable } from "../../../components/members-table";

export default function AccessPage() {
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
      <MembersTable />
    </div>
  );
}
