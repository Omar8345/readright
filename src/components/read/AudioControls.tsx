interface AudioControlsProps {
  audioUrl?: string;
  size?: "normal" | "large";
}

export const AudioControls = ({
  audioUrl,
  size = "normal",
}: AudioControlsProps) => (
  <div className="space-y-4">
    {audioUrl ? (
      <audio
        controls
        className={`w-full ${size === "large" ? "h-12" : "h-10"}`}
        preload="metadata"
      >
        <source src={audioUrl} type="audio/mpeg" />
        <source src={audioUrl} type="audio/wav" />
        <source src={audioUrl} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
    ) : (
      <p
        className={`italic ${
          size === "large" ? "text-base" : "text-sm"
        } text-slate-500 dark:text-gray-400`}
      >
        Audio not available for this article
      </p>
    )}
  </div>
);
