"use client";
import React from "react";
import Navigation from "../../components/Navigation";

const Community = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
    <Navigation />
    <main className="max-w-5xl mx-auto p-12">
      <h1 className="text-4xl font-semibold mb-6 text-indigo-600">Community</h1>
      <p className="text-lg mb-8">
        Join my tech and creative community on Discord, GitHub, and Twitter — share, collaborate, and learn.
      </p>
      <div className="flex flex-col sm:flex-row gap-6">
        <a href="#" className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition">Join Discord</a>
        <a href="#" className="border border-gray-400 text-gray-900 dark:text-white py-3 px-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">Follow on GitHub</a>
      </div>
    </main>
  </div>
);

export default Community;
