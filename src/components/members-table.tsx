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
import { InviteMemberModal } from "./invite-member-modal";
import { AssignCoursesModal } from "./assign-courses-modal";
import { EditUserRoles } from "./edit-roles";
import { MemberProfileModal } from "./member-profile-modal";

// Mock data - replace with real data from your backend
const mockMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    avatar: "",
    joinedAt: "2024-01-15",
    coursesCount: 5,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "learner",
    avatar: "",
    joinedAt: "2024-02-20",
    coursesCount: 3,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "learner",
    avatar: "",
    joinedAt: "2024-03-10",
    coursesCount: 7,
  },
];

export function MembersTable() {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [assignCoursesModalOpen, setAssignCoursesModalOpen] = useState(false);
  const [editUserRolesModalOpen, setEditUserRolesModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [selectedMemberData, setSelectedMemberData] = useState<
    (typeof mockMembers)[0] | null
  >(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const handleViewProfile = (member: (typeof mockMembers)[0]) => {
    setSelectedMemberData(member);
    setProfileModalOpen(true);
  };

  const handleAssignCourses = (memberId: string) => {
    setSelectedMember(memberId);
    setAssignCoursesModalOpen(true);
  };
  const handleEditUserRole = (memberId: string) => {
    setSelectedMember(memberId);
    setEditUserRolesModalOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Members</CardTitle>
            <Button onClick={() => setInviteModalOpen(true)}>
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
                <TableHead>Courses</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={member.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{member.name}</span>
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
                  <TableCell>
                    <span className="text-sm">
                      {member.coursesCount} courses
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(member.joinedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleViewProfile(member)}
                        >
                          <User />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleAssignCourses(member.id)}
                        >
                          <BookOpen />
                          Assign Courses
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditUserRole(member.id)}
                        >
                          <PenIcon /> Edit Role
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
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

      <InviteMemberModal
        open={inviteModalOpen}
        onOpenChange={setInviteModalOpen}
      />
      <AssignCoursesModal
        open={assignCoursesModalOpen}
        onOpenChange={setAssignCoursesModalOpen}
        memberId={selectedMember}
      />
      <EditUserRoles
        open={editUserRolesModalOpen}
        onOpenChange={setEditUserRolesModalOpen}
        memberId={selectedMember}
      />
    </>
  );
}
