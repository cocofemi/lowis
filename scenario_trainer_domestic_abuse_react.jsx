import React, { useMemo, useState } from "react";

/**
 * Reusable Course Trainer Components (Lessons → Scenarios)
 * ------------------------------------------------------
 * This file exposes a small, composable API you can reuse across courses:
 *
 * Types:
 *  - Option, QuickCheck, Lesson, Scenario, CourseContent
 * Helpers:
 *  - calculateLessonScore, canMarkLessonComplete, scenarioSelectionScore
 * Hook:
 *  - useSequentialCourse(content, opts)
 * Components:
 *  - ScorePill (UI)
 *  - LessonCard (generic lesson rendering + hints + MCQs)
 *  - ScenarioCard (multi-select actions + feedback)
 *  - CourseTrainer (shell: tabs, gating, navigation)
 *
 * Default export:
 *  - DomesticAbuseTrainer — an example using the reusable primitives.
 */

// ---------------------------- Types -----------------------------------------

export type Option = { id: string; label: string; correct: boolean; why: string };
export type QuickCheck = { id: string; stem: string; options: Option[] };

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  quickChecks: QuickCheck[];
  checklist?: string[];
  hints?: string[];
};

export type Action = { id: string; label: string; correct: boolean; why: string };
export type Scenario = { id: string; title: string; situation: string; actions: Action[]; notes?: string[] };

export type CourseContent = {
  title: string;
  lessons: Lesson[];
  scenarios?: Scenario[];
};

export type GateOptions = {
  /** Require each lesson's MCQs to be answered, revealed AND correct to complete. */
  requireCorrectToComplete?: boolean; // default true
  /** Unlock Scenarios tab only after all lessons complete. */
  lockScenariosUntilLessonsDone?: boolean; // default true
};

// ---------------------------- Helpers ---------------------------------------

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
  const requireCorrect = opts?.requireCorrectToComplete ?? true;
  if (!requireCorrect) {
    return quickChecks.every((q) => Boolean(answers[q.id]) && Boolean(revealed[q.id]));
  }
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

// ---------------------------- Hook ------------------------------------------

export function useSequentialCourse(content: CourseContent, opts?: GateOptions) {
  const [tab, setTab] = useState<'learn' | 'scenarios'>("learn");
  const [currentLesson, setCurrentLesson] = useState(0);
  const [lessonState, setLessonState] = useState<{ answers: Record<string, string | null>; revealed: Record<string, boolean> }>(() => ({ answers: {}, revealed: {} }));
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(() => new Set());

  const [currentScenario, setCurrentScenario] = useState(0);
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, Set<string>>>(() => ({}));
  const [scenarioRevealed, setScenarioRevealed] = useState<Record<string, boolean>>(() => ({}));

  const lessonsComplete = completedLessons.size === content.lessons.length;
  const lockScenarios = opts?.lockScenariosUntilLessonsDone ?? true;

  const learnTotals = useMemo(() => {
    let score = 0, total = 0;
    content.lessons.forEach((lesson) => {
      const s = calculateLessonScore(lesson.quickChecks, lessonState.answers, lessonState.revealed);
      score += s.score; total += s.total;
    });
    return { score, total };
  }, [content.lessons, lessonState]);

  const scenariosTotals = useMemo(() => {
    let score = 0, total = 0;
    (content.scenarios ?? []).forEach((sc) => {
      const res = scenarioSelectionScore(sc.actions, scenarioAnswers[sc.id], Boolean(scenarioRevealed[sc.id]));
      score += res.score; total += res.total;
    });
    return { score, total };
  }, [content.scenarios, scenarioAnswers, scenarioRevealed]);

  function completeCurrentLesson() {
    const lesson = content.lessons[currentLesson];
    const ok = canMarkLessonComplete(lesson.quickChecks, lessonState.answers, lessonState.revealed, opts);
    if (!ok) return false;
    setCompletedLessons((prev) => new Set(prev).add(lesson.id));
    if (currentLesson < content.lessons.length - 1) setCurrentLesson((i) => i + 1);
    return true;
  }

  function goToScenarios() {
    if (lockScenarios && !lessonsComplete) return;
    setTab('scenarios');
  }

  return {
    // state
    tab, setTab,
    currentLesson, setCurrentLesson,
    lessonState, setLessonState,
    completedLessons,
    currentScenario, setCurrentScenario,
    scenarioAnswers, setScenarioAnswers,
    scenarioRevealed, setScenarioRevealed,

    // derived
    lessonsComplete,
    learnTotals,
    scenariosTotals,

    // actions
    completeCurrentLesson,
    goToScenarios,
  } as const;
}

