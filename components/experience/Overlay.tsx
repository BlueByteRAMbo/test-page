'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useScrollStore } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'

export default function Overlay() {
  const activeChapter = useScrollStore((s) => s.activeChapter)
  const ch = CHAPTERS[activeChapter] ?? CHAPTERS[0]

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between pt-24 sm:pt-28 lg:pt-28 pb-5 sm:pb-6"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between relative">
        {/* Top Eyebrow Info (Clear >= 24px of navbar) */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/85 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.14em] text-[#111111] backdrop-blur-md shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a] animate-pulse" />
            <span>{ch.eyebrow}</span>
          </div>
        </div>

        {/* Narrative Content Area:
            - Desktop (>= 1024px): sits cleanly below eyebrow pill with balanced editorial spacing
            - Mobile (< 1024px): anchored to bottom of upper 52% stage
        */}
        <div className="mt-auto lg:mt-6 max-w-[420px] sm:max-w-[440px] lg:max-w-[460px] space-y-2.5 sm:space-y-3 pb-4 lg:pb-0">
          <div
            key={`headline-${activeChapter}`}
            className="transition-all duration-400 ease-out animate-in fade-in slide-in-from-bottom-3 fill-mode-both"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-medium leading-[1.1] tracking-[-0.035em] text-[#111111]">
              <span>{ch.titlePrefix} </span>
              <span className="italic font-serif font-normal text-[#111111]">{ch.titleItalic}</span>
              {ch.titleSuffix && <span> {ch.titleSuffix}</span>}
            </h2>

            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#626660] leading-relaxed">
              {ch.description}
            </p>

            {/* Status Chips: clamp to max 2 on mobile to save vertical space */}
            <div className="mt-4 flex flex-wrap gap-2">
              {ch.chips.map((chip, idx) => (
                <span
                  key={idx}
                  className={`items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/90 px-3 py-1 text-xs font-medium text-[#111111] backdrop-blur-xs shadow-xs ${
                    idx >= 2 ? 'hidden sm:inline-flex' : 'inline-flex'
                  }`}
                >
                  <span className="h-1 w-1 rounded-full bg-[#16a34a]" />
                  {chip}
                </span>
              ))}
            </div>

            {/* Primary CTA for Hero (Ch 1) and Final (Ch 7) */}
            {(activeChapter === 0 || activeChapter === 6) && (
              <div className="pt-4">
                <a
                  href="https://app.eextramile.com"
                  className="pointer-events-auto inline-flex items-center gap-2 text-[13px] sm:text-sm font-semibold text-white bg-[#16a34a] hover:bg-[#15803d] px-5 py-2.5 rounded-full shadow-xs hover:shadow transition-all group"
                >
                  <span>Get started free</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Progress & Scroll hint sharing exact left grid edge */}
        <div className="flex items-center justify-between text-xs text-[#626660] font-mono pt-3 border-t border-black/[0.05]">
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
    </div>
  )
}
