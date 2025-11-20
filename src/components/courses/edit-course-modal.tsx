"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { Course } from "@/types/index.types";
import { useCourse } from "@/hooks/use-courses";
import {
  GET_COURSES,
  UPDATE_COURSE,
} from "@/app/graphql/queries/course/course.queries";
import { useMutation } from "@apollo/client/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";

const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  thumbnail: z.any().optional(),
  // .refine(
  //   (value) =>
  //     value === undefined ||
  //     value instanceof File ||
  //     (Array.isArray(value) && value[0] instanceof File),
  //   {
  //     message: "Invalid file",
  //   }
  // ),
  duration: z.string().min(1, "Enter duration"),
});

interface EditCourseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: Course;
  onSave: (course: Course) => void;
}

export function EditCourseModal({
  open,
  onOpenChange,
  course,
  onSave,
}: EditCourseModalProps) {
  const router = useRouter();
  const [updateCourse] = useMutation(UPDATE_COURSE);
  const { refetch } = useCourse();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Course>(course);
  const [imagePreview, setImagePreview] = useState<string>("");

  type CourseInput = z.infer<typeof courseSchema>;

  const form = useForm<CourseInput>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: course?.title ?? "",
      description: course?.description ?? "",
      category: course?.category ?? "",
      duration: course?.duration ?? "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (course) {
      form.reset({
        title: course?.title,
        description: course?.description,
        category: course?.category,
        duration: course?.duration,
      });
    }
  }, [course, form]);

  const getSignature = async () => {
    const res = await fetch("/api/course-images");
    return res.json();
  };

  const onSubmit = async (formData: CourseInput) => {
    setIsLoading(true);
    try {
      let thumbnail = course.thumbnail;

      const files = formData.thumbnail;

      if (files && files.length > 0 && files[0] instanceof File) {
        const file = files[0];

        const { timestamp, signature, apiKey, cloudName } =
          await getSignature();
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("api_key", apiKey);
        uploadData.append("timestamp", timestamp.toString());
        uploadData.append("signature", signature);
        uploadData.append("folder", "kervah_course_images");

        const upload = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: uploadData,
          }
        );

        const uploaded = await upload.json();

        console.log(uploaded);
        thumbnail = uploaded.url;
      }

      const submitPayload = {
        id: course?.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        duration: formData.duration,
        thumbnail: thumbnail,
      };

      await updateCourse({
        variables: {
          input: submitPayload,
        },
        refetchQueries: [{ query: GET_COURSES }],
      });
      refetch();
      toast.success("Course was updated");
      setIsLoading(false);
      onOpenChange(false);
    } catch (err) {
      console.log("There was a problem creating  course", err);
      toast.warning("There was a problem updating  course");
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>Update the course details below</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter course title"
                required
              />
              {errors?.title && (
                <p className="mt-1 text-sm text-red-500">
                  {errors?.title?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Enter course description"
                rows={3}
                required
              />
              {errors?.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors?.description?.message}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  {...register("category")}
                  placeholder="e.g., Safety, Management"
                  required
                />
                {errors?.category && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors?.category?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  {...register("duration")}
                  placeholder="e.g., 2h 30m"
                  required
                />
                {errors?.duration && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors?.duration?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              {" "}
              <label className="text-sm font-medium">Thumbnail</label>
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
                      {...register("thumbnail", {
                        onChange: (e) => {
                          handleImageUpload(e);
                        },
                      })}
                      className="hidden"
                    />
                  </label>
                </div>
                {imagePreview ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                    <img
                      src={imagePreview}
                      alt="Course preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                    <img
                      src={formData.thumbnail}
                      alt="Course preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              {errors?.thumbnail && (
                <p className="mt-1 text-sm text-red-500">
                  {String(errors?.thumbnail?.message ?? "")}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button disabled={isLoading} type="submit">
                {isLoading ? "Saving changes..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
