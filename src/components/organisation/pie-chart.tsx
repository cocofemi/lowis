"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FunnelData } from "./course-pie-chart";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#0ea5e9"];

interface Props {
  metrics: FunnelData;
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function CoursePieChart({ metrics }: Props) {
  if (!metrics) return null;

  const data = [
    { name: "Started", value: metrics.started },
    { name: "Completed Lessons", value: metrics.completedLessons },
    { name: "Scenario Submitted", value: metrics.scenarioSubmitted },
    { name: "Passed", value: metrics.passed },
    { name: "Certificates Issued", value: metrics.certificatesIssued },
  ].filter((d) => d.value > 0); // hide zero-data slices

  return (
    <div className="w-full h-[350px]">
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[350px] w-full"
      >
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <ChartTooltip content={<ChartTooltipContent />} />

          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ChartContainer>
    </div>
  );
}

export default CoursePieChart;
