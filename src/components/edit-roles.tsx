"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CHANGE_MEMBER_ROLE } from "@/app/graphql/queries/organisation-queries/organisation.queries";
import { useMutation } from "@apollo/client/react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { toast } from "sonner";
import { useMembers } from "@/hooks/use-members";

interface EditUserRolesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberId: string | null;
  memberRole: string | null;
  organisationId: string;
}

// Mock courses data - replace with real data from your backend
const roles = [
  {
    id: "1",
    title: "admin",
    description: "User can assign courses, roles and invite new members etc.",
  },
  {
    id: "2",
    title: "member",
    description: "Assign learning and test materials to user",
  },
];

export function EditUserRoles({
  open,
  onOpenChange,
  memberId,
  memberRole,
  organisationId,
}: EditUserRolesModalProps) {
  const { refetch } = useMembers(organisationId);
  const [selectedRole, setSelectedRole] = useState<string>(memberRole);

  const [changeRole, { loading, error }] = useMutation(CHANGE_MEMBER_ROLE);

  useEffect(() => {
    if (memberRole) {
      setSelectedRole(memberRole);
    }
  }, [memberRole]);

  const handleRoleChange = async () => {
    try {
      await changeRole({
        variables: {
          input: {
            businessId: organisationId,
            userId: memberId,
            role: selectedRole,
          },
        },
      });
      refetch();
      console.log("User role changed");
      toast.success("User role has been changes");
    } catch (error) {
      console.log("There was a problem changing user role");
      toast.warning("There was a problem changing user role");
    }
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
            <RadioGroup
              value={selectedRole}
              onValueChange={setSelectedRole}
              className="space-y-3"
            >
              {roles.map((role) => (
                <div key={role.id} className="flex items-start gap-3">
                  <RadioGroupItem value={role.title} id={role.id} />
                  <div className="flex flex-col gap-1">
                    <Label
                      htmlFor={role.id}
                      className="cursor-pointer font-medium"
                    >
                      {role.title === "admin" ? "Admin" : "Learner"}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {role.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleRoleChange} disabled={loading}>
            {loading ? "Assigning..." : "Assign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
