import { COURSE_ENGAGEMENT_OVERTIME } from "@/app/graphql/queries/analytics/analytics.queries";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import EngagementStackedChart from "./EngagementLineChart";
import { EmptyAnalytics } from "./empty-analytics";

interface Props {
  organisationId: string;
}

interface EngagementOvertime {
  date: string;
  courseStarts: number;
  lessonCompletions: number;
  scenarioSubmissions: number;
}

function EngagementTimeSeriesCard({ organisationId }: Props) {
  const [days, setDays] = useState(30);

  const { data, loading, refetch } = useQuery<{
    engagementOverTime: EngagementOvertime;
  }>(COURSE_ENGAGEMENT_OVERTIME, {
    variables: { businessId: organisationId, days },
  });

  const isEmptyData =
    data &&
    Object.values(data)
      .filter((v) => typeof v === "number") // only numeric metrics
      .every((v) => v === 0);

  const handleTimeframeChange = (value: string) => {
    const newDays = Number(value);
    setDays(newDays);
    refetch({ businessId: organisationId, days: newDays });
  };
  return (
    <Card className="shadow-sm lg:col-span-2 bg-card border-border">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Engagement Over Time</CardTitle>
          <CardDescription>
            Learner activity across selected timeframe
          </CardDescription>
        </div>

        {/* Timeframe Selector */}
        <Select onValueChange={handleTimeframeChange} defaultValue="30">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="60">Last 60 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="pt-2">
        {loading ? (
          <div className="flex justify-center items-center h-[350px]">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : data ? (
          <EngagementStackedChart data={data?.engagementOverTime || []} />
        ) : isEmptyData ? (
          <EmptyAnalytics />
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
}

export default EngagementTimeSeriesCard;
