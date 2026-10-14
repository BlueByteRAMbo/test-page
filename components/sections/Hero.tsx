'use client'

import React, { useState, useEffect } from 'react'
import { ArrowRight, Play, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react'
import SheetsStage from '../sheets/SheetsStage'

export default function Hero() {
  const [emailCount, setEmailCount] = useState(0)

  useEffect(() => {
    // Smooth animated counter up to 704
    const target = 704
    const duration = 1200
    const start = performance.now()

    function step(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setEmailCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [])

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden paper-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Concept / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#111111]/[0.08] shadow-xs text-xs font-medium text-[#111111] mb-6 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
              <span className="font-semibold text-[#16a34a]">Concept 3 — Sheets</span>
              <span className="text-[#8e928c]">· The minimal 3D outreach stack</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-semibold tracking-tight text-[#111111] leading-[1.08] mb-6">
              Manually emailing 300 recruiters takes a month. We do it{' '}
              <span className="font-serif-italic font-normal text-[#16a34a]">
                before lunch.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#626660] leading-relaxed mb-8 max-w-xl">
              Find recruiters, write personalised emails, and send them from your Gmail — automatically.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="https://app.eextramile.com"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white text-[15px] font-semibold shadow-lg shadow-[#16a34a]/30 transition-all hover:-translate-y-0.5 group"
              >
                <span>Start for free</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#pipeline"
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-white hover:bg-[#f4f3ef] text-[#111111] text-[15px] font-medium border border-[#111111]/10 shadow-xs transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 flex items-center justify-center text-[#16a34a]">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch 1 min demo</span>
              </a>
            </div>

            {/* Social Proof & Counter */}
            <div className="pt-6 border-t border-[#111111]/[0.08] flex flex-wrap items-center gap-6">
              {/* Overlapping avatars */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-500 text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                    AM
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                    LT
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-600 text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                    SR
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-500 text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                    JC
                  </div>
                </div>
                <div className="text-xs text-[#626660]">
                  <span className="font-semibold text-[#111111]">10,000+ job seekers</span> landing interviews
                </div>
              </div>

              {/* Weekly counter */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-[#111111]/[0.06] text-xs text-[#626660]">
                <TrendingUp className="w-3.5 h-3.5 text-[#16a34a]" />
                <span className="font-bold text-[#111111]">{emailCount}</span>
                <span>recruiter emails found this week</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Paper Stack Presentation */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="w-full max-w-[560px]">
              <SheetsStage activeIndex={0} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
