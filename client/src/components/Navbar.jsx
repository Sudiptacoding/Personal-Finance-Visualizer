"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; 

export default function Navbar() {
  const [theme, setTheme] = useState("auto");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme-mode") || "auto";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    function applyTheme(themeMode) {
      if (themeMode === "auto") {
        if (systemPrefersDark.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      } else if (themeMode === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }

    applyTheme(theme);

    const handleSystemChange = () => {
      if (theme === "auto") applyTheme("auto");
    };

    if (theme === "auto") {
      systemPrefersDark.addEventListener("change", handleSystemChange);
    }

    return () => {
      systemPrefersDark.removeEventListener("change", handleSystemChange);
    };
  }, [theme]);

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("auto");
    else setTheme("light");
    localStorage.setItem("theme-mode", theme);
  };

  return (
    <header className="w-full px-4 py-4 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          📊 Finance
        </h1>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm sm:text-base">
          <Link
            href="/"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Dashboard
          </Link>
        </nav>
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={cycleTheme}
            className="text-lg"
            aria-label="Toggle theme"
            title={`Switch theme (current: ${theme})`}
          >
            {theme === "light" && "🌞"}
            {theme === "dark" && "🌜"}
            {theme === "auto" && "🌓"}
          </Button>
        </div>
      </div>
    </header>
  );
}
