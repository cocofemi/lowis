"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useCourseById } from "@/hooks/use-courses-id";
import { Spinner } from "@/components/ui/spinner";
import {
  LessonData,
  LessonError,
} from "@/app/dashboard/courses/manage-course/manage-course-client";

const Editor = dynamic(() => import("../lesson/editor"), { ssr: false });

interface LessonFormProps {
  lesson: LessonData;
  courseId: string;
  onChange: (patch: Partial<{}>) => void;
  error: LessonError;
}

export default function LessonForm({
  lesson,
  courseId,
  onChange,
  error,
}: LessonFormProps) {
  const { data, loading, refetch } = useCourseById(courseId);

  const [localLesson, setLocalLesson] = useState(lesson);

  useEffect(() => {
    setLocalLesson((prev) => ({
      ...prev,
    }));
  }, [lesson]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
        <span className="ml-3 text-gray-500">Loading lesson...</span>
      </div>
    );
  }

  const handleTitleChange = (value: string) => {
    onChange({ title: value });
  };

  const handleContentChange = (value: string | null) => {
    onChange({ textContent: value });
  };

  return (
    <>
      <div className="space-y-6" key={lesson?.id}>
        <div>
          <label className="text-sm font-medium">Lesson Title</label>
          <Input
            placeholder="e.g., Why this topic matters"
            value={lesson?.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="mt-1"
            required
          />
          {error?.title && (
            <p className="mt-1 text-sm text-red-500">{error?.title}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Lesson Content</label>
          <Editor
            key={"new-lesson-editor"}
            initialData={lesson?.textContent}
            onChange={(data) => handleContentChange(data)}
          />
        </div>
        {error?.textContent && (
          <p className="mt-1 text-sm text-red-500">{error?.textContent}</p>
        )}
      </div>
    </>
  );
}
