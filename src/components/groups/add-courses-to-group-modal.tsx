"use client";

import { useEffect, useState } from "react";
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
import { Course } from "@/types/index.types";
import { ADD_COURSE_GROUP } from "@/app/graphql/queries/groups/group-queries";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";
import { useGroup } from "@/hooks/use-groups";

interface AddCoursesToGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  organisationId;
  courses: Course[];
  courseIds: string[];
  groupId: string;
  onCloseDetails: () => void;
}

export default function AddCoursesToGroupModal({
  isOpen,
  onClose,
  organisationId,
  courses,
  courseIds,
  groupId,
  onCloseDetails,
}: AddCoursesToGroupModalProps) {
  const [addCourse, { loading }] = useMutation(ADD_COURSE_GROUP);
  const { refetch } = useGroup(organisationId);

  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  const handleToggleCourse = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  useEffect(() => {
    if (courses && courseIds) {
      const filtered = courses.filter((c) => !courseIds.includes(c?.id));
      setFilteredCourses(filtered);
    }
  }, [courses, courseIds]);

  useEffect(() => {}, [filteredCourses]);

  const handleAdd = async () => {
    try {
      await addCourse({
        variables: {
          input: {
            groupId: groupId,
            courseIds: selectedCourses,
          },
        },
      });
      refetch();
      toast.success("New courses added to group");
      setSelectedCourses([]);
      onClose();
      onCloseDetails();
    } catch (error) {
      console.log("There was a problem adding courses group", error);
      toast.warning("There was a problem adding courses group ");
    }
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
            {filteredCourses.map((course) => (
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
                  {/* <p className="text-xs text-muted-foreground">
                    {course.duration}
                  </p> */}
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-2 justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={selectedCourses.length === 0 || loading}
          >
            {loading
              ? "Adding courses..."
              : `Add Selected ${selectedCourses.length}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
