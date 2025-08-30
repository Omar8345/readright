import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";

interface ProcessingDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const didYouKnowMessages = [
  "Did you know ReadRight uses Google Gemini 2.5 Flash technology?",
  "Did you know you can return to the same link to view the same article?",
  "Did you know ReadRight is open-source?",
  "Did you know ReadRight uses Microsoft's Text-to-Speech service?",
  "Did you know ReadRight's backend relies completely on Appwrite and Python?",
  "Did you know ReadRight's AI can simplify complex academic papers?",
  "Did you know that ReadRight is completely open-source?",
];

export const ProcessingDialog = ({
  isOpen,
  onOpenChange,
}: ProcessingDialogProps) => {
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      const randomIndex = Math.floor(Math.random() * didYouKnowMessages.length);
      setCurrentMessage(didYouKnowMessages[randomIndex]);
    } else {
      setCurrentMessage("");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 border-0 shadow-2xl">
        <div className="processing-overlay min-h-[420px] flex items-center justify-center p-8">
          <div className="text-center space-y-8 animate-fadeInUp">
            <div className="w-16 h-16 mx-auto">
              <Sparkles className="w-16 h-16 text-processing-primary animate-spin-slow" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold font-poppins text-foreground">
                Processing Your Article
              </h2>
              <p className="text-muted-foreground font-inter">
                Our AI is working its magic...
              </p>
            </div>
            <div className="max-w-sm mx-auto">
              <div className="animate-fade-slide p-5 bg-gradient-card rounded-xl border border-border/50">
                <p className="text-sm font-medium text-processing-primary mb-2 font-poppins">
                  💡 Did you know?
                </p>
                <p className="text-foreground font-inter leading-relaxed">
                  {currentMessage}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
