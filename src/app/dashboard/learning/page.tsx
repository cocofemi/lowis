"use client";

import React from "react";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import domestic_abuse from "../../../../public/courses/domestic_abuse.png";
import mental_health from "../../../../public/courses/mental_health.jpeg";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";

function Learning() {
  const router = useRouter();
  const courses = [
    {
      id: 1,
      title: "Domestic Abuse: Learn the Signs",
      description:
        "Understand the indicators of domestic abuse and how to respond.",
      image: domestic_abuse,
      time: "10 mins",
    },
    {
      id: 2,
      title: "Mental Health First Aid",
      description:
        "Learn how to provide initial support for mental health issues.",
      image: mental_health,
      time: "15 mins",
    },
  ];
  return (
    <div className="flex flex-col gap-4 px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Learning Modules</h1>
          <p className="text-sm text-muted-foreground">
            Start learning new modules to enhance your knowledge
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4  w-full">
        {courses.map((course, i) => (
          <Card
            key={i}
            className="hover:scale-[1.02] transition-transform duration-200"
          >
            <CardHeader>
              <Image
                src={course?.image}
                className="rounded-md mb-4 h-[200px] w-[400px] object-cover"
                alt="domestic_abuse"
                width={400}
                height={200}
              />
              <Separator className="my-1" />
              <CardTitle>{course?.title}</CardTitle>
              <CardDescription>{course?.description}</CardDescription>
              <CardFooter className="flex justify-between items-center mt-4 px-0">
                <Label className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                  <Clock className="inline-block mr-1 mb-0.5" />
                  {course?.time}
                </Label>
                <Label className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                  <Button
                    onClick={() =>
                      router.push(`/dashboard/learning/${course.id}`)
                    }
                    variant="link"
                    className="p-0 cursor-pointer"
                  >
                    Start Course
                  </Button>
                </Label>
                {/* <CardAction className="text-blue-600 hover:underline">
                  Start Course
                </CardAction> */}
              </CardFooter>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Learning;
