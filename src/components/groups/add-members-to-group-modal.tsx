"use client";

import { useState } from "react";
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

interface AddMembersToGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (members: any[]) => void;
}

export default function AddMembersToGroupModal({
  isOpen,
  onClose,
  onAdd,
}: AddMembersToGroupModalProps) {
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  const availableMembers = [
    {
      id: 4,
      name: "Frank Miller",
      email: "frank@example.com",
      role: "learner",
    },
    {
      id: 5,
      name: "Grace Wilson",
      email: "grace@example.com",
      role: "learner",
    },
    {
      id: 6,
      name: "Henry Taylor",
      email: "henry@example.com",
      role: "learner",
    },
    { id: 7, name: "Iris Anderson", email: "iris@example.com", role: "admin" },
  ];

  const handleToggleMember = (memberId: number) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleAdd = () => {
    const membersToAdd = availableMembers.filter((m) =>
      selectedMembers.includes(m.id)
    );
    onAdd(membersToAdd);
    setSelectedMembers([]);
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
            {availableMembers.map((member) => (
              <div key={member.id} className="flex items-start space-x-3">
                <Checkbox
                  id={`member-${member.id}`}
                  checked={selectedMembers.includes(member.id)}
                  onCheckedChange={() => handleToggleMember(member.id)}
                />
                <Label
                  htmlFor={`member-${member.id}`}
                  className="flex-1 cursor-pointer"
                >
                  <p className="font-medium text-sm">{member.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {member.email}
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
          <Button onClick={handleAdd} disabled={selectedMembers.length === 0}>
            Add Selected ({selectedMembers.length})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
