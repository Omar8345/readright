import { X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

export const VideoModal = ({ isOpen, onClose, videoUrl }: VideoModalProps) => {
  if (!isOpen) return null;

  const processedVideoUrl = videoUrl.includes("?")
    ? `${videoUrl}&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0`
    : `${videoUrl}?controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-900/95 backdrop-blur-md" />

      {/* Modal Content */}
      <div className="relative w-full max-w-6xl mx-auto fade-in-scale">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-poppins">
                ReadRight Demo
              </h3>
              <p className="text-sm text-slate-300">
                See how ReadRight transforms articles
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-110"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Video Container */}
        <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          {/* Video Iframe */}
          <iframe
            src={processedVideoUrl}
            title="ReadRight Demo Video"
            className="w-full h-full rounded-3xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />

          {/* Loading Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center opacity-0 transition-opacity duration-300">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center mb-4 mx-auto animate-pulse">
                <Play className="w-8 h-8 text-white" />
              </div>
              <p className="text-white font-medium">Loading video...</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 px-2">
          <div className="text-sm text-slate-400">
            Press{" "}
            <kbd className="px-2 py-1 bg-white/10 rounded-md text-white">
              Esc
            </kbd>{" "}
            to close
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            HD Quality
          </div>
        </div>
      </div>
    </div>
  );
};
