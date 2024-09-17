"use client";

import { useState, ChangeEvent, useRef, useEffect } from "react";
import { Dice6 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Preloader from "@/components/ui/Preloader";
import Header from "@/components/ui/Header";
import SegmentedCircularProgressbar from "@/components/SegmentedCircularProgressbar";
import { calculateComponents, calculateRanks } from "@/lib/utils";
import { targetImg } from "@/constants";
import ScreenshotBtn from "@/components/ui/ScreenshotBtn";
import ChatBtn from "@/components/ui/ChatBtn";

interface CustomDisplayMediaOptions extends DisplayMediaStreamOptions {
  preferCurrentTab?: boolean;
}

export default function LinkedInSSIClone() {
  const [ssiScore, setSSIScore] = useState<number | null>(null);
  const [components, setComponents] = useState<
    { name: string; score: number; color: string }[]
  >([]);
  const [industryRank, setIndustryRank] = useState(0);
  const [networkRank, setNetworkRank] = useState(0);
  const [value, setValue] = useState<number>(25);
  const [isLoading, setIsLoading] = useState(false);
  const [isScreenshotting, setIsScreenshotting] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cleanup function to cancel animation if component unmounts
    return () => {
      setIsRolling(false);
    };
  }, []);

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

  const generateRandomScore = () => {
    setIsRolling(true);
    let duration = 1000; // 1 second
    let startTime = Date.now();

    const roll = () => {
      const now = Date.now();
      const elapsedTime = now - startTime;

      if (elapsedTime < duration) {
        const randomScore = Math.floor(Math.random() * 100) + 1;
        setValue(randomScore);

        requestAnimationFrame(roll);
      } else {
        const finalScore = Math.floor(Math.random() * 100) + 1;
        setValue(finalScore);

        setIsRolling(false);
      }
    };

    requestAnimationFrame(roll);
  };

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

  const handleScreenshot = async () => {
    if (contentRef.current) {
      setIsScreenshotting(true);
      try {
        // Hide the screenshot button
        const screenshotButton = document.getElementById("screenshot-button");
        if (screenshotButton) {
          screenshotButton.style.display = "none";
        }

        const stream = await navigator.mediaDevices.getDisplayMedia({
          preferCurrentTab: true,
        });
        const video = document.createElement("video");

        await new Promise((resolve) => {
          video.onloadedmetadata = resolve;
          video.srcObject = stream;
        });

        video.play();

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        canvas.getContext("2d")?.drawImage(video, 0, 0);
        stream.getTracks().forEach((track) => track.stop());

        const blob = await new Promise<Blob>((resolve) =>
          canvas.toBlob(resolve, "image/png")
        );
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);

        alert("Screenshot copied to clipboard as PNG!");
      } catch (err) {
        console.error("Error: " + err);
        alert("Failed to capture screenshot. Please try again.");
      } finally {
        setIsScreenshotting(false);
        // Show the screenshot button again
        const screenshotButton = document.getElementById("screenshot-button");
        if (screenshotButton) {
          screenshotButton.style.display = "block";
        }
      }
    }
  };

  if (ssiScore === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f5f5f5]">
        {isLoading && <Preloader />}
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-1/2 md:max-w-64 bg-white px-4 sm:px-6 md:px-14 py-10 rounded-lg shadow-xl flex flex-col"
        >
          <h2 className="mb-4 text-2xl text-center font-semibold">
            Enter your{" "}
            <span className="text-[#0a66c2] font-bold">desired SSI</span>
            <br />
            <span className="mb-2 text-sm font-normal">
              (from 0 to 100 points)
            </span>
          </h2>
          <p className="mb-8 flex justify-center items-center gap-1">
            or
            <span className="text-[#0a66c2] font-semibold">
              try your luck with the dice
            </span>
            <Dice6 className="w-5 h-5" />
          </p>
          <div className="mb-10 flex-1 flex justify-center items-center">
            <input
              ref={inputRef}
              className=" w-2xl p-2 border border-gray-300 rounded-l-lg text-center text-5xl text-[#0a66c2] focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent"
              type="number"
              name="ssi"
              value={value}
              onChange={handleChange}
              min="1"
              max="100"
              required
            />
            <button
              type="button"
              onClick={generateRandomScore}
              disabled={isRolling}
              className={`p-3 bg-[#0a66c2] text-white rounded-r-lg hover:bg-[#004182] focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:ring-offset-2 transition-colors`}
              aria-label="Generate random score"
            >
              <Dice6
                className={`w-14 h-14 ${isRolling ? "animate-spin" : ""}`}
              />
            </button>
          </div>
          <button
            type="submit"
            className="bg-[#0a66c2] text-white text-center px-2 py-4 rounded-lg hover:bg-[#0090ff]"
          >
            Generate LinkedIn SSI
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f5f5f5]">
      <Header />

      <main
        className="max-w-[1128px] mx-auto pb-8 pt-[56px] px-[30px]"
        ref={contentRef}
      >
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

      <ScreenshotBtn
        id="screenshot-button"
        handleScreenshot={handleScreenshot}
        isScreenshotting={isScreenshotting}
      />
      <ChatBtn />
    </div>
  );
}
