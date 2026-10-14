'use client'

import React from 'react'
import { Check, Sparkles, ArrowRight } from 'lucide-react'
import { StoryChapter } from '@/data/landing-page'

interface StoryCaptionProps {
  chapter: StoryChapter
}

export default function StoryCaption({ chapter }: StoryCaptionProps) {
  return (
    <div className="flex flex-col justify-center h-full max-w-xl transition-all duration-500">
      {/* Eyebrow badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16a34a]/10 border border-[#16a34a]/20 text-[#16a34a] text-[11px] font-semibold tracking-wider uppercase mb-3 w-fit">
        <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
        {chapter.eyebrow}
      </div>

      {/* Main Editorial Headline */}
      <h2 className="text-3xl sm:text-4xl lg:text-[42px] leading-[1.12] tracking-tight text-[#111111] font-semibold mb-4">
        {chapter.titlePrefix}{' '}
        <span className="font-serif-italic text-[#16a34a] font-normal">
          {chapter.titleItalic}
        </span>
        {chapter.titleSuffix && <span> {chapter.titleSuffix}</span>}
      </h2>

      {/* Narrative Description */}
      <p className="text-base sm:text-lg text-[#626660] leading-relaxed mb-6 max-w-lg">
        {chapter.description}
      </p>

      {/* Checkpoints & Features */}
      <div className="grid grid-cols-1 gap-2.5 mb-7">
        {chapter.checkpoints.map((point, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white/70 border border-[#111111]/[0.06] rounded-xl px-3.5 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-transform hover:translate-x-1"
          >
            <div className="w-5 h-5 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 stroke-[2.5]" />
            </div>
            <span className="text-[13px] sm:text-[14px] text-[#111111]/90 font-medium">
              {point}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom CTA / Metric */}
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <a
          href="https://app.eextramile.com"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#16a34a] text-white text-[13px] font-semibold shadow-md shadow-[#16a34a]/25 hover:bg-[#15803d] hover:shadow-lg transition-all group"
        >
          <span>Start free now</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>

        {chapter.metrics && (
          <div className="flex items-center gap-2 text-xs text-[#626660] bg-white/50 px-3 py-2 rounded-full border border-[#111111]/[0.05]">
            <Sparkles className="w-3.5 h-3.5 text-[#16a34a]" />
            <span className="font-semibold text-[#111111]">{chapter.metrics.value}</span>
            <span>{chapter.metrics.label}</span>
          </div>
        )}
      </div>
    </div>
  )
}
