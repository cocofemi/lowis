import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Action, ChatMessage, GateOptions, QuickCheck } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getTextFromMessage(message: ChatMessage): string {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('');
}

export function calculateLessonScore(
  quickChecks: QuickCheck[],
  answers: Record<string, string | null>,
  revealed: Record<string, boolean>
) {
  let score = 0, total = 0;
  quickChecks.forEach((q) => {
    const correctId = q.options.find((o) => o.correct)?.id;
    if (correctId) total += 1;
    if (revealed[q.id] && answers[q.id] === correctId) score += 1;
  });
  return { score, total };
}

export function canMarkLessonComplete(
  quickChecks: QuickCheck[],
  answers: Record<string, string | null>,
  revealed: Record<string, boolean>,
  opts?: GateOptions
) {
  // Back-compat: translate legacy flag to a mode if explicit.
  const legacy = opts?.requireCorrectToComplete;
  const mode: 'answered' | 'revealed' | 'correct' =
    opts?.lessonCompletionMode ?? (legacy === true ? 'correct' : 'revealed');

  if (mode === 'answered') {
    return quickChecks.every((q) => Boolean(answers[q.id]));
  }
  if (mode === 'revealed') {
    return quickChecks.every((q) => Boolean(answers[q.id]) && Boolean(revealed[q.id]));
  }
  // 'correct'
  return quickChecks.every((q) => {
    const correctId = q.options.find((o) => o.correct)?.id;
    return Boolean(revealed[q.id]) && answers[q.id] === correctId;
  });
}

export function scenarioSelectionScore(
  actions: Action[],
  selected: Set<string> | undefined,
  revealed: boolean
) {
  const total = actions.filter((a) => a.correct).length;
  if (!revealed || !selected) return { score: 0, total };
  const score = actions.filter((a) => a.correct && selected.has(a.id)).length;
  return { score, total };
}