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
import { Upload } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { CREATE_COURSE } from "@/app/graphql/queries/course/course.queries";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import { toast } from "sonner";
import { useCourse } from "@/hooks/use-courses";

const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  thumbnail: z
    .any()
    .refine((files) => files?.length === 1, {
      message: "Course thumbnail is required",
    })
    .transform((files) => files[0])
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
      { message: "Only JPG, PNG or GIF files are allowed" }
    )
    .refine(
      (file) => file.size <= 10 * 1024 * 1024, // 10MB
      { message: "Max file size is 10MB" }
    ),
  duration: z.string().min(1, "Enter duration"),
});

export default function UploadCoursePage() {
  const router = useRouter();
  const [createCourse] = useMutation(CREATE_COURSE);
  const { refetch } = useCourse();

  const [imagePreview, setImagePreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

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

  type CourseInput = z.infer<typeof courseSchema>;

  const form = useForm<CourseInput>({
    resolver: zodResolver(courseSchema),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const getSignature = async () => {
    const res = await fetch("/api/course-images");
    return res.json();
  };

  const onSubmit = async (formData: CourseInput) => {
    setIsLoading(true);
    try {
      let thumbnail;

      if (formData.thumbnail instanceof File) {
        const { timestamp, signature, apiKey, cloudName } =
          await getSignature();
        const uploadData = new FormData();
        uploadData.append("file", formData.thumbnail);
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
        thumbnail = uploaded.url;
      }

      const submitPayload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        thumbnail: thumbnail,
        duration: formData.duration,
      };

      await createCourse({ variables: submitPayload });
      refetch();
      toast.success("Course was created successfully");
      router.push("/dashboard/courses");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log("There was a problem creating  course", err);
      toast.warning("There was a problem creating  course");
    }
  };

  return (
    <div className="space-y-6 p-4 mx-auto w-3xl">
      <div>
        <h1 className="text-3xl font-bold">Upload Course</h1>
        <p className="text-muted-foreground mt-2">
          Create and upload a new course with lessons and scenarios
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
          <CardDescription>Basic information about course</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Course Title</label>
                <Input
                  {...register("title")}
                  placeholder="e.g., Domestic Abuse: Learn"
                  className="mt-1"
                />
                {errors?.title && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors?.title?.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">
                  Course Description
                </label>
                <Textarea
                  {...register("description")}
                  placeholder="Describe what this course covers..."
                  className="mt-1"
                  rows={4}
                />
                {errors?.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors?.description?.message}
                  </p>
                )}
              </div>
              <div>
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
                        // onChange={handleImageUpload}
                        {...register("thumbnail", {
                          onChange: (e) => {
                            handleImageUpload(e);
                          },
                        })}
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
                {errors?.thumbnail && (
                  <p className="mt-1 text-sm text-red-500">
                    {String(errors?.thumbnail?.message ?? "")}
                  </p>
                )}
                <div className="flex justify-between mt-4">
                  <div className="">
                    <label className="text-sm font-medium">Category</label>
                    <Input
                      {...register("category")}
                      placeholder="e.g., Domestic Abuse: Learn"
                      className="mt-1"
                    />
                    {errors?.category && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors?.category?.message}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <label className="text-sm font-medium">Duration</label>
                    <Input
                      {...register("duration")}
                      placeholder="Enter e.g 30mins, 2h"
                      className="mt-1"
                    />
                    {errors?.duration && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors?.duration?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  disabled={isLoading}
                  type="submit"
                  size="lg"
                  className="flex-1 cursor-pointer"
                >
                  {isLoading ? "Creating course..." : "Create course"}
                </Button>
                {/* <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 bg-transparent"
                >
                  Create course
                </Button> */}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
