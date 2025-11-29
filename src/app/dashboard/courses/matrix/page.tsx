import React from "react";

import { TrainingMatrix } from "@/components/training-matrix";
import { getSession } from "@/lib/auth";

export const generateMetadata = async () => {
  return {
    title: `Course matrix`,
    description: "View group and course matrix",
  };
};

export default async function Page() {
  const session = await getSession();

  const { activeBusinessId } = session;
  return (
    <div className="flex flex-col gap-4 px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Course matrix</h1>
          <p className="text-sm text-muted-foreground">
            View your groups and courses matrix
          </p>
        </div>
      </div>
      <TrainingMatrix organisationId={activeBusinessId} />
    </div>
  );
}
