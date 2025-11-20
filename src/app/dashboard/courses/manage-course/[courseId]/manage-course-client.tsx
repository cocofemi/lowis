"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import LessonForm from "@/components/courses/lesson/lesson";
import ScenarioForm from "@/components/courses/scenarios/scenario";

interface Lesson {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  quickChecks: any[];
  checklist: string[];
  hints: string[];
  content: string;
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

  const [courseInfo] = useState({
    title: "Domestic Abuse Awareness",
    description:
      "Learn to recognize signs of domestic abuse and understand support resources available.",
    category: "Safety",
    difficulty: "Beginner",
  });

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [editingLesson, setEditingLesson] = useState<string | null>(null);
  const [editingScenario, setEditingScenario] = useState<string | null>(null);

  const addLesson = () => {
    const newLesson: Lesson = {
      id: `L${Date.now()}`,
      title: "",
      summary: "",
      bullets: [],
      quickChecks: [],
      checklist: [],
      hints: [],
      content: "",
    };
    setLessons((prev) => [...prev, newLesson]);
    setEditingLesson(newLesson.id);
  };

  const updateLesson = (lessonId: string, updatedLesson: Lesson) => {
    setLessons((prev) =>
      prev.map((l) => (l.id === lessonId ? updatedLesson : l))
    );
    // setEditingLesson(null);
  };

  const removeLesson = (lessonId: string) => {
    if (confirm("Are you sure you want to delete this lesson?")) {
      setLessons((prev) => prev.filter((l) => l.id !== lessonId));
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
    // setEditingScenario(null);
  };

  const removeScenario = (scenarioId: string) => {
    if (confirm("Are you sure you want to delete this scenario?")) {
      setScenarios((prev) => prev.filter((s) => s.id !== scenarioId));
    }
  };

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
          <h1 className="text-3xl font-bold">{courseInfo.title}</h1>
          <p className="text-muted-foreground mt-1">{courseInfo.description}</p>
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
              <Badge variant="outline">{courseInfo.category}</Badge>
              <Badge variant="outline">{courseInfo.difficulty}</Badge>
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
                <Button onClick={addLesson}>
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
                        {lesson.summary && (
                          <CardDescription className="mt-1 line-clamp-1">
                            {lesson.summary}
                          </CardDescription>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingLesson(lesson.id)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLesson(lesson.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  {editingLesson === lesson.id && (
                    <CardContent>
                      <LessonForm
                        lesson={lesson}
                        onUpdate={(updated) => updateLesson(lesson.id, updated)}
                      />
                      <div className="mt-4 flex gap-2">
                        <Button
                          onClick={() => {
                            updateLesson(lesson.id, lesson);
                            setEditingLesson(null); // ✅ CLOSE ONLY WHEN SAVE IS CLICKED
                          }}
                        >
                          Save Lesson
                        </Button>

                        <Button
                          variant="outline"
                          onClick={() => setEditingLesson(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
              <Button
                onClick={addLesson}
                className="w-full bg-transparent"
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

      <div className="flex gap-4">
        <Button size="lg" className="flex-1">
          Publish Course
        </Button>
        <Button variant="outline" size="lg" className="flex-1 bg-transparent">
          Save as Draft
        </Button>
      </div>
    </div>
  );
}
