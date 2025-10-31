use client";

import React, { FC, useState, useEffect, use } from 'react';

// Import all possible pages and content
import { HomePageContent } from '../components/HomePageContent';
import { WorkPage } from '../components/WorkPage';
import { AboutPage } from '../components/AboutPage';

// Component to handle client-side routing based on the URL path
const RouteObserver: FC = () => {
    // State to hold the current path for reactive rendering
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        // Function to update the component state when the URL changes
        const handleRouteChange = () => {
            setCurrentPath(window.location.pathname);
        };

        // Attach the listener to the popstate event (triggered by handleNavigation)
        window.addEventListener('popstate', handleRouteChange);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, []); // Run only once on mount

    // Render the correct component based on the URL path
    const renderPage = () => {
        // Use standard JavaScript methods to check the path
        if (currentPath.startsWith('/projects')) {
            // Projects page is mounted when URL is /projects
            return <WorkPage />;
        }
        if (currentPath.startsWith('/about')) {
            // About page is mounted when URL is /about
            return <AboutPage />;
        }
        // Default to the home page (landing) for all other paths, including '/'
        return <HomePageContent />;
    };

    return (
        <div className="min-h-screen font-['Inter', 'sans-serif'] bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
            {renderPage()}
        </div>
    );
};

export default RouteObserver;
