'use client'

import React from 'react'
import { useScrollStore } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'

export default function Overlay() {
  const activeChapter = useScrollStore((s) => s.activeChapter)
  const ch = CHAPTERS[activeChapter] ?? CHAPTERS[0]

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-16 pt-24 sm:pt-28 md:pt-28"
    >
      {/* Top Bar / Eyebrow Info */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.14em] text-[#111111] backdrop-blur-md shadow-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a] animate-pulse" />
          <span>{ch.eyebrow}</span>
        </div>
      </div>

      {/* Narrative Content Area: Left-weighted on desktop, bottom-weighted on mobile */}
      <div className="mt-auto sm:my-auto max-w-md lg:max-w-md xl:max-w-lg space-y-3 pb-6 sm:pb-0">
        <div
          key={`headline-${activeChapter}`}
          className="transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] font-medium leading-[1.06] tracking-[-0.035em] text-[#111111]">
            <span>{ch.titlePrefix} </span>
            <span className="italic font-serif font-normal text-[#111111]">{ch.titleItalic}</span>
            {ch.titleSuffix && <span> {ch.titleSuffix}</span>}
          </h2>

          <p className="mt-3 max-w-md text-sm sm:text-base text-[#626660] leading-relaxed">
            {ch.description}
          </p>

          {/* Status Chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {ch.chips.map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/90 px-3 py-1 text-xs font-medium text-[#111111] backdrop-blur-xs shadow-xs"
              >
                <span className="h-1 w-1 rounded-full bg-[#16a34a]" />
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Progress & Scroll hint */}
      <div className="flex items-center justify-between text-xs text-[#626660] font-mono pt-2 border-t border-black/[0.04]">
        <div className="flex items-center gap-2">
          <span className="text-[#111111] font-semibold">{ch.number}</span>
          <span>/</span>
          <span>07</span>
          <span className="hidden sm:inline-block text-[#9ca3af]">·</span>
          <span className="hidden sm:inline-block text-[#626660]">{ch.railLabel}</span>
        </div>
        <div className="text-[11px] uppercase tracking-wider text-[#9ca3af]">
          Scroll to explore
        </div>
      </div>
    </div>
  )
}
