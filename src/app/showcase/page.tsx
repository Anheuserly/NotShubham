"use client";
import React from "react";
import Navigation from "../../components/Navigation";

const Showcase = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
    <Navigation />
    <main className="max-w-6xl mx-auto p-12">
      <h1 className="text-4xl font-semibold mb-8 text-indigo-600">Showcase</h1>
      <p className="text-lg mb-12">
        Explore my most visually creative projects — UI motion designs, animations,
        3D renders, and interactive experiments.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-medium mb-2">3D Building Demo</h2>
          <p className="text-gray-600 dark:text-gray-300">
            An interactive architectural 3D visualization using Three.js + React Three Fiber.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-medium mb-2">Animated UI Showcase</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Modern UI animations built with Framer Motion and TailwindCSS.
          </p>
        </div>
      </div>
    </main>
  </div>
);

export default Showcase;
