"use client";

import React, { FC } from "react";
import { AboutPage } from "../../components/AboutPage";
import Navigation from "../../components/Navigation";

const Portfolio: FC = () => {
  return (
    <div className="min-h-screen font-['Inter', 'sans-serif'] bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
      <Navigation />
      <AboutPage />
    </div>
  );
};

export default Portfolio;
