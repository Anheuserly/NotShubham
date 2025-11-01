"use client";

import React, { JSX, useEffect, useMemo, useRef, useState } from "react";

/**
 * MemoryGame.tsx
 * ----------------
 * A self-contained memory matching game with multiple difficulty levels,
 * animated flips, localStorage highscore, keyboard accessibility, and sounds.
 *
 * Usage: import and render in the FunZone page.
 *
 * Notes:
 * - Uses emoji icons for cards to avoid external assets.
 * - Uses WebAudio API for simple sound effects.
 */

/* ---------------------------
   Types & Utilities
   --------------------------- */
type Difficulty = "easy" | "medium" | "hard";

interface Card {
  id: string;
  content: string; // emoji
  matched: boolean;
  flipped: boolean;
  index: number;
}

/* small helper to generate unique IDs */
const uid = (prefix = "") => `${prefix}${Math.random().toString(36).slice(2, 9)}`;

/* emoji pool (expandable) */
const EMOJI_POOL = [
  "🍉","🍊","🍓","🍍","🥝","🍇","🍒","🍋",
  "🚀","🛰️","🛸","✈️","⛵","🏍️","🚲","🛵",
  "🎮","🕹️","🎲","♟️","🧩","🪄","🎯","🏆",
  "😺","🐶","🦊","🐼","🐯","🦁","🐵","🐸",
  "🌟","✨","🔥","⚡","💧","🌈","❄️","🍂",
  "🎵","🎧","🎤","🎸","🥁","🎹","📯","🎻",
];

/* Difficulty settings */
const DIFFICULTY_SETTINGS: Record<
  Difficulty,
  { pairs: number; cols: number; label: string }
> = {
  easy: { pairs: 6, cols: 3, label: "Easy (3×4)" },    // 12 cards (3 columns)
  medium: { pairs: 10, cols: 5, label: "Medium (5×4)" }, // 20 cards (5 columns)
  hard: { pairs: 15, cols: 6, label: "Hard (6×5)" },    // 30 cards (6 columns)
};

/* LocalStorage key */
const STORAGE_KEY = "shubham_memory_highscores_v1";

/* Get high scores object or default */
function getHighscores(): Record<string, { bestTime: number | null; bestMoves: number | null }> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function setHighscore(difficulty: Difficulty, time: number, moves: number) {
  try {
    const all = getHighscores();
    const key = difficulty;
    const prev = all[key] || { bestTime: null, bestMoves: null };
    let updated = false;
    if (prev.bestTime === null || time < prev.bestTime) {
      prev.bestTime = time;
      updated = true;
    }
    if (prev.bestMoves === null || moves < prev.bestMoves) {
      prev.bestMoves = moves;
      updated = true;
    }
    if (updated) {
      all[key] = prev;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    }
  } catch (e) {
    // ignore storage errors
  }
}

/* Simple formatting */
const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

/* ---------------------------
   SoundManager (WebAudio)
   --------------------------- */
class SoundManager {
  ctx: AudioContext | null = null;
  gain: GainNode | null = null;

  ensureContext() {
    if (!this.ctx) {
      // some browsers require user gesture to start audio; this is best-effort
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gain = this.ctx.createGain();
      this.gain.gain.value = 0.12;
      this.gain.connect(this.ctx.destination);
    }
  }

  playBeep = (freq = 440, duration = 0.08, type: OscillatorType = "sine") => {
    try {
      if (!this.ctx) this.ensureContext();
      if (!this.ctx) return;
      const o = this.ctx.createOscillator();
      o.type = type;
      o.frequency.value = freq;
      const g = this.ctx.createGain();
      g.gain.value = 0.0001;
      o.connect(g);
      g.connect(this.gain!);
      const now = this.ctx.currentTime;
      g.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, now + duration);
      o.start(now);
      o.stop(now + duration + 0.02);
    } catch (e) {
      // ignore
    }
  };

  playSuccess = () => {
    this.playBeep(880, 0.05, "triangle");
    setTimeout(() => this.playBeep(660, 0.06, "sine"), 70);
    setTimeout(() => this.playBeep(990, 0.06, "sine"), 140);
  };

  playFlip = () => {
    this.playBeep(1100, 0.04, "sine");
  };

  playMismatch = () => {
    this.playBeep(200, 0.14, "sawtooth");
  };
}

