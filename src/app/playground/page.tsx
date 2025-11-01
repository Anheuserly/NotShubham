"use client";
import React from "react";
import Navigation from "../../components/Navigation";

const Playground = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
    <Navigation />
    <main className="max-w-5xl mx-auto p-12">
      <h1 className="text-4xl font-semibold mb-6 text-indigo-600">Playground</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Welcome to my creative sandbox — experiments, mini tools, and live demos built for fun.
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
        <p className="text-gray-600 dark:text-gray-300">
          ⚙️ Soon: Interactive code demos, small utilities, and experiments powered by React & Canvas.
        </p>
      </div>
    </main>
  </div>
);

export default Playground;
