"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import GroupsTable from "@/components/groups/groups-table";
import AddGroupModal from "@/components/groups/add-group-modal";
import { useGroup } from "@/hooks/use-groups";

interface Props {
  organisationId: string;
}

export default function GroupsPage({ organisationId }: Props) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data, loading, refetch } = useGroup(organisationId);

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Groups</h1>
          <p className="text-muted-foreground mt-2">
            Manage and organize learning groups
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Group
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Groups</CardTitle>
          <CardDescription>View and manage all learning groups</CardDescription>
        </CardHeader>
        <CardContent>
          <GroupsTable groups={data} organisationId={organisationId} />
        </CardContent>
      </Card>

      <AddGroupModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        organisationId={organisationId}
      />
    </div>
  );
}