const audio = new SoundManager();

/* ---------------------------
   Confetti Helper
   --------------------------- */
function triggerConfetti(canvas: HTMLCanvasElement | null) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = (canvas.width = window.innerWidth);
  const H = (canvas.height = 300);
  const particles: Array<any> = [];
  const colors = ["#ff4d6d", "#ffd166", "#6ee7b7", "#66b2ff", "#b39fff"];
  for (let i = 0; i < 140; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * -H,
      r: Math.random() * 6 + 4,
      d: Math.random() * 50 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 10,
      tiltAngleIncremental: Math.random() * 0.07 + 0.05,
      tiltAngle: 0,
    });
  }

  let angle = 0;
  let timer: number;

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.r / 2 + 2);
      ctx.lineTo(p.x + p.tilt - p.r / 2, p.y);
      ctx.fill();
    }
  };

  const update = () => {
    angle += 0.01;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.tiltAngle += p.tiltAngleIncremental;
      p.x += Math.sin(angle + p.d) * 2;
      p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
      p.tilt = Math.sin(p.tiltAngle) * 15;
      if (p.y > H + 20) {
        p.x = Math.random() * W;
        p.y = -10;
      }
    }
  };

  const frame = () => {
    draw();
    update();
    timer = requestAnimationFrame(frame);
  };

  frame();

  setTimeout(() => {
    cancelAnimationFrame(timer);
    if (ctx) ctx.clearRect(0, 0, W, H);
  }, 4000);
}

/* ---------------------------
   MemoryGame Component
   --------------------------- */
