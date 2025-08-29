import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { VideoModal } from "@/components/VideoModal";
import heroImage from "@/assets/hero-reading.jpg";

export const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

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
            <div className="inline-flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-soft">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-primary-foreground font-inter">
                Accessibility Made Simple
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight font-poppins">
              <span className="text-foreground">ReadRight</span>
              <br />
              <span className="gradient-text">Accessible Reading</span>
              <br />
              <span className="text-foreground">Made Simple</span>
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
                variant="hero"
                size="lg"
                className="group px-8 py-6 text-lg font-poppins"
              >
                Try it Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="floating"
                size="lg"
                onClick={() => setIsVideoOpen(true)}
                className="group px-8 py-6 text-lg font-poppins"
              >
                <Play className="w-5 h-5" />
                View Demo
              </Button>
            </div>
          </div>

          {/* Image Column */}
          <div className="relative animate-fadeInUp delay-300">
            <div className="relative bg-gradient-card rounded-3xl p-8 shadow-float group">
              <img
                src={heroImage}
                alt="People reading with accessibility tools - showing diverse users engaging with readable content"
                className="w-full h-auto rounded-2xl shadow-medium transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2"
              />

              {/* Floating UI Elements */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-medium animate-float-delayed">
                <div className="flex items-center gap-2 text-sm font-medium font-inter">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  TL;DR Ready!
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-medium animate-float-delayed">
                <div className="flex items-center gap-2 text-sm font-medium font-inter">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
                  Audio Playing
                </div>
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-secondary opacity-20 rounded-3xl blur-3xl -z-10 animate-pulse-glow" />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
      />
    </section>
  );
};
