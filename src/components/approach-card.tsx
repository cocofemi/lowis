import { useEffect, useMemo, useState } from "react";

export type EvaluatePayload = { id: string; answer: string };
export type EvaluateResult = {
  ok: boolean;
  score?: number;
  feedback?: string;
  error?: string;
};

export function ApproachCard({
  id,
  question,
  hints = [],
  minWords = 120,
  placeholder = "Write your approach here…",
  savedKey,
  onEvaluate,
}: {
  id: string;
  question: string;
  hints?: string[];
  minWords?: number;
  placeholder?: string;
  savedKey?: string; // optional localStorage key
  onEvaluate?: (p: EvaluatePayload) => Promise<EvaluateResult>;
}) {
  const storageKey = savedKey ?? `approach:${id}`;
  const [draft, setDraft] = useState("");
  const [showHints, setShowHints] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<EvaluateResult | null>(null);

  // Restore/save draft
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setDraft(saved);
    } catch {}
  }, [storageKey]);
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, draft);
    } catch {}
  }, [storageKey, draft]);

  const wordCount = useMemo(
    () => draft.trim().split(/\s+/).filter(Boolean).length,
    [draft]
  );
  const canSubmit = wordCount >= minWords && !submitting;

  async function handleSubmit() {
    if (!onEvaluate) return;
    if (!canSubmit) return;
    setSubmitting(true);
    setResult(null);
    try {
      const res = await onEvaluate({ id, answer: draft });
      setResult(res);
    } catch (e) {
      setResult({ ok: false, error: e?.message ?? "Failed to evaluate" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold">Approach-based question</h2>
        {hints.length > 0 && (
          <button
            type="button"
            onClick={() => setShowHints((v) => !v)}
            className="rounded-md border px-3 py-1.5 text-sm"
            aria-expanded={showHints}
          >
            {showHints ? "Hide hints" : "Show hints"}
          </button>
        )}
      </div>

      <p className="mt-1 text-gray-700">{question}</p>

      {showHints && hints.length > 0 && (
        <div className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
          <div className="mb-1 font-semibold">Hints</div>
          <ul className="list-disc pl-5 space-y-1">
            {hints.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        <label className="text-sm font-medium">
          Your response {minWords ? `(min ${minWords} words)` : ""}
        </label>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="mt-1 w-full min-h-[180px] rounded-lg border p-3 text-sm"
          placeholder={placeholder}
        />
        <div
          className={`mt-1 text-xs ${
            wordCount < minWords ? "text-rose-600" : "text-gray-600"
          }`}
        >
          Word count: {wordCount}
          {minWords ? ` / ${minWords}` : ""}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit || !onEvaluate}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          title={
            !onEvaluate
              ? "No evaluator wired yet"
              : wordCount < minWords
              ? "Reach minimum word count to submit"
              : ""
          }
        >
          {submitting ? "Submitting…" : "Submit for check"}
        </button>
        <button
          type="button"
          onClick={() => setDraft("")}
          className="rounded-lg border px-3 py-1.5 text-sm"
        >
          Clear
        </button>
      </div>

      {/* Result panel */}
      {result && (
        <div
          className={`mt-4 rounded-xl p-3 sm:p-4 text-sm ${
            result.ok
              ? "bg-emerald-50 text-emerald-900"
              : "bg-rose-50 text-rose-900"
          }`}
        >
          {result.ok ? (
            <div>
              <div className="font-semibold">Draft checked</div>
              {typeof result.score === "number" && (
                <div className="mt-1">
                  Score: {Math.round(result.score * 100)}%
                </div>
              )}
              {result.feedback && (
                <div className="mt-1 leading-6">
                  Feedback: {result.feedback}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="font-semibold">We couldn't check your draft</div>
              <div className="mt-1">{result.error ?? "Unknown error"}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
