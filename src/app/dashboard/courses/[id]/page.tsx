"use client";

import { CourseTrainer } from "@/components/course-container";
import { CoursesDB } from "@/data/domestic-abuse";
import { useParams } from "next/navigation";

function Page() {
  const params = useParams();
  const id = params?.id as string;
  const courseContent = CoursesDB.course.find((c) => c.id.toString() === id);

  console.log(courseContent);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-full px-4">
        <CourseTrainer
          content={courseContent}
          opts={{
            lessonCompletionMode: "revealed",
            lockScenariosUntilLessonsDone: true,
            scenarioUnlockThreshold: 0.7,
          }}
        />
      </div>
    </div>
  );
}

export default Page;
