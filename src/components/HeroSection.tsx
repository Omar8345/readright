import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { VideoModal } from "@/components/VideoModal";
import heroImage from "@/assets/hero-reading.jpg";

export const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Preload hero image only when HeroSection is mounted
  useEffect(() => {
    const img = new Image();
    img.src = heroImage;
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-hero overflow-hidden pt-20"
    >
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content Column */}
          <div className="space-y-8 animate-fadeInUp">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gray-200/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-soft">
              <Sparkles className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 font-inter">
                Accessibility Made Simple
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-7xl font-bold font-poppins space-y-2">
              <span className="block text-foreground">ReadRight</span>
              <span className="block gradient-text">Accessible Reading</span>
              <span className="block text-foreground">Made Simple</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl font-inter">
              Paste any article, get a dyslexia-friendly version, TL;DR summary,
              and audio narration instantly. Reading has never been this
              accessible.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={() =>
                  document.getElementById("demo")?.scrollIntoView()
                }
                className="group px-8 py-6 text-lg font-poppins bg-blue-600 text-white dark:bg-yellow-400 dark:text-black rounded-xl shadow-lg hover:bg-blue-700 dark:hover:bg-yellow-300 transition-colors"
              >
                Try it Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                onClick={() => setIsVideoOpen(true)}
                className="group px-8 py-6 text-lg font-poppins bg-green-500 text-white dark:bg-green-700 dark:text-white rounded-xl shadow-lg hover:bg-green-600 dark:hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                View Demo
              </Button>
            </div>
          </div>

          {/* Image Column */}
          <div className="relative animate-fadeInUp delay-300">
            <div className="relative rounded-3xl p-8 shadow-float group">
              {/* Placeholder until hero image loads */}
              {!loaded && (
                <div className="w-full h-[400px] rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
              )}

              <img
                src={heroImage}
                alt="People reading with accessibility tools - showing diverse users engaging with readable content"
                className={`w-full h-auto rounded-2xl shadow-medium transition-all duration-700 group-hover:scale-105 group-hover:rotate-2 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Floating UI Elements */}
              <div className="absolute -top-4 -right-4 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-xl shadow-md animate-float-delayed">
                <div className="flex items-center gap-2 text-sm font-medium font-inter">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  TL;DR Ready!
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-xl shadow-md animate-float-delayed">
                <div className="flex items-center gap-2 text-sm font-medium font-inter">
                  <div className="w-2 h-2 bg-yellow-500 dark:bg-yellow-400 rounded-full animate-pulse" />
                  Audio Playing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl="https://www.youtube.com/embed/gEHv5HpLWUA?si=oNeJxCFoSZ0LFnr8"
      />
    </section>
  );
};
