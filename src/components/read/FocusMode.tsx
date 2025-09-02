"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Share, Clipboard, Check } from "lucide-react";
import { SectionNavigation } from "@/components/read/SectionNavigation";
import { AudioControls } from "@/components/read/AudioControls";

interface FocusModeProps {
  data: any;
  currentSection: number;
  onExit: () => void;
  onShare: () => void;
  onNextSection: () => void;
  onPrevSection: () => void;
}

export const FocusMode = ({
  data,
  currentSection,
  onExit,
  onShare,
  onNextSection,
  onPrevSection,
}: FocusModeProps) => {
  const [copied, setCopied] = useState(false);

  const sections = ["TLDR", "Summary", "Audio", "Summary + Audio"];

  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    indigo: "bg-indigo-500",
  } as const;

  const titles = ["TL;DR", "Summary", "Audio", "Summary + Audio"] as const;
  const colors = ["blue", "green", "purple", "indigo"] as const;

  const title = titles[currentSection];
  const dotColor = colors[currentSection] as keyof typeof colorClasses;

  const toPlainText = (html: string) => {
    const withBreaks = html.replace(/<br\s*\/?>/gi, "\n");
    const div = document.createElement("div");
    div.innerHTML = withBreaks;
    const text = div.textContent || div.innerText || "";
    return text.replace(/\n{3,}/g, "\n\n").trim();
  };

  const copyCurrent = () => {
    let textToCopy = "";

    if (currentSection === 0) {
      const lines = (data.tldr || "")
        .split("\n")
        .map((l: string) => l.replace(/^[•*-]\s*/, "").trim())
        .filter((l: string) => l.length > 0);
      textToCopy = lines.map((l: string) => `• ${l}`).join("\n\n");
    } else if (currentSection === 1) {
      textToCopy = toPlainText(data.simplifiedText || "");
    } else if (currentSection === 3) {
      textToCopy = toPlainText(data.simplifiedText || "");
    }

    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getSectionBadge = () => {
    const badges = [
      {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-800 dark:text-blue-300",
        dot: "bg-blue-500",
        label: "TL;DR",
      },
      {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-800 dark:text-green-300",
        dot: "bg-green-500",
        label: "Summary",
      },
      {
        bg: "bg-purple-100 dark:bg-purple-900/30",
        text: "text-purple-800 dark:text-purple-300",
        dot: "bg-purple-500",
        label: "Audio",
      },
      {
        bg: "bg-indigo-100 dark:bg-indigo-900/30",
        text: "text-indigo-800 dark:text-indigo-300",
        dot: "bg-indigo-500",
        label: "Summary + Audio",
      },
    ];
    const badge = badges[currentSection];
    return (
      <div
        className={`inline-flex items-center gap-2 ${badge.bg} ${badge.text} px-3 py-1 text-sm font-medium rounded-full`}
      >
        <div className={`w-2 h-2 ${badge.dot} rounded-full`} />
        {badge.label}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={onExit}
            className="border-slate-300 dark:border-gray-600 bg-transparent"
          >
            <X className="w-4 h-4 mr-2" /> Exit Focus
          </Button>
          <Button
            variant="outline"
            onClick={onShare}
            className="border-slate-300 dark:border-gray-600 bg-transparent"
          >
            <Share className="w-4 h-4 mr-2" /> Share
          </Button>
          {getSectionBadge()}
        </div>
        <SectionNavigation
          currentSection={currentSection}
          totalSections={sections.length}
          onPrevious={onPrevSection}
          onNext={onNextSection}
        />
      </div>

      {/* Card */}
      <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-semibold text-slate-900 dark:text-gray-100 flex items-center gap-3">
              <div
                className={`w-3 h-3 ${colorClasses[dotColor]} rounded-full`}
              />
              {title}
            </CardTitle>

            {/* Copy button on Summary/TL;DR/Summary+Audio only */}
            {currentSection !== 2 && (
              <button
                onClick={copyCurrent}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
                  bg-blue-50 hover:bg-blue-100 
                  dark:bg-blue-900/20 dark:hover:bg-blue-900/40 
                  text-blue-600 dark:text-blue-300 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" /> Copied
                  </>
                ) : (
                  <>
                    <Clipboard className="w-5 h-5" /> Copy
                  </>
                )}
              </button>
            )}
          </div>
        </CardHeader>

        <CardContent className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-gray-600 scrollbar-track-slate-100 dark:scrollbar-track-gray-800">
          {/* TL;DR */}
          {currentSection === 0 && (
            <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed text-slate-700 dark:text-gray-300">
              {data.tldr
                .split("\n")
                .map((line: string) => line.replace(/^[•*-]\s*/, "").trim())
                .filter((l: string) => l)
                .map((point: string, idx: number) => (
                  <li key={idx} className="break-words">
                    {point}
                  </li>
                ))}
            </ul>
          )}

          {/* Summary */}
          {currentSection === 1 && (
            <div
              className="text-lg leading-relaxed text-slate-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{
                __html: (data.simplifiedText || "").replace(/\n/g, "<br>"),
              }}
            />
          )}

          {/* Audio */}
          {currentSection === 2 && (
            <div className="space-y-6">
              <p className="text-lg text-slate-700 dark:text-gray-300">
                Listen to the article with our AI-powered narration
              </p>
              <AudioControls audioUrl={data.audioUrl} size="large" />
            </div>
          )}

          {/* Summary + Audio */}
          {currentSection === 3 && (
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Summary card */}
              <div className="rounded-2xl bg-white dark:bg-gray-900 shadow-md border border-slate-200 dark:border-gray-700 flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-gray-100">
                      Summary
                    </h3>
                  </div>
                  {/* Copy btn inside summary card */}
                  <button
                    onClick={copyCurrent}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg
            bg-green-50 hover:bg-green-100 
            dark:bg-green-900/20 dark:hover:bg-green-900/40 
            text-green-600 dark:text-green-300 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Clipboard className="w-4 h-4" />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <div
                  className="p-4 text-base leading-relaxed text-slate-700 dark:text-gray-300 
          max-h-[45vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 
          dark:scrollbar-thumb-gray-600 scrollbar-track-slate-100 dark:scrollbar-track-gray-800"
                  dangerouslySetInnerHTML={{
                    __html: (data.simplifiedText || "").replace(/\n/g, "<br>"),
                  }}
                />
              </div>

              {/* Audio card */}
              <div className="rounded-2xl bg-white dark:bg-gray-900 shadow-md border border-slate-200 dark:border-gray-700 flex flex-col">
                <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-gray-700">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-gray-100">
                    Audio
                  </h3>
                </div>
                <div className="p-6 flex flex-col gap-6">
                  <p className="text-base text-slate-700 dark:text-gray-300">
                    Listen to the article with our AI-powered narration
                  </p>
                  <AudioControls audioUrl={data.audioUrl} size="large" />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
