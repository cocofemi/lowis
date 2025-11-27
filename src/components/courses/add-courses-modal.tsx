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
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { useCourse } from "@/hooks/use-courses";
import { useMutation } from "@apollo/client/react";
import {
  ADD_COURSES,
  GET_ORGANISATION_COURSES,
} from "@/app/graphql/queries/organisation-queries/organisation.queries";
import { toast } from "sonner";
import { Course } from "@/types/index.types";

interface AddCoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessId: string;
  courseIds: string[];
}

export default function AddCoursesModal({
  isOpen,
  onClose,
  businessId,
  courseIds,
}: AddCoursesModalProps) {
  const { data, loading, refetch } = useCourse();
  const [addCourses, { loading: AddCoursesLoading }] = useMutation(ADD_COURSES);

  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  const handleToggleCourse = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  useEffect(() => {
    if (courseIds && data) {
      const filtered = data.filter((course) => !courseIds.includes(course.id));
      setCourses(filtered);
    }
  }, [data, courseIds]);

  useEffect(() => {}, [courses]);

  const handleAdd = async () => {
    try {
      await addCourses({
        variables: {
          input: {
            businessId: businessId,
            courseIds: selectedCourses,
          },
        },
        refetchQueries: [
          { query: GET_ORGANISATION_COURSES, variables: { id: businessId } },
        ],
      });
      toast.success("Courses were added.");
      onClose();
    } catch (error) {
      toast.warning("There was a problem adding courses. Try again");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Course</DialogTitle>
          <DialogDescription>
            Select courses to add to your business
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-64 border rounded-lg p-2">
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-accent/50"
              >
                <Checkbox
                  checked={selectedCourses.includes(course.id)}
                  onCheckedChange={() => handleToggleCourse(course.id)}
                />

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold leading-tight">
                      {course.title}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course?.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{course?.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{course?.lessons?.length ?? 0} lessons</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {course?.category}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-2 justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="cursor-pointer"
            onClick={handleAdd}
            disabled={selectedCourses.length === 0 || AddCoursesLoading}
          >
            {AddCoursesLoading
              ? "Adding courses..."
              : `Add selected ${selectedCourses.length}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
