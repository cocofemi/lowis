import { Scenario } from "@/lib/types";
import { Checkbox } from "./checkbox";

export function ScenarioCard({
  s,
  answers,
  setAnswers,
  revealed,
  setRevealed,
}: {
  s: Scenario;
  answers: Record<string, Set<string>>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, Set<string>>>>;
  revealed: Record<string, boolean>;
  setRevealed: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) {
  const selectedIds = answers[s.id] ?? new Set<string>();
  const totalCorrect = s.actions.filter((a) => a.correct).length;
  const correctCount = s.actions.filter(
    (a) => a.correct && selectedIds.has(a.id)
  ).length;

  const toggle = (id: string) => {
    if (revealed[s.id]) return;
    setAnswers((prev) => {
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
          const border = show
            ? a.correct
              ? "border-emerald-500"
              : isWrongPick
              ? "border-rose-400"
              : "border-gray-200"
            : "border-gray-200";
          const bg = show
            ? isCorrectPick
              ? "bg-emerald-50"
              : isWrongPick
              ? "bg-rose-50"
              : "bg-white"
            : selected
            ? "bg-gray-50"
            : "bg-white";
          return (
            <div
              key={a.id}
              className={`rounded-xl border ${border} ${bg} p-3 sm:p-4 transition-colors`}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selected}
                  onChange={() => toggle(a.id)}
                  disabled={show}
                />
                <div className="min-w-0 flex-1">
                  <div className="font-medium leading-6">{a.label}</div>
                  {show && (
                    <p
                      className={`mt-1 text-sm ${
                        a.correct ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {a.why}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {!revealed[s.id] ? (
          <div className="text-sm text-gray-600">
            Select all actions you would take, then reveal the answers.
          </div>
        ) : (
          <div className="text-sm">
            <span className="font-medium">This scenario:</span> {correctCount}/
            {totalCorrect} correct selections.
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => setRevealed((prev) => ({ ...prev, [s.id]: true }))}
            disabled={revealed[s.id] || (answers[s.id]?.size ?? 0) === 0}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            {revealed[s.id] ? "Revealed" : "Reveal answers"}
          </button>
          {revealed[s.id] && (
            <button
              onClick={() => {
                setAnswers((prev) => ({ ...prev, [s.id]: new Set<string>() }));
                setRevealed((prev) => ({ ...prev, [s.id]: false }));
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
            {s.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
