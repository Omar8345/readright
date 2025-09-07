import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioControlsProps {
  audioUrl?: string;
  size?: "default" | "large";
}

export const AudioControls = ({
  audioUrl,
  size = "default",
}: AudioControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const newVolume = parseFloat(e.target.value);

    if (audio) {
      audio.volume = newVolume;
    }
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.currentTime + 10, duration);
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!audioUrl) {
    return (
      <div className="text-center p-8">
        <div className="text-slate-500 dark:text-slate-400 text-lg">
          No audio available for this article
        </div>
      </div>
    );
  }

  const isLarge = size === "large";

  return (
    <div
      className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl ${
        isLarge ? "p-8" : "p-4"
      }`}
    >
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Progress Bar */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          disabled={isLoading}
        />
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mb-4">
        {/* Skip Backward Button */}
        <div className="relative group">
          <Button
            onClick={skipBackward}
            variant="ghost"
            className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 shadow-lg"
            disabled={isLoading}
          >
            <SkipBack className="w-5 h-5" />
          </Button>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-slate-500 dark:text-slate-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            -10s
          </div>
        </div>

        {/* Play/Pause Button */}
        <Button
          onClick={togglePlay}
          className={`bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
            isLarge ? "w-16 h-16" : "w-14 h-14"
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
          ) : isPlaying ? (
            <Pause className={isLarge ? "w-8 h-8" : "w-6 h-6"} />
          ) : (
            <Play className={isLarge ? "w-8 h-8 ml-1" : "w-6 h-6 ml-1"} />
          )}
        </Button>

        {/* Skip Forward Button */}
        <div className="relative group">
          <Button
            onClick={skipForward}
            variant="ghost"
            className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 shadow-lg"
            disabled={isLoading}
          >
            <SkipForward className="w-5 h-5" />
          </Button>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-slate-500 dark:text-slate-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            +10s
          </div>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-2">
        <Button
          onClick={toggleMute}
          variant="ghost"
          size="sm"
          className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/50 rounded-lg p-2"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </Button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="flex-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: rgb(59 130 246);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: rgb(59 130 246);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};
