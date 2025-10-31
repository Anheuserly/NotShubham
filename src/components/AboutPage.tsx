import React, { FC } from 'react';
import { ArrowRight, Briefcase, Terminal } from './icons';

export const AboutPage: FC = () => (
    <div className="min-h-screen p-8 md:p-16 lg:p-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-y-auto font-sans">
        {/* Header with Back Button */}
        <header className="mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 border-gray-200 dark:border-gray-800 sticky top-0 bg-gray-50 dark:bg-gray-900 z-10">
            <h2 className="text-4xl lg:text-5xl font-light tracking-tight mb-4 sm:mb-0">About Shubham</h2>
            <a 
                href="/" 
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium py-2 px-4 transition duration-300 flex items-center text-sm rounded-lg border border-transparent hover:border-gray-300 dark:hover:border-gray-700"
            >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Return to Landing
            </a>
        </header>

        <div className="max-w-4xl mx-auto pb-16">
            {/* Main Bio Section */}
            <section className="mb-16 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 font-light">
                    I am a versatile <strong>Full-Stack Engineer</strong> with a passion for building robust, scalable applications using Next.js, Flutter, and the modern web stack. My experience blends technical development with professional engineering consulting and strong community management.
                </p>
                <div className="text-base text-gray-600 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="font-semibold text-gray-900 dark:text-white">Discord Handle:</span> <span className="font-medium text-indigo-600 dark:text-indigo-400">anheuserly</span>
                </div>
            </section>

            {/* Professional Experience */}
            <section className="mb-16">
                <h3 className="text-2xl font-semibold mb-6 pb-2 border-b border-gray-300 dark:border-gray-700 flex items-center text-indigo-600 dark:text-indigo-400">
                    <Briefcase className="w-5 h-5 mr-3" /> Professional Experience
                </h3>
                
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl space-y-4">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Shree Ganesh Enterprises</h4>
                    <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-2">
                        (Formerly S.S Engineers & Consultants)
                    </p>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-base ml-4">
                        <li>Specialized in comprehensive <strong>Fire Protection Systems</strong>.</li>
                        <li>Expertise in <strong>Plumbing</strong> and <strong>Electrical</strong> installations.</li>
                        <li>Managed <strong>Annual Maintenance Contracts (AMC)</strong> for various systems.</li>
                    </ul>
                    <p className="text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-200 dark:border-gray-700 mt-4">
                        Location: D 21 Chattarpur Hills
                    </p>
                </div>
            </section>

            {/* Gaming Community Role */}
            <section>
                <h3 className="text-2xl font-semibold mb-6 pb-2 border-b border-gray-300 dark:border-gray-700 flex items-center text-indigo-600 dark:text-indigo-400">
                    <Terminal className="w-5 h-5 mr-3" /> Gaming & Community Leadership
                </h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300 text-sm p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
                    <p className="font-medium text-gray-900 dark:text-white text-lg">
                        Dedicated Admin at **United Island Freeroam** SA:MP Server.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-base ml-4">
                        <li>Achieved <strong>Administrator Level 4</strong> (High-level server management and oversight).</li>
                        <li>Involved as the Host of <strong>Ava</strong> and a Beta Tester for the <strong>Admin Tool</strong>.</li>
                    </ul>
                </div>
            </section>
        </div>
    </div>
);