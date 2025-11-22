"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation } from "@apollo/client/react";
import {
  CREATE_ASSESSMENT,
  UPDATE_ASSESSMENT,
} from "@/app/graphql/queries/assessments/assessments.queries";
import { useRouter, useSearchParams } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { GET_LESSON_ID } from "@/app/graphql/queries/lesson/lesson.queries";
import { Assessment } from "@/types/index.types";

const assessmentSchema = z.object({
  question: z.string().min(1, "Question is required"),
  options: z.any().optional(),
  correctAnswer: z.any().optional(),
  explanation: z.string().optional(),
});

interface AddAssessmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: string;
  assessmentToEdit?: Assessment | null;
}

function AddAssessmentModal({
  open,
  onOpenChange,
  type,
  assessmentToEdit,
}: AddAssessmentModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("lessonId");

  const [createAssessment, { loading, error }] = useMutation(CREATE_ASSESSMENT);
  const [updateAssessment, { loading: updateLoading }] =
    useMutation(UPDATE_ASSESSMENT);

  type AssessmentInput = z.infer<typeof assessmentSchema>;

  const form = useForm<AssessmentInput>({
    resolver: zodResolver(assessmentSchema),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const [quickCheck, setQuickCheck] = useState({
    question: "",
    options: [""],
    correctAnswer: null,
    explanation: "",
  });

  const addQuickCheckOption = () => {
    setQuickCheck((prev) => ({
      ...prev,
      options: [...prev.options, ""], // add empty option
    }));
  };

  const updateQuickCheckOption = (optionIndex: number, value: string) => {
    setQuickCheck((prev) => {
      const updated = [...prev.options];
      updated[optionIndex] = value;
      return { ...prev, options: updated };
    });
  };

  const removeQuickCheckOption = (optionIndex: number) => {
    setQuickCheck((prev) => {
      const filtered = prev.options.filter((_, i) => i !== optionIndex);
      return { ...prev, options: filtered };
    });
  };

  useEffect(() => {
    if (type === "edit" && assessmentToEdit) {
      setQuickCheck({
        question: assessmentToEdit.question,
        options: assessmentToEdit.options,
        correctAnswer: assessmentToEdit.correctAnswer,
        explanation: assessmentToEdit.explanation || "",
      });

      form.reset({
        question: assessmentToEdit.question,
        explanation: assessmentToEdit.explanation,
      });
    }

    if (type === "create") {
      setQuickCheck({
        question: "",
        options: [""],
        correctAnswer: null,
        explanation: "",
      });

      form.reset({
        question: "",
        explanation: "",
      });
    }
  }, [type, assessmentToEdit]);

  const onSubmit = async (data: AssessmentInput) => {
    const cleanedOptions = quickCheck.options.filter(
      (opt) => opt.trim() !== ""
    );

    if (cleanedOptions.length < 2) {
      setError("root", {
        type: "server",
        message: "At least two options are required",
      });
      return;
    }

    if (quickCheck.correctAnswer === null) {
      setError("root", {
        type: "server",
        message: "Please choose a correct answer",
      });
      return;
    }

    const payload = {
      question: data.question,
      options: cleanedOptions,
      correctAnswer: quickCheck.correctAnswer,
      explanation: data.explanation || "",
      lessonId: id,
    };

    try {
      if (type === "edit" && assessmentToEdit?.id) {
        await updateAssessment({
          variables: {
            input: {
              question: payload.question,
              options: cleanedOptions,
              correctAnswer: payload?.correctAnswer,
              explanation: payload.explanation || "",
              assessmentId: assessmentToEdit?.id,
            },
          },
          refetchQueries: [
            {
              query: GET_LESSON_ID,
              variables: { id: id },
            },
          ],
        });
        toast.success("Assessment updated");
      } else {
        await createAssessment({
          variables: {
            input: payload,
          },
          refetchQueries: [
            {
              query: GET_LESSON_ID,
              variables: { id: id },
            },
          ],
        });
        toast.success("Assessment created");
      }

      onOpenChange(false);
      setQuickCheck({
        question: "",
        options: [""],
        correctAnswer: null,
        explanation: "",
      });
      form.reset({
        question: "",
        explanation: "",
        options: [""], // if you want RHF to track it
        correctAnswer: null,
      });
    } catch (error) {
      toast.warning("There was a problem creating assessment. Try again.");
      console.log("There was a problem creating assessment. Try again.", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        aria-description="assessment_modal"
      >
        <DialogHeader>
          <DialogTitle>Add a question</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-84">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              id="assessment_modal"
            >
              <div className="border rounded-lg p-4 space-y-3 bg-muted/30">
                <div>
                  <label className="text-xs font-medium">Question</label>
                  <Textarea
                    placeholder="Enter the question..."
                    {...register("question")}
                    className="mt-1"
                  />
                  {errors?.question && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors?.question?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium mb-2 block">
                    Answer Options
                  </label>
                  <div className="space-y-2">
                    {quickCheck.options.map((option, optionIndex) => (
                      <div
                        className="flex gap-2 items-center"
                        key={optionIndex}
                      >
                        <Input
                          type="radio"
                          name="correctAnswer"
                          checked={quickCheck.correctAnswer === optionIndex}
                          onChange={() => {
                            setQuickCheck((prev) => ({
                              ...prev,
                              correctAnswer: optionIndex,
                            }));
                          }}
                          className="w-4 h-4"
                        />
                        {errors?.correctAnswer && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors?.root?.message}
                          </p>
                        )}

                        <Input
                          placeholder={`Option ${optionIndex + 1}`}
                          value={option}
                          onChange={(e) =>
                            updateQuickCheckOption(optionIndex, e.target.value)
                          }
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuickCheckOption(optionIndex)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {errors.root && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.root.message}
                      </p>
                    )}
                    <Button
                      onClick={addQuickCheckOption}
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Option
                    </Button>
                  </div>

                  <div>
                    <label className="text-xs font-medium">Explanation</label>
                    <Textarea
                      placeholder="Explain the correct answer..."
                      {...register("explanation")}
                      className="mt-1"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
              {type === "edit" ? (
                <Button disabled={updateLoading} type="submit">
                  {updateLoading ? "Editing Assessment..." : "Edit Assessment"}
                </Button>
              ) : (
                <Button disabled={loading} type="submit">
                  {loading ? "Creating Assessment..." : "Create Assessment"}
                </Button>
              )}

              <Button
                onClick={() => onOpenChange(false)}
                type="button"
                variant="secondary"
              >
                Close
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default AddAssessmentModal;
