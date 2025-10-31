"use client";

import React, { FC } from 'react';
import { WorkPage } from '../../components/WorkPage';

const Projects: FC = () => {
    return (
        <div className="min-h-screen font-['Inter', 'sans-serif'] bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
            <WorkPage />
        </div>
    );
};

export default Projects;