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
      className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-3"
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
            className="group flex items-center gap-3 py-1 text-right focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#16a34a] rounded-sm transition-all"
          >
            {/* Tooltip label appearing on hover or active */}
            <span
              className={`text-xs font-mono transition-all duration-300 ${
                isActive
                  ? 'text-[#111111] font-semibold opacity-100 translate-x-0'
                  : 'text-[#9ca3af] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {ch.number} · {ch.railLabel}
            </span>

            {/* Tick indicator */}
            <div
              className={`h-2 transition-all duration-300 rounded-full ${
                isActive
                  ? 'w-6 bg-[#16a34a]'
                  : 'w-2 bg-black/20 group-hover:bg-black/40 group-hover:w-4'
              }`}
            />
          </button>
        )
      })}
    </nav>
  )
}
