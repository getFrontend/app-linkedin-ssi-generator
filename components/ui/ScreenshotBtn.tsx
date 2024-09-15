import React from "react";
import { Camera } from "lucide-react";

interface ScreenshotBtnProps {
  handleScreenshot: () => void;
  isScreenshotting: boolean;
}

const ScreenshotBtn: React.FC<ScreenshotBtnProps> = ({ handleScreenshot, isScreenshotting }) => {
  return (
    <button
      onClick={handleScreenshot}
      disabled={isScreenshotting}
      className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-[#0a66c2] text-white p-3 rounded-r-lg shadow-lg hover:bg-[#004182] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a66c2]"
      aria-label="Take screenshot"
    >
      <Camera className="w-6 h-6" />
      <span className="sr-only">Take screenshot</span>
    </button>
  );
};

export default ScreenshotBtn;