'use client'

import React from 'react'
import { CHAPTERS } from '@/data/chapters'

export default function Fallback() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-24 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-block text-[11px] font-mono uppercase tracking-[0.14em] text-[#16a34a] font-semibold">
          Eextramile Workflow
        </span>
        <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#111111]">
          How Eextramile AI powers your automated outreach.
        </h2>
        <p className="text-base text-[#626660]">
          From verified recruiter discovery to automated delivery and smart follow-ups.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CHAPTERS.map((ch) => (
          <div
            key={ch.id}
            className="rounded-2xl border border-black/[0.08] bg-white p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#9ca3af]">{ch.number} / 07</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#16a34a]">
                {ch.eyebrow}
              </span>
            </div>
            <h3 className="text-2xl font-medium tracking-tight text-[#111111]">
              <span>{ch.titlePrefix} </span>
              <span className="italic font-serif">{ch.titleItalic}</span>
            </h3>
            <p className="text-sm text-[#626660] leading-relaxed">{ch.description}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {ch.chips.map((chip, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-[#f4f3ef] border border-black/5 px-2.5 py-0.5 text-xs text-[#111111]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
