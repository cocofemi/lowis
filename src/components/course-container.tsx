"use client";

import { useSequentialCourse } from "@/hooks/use-sequential";
import { CourseContent, GateOptions } from "@/lib/types";
import { ScorePill } from "./score-pill";
import { LessonCard } from "./lesson-card";
import { ScenarioCard } from "./scenerio-card";
import { ApproachCard } from "./approach-card";

export function CourseTrainer({
  content,
  opts,
}: {
  content: CourseContent;
  opts?: GateOptions;
}) {
  const state = useSequentialCourse(content, opts);
  const {
    tab,
    setTab,
    currentLesson,
    setCurrentLesson,
    lessonState,
    setLessonState,
    completedLessons,
    lessonsComplete,
    currentScenario,
    setCurrentScenario,
    scenarioAnswers,
    setScenarioAnswers,
    scenarioRevealed,
    setScenarioRevealed,
    learnTotals,
    scenariosTotals,
    completeCurrentLesson,
  } = state;

  const lesson = content.lessons[currentLesson];
  const scenario = (content.scenarios ?? [])[currentScenario];

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-semibold">{content.title}</h1>
        {tab === "learn" ? (
          <ScorePill score={learnTotals.score} total={learnTotals.total} />
        ) : (
          <ScorePill
            score={scenariosTotals.score}
            total={scenariosTotals.total}
          />
        )}
      </header>

      <div className="mb-3 flex gap-2">
        <button
          onClick={() => setTab("learn")}
          className={`rounded-md px-3 py-1.5 text-sm border ${
            tab === "learn" ? "bg-black text-white" : "bg-white"
          }`}
        >
          Learn
        </button>
        <button
          onClick={() => setTab("scenarios")}
          className={`rounded-md px-3 py-1.5 text-sm border ${
            tab === "scenarios" ? "bg-black text-white" : "bg-white"
          }`}
          disabled={
            (opts?.lockScenariosUntilLessonsDone ?? true) && !lessonsComplete
          }
          title={
            (opts?.lockScenariosUntilLessonsDone ?? true) && !lessonsComplete
              ? "Complete all lessons to unlock scenarios"
              : ""
          }
        >
          Scenarios
        </button>
        <button
          onClick={() => setTab("approach")}
          className={`rounded-md px-3 py-1.5 text-sm border ${
            tab === "approach" ? "bg-black text-white" : "bg-white"
          }`}
        >
          Approach
        </button>
      </div>

      {tab === "learn" && (
        <div className="grid gap-4">
          <div className="rounded-xl border p-3 sm:p-4 text-sm text-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold">
                  Lesson {currentLesson + 1} of {content.lessons.length}:
                </span>{" "}
                {lesson.title}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentLesson((i) => Math.max(0, i - 1))}
                  disabled={currentLesson === 0}
                  className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40"
                >
                  Back
                </button>
                <button
                  onClick={() =>
                    setCurrentLesson((i) =>
                      Math.min(content.lessons.length - 1, i + 1)
                    )
                  }
                  disabled={
                    !completedLessons.has(lesson.id) ||
                    currentLesson === content.lessons.length - 1
                  }
                  className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40"
                  title={
                    !completedLessons.has(lesson.id)
                      ? "Complete this lesson to unlock the next"
                      : ""
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <LessonCard
            lesson={lesson}
            state={lessonState}
            setState={setLessonState}
            gateOptions={opts}
            onComplete={completeCurrentLesson}
          />

          <div className="rounded-xl border p-3 sm:p-4 text-sm text-gray-700">
            <div className="font-semibold">Progress</div>
            <div className="mt-1 flex flex-wrap gap-2">
              {content.lessons.map((L, idx) => (
                <span
                  key={L.id}
                  className={`rounded-full px-2 py-1 text-xs ${
                    completedLessons.has(L.id)
                      ? "bg-emerald-100 text-emerald-700"
                      : idx === currentLesson
                      ? "bg-gray-200"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  Lesson {idx + 1}
                </span>
              ))}
            </div>
            <div className="mt-2 text-xs text-red-400">
              Scenarios unlock when all lessons are completed and score above
              70%.
            </div>
          </div>
        </div>
      )}

      {tab === "scenarios" &&
        content.scenarios &&
        content.scenarios.length > 0 && (
          <div className="rounded-2xl border bg-white p-4 sm:p-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Scenario {currentScenario + 1} of {content.scenarios.length}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentScenario((i) => Math.max(0, i - 1))}
                  disabled={currentScenario === 0}
                  className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40"
                >
                  Back
                </button>
                <button
                  onClick={() =>
                    setCurrentScenario((i) =>
                      Math.min(content.scenarios!.length - 1, i + 1)
                    )
                  }
                  disabled={currentScenario === content.scenarios.length - 1}
                  className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
            <></>
            <ScenarioCard
              s={scenario}
              answers={scenarioAnswers}
              setAnswers={setScenarioAnswers}
              revealed={scenarioRevealed}
              setRevealed={setScenarioRevealed}
            />
          </div>
        )}
      {tab === "approach" && (
        <div className="rounded-2xl border bg-white p-4 sm:p-6 shadow-sm">
          <ApproachCard
            id="da-approach-1"
            question="A 12-year-old quietly says, ‘Sometimes Mum and her partner fight at night,’ as class ends and pupils are nearby. In the next 10 minutes, what is your approach?"
            hints={[
              "Calm welcome; move to a private space if safe; avoid leading questions.",
              "State confidentiality limits in simple language (if someone is at risk, you must share).",
              "Check immediate safety (injuries, safe to go home, safe contacts).",
              "Record neutral keywords; avoid detailed interrogation now.",
              "Offer options and agree next steps; close with grounding and how you will follow up.",
            ]}
            minWords={150}
            onEvaluate={async ({ id, answer }) => {
              // Simulate an async check
              const hasCaveat = /confidential/i.test(answer);
              const mentionsSafety = /safe|injur|contact/i.test(answer);
              const mentionsNotes = /note|record|keyword/i.test(answer);
              const mentionsClose = /close|ground|follow[- ]?up/i.test(answer);
              const score =
                [
                  hasCaveat,
                  mentionsSafety,
                  mentionsNotes,
                  mentionsClose,
                ].filter(Boolean).length / 4;
              return new Promise((resolve) =>
                setTimeout(
                  () =>
                    resolve({
                      ok: true,
                      score,
                      feedback:
                        "Auto-check prototype. Consider explicitly stating confidentiality limits and immediate safety checks.",
                    }),
                  800
                )
              );
            }}
          />
        </div>
      )}

      <footer className="mt-4 text-xs text-gray-500">
        With love from kervah
      </footer>
    </div>
  );
}
