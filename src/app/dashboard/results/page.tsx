import { ResultsDataTable } from "@/components/results/data-table";
import { getSession } from "@/lib/auth";

export const generateMetadata = async () => {
  return {
    title: `Results`,
    description: "View results from courses.",
  };
};

export default async function Page() {
  const session = await getSession();

  const { activeBusinessId } = session;
  return (
    <div className="flex flex-col gap-4 px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Results</h1>
          <p className="text-sm text-muted-foreground">
            View past results to courses you took
          </p>
        </div>
      </div>
      <ResultsDataTable organisationId={activeBusinessId} />
    </div>
  );
}
