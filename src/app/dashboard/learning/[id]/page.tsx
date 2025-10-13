"use client";

import { CourseTrainer } from "@/components/course-container";
import { DomesticAbuseContent } from "@/data/domestic-abuse";

function Test() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-full px-4">
        <CourseTrainer
          content={DomesticAbuseContent}
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

export default Test;
