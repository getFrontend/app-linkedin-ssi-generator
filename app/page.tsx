"use client";

import { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";
import SegmentedCircularProgressbar from "@/components/SegmentedCircularProgressbar";
import { calculateComponents, calculateRanks } from "@/lib/utils";
import Preloader from "@/components/ui/Preloader";
import Link from "next/link";
import Image from "next/image";
import { profileImg, targetImg } from "@/constants";

export default function LinkedInSSIClone() {
  const [ssiScore, setSSIScore] = useState<number | null>(null);
  const [components, setComponents] = useState<
    { name: string; score: number; color: string }[]
  >([]);
  const [industryRank, setIndustryRank] = useState(0);
  const [networkRank, setNetworkRank] = useState(0);
  const [value, setValue] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const score = Number(formData.get("ssi"));
    if (score >= 1 && score <= 100) {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSSIScore(score);
      setComponents(calculateComponents(score));
      const ranks = calculateRanks(score);
      setIndustryRank(ranks.industryRank);
      setNetworkRank(ranks.networkRank);
    }
    setIsLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const numericValue = Number(inputValue);

    if (numericValue > 100) {
      setValue(100);
    } else if (numericValue < 1) {
      setValue(1);
    } else {
      setValue(numericValue);
    }
  };

  if (ssiScore === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f5f5f5]">
        {isLoading && <Preloader />}
        <form
          onSubmit={handleSubmit}
          className="bg-white px-12 py-8 rounded-lg shadow-xl flex flex-col"
        >
          <h2 className="text-2xl text-center font-bold mb-4">
            Enter your desired SSI
          </h2>
          <p className="mb-6 text-center">from 0 to 100 points</p>
          <input
            type="number"
            name="ssi"
            value={value}
            onChange={handleChange}
            min="1"
            max="100"
            required
            className="self-center w-2xl p-4 border border-gray-300 rounded mb-10 text-center text-4xl text-[#0a66c2]"
          />
          <button
            type="submit"
            className="w-full bg-[#0a66c2] text-white px-2 py-4 rounded-lg hover:bg-[#0090ff]"
          >
            Generate LinkedIn SSI
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f5f5f5]">
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
            <div className="h-full px-3 flex items-center hover:bg-[#003c78]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 16.25A1.25 1.25 0 1113.25 17 1.25 1.25 0 0112 18.25zm1.41-5.46L13 13v1h-2v-2.21l1.49-.79C13.82 10.34 14 9.77 14 9.3c0-.78-.92-1.3-2.3-1.3A7.12 7.12 0 008 9.24V7a8 8 0 013.7-1c3 0 4.3 1.55 4.3 3.3a3.91 3.91 0 01-2.59 3.49z"></path>
              </svg>
            </div>
            <div className="h-full px-3 flex items-center hover:bg-[#003c78]">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <Image src={profileImg} width={24} height={24} alt="Profile" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1128px] mx-auto pb-8 pt-[56px] px-[30px]">
        <h1 className="text-[32px] text-[#181818] mt-8 mb-4">
          Your Social Selling Index
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="h-[92px] bg-white flex flex-row-reverse justify-end p-4 rounded-sm shadow-border">
            <div className="flex-grow text-2xl pt-2 pl-4">
              Industry SSI rank
            </div>
            <div className="flex flex-col items-baseline">
              <p className="pt-3 text-2xl text-[#666666] italic">Top</p>
              <p className="flex-grow text-[40px]">
                <span className="mx-1">{industryRank}</span>
                <span className="text-2xl text-[#666666]">%</span>
              </p>
            </div>
          </div>
          <div className="h-[92px] bg-white flex flex-row-reverse justify-end p-4 rounded-sm shadow-border">
            <div className="flex-grow text-2xl pt-2 pl-4">Network SSI rank</div>
            <div className="flex flex-col items-baseline">
              <p className="pt-3 text-2xl text-[#666666] italic">Top</p>
              <p className="flex-grow text-[40px]">
                <span className="mx-1">{networkRank}</span>
                <span className="text-2xl text-[#666666]">%</span>
              </p>
            </div>
          </div>
        </div>

        {/* Current Social Selling Index section */}
        <div className="bg-white p-4 mb-6 flex flex-col rounded-sm shadow-border">
          <h2 className="flex items-center gap-3">
            <span className="text-2xl">Current Social Selling Index</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#7b7b7b"
              className="w-6 h-6"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18.23c-4.538 0-8.23-3.692-8.23-8.23S7.462 3.77 12 3.77s8.23 3.692 8.23 8.23-3.692 8.23-8.23 8.23zM11 16h2v2h-2v-2zm5-6.75V10c0 1.657-1.343 2.875-3 2.875V14h-2v-1a2 2 0 012-2h.275a.85.85 0 00.85-.85v-1.3a.85.85 0 00-.85-.85h-2.55a.85.85 0 00-.85.85V10H8v-.75A3.25 3.25 0 0111.25 6h1.5A3.25 3.25 0 0116 9.25z"></path>
            </svg>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Circle */}
            <div className="flex flex-row gap-8 flex-wrap justify-center items-center">
              <div className="w-64 h-64">
                <SegmentedCircularProgressbar
                  value={ssiScore}
                  stroke={7}
                  segments={components.map((c) => ({
                    value: c.score,
                    color: c.color,
                  }))}
                />
              </div>
              <p className="flex flex-col text-center  text-[#1b2437]">
                <span className="text-[64px] font-light">{ssiScore}</span>
                <span className="text-[#666666] text-[20px] -mt-3">
                  out of 100
                </span>
              </p>
            </div>
            {/* Four components of your score */}
            <div className="w-full">
              <h3 className="mb-4 text-[20px] font-semibold">
                Four components of your score
              </h3>
              {components.map((component, index) => (
                <div key={index} className="mb-4 flex flex-col gap-2">
                  <div className="w-full bg-[#e1e9ee] rounded-sm h-4">
                    <motion.div
                      className="h-4 rounded-sm"
                      style={{ backgroundColor: component.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(component.score / 25) * 100}%` }}
                      transition={{ duration: 1 }}
                    ></motion.div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div>
                      <span className="font-semibold">
                        {component.score.toFixed(3)} |{" "}
                      </span>
                      <span className="font-light">{component.name}</span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#7b7b7b"
                      className="w-6 h-6"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18.23c-4.538 0-8.23-3.692-8.23-8.23S7.462 3.77 12 3.77s8.23 3.692 8.23 8.23-3.692 8.23-8.23 8.23zM11 16h2v2h-2v-2zm5-6.75V10c0 1.657-1.343 2.875-3 2.875V14h-2v-1a2 2 0 012-2h.275a.85.85 0 00.85-.85v-1.3a.85.85 0 00-.85-.85h-2.55a.85.85 0 00-.85.85V10H8v-.75A3.25 3.25 0 0111.25 6h1.5A3.25 3.25 0 0116 9.25z"></path>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* People in your industry section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-3 rounded-sm shadow-border">
            <h4 className="text-2xl">People in your industry</h4>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="flex justify-center items-center gap-4">
                <div className="w-[150px] h-[150px]">
                  <SegmentedCircularProgressbar
                    value={36}
                    stroke={10}
                    segments={components.map((c) => ({
                      value: c.score,
                      color: c.color,
                    }))}
                  />
                </div>
                <p className="mr-3 flex flex-col text-center text-[#1b2437]">
                  <span className="text-5xl font-light">36</span>
                  <span className="text-[#666666] font-light -mt-1">
                    out of 100
                  </span>
                </p>
              </div>
              <div className="border-l border-[#d9d9d9] pl-5 py-5 flex flex-col gap-3">
                <p className="text-lg leading-[21.5px]">
                  Sales professionals in the Technology, Information and
                  Internet industry have an{" "}
                  <span className="font-semibold">average SSI of 36.</span>
                </p>
                <p className="text-lg leading-[21.5px]">
                  You rank in the{" "}
                  <span className="font-semibold">top {industryRank}%</span>
                </p>
                <p className="text-sm font-light">
                  <span className="font-semibold">No change</span> since last
                  week
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-3 rounded-sm shadow-border">
            <h4 className="text-2xl">People in your network</h4>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="flex justify-center items-center gap-6 h-[190px] border-r border-[#d9d9d9] ">
                <div className="w-150px] h-[150px]">
                  <SegmentedCircularProgressbar
                    value={33}
                    stroke={10}
                    segments={components.map((c) => ({
                      value: c.score,
                      color: c.color,
                    }))}
                  />
                </div>
                <p className="mr-3 flex flex-col text-center text-[#1b2437]">
                  <span className="text-5xl font-light">33</span>
                  <span className="text-[#666666] font-light -mt-1">
                    out of 100
                  </span>
                </p>
              </div>
              <div className="pl-5 py-5 flex flex-col gap-3 justify-center">
                <p className="text-lg leading-[21.5px]">
                  People in your network have an{" "}
                  <span className="font-semibold">average SSI of 33.</span>
                </p>
                <p className="text-lg leading-[21.5px]">
                  You rank in the{" "}
                  <span className="font-semibold">top {networkRank}%</span>
                </p>
                <p className="text-sm font-light">
                  <span className="font-semibold">No change</span> since last
                  week
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Last section aka Footer */}
        <div className="bg-white p-4 rounded-sm flex items-center gap-3 shadow-border">
          <div className="flex items-center gap-3">
            <Image src={targetImg} width={48} height={48} alt="target icon" />
            <p className="text-[20px]">
              Find the right decision makers and shorten your sales cycle with
              LinkedIn Sales Navigator.
            </p>
          </div>
          <button className="bg-[#0073b1] text-white font-semibold px-4 py-[10px] rounded hover:bg-[#005d8f]">
            Learn more
          </button>
        </div>
      </main>
    </div>
  );
}
