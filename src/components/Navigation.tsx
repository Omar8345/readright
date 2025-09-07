import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Book, Menu, X, Sparkles } from "lucide-react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
                <Book className="w-6 h-6 text-white relative z-10" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/"
                className="text-2xl font-bold font-poppins bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                ReadRight
              </a>
              <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                <Sparkles className="w-3 h-3" />
                AI-Powered
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="/#home"
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-300 font-medium tracking-wide hover:scale-105"
            >
              Home
            </a>
            <a
              href="/#features"
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-300 font-medium tracking-wide hover:scale-105"
            >
              Features
            </a>

            <Button
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
              onClick={() => (window.location.href = "/#demo")}
            >
              Try ReadRight
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-b-2xl">
            <div className="flex flex-col gap-6">
              <a
                href="#home"
                className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-300 font-medium py-2 px-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#features"
                className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-300 font-medium py-2 px-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold px-6 py-3 rounded-xl shadow-lg self-start border-0">
                Try ReadRight
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
