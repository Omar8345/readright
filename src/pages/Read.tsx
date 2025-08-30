"use client";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Volume2,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Share,
} from "lucide-react";

export const ReadPage = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [focusMode, setFocusMode] = useState(false);
  const [currentSection, setCurrentSection] = useState(0); // 0: TLDR, 1: Summary, 2: Audio, 3: Summary + Audio
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!documentId) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APPWRITE_API_ENDPOINT}/databases/${
            import.meta.env.VITE_APPWRITE_DATABASE_ID
          }/collections/articles/documents/${documentId}?project=${
            import.meta.env.VITE_APPWRITE_PROJECT_ID
          }`
        );
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const json = await res.json();
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e.message || "Failed to load");
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [documentId]);

  const AudioControls = ({
    size = "normal",
  }: {
    size?: "normal" | "large";
  }) => (
    <div className="space-y-4">
      {data?.audioUrl ? (
        <audio
          controls
          className={`w-full ${size === "large" ? "h-12" : "h-10"}`}
          preload="metadata"
        >
          <source src={data.audioUrl} type="audio/mpeg" />
          <source src={data.audioUrl} type="audio/wav" />
          <source src={data.audioUrl} type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p
          className={`text-slate-500 italic ${
            size === "large" ? "text-base" : "text-sm"
          }`}
        >
          Audio not available for this article
        </p>
      )}
    </div>
  );

  const sections = ["TLDR", "Summary", "Audio", "Summary + Audio"];

  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    indigo: "bg-indigo-500",
  };

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Failed to copy link:", err);
      alert("Failed to copy link");
    }
  };

  const displayTitle = data?.title;

  if (focusMode) {
    const currentSectionData = {
      0: {
        // TLDR
        title: "TL;DR",
        color: "blue",
        content: data?.tldr ? (
          <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed">
            {data.tldr
              .split("\n")
              .filter((line: string) => line.trim())
              .map((point: string, index: number) => (
                <li key={index} className="text-slate-700">
                  {point.replace(/^[•*-]\s*/, "").trim()}
                </li>
              ))}
          </ul>
        ) : (
          <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed">
            <li className="text-slate-700">
              Key insights and information presented clearly
            </li>
            <li className="text-slate-700">
              Accessible reading format for all users
            </li>
            <li className="text-slate-700">
              Quick understanding of main concepts
            </li>
            <li className="text-slate-700">
              Optimized for readability and comprehension
            </li>
          </ul>
        ),
      },
      1: {
        // Summary
        title: "Summary",
        color: "green",
        content: data?.simplifiedText ? (
          <div
            className="text-lg leading-relaxed text-slate-700"
            dangerouslySetInnerHTML={{
              __html: data.simplifiedText.replace(/\n/g, "<br>"),
            }}
          />
        ) : (
          <div className="text-lg leading-relaxed text-slate-700 space-y-4">
            <p>
              This article covers important topics in a clear,
              easy-to-understand way.
            </p>
            <p>
              The main ideas are presented with simple language and good
              structure.
            </p>
            <p>Perfect for quick reading and better understanding.</p>
          </div>
        ),
      },
      2: {
        // Audio
        title: "Audio",
        color: "purple",
        content: (
          <div className="space-y-6">
            <p className="text-lg text-slate-700">
              Listen to the article with our AI-powered narration
            </p>
            <AudioControls size="large" />
          </div>
        ),
      },
      3: {
        // Summary + Audio
        title: "Summary + Audio",
        color: "indigo",
        content: (
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Summary Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Summary
                </h3>
              </div>
              <div className="text-lg leading-relaxed text-slate-700 max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                {data?.simplifiedText ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.simplifiedText.replace(/\n/g, "<br>"),
                    }}
                  />
                ) : (
                  <div className="space-y-4">
                    <p>
                      This article covers important topics in a clear,
                      easy-to-understand way.
                    </p>
                    <p>
                      The main ideas are presented with simple language and good
                      structure.
                    </p>
                    <p>Perfect for quick reading and better understanding.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Audio Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <h3 className="text-xl font-semibold text-slate-900">Audio</h3>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-slate-700">
                  Listen to the article with our AI-powered narration
                </p>
                <AudioControls size="large" />
              </div>
            </div>
          </div>
        ),
      },
    }[currentSection];

    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        {showToast && (
          <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            Link copied to clipboard!
          </div>
        )}
        <div className="container mx-auto px-4 py-16 pt-24">
          {/* Focus Mode Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setFocusMode(false)}
                className="border-slate-300"
              >
                <X className="w-4 h-4 mr-2" />
                Exit Focus
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="border-slate-300 bg-transparent"
              >
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              {currentSection === 0 && (
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 text-sm font-medium rounded-full">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  TL;DR
                </div>
              )}
              {currentSection === 1 && (
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 text-sm font-medium rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Summary
                </div>
              )}
              {currentSection === 2 && (
                <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 text-sm font-medium rounded-full">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Audio
                </div>
              )}
              {currentSection === 3 && (
                <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-3 py-1 text-sm font-medium rounded-full">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  Summary + Audio
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSection}
                disabled={currentSection === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-slate-600 px-2">
                {currentSection + 1} of {sections.length}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSection}
                disabled={currentSection === sections.length - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Focus Mode Content */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl font-semibold text-slate-900 flex items-center gap-3">
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
            <CardContent className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
              {currentSectionData.content}
            </CardContent>
          </Card>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          Link copied to clipboard!
        </div>
      )}
      <div className="container mx-auto px-4 py-16 pt-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 text-sm font-medium mb-4">
            <Volume2 className="w-4 h-4" />
            Accessible Web Reader
          </div>
          {displayTitle && (
            <h1 className="text-4xl font-bold font-poppins mb-4 text-slate-900">
              {displayTitle}
            </h1>
          )}
          <p className="text-lg text-slate-600 font-inter">
            Read any article, get a reader-friendly version, TL;DR summary, and
            audio narration instantly.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <Button
              onClick={() => setFocusMode(true)}
              variant="outline"
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              <Eye className="w-4 h-4 mr-2" />
              Focus Mode
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading content…</p>
          </div>
        )}

        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <p className="text-red-700 mb-4">Error: {error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                Retry
              </Button>
            </CardContent>
          </Card>
        )}

        {!loading && !error && data && (
          <div className="space-y-8">
            {/* Three main sections */}
            <div className="grid gap-8 lg:grid-cols-3">
              {/* TLDR Section */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm h-[320px]">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    TL;DR
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 h-[220px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                  <div className="text-slate-700 leading-relaxed break-words">
                    {data.tldr ? (
                      <ul className="list-disc list-inside space-y-2">
                        {data.tldr
                          .split("\n")
                          .filter((line: string) => line.trim())
                          .map((point: string, index: number) => (
                            <li key={index} className="break-words">
                              {point.replace(/^[•*-]\s*/, "").trim()}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <ul className="list-disc list-inside space-y-2">
                        <li className="break-words">
                          Key insights and information presented clearly
                        </li>
                        <li className="break-words">
                          Accessible reading format for all users
                        </li>
                        <li className="break-words">
                          Quick understanding of main concepts
                        </li>
                        <li className="break-words">
                          Optimized for readability and comprehension
                        </li>
                      </ul>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Summary Section */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm h-[320px]">
                <CardHeader className="pb-4 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
                  <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 overflow-y-auto h-[220px] scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                  <div className="text-slate-700 leading-relaxed">
                    {data.simplifiedText ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data.simplifiedText.replace(/\n/g, "<br>"),
                        }}
                      />
                    ) : (
                      <>
                        <p className="mb-3">
                          This article covers important topics in a clear,
                          easy-to-understand way.
                        </p>
                        <p className="mb-3">
                          The main ideas are presented with simple language and
                          good structure.
                        </p>
                        <p>
                          Perfect for quick reading and better understanding.
                        </p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Audio Section */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm h-[320px]">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Audio
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-slate-700 text-sm mb-4">
                    Listen to the article with our AI-powered narration
                  </div>
                  <AudioControls />
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default ReadPage;
