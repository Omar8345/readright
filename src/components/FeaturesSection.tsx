import { Card } from "@/components/ui/card";
import { Eye, FileText, Volume2, Settings, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Dyslexia-Friendly Text",
    description:
      "Optimized spacing, font choices, and contrast for better readability",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: FileText,
    title: "Smart TL;DR",
    description:
      "AI-generated summaries that capture the key points in bullet format",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Volume2,
    title: "Audio Narration",
    description:
      "High-quality text-to-speech with natural voices and adjustable speed",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Settings,
    title: "Customizable Display",
    description:
      "Adjust font size, spacing, colors, and themes to your preference",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Process any article in seconds with our optimized AI pipeline",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your content stays private - we don't store or track your reading",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-poppins">
            Powerful Features for
            <span className="gradient-text"> Everyone</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter">
            ReadRight combines cutting-edge AI with accessibility best practices
            to create the perfect reading experience for everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="p-8 bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2 hover:rotate-1 animate-fadeInUp group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>

              <h3 className="text-xl font-bold mb-4 text-foreground font-poppins">
                {feature.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed font-inter">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
