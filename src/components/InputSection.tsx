import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Link, FileText, Sparkles, ArrowRight } from "lucide-react";
import { ErrorToast } from "@/components/ErrorToast";
import { ProcessingDialog } from "@/components/ProcessingDialog";
import { Client, Functions, ExecutionMethod, ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_API_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const functions = new Functions(client);

export const InputSection = () => {
  const [inputType, setInputType] = useState<"url" | "text">("url");
  const [urlValue, setUrlValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

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

    try {
      const readId = ID.unique();
      const payload =
        inputType === "url"
          ? { url: urlValue.trim(), docid: readId }
          : { text: textValue, docid: readId };

      try {
        const res = await functions.createExecution(
          import.meta.env.VITE_APPWRITE_FUNCTION_ID,
          JSON.stringify(payload),
          true,
          "/",
          ExecutionMethod.POST
        );
        const workId = res.$id;
        await new Promise((resolve) => setTimeout(resolve, 25000));
        let completed = false;
        while (!completed) {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          const exec = await axios.get(
            `https://readrightworker.fra.appwrite.run/?workerid=${workId}`
          );
          const responseBody = exec.data;
          if (
            responseBody.status === "completed" &&
            responseBody.responseStatusCode === 200
          ) {
            setIsProcessing(false);
            setShowDialog(false);
            navigate(`/read/${readId}`);
            completed = true;
          } else if (responseBody.status === "failed") {
            setError("Failed to process request.");
            setIsProcessing(false);
            setShowDialog(false);
            completed = true;
          }
        }
      } catch (error) {
        throw error;
      }
    } catch (e: any) {
      setError(
        `Failed to process request. Please double-check your URL or text.`
      );
      setIsProcessing(false);
      setShowDialog(false);
      return;
    }
  };

  return (
    <section
      id="demo"
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-poppins text-slate-900 dark:text-white">
              Start Reading
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                {" "}
                Instantly
              </span>
            </h2>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-inter">
              Simply paste a URL, or upload your own text. We'll transform it
              into an accessible reading experience.
            </p>
          </div>

          {/* Input Card */}
          <Card className="p-8 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 animate-fadeInUp">
            {/* Input Type Tabs */}
            <div className="flex gap-2 mb-8">
              <Button
                variant={inputType === "url" ? "hero" : "ghost"}
                onClick={() => {
                  setInputType("url");
                  setError(null);
                }}
                className={`flex-1 rounded-full font-inter flex items-center justify-center gap-2
      ${
        inputType === "url"
          ? "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white transform transition-transform duration-200 hover:scale-105"
          : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
      }`}
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
                className={`flex-1 rounded-full font-inter flex items-center justify-center gap-2
      ${
        inputType === "text"
          ? "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white transform transition-transform duration-200 hover:scale-105"
          : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
      }`}
              >
                <FileText className="w-4 h-4" />
                Text
              </Button>
            </div>

            {/* Inputs */}
            <div className="space-y-6">
              {inputType === "url" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900 dark:text-slate-200 font-inter">
                    Article URL
                  </label>
                  <Input
                    placeholder="https://nytimes.com/article"
                    value={urlValue}
                    onChange={(e) => setUrlValue(e.target.value)}
                    className="h-14 text-lg rounded-xl border-2 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 transition-colors"
                  />
                  <div className="text-sm font-inter h-5">
                    {urlValue && !isUrlValid && (
                      <span className="text-red-600 dark:text-red-400">
                        Invalid URL format.
                      </span>
                    )}
                    {isUrlValid && (
                      <span className="text-green-600 dark:text-green-400">
                        URL looks good.
                      </span>
                    )}
                  </div>
                </div>
              )}

              {inputType === "text" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900 dark:text-slate-200 font-inter">
                    Paste your text
                  </label>
                  <Textarea
                    placeholder="Paste at least 500 characters..."
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    className="min-h-40 text-lg rounded-xl border-2 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 transition-colors resize-y"
                  />
                  <div className="flex justify-between text-sm font-inter">
                    <span
                      className={
                        isTextValid
                          ? "text-green-600 dark:text-green-400"
                          : "text-slate-600 dark:text-slate-400"
                      }
                    >
                      {textLength} / 500 characters
                    </span>
                    {!isTextValid && textLength > 0 && (
                      <span className="text-red-600 dark:text-red-400">
                        Need {500 - textLength} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {error && (
                <ErrorToast message={error} onClose={() => setError(null)} />
              )}

              {/* Process Button */}
              <div className="pt-4">
                <Button
                  onClick={handleProcess}
                  disabled={!canProcess || isProcessing}
                  variant="cta"
                  size="lg"
                  className="w-full sm:w-auto px-12 py-6 text-lg font-poppins bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0"
                >
                  {isProcessing ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Process Article
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <ProcessingDialog
        isOpen={showDialog}
        onOpenChange={(open) => {
          setShowDialog(open);
          if (!open) setIsProcessing(false);
        }}
      />
    </section>
  );
};
