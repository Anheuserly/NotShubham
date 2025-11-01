"use client";
import React from "react";
import Navigation from "../../components/Navigation";

const Blog = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
    <Navigation />
    <main className="max-w-5xl mx-auto p-12">
      <h1 className="text-4xl font-semibold mb-8 text-indigo-600">Blog & Insights</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
        I share my thoughts, engineering lessons, and behind-the-scenes of creative builds.
      </p>

      <div className="space-y-6">
        <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-2">Building Interactive 3D Sites with React Three Fiber</h2>
          <p className="text-gray-600 dark:text-gray-300">Learn how I integrated Three.js with React for realistic building visualizations.</p>
        </article>
      </div>
    </main>
  </div>
);

export default Blog;
