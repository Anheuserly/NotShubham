"use client";
import React from "react";
import Navigation from "../../components/Navigation";

const Theme = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
    <Navigation />
    <main className="max-w-3xl mx-auto p-12 text-center">
      <h1 className="text-4xl font-semibold mb-6 text-indigo-600">🌗 Theme Settings</h1>
      <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
        Customize your viewing experience. Dark, light, or system — pick your vibe.
      </p>
      <button className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition">Toggle Theme</button>
    </main>
  </div>
);

export default Theme;
