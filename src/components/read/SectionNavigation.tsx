"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SectionNavigationProps {
  currentSection: number;
  totalSections: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const SectionNavigation = ({
  currentSection,
  totalSections,
  onPrevious,
  onNext,
}: SectionNavigationProps) => (
  <div className="flex items-center gap-3">
    <Button
      variant="outline"
      size="sm"
      onClick={onPrevious}
      disabled={currentSection === 0}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 shadow-lg"
    >
      <ChevronLeft className="w-4 h-4" />
    </Button>
    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
      {currentSection + 1} of {totalSections}
    </span>
    <Button
      variant="outline"
      size="sm"
      onClick={onNext}
      disabled={currentSection === totalSections - 1}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 shadow-lg"
    >
      <ChevronRight className="w-4 h-4" />
    </Button>
  </div>
);
