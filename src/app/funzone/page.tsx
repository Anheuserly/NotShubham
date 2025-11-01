"use client";
import React, { Suspense, lazy, useState } from "react";
import Navigation from "../../components/Navigation";
import { JSX } from "react/jsx-runtime";

const ParticleCanvas = lazy(() => import("./modules/ParticleCanvas"));
const MemoryGame = lazy(() => import("./modules/MemoryGame"));
const ColorMixer = lazy(() => import("./modules/ColorMixer"));
const TypingChallenge = lazy(() => import("./modules/TypingChallenge"));
const MusicVisualizer = lazy(() => import("./modules/MusicVisualizer"));
const EasterEgg = lazy(() => import("./modules/EasterEgg"));

export default function FunZone() {
  const [active, setActive] = useState<string>("particles");
  const components: Record<string, JSX.Element> = {
    particles: <ParticleCanvas />,
    memory: <MemoryGame />,
    color: <ColorMixer />,
    typing: <TypingChallenge />,
    music: <MusicVisualizer />,
    egg: <EasterEgg />,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navigation />
      <main className="max-w-7xl mx-auto p-6 md:p-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">
          🎮 Shubham’s Fun Zone
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            ["particles", "✨ Particles"],
            ["memory", "🧠 Memory Game"],
            ["color", "🎨 Color Mixer"],
            ["typing", "⌨️ Typing Challenge"],
            ["music", "🎧 Visualizer"],
            ["egg", "🐣 Easter Egg"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                active === key
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Active Module */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 min-h-[600px] flex items-center justify-center">
          <Suspense fallback={<div className="animate-pulse text-gray-500">Loading fun...</div>}>
            {components[active]}
          </Suspense>
        </div>
      </main>
    </div>
  );
}
