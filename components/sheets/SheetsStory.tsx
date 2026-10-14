'use client'

import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { storyChapters } from '@/data/landing-page'
import ProgressRail from './ProgressRail'
import StoryCaption from './StoryCaption'
import SheetsStage from './SheetsStage'
import { ChevronDown, ArrowDownRight } from 'lucide-react'

export default function SheetsStory() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const stRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    // Register GSAP ScrollTrigger safely on client
    gsap.registerPlugin(ScrollTrigger)

    const container = containerRef.current
    const pin = pinRef.current
    if (!container || !pin) return

    const totalChapters = storyChapters.length

    // Master ScrollTrigger for pinning and synchronizing the chapter index
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=4200',
      pin: pin,
      scrub: 0.8,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Map 0 -> 1 progress smoothly across the chapters
        const progress = self.progress
        const index = Math.min(
          totalChapters - 1,
          Math.floor(progress * totalChapters)
        )
        setActiveIndex(index)
      },
    })

    stRef.current = st

    return () => {
      st.kill()
    }
  }, [])

  // Programmatic scroll jump when clicking a chapter in ProgressRail
  const handleSelectChapter = (index: number) => {
    const st = stRef.current
    if (!st) return

    const totalChapters = storyChapters.length
    const progressTarget = index / (totalChapters - 1)
    const targetScroll = st.start + progressTarget * (st.end - st.start)

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    })
    setActiveIndex(index)
  }

  return (
    <section
      id="pipeline"
      ref={containerRef}
      className="relative w-full paper-pattern border-t border-[#111111]/[0.06]"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinRef}
        className="w-full h-screen min-h-[700px] max-h-[1080px] flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-8 py-4 sm:py-6"
      >
        {/* Top Header / Context bar */}
        <div className="flex items-center justify-between max-w-7xl w-full mx-auto pb-2 border-b border-[#111111]/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
            <span className="text-[12px] font-semibold text-[#111111] uppercase tracking-wider">
              The 3D Pipeline
            </span>
            <span className="text-[11px] text-[#8e928c] hidden sm:inline">
              · Scroll to advance layers
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#626660] font-mono">
              Layer {storyChapters[activeIndex].number} of 08
            </span>
            <a
              href="#pricing"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#16a34a] hover:text-[#15803d] px-2.5 py-1 rounded-full bg-[#dcfce7] border border-[#16a34a]/20 transition-colors"
            >
              <span>Skip to pricing</span>
              <ArrowDownRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Central 3-column / 2-column layout: Rail, Caption, 3D Stage */}
        <div className="max-w-7xl w-full mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center py-2 sm:py-4 overflow-hidden">
          {/* Left Column: Progress Rail (Desktop) */}
          <div className="hidden lg:block lg:col-span-3 h-full overflow-y-auto pr-2">
            <ProgressRail
              activeIndex={activeIndex}
              onSelectChapter={handleSelectChapter}
            />
          </div>

          {/* Center Column: Dynamic Editorial Caption */}
          <div className="lg:col-span-4 h-full flex flex-col justify-center">
            <StoryCaption chapter={storyChapters[activeIndex]} />
          </div>

          {/* Right Column: 3D Sheets Perspective Stage */}
          <div className="lg:col-span-5 h-full flex items-center justify-center">
            <SheetsStage activeIndex={activeIndex} />
          </div>
        </div>

        {/* Bottom Scroll Cue Bar */}
        <div className="max-w-7xl w-full mx-auto pt-2 border-t border-[#111111]/[0.06] flex items-center justify-between text-xs text-[#8e928c]">
          <div className="flex items-center gap-2">
            <ChevronDown className="w-4 h-4 text-[#16a34a] animate-bounce" />
            <span>Scroll smoothly to inspect the entire outreach pipeline</span>
          </div>

          {/* Mobile chapter buttons */}
          <div className="flex lg:hidden items-center gap-1">
            {storyChapters.map((ch, i) => (
              <button
                key={ch.id}
                onClick={() => handleSelectChapter(i)}
                className={`w-6 h-6 rounded-full text-[10px] font-bold transition-all ${
                  activeIndex === i
                    ? 'bg-[#16a34a] text-white shadow-xs'
                    : 'bg-white text-[#8e928c] border border-[#111111]/10'
                }`}
              >
                {ch.number}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px]">
            <span>1 credit = 1 email</span>
            <span>·</span>
            <span className="text-[#16a34a]">25 free credits available</span>
          </div>
        </div>
      </div>
    </section>
  )
}
