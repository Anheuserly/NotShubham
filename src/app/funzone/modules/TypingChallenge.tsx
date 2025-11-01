// /app/funzone/modules/TypingChallenge.tsx
"use client";

import React, { JSX, useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * TypingChallenge.tsx
 * --------------------
 * Feature-rich typing test:
 * - Multiple test modes (time-based, word-count)
 * - Passage selection with randomization & custom text input
 * - WPM, CPM, accuracy, mistakes tracking
 * - Live per-character correctness rendering and caret
 * - Keyboard accessibility and shortcuts
 * - LocalStorage leaderboard per mode & difficulty
 * - Simple sparkline chart via canvas for speed over time
 *
 * Paste Part 1, Part 2, Part 3 sequentially into TypingChallenge.tsx
 */

/* -----------------------
   Types & Utilities
   ----------------------- */
type Mode = "time" | "words";
type Difficulty = "easy" | "medium" | "hard";

interface StatSnapshot {
  timestamp: number;
  wpm: number;
  cpm: number;
  accuracy: number;
}

interface Result {
  id: string;
  name?: string;
  mode: Mode;
  difficulty: Difficulty;
  wpm: number;
  cpm: number;
  accuracy: number;
  timeSec: number;
  timestamp: number;
}

const uid = (p = "") => `${p}${Math.random().toString(36).slice(2, 9)}`;

const STORAGE_KEY = "shubham_typing_leaderboard_v1";

/* small set of passages (you can add more or load remotely) */
const DEFAULT_PASSAGES: Record<Difficulty, string[]> = {
  easy: [
    "The quick brown fox jumps over the lazy dog.",
    "Bright stars dotted the silent night sky.",
    "Coding is fun when patience meets curiosity.",
  ],
  medium: [
    "Small teams with clear communication deliver reliable software with surprising speed.",
    "In modern web development, progressive enhancement and graceful degradation remain important.",
    "Designers and engineers collaborate to make delightful user experiences that scale.",
  ],
  hard: [
    "Concurrency introduces complexity: deadlocks, race conditions and difficult-to-reproduce bugs demand deliberate design.",
    "Optimizing runtime requires measurement, not assumption — benchmark before you optimize and profile hot paths.",
    "Cryptographic primitives are easy to misuse; rely on well-tested libraries and secure defaults rather than inventing schemes.",
  ],
};

/* basic helpers */
const nowSec = () => Math.floor(Date.now() / 1000);

const clamp = (v: number, a = 0, b = 99999) => Math.max(a, Math.min(b, v));

/* WPM calculation helpers
   - wpm based on correctly typed characters / 5 / minutes
*/
function computeWpm(correctChars: number, elapsedSec: number) {
  if (elapsedSec <= 0) return 0;
  const words = correctChars / 5;
  const minutes = elapsedSec / 60;
  return Math.round(words / minutes);
}

function computeCpm(correctChars: number, elapsedSec: number) {
  if (elapsedSec <= 0) return 0;
  const minutes = elapsedSec / 60;
  return Math.round(correctChars / minutes);
}

/* accuracy: correct chars / attempted chars * 100 */
function computeAccuracy(correct: number, attempted: number) {
  if (attempted === 0) return 100;
  return Math.round((correct / attempted) * 100);
}

/* load leaderboard from storage */
function loadLeaderboard(): Result[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Result[];
  } catch {
    return [];
  }
}

function saveResultToLeaderboard(res: Result) {
  try {
    const all = loadLeaderboard();
    all.push(res);
    // keep last 200
    const trimmed = all.slice(-200);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // ignore
  }
}

/* Keyboard shortcuts mapping */
const SHORTCUTS = {
  startPause: "p",
  restart: "r",
  toggleMode: "m",
  randomPassage: "space",
};

/* -----------------------
   Part 1 Export note
   -----------------------
   Continue to Part 2 and Part 3 to complete the component.
*/
/* -----------------------
   Part 2: Component core + UI (controls + typing area)
   ----------------------- */

