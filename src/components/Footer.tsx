import { Button } from "@/components/ui/button";
import { Heart, Github, Twitter, Mail, Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-3xl font-bold font-poppins">ReadRight</h3>
            </div>

            <p className="text-xl text-primary-foreground/80 leading-relaxed max-w-2xl font-inter">
              Making the web more accessible, one article at a time. ReadRight
              transforms any content into a dyslexia-friendly, audio-enabled
              reading experience.
            </p>

            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/20 rounded-full p-3"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/20 rounded-full p-3"
              >
                <Github className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/20 rounded-full p-3"
              >
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 font-inter">
            © 2025 ReadRight. Made with{" "}
            <Heart className="w-4 h-4 inline text-red-400" /> for accessibility.
          </p>
        </div>
      </div>
    </footer>
  );
};
