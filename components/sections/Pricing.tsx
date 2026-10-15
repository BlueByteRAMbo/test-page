'use client'

import React, { useState } from 'react'
import { Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: 'Free',
      price: '$0',
      credits: '25 credits',
      costPerEmail: 'Try risk-free',
      popular: false,
      cta: 'Get started',
      features: [
        '25 recruiter emails',
        'AI email personalisation',
        'Send from your Gmail',
        'Reply tracking',
        'Hard bounce auto-refund',
      ],
    },
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? '$7' : '$5.60',
      frequency: billingCycle === 'monthly' ? 'month' : 'mo billed yearly',
      credits: '100 credits',
      costPerEmail: '~ $0.07 per email',
      popular: false,
      cta: 'Get started',
      features: [
        '100 recruiter emails',
        'AI email personalisation',
        'Send from your Gmail',
        'Reply tracking',
        'Email confidence scoring',
        'Hard bounce auto-refund',
      ],
    },
    {
      name: 'Growth',
      price: billingCycle === 'monthly' ? '$20' : '$16',
      frequency: billingCycle === 'monthly' ? 'month' : 'mo billed yearly',
      credits: '500 credits',
      costPerEmail: '~ $0.04 per email',
      popular: true,
      cta: 'Get started',
      features: [
        '500 recruiter emails',
        'AI email personalisation',
        'Send from your Gmail',
        'Reply tracking',
        'Automated Day 4 follow-up',
        'High-confidence filter',
        'Hard bounce auto-refund',
      ],
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? '$35' : '$28',
      frequency: billingCycle === 'monthly' ? 'month' : 'mo billed yearly',
      credits: '1,000 credits',
      costPerEmail: '~ $0.035 per email',
      popular: false,
      cta: 'Get started',
      features: [
        '1,000 recruiter emails',
        'AI email personalisation',
        'Send from your Gmail',
        'Reply tracking',
        'Smart follow-up sequence',
        'Hard bounce auto-refund',
        'Priority queue & support',
      ],
    },
  ]

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#f4f3ef] border-t border-[#111111]/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16a34a]/10 text-[#16a34a] text-xs font-semibold uppercase tracking-wider mb-3">
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#111111] tracking-tight mb-3">
            Simple, transparent{' '}
            <span className="font-serif-italic font-normal text-[#16a34a]">
              pricing.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#626660]">
            1 credit = 1 email. Credits never expire. No hidden contracts.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="inline-flex items-center p-1 rounded-full bg-white border border-[#111111]/[0.08] shadow-xs mt-6">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#16a34a] text-white shadow-xs'
                  : 'text-[#626660] hover:text-[#111111]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-[#16a34a] text-white shadow-xs'
                  : 'text-[#626660] hover:text-[#111111]'
              }`}
            >
              <span>Yearly</span>
              <span className="bg-[#dcfce7] text-[#15803d] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? 'bg-white border-2 border-[#16a34a] shadow-xl shadow-[#16a34a]/10 lg:-translate-y-2'
                  : 'bg-white/90 border border-[#111111]/[0.08] hover:border-[#111111]/20 hover:shadow-md'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#16a34a] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Most popular</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-[#111111]">{plan.name}</h3>
                  <span className="text-[11px] font-semibold text-[#16a34a] bg-[#dcfce7] px-2.5 py-1 rounded-full">
                    {plan.credits}
                  </span>
                </div>

                {/* Price Display */}
                <div className="mb-1 flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111]">
                    {plan.price}
                  </span>
                  {plan.frequency && (
                    <span className="text-xs text-[#8e928c]">/ {plan.frequency}</span>
                  )}
                </div>

                <div className="text-xs text-[#626660] font-medium mb-5">
                  {plan.costPerEmail}
                </div>

                <div className="w-full h-px bg-[#111111]/[0.06] mb-5" />

                {/* Features List */}
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-[#111111]/90">
                      <div className="w-4 h-4 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <a
                href="https://app.eextramile.com"
                className={`w-full py-2.5 rounded-full text-xs font-semibold text-center flex items-center justify-center gap-2 transition-all ${
                  plan.popular
                    ? 'bg-[#16a34a] hover:bg-[#15803d] text-white shadow-md shadow-[#16a34a]/30'
                    : 'bg-[#f4f3ef] hover:bg-[#111111] hover:text-white text-[#111111] border border-[#111111]/10'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>

        {/* Final Opportunity CTA Card (matching inspiration image) */}
        <div className="rounded-3xl p-8 sm:p-10 bg-white border border-[#111111]/[0.08] shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#111111] tracking-tight mb-2">
              Your next opportunity could be{' '}
              <span className="font-serif-italic font-normal text-[#16a34a]">
                one email away.
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-[#626660]">
              Start your automated recruiter outreach today. Send 25 emails for free with zero setup hassle.
            </p>
          </div>

          <a
            href="https://app.eextramile.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-[#16a34a]/25 transition-all hover:scale-105 shrink-0"
          >
            <span>Get started free</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  )
}
