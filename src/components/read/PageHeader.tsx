"use client";

import { Button } from "@/components/ui/button";
import { Eye, Share, Clock } from "lucide-react";

interface PageHeaderProps {
  title?: string;
  readTimeText?: string;
  onFocusMode: () => void;
  onShare: () => void;
}

export const PageHeader = ({
  title,
  readTimeText,
  onFocusMode,
  onShare,
}: PageHeaderProps) => (
  <div className="text-center mb-12">
    {" "}
    {/* reduced space from navbar */}
    {/* Title */}
    {title && (
      <h1 className="text-4xl font-bold font-poppins text-slate-900 dark:text-gray-100 mb-3">
        {title}
      </h1>
    )}
    {/* Read Time Badge */}
    {readTimeText && (
      <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 text-base font-semibold mb-5 rounded-full">
        <Clock className="w-5 h-5" />
        {readTimeText}
      </div>
    )}
    {/* Buttons */}
    <div className="flex items-center justify-center gap-3 mb-8">
      {" "}
      {/* increased bottom margin */}
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
