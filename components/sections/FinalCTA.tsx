'use client'

import React from 'react'
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden border-t border-[#111111]/[0.06]">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-radial-gradient from-[#16a34a]/10 via-[#16a34a]/[0.02] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16a34a]/10 text-[#16a34a] text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Ready to Start?
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#111111] tracking-tight mb-6">
          Your next opportunity could be{' '}
          <span className="font-serif-italic font-normal text-[#16a34a]">
            one email away.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-[#626660] max-w-xl mx-auto mb-10 leading-relaxed">
          Set up your career highlights in 60 seconds, discover target recruiters with verified emails, and send personalized messages directly from your Gmail.
        </p>

        {/* Big CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="https://app.eextramile.com"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white text-base font-semibold shadow-xl shadow-[#16a34a]/30 transition-all hover:-translate-y-0.5 group"
          >
            <span>Get started free — 25 credits</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Benefits bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#626660]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
            <span>Official Google OAuth security</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
            <span>Credits never expire</span>
          </div>
        </div>
      </div>
    </section>
  )
}
