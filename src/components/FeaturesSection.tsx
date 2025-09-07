import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Eye,
  FileText,
  Volume2,
  Settings,
  Zap,
  Cloud,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Dyslexia-Friendly Design",
    description:
      "Optimized typography, spacing, and contrast following accessibility best practices for enhanced readability",
    color: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-100 dark:bg-blue-950/50",
    borderClass: "border-blue-200 dark:border-blue-800",
  },
  {
    icon: FileText,
    title: "AI-Powered Summaries",
    description:
      "Intelligent TL;DR generation that captures essential information in digestible format",
    color: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-100 dark:bg-blue-950/50",
    borderClass: "border-blue-200 dark:border-blue-800",
  },
  {
    icon: Volume2,
    title: "Natural Voice Synthesis",
    description:
      "High-quality text-to-speech with adjustable speed and natural pronunciation",
    color: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-100 dark:bg-blue-950/50",
    borderClass: "border-blue-200 dark:border-blue-800",
  },
  {
    icon: Settings,
    title: "Personalized Experience",
    description:
      "Customizable themes, fonts, and layouts that adapt to your reading preferences",
    color: "text-blue-500 dark:text-blue-400",
    bgClass: "bg-blue-100 dark:bg-blue-950/50",
    borderClass: "border-blue-200 dark:border-blue-800",
  },
  {
    icon: Zap,
    title: "Lightning Performance",
    description:
      "Fast processing with optimized AI pipeline for quick article transformation",
    color: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-100 dark:bg-blue-950/50",
    borderClass: "border-blue-200 dark:border-blue-800",
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    description:
      "Your processed content is stored in the cloud for easy access and development purposes",
    color: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-100 dark:bg-blue-950/50",
    borderClass: "border-blue-200 dark:border-blue-800",
  },
];

export const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-blue-300/20 dark:bg-blue-800/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full px-6 py-3 mb-8">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              ✨ Features
            </span>
          </div>

          <h2 className="text-5xl lg:text-7xl font-bold mb-8 font-poppins">
            <span className="block text-slate-900 dark:text-white">
              Powerful Tools
            </span>
            <span className="block bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
              for Modern Reading
            </span>
          </h2>

          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-inter">
            Experience the future of accessible reading with our comprehensive
            suite of AI-powered tools designed for every user's needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className={`group relative p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm ${feature.borderClass} ${feature.bgClass} hover:bg-white dark:hover:bg-slate-800 border transition-all duration-500 hover:shadow-xl hover:-translate-y-2 overflow-hidden fade-in-scale`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Icon Container */}
              <div className="relative mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center ${feature.bgClass} border ${feature.borderClass} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                >
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-poppins group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-inter">
                  {feature.description}
                </p>
              </div>

              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <feature.icon className="w-full h-full text-slate-400 dark:text-slate-600" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
