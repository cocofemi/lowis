"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Users, BookOpen, Eye, Trash2 } from "lucide-react";
import GroupDetailsModal from "./group-details-modal";
import { Group } from "@/types/index.types";
import { DELETE_GROUP } from "@/app/graphql/queries/groups/group-queries";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";
import { useGroup } from "@/hooks/use-groups";
import { Spinner } from "../ui/spinner";

interface GroupsTableProps {
  groups: Group[];
  organisationId: string;
}

export default function GroupsTable({
  groups,
  organisationId,
}: GroupsTableProps) {
  const { data, loading, refetch } = useGroup(organisationId);
  const [deleteGroup] = useMutation(DELETE_GROUP);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (group: Group) => {
    setSelectedGroup(group);
    setIsDetailsOpen(true);
  };

  const onDelete = async (id: string) => {
    try {
      await deleteGroup({
        variables: {
          groupId: id,
        },
      });
      refetch();
      console.log("Group has been deleted");
      toast.success("Group has been deleted");
    } catch (error) {
      console.log("There was a problem deleting group");
      toast.warning("There was a problem deleting group ");
    }
  };
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
        <span className="ml-3 text-gray-500">Loading groups...</span>
      </div>
    );
  }
  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Group Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Retake Interval(Months)</TableHead>
              <TableHead className="text-center">Courses</TableHead>
              <TableHead className="text-center">Members</TableHead>
              {/* <TableHead>Status</TableHead> */}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No groups created yet. Create your first group to get started.
                </TableCell>
              </TableRow>
            ) : (
              groups.map((group) => (
                <TableRow key={group?.id}>
                  <TableCell className="font-medium">{group?.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                    {group?.description}
                  </TableCell>
                  <TableCell className="text-sm text-center">
                    {group?.retakeIntervalMonths}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {group?.courses.length}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {group?.members.length}
                      </span>
                    </div>
                  </TableCell>
                  {/* <TableCell>
                    <Badge variant={group.isActive ? "default" : "secondary"}>
                      {group.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell> */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(group)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem
                          onClick={() => onToggleActive(group.id)}
                        >
                          {group.isActive ? "Deactivate" : "Activate"}
                        </DropdownMenuItem> */}
                        <DropdownMenuItem
                          onClick={() => onDelete(group?.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedGroup && (
        <GroupDetailsModal
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          group={selectedGroup}
          organisationId={organisationId}
        />
      )}
    </>
  );
}
