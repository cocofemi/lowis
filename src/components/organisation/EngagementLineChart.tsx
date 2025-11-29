"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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

export default function EngagementLineChart({ data }) {
  return (
    <div className="w-full h-[350px]">
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[310px] w-full"
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={8} />
          <YAxis />

          <ChartTooltip content={<ChartTooltipContent />} />

          <Legend />

          {/* Stacked bars */}
          <Bar
            dataKey="Course_Starts"
            fill="#a4de6c" /* blue */
            name="Course Starts"
          />
          <Bar
            dataKey="Lesson_Completions"
            fill="#8884d8" /* green */
            name="Lessons Completed"
          />
          <Bar
            dataKey="Scenario_Submissions"
            fill="#ffc658" /* amber */
            name="Scenario Submissions"
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
