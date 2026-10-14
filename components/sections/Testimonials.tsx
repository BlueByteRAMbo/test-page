'use client'

import React from 'react'
import { testimonials } from '@/data/landing-page'
import { Star, Quote } from 'lucide-react'

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 paper-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16a34a]/10 text-[#16a34a] text-xs font-semibold uppercase tracking-wider mb-3">
            Social Proof
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#111111] tracking-tight mb-4">
            Real replies. Real recruiters.{' '}
            <span className="font-serif-italic font-normal text-[#16a34a]">
              Zero manual outreach.
            </span>
          </h2>
          <p className="text-base text-[#626660]">
            See how job seekers across the globe are cutting weeks off their application cycles.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`p-7 rounded-2xl bg-white border transition-all duration-300 hover:-translate-y-1 ${
                t.highlight
                  ? 'border-[#16a34a]/40 shadow-lg shadow-[#16a34a]/10 ring-1 ring-[#16a34a]/20 md:col-span-2 lg:col-span-1'
                  : 'border-[#111111]/[0.08] shadow-sm hover:shadow-md'
              }`}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4 text-[#16a34a]">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-sm sm:text-base text-[#111111] leading-relaxed mb-6 font-medium">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#111111]/[0.06]">
                <div
                  className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs"
                  style={{ background: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#111111]">{t.author}</div>
                  <div className="text-xs text-[#626660]">{t.role}</div>
                  <div className="text-[11px] text-[#8e928c]">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