export default function TypingChallenge(): JSX.Element {
  /* Mode & difficulty */
  const [mode, setMode] = useState<Mode>("time");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  /* selected passage (string) and split chars */
  const [passage, setPassage] = useState<string>(() =>
    pickRandomPassage("medium")
  );
  const [chars, setChars] = useState<string[]>(() => splitToChars(passage));

  /* typing state */
  const [position, setPosition] = useState(0); // current caret index
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptedCount, setAttemptedCount] = useState(0);
  const [mistakes, setMistakes] = useState<Record<number, string>>({}); // index -> typed char
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [endedAt, setEndedAt] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);

  /* mode params */
  const [timeLimit, setTimeLimit] = useState(60); // seconds for time mode
  const [wordCountTarget, setWordCountTarget] = useState(50); // words for words mode

  /* UI helpers */
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);

  /* stats over time (for sparkline) */
  const [snapshots, setSnapshots] = useState<StatSnapshot[]>([]);

  /* leaderboard preview */
  const [leaderboard, setLeaderboard] = useState<Result[]>(() => loadLeaderboard().reverse());

  /* effect: update chars when passage or difficulty changes */
  useEffect(() => {
    setChars(splitToChars(passage));
    resetSession(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passage, difficulty]);

  /* timer tick effect */
  useEffect(() => {
    if (!running || paused) return undefined;
    const interval = window.setInterval(() => {
      tickSnapshot();
      // if time mode, stop when timeLimit reached
      if (mode === "time" && startedAt) {
        const elapsed = nowSec() - startedAt;
        if (elapsed >= timeLimit) {
          finishSession();
        }
      }
      // if words mode, stop when enough words typed (approx by correct chars/5)
      if (mode === "words") {
        const wordsTyped = Math.floor(correctCount / 5);
        if (wordsTyped >= wordCountTarget) {
          finishSession();
        }
      }
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, paused, startedAt, correctCount, mode, timeLimit, wordCountTarget]);

  /* keyboard shortcuts (global) */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        toggleStartPause();
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        restart();
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        setMode((m) => (m === "time" ? "words" : "time"));
      } else if (e.code === "Space" && (e.target as HTMLElement)?.tagName !== "INPUT" && (e.target as HTMLElement)?.tagName !== "TEXTAREA") {
        e.preventDefault();
        // random passage
        setPassage(pickRandomPassage(difficulty));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [difficulty]);

  /* -----------------------
     Typing input handler
     ----------------------- */

  const handleInput = useCallback(
    (typed: string) => {
      if (endedAt) return;
      if (!running && !paused) {
        setRunning(true);
        setStartedAt(nowSec());
      }
      if (paused) return;

      // typed is the full textarea value; we will compute delta from prior position
      const newPos = Math.min(typed.length, chars.length);
      // determine change direction (supports backspace)
      if (newPos < position) {
        // user deleted characters
        // adjust attempted/correct/mistakes accordingly: recompute from scratch for simplicity
        recomputeFromString(typed);
        setPosition(newPos);
        return;
      }

      // if adding new characters
      for (let i = position; i < newPos; i++) {
        const expected = chars[i] ?? "";
        const actual = typed[i] ?? "";
        setAttemptedCount((a) => a + 1);
        if (actual === expected) {
          setCorrectCount((c) => c + 1);
          setMistakes((m) => {
            const clone = { ...m };
            delete clone[i];
            return clone;
          });
        } else {
          setMistakes((m) => ({ ...m, [i]: actual }));
        }
        setPosition((p) => p + 1);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [position, chars, running, paused, endedAt]
  );

  /* recompute totals from a given typed string (used if user backspaces) */
  function recomputeFromString(typed: string) {
    let correct = 0;
    let attempted = 0;
    const m: Record<number, string> = {};
    for (let i = 0; i < typed.length && i < chars.length; i++) {
      attempted++;
      if (typed[i] === chars[i]) correct++;
      else m[i] = typed[i];
    }
    setCorrectCount(correct);
    setAttemptedCount(attempted);
    setMistakes(m);
  }

  /* called every second to sample stats */
  function tickSnapshot() {
    const elapsed = startedAt ? nowSec() - startedAt : 0;
    const wpm = computeWpm(correctCount, elapsed);
    const cpm = computeCpm(correctCount, elapsed);
    const accuracy = computeAccuracy(correctCount, attemptedCount);
    setSnapshots((s) => {
      const next = [...s, { timestamp: Date.now(), wpm, cpm, accuracy }];
      // keep last 120 samples
      return next.slice(-120);
    });
  }

  /* start/pause toggle */
  function toggleStartPause() {
    if (endedAt) {
      // if finished, restart
      restart();
      return;
    }
    if (!running) {
      setRunning(true);
      setStartedAt((s) => s ?? nowSec());
      setPaused(false);
      return;
    }
    setPaused((p) => !p);
  }

  /* restart session: optionally pick new passage */
  function restart(newPassage = false) {
    if (newPassage) setPassage(pickRandomPassage(difficulty));
    resetSession(true);
  }

  function resetSession(clearPassage = false) {
    setPosition(0);
    setCorrectCount(0);
    setAttemptedCount(0);
    setMistakes({});
    setStartedAt(null);
    setEndedAt(null);
    setRunning(false);
    setPaused(false);
    setSnapshots([]);
    if (clearPassage) {
      setPassage((p) => pickRandomPassage(difficulty));
    }
    // clear input
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }

  /* finish: compute result and save */
  function finishSession() {
    if (!startedAt) return;
    const end = nowSec();
    setEndedAt(end);
    setRunning(false);
    setPaused(false);

    const elapsed = end - startedAt;
    const wpm = computeWpm(correctCount, elapsed);
    const cpm = computeCpm(correctCount, elapsed);
    const accuracy = computeAccuracy(correctCount, attemptedCount);

    const res: Result = {
      id: uid("r-"),
      name: undefined,
      mode,
      difficulty,
      wpm,
      cpm,
      accuracy,
      timeSec: elapsed,
      timestamp: Date.now(),
    };

    saveResultToLeaderboard(res);
    setLeaderboard(loadLeaderboard().reverse());
  }

  /* when user manually reaches end of passage */
  useEffect(() => {
    if (position >= chars.length && chars.length > 0 && running) {
      // finalize
      finishSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, chars, running]);

  /* allow clicking passage to focus input */
  const focusInput = () => {
    inputRef.current?.focus();
  };

  /* expose a small helper for user to type custom passage */
  const [customText, setCustomText] = useState("");
  const applyCustomPassage = () => {
    if (!customText.trim()) return;
    setPassage(customText.trim());
  };

  /* derived stats for UI */
  const elapsedSec = useMemo(() => {
    if (!startedAt) return 0;
    if (endedAt) return endedAt - startedAt;
    const now = nowSec();
    return now - startedAt;
  }, [startedAt, endedAt]);

  const wpmNow = useMemo(() => computeWpm(correctCount, elapsedSec), [correctCount, elapsedSec]);
  const cpmNow = useMemo(() => computeCpm(correctCount, elapsedSec), [correctCount, elapsedSec]);
  const accuracyNow = useMemo(() => computeAccuracy(correctCount, attemptedCount), [correctCount, attemptedCount]);

  /* small UX: ensure focus when starting */
  useEffect(() => {
    if (running && !paused) inputRef.current?.focus();
  }, [running, paused]);

  /* render passage characters with status */
  function renderChar(i: number) {
    const expected = chars[i] ?? "";
    const typed = mistakes[i] ?? (i < position ? expected : "");
    const state =
      i < position ? (mistakes[i] ? "wrong" : "correct") : i === position ? "current" : "pending";

    const base = "inline-block whitespace-pre-wrap";
    const cls =
      state === "correct"
        ? "text-green-600"
        : state === "wrong"
        ? "text-red-500 line-through"
        : state === "current"
        ? "text-indigo-600 underline"
        : "text-gray-600 dark:text-gray-300";

    return (
      <span key={`ch-${i}`} className={`${base} ${cls}`}>
        {expected}
      </span>
    );
  }

  /* remainder of UI & controls lives in Part 3 (leaderboard, canvas sparkline, extra features) */
/* -----------------------
   Part 3: Remaining UI, leaderboard, sparkline, sound, export
   ----------------------- */

  /* canvas ref for sparkline */
  const sparkRef = useRef<HTMLCanvasElement | null>(null);

  /* draw sparkline for snapshots */
  useEffect(() => {
    const canvas = sparkRef.current;
    if (!canvas || snapshots.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const DPR = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    ctx.scale(DPR, DPR);
    ctx.clearRect(0, 0, w, h);

    const data = snapshots.map((s) => s.wpm);
    const max = Math.max(60, ...data);
    const min = Math.min(0, ...data);

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#6366F1";
    data.forEach((v, idx) => {
      const x = (idx / Math.max(1, data.length - 1)) * w;
      const y = h - ((v - min) / Math.max(1, max - min)) * h;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // fill gradient
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "rgba(99,102,241,0.12)");
    grad.addColorStop(1, "rgba(99,102,241,0.02)");
    ctx.fillStyle = grad;
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();
  }, [snapshots]);

  /* quick share: export last result as JSON */
  function exportLastResult() {
    const last = loadLeaderboard().slice(-1)[0];
    if (!last) {
      alert("No results to export yet.");
      return;
    }
    const blob = new Blob([JSON.stringify(last, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `typing-result-${last.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* clear leaderboard */
  function clearLeaderboard() {
    if (!confirm("Clear saved leaderboard? This cannot be undone.")) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
      setLeaderboard([]);
    } catch {
      // ignore
    }
  }

  /* small beep sound for correct char (WebAudio simple) */
  const audioCtxRef = useRef<AudioContext | null>(null);
  function beep(freq = 800, duration = 0.04) {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current!;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      o.frequency.value = freq;
      g.gain.value = 0.02;
      o.start();
      g.gain.setTargetAtTime(0.0001, ctx.currentTime + duration, 0.01);
      setTimeout(() => {
        try {
          o.stop();
          o.disconnect();
          g.disconnect();
        } catch {}
      }, duration * 1000 + 50);
    } catch {}
  }

  /* effect: play beep on correct char and small buzz on wrong */
  useEffect(() => {
    if (!running || paused) return;
    // last snapshot was pushed already each second; instead react to attemptedCount changes
    // we can watch mistakes map size; but to keep simple, bump sounds on attempted changes
    // NOTE: simple heuristic: if attemptedCount changed, decide last char correctness
    // We'll implement by tracking previous attemptedCount via ref
    const prevAttempt = { val: attemptedCount };
    const onAttemptChange = () => {
      // noop placeholder, handled by the outer effect below
    };
    return () => {
      // noop
    };
  }, [running, paused]); // placeholder to reserve behavior

  /* small helper to handle textarea change */
  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    handleInput(v);
    // optional: sound for last char
    const lastIndex = v.length - 1;
    if (lastIndex >= 0) {
      const expected = chars[lastIndex] ?? "";
      if (v[lastIndex] === expected) {
        beep(900, 0.02);
      } else {
        beep(220, 0.05);
      }
    }
  };

  /* small UI: keyboard-friendly placeholder for the typed area */
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Typing Challenge</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Mode: {mode === "time" ? `${timeLimit}s` : `${wordCountTarget} words`} — Difficulty: {difficulty}
          </p>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <div className="flex gap-2">
            <button
              onClick={() => {
                restart(true);
              }}
              className="px-3 py-2 rounded-lg bg-yellow-400 text-black font-semibold"
            >
              New Passage
            </button>
            <button onClick={() => toggleStartPause()} className="px-3 py-2 rounded-lg bg-indigo-600 text-white font-semibold">
              {running && !paused ? "Pause" : "Start"}
            </button>
            <button onClick={() => restart()} className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700">
              Restart
            </button>
          </div>
        </div>
      </div>

      {/* controls row */}
      <div className="flex flex-wrap gap-3 items-center mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm">Mode</label>
          <select value={mode} onChange={(e) => setMode(e.target.value as Mode)} className="ml-2 px-2 py-1 rounded">
            <option value="time">Time</option>
            <option value="words">Words</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm">Difficulty</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)} className="ml-2 px-2 py-1 rounded">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {mode === "time" ? (
          <div className="flex items-center gap-2">
            <label className="text-sm">Seconds</label>
            <input type="number" value={timeLimit} onChange={(e) => setTimeLimit(clamp(Number(e.target.value), 10, 600))} className="w-20 px-2 py-1 rounded" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <label className="text-sm">Words</label>
            <input type="number" value={wordCountTarget} onChange={(e) => setWordCountTarget(clamp(Number(e.target.value), 10, 1000))} className="w-20 px-2 py-1 rounded" />
          </div>
        )}

        <div className="ml-auto flex items-center gap-3">
          <button onClick={() => exportLastResult()} className="px-3 py-2 rounded bg-green-600 text-white">Export</button>
          <button onClick={() => clearLeaderboard()} className="px-3 py-2 rounded bg-red-500 text-white">Clear Scores</button>
        </div>
      </div>

      {/* passage display */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow mb-4">
        <div onClick={focusInput} ref={boardRef} className="prose whitespace-pre-wrap cursor-text text-gray-700 dark:text-gray-200" aria-hidden>
          {chars.map((_, i) => renderChar(i))}
        </div>
      </div>

      {/* typing area */}
      <div>
        <textarea
          ref={inputRef}
          onChange={onTextAreaChange}
          placeholder="Start typing here..."
          className="w-full min-h-[120px] p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-lg"
          aria-label="Typing input"
        />
      </div>

      {/* stats row */}
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <div className="bg-white dark:bg-gray-800 p-3 rounded shadow">
          <div className="text-xs text-gray-500">WPM</div>
          <div className="text-2xl font-semibold">{wpmNow}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded shadow">
          <div className="text-xs text-gray-500">CPM</div>
          <div className="text-2xl font-semibold">{cpmNow}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded shadow">
          <div className="text-xs text-gray-500">Accuracy</div>
          <div className="text-2xl font-semibold">{accuracyNow}%</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded shadow">
          <div className="text-xs text-gray-500">Time</div>
          <div className="text-2xl font-semibold">{formatTimeDisplay(elapsedSec)}</div>
        </div>

        <div className="flex-1">
          <canvas ref={sparkRef} className="w-full h-16" />
        </div>
      </div>

      {/* custom passage area */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <textarea value={customText} onChange={(e) => setCustomText(e.target.value)} placeholder="Paste custom text / passage here to test" className="w-full rounded p-3 min-h-[120px] bg-white dark:bg-gray-800 border" />
        </div>
        <div className="space-y-2">
          <button onClick={() => { setPassage(pickRandomPassage(difficulty)); resetSession(true); }} className="w-full px-3 py-2 rounded bg-indigo-600 text-white">Random Passage</button>
          <button onClick={() => applyCustomPassage()} className="w-full px-3 py-2 rounded bg-green-600 text-white">Apply Custom</button>
          <button onClick={() => { navigator.clipboard?.writeText(passage); alert("Passage copied"); }} className="w-full px-3 py-2 rounded bg-gray-200">Copy Passage</button>
        </div>
      </div>

      {/* leaderboard */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">Leaderboard (recent)</h3>
        {leaderboard.length === 0 ? (
          <div className="text-sm text-gray-500">No scores yet — take a test to record your first result.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {leaderboard.slice(0, 9).map((r) => (
              <div key={r.id} className="bg-white dark:bg-gray-800 p-3 rounded shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{r.name ?? "Anonymous"}</div>
                    <div className="text-xs text-gray-500">{new Date(r.timestamp).toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-2xl">{r.wpm}</div>
                    <div className="text-xs text-gray-500">{r.mode === "time" ? `${r.timeSec}s` : `${Math.round(r.timeSec / 60)}m`}</div>
                  </div>
                </div>
                <div className="mt-2 text-xs">
                  <div>Accuracy: {r.accuracy}%</div>
                  <div>CPM: {r.cpm}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 text-sm text-gray-500">
        Shortcuts: <strong>P</strong> start/pause • <strong>R</strong> restart • <strong>M</strong> toggle mode • <strong>Space</strong> random passage
      </div>
    </div>
  );

  /* -----------------------
     helper functions inside file
     ----------------------- */

  function formatTimeDisplay(sec: number) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }
}

/* -----------------------
   Helper functions (shared)
   ----------------------- */

function splitToChars(s: string) {
  // keep whitespace and newlines as separate entries
  return Array.from(s);
}

function pickRandomPassage(difficulty: Difficulty) {
  const arr = DEFAULT_PASSAGES[difficulty] ?? DEFAULT_PASSAGES["medium"];
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}
