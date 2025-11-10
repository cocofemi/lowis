"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import domestic_abuse from "../../../public/courses/domestic_abuse.png";
import mental_health from "../../../public/courses/mental_health.jpeg";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Plus, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import AddCoursesModal from "./add-courses-modal";
import { Badge } from "../ui/badge";
import { Progress } from "@/components/ui/progress";

interface Course {
  id: string;
  title: string;
  description: string;
  image: string | StaticImageData;
  duration: string;
  lessons: number;
  progress: number;
  category: string;
}

function Courses() {
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [course, setCourse] = useState([]);
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      title: "Domestic Abuse Awareness",
      description:
        "Learn to recognize signs of domestic abuse and understand support resources available.",
      image: domestic_abuse,
      duration: "2h 30m",
      lessons: 8,
      progress: 45,
      category: "Safety",
    },
    {
      id: "2",
      title: "Advanced Leadership Skills",
      description:
        "Develop essential leadership competencies for managing high-performing teams.",
      image: mental_health,
      duration: "4h 15m",
      lessons: 12,
      progress: 20,
      category: "Management",
    },
  ]);

  const handleAddCourse = (newGroup: any) => {
    const group = {
      id: Math.max(...course.map((g) => g.id), 0) + 1,
      ...newGroup,
      coursesCount: 0,
      membersCount: 0,
      isActive: true,
    };
    setCourse([...course, group]);
    setIsAddModalOpen(false);
  };

  if (courses.length === 0) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <Card className="max-w-md border-dashed">
          <CardContent className="flex flex-col items-center justify-center space-y-4 p-12 text-center">
            <div className="rounded-full bg-primary/10 p-6">
              <BookOpen className="h-12 w-12 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">No courses yet</h3>
              <p className="text-sm text-muted-foreground">
                Start your learning journey by adding courses from our catalog
              </p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              size="lg"
              className="mt-4 cursor-pointer"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Course
            </Button>
          </CardContent>
        </Card>
        <AddCoursesModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddCourse}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-end">
        <Button
          className="cursor-pointer"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Courses
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="group overflow-hidden transition-all hover:shadow-lg py-0"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                  <Badge variant="outline" className="w-fit">
                    {course.category}
                  </Badge>
                </div>
              </div>
              <CardDescription className="line-clamp-2">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full cursor-pointer"
                variant={course.progress > 0 ? "default" : "outline"}
                onClick={() => router.push(`/dashboard/courses/${course.id}`)}
              >
                {course.progress > 0 ? (
                  <>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Continue Learning
                  </>
                ) : (
                  <>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Start Course
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AddCoursesModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCourse}
      />
    </div>
  );
}

export default Courses;
