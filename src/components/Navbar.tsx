"use client";

import { ThemeContext } from "@/contexts/ThemeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="p-4 px-6 flex justify-between items-center bg-transparent fixed w-full z-10">
      <div className="flex items-center space-x-6">
        <Link
          href="/"
          className={`text-sm font-medium ${
            isActive("/") ? "text-white" : "text-muted hover:text-white"
          } transition-colors`}
        >
          Home
        </Link>
        <Link
          href="/projects"
          className={`text-sm font-medium ${
            isActive("/projects") ? "text-white" : "text-muted hover:text-white"
          } transition-colors`}
        >
          Projects
        </Link>
        <Link
          href="/resume"
          className={`text-sm font-medium ${
            isActive("/resume") ? "text-white" : "text-muted hover:text-white"
          } transition-colors`}
        >
          Resume
        </Link>
      </div>

      <button
        onClick={toggleDarkMode}
        className="p-2 bg-transparent rounded"
        id="darkModeToggleBtn"
        aria-label="Toggle dark mode"
      >
        <svg
          className={`fill-violet-700 ${darkMode ? "hidden" : "block"}`}
          fill="currentColor"
          width="25"
          height="25"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>

        <svg
          className={`fill-yellow-500 ${darkMode ? "block" : "hidden"}`}
          fill="currentColor"
          width="25"
          height="25"
        >
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
