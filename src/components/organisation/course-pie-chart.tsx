"use client";

import { COURSE_FUNNEL_ANALYTICS } from "@/app/graphql/queries/analytics/analytics.queries";
import { useOrganisationCourses } from "@/hooks/use-organisation-courses";
import { useQuery } from "@apollo/client/react";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import CoursePieChart from "./pie-chart";
import { EmptyAnalytics } from "./empty-analytics";

interface Props {
  organisationId: string;
}

export interface FunnelData {
  started: number;
  quarter: number;
  half: number;
  threeQuarter: number;
  completedLessons: number;
  scenarioSubmitted: number;
  passed: number;
  certificatesIssued: number;
}

function CoursePieChartCard({ organisationId }: Props) {
  const { data: courseList, loading: loadingCourses } =
    useOrganisationCourses(organisationId);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const {
    data: funnelData,
    loading: loadingFunnel,
    refetch,
  } = useQuery<{ courseFunnel: FunnelData }>(COURSE_FUNNEL_ANALYTICS, {
    variables: { courseId: selectedCourseId, businessId: organisationId },
    skip: !selectedCourseId,
  });

  useEffect(() => {
    if (courseList) {
      setSelectedCourseId(courseList?.businessCourses[0].id);
    }
  }, [courseList]);

  const courses = courseList?.businessCourses || [];
  const metrics = funnelData?.courseFunnel;

  const isEmptyData =
    metrics &&
    Object.values(metrics)
      .filter((v) => typeof v === "number") // only numeric metrics
      .every((v) => v === 0);

  // console.log(Object.values(metrics));
  return (
    <Card className="lg:col-span-2 bg-card border-border">
      <CardHeader>
        <div className="flex justify-between items-center w-full">
          <div>
            <CardTitle>Course completion</CardTitle>
            <CardDescription>
              Track learner progress across each course stage
            </CardDescription>
          </div>

          {/* Course Selector */}
          <Select
            onValueChange={(val) => {
              setSelectedCourseId(val);
              refetch({ courseId: val, organisationId });
            }}
          >
            <SelectTrigger className="w-[220px] border-1 rounded-md">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>

            <SelectContent>
              {loadingCourses ? (
                <SelectItem disabled value="loading">
                  Loading…
                </SelectItem>
              ) : (
                courses.map((c: any) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.title}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {!selectedCourseId ? (
          <p className="text-sm text-muted-foreground">
            Select a course to view analytics.
          </p>
        ) : loadingFunnel ? (
          <div className="flex justify-center items-center h-[220px]">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : isEmptyData ? (
          <EmptyAnalytics title="No analytics available for this course yet" />
        ) : (
          <CoursePieChart metrics={metrics} />
        )}
      </CardContent>

      {/* CTA Footer */}
      {/* {selectedCourseId && (
        <CardFooter className="pt-4 flex justify-end">
          <Button
            variant="secondary"
            onClick={() => {
              window.location.href = `/dashboard/analytics/course/${selectedCourseId}`;
            }}
          >
            View Details
          </Button>
        </CardFooter>
      )} */}
    </Card>
  );
}

export default CoursePieChartCard;
