
// components/HeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Hero section projects - 9 vibrant, high-quality project images with details (fictional for ARC 11, inspired by Nikken format)
const heroProjects = [
  { image: "/images/architecture-1.png", name: "Private Residence", location: "Ghaziabad, India", year: 2021 },
  { image: "/images/architecture-2.png", name: "Jorbagh Villa", location: "Greater Noida, India", year: 2022 },
  { image: "/images/architecture-3.png", name: "4 BHK Apartment", location: "Gurgaon, India", year: 2024 },
  { image: "/images/architecture-4.png", name: "Micro 2 BHK Apartment", location: "Chattarpur India", year: 2023 },

];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate project images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroProjects.length);
    }, 5000); // Change image every 5 seconds with fade transition

    return () => clearInterval(interval);
  }, []);

  const currentProject = heroProjects[currentImageIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {heroProjects.map((project, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={project.image}
            alt={`${project.name} Image`}
            fill
            className="object-cover"
            priority={index === 0}
            quality={85} // Optimize image quality
          />
        </div>
      ))}
      {/* Project Name, Location, and Year Overlay */}
      <div className="absolute bottom-20 left-10 z-10 text-white">
        <h3 className="text-4xl font-extrabold font-['Ubin_Sans'] mb-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
          {currentProject.name}
        </h3>
        <p className="text-xl font-medium font-['Ubin_Sans'] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
          {currentProject.location} - {currentProject.year}
        </p>
      </div>
      {/* Scroll Down Prompt */}
      <div className="absolute inset-x-0 bottom-8 flex flex-col items-center justify-center text-white text-center z-10">
        <p className="text-lg font-medium font-['Ubin_Sans'] animate-bounce drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
          Scroll Down
        </p>
      </div>
      {/* Image Indicator Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroProjects.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? "bg-white scale-125" : "bg-white/50 hover:scale-110"
            } drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
