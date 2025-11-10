"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";

// 10 available courses
const COURSES = [
  "React 101",
  "Node.js 101",
  "GraphQL Basics",
  "TypeScript 101",
  "MongoDB Essentials",
  "Next.js Advanced",
  "Docker Fundamentals",
  "AWS Basics",
  "Testing Best Practices",
  "System Design",
];

// Mock member data with course completion status
const memberCourseData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    courses: {
      "React 101": { status: "Passed", date: "2025-10-15" },
      "Node.js 101": { status: "In Progress", date: null },
      "GraphQL Basics": { status: "Passed", date: "2025-10-12" },
      "TypeScript 101": { status: "Failed", date: "2025-10-20" },
      "MongoDB Essentials": { status: "In Progress", date: null },
      "Next.js Advanced": { status: "Not Started", date: null },
      "Docker Fundamentals": { status: "Passed", date: "2025-09-28" },
      "AWS Basics": { status: "Not Started", date: null },
      "Testing Best Practices": { status: "In Progress", date: null },
      "System Design": { status: "Not Started", date: null },
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    courses: {
      "React 101": { status: "Passed", date: "2025-10-18" },
      "Node.js 101": { status: "Passed", date: "2025-10-15" },
      "GraphQL Basics": { status: "Passed", date: "2025-10-10" },
      "TypeScript 101": { status: "Passed", date: "2025-10-08" },
      "MongoDB Essentials": { status: "Passed", date: "2025-10-05" },
      "Next.js Advanced": { status: "In Progress", date: null },
      "Docker Fundamentals": { status: "Passed", date: "2025-09-30" },
      "AWS Basics": { status: "In Progress", date: null },
      "Testing Best Practices": { status: "Not Started", date: null },
      "System Design": { status: "Not Started", date: null },
    },
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    courses: {
      "React 101": { status: "In Progress", date: null },
      "Node.js 101": { status: "Not Started", date: null },
      "GraphQL Basics": { status: "Passed", date: "2025-10-14" },
      "TypeScript 101": { status: "Failed", date: "2025-10-18" },
      "MongoDB Essentials": { status: "Not Started", date: null },
      "Next.js Advanced": { status: "Not Started", date: null },
      "Docker Fundamentals": { status: "Not Started", date: null },
      "AWS Basics": { status: "Not Started", date: null },
      "Testing Best Practices": { status: "Not Started", date: null },
      "System Design": { status: "Not Started", date: null },
    },
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah@example.com",
    courses: {
      "React 101": { status: "Passed", date: "2025-10-16" },
      "Node.js 101": { status: "Passed", date: "2025-10-13" },
      "GraphQL Basics": { status: "Passed", date: "2025-10-11" },
      "TypeScript 101": { status: "Passed", date: "2025-10-09" },
      "MongoDB Essentials": { status: "Passed", date: "2025-10-06" },
      "Next.js Advanced": { status: "Passed", date: "2025-10-03" },
      "Docker Fundamentals": { status: "In Progress", date: null },
      "AWS Basics": { status: "Not Started", date: null },
      "Testing Best Practices": { status: "Not Started", date: null },
      "System Design": { status: "Not Started", date: null },
    },
  },
  {
    id: 5,
    name: "Tom Brown",
    email: "tom@example.com",
    courses: {
      "React 101": { status: "In Progress", date: null },
      "Node.js 101": { status: "Not Started", date: null },
      "GraphQL Basics": { status: "Not Started", date: null },
      "TypeScript 101": { status: "Not Started", date: null },
      "MongoDB Essentials": { status: "Not Started", date: null },
      "Next.js Advanced": { status: "Not Started", date: null },
      "Docker Fundamentals": { status: "Not Started", date: null },
      "AWS Basics": { status: "Not Started", date: null },
      "Testing Best Practices": { status: "Not Started", date: null },
      "System Design": { status: "Not Started", date: null },
    },
  },
];

const statusColors = {
  Passed: "bg-green-500/20 text-green-700 border-green-500/30",
  Failed: "bg-red-500/20 text-red-700 border-red-500/30",
  "In Progress": "bg-blue-500/20 text-blue-700 border-blue-500/30",
  "Not Started": "bg-gray-500/20 text-gray-700 border-gray-500/30",
};

export function TrainingMatrix() {
  const exportToExcel = () => {
    const excelData = memberCourseData.map((member) => {
      const row = {
        "Member Name": member.name,
        Email: member.email,
      };

      COURSES.forEach((course) => {
        const courseStatus =
          member.courses[course as keyof typeof member.courses];
        if (courseStatus.status === "Passed" && courseStatus.date) {
          row[course] = `${courseStatus.status} - ${courseStatus.date}`;
        } else {
          row[course] = courseStatus.status;
        }
      });

      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Training Matrix");

    // Set column widths
    worksheet["!cols"] = [
      { wch: 18 },
      { wch: 22 },
      ...COURSES.map(() => ({ wch: 20 })),
    ];

    XLSX.writeFile(
      workbook,
      `training-matrix-${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  const getStatusColor = (status: string) => {
    return (
      statusColors[status as keyof typeof statusColors] ||
      statusColors["Not Started"]
    );
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-foreground">Training Matrix</CardTitle>
          <CardDescription>
            Member course completion status with detailed tracking
          </CardDescription>
          <Button
            onClick={exportToExcel}
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
          >
            <Download className="h-4 w-4" />
            Export to Excel
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm sticky">
            <thead className="bg-muted/50 border-b border-border sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-foreground sticky left-0 bg-muted/50 z-10">
                  Member
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground left-32 bg-muted/50 z-10">
                  Email
                </th>
                {COURSES.map((course) => (
                  <th
                    key={course}
                    className="px-4 py-3 text-center font-semibold text-foreground whitespace-nowrap bg-muted/50"
                  >
                    {course}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {memberCourseData.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-border hover:bg-muted/30"
                >
                  <td className="px-4 py-3 font-medium text-foreground sticky left-0 bg-card z-10">
                    {member.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground left-32 bg-card z-10">
                    {member.email}
                  </td>
                  {COURSES.map((course) => {
                    const courseStatus =
                      member.courses[course as keyof typeof member.courses];
                    return (
                      <td
                        key={`${member.id}-${course}`}
                        className="px-4 py-3 text-center"
                      >
                        <div
                          className={`inline-block px-2 py-1 rounded border text-xs font-medium ${getStatusColor(
                            courseStatus.status
                          )}`}
                        >
                          <div>{courseStatus.status}</div>
                          {courseStatus.status === "Passed" &&
                            courseStatus.date && (
                              <div className="text-xs opacity-75">
                                {courseStatus.date}
                              </div>
                            )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm font-semibold text-foreground mb-3">
            Status Legend
          </p>
          <div className="flex flex-wrap gap-4">
            {Object.entries(statusColors).map(([status, colorClass]) => (
              <div key={status} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full border ${colorClass}`} />
                <span className="text-sm text-muted-foreground">{status}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
