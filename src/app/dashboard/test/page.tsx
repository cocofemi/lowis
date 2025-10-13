import { CourseTrainer } from "@/components/course-container";
import { DomesticAbuseContent } from "@/data/domestic-abuse";
import { DataTableDemo } from "./_components/data-table";

function Test() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-full px-4">
        {/* <CourseTrainer
          content={DomesticAbuseContent}
          opts={{
            requireCorrectToComplete: true,
            lockScenariosUntilLessonsDone: true,
          }}
        /> */}
        <DataTableDemo />;
      </div>
    </div>
  );
}

export default Test;
