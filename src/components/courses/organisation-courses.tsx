"use client";

import { useState } from "react";
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
import { BookOpen, Clock, Forward, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import AddCoursesModal from "./add-courses-modal";
import { Badge } from "../ui/badge";
import { Spinner } from "../ui/spinner";
import { useOrganisationCourses } from "@/hooks/use-organisation-courses";

interface Props {
  organisationId: string;
}

function OrganisationCourses({ organisationId }: Props) {
  const { data, loading, refetch } = useOrganisationCourses(organisationId);

  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const courseIds = data?.businessCourses?.map((c: any) => c?.id);

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
      {!loading && data && data.businessCourses.length === 0 && (
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
            businessId={organisationId}
            courseIds={courseIds}
          />
        </div>
      )}
      {data?.businessCourses.length != 0 && (
        <div className="space-y-6 p-4">
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl font-bold">Courses</h1>
              <p className="text-muted-foreground mt-2">
                List of all available and published courses
              </p>
            </div>
            <div>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Courses
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data?.businessCourses.map((course) => (
              <Card
                key={course.id}
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
                  {/* <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div> */}
                </CardContent>
                <CardFooter>
                  {/* <Button
                    className="w-full mb-4 cursor-pointer"
                    variant={course.progress > 0 ? "default" : "outline"}
                    onClick={() =>
                      router.push(`/dashboard/courses/${course?.id}`)
                    }
                  >
                    <Forward className="mr-2 h-4 w-4" />
                    Start course
                    <></>
                    
                  </Button> */}
                </CardFooter>
              </Card>
            ))}
          </div>
          <AddCoursesModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            businessId={organisationId}
            courseIds={courseIds}
          />
        </div>
      )}
    </>
  );
}

export default OrganisationCourses;
