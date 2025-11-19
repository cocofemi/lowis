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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  UserPlus,
  BookOpen,
  PenIcon,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AssignCoursesModal } from "./assign-courses-modal";
import { EditUserRoles } from "./edit-roles";
import { MemberProfileModal } from "./member-profile-modal";
import { useMembers } from "@/hooks/use-members";
import { Spinner } from "./ui/spinner";
import { REMOVE_MEMBER } from "@/app/graphql/queries/organisation-queries/organisation.queries";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";

interface Props {
  organisationId: string;
}

export function MembersTable({ organisationId }: Props) {
  const router = useRouter();

  const { data, error, loading, refetch } = useMembers(organisationId);
  const [removeMember] = useMutation(REMOVE_MEMBER);

  const formattedBusinesses = data?.members.map((m) => ({
    id: m?.user?.id,
    fname: m?.user?.fname,
    lname: m?.user?.lname,
    role: m?.role,
    joined: m?.joined,
    avatar: m?.user?.avatar,
    email: m?.user?.email,
  }));

  const [editUserRolesModalOpen, setEditUserRolesModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [selectedMemberRole, setSelectedMemberRole] = useState<string | null>(
    null
  );
  const [selectedMemberData, setSelectedMemberData] = useState<
    (typeof formattedBusinesses)[0] | null
  >(null);

  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const handleViewProfile = (member: (typeof formattedBusinesses)[0]) => {
    setSelectedMemberData(member);
    setProfileModalOpen(true);
  };

  const handleEditUserRole = (memberId: string, memberRole: string) => {
    setSelectedMember(memberId);
    setSelectedMemberRole(memberRole);
    setEditUserRolesModalOpen(true);
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      await removeMember({
        variables: {
          input: {
            businessId: organisationId,
            userId: memberId,
          },
        },
      });
      refetch();
      console.log("User was removed");
      toast.success("User was removed from organisation");
    } catch (error) {
      console.log("There was a problem removing user");
      toast.warning("There was a problem removing user ");
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
        <span className="ml-3 text-gray-500">Loading members...</span>
      </div>
    );
  }
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Members</CardTitle>
            <Button
              className="cursor-pointer"
              onClick={() => router.push("/dashboard/access/invitations")}
            >
              <UserPlus />
              Invite Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                {/* <TableHead>Courses</TableHead> */}
                <TableHead>Joined</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formattedBusinesses.map((member, index) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={member.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {member.fname
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{`${member.fname} ${member.lname}`}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {member.email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        member.role === "admin" ? "default" : "secondary"
                      }
                    >
                      {member.role}
                    </Badge>
                  </TableCell>
                  {/* <TableCell>
                    <span className="text-sm">
                      {member.coursesCount} courses
                    </span>
                  </TableCell> */}
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(Number(member.joined)).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer"
                        >
                          <MoreHorizontal />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleViewProfile(member)}
                          className="cursor-pointer"
                        >
                          <User />
                          View Profile
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={(event) => {
                            event.preventDefault();
                            handleEditUserRole(member?.id, member?.role);
                          }}
                          className="cursor-pointer"
                        >
                          <PenIcon /> Edit Role
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleRemoveMember(member?.id)}
                          variant="destructive"
                        >
                          Remove Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <MemberProfileModal
        open={profileModalOpen}
        onOpenChange={setProfileModalOpen}
        member={selectedMemberData}
      />

      {/* <AssignCoursesModal
        open={assignCoursesModalOpen}
        onOpenChange={setAssignCoursesModalOpen}
        memberId={selectedMember}
      /> */}
      <EditUserRoles
        open={editUserRolesModalOpen}
        onOpenChange={setEditUserRolesModalOpen}
        memberId={selectedMember}
        memberRole={selectedMemberRole}
        organisationId={organisationId}
      />
    </>
  );
}
