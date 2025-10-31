import React, { FC } from 'react';
import { ArrowRight } from './icons';
import { ProjectCard } from './ProjectCard';
import { PROJECT_DATA } from '../data/projects';

export const WorkPage: FC = () => (
    <div className="min-h-screen p-8 md:p-16 lg:p-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-y-auto font-sans">
        {/* Header with Back Button */}
        <header className="mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 border-gray-200 dark:border-gray-800 sticky top-0 bg-gray-50 dark:bg-gray-900 z-10">
            <h2 className="text-4xl lg:text-5xl font-light tracking-tight mb-4 sm:mb-0">My Digital Work</h2>
            <a 
                href="/" 
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium py-2 px-4 transition duration-300 flex items-center text-sm rounded-lg border border-transparent hover:border-gray-300 dark:hover:border-gray-700"
            >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Return to Landing
            </a>
        </header>

        <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-4xl mx-auto text-center">
            A comprehensive overview of my key projects, encompassing professional websites, mobile applications, and community-focused utility bots.
        </p>

        {/* Project Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
            {PROJECT_DATA.map((project, index) => (
                <ProjectCard key={index} {...project} />
            ))}
        </div>
    </div>
);