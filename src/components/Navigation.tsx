"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
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

  const navItems = [
    { href: "/", label: "NS" },
    { href: "/mywork", label: "My Work" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/showcase", label: "Showcase" },
    { href: "/playground", label: "Playground" },
    { href: "/blog", label: "Blog" },
    { href: "/community", label: "Community" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isNavHidden ? "-translate-y-full" : "translate-y-0"
      } ${
        lastScrollY > 50
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center relative">
          {/* Desktop Navigation */}
          <div className="hidden md:block w-full">
            <div className="flex justify-center space-x-8">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-2 text-base font-medium font-['Ubin_Sans'] ${
                    isActive(href)
                      ? "text-red-500"
                      : lastScrollY > 50
                      ? "text-gray-900"
                      : "text-gray-900"
                  } hover:text-red-500 transition-colors duration-300`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* 🎮 🌗 🐙 Right-side Feature Icons */}
          <div className="hidden md:flex space-x-4 absolute right-8 top-1/2 -translate-y-1/2">
            <Link
              href="/funzone"
              className="hover:text-red-500 transition text-xl"
              title="Fun Zone"
            >
              🎮
            </Link>
            <Link
              href="/theme"
              className="hover:text-yellow-500 transition text-xl"
              title="Toggle Theme"
            >
              🌗
            </Link>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-500 transition text-xl"
              title="GitHub"
            >
              🐙
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${
                lastScrollY > 50 ? "text-gray-900" : "text-gray-900"
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
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block text-gray-900 text-lg py-2 hover:text-red-500 transition-colors duration-300 font-['Ubin_Sans']"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            {/* Mobile Quick Links (🎮 🌗 🐙) */}
            <div className="flex justify-center space-x-6 pt-4 border-t border-gray-200">
              <Link href="/funzone" className="hover:text-red-500 text-xl">
                🎮
              </Link>
              <Link href="/theme" className="hover:text-yellow-500 text-xl">
                🌗
              </Link>
              <a
                href="https://github.com/anheuserly"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-500 text-xl"
              >
                🐙
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
