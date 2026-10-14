'use client'

import React from 'react'
import { storyChapters } from '@/data/landing-page'

interface ProgressRailProps {
  activeIndex: number
  onSelectChapter: (index: number) => void
}

export default function ProgressRail({ activeIndex, onSelectChapter }: ProgressRailProps) {
  return (
    <div className="hidden lg:flex flex-col gap-3 py-4 select-none">
      <div className="relative pl-1">
        {/* Subtle background track line */}
        <div className="absolute left-[18px] top-4 bottom-4 w-[1.5px] bg-[#111111]/[0.08]" />

        {/* Dynamic active track progress */}
        <div
          className="absolute left-[18px] top-4 w-[1.5px] bg-[#16a34a] transition-all duration-500 ease-out"
          style={{
            height: `${(activeIndex / (storyChapters.length - 1)) * 100}%`,
          }}
        />

        <div className="flex flex-col gap-5 relative z-10">
          {storyChapters.map((chapter, idx) => {
            const isActive = activeIndex === idx
            const isPassed = activeIndex > idx

            return (
              <button
                key={chapter.id}
                onClick={() => onSelectChapter(idx)}
                className="group flex items-start text-left gap-3.5 focus:outline-none transition-all duration-300 py-1"
                aria-label={`Jump to ${chapter.railLabel}`}
              >
                {/* Node indicator */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[11px] font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-[#16a34a] text-white shadow-md shadow-[#16a34a]/30 ring-4 ring-[#16a34a]/15 scale-105'
                      : isPassed
                      ? 'bg-[#dcfce7] text-[#15803d] border border-[#16a34a]/30'
                      : 'bg-white text-[#8e928c] border border-[#111111]/10 group-hover:border-[#16a34a]/40 group-hover:text-[#111111]'
                  }`}
                >
                  {chapter.number}
                </div>

                {/* Text information */}
                <div className="pt-0.5">
                  <div
                    className={`text-[13px] font-semibold tracking-tight transition-colors duration-200 ${
                      isActive
                        ? 'text-[#111111]'
                        : 'text-[#626660] group-hover:text-[#111111]'
                    }`}
                  >
                    {chapter.railLabel}
                  </div>
                  <div
                    className={`text-[11px] leading-tight transition-colors duration-200 line-clamp-1 ${
                      isActive ? 'text-[#16a34a] font-medium' : 'text-[#8e928c]'
                    }`}
                  >
                    {chapter.railSubtitle}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
