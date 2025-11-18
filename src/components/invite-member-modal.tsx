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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useMutation } from "@apollo/client/react";
import {
  INVITE_MEMBER,
  GET_ORGANISATION_INVITES,
} from "@/app/graphql/queries/organisation-queries/organisation.queries";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form } from "./ui/form";
import { Organisation, User } from "@/types/index.types";
import { toast } from "sonner";

const inviteSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
});

interface InviteMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organisationId: string;
}

interface OrganisationInviteResponse {
  inviteBusinessMember: {
    id: string;
    email: string;
    business: Organisation;
    role: string;
    token: string;
    invitedBy: User;
    expiresAt: string;
  };
}

export function InviteMemberModal({
  open,
  onOpenChange,
  organisationId,
}: InviteMemberModalProps) {
  const [inviteOrganisationMember, { data, loading, error }] =
    useMutation<OrganisationInviteResponse>(INVITE_MEMBER);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"member" | "admin">("member");
  // const [isLoading, setIsLoading] = useState(false);

  type InviteInput = z.infer<typeof inviteSchema>;

  const form = useForm<InviteInput>({
    resolver: zodResolver(inviteSchema),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const onSubmit = async (data: InviteInput) => {
    try {
      const res = await inviteOrganisationMember({
        variables: {
          input: {
            businessId: organisationId,
            email: data?.email,
            role: role,
          },
        },
        refetchQueries: [
          {
            query: GET_ORGANISATION_INVITES,
            variables: { businessId: organisationId },
          },
        ],
      });

      const token = res?.data?.inviteBusinessMember.token;
      await fetch("/api/invite", {
        method: "POST",
        body: JSON.stringify({
          email: res?.data?.inviteBusinessMember?.email,
          invitedByUsername: `${res?.data?.inviteBusinessMember?.invitedBy?.fname} ${res?.data?.inviteBusinessMember?.invitedBy?.lname}`,
          organizationName: res?.data?.inviteBusinessMember.business.name,
          inviteLink: `http://localhost:3000/invite/accept?token=${token}`,
        }),
      });
      toast("Invite was sent to new member.");
      console.log("Invite sent sucessfully");
    } catch (err) {
      console.log("There was a problem sending invite", err);
      setError("root", { type: "server", message: err.message });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>
            Send an invitation to join your kervah workspace. They will receive
            an email with instructions to get started.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="colleague@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors?.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors?.email?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={role}
                  onValueChange={(value) =>
                    setRole(value as "member" | "admin")
                  }
                >
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Member</span>
                        <span className="text-xs text-muted-foreground">
                          Can access assigned courses and get certificates
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Admin</span>
                        <span className="text-xs text-muted-foreground">
                          Full access to manage members and courses
                        </span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              {errors.root && (
                <p className="mt-1 text-sm text-red-500">
                  {`There was a problem sending invite. Please try again`}
                </p>
              )}
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                className="cursor-pointer"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Invitation"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
