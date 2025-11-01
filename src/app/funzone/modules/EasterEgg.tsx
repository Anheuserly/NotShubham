// /app/funzone/modules/EasterEgg.tsx
"use client";

import React, { JSX, useEffect, useRef, useState } from "react";

/**
 * EasterEgg.tsx
 * - Detects Konami code: Up Up Down Down Left Right Left Right B A
 * - When unlocked: triggers confetti, floating emoji particles, secret theme toggle
 * - Remembers unlocked state in localStorage
 */

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const STORAGE_KEY = "shubham_funzone_easter_unlocked_v1";

export default function EasterEgg(): JSX.Element {
  const [progress, setProgress] = useState<number>(0);
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI[progress];
      if (key === expected) {
        setProgress((p) => p + 1);
      } else {
        setProgress(key === KONAMI[0] ? 1 : 0);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [progress]);

  useEffect(() => {
    if (progress >= KONAMI.length) {
      unlock();
      setProgress(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  useEffect(() => {
    if (unlocked) startAnimation();
    else stopAnimation();
    return () => stopAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked]);

  function unlock() {
    setUnlocked(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    triggerConfettiCanvas();
  }

  function lock() {
    setUnlocked(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    stopAnimation();
  }

  function triggerConfettiCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = (canvas.width = canvas.clientWidth);
    const H = (canvas.height = canvas.clientHeight);
    const pieces: any[] = [];
    const colors = ["#ff4d6d", "#ffd166", "#6ee7b7", "#66b2ff", "#b39fff"];

    for (let i = 0; i < 100; i++) {
      pieces.push({
        x: Math.random() * W,
        y: Math.random() * -H,
        r: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 4 + 2,
        rot: Math.random() * Math.PI,
      });
    }

    let rafId: number;
    function render() {
      ctx.clearRect(0, 0, W, H);
      for (let p of pieces) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += 0.1;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
        ctx.restore();
        if (p.y > H + 20) {
          p.y = -10;
          p.x = Math.random() * W;
        }
      }
      rafId = requestAnimationFrame(render);
    }
    render();

    setTimeout(() => {
      cancelAnimationFrame(rafId);
      ctx.clearRect(0, 0, W, H);
    }, 3800);
  }

  /* simple floating emoji particle system when unlocked */
  function startAnimation() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = (canvas.width = canvas.clientWidth);
    let H = (canvas.height = canvas.clientHeight);
    const emojis = ["🎉", "✨", "🚀", "🌟", "🎮", "🐙", "💫"];
    const parts: any[] = [];

    for (let i = 0; i < 30; i++) {
      parts.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: Math.random() * 1 - 0.5,
        vy: Math.random() * -0.6 - 0.4,
        size: Math.random() * 28 + 14,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        rot: Math.random() * Math.PI * 2,
      });
    }

    function resize() {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W;
      canvas.height = H;
    }
    window.addEventListener("resize", resize);

    function loop() {
      ctx.clearRect(0, 0, W, H);
      for (let p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += 0.02;
        ctx.save();
        ctx.font = `${p.size}px serif`;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillText(p.emoji, 0, 0);
        ctx.restore();
        if (p.y < -40) {
          p.y = H + Math.random() * 40;
          p.x = Math.random() * W;
        }
      }
      animRef.current = requestAnimationFrame(loop);
    }
    loop();
  }

  function stopAnimation() {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <div className="w-full relative">
      <h2 className="text-2xl font-semibold">Easter Eggs</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Discover the secret — type the Konami code on your keyboard (↑ ↑ ↓ ↓ ← → ← → B A).</p>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="text-sm">Progress: {progress}/{KONAMI.length}</div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-2 mt-2 overflow-hidden">
            <div className="bg-indigo-600 h-full" style={{ width: `${(progress / KONAMI.length) * 100}%` }} />
          </div>
        </div>

        <div>
          {unlocked ? (
            <button onClick={() => lock()} className="px-3 py-2 rounded bg-red-500 text-white">Lock Secret</button>
          ) : (
            <button onClick={() => { unlockSecretManually(); }} className="px-3 py-2 rounded bg-indigo-600 text-white">Unlock (cheat)</button>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4 relative overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-40 block pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {unlocked ? (
            <div className="text-4xl animate-bounce select-none">🎉 Secret Unlocked! 🎉</div>
          ) : (
            <div className="text-xl text-gray-500 dark:text-gray-400">No secrets yet — try the Konami code!</div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => {
            if (!unlocked) {
              unlock();
            } else {
              triggerConfettiCanvas();
            }
          }}
          className="px-3 py-2 rounded bg-yellow-400 text-black"
        >
          {unlocked ? "Celebrate!" : "Unlock Secret"}
        </button>

        <button
          onClick={() => {
            setUnlocked((u) => {
              const next = !u;
              if (next) {
                try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
                startAnimation(); triggerConfettiCanvas();
              } else {
                try { localStorage.removeItem(STORAGE_KEY); } catch {}
                stopAnimation();
              }
              return next;
            });
          }}
          className="px-3 py-2 rounded bg-indigo-600 text-white"
        >
          {unlocked ? "Disable Secret" : "Toggle Secret Mode"}
        </button>
      </div>
    </div>
  );

  /* small helpers inside component scope */
  function unlockSecretManually() {
    unlock();
  }
}
