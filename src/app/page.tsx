"use client";

import React, { FC, SVGProps } from 'react';

// --- TYPE DEFINITIONS ---
type Page = 'home' | 'work' | 'about';
type ProjectType = 'App' | 'Website' | 'Bot';

interface Project {
    type: ProjectType;
    name: string;
    url: string;
    description: string;
    tags: string[];
}

// Interface for props passed to content pages to enable navigation
interface PageContentProps {
    onNavigate: (page: Page) => void;
}

// --- PROJECT DATA ---
// Centralized data for the Work Page
const PROJECT_DATA: Project[] = [
    {
        type: 'App',
        name: 'Amc mep 24x7 (Android App)',
        url: '#',
        description: 'A dedicated mobile application built with Flutter for streamlining the management of Fire Protection, Plumbing, Electrical, and AMC services related to MEP works.',
        tags: ['Flutter', 'Android', 'Utility', 'MEP'],
    },
    {
        type: 'Website',
        name: 'arcelevenarchitect.com',
        url: 'https://www.arcelevenarchitect.com',
        description: 'Professional, SEO-optimized website showcasing modern architecture and interior design services.',
        tags: ['Next.js', 'React', 'Design', 'Architecture'],
    },
    {
        type: 'Website',
        name: 'sge.org.in',
        url: 'https://www.sge.org.in',
        description: 'Official digital presence developed for Shree Ganesh Enterprises (SGE).',
        tags: ['Web Development', 'Business', 'SEO'],
    },
    {
        type: 'Website',
        name: 'bantexcables.com',
        url: 'https://www.bantexcables.com',
        description: 'Commercial website for cable and related product information, optimized for product browsing.',
        tags: ['Web Development', 'E-Commerce', 'Product Display'],
    },
    {
        type: 'Website',
        name: 'amcmep.in',
        url: 'https://www.amcmep.in',
        description: 'Website focused on Annual Maintenance Contracts and detailed MEP service offerings.',
        tags: ['Web Development', 'Service', 'Maintenance'],
    },
    {
        type: 'Website',
        name: 'ssengineers.in',
        url: 'https://www.ssengineers.in',
        description: 'Legacy website for the former S.S Engineers & Consultants.',
        tags: ['Web Development', 'Engineering', 'Legacy'],
    },
    {
        type: 'Bot',
        name: 'Vera (Discord Bot)',
        url: '#',
        description: 'A custom-built, private utility Discord bot developed for efficient community management and specific server automation tasks.',
        tags: ['Discord.js', 'Node.js', 'Automation'],
    },
    {
        type: 'Bot',
        name: 'CNR AI HUB (Discord Bot)',
        url: '#',
        description: 'An AI-integrated Discord bot project focused on advanced utility and centralized information access for a community.',
        tags: ['Discord.js', 'AI Integration', 'Utility'],
    },
];
// --- END PROJECT DATA ---


// --- INLINE SVG ICONS (Replacement for lucide-react) ---
const Briefcase: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
        <path d="M10 12h4"/>
    </svg>
);

const Code: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
    </svg>
);

const Terminal: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5"/>
        <line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
);

const ArrowRight: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
    </svg>
);
// --- END INLINE SVG ICONS ---

// --- UTILITY COMPONENTS ---