export default function MemoryGame(): JSX.Element {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [cards, setCards] = useState<Card[]>([]);
  const [first, setFirst] = useState<number | null>(null);
  const [second, setSecond] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [timeSec, setTimeSec] = useState(0);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [locked, setLocked] = useState(false);
  const [gridCols, setGridCols] = useState(DIFFICULTY_SETTINGS["medium"].cols);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [highscores, setHighscores] = useState(getHighscores());
  const [focused, setFocused] = useState<number | null>(null); // for keyboard nav

  /* Generate a new deck based on difficulty */
  const generateDeck = (diff: Difficulty) => {
    const pairs = DIFFICULTY_SETTINGS[diff].pairs;
    setGridCols(DIFFICULTY_SETTINGS[diff].cols);
    // shuffle pool and take first pairs
    const pool = [...EMOJI_POOL].sort(() => Math.random() - 0.5).slice(0, pairs);
    const pairCards: Card[] = [];
    pool.forEach((emoji, i) => {
      const a: Card = {
        id: uid("c-"),
        content: emoji,
        matched: false,
        flipped: false,
        index: pairCards.length,
      };
      const b: Card = {
        id: uid("c-"),
        content: emoji,
        matched: false,
        flipped: false,
        index: pairCards.length + 1,
      };
      pairCards.push(a, b);
    });
    // final shuffle
    const shuffled = pairCards
      .map((c) => ({ sort: Math.random(), card: c }))
      .sort((a, b) => a.sort - b.sort)
      .map((s, idx) => ({ ...s.card, index: idx }));
    return shuffled;
  };

  /* Reset / Start game */
  const startGame = (diff: Difficulty = difficulty) => {
    const newDeck = generateDeck(diff);
    setCards(newDeck);
    setFirst(null);
    setSecond(null);
    setMoves(0);
    setTimeSec(0);
    setRunning(false);
    setPaused(false);
    setLocked(false);
    setFocused(null);
    setDifficulty(diff);
    setGridCols(DIFFICULTY_SETTINGS[diff].cols);
    // clear and set highscores from storage
    setHighscores(getHighscores());
  };

  /* Initialize on mount */
  useEffect(() => {
    startGame(difficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Timer effect */
  useEffect(() => {
    if (running && !paused) {
      timerRef.current = window.setInterval(() => {
        setTimeSec((t) => t + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [running, paused]);

  /* check win condition */
  useEffect(() => {
    if (cards.length && cards.every((c) => c.matched)) {
      setRunning(false);
      audio.playSuccess();
      // update highscores
      setHighscore(difficulty, timeSec, moves);
      setHighscores(getHighscores());
      // confetti
      triggerConfetti(confettiCanvasRef.current);
      // spotlight last flip
      setHighlightIndex(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  /* Flip handler */
  const flipCard = (index: number) => {
    if (locked) return;
    if (!running) setRunning(true);
    const c = cards[index];
    if (c.flipped || c.matched) return;

    audio.playFlip();

    // flip
    const clone = cards.slice();
    clone[index] = { ...clone[index], flipped: true };
    setCards(clone);

    if (first === null) {
      setFirst(index);
      setFocused(index);
      return;
    }

    if (first !== null && second === null) {
      setSecond(index);
      setMoves((m) => m + 1);
      setLocked(true);

      // check match
      const a = clone[first];
      const b = clone[index];

      if (a.content === b.content) {
        // match after short delay for animation
        setTimeout(() => {
          const updated = clone.slice();
          updated[first!] = { ...updated[first!], matched: true };
          updated[index] = { ...updated[index], matched: true };
          setCards(updated);
          setFirst(null);
          setSecond(null);
          setLocked(false);
          audio.playSuccess();
        }, 450);
      } else {
        // mismatch -> flip back
        setTimeout(() => {
          const updated = clone.slice();
          updated[first!] = { ...updated[first!], flipped: false };
          updated[index] = { ...updated[index], flipped: false };
          setCards(updated);
          setFirst(null);
          setSecond(null);
          setLocked(false);
          audio.playMismatch();
        }, 800);
      }
    }
  };

  /* Keyboard navigation support (arrow keys + Enter) */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!cards.length) return;
      const total = cards.length;
      const cols = gridCols;
      if (e.key === "ArrowRight") {
        setFocused((f) => {
          if (f === null) return 0;
          return (f + 1) % total;
        });
      } else if (e.key === "ArrowLeft") {
        setFocused((f) => {
          if (f === null) return 0;
          return (f - 1 + total) % total;
        });
      } else if (e.key === "ArrowDown") {
        setFocused((f) => {
          if (f === null) return 0;
          return (f + cols) % total;
        });
      } else if (e.key === "ArrowUp") {
        setFocused((f) => {
          if (f === null) return 0;
          return (f - cols + total) % total;
        });
      } else if (e.key === "Enter" || e.key === " ") {
        if (focused !== null) {
          flipCard(focused);
        }
      } else if (e.key.toLowerCase() === "p") {
        // quick pause toggle
        setPaused((p) => !p);
      } else if (e.key.toLowerCase() === "r") {
        startGame(difficulty);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, gridCols, focused, difficulty, locked]);

  /* Pause toggle */
  const togglePause = () => {
    setPaused((p) => !p);
  };

  /* Restart */
  const restart = () => {
    startGame(difficulty);
  };

  /* Change difficulty */
  const changeDifficulty = (d: Difficulty) => {
    startGame(d);
  };

  /* compute star rating based on moves/time vs optimal baseline (simple heuristic) */
  const starRating = useMemo(() => {
    const pairs = DIFFICULTY_SETTINGS[difficulty].pairs;
    const optimalMoves = pairs; // minimal = pairs (every turn finds a pair) unrealistic but baseline
    const ratio = moves / Math.max(1, optimalMoves);
    // rating from 0..3
    if (ratio <= 1.6 && timeSec <= pairs * 8) return 3;
    if (ratio <= 2.6 && timeSec <= pairs * 16) return 2;
    return 1;
  }, [moves, timeSec, difficulty]);

  /* Render helpers */
  const cardClasses = (c: Card, idx: number) =>
    `relative w-full aspect-[4/5] rounded-lg perspective-1000 select-none 
     ${c.flipped || c.matched ? "" : "cursor-pointer"} 
     ${c.matched ? "opacity-80" : "opacity-100"}
     transform transition-transform duration-300`;

  const frontFace = `absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-3xl`;
  const backFace = `absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-pink-500 rounded-lg text-white transform rotateY-180`;

  /* Accessible label for card */
  const cardAria = (c: Card) =>
    c.matched ? `Matched card: ${c.content}` : c.flipped ? `Face up card: ${c.content}` : "Face down card";

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Memory Game</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Match the pairs. Use arrow keys + Enter to navigate. Press <kbd className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">P</kbd> to pause, <kbd className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">R</kbd> to restart.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
            <div className="text-xs text-gray-500">Moves</div>
            <div className="text-lg font-semibold">{moves}</div>
          </div>

          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
            <div className="text-xs text-gray-500">Time</div>
            <div className="text-lg font-semibold">{formatTime(timeSec)}</div>
          </div>

          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm px-3">
            <div className="text-xs text-gray-500">Stars</div>
            <div className="text-lg font-semibold">{"★".repeat(starRating)}{"☆".repeat(3 - starRating)}</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => restart()}
              className="px-3 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:brightness-95 transition"
              title="Restart"
            >
              Restart
            </button>
            <button
              onClick={() => togglePause()}
              className="px-3 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:brightness-95 transition"
              title="Pause / Resume"
            >
              {paused ? "Resume" : "Pause"}
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
          <button
            key={d}
            onClick={() => changeDifficulty(d)}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              difficulty === d ? "bg-indigo-600 text-white" : "bg-white dark:bg-gray-800"
            }`}
          >
            {DIFFICULTY_SETTINGS[d].label}
          </button>
        ))}

        <div className="ml-4 text-sm text-gray-600 dark:text-gray-300">
          Best:{" "}
          <span className="font-medium">
            {(() => {
              const hs = highscores[difficulty];
              if (!hs || (hs.bestTime === null && hs.bestMoves === null)) return "—";
              return `${hs.bestTime !== null ? formatTime(hs.bestTime) : "—"} / ${hs.bestMoves ?? "—"} moves`;
            })()}
          </span>
        </div>
      </div>

      {/* Game board */}
      <div ref={boardRef} className="w-full">
        <div
          className={`grid gap-4`}
          style={{
            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
          }}
          role="grid"
          aria-label="Memory game board"
        >
          {cards.map((c, idx) => {
            const isFocused = focused === idx;
            return (
              <div
                key={c.id}
                role="gridcell"
                aria-label={cardAria(c)}
                tabIndex={0}
                onClick={() => flipCard(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    flipCard(idx);
                  }
                }}
                className={`relative transform perspective-1000 ${isFocused ? "ring-4 ring-indigo-400" : ""}`}
                style={{ outline: "none" }}
                onFocus={() => setFocused(idx)}
                onBlur={() => {
                  // keep focused id if user clicked elsewhere
                }}
              >
                {/* card container */}
                <div
                  className={`${cardClasses(c, idx)} ${c.flipped || c.matched ? "rotateY-180" : ""}`}
                  style={{
                    minHeight: 96,
                    perspective: 1000,
                    transformStyle: "preserve-3d",
                  } as React.CSSProperties}
                >
                  {/* back - hidden when flipped */}
                  <div
                    className={`absolute inset-0 backface-hidden ${!c.flipped && !c.matched ? "" : "opacity-0 pointer-events-none"}`}
                    style={{
                      transform: c.flipped || c.matched ? "rotateY(180deg)" : "rotateY(0deg)",
                      transition: "transform 400ms ease, opacity 300ms",
                    } as React.CSSProperties}
                  >
                    <div className={backFace}></div>
                  </div>

                  {/* front - shows emoji when flipped */}
                  <div
                    className={`absolute inset-0 backface-hidden ${c.flipped || c.matched ? "" : "opacity-0 pointer-events-none"}`}
                    style={{
                      transform: c.flipped || c.matched ? "rotateY(0deg)" : "rotateY(-180deg)",
                      transition: "transform 400ms ease, opacity 300ms",
                    } as React.CSSProperties}
                  >
                    <div className={frontFace}>
                      <span className="text-4xl select-none">{c.content}</span>
                    </div>
                  </div>
                </div>

                {/* small overlay for matched */}
                {c.matched && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow">
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    {/* confetti canvas (positioned absolutely inside module container) */}
      <canvas
        ref={(el) => {
          confettiCanvasRef.current = el;
        }}
        className="w-full pointer-events-none mt-6"
      />

      {/* footer / help */}
      <div className="mt-6 text-sm text-gray-600 dark:text-gray-300">
        Tip: Use arrow keys to move focus, Enter to flip. Pause/resume with{" "}
        <strong>P</strong>. Restart with <strong>R</strong>.
      </div>
    </div>
  );
}