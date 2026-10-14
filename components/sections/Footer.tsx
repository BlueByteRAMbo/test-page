'use client'

import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-[#f4f3ef] border-t border-[#111111]/[0.08] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#111111]/10 flex items-center justify-center p-1 shadow-xs">
                <img src="/logo.png" alt="Eextramile AI" className="w-full h-full object-contain" />
              </div>
              <div className="flex items-baseline font-semibold tracking-tight text-lg text-[#111111]">
                <span className="text-[#16a34a] font-bold text-xl">E</span>
                <span>extramile</span>
                <span className="ml-1 text-[11px] font-bold uppercase tracking-wider bg-[#16a34a]/10 text-[#16a34a] px-1.5 py-0.5 rounded">
                  AI
                </span>
              </div>
            </div>
            <p className="text-sm text-[#626660] max-w-sm mb-6 leading-relaxed">
              Automating recruiter discovery, AI-personalized cold outreach, and Day 3/4 follow-up workflows directly from your personal Gmail.
            </p>

            {/* Live API Health indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#111111]/[0.06] text-xs text-[#626660] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
              <span className="font-medium text-[#111111]">All Systems Operational</span>
              <span className="text-[#8e928c]">· Google API Connected</span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm text-[#626660]">
              <li>
                <a href="#pipeline" className="hover:text-[#111111] transition-colors">
                  The 3D Pipeline
                </a>
              </li>
              <li>
                <a href="#pipeline" className="hover:text-[#111111] transition-colors">
                  Recruiter Discovery
                </a>
              </li>
              <li>
                <a href="#pipeline" className="hover:text-[#111111] transition-colors">
                  Gmail Integration
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#111111] transition-colors">
                  Pricing & Credits
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#111111] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Company links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-4">
              Trust & Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-[#626660]">
              <li>
                <a href="https://app.eextramile.com" className="hover:text-[#111111] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://app.eextramile.com" className="hover:text-[#111111] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="https://app.eextramile.com" className="hover:text-[#111111] transition-colors">
                  Google API Disclosure
                </a>
              </li>
              <li>
                <a href="https://app.eextramile.com" className="hover:text-[#111111] transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#111111]/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8e928c]">
          <div>© {new Date().getFullYear()} Eextramile AI. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span>Automated Recruiter Outreach</span>
            <span>·</span>
            <span>Minimalist 3D Scroll Experience</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
