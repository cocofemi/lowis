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
import {
  Archive,
  BookOpen,
  Clock,
  Edit,
  Eye,
  EyeOff,
  FileText,
  ListChecks,
  MoreVertical,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import AddCoursesModal from "./add-courses-modal";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EditCourseModal } from "@/components/courses/edit-course-modal";
import { useCourse } from "@/hooks/use-courses";
import { Spinner } from "../ui/spinner";
import { Course } from "@/types/index.types";
import { UPDATE_COURSE } from "@/app/graphql/queries/course/course.queries";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

function Courses() {
  const { data, error, refetch, loading: CourseLoading } = useCourse();
  const [createCourse, { loading }] = useMutation(UPDATE_COURSE);
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const [dialogAction, setDialogAction] = useState<{
    field: string;
    value: boolean;
    label: string;
  } | null>(null);

  const updateCourseField = async ({
    courseId,
    field,
    value,
    successMessage,
  }: {
    courseId: string;
    field: string;
    value: any;
    successMessage: string;
  }) => {
    try {
      await createCourse({
        variables: {
          input: {
            id: courseId,
            [field]: value,
          },
        },
      });
      refetch();
      toast.success(successMessage);
      router.push("/dashboard/courses");
    } catch (err) {
      console.log("There was a problem", err);
      toast.warning("There was a problem please try again");
    }
  };
  const handleAddCourse = (newGroup: any) => {
    // const group = {
    //   id: Math.max(...course.map((g) => g.id), 0) + 1,
    //   ...newGroup,
    //   coursesCount: 0,
    //   membersCount: 0,
    //   isActive: true,
    // };
    // setCourse([...course, group]);
    // setIsAddModalOpen(false);
  };

  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const handleAddCourses = (selectedCourses: Course[]) => {
    // setCourses((prev) => [...prev, ...selectedCourses]);
  };

  const handleTogglePublish = (course: Course) => {
    setDialogAction({
      field: "publish",
      value: !course.publish,
      label: course.publish ? "Unpublish" : "Publish",
    });

    setSelectedCourseId(course?.id);
    setOpenDialog(true);
  };

  const handleArchiveCourse = (course: Course) => {
    setDialogAction({
      field: "archive",
      value: !course.archive,
      label: course.archive ? "Unarchive" : "Archive",
    });

    setSelectedCourseId(course?.id);
    setOpenDialog(true);
  };

  const handleAddLesson = (courseId: string) => {
    router.push(`/dashboard/courses/manage-course?id=${courseId}`);
  };

  const handleAddScenario = (courseId: string) => {
    router.push(`/dashboard/courses/manage-course?id=${courseId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "Intermediate":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case "Advanced":
        return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };
  if (CourseLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
        <span className="ml-3 text-gray-500">Loading courses...</span>
      </div>
    );
  }

  if (data?.length === 0) {
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
        {data?.map((course) => (
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
              <div className="absolute right-2 top-2 flex flex-col gap-2">
                {course.publish ? (
                  <Badge className="bg-green-500/90 text-white hover:bg-green-500">
                    <Eye className="mr-1 h-3 w-3" />
                    Published
                  </Badge>
                ) : (
                  <Badge className="bg-yellow-500/90 text-white hover:bg-yellow-500">
                    <EyeOff className="mr-1 h-3 w-3" />
                    Unpublished
                  </Badge>
                )}
                {/* <Badge className={getDifficultyColor(course.difficulty)}>
                    {course.difficulty}
                  </Badge> */}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-2 h-8 w-8 bg-black/50 backdrop-blur-sm hover:bg-black/70"
                  >
                    <MoreVertical className="h-4 w-4 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => setEditingCourse(course)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Course
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleTogglePublish(course)}>
                    {course.publish ? (
                      <>
                        <EyeOff className="mr-2 h-4 w-4" />
                        Unpublish
                      </>
                    ) : (
                      <>
                        <Eye className="mr-2 h-4 w-4" />
                        Publish
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleAddLesson(course.id)}>
                    <FileText className="mr-2 h-4 w-4" />
                    Add Lesson
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAddScenario(course.id)}
                  >
                    <ListChecks className="mr-2 h-4 w-4" />
                    Add Scenario
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleArchiveCourse(course)}>
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                  <span>{course?.lessons.length} lessons</span>
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
                className="w-full mb-4"
                variant={course.progress > 0 ? "default" : "outline"}
                onClick={() =>
                  (window.location.href = `/dashboard/manage-course/${course.id}`)
                }
              >
                {course.progress > 0 ? (
                  <>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Start course
                  </>
                ) : (
                  <>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Add Content
                  </>
                )}
              </Button> */}
            </CardFooter>
          </Card>
        ))}
      </div>
      <AddCoursesModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCourses}
      />
      {editingCourse && (
        <EditCourseModal
          open={!!editingCourse}
          onOpenChange={(open) => !open && setEditingCourse(null)}
          course={editingCourse}
        />
      )}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogAction?.label} Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to {dialogAction?.label.toLowerCase()} this
              course?
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (!selectedCourseId || !dialogAction) return;

                updateCourseField({
                  courseId: selectedCourseId,
                  field: dialogAction.field,
                  value: dialogAction.value,
                  successMessage: `Course ${dialogAction.label.toLowerCase()}d`,
                });

                setOpenDialog(false);
              }}
            >
              {dialogAction?.label}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Courses;
