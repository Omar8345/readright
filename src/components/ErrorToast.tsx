import { XIcon, AlertCircleIcon } from "lucide-react";

interface ErrorToastProps {
  message: string;
  onClose: () => void;
}

export const ErrorToast = ({ message, onClose }: ErrorToastProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 w-80 bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden animate-fadeIn">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <AlertCircleIcon className="w-5 h-5 text-red-500" />
          <span className="font-medium">Error</span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <XIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="px-4 pb-4 text-sm leading-relaxed">{message}</div>
    </div>
  );
};
