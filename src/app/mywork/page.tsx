"use client";

import React, { FC } from "react";
import { WorkPage } from "../../components/WorkPage";
import Navigation from "../../components/Navigation";

const MyWork: FC = () => {
  return (
    <div className="min-h-screen font-['Inter', 'sans-serif'] bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
      <Navigation />
      <WorkPage />
    </div>
  );
};

export default MyWork;
