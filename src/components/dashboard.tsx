"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  BookOpen,
  FolderOpen,
  CheckCircle,
  Activity,
} from "lucide-react";

// Mock data for dashboard
const statsData = [
  {
    label: "Total Members",
    value: "248",
    icon: Users,
    change: "+12% from last month",
  },
  {
    label: "Total Courses",
    value: "24",
    icon: BookOpen,
    change: "+3 new courses",
  },
  {
    label: "Total Groups",
    value: "8",
    icon: FolderOpen,
    change: "+2 active groups",
  },
  {
    label: "Completed Courses",
    value: "156",
    icon: CheckCircle,
    change: "+24 this month",
  },
];

const courseProgressData = [
  { name: "Jan", completed: 12, inProgress: 28, notStarted: 15 },
  { name: "Feb", completed: 18, inProgress: 32, notStarted: 12 },
  { name: "Mar", completed: 24, inProgress: 35, notStarted: 10 },
  { name: "Apr", completed: 31, inProgress: 38, notStarted: 8 },
  { name: "May", completed: 42, inProgress: 40, notStarted: 6 },
  { name: "Jun", completed: 56, inProgress: 42, notStarted: 4 },
];

const completionRateData = [
  { name: "Completed", value: 156, fill: "#10b981" },
  { name: "In Progress", value: 82, fill: "#3b82f6" },
  { name: "Not Started", value: 10, fill: "#6b7280" },
];

const userActivityData = [
  { name: "Mon", active: 45, inactive: 12 },
  { name: "Tue", active: 52, inactive: 8 },
  { name: "Wed", active: 48, inactive: 10 },
  { name: "Thu", active: 61, inactive: 5 },
  { name: "Fri", active: 55, inactive: 9 },
  { name: "Sat", active: 38, inactive: 15 },
  { name: "Sun", active: 32, inactive: 18 },
];

const recentActivities = [
  {
    id: 1,
    user: "John Doe",
    action: "Completed course",
    course: "Domestic Abuse: Learn",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Joined group",
    group: "Mental Health Advocates",
    time: "4 hours ago",
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "Started course",
    course: "Mental Health: First Aid",
    time: "6 hours ago",
  },
  {
    id: 4,
    user: "Sarah Williams",
    action: "Completed lesson",
    course: "Domestic Abuse: Learn",
    time: "8 hours ago",
  },
  {
    id: 5,
    user: "Tom Brown",
    action: "Joined platform",
    group: "New Members",
    time: "1 day ago",
  },
];

export default function DashboardPage() {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Progress Chart */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">
              Course Progress Trend
            </CardTitle>
            <CardDescription>Monthly course completion status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#f3f4f6" }}
                />
                <Legend />
                <Bar dataKey="completed" stackId="a" fill="#10b981" />
                <Bar dataKey="inProgress" stackId="a" fill="#3b82f6" />
                <Bar dataKey="notStarted" stackId="a" fill="#6b7280" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Completion Rate Pie Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">
              Overall Completion Rate
            </CardTitle>
            <CardDescription>Total course status</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={completionRateData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {completionRateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#f3f4f6" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* User Activity and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Activity Chart */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">
              Weekly User Activity
            </CardTitle>
            <CardDescription>
              Active vs inactive users this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#f3f4f6" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="#10b981"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="inactive"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Key Metrics</CardTitle>
            <CardDescription>Platform statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Avg. Completion Time
              </span>
              <span className="font-semibold text-foreground">14 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Active Learners
              </span>
              <span className="font-semibold text-foreground">187/248</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Completion Rate
              </span>
              <span className="font-semibold text-foreground">62.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Avg. Group Size
              </span>
              <span className="font-semibold text-foreground">31 members</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Course Satisfaction
              </span>
              <span className="font-semibold text-foreground">4.6/5.0</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Activities</CardTitle>
          <CardDescription>Latest platform activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 pb-4 border-b border-border last:border-0"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    {activity.user}{" "}
                    <span className="text-muted-foreground font-normal">
                      {activity.action}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.course || activity.group} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
