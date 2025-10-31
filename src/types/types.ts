export type Page = 'home' | 'work' | 'about';
export type ProjectType = 'App' | 'Website' | 'Bot';

// Interface for a single project item
export interface Project {
    type: ProjectType;
    name: string;
    url: string;
    description: string;
    tags: string[];
}