// ---------------------------- UI building blocks ----------------------------

export function ScorePill({ score, total }: { score: number; total: number }) {
  const pct = Math.round((score / Math.max(1, total)) * 100);
  const tone = pct >= 80 ? "bg-emerald-100 text-emerald-700" : pct >= 60 ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${tone}`}>
      Score: {score}/{total} ({pct}%)
    </span>
  );
}

function Checkbox({ checked, onChange, disabled }: { checked: boolean; onChange: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      className={`h-5 w-5 rounded border flex items-center justify-center ${checked ? "bg-black text-white border-black" : "bg-white text-transparent border-gray-300"} ${disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
      aria-pressed={checked}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export function LessonCard({
  lesson,
  state,
  setState,
  onComplete,
  gateOptions,
}: {
  lesson: Lesson;
  state: { answers: Record<string, string | null>; revealed: Record<string, boolean> };
  setState: React.Dispatch<React.SetStateAction<{ answers: Record<string, string | null>; revealed: Record<string, boolean> }>>;
  onComplete: () => void;
  gateOptions?: GateOptions;
}) {
  const [showHints, setShowHints] = useState(false);
  const { score: got, total } = useMemo(() => calculateLessonScore(lesson.quickChecks, state.answers, state.revealed), [lesson, state]);

  const allAnswered = lesson.quickChecks.every((q) => state.answers[q.id]);
  const allRevealed = lesson.quickChecks.every((q) => state.revealed[q.id]);
  const allCorrect = canMarkLessonComplete(lesson.quickChecks, state.answers, state.revealed, gateOptions);

  return (
    <div className="rounded-2xl border bg-white p-4 sm:p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{lesson.title}</h3>
          <p className="mt-1 text-gray-700">{lesson.summary}</p>
        </div>
        {lesson.hints && lesson.hints.length > 0 && (
          <button onClick={() => setShowHints((v) => !v)} className="shrink-0 rounded-md border px-3 py-1.5 text-sm" aria-expanded={showHints}>
            {showHints ? 'Hide hints' : 'Show hints'}
          </button>
        )}
      </div>

      {showHints && lesson.hints && (
        <div className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
          <div className="mb-1 font-semibold">Hints</div>
          <ul className="list-disc pl-5 space-y-1">{lesson.hints.map((h, i) => (<li key={i}>{h}</li>))}</ul>
        </div>
      )}

      <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-800">
        {lesson.bullets.map((b, i) => (<li key={i}>{b}</li>))}
      </ul>

      {lesson.checklist && (
        <div className="mt-4 rounded-xl bg-gray-50 p-3 sm:p-4">
          <div className="mb-1 font-semibold text-sm">Checklist</div>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            {lesson.checklist.map((c, i) => (<li key={i}>{c}</li>))}
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
                  const tone = revealed ? (opt.correct ? "border-emerald-500 bg-emerald-50" : isSelected ? "border-rose-400 bg-rose-50" : "") : isSelected ? "bg-gray-50" : "";
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => !revealed && setState((prev) => ({ ...prev, answers: { ...prev.answers, [q.id]: opt.id } }))}
                      className={`text-left rounded-lg border p-2 transition-colors ${tone}`}
                      disabled={revealed}
                    >
                      <div className="font-normal">{opt.label}</div>
                      {revealed && (<div className={`mt-1 text-sm ${opt.correct ? "text-emerald-700" : "text-rose-700"}`}>{opt.why}</div>)}
                    </button>
                  );
                })}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-xs text-gray-600">{selected ? 'Selected' : 'Select an option'} • Reveal to see feedback</div>
                <button
                  onClick={() => setState((prev)=> ({ ...prev, revealed: { ...prev.revealed, [q.id]: true } }))}
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
          title={allAnswered && allRevealed && !allCorrect ? "Answer all items correctly to complete this lesson" : ""}
        >
          Mark lesson complete
        </button>
      </div>
    </div>
  );
}

