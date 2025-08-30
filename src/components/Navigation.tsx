import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-soft">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold font-poppins text-foreground">
              ReadRight
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#home"
              className="text-foreground hover:text-primary transition-colors duration-300 font-inter font-medium"
            >
              Home
            </a>
            <a
              href="#features"
              className="text-foreground hover:text-primary transition-colors duration-300 font-inter font-medium"
            >
              Features
            </a>

            <Button
              variant="hero"
              className="ml-4"
              onClick={() => document.getElementById("demo")?.scrollIntoView()}
            >
              Try it Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a
                href="#home"
                className="text-foreground hover:text-primary transition-colors duration-300 font-inter font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#features"
                className="text-foreground hover:text-primary transition-colors duration-300 font-inter font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#demo"
                className="text-foreground hover:text-primary transition-colors duration-300 font-inter font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Demo
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-primary transition-colors duration-300 font-inter font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>

              <Button variant="hero" className="mt-4 self-start">
                Try it Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
