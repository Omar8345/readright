"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Share } from "lucide-react";
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
  const sections = ["TLDR", "Summary", "Audio", "Summary + Audio"];

  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    indigo: "bg-indigo-500",
  };

  const currentSectionData = {
    0: {
      title: "TL;DR",
      color: "blue",
      content: (
        <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed text-slate-700 dark:text-gray-300">
          {data.tldr
            .split("\n")
            .filter((line: string) => line.trim())
            .map((point: string, index: number) => (
              <li key={index} className="break-words">
                {point.replace(/^[•*-]\s*/, "").trim()}
              </li>
            ))}
        </ul>
      ),
    },
    1: {
      title: "Summary",
      color: "green",
      content: (
        <div
          className="text-lg leading-relaxed text-slate-700 dark:text-gray-300"
          dangerouslySetInnerHTML={{
            __html: data.simplifiedText.replace(/\n/g, "<br>"),
          }}
        />
      ),
    },
    2: {
      title: "Audio",
      color: "purple",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-slate-700 dark:text-gray-300">
            Listen to the article with our AI-powered narration
          </p>
          <AudioControls audioUrl={data.audioUrl} size="large" />
        </div>
      ),
    },
    3: {
      title: "Summary + Audio",
      color: "indigo",
      content: (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-gray-100">
                Summary
              </h3>
            </div>
            <div
              className="text-lg leading-relaxed text-slate-700 dark:text-gray-300 max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-gray-600 scrollbar-track-slate-100 dark:scrollbar-track-gray-800"
              dangerouslySetInnerHTML={{
                __html: data.simplifiedText.replace(/\n/g, "<br>"),
              }}
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-gray-100">
                Audio
              </h3>
            </div>
            <div className="space-y-6">
              <p className="text-lg text-slate-700 dark:text-gray-300">
                Listen to the article with our AI-powered narration
              </p>
              <AudioControls audioUrl={data.audioUrl} size="large" />
            </div>
          </div>
        </div>
      ),
    },
  }[currentSection];

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
        <div className={`w-2 h-2 ${badge.dot} rounded-full`}></div>
        {badge.label}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
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

      <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-3xl font-semibold text-slate-900 dark:text-gray-100 flex items-center gap-3">
            <div
              className={`w-3 h-3 ${
                colorClasses[
                  currentSectionData.color as keyof typeof colorClasses
                ]
              } rounded-full`}
            ></div>
            {currentSectionData.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-gray-600 scrollbar-track-slate-100 dark:scrollbar-track-gray-800">
          {currentSectionData.content}
        </CardContent>
      </Card>
    </div>
  );
};
