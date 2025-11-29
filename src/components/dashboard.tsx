"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity } from "lucide-react";

import OrganisationStats from "./organisation/organisation-stats";
import CoursePieChartCard from "./organisation/course-pie-chart";
import EngagementTimeSeriesCard from "./organisation/EngagementTimeSeriesCard";
import RecentActivity from "./organisation/recent-activity";

interface Props {
  organisationId: string;
}

export default function DashboardPage({ organisationId }: Props) {
  return (
    <div className="space-y-8 p-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Hello there 👋</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back! Here's your platform overview.
        </p>
      </div>

      {/* Stats Cards */}
      <OrganisationStats organisationId={organisationId} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Progress Chart */}
        <CoursePieChartCard organisationId={organisationId} />
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activities</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <RecentActivity organisationId={organisationId} />
        </Card>
      </div>

      {/* User Activity and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Chart */}
        <EngagementTimeSeriesCard organisationId={organisationId} />
      </div>
    </div>
  );
}
