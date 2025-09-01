interface ShareToastProps {
  show: boolean;
}

export const ShareToast = ({ show }: ShareToastProps) => {
  if (!show) return null;

  return (
    <div
      className="fixed top-4 right-4 z-50 
      bg-green-600 dark:bg-green-500 
      text-white px-4 py-2 rounded-lg shadow-lg 
      flex items-center gap-2
      animate-in slide-in-from-top-2 fade-in 
      duration-300"
    >
      <div className="w-2 h-2 bg-white rounded-full"></div>
      <span className="text-sm font-medium">Link copied to clipboard!</span>
    </div>
  );
};
