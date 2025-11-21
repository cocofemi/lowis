"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useCourseById } from "@/hooks/use-courses-id";
import { Spinner } from "@/components/ui/spinner";
import { LessonData } from "@/app/dashboard/courses/manage-course/manage-course-client";

const Editor = dynamic(() => import("../lesson/editor"), { ssr: false });

interface QuickCheck {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Lesson {
  id: string;
  title: string;
  summary: string;
  content: string;
  bullets: string[];
  quickChecks: QuickCheck[];
  checklist: string[];
  hints: string[];
}

interface LessonFormProps {
  lesson: LessonData;
  // onUpdate: (lesson: Lesson) => void;
  courseId: string;
  onChange: (patch: Partial<{}>) => void;
  error: string;
}

export default function LessonForm({
  lesson,
  // onUpdate,
  courseId,
  onChange,
  error,
}: LessonFormProps) {
  const { data, loading, refetch } = useCourseById(courseId);

  const [localLesson, setLocalLesson] = useState(lesson);

  const handleFieldChange = (field: string, value: any) => {
    const updated = { ...localLesson, [field]: value };
    setLocalLesson(updated);
    // onUpdate(updated);
  };

  useEffect(() => {
    setLocalLesson((prev) => ({
      ...prev,
    }));
  }, [lesson]);

  const processFile = (file: File) => {
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      alert("Please upload an image or video file");
      return;
    }

    const url = URL.createObjectURL(file);
    handleFieldChange("media", {
      type: isImage ? "image" : "video",
      url,
      file,
    });
  };

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
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>

        <div>
          <label className="text-sm font-medium">Lesson Content</label>
          <Editor
            initialData={lesson?.textContent}
            onChange={(data) => handleContentChange(data)}
          />
        </div>
      </div>
    </>
  );
}
