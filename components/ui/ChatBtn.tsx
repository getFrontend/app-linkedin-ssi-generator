import React from "react";

const ChatBtn = () => {
  return (
    <div className="fixed bottom-6 right-6">
      <div className="flex items-center gap-1 px-4 pl-[14px] py-[10px] bg-[#0073b1] hover:bg-[#006097] text-white font-semibold rounded-md cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M2 8h1v2H1a1 1 0 01-1-1V2a1 1 0 011-1h10a1 1 0 011 1v2h-2V3H2v5zm10 1H8v1h4V9zm4-3v10l-3-2H5a1 1 0 01-1-1V6a1 1 0 011-1h10a1 1 0 011 1zm-2 1H6v5h7.52l.48.34V7z"></path>
        </svg>
        <span>Chat with us</span>
      </div>
    </div>
  );
};

export default ChatBtn;
