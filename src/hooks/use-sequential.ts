"use client"

import { useState, useMemo } from 'react';

import { CourseContent, GateOptions } from "@/lib/types";
import { calculateLessonScore, canMarkLessonComplete, scenarioSelectionScore } from "@/lib/utils";



export function useSequentialCourse(content: CourseContent, opts?: GateOptions) {
  const [tab, setTab] = useState<'learn' | 'scenarios' | 'approach'>("learn");
  const [currentLesson, setCurrentLesson] = useState(0);
  const [lessonState, setLessonState] = useState<{
    answers: Record<string, string | null>;
    revealed: Record<string, boolean>;
  }>(() => ({ answers: {}, revealed: {} }));
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    () => new Set()
  );

  const [currentScenario, setCurrentScenario] = useState(0);
  const [scenarioAnswers, setScenarioAnswers] = useState<
    Record<string, Set<string>>
  >(() => ({}));
  const [scenarioRevealed, setScenarioRevealed] = useState<
    Record<string, boolean>
  >(() => ({}));

  const lessonsComplete = completedLessons.size === content.lessons.length;
  const lockScenarios = opts?.lockScenariosUntilLessonsDone ?? true;

  const learnTotals = useMemo(() => {
    let score = 0,
      total = 0;
    content.lessons.forEach((lesson) => {
      const s = calculateLessonScore(
        lesson.quickChecks,
        lessonState.answers,
        lessonState.revealed
      );
      score += s.score;
      total += s.total;
    });
    const average = total > 0 ? score / total : 0;
    return { score, total, average };
  }, [content.lessons, lessonState]);

  const scenariosTotals = useMemo(() => {
    let score = 0,
      total = 0;
    (content.scenarios ?? []).forEach((sc) => {
      const res = scenarioSelectionScore(
        sc.actions,
        scenarioAnswers[sc.id],
        Boolean(scenarioRevealed[sc.id])
      );
      score += res.score;
      total += res.total;
    });
    return { score, total };
  }, [content.scenarios, scenarioAnswers, scenarioRevealed]);

  function completeCurrentLesson() {
    const lesson = content.lessons[currentLesson];
    // Mark complete based on chosen lessonCompletionMode (defaults to 'revealed').
    const ok = canMarkLessonComplete(
      lesson.quickChecks,
      lessonState.answers,
      lessonState.revealed,
      opts
    );
    if (!ok) return false;
    setCompletedLessons((prev) => new Set(prev).add(lesson.id));
    if (currentLesson < content.lessons.length - 1)
      setCurrentLesson((i) => i + 1);
    return true;
  }

  function goToScenarios() {
    const threshold = opts?.scenarioUnlockThreshold ?? 0.7; // 70%
    if (lockScenarios && !lessonsComplete) return;
    if (learnTotals.average < threshold) return;
    setTab('scenarios');
  }

  return {
    // state
    tab,
    setTab,
    currentLesson,
    setCurrentLesson,
    lessonState,
    setLessonState,
    completedLessons,
    currentScenario,
    setCurrentScenario,
    scenarioAnswers,
    setScenarioAnswers,
    scenarioRevealed,
    setScenarioRevealed,

    // derived
    lessonsComplete,
    learnTotals,
    scenariosTotals,

    // actions
    completeCurrentLesson,
    goToScenarios,
  } as const;
}