import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Link, FileText, Sparkles, ArrowRight } from "lucide-react";
import { ProcessingDialog } from "@/components/ProcessingDialog";
import axios from "axios";

export const InputSection = () => {
  const [inputType, setInputType] = useState<"url" | "text">("url");
  const [urlValue, setUrlValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [documentId, setDocumentId] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const isUrlValid =
    inputType === "url" &&
    (() => {
      if (!urlValue.trim()) return false;
      try {
        const u = new URL(urlValue.trim());
        return u.protocol === "https:" || u.protocol === "http:";
      } catch {
        return false;
      }
    })();

  const textLength = textValue.length;
  const isTextValid = inputType === "text" && textLength >= 500;

  const canProcess =
    (inputType === "url" && isUrlValid) ||
    (inputType === "text" && isTextValid);

  const validate = () => {
    if (inputType === "url" && !isUrlValid) {
      setError("Enter a valid http(s) URL.");
      return false;
    }
    if (inputType === "text" && !isTextValid) {
      setError("Text must be at least 500 characters.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleProcess = async () => {
    if (!validate()) return;
    setError(null);
    setIsProcessing(true);
    setShowDialog(true);
    setDocumentId(null);

    const endpoint = import.meta.env.VITE_APPWRITE_FUNCTION_ENDPOINT;

    try {
      const payload =
        inputType === "url" ? { url: urlValue.trim() } : { text: textValue };

      const response = await axios({
        method: "post",
        url: endpoint,
        data: payload,
      });

      if (response.status !== 200) {
        const msg =
          response.data?.message || `Request failed (${response.status})`;
        throw new Error(msg);
      }

      const data = response.data;
      setDocumentId(data.id);
    } catch (e: any) {
      setError(e.message || "Unexpected error.");
      setIsProcessing(false);
      return;
    }

    setTimeout(() => {
      setIsProcessing(false);
    }, 600);
  };

  return (
    <section id="demo" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-poppins">
              Start Reading
              <span className="gradient-text"> Instantly</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-inter">
              Simply paste a URL, or upload your own text. We'll transform it
              into an accessible reading experience.
            </p>
          </div>

          {/* Input Card */}
          <Card className="p-8 shadow-float bg-gradient-card border-0 animate-fadeInUp delay-200">
            {/* Input Type Tabs */}
            <div className="flex gap-2 mb-8">
              <Button
                variant={inputType === "url" ? "hero" : "ghost"}
                onClick={() => {
                  setInputType("url");
                  setError(null);
                }}
                className="flex-1 rounded-full font-inter flex items-center justify-center gap-2"
              >
                <Link className="w-4 h-4" />
                URL
              </Button>
              <Button
                variant={inputType === "text" ? "hero" : "ghost"}
                onClick={() => {
                  setInputType("text");
                  setError(null);
                }}
                className="flex-1 rounded-full font-inter flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Text
              </Button>
            </div>

            {/* Inputs */}
            <div className="space-y-6">
              {inputType === "url" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground font-inter">
                    Article URL
                  </label>
                  <Input
                    placeholder="https://nytimes.com/article"
                    value={urlValue}
                    onChange={(e) => setUrlValue(e.target.value)}
                    className="h-14 text-lg rounded-xl border-2 focus:border-secondary transition-colors"
                  />
                  <div className="text-sm font-inter h-5">
                    {urlValue && !isUrlValid && (
                      <span className="text-destructive">
                        Invalid URL format.
                      </span>
                    )}
                    {isUrlValid && (
                      <span className="text-green-500">URL looks good.</span>
                    )}
                  </div>
                </div>
              )}

              {inputType === "text" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground font-inter">
                    Paste your text
                  </label>
                  <Textarea
                    placeholder="Paste at least 500 characters..."
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    className="min-h-40 text-lg rounded-xl border-2 focus:border-secondary transition-colors resize-y"
                  />
                  <div className="flex justify-between text-sm font-inter">
                    <span
                      className={
                        isTextValid ? "text-green-500" : "text-muted-foreground"
                      }
                    >
                      {textLength} / 500 characters
                    </span>
                    {!isTextValid && textLength > 0 && (
                      <span className="text-destructive">
                        Need {500 - textLength} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div
                  className="text-sm text-destructive font-inter"
                  aria-live="polite"
                >
                  {error}
                </div>
              )}

              {/* Process Button */}
              <div className="pt-4">
                <Button
                  onClick={handleProcess}
                  disabled={!canProcess || isProcessing}
                  variant="cta"
                  size="lg"
                  className="w-full sm:w-auto px-12 py-6 text-lg group font-poppins"
                >
                  {isProcessing ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Process Article
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Processing Dialog Preview */}
      <ProcessingDialog
        isOpen={showDialog}
        onOpenChange={(open) => {
          setShowDialog(open);
          if (!open) {
            setIsProcessing(false);
          }
        }}
        documentId={documentId ?? undefined}
      />
    </section>
  );
};
