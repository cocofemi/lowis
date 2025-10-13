import React from "react";

export function ScorePill({ score, total }: { score: number; total: number }) {
  const pct = Math.round((score / Math.max(1, total)) * 100);
  const tone =
    pct >= 80
      ? "bg-emerald-100 text-emerald-700"
      : pct >= 60
      ? "bg-amber-100 text-amber-700"
      : "bg-rose-100 text-rose-700";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${tone}`}
    >
      Score: {score}/{total} ({pct}%)
    </span>
  );
}
