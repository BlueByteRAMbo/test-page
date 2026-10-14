'use client'

import React from 'react'
import { storyChapters } from '@/data/landing-page'
import SheetCard from './SheetCard'

interface SheetsStageProps {
  activeIndex: number
}

export default function SheetsStage({ activeIndex }: SheetsStageProps) {
  return (
    <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] sheets-stage flex items-center justify-center">
      {/* Ambient Emerald Green Glow Underneath Platform */}
      <div className="ambient-green-glow -bottom-10" />

      {/* Floating 3D Pedestal Stage */}
      <div className="stage-pedestal" />

      {/* Signature Traveling Green Marker (travels across the top edge) */}
      <div
        className="absolute top-2 sm:top-4 right-4 sm:right-10 z-30 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#16a34a]/30 shadow-md transition-all duration-700 ease-out"
        style={{
          transform: `translateY(${activeIndex * 2}px) translateZ(40px)`,
        }}
      >
        <span className="signature-marker" />
        <span className="text-[11px] font-semibold text-[#111111] font-mono tracking-tight">
          Pipeline #{storyChapters[activeIndex].number} · {storyChapters[activeIndex].railLabel}
        </span>
      </div>

      {/* 3D Sheet Shells Stack */}
      <div className="relative w-full max-w-[800px] h-[480px] sm:h-[520px] lg:h-[560px] preserve-3d flex items-center justify-center">
        {storyChapters.map((chapter, index) => {
          const isActive = activeIndex === index
          const offset = index - activeIndex

          // Calculate 3D transformation based on distance from active index
          let transformStyle = ''
          let opacity = 0
          let pointerEvents: 'auto' | 'none' = 'none'

          if (offset === 0) {
            // Active Layer: Crystal-clear focus, forward in Z
            transformStyle = 'translateZ(30px) translateY(0px) rotateX(0deg) rotateY(0deg) scale(1)'
            opacity = 1
            pointerEvents = 'auto'
          } else if (offset === -1) {
            // Just passed layer: floats gently up and recedes
            transformStyle = 'translateZ(-60px) translateY(-26px) rotateX(4deg) scale(0.96)'
            opacity = 0.22
          } else if (offset === 1) {
            // Next layer in stack: waiting right behind
            transformStyle = 'translateZ(-70px) translateY(18px) rotateX(-2deg) scale(0.97)'
            opacity = 0.55
          } else if (offset === 2) {
            // Layer 2 steps behind
            transformStyle = 'translateZ(-140px) translateY(32px) rotateX(-4deg) scale(0.94)'
            opacity = 0.28
          } else if (offset === 3) {
            // Layer 3 steps behind
            transformStyle = 'translateZ(-210px) translateY(44px) rotateX(-6deg) scale(0.91)'
            opacity = 0.12
          } else if (offset < -1) {
            // Past layers farther away
            transformStyle = 'translateZ(-180px) translateY(-50px) scale(0.9)'
            opacity = 0
          } else {
            // Future layers deeper in stack
            transformStyle = 'translateZ(-280px) translateY(55px) scale(0.88)'
            opacity = 0
          }

          return (
            <div
              key={chapter.id}
              className="sheet-shell transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: transformStyle,
                opacity,
                pointerEvents,
                zIndex: isActive ? 20 : 10 - Math.abs(offset),
              }}
            >
              <div
                className={`sheet-card-surface w-[94%] sm:w-[90%] md:w-[84%] lg:w-[800px] h-[450px] sm:h-[490px] lg:h-[530px] overflow-hidden ${
                  isActive ? 'is-active ring-1 ring-[#16a34a]/30' : ''
                }`}
              >
                <SheetCard chapterId={chapter.id} isActive={isActive} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
