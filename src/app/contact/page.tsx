"use client";
import React from "react";
import Navigation from "../../components/Navigation";

const Contact = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
    <Navigation />
    <main className="max-w-3xl mx-auto p-12">
      <h1 className="text-4xl font-semibold mb-6 text-indigo-600">Contact</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Have a project, collaboration idea, or question? Let’s connect.
      </p>
      <form className="space-y-6">
        <input type="text" placeholder="Your Name" className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
        <input type="email" placeholder="Your Email" className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
        <textarea placeholder="Message" rows={5} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
        <button type="submit" className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition">Send Message</button>
      </form>
    </main>
  </div>
);

export default Contact;