export function ScenarioCard({ s, answers, setAnswers, revealed, setRevealed }: {
  s: Scenario;
  answers: Record<string, Set<string>>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, Set<string>>>>;
  revealed: Record<string, boolean>;
  setRevealed: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) {
  const selectedIds = answers[s.id] ?? new Set<string>();
  const totalCorrect = s.actions.filter(a=>a.correct).length;
  const correctCount = s.actions.filter(a=>a.correct && selectedIds.has(a.id)).length;

  const toggle = (id: string) => {
    if (revealed[s.id]) return;
    setAnswers(prev => {
      const cur = new Set(prev[s.id] ?? []);
      cur.has(id) ? cur.delete(id) : cur.add(id);
      return { ...prev, [s.id]: cur };
    });
  };

  return (
    <div className="rounded-2xl border bg-white p-4 sm:p-6 shadow-sm">
      <h3 className="text-lg font-semibold">{s.title}</h3>
      <p className="mt-1 text-gray-700">{s.situation}</p>

      <div className="mt-4 grid gap-2">
        {s.actions.map((a) => {
          const selected = selectedIds.has(a.id);
          const show = revealed[s.id];
          const isCorrectPick = a.correct && selected;
          const isWrongPick = !a.correct && selected;
          const border = show ? (a.correct ? "border-emerald-500" : isWrongPick ? "border-rose-400" : "border-gray-200") : "border-gray-200";
          const bg = show ? (isCorrectPick ? "bg-emerald-50" : isWrongPick ? "bg-rose-50" : "bg-white") : selected ? "bg-gray-50" : "bg-white";
          return (
            <div key={a.id} className={`rounded-xl border ${border} ${bg} p-3 sm:p-4 transition-colors`}>
              <div className="flex items-start gap-3">
                <Checkbox checked={selected} onChange={() => toggle(a.id)} disabled={show} />
                <div className="min-w-0 flex-1">
                  <div className="font-medium leading-6">{a.label}</div>
                  {show && (<p className={`mt-1 text-sm ${a.correct ? "text-emerald-700" : "text-rose-700"}`}>{a.why}</p>)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {!revealed[s.id] ? (
          <div className="text-sm text-gray-600">Select all actions you would take, then reveal the answers.</div>
        ) : (
          <div className="text-sm"><span className="font-medium">This scenario:</span> {correctCount}/{totalCorrect} correct selections.</div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => setRevealed(prev => ({ ...prev, [s.id]: true }))}
            disabled={revealed[s.id] || (answers[s.id]?.size ?? 0) === 0}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            {revealed[s.id] ? "Revealed" : "Reveal answers"}
          </button>
          {revealed[s.id] && (
            <button
              onClick={() => {
                setAnswers(prev => ({ ...prev, [s.id]: new Set<string>() }));
                setRevealed(prev => ({ ...prev, [s.id]: false }));
              }}
              className="rounded-lg border px-4 py-2 text-sm"
            >
              Try again
            </button>
          )}
        </div>
      </div>

      {s.notes && s.notes.length > 0 && (
        <div className="mt-4 rounded-xl bg-gray-50 p-3 sm:p-4 text-sm text-gray-700">
          <div className="mb-1 font-semibold">Notes / Risks</div>
          <ul className="list-disc pl-5 space-y-1">
            {s.notes.map((n, i) => (<li key={i}>{n}</li>))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ---------------------------- Shell Component -------------------------------

export function CourseTrainer({ content, opts }: { content: CourseContent; opts?: GateOptions }) {
  const state = useSequentialCourse(content, opts);
  const { tab, setTab, currentLesson, setCurrentLesson, lessonState, setLessonState, completedLessons, lessonsComplete, currentScenario, setCurrentScenario, scenarioAnswers, setScenarioAnswers, scenarioRevealed, setScenarioRevealed, learnTotals, scenariosTotals, completeCurrentLesson } = state;

  const lesson = content.lessons[currentLesson];
  const scenario = (content.scenarios ?? [])[currentScenario];

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-semibold">{content.title}</h1>
        {tab === 'learn' ? (
          <ScorePill score={learnTotals.score} total={learnTotals.total} />
        ) : (
          <ScorePill score={scenariosTotals.score} total={scenariosTotals.total} />
        )}
      </header>

      <div className="mb-3 flex gap-2">
        <button onClick={() => setTab('learn')} className={`rounded-md px-3 py-1.5 text-sm border ${tab==='learn' ? 'bg-black text-white' : 'bg-white'}`}>Learn</button>
        <button onClick={() => setTab('scenarios')} className={`rounded-md px-3 py-1.5 text-sm border ${tab==='scenarios' ? 'bg-black text-white' : 'bg-white'}`} disabled={(opts?.lockScenariosUntilLessonsDone ?? true) && !lessonsComplete} title={(opts?.lockScenariosUntilLessonsDone ?? true) && !lessonsComplete ? 'Complete all lessons to unlock scenarios' : ''}>Scenarios</button>
      </div>

      {tab === 'learn' && (
        <div className="grid gap-4">
          <div className="rounded-xl border p-3 sm:p-4 text-sm text-gray-700">
            <div className="flex items-center justify-between">
              <div><span className="font-semibold">Lesson {currentLesson + 1} of {content.lessons.length}:</span> {lesson.title}</div>
              <div className="flex gap-2">
                <button onClick={() => setCurrentLesson(i => Math.max(0, i - 1))} disabled={currentLesson === 0} className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40">Back</button>
                <button onClick={() => setCurrentLesson(i => Math.min(content.lessons.length - 1, i + 1))} disabled={!completedLessons.has(lesson.id) || currentLesson === content.lessons.length - 1} className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40" title={!completedLessons.has(lesson.id) ? 'Complete this lesson to unlock the next' : ''}>Next</button>
              </div>
            </div>
          </div>

          <LessonCard lesson={lesson} state={lessonState} setState={setLessonState} gateOptions={opts} onComplete={completeCurrentLesson} />

          <div className="rounded-xl border p-3 sm:p-4 text-sm text-gray-700">
            <div className="font-semibold">Progress</div>
            <div className="mt-1 flex flex-wrap gap-2">
              {content.lessons.map((L, idx) => (
                <span key={L.id} className={`rounded-full px-2 py-1 text-xs ${completedLessons.has(L.id) ? 'bg-emerald-100 text-emerald-700' : idx === currentLesson ? 'bg-gray-200' : 'bg-gray-100 text-gray-600'}`}>Lesson {idx + 1}</span>
              ))}
            </div>
            <div className="mt-2 text-xs text-gray-600">Scenarios unlock when all lessons are completed.</div>
          </div>
        </div>
      )}

      {tab === 'scenarios' && content.scenarios && content.scenarios.length > 0 && (
        <div className="rounded-2xl border bg-white p-4 sm:p-6 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm text-gray-500">Scenario {currentScenario + 1} of {content.scenarios.length}</div>
            <div className="flex gap-2">
              <button onClick={() => setCurrentScenario(i => Math.max(0, i - 1))} disabled={currentScenario === 0} className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40">Back</button>
              <button onClick={() => setCurrentScenario(i => Math.min(content.scenarios!.length - 1, i + 1))} disabled={currentScenario === content.scenarios.length - 1} className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40">Next</button>
            </div>
          </div>

          <ScenarioCard s={scenario} answers={scenarioAnswers} setAnswers={setScenarioAnswers} revealed={scenarioRevealed} setRevealed={setScenarioRevealed} />
        </div>
      )}

      <footer className="mt-4 text-xs text-gray-500">Built for low-cost, high-engagement learning: sequential bite-size lessons with hints and scenario practice.</footer>
    </div>
  );
}

// ---------------------------- Example Course -------------------------------

const DomesticAbuseContent: CourseContent = {
  title: 'Domestic Abuse: Learn → Scenarios',
  lessons: [
    {
      id: "L1",
      title: "Why this topic matters",
      summary: "Domestic abuse is a major safeguarding driver; children who see/hear abuse are victims in their own right.",
      bullets: [
        "Domestic abuse is a leading reason for Child-in-Need involvement.",
        "Co-occurring risks often present together (DA, parental mental ill-health, substance misuse).",
        "Law/policy: children exposed to DA are victims, not just witnesses.",
      ],
      quickChecks: [
        {
          id: "L1Q1",
          stem: "How are children framed in current policy when they see/hear domestic abuse?",
          options: [
            { id: "a", label: "They are witnesses only", correct: false, why: "This minimises harm and is outdated." },
            { id: "b", label: "They are victims in their own right", correct: true, why: "Correct—ensures access to support." },
            { id: "c", label: "Only victims if physically injured", correct: false, why: "Emotional harm counts." },
          ],
        },
      ],
      checklist: ["Know your local safeguarding pathway.", "Save emergency and support contacts."],
      hints: ["Think legal framing: policy recognises harm beyond physical injury.", "Ask yourself: does this view unlock support for the child?"],
    },
    {
      id: "L2",
      title: "Impact on children & memory",
      summary: "Exposure functions as emotional abuse; trauma affects development and recall (dates/details).",
      bullets: [
        "Risks include anxiety, hyper‑vigilance, and longer‑term health impacts (ACEs).",
        "Teens may struggle to explain risky choices; decision-making matures into early 20s.",
        "Trauma skews memory for dates—use seasonal/event anchors instead of exacts.",
      ],
      quickChecks: [
        { id: "L2Q1", stem: "When a child struggles with dates, what is best?",
          options: [
            { id: "a", label: "Press for exact dates", correct: false, why: "Can increase distress and reduce accuracy." },
            { id: "b", label: "Anchor to terms/seasons/local events", correct: true, why: "Supportive and accurate enough for notes." },
            { id: "c", label: "Skip all time references", correct: false, why: "Approximate markers still help practice." },
          ],
        },
      ],
      hints: ["Memory under stress holds feelings and anchors better than precise dates.", "Think: terms, holidays, weather, school events."],
    },
    {
      id: "L3",
      title: "Trauma‑informed conversation",
      summary: "Child‑led pace, non‑leading questions, clear confidentiality caveat, and safe closure.",
      bullets: [
        "Start with a brief confidentiality caveat (limits if someone is at risk).",
        "Listen; avoid leading/investigative questions; record keywords only.",
        "If it moves into therapy‑depth, pause and refer; end with a brief recap and grounding.",
      ],
      quickChecks: [
        { id: "L3Q1", stem: "Which opening is best?",
          options: [
            { id: "a", label: "Promise secrecy so they feel safe", correct: false, why: "Never promise secrecy in safeguarding." },
            { id: "b", label: "Calm welcome + confidentiality limits in simple language", correct: true, why: "Sets trust and boundaries." },
            { id: "c", label: "Jump straight to detailed questions", correct: false, why: "Leads and can shut down disclosure." },
          ],
        },
      ],
      checklist: ["Note‑taking: keywords, not full transcripts.", "Time‑box sessions and plan a safe close."],
      hints: ["Start by making the space safe, then the conversation.", "Plain language beats jargon, especially for caveats."],
    },
    {
      id: "L4",
      title: "Safety planning & closure",
      summary: "Check immediate risk, offer choices, agree next steps, and document factually.",
      bullets: [
        "Assess immediate safety (injuries, safe to go home, safe contacts).",
        "Offer options (support lines, trusted adults) and let the child choose.",
        "Agree next steps; document neutral facts; share how you’ll update them.",
      ],
      quickChecks: [
        { id: "L4Q1", stem: "After a disclosure, what is NOT recommended?",
          options: [
            { id: "a", label: "Agree next steps and how you’ll update", correct: false, why: "This builds trust." },
            { id: "b", label: "Give directives with no choice to reduce risk", correct: false, why: "Choice is key; directives can remove control." },
            { id: "c", label: "Offer choices and co‑decide actions", correct: true, why: "Correct approach—child‑led and safe." },
          ],
        },
      ],
      hints: ["Safety plan = simple, concrete, chosen by the child.", "Always finish with a calm, clear close and next contact."],
    },
    {
      id: "L5",
      title: "Worker wellbeing",
      summary: "Use supervision, boundaries, and grounding to prevent vicarious trauma.",
      bullets: ["Book supervision/EAP; use peer support.", "Keep sensitive material at work; practice grounding; flag caseload issues early."],
      quickChecks: [
        { id: "L5Q1", stem: "Which is a healthy next step after multiple disclosures?",
          options: [
            { id: "a", label: "Keep processing at home alone to be strong", correct: false, why: "Poor boundary; risks burnout." },
            { id: "b", label: "Schedule supervision and consider EAP/peer support", correct: true, why: "Protects you and service users." },
          ],
        },
      ],
      hints: ["If it’s heavy, don’t carry it alone—use the system built for support.", "A boundary is a safety tool, not a wall."],
    },
  ],
  scenarios: [
    { id: "s1", title: "The hallway disclosure", situation: "A 12‑year‑old quietly says, ‘Sometimes Mum and her partner fight at night,’ as class ends and other pupils are nearby.", actions: [
      { id: "s1-a1", label: "Acknowledge courage and move to a private space if safe", correct: true, why: "Contain the disclosure; protect privacy and assess immediate safety." },
      { id: "s1-a2", label: "Promise to keep the secret to build trust", correct: false, why: "Never promise secrecy; set the confidentiality caveat." },
      { id: "s1-a3", label: "Briefly explain confidentiality limits (if risk, you must share)", correct: true, why: "Clarity about limits maintains trust and meets duties." },
      { id: "s1-a4", label: "Ask lots of detailed questions to get all facts now", correct: false, why: "Avoid leading/investigative questioning; listen and note keywords." },
      { id: "s1-a5", label: "Check immediate safety (injuries, safe to go home today?)", correct: true, why: "Immediate risk guides next steps." },
    ], notes: ["Keep language calm; avoid visible shock/disbelief.", "Agree next steps and record keywords factually."] },
    { id: "s2", title: "Mixed feelings about the abuser", situation: "A teen says, ‘He hits Mum, but he also keeps us safe from the boys on our street.’", actions: [
      { id: "s2-a1", label: "Validate the complexity without minimising harm", correct: true, why: "Acknowledge ambivalence; stay focused on safety." },
      { id: "s2-a2", label: "Dismiss their view and state he is simply dangerous", correct: false, why: "Invalidates the child’s experience and can shut down disclosure." },
      { id: "s2-a3", label: "Explore safe people/places and sketch a simple safety plan", correct: true, why: "Concrete safety planning is practical and trauma‑informed." },
      { id: "s2-a4", label: "Offer options (support lines, trusted adults) and let them choose", correct: true, why: "Choice restores control and supports engagement." },
    ] },
    { id: "s3", title: "Can’t remember dates", situation: "You need timelines, but the child says, ‘I don’t know… it was cold? Maybe before Easter?’", actions: [
      { id: "s3-a1", label: "Anchor to school terms, seasons, or local events", correct: true, why: "Trauma affects recall of exact dates; use approximate anchors." },
      { id: "s3-a2", label: "Push for exact dates to avoid ambiguity", correct: false, why: "Pressure increases distress and reduces accuracy." },
      { id: "s3-a3", label: "Record approximate markers (early spring, before Easter break)", correct: true, why: "Factual, non‑leading notes suffice for next steps." },
    ] },
    { id: "s4", title: "Care worker in a rush", situation: "You have 10 minutes. The child starts sharing distressing details that edge into therapeutic territory.", actions: [
      { id: "s4-a1", label: "Explain role limits, pause deeper processing, and signpost", correct: true, why: "Stay within competence; plan referral and follow‑up." },
      { id: "s4-a2", label: "Continue deeper work so they feel heard, beyond your role", correct: false, why: "Risky; may leave them dysregulated without containment." },
      { id: "s4-a3", label: "Do a brief recap, grounding, and safe closure", correct: true, why: "Closing well reduces distress and clarifies next steps." },
    ] },
    { id: "s5", title: "Legal framing & advocacy", situation: "A colleague says, ‘The child isn’t a victim—it’s between the adults.’", actions: [
      { id: "s5-a1", label: "Clarify: children who see/hear DA are victims in their own right", correct: true, why: "Reflects policy; ensures access to support." },
      { id: "s5-a2", label: "Avoid conflict; agree they are ‘just witnesses’", correct: false, why: "Perpetuates minimisation and can block safeguarding." },
      { id: "s5-a3", label: "Prioritise safety planning and share policy resources", correct: true, why: "Advocacy + practical steps improve outcomes." },
    ] },
    { id: "s6", title: "‘Don’t tell anyone’", situation: "The young person shares a specific incident and asks you to keep it secret.", actions: [
      { id: "s6-a1", label: "Re‑state the confidentiality caveat kindly before continuing", correct: true, why: "Transparency maintains trust while meeting duties." },
      { id: "s6-a2", label: "Agree to secrecy to protect rapport", correct: false, why: "Never promise secrecy in safeguarding contexts." },
      { id: "s6-a3", label: "Ask how they want information shared and with whom", correct: true, why: "Restores control; keeps the process child‑centred." },
      { id: "s6-a4", label: "If risk is high, follow safeguarding steps and explain why", correct: true, why: "Safety overrides confidentiality when someone is at risk." },
    ] },
    { id: "s7", title: "Worker wellbeing", situation: "After several disclosures, you feel heavy and distracted at home.", actions: [
      { id: "s7-a1", label: "Book supervision and consider EAP/peer support", correct: true, why: "Structured reflection prevents vicarious trauma." },
      { id: "s7-a2", label: "Keep processing it alone at home to ‘be strong’", correct: false, why: "Poor boundary; risks burnout and intrusive thoughts." },
      { id: "s7-a3", label: "Keep sensitive material at work; practice grounding; flag caseload issues", correct: true, why: "Healthy boundaries and load management protect everyone." },
    ] },
  ],
};

export default function DomesticAbuseTrainer() {
  return <CourseTrainer content={DomesticAbuseContent} opts={{ requireCorrectToComplete: true, lockScenariosUntilLessonsDone: true }} />;
}

// ---------------------------- Minimal Self-Tests ----------------------------
function __assert(cond: boolean, msg: string) { if (!cond) throw new Error("Test failed: " + msg); }
if (typeof window === 'undefined' && (process as any)?.env?.NODE_ENV === 'test') {
  const quick: QuickCheck[] = [{ id:'q1', stem:'x', options:[{id:'a',label:'A',correct:true,why:''},{id:'b',label:'B',correct:false,why:''}] }, { id:'q2', stem:'y', options:[{id:'a',label:'A',correct:false,why:''},{id:'b',label:'B',correct:true,why:''}] }];
  const ans = { q1:'a', q2:'b' } as Record<string,string>; const rev = { q1:true, q2:true } as Record<string,boolean>;
  const s1 = calculateLessonScore(quick, ans, rev); __assert(s1.total===2,'total=2'); __assert(s1.score===2,'score=2');
  __assert(canMarkLessonComplete(quick, ans, rev, {requireCorrectToComplete:true})===true,'complete:true');
  __assert(canMarkLessonComplete(quick, ans, {q1:true,q2:false} as any, {requireCorrectToComplete:false})===false,'needs reveal');
  const acts: Action[] = [{id:'1',label:'ok',correct:true,why:''},{id:'2',label:'bad',correct:false,why:''},{id:'3',label:'ok2',correct:true,why:''}];
  const sc = scenarioSelectionScore(acts, new Set(['1']), true); __assert(sc.total===2,'scenario total'); __assert(sc.score===1,'scenario score');
}
