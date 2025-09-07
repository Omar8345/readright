import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export const DarkModeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-2xl glass-effect border border-border/50 hover:border-border transition-all duration-300 hover:scale-110 flex items-center justify-center group shadow-xl"
    >
      {dark ? (
        <Sun className="w-6 h-6 text-accent group-hover:rotate-12 transition-transform duration-300" />
      ) : (
        <Moon className="w-6 h-6 text-primary group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
};
