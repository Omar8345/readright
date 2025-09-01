"use client";

import { Button } from "@/components/ui/button";
import { Volume2, Eye, Share } from "lucide-react";

interface PageHeaderProps {
  title?: string;
  onFocusMode: () => void;
  onShare: () => void;
}

export const PageHeader = ({
  title,
  onFocusMode,
  onShare,
}: PageHeaderProps) => (
  <div className="text-center mb-12">
    {/* Badge */}
    <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 text-sm font-medium mb-4 rounded-md">
      <Volume2 className="w-4 h-4" />
      Accessible Web Reader
    </div>

    {/* Title */}
    {title && (
      <h1 className="text-4xl font-bold font-poppins mb-4 text-slate-900 dark:text-gray-100">
        {title}
      </h1>
    )}

    {/* Subtitle */}
    <p className="text-lg text-slate-600 dark:text-gray-300 font-inter">
      Read any article, get a reader-friendly version, TL;DR summary, and audio
      narration instantly.
    </p>

    {/* Buttons */}
    <div className="flex items-center justify-center gap-3 mt-4">
      <Button
        onClick={onFocusMode}
        variant="outline"
        className="border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-transparent"
      >
        <Eye className="w-4 h-4 mr-2" />
        Focus Mode
      </Button>
      <Button
        onClick={onShare}
        variant="outline"
        className="border-slate-300 dark:border-gray-600 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800/50 bg-transparent"
      >
        <Share className="w-4 h-4 mr-2" />
        Share
      </Button>
    </div>
  </div>
);
