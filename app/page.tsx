'use client'

import { useState, ChangeEvent  } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { motion } from 'framer-motion'
import { Info } from 'lucide-react'

export default function LinkedInSSIClone() {
  const [ssiScore, setSSIScore] = useState<number | null>(null)
  const [components, setComponents] = useState<{ name: string; score: number; color: string }[]>([])
  const [industryRank, setIndustryRank] = useState(0)
  const [networkRank, setNetworkRank] = useState(0)
  const [value, setValue] = useState<number>(1);

  const calculateComponents = (score: number) => {
    const total = score
    let remaining = total
    const componentNames = [
      'Establish your professional brand',
      'Find the right people',
      'Engage with insights',
      'Build relationships'
    ]
    const colors = ['#f5824c', '#8f6bce', '#008391', '#007bb5']
    const result = []
    for (let i = 0; i < 3; i++) {
      const componentScore = Math.min(Math.floor(Math.random() * remaining), 25)
      result.push({
        name: componentNames[i],
        score: componentScore,
        color: colors[i]
      })
      remaining -= componentScore
    }
    result.push({
      name: componentNames[3],
      score: remaining,
      color: colors[3]
    })
    return result
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const score = Number(formData.get('ssi'))
    if (score >= 1 && score <= 100) {
      setSSIScore(score)
      setComponents(calculateComponents(score))
      setIndustryRank(Math.floor(Math.random() * 100))
      setNetworkRank(Math.floor(Math.random() * 100))
    }
  }

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
      <div className="flex items-center justify-center min-h-screen bg-[#f3f6f8]">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md flex flex-col">
          <h2 className="text-2xl text-center font-bold mb-4">Enter your Social Selling Index</h2>
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
          <button type="submit" className="w-full bg-[#0a66c2] text-white px-2 py-4 rounded-lg hover:bg-[#0090ff]">
            Generate LinkedIn SSI
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f3f6f8]">
      <header className="bg-[#0073b1] text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mr-2">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
            <span className="font-semibold">SALES NAVIGATOR</span>
          </div>
          <div className="flex items-center">
            <button className="mr-4">
              <Info className="w-6 h-6" />
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-8">Your Social Selling Index</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Industry SSI rank</h2>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">Top</span>
              <span className="text-6xl font-bold ml-2">{industryRank}%</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Network SSI rank</h2>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">Top</span>
              <span className="text-6xl font-bold ml-2">{networkRank}%</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold">Current Social Selling Index <Info className="inline w-4 h-4" /></h2>
            <h3 className="text-lg font-semibold">Four components of your score</h3>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 pr-8">
              <div className="w-48 h-48 mx-auto">
                <CircularProgressbar
                  value={ssiScore}
                  text={`${ssiScore}`}
                  styles={buildStyles({
                    textSize: '24px',
                    pathTransitionDuration: 1,
                    pathColor: `#0073b1`,
                    textColor: '#0073b1',
                    trailColor: '#d6d6d6',
                  })}
                />
              </div>
              <p className="text-center mt-2">out of 100</p>
            </div>
            <div className="w-full md:w-2/3">
              {components.map((component, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span>{component.score.toFixed(2)} | {component.name}</span>
                    <Info className="w-4 h-4" />
                  </div>
                  <div className="w-full bg-[#eef3f8] rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: component.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(component.score / 25) * 100}%` }}
                      transition={{ duration: 1 }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">People in your industry</h2>
            <div className="flex items-center mb-4">
              <div className="w-24 h-24 mr-4">
                <CircularProgressbar
                  value={35}
                  text={`35`}
                  styles={buildStyles({
                    textSize: '24px',
                    pathTransitionDuration: 1,
                    pathColor: `#0073b1`,
                    textColor: '#0073b1',
                    trailColor: '#d6d6d6',
                  })}
                />
              </div>
              <div>
                <p>out of 100</p>
                <p className="text-sm text-gray-600">Sales professionals in the Technology, Information and Internet industry have an average SSI of 35.</p>
              </div>
            </div>
            <p>You rank in the top {industryRank}%</p>
            <p className="text-sm text-gray-600">No change since last week</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">People in your network</h2>
            <div className="flex items-center mb-4">
              <div className="w-24 h-24 mr-4">
                <CircularProgressbar
                  value={33}
                  text={`33`}
                  styles={buildStyles({
                    textSize: '24px',
                    pathTransitionDuration: 1,
                    pathColor: `#0073b1`,
                    textColor: '#0073b1',
                    trailColor: '#d6d6d6',
                  })}
                />
              </div>
              <div>
                <p>out of 100</p>
                <p className="text-sm text-gray-600">People in your network have an average SSI of 33.</p>
              </div>
            </div>
            <p>You rank in the top {networkRank}%</p>
            <p className="text-sm text-gray-600">No change since last week</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 mr-4 text-[#0073b1]">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z"/>
            </svg>
            <p className="text-lg">Find the right decision makers and shorten your sales cycle with LinkedIn Sales Navigator.</p>
          </div>
          <button className="bg-[#0073b1] text-white px-4 py-2 rounded hover:bg-[#005d8f]">
            Learn more
          </button>
        </div>
      </main>
    </div>
  )
}