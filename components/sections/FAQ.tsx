'use client'

import React, { useState } from 'react'
import { faqs } from '@/data/landing-page'
import { Plus, Minus, HelpCircle } from 'lucide-react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="faq" className="py-24 sm:py-32 paper-pattern border-t border-[#111111]/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16a34a]/10 text-[#16a34a] text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#111111] tracking-tight mb-4">
            Questions we{' '}
            <span className="font-serif-italic font-normal text-[#16a34a]">
              always get.
            </span>
          </h2>
          <p className="text-base text-[#626660]">
            Everything you need to know about our Gmail integration, credit model, and recruiter privacy.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#16a34a]/30 shadow-md ring-1 ring-[#16a34a]/10'
                    : 'bg-white/80 border-[#111111]/[0.06] hover:bg-white hover:border-[#111111]/15'
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-[#111111]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#16a34a] text-white rotate-180'
                        : 'bg-[#f4f3ef] text-[#111111]'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#626660] leading-relaxed border-t border-[#111111]/[0.04]">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