const ProjectCard: FC<Project> = ({ name, url, description, tags, type }) => (
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


// --- PAGE COMPONENTS ---

// The main landing page content (Updated with better typography/spacing)
const HomePageContent: FC<PageContentProps> = ({ onNavigate }) => {
    return (
        <main className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-gray-950 font-sans">
            {/* 1. Left Column (Visual/Minimalist) */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
                {/* Visual element with subtle animation/style */}
                <div className="text-gray-300 dark:text-gray-700 text-[12rem] font-extralight tracking-widest opacity-30 select-none transition-opacity duration-500 hover:opacity-50">
                    S H
                </div>
            </div>

            {/* 2. Right Column (Content Focus) */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24">
                <div className="max-w-lg mx-auto lg:mx-0">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter mb-8 text-gray-900 dark:text-white leading-tight">
                        SHUBHAM'S DIGITAL <br /> <span className="text-indigo-600 dark:text-indigo-400">WORKSPACE</span>
                    </h1>

                    {/* Fixed: Replaced **bold** markdown with <strong> for proper rendering */}
                    <p className="text-lg mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                        As a <strong>Full-Stack Engineer</strong> specializing in <strong>Next.js</strong> and <strong>Flutter</strong>, I craft robust, high-performance applications that deliver seamless user experiences across mobile and web platforms.
                    </p>
                    
                    <p className="text-lg mb-8 text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-4 border-gray-300 dark:border-gray-700 pl-4">
                        My work is a quiet dialogue between code, design, and scalability—rooted in best practices and guided by a purpose: to build future-proof digital solutions.
                    </p>

                    {/* Action Buttons with better hover effects */}
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
                        <button 
                            onClick={() => onNavigate('work')}
                            className="bg-indigo-600 text-white dark:bg-indigo-700 dark:text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 font-semibold py-3 px-8 transition duration-300 shadow-lg flex items-center justify-center transform hover:-translate-y-0.5 rounded-lg"
                        >
                            VIEW MY WORK <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                        <button 
                            onClick={() => onNavigate('about')}
                            className="bg-transparent border border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold py-3 px-8 transition duration-300 shadow-md flex items-center justify-center rounded-lg"
                        >
                            ABOUT SHUBHAM
                        </button>
                    </div>

                    {/* Social Links with icons and better styling */}
                    <div className="flex space-x-6 border-t pt-6 border-gray-200 dark:border-gray-700">
                        <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300" aria-label="LinkedIn">
                            <Briefcase className="w-6 h-6" /> 
                        </a>
                        <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300" aria-label="GitHub">
                            <Code className="w-6 h-6" /> 
                        </a>
                        <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300" aria-label="Twitter">
                            <Terminal className="w-6 h-6" /> 
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
};

// Updated Work Page Content (Improved Header/Layout)
const WorkPage: FC<PageContentProps> = ({ onNavigate }) => (
    <div className="min-h-screen p-8 md:p-16 lg:p-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-y-auto font-sans">
        {/* Header with Back Button */}
        <header className="mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 border-gray-200 dark:border-gray-800 sticky top-0 bg-gray-50 dark:bg-gray-900 z-10">
            <h2 className="text-4xl lg:text-5xl font-light tracking-tight mb-4 sm:mb-0">My Digital Work</h2>
            <button 
                onClick={() => onNavigate('home')} 
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium py-2 px-4 transition duration-300 flex items-center text-sm rounded-lg border border-transparent hover:border-gray-300 dark:hover:border-gray-700"
            >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Return to Landing
            </button>
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

// Updated About Page Content (Improved Header/Layout/Typography)
const AboutPage: FC<PageContentProps> = ({ onNavigate }) => (
    <div className="min-h-screen p-8 md:p-16 lg:p-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-y-auto font-sans">
        {/* Header with Back Button */}
        <header className="mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 border-gray-200 dark:border-gray-800 sticky top-0 bg-gray-50 dark:bg-gray-900 z-10">
            <h2 className="text-4xl lg:text-5xl font-light tracking-tight mb-4 sm:mb-0">About Shubham</h2>
            <button 
                onClick={() => onNavigate('home')} 
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium py-2 px-4 transition duration-300 flex items-center text-sm rounded-lg border border-transparent hover:border-gray-300 dark:hover:border-gray-700"
            >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Return to Landing
            </button>
        </header>

        <div className="max-w-4xl mx-auto pb-16">
            {/* Main Bio Section */}
            <section className="mb-16 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                {/* Fixed: Replaced **bold** markdown with <strong> for proper rendering */}
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
                        <li>Achieved **Administrator Level 4** (High-level server management and oversight).</li>
                        <li>Involved as the Host of **Ava** and a Beta Tester for the **Admin Tool**.</li>
                    </ul>
                </div>
            </section>
        </div>
    </div>
);

// --- MAIN ROUTER COMPONENT ---
const PageRouter: FC = () => {
    const [currentPage, setCurrentPage] = React.useState<Page>('home');

    // Function to render the correct component based on state
    const renderPage = () => {
        // Simple CSS transition for smoother page switching
        const fadeClass = "transition-opacity duration-300";
        
        switch (currentPage) {
            case 'work':
                return <div key="work" className={fadeClass}><WorkPage onNavigate={setCurrentPage} /></div>;
            case 'about':
                return <div key="about" className={fadeClass}><AboutPage onNavigate={setCurrentPage} /></div>;
            case 'home':
            default:
                return <div key="home" className={fadeClass}><HomePageContent onNavigate={setCurrentPage} /></div>;
        }
    };

    return (
        <div className="min-h-screen font-['Inter', 'sans-serif'] bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
            {renderPage()}
        </div>
    );
};

// The main export is now the router, named LandingPage for the file system.
export default PageRouter;
