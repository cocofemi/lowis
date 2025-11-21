import EditLessonForm from "@/components/courses/lesson/edit-lesson";

export const generateMetadata = async () => {
  return {
    title: `Lesson`,
    description: "Manage and edit a lesson",
  };
};

function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-full px-4">
        <EditLessonForm />
      </div>
    </div>
  );
}

export default Page;
