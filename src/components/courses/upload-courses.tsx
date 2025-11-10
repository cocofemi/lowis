"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Upload } from "lucide-react";
import LessonForm from "./lesson/lesson";
import ScenarioForm from "./scenarios/scenario";

interface Lesson {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  quickChecks: any[];
  checklist: string[];
  hints: string[];
}

interface Scenario {
  id: string;
  title: string;
  situation: string;
  actions: any[];
  notes?: string[];
}

interface CourseData {
  title: string;
  description: string;
  image?: string;
  lessons: Lesson[];
  scenarios: Scenario[];
}

export default function UploadCoursePage() {
  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    description: "",
    image: "",
    lessons: [],
    scenarios: [],
  });
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleCourseChange = (field: string, value: string) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        handleCourseChange("image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addLesson = () => {
    const newLesson: Lesson = {
      id: `L${Date.now()}`,
      title: "",
      summary: "",
      bullets: [],
      quickChecks: [],
      checklist: [],
      hints: [],
    };
    setCourseData((prev) => ({
      ...prev,
      lessons: [...prev.lessons, newLesson],
    }));
  };

  const updateLesson = (lessonId: string, updatedLesson: Lesson) => {
    setCourseData((prev) => ({
      ...prev,
      lessons: prev.lessons.map((l) => (l.id === lessonId ? updatedLesson : l)),
    }));
  };

  const removeLesson = (lessonId: string) => {
    setCourseData((prev) => ({
      ...prev,
      lessons: prev.lessons.filter((l) => l.id !== lessonId),
    }));
  };

  const addScenario = () => {
    const newScenario: Scenario = {
      id: `s${Date.now()}`,
      title: "",
      situation: "",
      actions: [],
      notes: [],
    };
    setCourseData((prev) => ({
      ...prev,
      scenarios: [...prev.scenarios, newScenario],
    }));
  };

  const updateScenario = (scenarioId: string, updatedScenario: Scenario) => {
    setCourseData((prev) => ({
      ...prev,
      scenarios: prev.scenarios.map((s) =>
        s.id === scenarioId ? updatedScenario : s
      ),
    }));
  };

  const removeScenario = (scenarioId: string) => {
    setCourseData((prev) => ({
      ...prev,
      scenarios: prev.scenarios.filter((s) => s.id !== scenarioId),
    }));
  };

  const handleSubmit = async () => {
    console.log("Course data:", courseData);
    // TODO: Send to API
    alert("Course uploaded successfully!");
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-bold">Upload Course</h1>
        <p className="text-muted-foreground mt-2">
          Create and upload a new course with lessons and scenarios
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
          <CardDescription>Basic information about your course</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Course Title</label>
            <Input
              placeholder="e.g., Domestic Abuse: Learn"
              value={courseData.title}
              onChange={(e) => handleCourseChange("title", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Course Description</label>
            <Textarea
              placeholder="Describe what this course covers..."
              value={courseData.description}
              onChange={(e) =>
                handleCourseChange("description", e.target.value)
              }
              className="mt-1"
              rows={4}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Course Image</label>
            <div className="mt-1 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              {imagePreview && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Course preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="lessons" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lessons">
            Lessons ({courseData.lessons.length})
          </TabsTrigger>
          <TabsTrigger value="scenarios">
            Scenarios ({courseData.scenarios.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="space-y-4">
          {courseData.lessons.map((lesson, index) => (
            <Card key={lesson.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Lesson {index + 1}</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLesson(lesson.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <LessonForm
                  lesson={lesson}
                  onUpdate={(updated) => updateLesson(lesson.id, updated)}
                />
              </CardContent>
            </Card>
          ))}
          <Button onClick={addLesson} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Lesson
          </Button>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          {courseData.scenarios.map((scenario, index) => (
            <Card key={scenario.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Scenario {index + 1}</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeScenario(scenario.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <ScenarioForm
                  scenario={scenario}
                  onUpdate={(updated) => updateScenario(scenario.id, updated)}
                />
              </CardContent>
            </Card>
          ))}
          <Button onClick={addScenario} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Scenario
          </Button>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button onClick={handleSubmit} size="lg" className="flex-1">
          Upload Course
        </Button>
        <Button variant="outline" size="lg" className="flex-1 bg-transparent">
          Save as Draft
        </Button>
      </div>
    </div>
  );
}
