// components/Navigation.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import Logo from "../static/Arcelevenarchitect_logo.png";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide nav when scrolling down past first page, show when scrolling up
      if (currentScrollY > window.innerHeight && currentScrollY > lastScrollY) {
        setIsNavHidden(true);
      } else {
        setIsNavHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isActive = (path: string) => pathname === path;

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isNavHidden 
          ? '-translate-y-full' 
          : 'translate-y-0'
      } ${
        lastScrollY > 50 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo - Made bigger as requested */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src={Logo}
                alt="Arc Eleven Architect Logo"
                width={60}
                height={60}
                className="object-contain"
                priority
              />
              <span className={`text-2xl font-bold font-['Ubin_Sans'] ${
                lastScrollY > 50 ? 'text-gray-900' : 'text-white'
              } hidden sm:block`}>
                Arc 11 Architect
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Right side buttons in black, smaller font */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className={`px-3 py-2 text-base font-medium font-['Ubin_Sans'] ${
                  isActive("/") 
                    ? "text-red-500" 
                    : lastScrollY > 50 
                      ? "text-gray-900" 
                      : "text-gray-900"
                } hover:text-red-500 transition-colors duration-300`}
              >
                Home
              </Link>
              <Link
                href="/projects"
                className={`px-3 py-2 text-base font-medium font-['Ubin_Sans'] ${
                  isActive("/projects") 
                    ? "text-red-500" 
                    : lastScrollY > 50 
                      ? "text-gray-900" 
                      : "text-gray-900"
                } hover:text-red-500 transition-colors duration-300`}
              >
                Projects
              </Link>
              <Link
                href="/about"
                className={`px-3 py-2 text-base font-medium font-['Ubin_Sans'] ${
                  isActive("/about") 
                    ? "text-red-500" 
                    : lastScrollY > 50 
                      ? "text-gray-900" 
                      : "text-gray-900"
                } hover:text-red-500 transition-colors duration-300`}
              >
                About
              </Link>
              <Link
                href="/expertise"
                className={`px-3 py-2 text-base font-medium font-['Ubin_Sans'] ${
                  isActive("/expertise") 
                    ? "text-red-500" 
                    : lastScrollY > 50 
                      ? "text-gray-900" 
                      : "text-gray-900"
                } hover:text-red-500 transition-colors duration-300`}
              >
                Expertise
              </Link>
              <Link
                href="/journal"
                className={`px-3 py-2 text-base font-medium font-['Ubin_Sans'] ${
                  isActive("/journal") 
                    ? "text-red-500" 
                    : lastScrollY > 50 
                      ? "text-gray-900" 
                      : "text-gray-900"
                } hover:text-red-500 transition-colors duration-300`}
              >
                Journal
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-2 text-base font-medium font-['Ubin_Sans'] ${
                  isActive("/contact") 
                    ? "text-red-500" 
                    : lastScrollY > 50 
                      ? "text-gray-900" 
                      : "text-gray-900"
                } hover:text-red-500 transition-colors duration-300`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${
                lastScrollY > 50 ? 'text-gray-900' : 'text-gray-900'
              }`}
            >
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link
              href="/"
              className="block text-gray-900 text-lg py-2 hover:text-red-500 transition-colors duration-300 font-['Ubin_Sans']"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="block text-gray-900 text-lg py-2 hover:text-red-500 transition-colors duration-300 font-['Ubin_Sans']"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="block text-gray-900 text-lg py-2 hover:text-red-500 transition-colors duration-300 font-['Ubin_Sans']"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/expertise"
              className="block text-gray-900 text-lg py-2 hover:text-red-500 transition-colors duration-300 font-['Ubin_Sans']"
              onClick={() => setIsMenuOpen(false)}
            >
              Expertise
            </Link>
            <Link
              href="/journal"
              className="block text-gray-900 text-lg py-2 hover:text-red-500 transition-colors duration-300 font-['Ubin_Sans']"
              onClick={() => setIsMenuOpen(false)}
            >
              Journal
            </Link>
            <Link
              href="/contact"
              className="block text-gray-900 text-lg py-2 hover:text-red-500 transition-colors duration-300 font-['Ubin_Sans']"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}