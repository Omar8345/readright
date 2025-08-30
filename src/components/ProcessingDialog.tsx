import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Volume2, Clock, BookOpen, ArrowLeft } from "lucide-react";

interface ArticleData {
  title: string;
  simplifiedText: string;
  tldr?: string;
  audioUrl?: string;
}

interface ProcessingDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  documentId?: string;
}

const didYouKnowMessages = [
  "Did you know ReadRight uses Google Gemini 2.0 Flash technology?",
  "Did you know you can return to the same link to view the same article?",
  "Did you know ReadRight is open-source?",
  "Did you know ReadRight uses Microsoft's Text-to-Speech service?",
  "Did you know ReadRight's backend relies completely on Appwrite and Python?",
  "Did you know ReadRight's AI can simplify complex academic papers?",
  "Did you know that ReadRight is completely open-source?",
];

const APPWRITE_CONFIG = {
  endpoint: import.meta.env.VITE_APPWRITE_API_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
};

export const ProcessingDialog = ({
  isOpen,
  onOpenChange,
  documentId,
}: ProcessingDialogProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentMessage, setCurrentMessage] = useState("");
  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const randomIndex = Math.floor(Math.random() * didYouKnowMessages.length);
      setCurrentMessage(didYouKnowMessages[randomIndex]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !documentId) return;

    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const minLoadTime = new Promise((resolve) => setTimeout(resolve, 3000));

        const response = await fetch(
          `${APPWRITE_CONFIG.endpoint}/databases/${APPWRITE_CONFIG.databaseId}/collections/articles/documents/${documentId}?${APPWRITE_CONFIG.projectId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch article: ${response.statusText}`);
        }

        const data = await response.json();

        await minLoadTime;

        const article: ArticleData = {
          title: data.title || null,
          simplifiedText: data.simplifiedText,
          tldr: data.tldr,
          audioUrl: data.audioUrl,
        };

        setArticleData(article);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError(err instanceof Error ? err.message : "Failed to load article");
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [isOpen, documentId]);

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(true);
      setArticleData(null);
      setError(null);
      setCurrentMessage("");
    }
  }, [isOpen]);

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 border-0 shadow-2xl">
        {/* Full white overlay with centered content */}
        <div className="processing-overlay min-h-[600px] flex items-center justify-center p-8">
          {isLoading ? (
            /* Loading State */
            <div className="text-center space-y-8 animate-fadeInUp">
              {/* Loading Spinner */}
              <div className="relative">
                <div className="w-16 h-16 mx-auto">
                  <Sparkles className="w-16 h-16 text-processing-primary animate-spin-slow" />
                </div>
              </div>

              {/* Processing Text */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold font-poppins text-foreground">
                  Processing Your Article
                </h2>
                <p className="text-muted-foreground font-inter">
                  Our AI is working its magic...
                </p>
              </div>

              {/* Did You Know Message */}
              <div className="max-w-md mx-auto">
                <div className="animate-fade-slide p-6 bg-gradient-card rounded-xl border border-border/50">
                  <p className="text-sm font-medium text-processing-primary mb-2 font-poppins">
                    💡 Did you know?
                  </p>
                  <p className="text-foreground font-inter leading-relaxed">
                    {currentMessage}
                  </p>
                </div>
              </div>
            </div>
          ) : error ? (
            /* Error State */
            <div className="text-center space-y-6 animate-fadeInUp">
              <div className="w-16 h-16 mx-auto text-destructive">
                <BookOpen className="w-16 h-16" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-destructive font-poppins">
                  Oops! Something went wrong
                </h2>
                <p className="text-muted-foreground font-inter max-w-md">
                  {error}
                </p>
              </div>
              <Button
                onClick={handleClose}
                variant="outline"
                className="font-inter"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          ) : articleData ? (
            /* Article Display */
            <div className="w-full max-w-3xl space-y-6 animate-fadeInUp">
              {/* Header with close button */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1 pr-4">
                  <h1 className="text-3xl font-bold text-foreground font-poppins leading-tight">
                    {articleData.title}
                  </h1>
                </div>
                <Button
                  onClick={handleClose}
                  variant="ghost"
                  size="sm"
                  className="shrink-0 font-inter"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </div>

              {/* TL;DR Section */}
              {articleData.tldr && (
                <Card className="gradient-card border border-processing-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-processing-primary font-poppins">
                      <Clock className="w-5 h-5 mr-2" />
                      TL;DR Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground font-inter leading-relaxed">
                      {articleData.tldr}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Audio Player */}
              {articleData.audioUrl && (
                <Card className="gradient-card border border-processing-secondary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4">
                      <Volume2 className="w-5 h-5 text-processing-secondary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-processing-secondary mb-2 font-poppins">
                          Listen to this article
                        </p>
                        <audio controls className="w-full" preload="metadata">
                          <source
                            src={articleData.audioUrl}
                            type="audio/mpeg"
                          />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Main Article Content */}
              <Card className="gradient-card border-0 shadow-float">
                <CardContent className="pt-6">
                  <div className="prose prose-slate max-w-none">
                    <div className="text-foreground font-inter leading-relaxed space-y-4">
                      {articleData.simplifiedText
                        .split("\n\n")
                        .map((paragraph, index) => (
                          <p key={index} className="text-base leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};
