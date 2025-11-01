"use client";

import React, { FC, SVGProps } from "react";

// --- INLINE SVG ICONS ---
const Briefcase: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
    <path d="M10 12h4" />
  </svg>
);

const Code: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const Terminal: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const ArrowRight: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// --- MAIN HOME PAGE ---
const HomePage: FC = () => {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-gray-950 font-sans">
      {/* LEFT PANEL (Visual) */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-gray-100 dark:bg-gray-900 border-r border-gray-800">
        <div className="text-gray-300 dark:text-gray-700 text-[12rem] font-extralight tracking-widest opacity-30 select-none">
          S H
        </div>
      </div>

      {/* RIGHT PANEL (Content) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24">
        <div className="max-w-lg mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter mb-8 text-gray-900 dark:text-white leading-tight">
            SHUBHAM'S DIGITAL <br />{" "}
            <span className="text-indigo-600 dark:text-indigo-400">WORKSPACE</span>
          </h1>

          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            As a <strong>Full-Stack Engineer</strong> specializing in{" "}
            <strong>Next.js</strong> and <strong>Flutter</strong>, I craft
            high-performance applications that deliver seamless user experiences across
            mobile and web platforms.
          </p>

          <p className="text-lg mb-8 text-gray-700 dark:text-gray-300 italic border-l-4 border-gray-300 dark:border-gray-700 pl-4">
            My work is a dialogue between code, design, and scalability — building
            solutions for the future.
          </p>

          {/* Updated Links */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <a
              href="/mywork"
              className="bg-indigo-600 text-white hover:bg-indigo-700 font-semibold py-3 px-8 rounded-lg shadow-lg flex items-center justify-center transition-transform duration-300 hover:-translate-y-0.5"
            >
              VIEW MY WORK <ArrowRight className="w-4 h-4 ml-2" />
            </a>
            <a
              href="/portfolio"
              className="border border-gray-400 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold py-3 px-8 rounded-lg shadow-md flex items-center justify-center transition duration-300"
            >
              PORTFOLIO
            </a>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6 border-t pt-6 border-gray-200 dark:border-gray-700">
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              aria-label="LinkedIn"
            >
              <Briefcase className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              aria-label="GitHub"
            >
              <Code className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              aria-label="Twitter"
            >
              <Terminal className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
