import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Zap, Shield } from "lucide-react";
import { VideoModal } from "@/components/VideoModal";
import heroImage from "@/assets/hero-reading.jpg";

export const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = heroImage;
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950 overflow-hidden pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-200/30 to-purple-200/30 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Content Column */}
          <div className="space-y-10 fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full px-6 py-3 shadow-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-pulse" />
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  AI-Powered Accessibility
                </span>
              </div>
              <div className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full" />
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Privacy First
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-8xl font-bold font-poppins leading-tight">
                <span className="block text-slate-900 dark:text-white">
                  Reading
                </span>
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Reimagined
                </span>
                <span className="block text-slate-900 dark:text-white">
                  for Everyone
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full" />
            </div>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl font-inter">
              Transform any article into a{" "}
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                dyslexia-friendly
              </span>{" "}
              experience with instant{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                AI summaries
              </span>{" "}
              and natural{" "}
              <span className="text-purple-600 dark:text-purple-400 font-semibold">
                audio narration
              </span>
              .
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button
                size="lg"
                onClick={() =>
                  document.getElementById("demo")?.scrollIntoView()
                }
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0"
              >
                <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Start Reading Smarter
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                onClick={() => setIsVideoOpen(true)}
                className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-800 dark:text-slate-200 font-semibold px-8 py-4 text-lg rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800/90 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-500 hover:scale-105 shadow-lg"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Image Column */}
          <div className="relative fade-in-scale delay-300">
            <div className="relative group">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-700">
                {!loaded && (
                  <div className="w-full h-[500px] rounded-3xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
                )}

                <img
                  src={heroImage}
                  alt="Accessible reading experience with ReadRight"
                  className={`w-full h-auto rounded-3xl transition-all duration-1000 group-hover:scale-105 ${
                    loaded ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-800 dark:text-slate-200 px-4 py-3 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 hero-float">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  TL;DR Generated
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-800 dark:text-slate-200 px-4 py-3 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 hero-float-delayed">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  Audio Ready
                </div>
              </div>

              <div className="absolute top-1/2 -right-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-800 dark:text-slate-200 px-3 py-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 rotate-12 hero-float">
                <div className="text-xs font-medium">🎯 Focus Mode</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl="https://www.youtube.com/embed/e1a9X-Ri5W4?si=QcA9MCYMs-0rk7db&autoplay=1"
      />
    </section>
  );
};
