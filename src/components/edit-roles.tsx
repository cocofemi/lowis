"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EditUserRolesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberId: string | null;
}

// Mock courses data - replace with real data from your backend
const roles = [
  {
    id: "1",
    title: "Admin",
    description: "User can assign courses, roles and invite new members etc.",
  },
  {
    id: "2",
    title: "Learner",
    description: "Assign learning and test materials to user",
  },
];

export function EditUserRoles({
  open,
  onOpenChange,
  memberId,
}: EditUserRolesModalProps) {
  const [editRoles, setEditRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (courseId: string) => {
    setEditRoles((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleAssign = async () => {
    setIsLoading(true);
    // TODO: Implement edit role logic
    console.log("[v0] Assigning courses:", {
      memberId,
      courses: editRoles,
    });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    setEditRoles([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Roles</DialogTitle>
          <DialogDescription>
            Select the roles you want to assign to this member.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[400px] pr-4">
          <div className="flex flex-col gap-4 py-4">
            {roles.map((roles) => (
              <div key={roles.id} className="flex items-start gap-3">
                <Checkbox
                  id={roles.id}
                  checked={editRoles.includes(roles.id)}
                  onCheckedChange={() => handleRoleChange(roles.id)}
                />
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor={roles.id}
                    className="cursor-pointer font-medium"
                  >
                    {roles.title}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {roles.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={isLoading || editRoles.length === 0}
          >
            {isLoading
              ? "Assigning..."
              : `Assign ${editRoles.length} Role${
                  editRoles.length !== 1 ? "s" : ""
                }`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
