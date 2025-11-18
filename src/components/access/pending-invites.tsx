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
import { Badge } from "@/components/ui/badge";
import { Copy, Mail, MoreHorizontal, Trash2, RefreshCw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InviteMemberModal } from "../invite-member-modal";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  GET_ORGANISATION_INVITES,
  INVITE_MEMBER,
  REVOKE_ORGANISATION_INVITE,
} from "@/app/graphql/queries/organisation-queries/organisation.queries";
import {
  Invitations,
  Organisation,
  OrganisationInviteResponse,
  User,
} from "@/types/index.types";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

// Mock data - replace with real data from API
const mockInvitations = [
  {
    id: "1",
    email: "john.doe@example.com",
    role: "learner",
    invitedBy: "Admin User",
    invitedAt: "2025-01-15",
    expiresAt: "2025-02-15",
    status: "pending",
    token: "abc123",
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    role: "admin",
    invitedBy: "Admin User",
    invitedAt: "2025-01-10",
    expiresAt: "2025-02-10",
    status: "pending",
    token: "def456",
  },
];

interface Props {
  organisationId: string;
}

interface OrganisationInvitesResponse {
  businessInvites: Invitations[];
}

export function InvitationsTable({ organisationId }: Props) {
  const { data, loading, refetch } = useQuery<OrganisationInvitesResponse>(
    GET_ORGANISATION_INVITES,
    {
      variables: { businessId: organisationId },
      skip: !organisationId, // Do not run until ID exists
      fetchPolicy: "cache-and-network", // always refresh UI
    }
  );
  const [
    inviteOrganisationMember,
    { data: inviteData, loading: inviteLoading, error },
  ] = useMutation<OrganisationInviteResponse>(INVITE_MEMBER);

  const [revokeInvitation] = useMutation<OrganisationInviteResponse>(
    REVOKE_ORGANISATION_INVITE
  );

  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [invitations, setInvitations] = useState<Invitations[] | null>([]);

  const handleCopyLink = (token: string) => {
    const link = `${window.location.origin}/invite/${token}`;
    navigator.clipboard.writeText(link);
    // TODO: Add toast notification
    console.log("[v0] Copied invite link:", link);
  };

  const statusColor = {
    pending: "bg-yellow-500/20 text-yellow-700 border-yellow-500",
    accepted: "bg-green-500/20 text-green-700 border-green-500",
    revoked: "bg-red-500/20 text-red-700 border-red-500",
    expired: "bg-red-500/20 text-red-700 border-red-500",
  };

  const handleResendInvite = async (email: string, role: string) => {
    try {
      const res = await inviteOrganisationMember({
        variables: {
          input: {
            businessId: organisationId,
            email: email,
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
      toast.warning("Couldn't send invite. Please try again.");
    }
  };

  const handleRevokeInvite = async (token: string, email: string) => {
    try {
      const res = await revokeInvitation({
        variables: { token },
        refetchQueries: [
          {
            query: GET_ORGANISATION_INVITES,
            variables: { businessId: organisationId },
          },
        ],
      });

      console.log("Invitation was revoked successfully!");
      toast.success(`Invited to ${email} was revoked`);
    } catch (error) {
      console.log("There was a problem revoking invitation. Please try again!");
      toast.warning(
        "There was a problem revoking invitation. Please try again!"
      );
    }
  };

  console.log(data);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
        <span className="ml-3 text-gray-500">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {data?.businessInvites?.length ?? 0} pending invitation(s)
        </p>
        <Button
          className="cursor-pointer"
          onClick={() => setInviteModalOpen(true)}
        >
          <Mail className="mr-2 size-4" />
          Send Invitation
        </Button>
      </div>

      {!data || data?.businessInvites.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <Mail className="mb-4 size-10 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold">No pending invitations</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Invite team members to get started
          </p>
          <Button
            className="cursor-pointer"
            onClick={() => setInviteModalOpen(true)}
          >
            Send Your First Invitation
          </Button>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Invited By</TableHead>
                <TableHead>Invited Date</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.businessInvites.map((invitation) => (
                <TableRow key={invitation.id}>
                  <TableCell className="font-medium">
                    {invitation.email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        invitation.role === "admin" ? "default" : "secondary"
                      }
                    >
                      {invitation.role === "admin" ? "Admin" : "Learner"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {`${invitation.invitedBy?.fname} ${invitation.invitedBy?.lname}`}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(
                      Number(invitation.createdAt)
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(Number(invitation.expiresAt)).toLocaleString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        "capitalize border px-2 py-1 " +
                        (statusColor[invitation.status] ||
                          "bg-gray-200 text-gray-700")
                      }
                    >
                      {invitation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            handleResendInvite(
                              invitation.email,
                              invitation.role
                            )
                          }
                        >
                          <RefreshCw className="mr-2 size-4" />
                          Resend Email
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleRevokeInvite(
                              invitation.token,
                              invitation.email
                            )
                          }
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 size-4" />
                          Revoke Invitation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <InviteMemberModal
        open={inviteModalOpen}
        onOpenChange={setInviteModalOpen}
        organisationId={organisationId}
      />
    </div>
  );
}
