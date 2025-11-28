import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Course, Result } from "@/types/index.types";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";

export const columns = (
  router: ReturnType<typeof useRouter>
): ColumnDef<Result>[] => [
  {
    id: "courseTitle",
    header: "Course Name",
    accessorFn: (row) => row.course.title, // this is what filtering sees
    cell: ({ row }) => {
      const title = row.getValue<string>("courseTitle");
      return <div className="capitalize">{title}</div>;
    },
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => {
      const score = row.getValue("score");
      return <div>{score !== null ? `${Number(score).toFixed(1)}%` : "—"}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<string>("status");

      return (
        <Badge
          className={
            status === "passed"
              ? "bg-green-500/15 text-green-600"
              : status === "failed"
                ? "bg-red-500/15 text-red-600"
                : "bg-gray-500/15 text-gray-600"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "startedAt",
    header: "Started",
    cell: ({ row }) => {
      const startedAt = row.getValue<Date>("startedAt");
      return (
        <p>
          {new Date(Number(startedAt)).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "completedAt",
    header: "Completed",
    cell: ({ row }) => {
      const completedAt = row.getValue<Date>("completedAt");
      return (
        <p>
          {new Date(Number(completedAt)).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const course = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                router.push(`/dashboard/courses/${course.course.id}`)
              }
            >
              Retake course
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
