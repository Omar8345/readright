"use client";

import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Client, TablesDB } from "appwrite";

import { ShareToast } from "@/components/read/ShareToast";
import { LoadingState } from "@/components/read/LoadingState";
import { PageHeader } from "@/components/read/PageHeader";
import { SectionCard } from "@/components/read/SectionCard";
import { FocusMode } from "@/components/read/FocusMode";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_API_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
const tablesDB = new TablesDB(client);

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
        const res = await tablesDB.getRow({
          databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
          tableId: import.meta.env.VITE_APPWRITE_TABLE_ID,
          rowId: documentId,
        });
        if (res.simplifiedText) {
          setData(res);
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

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % 4);
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + 4) % 4);
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

  const bgClass =
    "bg-gradient-to-br from-slate-50 dark:from-gray-900 to-blue-50 dark:to-gray-800";

  if (focusMode) {
    return (
      <main className={`min-h-screen ${bgClass}`}>
        <Navigation />
        <ShareToast show={showToast} />
        <FocusMode
          data={data}
          currentSection={currentSection}
          onExit={() => setFocusMode(false)}
          onShare={handleShare}
          onNextSection={nextSection}
          onPrevSection={prevSection}
        />
        <Footer />
      </main>
    );
  }

  return (
    <main className={`min-h-screen ${bgClass}`}>
      <Navigation />
      <ShareToast show={showToast} />
      <div className="container mx-auto px-4 py-16 pt-24">
        <PageHeader
          title={displayTitle}
          onFocusMode={() => setFocusMode(true)}
          onShare={handleShare}
        />

        {loading && <LoadingState />}

        {error && <Navigate to="/404" />}

        {!loading && !error && data && (
          <div className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <SectionCard
                title="TL;DR"
                colorClass="bg-blue-500"
                content={
                  <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-gray-300">
                    {data.tldr
                      .split("\n")
                      .filter((line: string) => line.trim())
                      .map((point: string, index: number) => (
                        <li key={index} className="break-words">
                          {point.replace(/^[•*-]\s*/, "").trim()}
                        </li>
                      ))}
                  </ul>
                }
              />
              <SectionCard
                title="Summary"
                colorClass="bg-green-500"
                content={
                  <div
                    className="text-slate-700 dark:text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: data.simplifiedText.replace(/\n/g, "<br>"),
                    }}
                  />
                }
              />
              <SectionCard
                title="Audio"
                colorClass="bg-purple-500"
                content={null}
                audioUrl={data.audioUrl}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default ReadPage;
