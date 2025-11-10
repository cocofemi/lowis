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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Plus, X } from "lucide-react";
import AddCoursesToGroupModal from "./add-courses-to-group-modal";
import AddMembersToGroupModal from "./add-members-to-group-modal";

interface Group {
  id: number;
  name: string;
  description: string;
  startDate: string;
  coursesCount: number;
  membersCount: number;
  isActive: boolean;
}

interface GroupDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: Group;
}

export default function GroupDetailsModal({
  isOpen,
  onClose,
  group,
}: GroupDetailsModalProps) {
  const [isAddCoursesOpen, setIsAddCoursesOpen] = useState(false);
  const [isAddMembersOpen, setIsAddMembersOpen] = useState(false);
  const [courses, setCourses] = useState([
    { id: 1, title: "Introduction to AI", instructor: "John Doe" },
    { id: 2, title: "Machine Learning Basics", instructor: "Jane Smith" },
    { id: 3, title: "Deep Learning Advanced", instructor: "Bob Johnson" },
  ]);
  const [members, setMembers] = useState([
    { id: 1, name: "Alice Brown", email: "alice@example.com", role: "learner" },
    {
      id: 2,
      name: "Charlie Davis",
      email: "charlie@example.com",
      role: "learner",
    },
    { id: 3, name: "Diana Evans", email: "diana@example.com", role: "admin" },
  ]);

  const handleRemoveCourse = (courseId: number) => {
    setCourses(courses.filter((c) => c.id !== courseId));
  };

  const handleRemoveMember = (memberId: number) => {
    setMembers(members.filter((m) => m.id !== memberId));
  };

  const handleAddCourses = (selectedCourses: any[]) => {
    setCourses([...courses, ...selectedCourses]);
    setIsAddCoursesOpen(false);
  };

  const handleAddMembers = (selectedMembers: any[]) => {
    setMembers([...members, ...selectedMembers]);
    setIsAddMembersOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{group.name}</DialogTitle>
            <DialogDescription>{group.description}</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Start Date</p>
              <p className="font-medium">
                {new Date(group.startDate).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={group.isActive ? "default" : "secondary"}>
                {group.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Members</p>
              <p className="font-medium">{group.membersCount}</p>
            </div>
          </div>

          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">
                  Assigned Courses ({courses.length})
                </h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsAddCoursesOpen(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Courses
                </Button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {courses.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4">
                    No courses assigned yet
                  </p>
                ) : (
                  courses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{course.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {course.instructor}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveCourse(course.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="members" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">
                  Group Members ({members.length})
                </h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsAddMembersOpen(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Members
                </Button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {members.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4">
                    No members added yet
                  </p>
                ) : (
                  members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {member.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {member.role}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveMember(member.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AddCoursesToGroupModal
        isOpen={isAddCoursesOpen}
        onClose={() => setIsAddCoursesOpen(false)}
        onAdd={handleAddCourses}
      />

      <AddMembersToGroupModal
        isOpen={isAddMembersOpen}
        onClose={() => setIsAddMembersOpen(false)}
        onAdd={handleAddMembers}
      />
    </>
  );
}
