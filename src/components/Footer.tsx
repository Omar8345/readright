import { Button } from "@/components/ui/button";
import { Heart, Github, Twitter, Mail, Book, ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
                  <Book className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold font-poppins bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    ReadRight
                  </h3>
                  <p className="text-slate-400 text-sm font-medium">
                    Making reading accessible for everyone
                  </p>
                </div>
              </div>

              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl font-inter">
                Transforming the digital reading experience through AI-powered
                accessibility tools. Every article becomes dyslexia-friendly,
                summarized, and audio-enabled in seconds.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-start lg:justify-end">
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 hover:scale-110 transition-all duration-300 text-slate-400 hover:text-white"
                  onClick={() =>
                    window.open("https://x.com/DevOmar100", "_blank")
                  }
                >
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 hover:scale-110 transition-all duration-300 text-slate-400 hover:text-white"
                  onClick={() =>
                    window.open(
                      "https://github.com/Omar8345/readright",
                      "_blank"
                    )
                  }
                >
                  <Github className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 hover:scale-110 transition-all duration-300 text-slate-400 hover:text-white"
                  onClick={() =>
                    window.open("mailto:yo@omarcodes.io", "_blank")
                  }
                >
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-800 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400 font-inter">
              <span>© 2025 ReadRight. Crafted with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>for accessibility</span>
            </div>

            <div className="flex gap-2 items-center text-gray-300">
              <span>Powered by</span>
              <a
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors font-medium"
                href="https://appwrite.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/appwrite.svg" className="w-5 h-5" alt="Appwrite" />
                Appwrite
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
