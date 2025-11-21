"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Trash2,
  ArrowLeft,
  Edit2,
  BookOpen,
  ListChecks,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import LessonForm from "@/components/courses/lesson/lesson";
import ScenarioForm from "@/components/courses/scenarios/scenario";
import { useCourseById } from "@/hooks/use-courses-id";
import { Spinner } from "@/components/ui/spinner";
import { useMutation } from "@apollo/client/react";
import {
  CREATE_LESSON,
  DELETE_LESSON,
} from "@/app/graphql/queries/lesson/lesson.queries";
import { toast } from "sonner";
import { Assessment } from "@/types/index.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface QuickCheck {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LessonData {
  id: string;
  title: string;
  textContent?: string;
  assessments?: Assessment[];
  summary?: string;
  content?: string;
  bullets?: string[];
  quickChecks?: QuickCheck[];
  checklist?: string[];
  hints?: string[];
}

interface Scenario {
  id: string;
  title: string;
  situation: string;
  actions: any[];
  notes?: string[];
}

export default function ManageCourseClient({ courseId }: { courseId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, loading, refetch } = useCourseById(id);

  const [createLesson] = useMutation(CREATE_LESSON);
  const [deleteLesson, { loading: LessonDelete }] = useMutation(DELETE_LESSON);
  const [isLoading, setIsLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && data?.lessons) {
      setLessons(
        data.lessons.map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          textContent: lesson.textContent,
          videoUrl: lesson.videoUrl,
          assessments: lesson.assessments || [],
        }))
      );
    }
  }, [loading, data]);

  const [lessons, setLessons] = useState<LessonData[]>([]);
  const [activeLesson, setActiveLesson] = useState<LessonData | null>(null);

  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [editingScenario, setEditingScenario] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addLesson = () => {
    const newLesson: LessonData = {
      id: null,
      title: "",
      textContent: "",
      assessments: [],
    };
    setActiveLesson(newLesson);
  };

  const removeLesson = (lessonId: string) => {
    setOpenDialog(true);
    setSelectedLessonId(lessonId);
  };

  const handleDeleteLesson = async () => {
    try {
      await deleteLesson({
        variables: { id: selectedLessonId },
      });
      toast.success("Lesson was deleted");
      refetch();
      setOpenDialog(false);
    } catch (error) {
      console.log("There was a problem deleting lesson", error);
      toast.warning("There was a problem deleting lesson. Try again.");
    }
  };

  const addScenario = () => {
    const newScenario: Scenario = {
      id: `S${Date.now()}`,
      title: "",
      situation: "",
      actions: [],
      notes: [],
    };
    setScenarios((prev) => [...prev, newScenario]);
    setEditingScenario(newScenario.id);
  };

  const updateScenario = (scenarioId: string, updatedScenario: Scenario) => {
    setScenarios((prev) =>
      prev.map((s) => (s.id === scenarioId ? updatedScenario : s))
    );
  };

  const removeScenario = (scenarioId: string) => {
    if (confirm("Are you sure you want to delete this scenario?")) {
      setScenarios((prev) => prev.filter((s) => s.id !== scenarioId));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (!activeLesson?.title) {
        setError("Please add a title");
        setIsLoading(false);
        return;
      }
      await createLesson({
        variables: {
          input: {
            title: activeLesson?.title,
            courseId: id,
            textContent: JSON.stringify(activeLesson.textContent),
          },
        },
      });
      toast.success("Lesson was added");
      refetch();
      setActiveLesson(null);
      setIsLoading(false);
    } catch (error) {
      console.log("There was a problem creating lesson", error);
      toast.warning("There was a problem creating lesson");
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
        <span className="ml-3 text-gray-500">Loading course...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 w-3xl">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard/courses")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{data?.title}</h1>
          <p className="text-muted-foreground mt-1">{data?.description}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                Add and manage lessons and scenarios for this course
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">{data?.category}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                <BookOpen className="h-6 w-6 text-primary" />
                {lessons.length}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Lessons</p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                <ListChecks className="h-6 w-6 text-primary" />
                {scenarios.length}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Scenarios</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="lessons" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lessons">
            <BookOpen className="h-4 w-4 mr-2" />
            Lessons ({lessons.length})
          </TabsTrigger>
          <TabsTrigger value="scenarios">
            <ListChecks className="h-4 w-4 mr-2" />
            Scenarios ({scenarios.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="space-y-4">
          {lessons.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No lessons yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start building your course by adding your first lesson
                </p>
                <Button className="cursor-pointer" onClick={addLesson}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Lesson
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {lessons.map((lesson, index) => (
                <Card key={lesson.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {lesson.title || `Lesson ${index + 1}`}
                        </CardTitle>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          router.push(
                            `/dashboard/courses/manage-course/lesson?lessonId=${lesson?.id}`
                          )
                        }
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setOpenDialog(true);
                          removeLesson(lesson.id);
                        }}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
              {activeLesson && (
                <CardContent>
                  <LessonForm
                    error={error}
                    lesson={activeLesson}
                    courseId={id}
                    // onUpdate={(updated) => updateLesson(lesson.id, updated)}

                    onChange={(patch) =>
                      setActiveLesson((prev) => ({ ...prev!, ...patch }))
                    }
                    // onClose={() => setActiveLesson(null)}
                  />
                  <div className="mt-4 flex gap-2">
                    <Button
                      className="cursor-pointer"
                      disabled={isLoading}
                      onClick={() => {
                        // updateLesson(lesson.id, lesson);

                        handleSave();
                      }}
                    >
                      {isLoading ? "Saving lesson.." : "Save Lesson"}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => setActiveLesson(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              )}
              <Button
                onClick={addLesson}
                className="w-full bg-transparent cursor-pointer"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Lesson
              </Button>
            </>
          )}
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          {scenarios.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <ListChecks className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No scenarios yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add scenario-based questions to test practical application
                </p>
                <Button onClick={addScenario}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Scenario
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {scenarios.map((scenario, index) => (
                <Card key={scenario.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {scenario.title || `Scenario ${index + 1}`}
                        </CardTitle>
                        {scenario.situation && (
                          <CardDescription className="mt-1 line-clamp-1">
                            {scenario.situation}
                          </CardDescription>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingScenario(scenario.id)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeScenario(scenario.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  {editingScenario === scenario.id && (
                    <CardContent>
                      <ScenarioForm
                        scenario={scenario}
                        onUpdate={(updated) =>
                          updateScenario(scenario.id, updated)
                        }
                      />
                      <div className="mt-4 flex gap-2">
                        <Button
                          onClick={() => {
                            setEditingScenario(null);
                            updateScenario(scenario.id, scenario);
                          }}
                        >
                          Save Scenario
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditingScenario(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
              <Button
                onClick={addScenario}
                className="w-full bg-transparent"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Scenario
              </Button>
            </>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete lesson</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this lesson?
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteLesson}>
              Delete lesson
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
