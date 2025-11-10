"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X, Mail, Calendar, BookOpen } from "lucide-react";

// Mock courses data - replace with real data
const mockCourses = [
  { id: "1", name: "Introduction to AI", progress: 75, completedAt: null },
  {
    id: "2",
    name: "Machine Learning Basics",
    progress: 100,
    completedAt: "2024-03-15",
  },
  {
    id: "3",
    name: "Deep Learning Fundamentals",
    progress: 45,
    completedAt: null,
  },
  {
    id: "4",
    name: "Natural Language Processing",
    progress: 20,
    completedAt: null,
  },
  { id: "5", name: "Computer Vision", progress: 60, completedAt: null },
];

interface MemberProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar: string;
    joinedAt: string;
  } | null;
}

export function MemberProfileModal({
  open,
  onOpenChange,
  member,
}: MemberProfileModalProps) {
  const [courses, setCourses] = useState(mockCourses);

  if (!member) return null;

  const handleRemoveCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Member Profile</DialogTitle>
          <DialogDescription>
            View and manage member details and course assignments
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Member Info */}
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={member.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="text-2xl font-semibold">{member.name}</h3>
                <Badge
                  variant={member.role === "admin" ? "default" : "secondary"}
                  className="mt-1"
                >
                  {member.role}
                </Badge>
              </div>
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {member.email}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Joined{" "}
                  {new Date(member.joinedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Assigned Courses */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <h4 className="font-semibold">Assigned Courses</h4>
                <Badge variant="outline">{courses.length}</Badge>
              </div>
            </div>

            {courses.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No courses assigned yet
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {courses.map((course) => (
                  <Card key={course.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h5 className="font-medium">{course.name}</h5>
                            {course.completedAt && (
                              <Badge
                                variant="outline"
                                className="text-green-500 border-green-500"
                              >
                                Completed
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>Progress: {course.progress}%</span>
                            {course.completedAt && (
                              <span>
                                • Completed on{" "}
                                {new Date(
                                  course.completedAt
                                ).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          {/* Progress bar */}
                          <div className="w-full bg-secondary rounded-full h-1.5 mt-2">
                            <div
                              className={
                                course.completedAt != null
                                  ? "bg-green-600 h-1.5 rounded-full transition-all"
                                  : "bg-red-600 h-1.5 rounded-full transition-all"
                              }
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveCourse(course.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove course</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
