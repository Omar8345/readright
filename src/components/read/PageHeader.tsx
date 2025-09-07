"use client";

import { Button } from "@/components/ui/button";
import { Eye, Share, Clock, Sparkles } from "lucide-react";

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
  <div className="text-center mb-16 fade-in-up">
    {/* Badge */}
    <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full px-6 py-3 mb-8">
      <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
        Article Processed
      </span>
    </div>

    {/* Title */}
    {title && (
      <h1 className="text-4xl lg:text-6xl font-bold font-poppins text-slate-900 dark:text-white mb-6 leading-tight">
        {title}
      </h1>
    )}

    {/* Read Time Badge */}
    {readTimeText && (
      <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-400 px-6 py-3 text-lg font-semibold mb-8 rounded-2xl shadow-lg">
        <Clock className="w-5 h-5" />
        {readTimeText}
      </div>
    )}

    {/* Buttons */}
    <div className="flex items-center justify-center gap-4">
      <Button
        onClick={onFocusMode}
        className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold px-8 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0"
      >
        <Eye className="w-5 h-5 mr-2" />
        Focus Mode
      </Button>
      <Button
        onClick={onShare}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-800 dark:text-slate-200 font-semibold px-8 py-4 text-lg rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:scale-105 shadow-lg"
      >
        <Share className="w-5 h-5 mr-2" />
        Share
      </Button>
    </div>
  </div>
);
