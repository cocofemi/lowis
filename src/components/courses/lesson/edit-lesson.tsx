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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Edit2, Plus, Trash2 } from "lucide-react";
import { useLessonById } from "@/hooks/use-lesson-id";
import { Assessment } from "@/types/index.types";
import { DELETE_ASSESSMENT } from "@/app/graphql/queries/assessments/assessments.queries";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Editor = dynamic(() => import("../lesson/editor"), { ssr: false });

interface Lesson {
  id: string;
  title: string;
  textContent?: string;
}

export default function EditLessonForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("lessonId");

  const { data, loading, refetch } = useLessonById(id);

  const [updateLesson, { loading: lessonLoading }] = useMutation(UPDATE_LESSON);
  const [deleteAssessment, { loading: deleteLoading }] =
    useMutation(DELETE_ASSESSMENT);

  const [localLesson, setLocalLesson] = useState<Lesson>({
    id: "",
    title: "",
    textContent: "",
  });

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDelete, setDeleteDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<string>("");
  const [assessmentToEdit, setAssessmentToEdit] = useState(null);

  const [assessment, setAssessment] = useState<Assessment[]>([]);

  useEffect(() => {
    if (!loading && data?.lesson) {
      const lesson = data.lesson; // extract actual lesson object

      setLocalLesson((prev) => {
        return {
          ...prev,
          id: lesson.id ?? "",
          title: lesson.title ?? "",
          textContent: lesson.textContent ?? "",
          videoUrl: lesson.videoUrl ?? "",
        };
      });
      setAssessment(data?.lesson?.assessments || []);
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

  const handleDeleteAssessement = async () => {
    try {
      await deleteAssessment({
        variables: { id: assessmentToEdit },
      });

      refetch();
      toast.success("Assessment deleted");
      setDeleteDialog(false);
    } catch (error) {
      toast.warning("There was a problem deleting assessment. Try again");
      console.log("There was a problem deleting assessment", error);
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

        <div className="space-y-3 p-4 w-3xl">
          {assessment.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No assessments yet
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start building your lesson by adding your first assessment
                </p>
                <Button
                  onClick={() => {
                    setType("create");
                    setOpenDialog(true);
                  }}
                  className="cursor-pointer"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Assessment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {assessment.map((assessment, index) => (
                <Card key={assessment.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <CardTitle className="text-md">
                          {assessment?.question}
                        </CardTitle>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setAssessmentToEdit(assessment);
                          setType("edit");
                          setOpenDialog(true);
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          setDeleteDialog(true);
                          setAssessmentToEdit(assessment?.id);
                        }}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}

              <Button
                className="w-full bg-transparent cursor-pointer"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Lesson
              </Button>
            </>
          )}
        </div>

        <div>
          <div className="flex justify-between">
            <div className="mt-4">
              <Button
                onClick={() => {
                  setType("create");
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

      <AddAssessmentModal
        assessmentToEdit={assessmentToEdit}
        type={type}
        open={openDialog}
        onOpenChange={setOpenDialog}
      />

      <Dialog open={openDelete} onOpenChange={setDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete assessment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this assessment?
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setDeleteDialog(false)}>
              Cancel
            </Button>
            <Button
              disabled={deleteLoading}
              variant="destructive"
              onClick={handleDeleteAssessement}
            >
              {deleteLoading ? "Deleting assessment.." : "Delete assessment"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
