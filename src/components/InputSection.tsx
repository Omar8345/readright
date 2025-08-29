import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Upload, Link, FileText, Sparkles, ArrowRight } from "lucide-react";

export const InputSection = () => {
  const [inputType, setInputType] = useState<"url" | "text" | "pdf">("url");
  const [urlValue, setUrlValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      // Here you would handle the actual processing logic
    }, 2000);
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
              Simply paste a URL, upload text, or add a PDF. We'll transform it
              into an accessible reading experience.
            </p>
          </div>

          {/* Input Card */}
          <Card className="p-8 shadow-float bg-gradient-card border-0 animate-fadeInUp delay-200">
            {/* Input Type Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Button
                variant={inputType === "url" ? "hero" : "ghost"}
                onClick={() => setInputType("url")}
                className="rounded-full font-inter"
              >
                <Link className="w-4 h-4" />
                URL
              </Button>
              <Button
                variant={inputType === "text" ? "hero" : "ghost"}
                onClick={() => setInputType("text")}
                className="rounded-full font-inter"
              >
                <FileText className="w-4 h-4" />
                Text
              </Button>
              <Button
                variant={inputType === "pdf" ? "hero" : "ghost"}
                onClick={() => setInputType("pdf")}
                className="rounded-full font-inter"
              >
                <Upload className="w-4 h-4" />
                PDF
              </Button>
            </div>

            {/* Input Content */}
            <div className="space-y-6">
              {inputType === "url" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground font-inter">
                    Article URL
                  </label>
                  <Input
                    placeholder="https://example.com/article"
                    value={urlValue}
                    onChange={(e) => setUrlValue(e.target.value)}
                    className="h-14 text-lg rounded-xl border-2 focus:border-secondary transition-colors"
                  />
                </div>
              )}

              {inputType === "text" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground font-inter">
                    Paste your text
                  </label>
                  <Textarea
                    placeholder="Paste your article text here..."
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    className="min-h-40 text-lg rounded-xl border-2 focus:border-secondary transition-colors resize-none"
                  />
                </div>
              )}

              {inputType === "pdf" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground font-inter">
                    Upload PDF
                  </label>
                  <div className="border-2 border-dashed border-border hover:border-secondary transition-colors rounded-xl p-12">
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-medium text-foreground mb-2 font-inter">
                        Drop your PDF here
                      </p>
                      <p className="text-muted-foreground mb-4 font-inter">
                        or click to browse files
                      </p>
                      <Button
                        variant="outline"
                        className="rounded-full font-inter"
                      >
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Process Button */}
              <div className="pt-4">
                <Button
                  onClick={handleProcess}
                  disabled={isProcessing}
                  variant="cta"
                  size="lg"
                  className="w-full sm:w-auto px-12 py-6 text-lg group font-poppins"
                >
                  {isProcessing ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-spin" />
                      Processing Magic...
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

          {/* Quick Tips */}
          <div className="grid sm:grid-cols-3 gap-6 mt-12 animate-fadeInUp delay-300">
            <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Link className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 font-poppins">Any Website</h3>
              <p className="text-sm text-muted-foreground font-inter">
                Works with news sites, blogs, Wikipedia, and more
              </p>
            </div>

            <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 font-poppins">
                Instant Processing
              </h3>
              <p className="text-sm text-muted-foreground font-inter">
                Get your accessible version in seconds
              </p>
            </div>

            <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 font-poppins">AI-Powered</h3>
              <p className="text-sm text-muted-foreground font-inter">
                Smart summaries and optimized formatting
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
