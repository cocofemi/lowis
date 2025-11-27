"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Forward, Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { Spinner } from "../ui/spinner";
import { useMemberCourseProgress } from "@/hooks/use-member-progress";
import { Progress } from "../ui/progress";
import { Course, Progress as CourseProgress } from "@/types/index.types";
import { useMutation } from "@apollo/client/react";
import { RESUME_COURSE } from "@/app/graphql/queries/members/members.queries";

interface Props {
  organisationId: string;
  userId: string;
}

interface FlattenedCourse extends Course {
  progress?: CourseProgress | null;
}

function Learning({ organisationId, userId }: Props) {
  // const { data, loading, refetch } = useOrganisationCourses(organisationId);
  const { data, loading, refetch } = useMemberCourseProgress(organisationId);
  const [resumeCourse, { loading: resumeLoading }] = useMutation(RESUME_COURSE);
  const [courses, setCourses] = useState<FlattenedCourse[]>([]);

  const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      const flattened: FlattenedCourse[] = data.map((item) => ({
        ...item.course, // spreads Course fields
        progress: item.progress,
      }));
      setCourses(flattened);
    }
  }, [data]);
  console.log(data);
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleStartCourse = async (courseId: string) => {
    setLoadingCourseId(courseId);
    try {
      await resumeCourse({
        variables: {
          courseId,
          businessId: organisationId,
        },
      });
      console.log("Starting course");
      router.push(`/dashboard/courses/${courseId}`);
    } catch (error) {
      console.log("There was a problem starting course");
    }
  };

  if (loading || !data) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
        <span className="ml-3 text-gray-500">Loading courses...</span>
      </div>
    );
  }

  return (
    <>
      {!loading && courses.length === 0 && (
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
        </div>
      )}
      {courses.length != 0 && (
        <div className="space-y-6 p-4">
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl font-bold">Courses</h1>
              <p className="text-muted-foreground mt-2">
                List of courses available to you.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses?.map((course) => (
              <Card
                key={course?.id}
                className="group overflow-hidden transition-all hover:shadow-lg py-0"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <CardTitle className="line-clamp-1">
                        {course.title}
                      </CardTitle>
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
                      <span>{course?.lessons?.length ?? 0} lessons</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">
                        {course?.progress?.percentage === undefined ||
                        course?.progress?.percentage === null
                          ? `0`
                          : `${course?.progress?.percentage}`}
                        %
                      </span>
                    </div>
                    <Progress
                      value={course?.progress?.percentage}
                      className="h-2"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    disabled={loadingCourseId === course?.id}
                    className="w-full mb-4 transition-opacity duration-200 cursor-pointer"
                    onClick={() => handleStartCourse(course?.id)}
                  >
                    {loadingCourseId === course?.id ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {!course?.progress ||
                        course?.progress?.status === "not_started"
                          ? "Starting..."
                          : "Resuming..."}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Forward className="h-4 w-4" />
                        {!course?.progress ||
                        course?.progress?.status === "not_started"
                          ? "Start Course"
                          : "Resume Course"}
                      </span>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Learning;
