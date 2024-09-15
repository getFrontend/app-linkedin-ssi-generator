import Image from "next/image";
import Link from "next/link";
import { profileImg } from "@/constants";

const Header = () => {
  return (
    <header className="w-full h-[56px] flex fixed top-0 left-0 right-0 z-10 bg-[#004182] text-white shadow-xl">
      <div className="w-[1215px] mx-6 flex flex-1 justify-between items-center">
        <Link href="/" className="h-full flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 26 26"
            fill="currentColor"
            className="w-[26px] h-[26px]"
          >
            <path d="M26 2v22a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2h22a2 2 0 012 2zM8 10H4v12h4zm.25-4A2.19 2.19 0 006 3.8a2.2 2.2 0 100 4.4A2.19 2.19 0 008.25 6zM22 14.56c0-3.65-2.29-4.9-4.47-4.9a4.46 4.46 0 00-3.78 2.05h-.05V10H10v12h4v-6.53a2.26 2.26 0 012.21-2.57c1.1 0 1.79.59 1.79 2.52V22h4z"></path>
          </svg>
          <span className="h-full flex items-center px-2 tracking-[3px] hover:bg-[#003c78]">
            SALES NAVIGATOR
          </span>
        </Link>
        <div className="h-full pl-2 border-l border-[#144b83] flex">
          <div className="h-full px-3 flex items-center hover:bg-[#003c78] cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 16.25A1.25 1.25 0 1113.25 17 1.25 1.25 0 0112 18.25zm1.41-5.46L13 13v1h-2v-2.21l1.49-.79C13.82 10.34 14 9.77 14 9.3c0-.78-.92-1.3-2.3-1.3A7.12 7.12 0 008 9.24V7a8 8 0 013.7-1c3 0 4.3 1.55 4.3 3.3a3.91 3.91 0 01-2.59 3.49z"></path>
            </svg>
          </div>
          <div className="h-full px-3 flex items-center hover:bg-[#003c78] cursor-pointer">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <Image src={profileImg} width={24} height={24} alt="Profile" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
