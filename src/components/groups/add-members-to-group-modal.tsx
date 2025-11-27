"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Member } from "@/types/index.types";
import { useMutation } from "@apollo/client/react";
import { ADD_MEMBER } from "@/app/graphql/queries/groups/group-queries";
import { useGroup } from "@/hooks/use-groups";
import { toast } from "sonner";

interface AddMembersToGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: Member[];
  organisationId: string;
  groupId: string;
  memberIds: string[];
  onCloseDetails: () => void;
}

export default function AddMembersToGroupModal({
  isOpen,
  onClose,
  members,
  organisationId,
  groupId,
  memberIds,
  onCloseDetails,
}: AddMembersToGroupModalProps) {
  const [addMember, { loading }] = useMutation(ADD_MEMBER);
  const { refetch } = useGroup(organisationId);

  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);

  const handleToggleMember = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  useEffect(() => {
    if (members && memberIds) {
      const filtered = members.filter((m) => !memberIds.includes(m?.user?.id));
      setFilteredMembers(filtered);
    }
  }, [memberIds, members]);

  useEffect(() => {}, [filteredMembers]);

  const handleAdd = async () => {
    try {
      await addMember({
        variables: {
          input: {
            groupId: groupId,
            memberIds: selectedMembers,
          },
        },
      });
      refetch();
      toast.success("New members added to group");
      setSelectedMembers([]);
      onClose();
      onCloseDetails();
    } catch (error) {
      console.log("There was a problem adding members group", error);
      toast.warning("There was a problem adding members group ");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Members to Group</DialogTitle>
          <DialogDescription>
            Select members to add to this group
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-64 border rounded-lg p-4">
          <div className="space-y-3">
            {filteredMembers.map((member) => (
              <div
                key={member?.user?.id}
                className="flex items-start space-x-3"
              >
                <Checkbox
                  id={`member-${member?.user?.id}`}
                  checked={selectedMembers.includes(member?.user?.id)}
                  onCheckedChange={() => handleToggleMember(member?.user?.id)}
                />
                <Label
                  htmlFor={`member-${member?.user?.id}`}
                  className="flex-1 cursor-pointer"
                >
                  <p className="font-medium text-sm">{`${member?.user?.fname} ${member?.user?.lname}`}</p>
                  <p className="text-xs text-muted-foreground">
                    {member?.user?.email}
                  </p>
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-2 justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={selectedMembers.length === 0 || loading}
          >
            {loading
              ? "Adding members..."
              : `Add Selected ${selectedMembers.length}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
