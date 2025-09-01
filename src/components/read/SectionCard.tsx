import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioControls } from "@/components/read/AudioControls";

interface SectionCardProps {
  title: string;
  colorClass: string;
  content: React.ReactNode;
  audioUrl?: string;
}

export const SectionCard = ({
  title,
  colorClass,
  content,
  audioUrl,
}: SectionCardProps) => (
  <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm h-[320px]">
    <CardHeader className="pb-4">
      <CardTitle className="text-xl font-semibold text-slate-900 dark:text-gray-100 flex items-center gap-2">
        <div className={`w-2 h-2 ${colorClass} rounded-full`}></div>
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 h-[220px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-gray-600 scrollbar-track-slate-100 dark:scrollbar-track-gray-800">
      {title === "Audio" ? (
        <div className="space-y-4">
          <div className="text-slate-700 dark:text-gray-300 text-sm mb-4">
            Listen to the article with our AI-powered narration
          </div>
          <AudioControls audioUrl={audioUrl} />
        </div>
      ) : (
        <div className="text-slate-700 dark:text-gray-300 leading-relaxed break-words">
          {content}
        </div>
      )}
    </CardContent>
  </Card>
);
