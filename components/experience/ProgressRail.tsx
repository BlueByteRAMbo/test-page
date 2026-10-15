'use client'

import React from 'react'
import { useScrollStore } from '@/lib/scroll-store'
import { useLenisContext } from './ScrollProvider'
import { CHAPTERS } from '@/data/chapters'

export default function ProgressRail() {
  const activeChapter = useScrollStore((s) => s.activeChapter)
  const { scrollToChapter } = useLenisContext()

  return (
    <nav
      aria-label="Chapter progress navigation"
      className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-3.5"
    >
      {CHAPTERS.map((ch, idx) => {
        const isActive = activeChapter === idx
        return (
          <button
            key={ch.id}
            type="button"
            onClick={() => scrollToChapter(idx)}
            aria-label={`Jump to chapter ${ch.number}: ${ch.railLabel}`}
            aria-current={isActive ? 'step' : undefined}
            className="group relative flex items-center justify-end py-1 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#16a34a] rounded-sm transition-all"
          >
            {/* Tooltip label appearing strictly on hover or focus */}
            <span
              role="tooltip"
              className="absolute right-6 pointer-events-none z-40 whitespace-nowrap rounded-md border border-black/10 bg-white px-2.5 py-1 text-xs font-medium text-[#111111] shadow-sm opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-200"
            >
              <span className="font-mono text-[#16a34a] mr-1.5">{ch.number}</span>
              {ch.railLabel}
            </span>

            {/* Tick indicator (always visible) */}
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-5 bg-[#16a34a]'
                  : 'w-2 bg-black/25 group-hover:bg-black/60 group-hover:w-3.5'
              }`}
            />
          </button>
        )
      })}
    </nav>
  )
}
