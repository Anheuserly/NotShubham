import React, { FC } from 'react';
import { Project } from '../types/types';
import { ArrowRight } from './icons';

export const ProjectCard: FC<Project> = ({ name, url, description, tags, type }) => (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] border-t-4 border-indigo-500 dark:border-indigo-400 flex flex-col">
        <div className="flex justify-between items-start mb-3">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h4>
            <span className="text-xs font-semibold px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 rounded-full flex-shrink-0">{type}</span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-grow">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md font-medium">
                    {tag}
                </span>
            ))}
        </div>

        {url !== '#' ? (
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition flex items-center mt-auto font-medium">
                View Site <ArrowRight className="w-4 h-4 ml-1" />
            </a>
        ) : (
            <span className="text-sm text-gray-500 dark:text-gray-600 mt-auto flex items-center">
                Private Project / Mobile App
            </span>
        )}
    </div>
);