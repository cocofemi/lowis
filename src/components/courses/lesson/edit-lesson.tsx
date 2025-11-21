"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import AddAssessmentModal from "./assessment/add-assessment-modal";
import {
  GET_LESSON_ID,
  UPDATE_LESSON,
} from "@/app/graphql/queries/lesson/lesson.queries";
import { useQuery } from "@apollo/client/react";

const Editor = dynamic(() => import("../lesson/editor"), { ssr: false });

interface Lesson {
  id: string;
  title: string;
  textContent?: string;
  media?: {
    type: "image" | "video";
    url: string;
    file?: File;
  };
  videoUrl: string;
}

export default function EditLessonForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("lessonId");

  const { data, loading, refetch } = useQuery<{ lesson: Lesson }>(
    GET_LESSON_ID,
    {
      variables: { id: id },
    }
  );
  const [updateLesson, { loading: lessonLoading }] = useMutation(UPDATE_LESSON);

  const [localLesson, setLocalLesson] = useState<Lesson>({
    id: "",
    title: "",
    textContent: "",
    media: undefined,
    videoUrl: "",
  });

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleFieldChange = (field: string, value: any) => {
    const updated = { ...localLesson, [field]: value };
    setLocalLesson(updated);
    // onUpdate(updated);
  };

  useEffect(() => {
    if (!loading && data?.lesson) {
      const lesson = data.lesson; // extract actual lesson object

      setLocalLesson((prev) => {
        let mediaObj = prev.media;

        if (lesson.videoUrl && typeof lesson.videoUrl === "string") {
          mediaObj = {
            type: "video",
            url: lesson.videoUrl,
            file: undefined,
          };
        }

        return {
          ...prev,
          id: lesson.id ?? "",
          title: lesson.title ?? "",
          textContent: lesson.textContent ?? "",
          videoUrl: lesson.videoUrl ?? "",
          media: mediaObj,
        };
      });
    }
  }, [loading, data]);

  const handleUpdate = async () => {
    try {
      if (!localLesson?.title) {
        setError("Please add a title");
        setIsLoading(false);
        return;
      }
      await updateLesson({
        variables: {
          input: {
            lessonId: id,
            title: localLesson?.title,
            textContent: JSON.stringify(localLesson.textContent),
          },
        },
      });
      toast.success("Lesson was updated");
      refetch();
      setIsLoading(false);
      router.back();
    } catch (error) {
      console.log("There was a problem creating lesson", error);
      toast.warning("There was a problem creating lesson");
      setIsLoading(false);
    }
  };

  function safeParse(json: any) {
    try {
      if (!json) return null;
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
        <span className="ml-3 text-gray-500">Loading lesson...</span>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6 w-3xl">
        <div>
          <label className="text-sm font-medium">Lesson Title</label>
          <Input
            placeholder="e.g., Why this topic matters"
            value={localLesson?.title}
            onChange={(e) =>
              setLocalLesson((prev) => ({ ...prev, title: e.target.value }))
            }
            className="mt-1"
            required
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>

        <div>
          <label className="text-sm font-medium">Lesson Content</label>
          <Editor
            key={localLesson.id + "-editor"}
            initialData={
              safeParse(localLesson.textContent) ?? {
                time: Date.now(),
                blocks: [],
              }
            }
            onChange={(data) =>
              setLocalLesson((prev) => ({ ...prev, textContent: data }))
            }
          />
        </div>

        <div>
          <div className="flex justify-between">
            <div className="mt-4">
              <Button
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                Add Assessment
              </Button>
            </div>
            <div className="mt-4 flex gap-2 justify-end">
              <Button
                className="cursor-pointer"
                disabled={lessonLoading}
                onClick={handleUpdate}
              >
                {lessonLoading ? "Updating..." : "Update Lesson"}
              </Button>

              <Button onClick={() => router.back()} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AddAssessmentModal open={openDialog} onOpenChange={setOpenDialog} />
    </>
  );
}
