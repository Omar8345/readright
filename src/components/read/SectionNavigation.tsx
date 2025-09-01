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
  <div className="flex items-center gap-2">
    <Button
      variant="outline"
      size="sm"
      onClick={onPrevious}
      disabled={currentSection === 0}
      className="border-slate-300 dark:border-gray-600 bg-transparent hover:bg-slate-50 dark:hover:bg-gray-700"
    >
      <ChevronLeft className="w-4 h-4 text-slate-700 dark:text-gray-200" />
    </Button>
    <span className="text-sm text-slate-600 dark:text-gray-300 px-2">
      {currentSection + 1} of {totalSections}
    </span>
    <Button
      variant="outline"
      size="sm"
      onClick={onNext}
      disabled={currentSection === totalSections - 1}
      className="border-slate-300 dark:border-gray-600 bg-transparent hover:bg-slate-50 dark:hover:bg-gray-700"
    >
      <ChevronRight className="w-4 h-4 text-slate-700 dark:text-gray-200" />
    </Button>
  </div>
);
