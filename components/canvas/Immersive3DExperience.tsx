'use client'

import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stationsConfig } from '@/data/scene-config'
import { storyChapters } from '@/data/landing-page'
import { ChevronDown, ArrowDownRight, Compass, ArrowRight, TrendingUp, Check } from 'lucide-react'

// Dynamic import with ssr: false ensures WebGL canvas runs purely on client
const Scene3D = dynamic(() => import('./Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-[#f4f3ef] text-[#111111]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#16a34a] border-t-transparent animate-spin" />
        <span className="text-xs font-mono tracking-wider text-[#626660]">
          Loading 3D World...
        </span>
      </div>
    </div>
  ),
})

export default function Immersive3DExperience() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeStationIndex, setActiveStationIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const stRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const container = containerRef.current
    const pin = pinRef.current
    if (!container || !pin) return

    const total = stationsConfig.length

    // Master ScrollTrigger with rock-solid GSAP pinning
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=4500',
      pin: pin,
      scrub: 0.6,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress
        setScrollProgress(p)
        const idx = Math.min(total - 1, Math.floor(p * total))
        setActiveStationIndex(idx)
      },
    })

    stRef.current = st

    return () => {
      st.kill()
    }
  }, [])

  // Programmatic 3D flight jump when clicking on HUD station list
  const handleJumpToStation = (index: number) => {
    const st = stRef.current
    if (!st) return

    const total = stationsConfig.length
    const progressTarget = index / (total - 1)
    const targetScroll = st.start + progressTarget * (st.end - st.start)

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    })
    setScrollProgress(progressTarget)
    setActiveStationIndex(index)
  }

  const currentStation = stationsConfig[activeStationIndex]
  const currentChapter = storyChapters[activeStationIndex] || storyChapters[0]

  return (
    <section ref={containerRef} className="relative w-full bg-[#f4f3ef]">
      {/* GSAP-Pinned Fullscreen 3D Viewport */}
      <div ref={pinRef} className="w-full h-screen overflow-hidden relative">
        {/* Full 3D WebGL Canvas Viewport (Framed on the right 62% of screen) */}
        <div className="absolute inset-0 z-0 flex justify-end pointer-events-none">
          <div className="w-full lg:w-[62%] h-full ml-auto pointer-events-auto">
            <Scene3D
              scrollProgress={scrollProgress}
              activeStationIndex={activeStationIndex}
            />
          </div>
        </div>

        {/* =========================================================================
            PERSISTENT 3D HUD OVERLAY
            ========================================================================= */}

        {/* Top Header Navigation */}
        <div className="absolute top-0 left-0 right-0 z-40 p-4 sm:p-6 pointer-events-none">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2.5 pointer-events-auto">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#111111]/10 flex items-center justify-center p-1 shadow-sm">
                <img src="/logo.png" alt="Eextramile AI" className="w-full h-full object-contain" />
              </div>
              <div className="flex items-baseline font-semibold tracking-tight text-lg text-[#111111]">
                <span className="text-[#16a34a] font-bold text-xl">E</span>
                <span>extramile</span>
                <span className="ml-1 text-[11px] font-bold uppercase tracking-wider bg-[#16a34a]/10 text-[#16a34a] px-1.5 py-0.5 rounded">
                  AI
                </span>
              </div>
            </div>

            {/* Quick Status / Jump */}
            <div className="flex items-center gap-3 pointer-events-auto">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#111111]/[0.08] text-xs font-mono shadow-xs">
                <Compass className="w-3.5 h-3.5 text-[#16a34a] animate-spin" style={{ animationDuration: '8s' }} />
                <span>3D Flight Progress</span>
                <span className="text-[#16a34a] font-bold">
                  {Math.round(scrollProgress * 100)}%
                </span>
              </div>

              <a
                href="#pricing"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-medium text-[#111111] hover:text-[#16a34a] border border-[#111111]/[0.08] shadow-xs transition-colors"
              >
                <span>Jump to Pricing</span>
                <ArrowDownRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://app.eextramile.com"
                className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-[#16a34a] hover:bg-[#15803d] px-4 py-2 rounded-full shadow-sm hover:shadow transition-all"
              >
                <span>Get started free</span>
              </a>
            </div>
          </div>
        </div>

        {/* Left Side: Editorial Story Caption & Rail */}
        <div className="absolute left-4 sm:left-10 top-24 bottom-16 z-30 flex items-center pointer-events-none max-w-md lg:max-w-lg">
          <div className="pointer-events-auto p-6 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-md border border-[#111111]/[0.08] shadow-xl transition-all duration-500">
            {/* Station Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16a34a]/10 text-[#16a34a] text-[11px] font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
              {currentChapter.eyebrow}
            </div>

            {/* Dynamic Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#111111] leading-[1.15] tracking-tight mb-3">
              {currentChapter.titlePrefix}{' '}
              <span className="font-serif-italic font-normal text-[#16a34a]">
                {currentChapter.titleItalic}
              </span>
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#626660] leading-relaxed mb-5">
              {currentChapter.description}
            </p>

            {/* Feature Points */}
            <div className="space-y-2 mb-6">
              {currentChapter.checkpoints.slice(0, 3).map((cp, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-[#111111]/90">
                  <div className="w-4 h-4 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                  </div>
                  <span className="font-medium line-clamp-1">{cp}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2 border-t border-[#111111]/[0.06]">
              <a
                href="https://app.eextramile.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-semibold shadow-md shadow-[#16a34a]/20 transition-all hover:scale-105"
              >
                <span>Start for free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              {activeStationIndex === 0 && (
                <div className="flex items-center gap-1.5 text-xs text-[#626660]">
                  <TrendingUp className="w-3.5 h-3.5 text-[#16a34a]" />
                  <span className="font-semibold text-[#111111]">704+ sent</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Chapter Stepper Dots */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 pointer-events-auto select-none">
          {stationsConfig.map((s, idx) => {
            const isActive = activeStationIndex === idx
            return (
              <button
                key={s.id}
                onClick={() => handleJumpToStation(idx)}
                className="group flex items-center justify-end gap-2.5 focus:outline-none"
              >
                <span
                  className={`text-[11px] font-semibold transition-all duration-200 opacity-0 group-hover:opacity-100 ${
                    isActive ? 'opacity-100 text-[#111111]' : 'text-[#8e928c]'
                  }`}
                >
                  {s.label}
                </span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-[#16a34a] text-white shadow-md shadow-[#16a34a]/30 ring-4 ring-[#16a34a]/20 scale-110'
                      : 'bg-white/80 text-[#8e928c] border border-[#111111]/10 group-hover:border-[#16a34a]/40 group-hover:text-[#111111]'
                  }`}
                >
                  {s.number}
                </div>
              </button>
            )
          })}
        </div>

        {/* Bottom Bar: Scroll Navigation Hint */}
        <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-40 px-4 pointer-events-none">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-[#8e928c]">
            <div className="flex items-center gap-2 pointer-events-auto bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#111111]/[0.08] shadow-xs">
              <ChevronDown className="w-4 h-4 text-[#16a34a] animate-bounce" />
              <span className="font-medium text-[#111111]">
                Scroll smoothly to travel through the 3D pipeline
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#111111]/[0.08] shadow-xs font-mono text-[11px]">
              <span>Active Layer:</span>
              <span className="font-bold text-[#16a34a]">
                {currentStation.number} · {currentStation.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
