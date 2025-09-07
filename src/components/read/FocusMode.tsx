"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Share, Clipboard, Check, ArrowLeft } from "lucide-react";
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
    emerald: "bg-emerald-500",
    purple: "bg-purple-500",
    indigo: "bg-indigo-500",
  } as const;

  const titles = ["TL;DR", "Summary", "Audio", "Summary + Audio"] as const;
  const colors = ["blue", "emerald", "purple", "indigo"] as const;

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
        bg: "bg-blue-100 dark:bg-blue-950/50",
        text: "text-blue-800 dark:text-blue-400",
        dot: "bg-blue-500",
        label: "TL;DR",
      },
      {
        bg: "bg-emerald-100 dark:bg-emerald-950/50",
        text: "text-emerald-800 dark:text-emerald-400",
        dot: "bg-emerald-500",
        label: "Summary",
      },
      {
        bg: "bg-purple-100 dark:bg-purple-950/50",
        text: "text-purple-800 dark:text-purple-400",
        dot: "bg-purple-500",
        label: "Audio",
      },
      {
        bg: "bg-indigo-100 dark:bg-indigo-950/50",
        text: "text-indigo-800 dark:text-indigo-400",
        dot: "bg-indigo-500",
        label: "Summary + Audio",
      },
    ];
    const badge = badges[currentSection];
    return (
      <div
        className={`inline-flex items-center gap-2 ${badge.bg} ${badge.text} px-4 py-2 text-sm font-semibold rounded-xl shadow-lg`}
      >
        <div className={`w-2 h-2 ${badge.dot} rounded-full`} />
        {badge.label}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-6 py-16 pt-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 fade-in-up">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={onExit}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-800 dark:text-slate-200 font-semibold px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Exit Focus
          </Button>
          <Button
            variant="outline"
            onClick={onShare}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-800 dark:text-slate-200 font-semibold px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <Share className="w-5 h-5 mr-2" /> Share
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
      <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-2xl fade-in-scale">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-4 font-poppins">
              <div
                className={`w-4 h-4 ${colorClasses[dotColor]} rounded-full`}
              />
              {title}
            </CardTitle>

            {/* Copy button on Summary/TL;DR/Summary+Audio only */}
            {currentSection !== 2 && (
              <button
                onClick={copyCurrent}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl
                  bg-blue-100 hover:bg-blue-200 
                  dark:bg-blue-950/50 dark:hover:bg-blue-900/50 
                  text-blue-600 dark:text-blue-400 transition-all duration-300 hover:scale-105 shadow-lg"
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

        <CardContent className="max-h-[70vh] overflow-y-auto scrollbar-thin">
          {/* TL;DR */}
          {currentSection === 0 && (
            <ul className="list-disc list-inside space-y-4 text-xl leading-relaxed text-slate-700 dark:text-slate-300">
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
              className="text-xl leading-relaxed text-slate-700 dark:text-slate-300"
              dangerouslySetInnerHTML={{
                __html: (data.simplifiedText || "").replace(/\n/g, "<br>"),
              }}
            />
          )}

          {/* Audio */}
          {currentSection === 2 && (
            <div className="space-y-8 text-center">
              <p className="text-2xl text-slate-700 dark:text-slate-300">
                🎧 Listen to the article with our AI-powered narration
              </p>
              <AudioControls audioUrl={data.audioUrl} size="large" />
            </div>
          )}

          {/* Summary + Audio */}
          {currentSection === 3 && (
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Summary card */}
              <div className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-poppins">
                      Summary
                    </h3>
                  </div>
                  <button
                    onClick={copyCurrent}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl
            bg-emerald-100 hover:bg-emerald-200 
            dark:bg-emerald-950/50 dark:hover:bg-emerald-900/50 
            text-emerald-600 dark:text-emerald-400 transition-all duration-300 hover:scale-105 shadow-lg"
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
                  className="p-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300 
          max-h-[45vh] overflow-y-auto scrollbar-thin"
                  dangerouslySetInnerHTML={{
                    __html: (data.simplifiedText || "").replace(/\n/g, "<br>"),
                  }}
                />
              </div>

              {/* Audio card */}
              <div className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col">
                <div className="flex items-center px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-poppins">
                    Audio
                  </h3>
                </div>
                <div className="p-6 flex flex-col gap-6 justify-center min-h-[300px]">
                  <p className="text-lg text-slate-700 dark:text-slate-300 text-center">
                    🎧 Listen to the article with our AI-powered narration
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
