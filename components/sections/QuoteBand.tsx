'use client'

import React from 'react'
import { Sparkles } from 'lucide-react'

export default function QuoteBand() {
  return (
    <section className="py-20 sm:py-28 bg-[#ffffff] border-y border-[#111111]/[0.06] relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16a34a]/10 text-[#16a34a] text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          The Philosophy
        </div>

        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#111111] leading-snug tracking-tight mb-6">
          &ldquo;Spend less time searching for emails and pasting the same pitch. Spend your energy on{' '}
          <span className="font-serif-italic font-normal text-[#16a34a]">
            interviews that move your career forward.
          </span>
          &rdquo;
        </blockquote>

        <p className="text-sm sm:text-base text-[#626660] max-w-xl mx-auto">
          Every layer in Eextramile AI is designed to replace hours of repetitive, manual drudgery with one seamless, high-confidence workflow.
        </p>
      </div>
    </section>
  )
}
