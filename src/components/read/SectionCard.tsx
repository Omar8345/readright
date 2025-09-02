import { useState } from "react";
import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioControls } from "@/components/read/AudioControls";
import { Clipboard, Check } from "lucide-react";

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
}: SectionCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!content) return;

    let textToCopy = "";

    if (
      title === "Summary" &&
      (content as any).props?.dangerouslySetInnerHTML
    ) {
      textToCopy = (
        content as any
      ).props.dangerouslySetInnerHTML.__html.replace(/<br\s*\/?>/gi, "\n");
    } else if (
      title === "TL;DR" &&
      Array.isArray((content as any).props?.children)
    ) {
      const points = (content as any).props.children
        .map((li: any) => {
          const text = li.props.children;
          return `• ${text.trim()}`;
        })
        .join("\n\n");
      textToCopy = points;
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm h-[320px]">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-slate-900 dark:text-gray-100 flex items-center gap-2">
            <div className={`w-2 h-2 ${colorClass} rounded-full`}></div>
            {title}
          </CardTitle>

          {title !== "Audio" && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
              bg-blue-50 hover:bg-blue-100 
              dark:bg-blue-900/20 dark:hover:bg-blue-900/40 
              text-blue-600 dark:text-blue-300
              transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copied
                </>
              ) : (
                <>
                  <Clipboard className="w-5 h-5" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
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
};
