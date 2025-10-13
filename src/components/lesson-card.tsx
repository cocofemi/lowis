"use client";

import { GateOptions, Lesson } from "@/lib/types";
import { calculateLessonScore, canMarkLessonComplete } from "@/lib/utils";
import { useMemo, useState } from "react";
import { ScorePill } from "./score-pill";

export function LessonCard({
  lesson,
  state,
  setState,
  onComplete,
  gateOptions,
}: {
  lesson: Lesson;
  state: {
    answers: Record<string, string | null>;
    revealed: Record<string, boolean>;
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      answers: Record<string, string | null>;
      revealed: Record<string, boolean>;
    }>
  >;
  onComplete: () => void;
  gateOptions?: GateOptions;
}) {
  const [showHints, setShowHints] = useState(false);
  const { score: got, total } = useMemo(
    () =>
      calculateLessonScore(lesson.quickChecks, state.answers, state.revealed),
    [lesson, state]
  );

  const allAnswered = lesson.quickChecks.every((q) => state.answers[q.id]);
  const allRevealed = lesson.quickChecks.every((q) => state.revealed[q.id]);
  const allCorrect = canMarkLessonComplete(
    lesson.quickChecks,
    state.answers,
    state.revealed,
    gateOptions
  );

  return (
    <div className="rounded-2xl border bg-white p-4 sm:p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{lesson.title}</h3>
          <p className="mt-1 text-gray-700">{lesson.summary}</p>
        </div>
        {lesson.hints && lesson.hints.length > 0 && (
          <button
            onClick={() => setShowHints((v) => !v)}
            className="shrink-0 rounded-md border px-3 py-1.5 text-sm"
            aria-expanded={showHints}
          >
            {showHints ? "Hide hints" : "Show hints"}
          </button>
        )}
      </div>

      {showHints && lesson.hints && (
        <div className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
          <div className="mb-1 font-semibold">Hints</div>
          <ul className="list-disc pl-5 space-y-1">
            {lesson.hints.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-800">
        {lesson.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      {lesson.checklist && (
        <div className="mt-4 rounded-xl bg-gray-50 p-3 sm:p-4">
          <div className="mb-1 font-semibold text-sm">Checklist</div>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            {lesson.checklist.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Quick checks */}
      <div className="mt-4 grid gap-3">
        {lesson.quickChecks.map((q) => {
          const selected = state.answers[q.id] ?? null;
          const revealed = state.revealed[q.id] ?? false;
          return (
            <div key={q.id} className="rounded-xl border p-3 sm:p-4">
              <div className="font-medium">{q.stem}</div>
              <div className="mt-2 grid gap-2">
                {q.options.map((opt) => {
                  const isSelected = selected === opt.id;
                  const tone = revealed
                    ? opt.correct
                      ? "border-emerald-500 bg-emerald-50"
                      : isSelected
                      ? "border-rose-400 bg-rose-50"
                      : ""
                    : isSelected
                    ? "bg-gray-200"
                    : "";
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        !revealed &&
                        setState((prev) => ({
                          ...prev,
                          answers: { ...prev.answers, [q.id]: opt.id },
                        }))
                      }
                      className={`text-left rounded-lg border p-2 transition-colors ${tone}`}
                      disabled={revealed}
                    >
                      <div className="font-normal">{opt.label}</div>
                      {revealed && (
                        <div
                          className={`mt-1 text-sm ${
                            opt.correct ? "text-emerald-700" : "text-rose-700"
                          }`}
                        >
                          {opt.why}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-xs text-gray-600">
                  {selected ? "Selected" : "Select an option"} • Reveal to see
                  feedback
                </div>
                <button
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      revealed: { ...prev.revealed, [q.id]: true },
                    }))
                  }
                  disabled={revealed || !selected}
                  className="rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white disabled:opacity-40"
                >
                  {revealed ? "Revealed" : "Reveal answer"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <ScorePill score={got} total={total} />
        <button
          onClick={onComplete}
          disabled={!(allAnswered && allRevealed && allCorrect)}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
          title={
            allAnswered && allRevealed && !allCorrect
              ? "Answer all items correctly to complete this lesson"
              : ""
          }
        >
          Mark lesson complete
        </button>
      </div>
    </div>
  );
}
