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
    <Card className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 h-[400px]">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 font-poppins">
            <div className={`w-3 h-3 ${colorClass} rounded-full`}></div>
            {title}
          </CardTitle>

          {title !== "Audio" && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl
              bg-blue-100 hover:bg-blue-200 
              dark:bg-blue-950/50 dark:hover:bg-blue-900/50 
              text-blue-600 dark:text-blue-400
              transition-all duration-300 hover:scale-105 shadow-lg"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied
                </>
              ) : (
                <>
                  <Clipboard className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 h-[280px] overflow-y-auto scrollbar-thin">
        {title === "Audio" ? (
          <div className="flex flex-col justify-center items-center h-full space-y-6 px-4">
            <div className="text-slate-700 dark:text-slate-300 text-base text-center">
              🎧 Listen to our AI-powered narration
            </div>
            <div className="w-full">
              <AudioControls audioUrl={audioUrl} />
            </div>
          </div>
        ) : (
          <div className="text-slate-700 dark:text-slate-300 leading-relaxed break-words text-lg p-2">
            {content}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
