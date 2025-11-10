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

interface AddCoursesToGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (courses: any[]) => void;
}

export default function AddCoursesToGroupModal({
  isOpen,
  onClose,
  onAdd,
}: AddCoursesToGroupModalProps) {
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

  const availableCourses = [
    { id: 4, title: "Python Fundamentals", instructor: "Mike Wilson" },
    { id: 5, title: "Web Development Basics", instructor: "Sarah Lee" },
    { id: 6, title: "Data Science Essentials", instructor: "Tom Brown" },
    { id: 7, title: "Cloud Computing 101", instructor: "Emma Davis" },
  ];

  const handleToggleCourse = (courseId: number) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleAdd = () => {
    const coursesToAdd = availableCourses.filter((c) =>
      selectedCourses.includes(c.id)
    );
    onAdd(coursesToAdd);
    setSelectedCourses([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Courses to Group</DialogTitle>
          <DialogDescription>
            Select courses to add to this group
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-64 border rounded-lg p-4">
          <div className="space-y-3">
            {availableCourses.map((course) => (
              <div key={course.id} className="flex items-start space-x-3">
                <Checkbox
                  id={`course-${course.id}`}
                  checked={selectedCourses.includes(course.id)}
                  onCheckedChange={() => handleToggleCourse(course.id)}
                />
                <Label
                  htmlFor={`course-${course.id}`}
                  className="flex-1 cursor-pointer"
                >
                  <p className="font-medium text-sm">{course.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {course.instructor}
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
          <Button onClick={handleAdd} disabled={selectedCourses.length === 0}>
            Add Selected ({selectedCourses.length})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
