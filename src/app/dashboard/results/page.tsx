import { DataTableDemo } from "./_components/data-table";

function Test() {
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
      <DataTableDemo />
    </div>
  );
}

export default Test;
