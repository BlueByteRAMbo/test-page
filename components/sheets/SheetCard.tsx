'use client'

import React, { useState } from 'react'
import {
  Check,
  Search,
  Mail,
  Send,
  RotateCcw,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Coins,
  ArrowRight,
  Edit3,
  ExternalLink,
  Building2
} from 'lucide-react'

interface SheetCardProps {
  chapterId: string
  isActive: boolean
}

export default function SheetCard({ chapterId, isActive }: SheetCardProps) {
  // Interactive state for Layer 04 (Tone selector)
  const [selectedTone, setSelectedTone] = useState<'professional' | 'conversational' | 'short'>('professional')

  // Interactive state for Layer 03 (Company search)
  const [targetCompany, setTargetCompany] = useState('Google')
  const [targetRole, setTargetRole] = useState('Frontend Developer')

  // Interactive state for Layer 02 (Highlights)
  const [highlightItems, setHighlightItems] = useState([
    { id: 1, text: '3 years of experience in frontend development', active: true },
    { id: 2, text: 'Built and deployed 2 major projects', active: true },
    { id: 3, text: 'Open to relocation & remote roles', active: true },
    { id: 4, text: 'Passionate about AI/ML and developer tooling', active: true, tag: true },
  ])

  // Email draft variations based on tone
  const emailDrafts = {
    professional: {
      subject: 'Excited about the Frontend Engineer role at Google',
      body: (
        <>
          Hi Sarah,
          <br /><br />
          I noticed Google is expanding its web infrastructure team. As a frontend engineer with{' '}
          <span className="bg-[#dcfce7] text-[#15803d] font-semibold px-1.5 py-0.5 rounded border border-[#16a34a]/30">
            3 years of experience
          </span>{' '}
          building scalable applications, I recently deployed{' '}
          <span className="bg-[#dcfce7] text-[#15803d] font-semibold px-1.5 py-0.5 rounded border border-[#16a34a]/30">
            2 major production systems
          </span>{' '}
          focused on high-throughput interfaces.
          <br /><br />
          Given your focus on developer experience, I would welcome 10 minutes to discuss how my background matches your current engineering priorities.
        </>
      ),
    },
    conversational: {
      subject: 'Quick question regarding Frontend roles at Google',
      body: (
        <>
          Hey Sarah,
          <br /><br />
          Hope your week is off to a great start! I've been following Google's frontend innovations closely. With{' '}
          <span className="bg-[#dcfce7] text-[#15803d] font-semibold px-1.5 py-0.5 rounded border border-[#16a34a]/30">
            3 years in web development
          </span>{' '}
          and{' '}
          <span className="bg-[#dcfce7] text-[#15803d] font-semibold px-1.5 py-0.5 rounded border border-[#16a34a]/30">
            2 full-stack launches
          </span>{' '}
          under my belt, I'd love to see if there's a strong fit on your team.
          <br /><br />
          Are you open to a quick 5-minute chat this Thursday?
        </>
      ),
    },
    short: {
      subject: 'Frontend Engineer — 3 yrs exp, open to opportunities',
      body: (
        <>
          Hi Sarah,
          <br /><br />
          Frontend engineer with{' '}
          <span className="bg-[#dcfce7] text-[#15803d] font-semibold px-1.5 py-0.5 rounded border border-[#16a34a]/30">
            3 years of experience
          </span>{' '}
          and{' '}
          <span className="bg-[#dcfce7] text-[#15803d] font-semibold px-1.5 py-0.5 rounded border border-[#16a34a]/30">
            2 high-impact projects
          </span>. 
          Looking to bring strong React & TypeScript expertise to Google.
          <br /><br />
          Resume attached. Would love to connect briefly if you have openings!
        </>
      ),
    },
  }

  /* =========================================================================
     01: HERO COMPOSITE 3D STACK
     ========================================================================= */
  if (chapterId === 'hero') {
    return (
      <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4">
        {/* Main Stack Composition */}
        <div className="relative w-full max-w-[580px] h-[380px] sm:h-[420px] preserve-3d">
          {/* Layer 1 (Back, angled left): Target Companies */}
          <div
            className="absolute top-2 -left-4 sm:-left-8 w-[240px] sm:w-[280px] p-5 rounded-2xl bg-white/95 border border-[#111111]/[0.08] shadow-lg transition-transform duration-700"
            style={{
              transform: 'translateZ(-90px) rotateY(-10deg) rotateX(6deg) translateY(-10px)',
            }}
          >
            <div className="text-[11px] font-semibold text-[#8e928c] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#16a34a]" />
              Target Companies
            </div>
            <div className="space-y-2">
              {[
                { name: 'Google', domain: 'google.com', logo: 'G', color: '#4285F4' },
                { name: 'Meta', domain: 'meta.com', logo: 'M', color: '#0668E1' },
                { name: 'Microsoft', domain: 'microsoft.com', logo: 'MS', color: '#00A4EF' },
                { name: 'Amazon', domain: 'amazon.com', logo: 'A', color: '#FF9900' },
              ].map((co) => (
                <div key={co.name} className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-[#f4f3ef]/60">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] text-white" style={{ background: co.color }}>
                      {co.logo}
                    </span>
                    <span className="font-medium text-[#111111]">{co.name}</span>
                  </div>
                  <span className="text-[10px] text-[#8e928c]">11 recruiters</span>
                </div>
              ))}
            </div>
          </div>

          {/* Layer 3 (Back right): Personalised Email Preview */}
          <div
            className="absolute -top-3 -right-2 sm:-right-6 w-[260px] sm:w-[300px] p-5 rounded-2xl bg-white/95 border border-[#111111]/[0.08] shadow-lg transition-transform duration-700"
            style={{
              transform: 'translateZ(-50px) rotateY(12deg) rotateX(4deg) translateY(-6px)',
            }}
          >
            <div className="flex items-center justify-between mb-3 text-[11px] text-[#8e928c]">
              <span className="font-semibold uppercase tracking-wider text-[#16a34a] flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                Personalised Emails
              </span>
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-ping" />
            </div>
            <div className="text-[12px] font-semibold text-[#111111] mb-2 truncate">
              To: sarah.chen@google.com
            </div>
            <div className="space-y-1.5 text-[11px] text-[#626660]">
              <div className="h-2 bg-[#dcfce7] rounded w-full border border-[#16a34a]/30" />
              <div className="h-2 bg-[#f4f3ef] rounded w-4/5" />
              <div className="h-2 bg-[#dcfce7] rounded w-3/4 border border-[#16a34a]/30" />
              <div className="h-2 bg-[#f4f3ef] rounded w-2/3" />
            </div>
            <div className="mt-4 pt-3 border-t border-[#111111]/[0.06] flex items-center justify-between text-[11px]">
              <span className="text-[#16a34a] font-medium">Ready to dispatch</span>
              <span className="text-[#8e928c]">Gmail API</span>
            </div>
          </div>

          {/* Layer 2 (Center Hero Forefront): Highlights Card */}
          <div
            className="absolute inset-x-4 sm:inset-x-8 top-10 sm:top-12 p-6 sm:p-7 rounded-2xl bg-white border border-[#111111]/[0.1] shadow-2xl transition-all duration-500"
            style={{
              transform: 'translateZ(30px) rotateX(1deg)',
            }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#111111]/[0.06]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#dcfce7] flex items-center justify-center text-[#15803d]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#111111]">Your Highlights</h3>
                  <p className="text-[11px] text-[#8e928c]">Analyzed & matched automatically</p>
                </div>
              </div>
              <span className="text-[11px] font-medium text-[#16a34a] bg-[#dcfce7] px-2.5 py-1 rounded-full">
                Active Layer
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f4f3ef]/80 border border-[#111111]/[0.04]">
                <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
                <span className="text-xs font-medium text-[#111111]">
                  3 years of experience in frontend development
                </span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f4f3ef]/80 border border-[#111111]/[0.04]">
                <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
                <span className="text-xs font-medium text-[#111111]">
                  Built and deployed 2 major production systems
                </span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f4f3ef]/80 border border-[#111111]/[0.04]">
                <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
                <span className="text-xs font-medium text-[#111111]">
                  Open to relocation & remote roles
                </span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#dcfce7]/70 border border-[#16a34a]/30 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
                <span className="text-xs font-semibold text-[#15803d]">
                  Passionate about AI/ML & real-time collaboration
                </span>
              </div>
            </div>
          </div>

          {/* Floating mini origami envelope */}
          <div
            className="absolute -bottom-4 right-10 p-3 rounded-xl bg-white border border-[#111111]/10 shadow-xl flex items-center gap-2 animate-float-slow"
            style={{ transform: 'translateZ(60px)' }}
          >
            <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center text-red-600 font-bold text-xs">
              M
            </div>
            <div className="text-[11px] font-medium text-[#111111]">
              Connecting with Google...
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* =========================================================================
     02: YOUR HIGHLIGHTS (Layer 1)
     ========================================================================= */
  if (chapterId === 'highlights') {
    return (
      <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between">
        <div>
          {/* Top header bar */}
          <div className="flex items-center justify-between pb-5 border-b border-[#111111]/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#15803d]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#111111]">Your Career Highlights</h3>
                <p className="text-xs text-[#8e928c]">Saved once · Used for 300+ recruiters</p>
              </div>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-medium text-[#16a34a] hover:text-[#15803d] px-3 py-1.5 rounded-lg border border-[#16a34a]/20 hover:border-[#16a34a]/40 bg-[#dcfce7]/40 transition-colors">
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit highlights</span>
            </button>
          </div>

          {/* Highlights checklist */}
          <div className="mt-6 space-y-3.5">
            {highlightItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all duration-200 ${
                  item.tag
                    ? 'bg-[#dcfce7]/50 border-[#16a34a]/30 shadow-xs'
                    : 'bg-[#f4f3ef]/60 border-[#111111]/[0.06] hover:bg-white hover:border-[#111111]/15'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                    item.tag
                      ? 'bg-[#16a34a] text-white'
                      : 'bg-white text-[#16a34a] border border-[#16a34a]/40'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm leading-snug ${
                      item.tag ? 'font-semibold text-[#15803d]' : 'font-medium text-[#111111]'
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
                {item.tag && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#16a34a] text-white px-2 py-0.5 rounded">
                    Primary Hook
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom card banner */}
        <div className="mt-6 pt-4 border-t border-[#111111]/[0.06] flex items-center justify-between text-xs text-[#626660]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
            <span>Profile parsed and verified</span>
          </div>
          <span className="font-medium text-[#111111]">100% ready for outreach</span>
        </div>
      </div>
    )
  }

  /* =========================================================================
     03: RECRUITER DISCOVERY (Layer 2)
     ========================================================================= */
  if (chapterId === 'discovery') {
    return (
      <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between">
        <div>
          {/* Target Company & Role Search Header */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 rounded-2xl bg-[#f4f3ef] border border-[#111111]/[0.08] mb-6">
            <div className="flex items-center gap-2 flex-1 px-3 py-2 bg-white rounded-xl border border-[#111111]/[0.06]">
              <Building2 className="w-4 h-4 text-[#16a34a]" />
              <input
                type="text"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                className="w-full text-xs sm:text-sm font-semibold text-[#111111] bg-transparent focus:outline-none"
                placeholder="Target company..."
              />
            </div>
            <div className="flex items-center gap-2 flex-1 px-3 py-2 bg-white rounded-xl border border-[#111111]/[0.06]">
              <Search className="w-4 h-4 text-[#8e928c]" />
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full text-xs sm:text-sm font-medium text-[#111111] bg-transparent focus:outline-none"
                placeholder="Target role..."
              />
            </div>
            <button className="px-4 py-2 rounded-xl bg-[#16a34a] text-white text-xs font-semibold hover:bg-[#15803d] transition-colors flex items-center justify-center gap-1.5 shrink-0">
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-[#8e928c] mb-3">
            <span>Discovered 11 recruiters at {targetCompany}</span>
            <span className="text-[#16a34a] font-medium">Confidence scoring active</span>
          </div>

          {/* Recruiter Contacts Fan-out */}
          <div className="space-y-3">
            {/* Recruiter 1 - Verified */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#111111]/10 shadow-sm hover:border-[#16a34a]/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#16a34a]/15 text-[#16a34a] font-semibold text-xs flex items-center justify-center">
                  SC
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#111111] flex items-center gap-2">
                    Sarah Chen
                    <span className="text-[10px] text-[#8e928c] font-normal">· Senior Recruiter</span>
                  </div>
                  <div className="text-xs text-[#626660] font-mono">sarah.chen@google.com</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#dcfce7] text-[#15803d] border border-[#16a34a]/30">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                  Verified
                </span>
                <span className="text-[10px] text-[#16a34a] font-medium">99% confidence</span>
              </div>
            </div>

            {/* Recruiter 2 - Predicted */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#111111]/10 shadow-sm hover:border-amber-400/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 font-semibold text-xs flex items-center justify-center">
                  MR
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#111111] flex items-center gap-2">
                    Michael Rodriguez
                    <span className="text-[10px] text-[#8e928c] font-normal">· Talent Partner</span>
                  </div>
                  <div className="text-xs text-[#626660] font-mono">m.rodriguez@google.com</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-300">
                  Predicted
                </span>
                <span className="text-[10px] text-amber-600 font-medium">72% confidence</span>
              </div>
            </div>

            {/* Recruiter 3 - Predicted */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#111111]/10 shadow-sm hover:border-amber-400/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 font-semibold text-xs flex items-center justify-center">
                  EW
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#111111] flex items-center gap-2">
                    Emily Watson
                    <span className="text-[10px] text-[#8e928c] font-normal">· Tech Recruiter</span>
                  </div>
                  <div className="text-xs text-[#626660] font-mono">emily.watson@google.com</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-300">
                  Predicted
                </span>
                <span className="text-[10px] text-amber-600 font-medium">61% confidence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Note at bottom */}
        <div className="mt-4 pt-3 border-t border-[#111111]/[0.06] text-[11px] text-[#8e928c] flex items-center justify-between">
          <span>Pattern-verified with corporate domain records</span>
          <span className="text-[#16a34a] font-medium">Auto-populates to email generator →</span>
        </div>
      </div>
    )
  }

  /* =========================================================================
     04: PERSONALISED EMAIL (Layer 3)
     ========================================================================= */
  if (chapterId === 'personalize') {
    return (
      <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between">
        <div>
          {/* Email Composer Window Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#111111]/[0.08] mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs">
                M
              </div>
              <div>
                <div className="text-xs font-semibold text-[#111111]">
                  To: sarah.chen@google.com
                </div>
                <div className="text-[11px] text-[#8e928c]">
                  Subject: {emailDrafts[selectedTone].subject}
                </div>
              </div>
            </div>

            {/* Interactive Tone Selector */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-[#f4f3ef] rounded-xl border border-[#111111]/[0.06]">
              {(['professional', 'conversational', 'short'] as const).map((tone) => (
                <button
                  key={tone}
                  onClick={() => setSelectedTone(tone)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg capitalize transition-all ${
                    selectedTone === tone
                      ? 'bg-[#16a34a] text-white shadow-xs'
                      : 'text-[#626660] hover:text-[#111111]'
                  }`}
                >
                  {tone === 'short' ? 'Short & crisp' : tone}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile tone pills */}
          <div className="sm:hidden flex items-center gap-1 mb-3">
            {(['professional', 'conversational', 'short'] as const).map((tone) => (
              <button
                key={tone}
                onClick={() => setSelectedTone(tone)}
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg capitalize transition-all ${
                  selectedTone === tone
                    ? 'bg-[#16a34a] text-white shadow-xs'
                    : 'bg-[#f4f3ef] text-[#626660]'
                }`}
              >
                {tone === 'short' ? 'Short' : tone}
              </button>
            ))}
          </div>

          {/* Email Body with Highlights */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#f4f3ef]/50 border border-[#111111]/[0.06] text-xs sm:text-[13px] leading-relaxed text-[#111111]">
            {emailDrafts[selectedTone].body}
          </div>
        </div>

        {/* Legend showing highlight connection */}
        <div className="mt-4 pt-3 border-t border-[#111111]/[0.06] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a]" />
            <span className="text-[#626660]">Highlighted phrases derived from your career highlights</span>
          </div>
          <span className="font-semibold text-[#16a34a]">100% human-sounding</span>
        </div>
      </div>
    )
  }

  /* =========================================================================
     05: SEND FROM GMAIL (Layer 4)
     ========================================================================= */
  if (chapterId === 'send') {
    return (
      <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#111111]/[0.08] mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#111111]/10 flex items-center justify-center p-2 shadow-xs">
                <svg className="w-full h-full" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.682l8.073-6.189C21.69 2.279 24 3.434 24 5.457z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#111111]">Google OAuth Direct</h3>
                <p className="text-xs text-[#8e928c]">Sent via official Google Gmail API</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dcfce7] text-[#15803d] text-xs font-semibold border border-[#16a34a]/30">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Connected as jatin@gmail.com</span>
            </div>
          </div>

          {/* Active Sending Simulation */}
          <div className="p-6 rounded-2xl bg-white border border-[#111111]/[0.08] shadow-sm mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-[#16a34a] animate-pulse" />
                <span className="text-sm font-semibold text-[#111111]">Sending campaign...</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#16a34a]">28 / 41</span>
                <span className="text-xs text-[#8e928c]">~40 seconds</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-3 bg-[#f4f3ef] rounded-full overflow-hidden border border-[#111111]/[0.06] p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#16a34a] to-[#10b981] rounded-full transition-all duration-1000 shadow-sm"
                style={{ width: '68%' }}
              />
            </div>

            <div className="flex items-center justify-between mt-4 text-xs text-[#626660]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-ping" />
                <span>Next email queued: sarah.chen@google.com</span>
              </div>
              <span className="font-medium text-[#111111]">Zero spam triggers</span>
            </div>
          </div>

          {/* Safety notice */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#f4f3ef]/70 border border-[#111111]/[0.04]">
              <div className="font-semibold text-[#111111] mb-0.5">Natural spacing</div>
              <p className="text-[#8e928c]">Spaced over realistic intervals to preserve sender reputation.</p>
            </div>
            <div className="p-3 rounded-xl bg-[#f4f3ef]/70 border border-[#111111]/[0.04]">
              <div className="font-semibold text-[#111111] mb-0.5">Your Sent folder</div>
              <p className="text-[#8e928c]">Every sent email shows in your regular Gmail Sent folder.</p>
            </div>
          </div>
        </div>

        {/* Bottom summary */}
        <div className="mt-4 pt-3 border-t border-[#111111]/[0.06] text-xs text-[#8e928c] flex items-center justify-between">
          <span>Primary inbox delivery rate: 98.4%</span>
          <span className="text-[#16a34a] font-medium">Full delivery logs available</span>
        </div>
      </div>
    )
  }

  /* =========================================================================
     06: TRACK REPLIES & AUTOMATE FOLLOW-UPS (Layer 5)
     ========================================================================= */
  if (chapterId === 'tracking') {
    return (
      <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#111111]/[0.08] mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#15803d]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#111111]">Automated Timeline</h3>
                <p className="text-xs text-[#8e928c]">Auto follow-ups stop the second a recruiter replies</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#16a34a] text-white">
              Live Thread
            </span>
          </div>

          {/* Interactive Step-by-Step Timeline Card */}
          <div className="relative p-5 rounded-2xl bg-[#f4f3ef]/60 border border-[#111111]/[0.06] mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative">
              {/* Step 1 */}
              <div className="p-3 rounded-xl bg-white border border-[#111111]/[0.06] shadow-2xs">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#16a34a] mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Day 0
                </div>
                <div className="text-xs font-semibold text-[#111111]">Email Sent</div>
                <div className="text-[10px] text-[#8e928c] mt-1">Dispatched to Sarah Chen</div>
              </div>

              {/* Step 2 */}
              <div className="p-3 rounded-xl bg-white border border-[#111111]/[0.06] shadow-2xs">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-600 mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  Day 3
                </div>
                <div className="text-xs font-semibold text-[#111111]">Review Queued</div>
                <div className="text-[10px] text-[#8e928c] mt-1">Notification sent to you</div>
              </div>

              {/* Step 3 */}
              <div className="p-3 rounded-xl bg-white border border-[#111111]/[0.06] shadow-2xs">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 mb-1">
                  <Send className="w-3.5 h-3.5" />
                  Day 4
                </div>
                <div className="text-xs font-semibold text-[#111111]">Auto Follow-up</div>
                <div className="text-[10px] text-[#8e928c] mt-1">Dispatched if no reply</div>
              </div>

              {/* Step 4 - Triggered Reply! */}
              <div className="p-3 rounded-xl bg-[#dcfce7] border border-[#16a34a]/30 shadow-xs ring-2 ring-[#16a34a]/20">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#15803d] mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Day 5
                </div>
                <div className="text-xs font-bold text-[#15803d]">Reply Received!</div>
                <div className="text-[10px] text-[#15803d] font-medium mt-1">Follow-up halted</div>
              </div>
            </div>
          </div>

          {/* Recruiter Reply Card */}
          <div className="p-4 rounded-xl bg-white border border-[#16a34a]/30 shadow-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#16a34a] text-white flex items-center justify-center font-bold text-xs">
                SC
              </div>
              <div>
                <div className="text-xs font-bold text-[#111111] flex items-center gap-2">
                  Sarah Chen (Google)
                  <span className="text-[10px] text-[#16a34a] font-semibold bg-[#dcfce7] px-2 py-0.5 rounded-full">
                    Replied in 36m
                  </span>
                </div>
                <div className="text-xs text-[#626660] italic mt-0.5">
                  &ldquo;Hi Jatin, thanks for reaching out! Let&apos;s set up a quick 15-min call this Friday...&rdquo;
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-4 pt-3 border-t border-[#111111]/[0.06] text-xs text-[#8e928c] flex items-center justify-between">
          <span>Replies land directly in your Gmail Inbox</span>
          <span className="text-[#16a34a] font-medium">Follow-up rules 100% customizable</span>
        </div>
      </div>
    )
  }

  /* =========================================================================
     07: BOUNCE HANDLING & REFUND (Layer 6)
     ========================================================================= */
  if (chapterId === 'refund') {
    return (
      <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#111111]/[0.08] mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#111111]">Hard Bounce Protection</h3>
                <p className="text-xs text-[#8e928c]">Zero wasted credits on invalid recruiter emails</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#dcfce7] text-[#15803d] border border-[#16a34a]/30">
              100% Refund Guarantee
            </span>
          </div>

          {/* Bounce & Refund Visual Flow */}
          <div className="space-y-4 mb-6">
            {/* Step A: Hard Bounce Detected */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-red-50/60 border border-red-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-red-700">Hard Bounce Detected (550 Mailbox Unavailable)</div>
                  <div className="text-[11px] text-red-600 font-mono">old.recruiter@company.com</div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                Auto Flagged
              </span>
            </div>

            {/* Arrow connector */}
            <div className="flex justify-center -my-1">
              <div className="w-6 h-6 rounded-full bg-white border border-[#111111]/10 flex items-center justify-center text-[#16a34a]">
                ↓
              </div>
            </div>

            {/* Step B: 1 Credit Returned */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#dcfce7] border border-[#16a34a]/40 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#16a34a] text-white flex items-center justify-center shrink-0">
                  <Coins className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#15803d]">+1 Credit Automatically Refunded</div>
                  <div className="text-[11px] text-[#15803d]">Your credit balance restored to full amount</div>
                </div>
              </div>
              <span className="text-xs font-bold text-white bg-[#16a34a] px-3 py-1 rounded-full shadow-xs">
                +1 Credit Added
              </span>
            </div>
          </div>

          {/* Database feedback badge */}
          <div className="p-3.5 rounded-xl bg-white border border-[#111111]/[0.08] text-xs text-[#626660] flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#16a34a] shrink-0" />
            <span>Our global recruiter directory automatically removes bounced emails for all users.</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-4 pt-3 border-t border-[#111111]/[0.06] text-xs text-[#8e928c] flex items-center justify-between">
          <span>Real-time webhook reconciliation</span>
          <span className="text-[#16a34a] font-medium">Fair & transparent outreach</span>
        </div>
      </div>
    )
  }

  /* =========================================================================
     08: SETTLING FLAT PRICING (Layer 7)
     ========================================================================= */
  if (chapterId === 'pricing') {
    return (
      <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#111111]/[0.08] mb-4">
            <div>
              <h3 className="text-base font-semibold text-[#111111]">Transparent Credit System</h3>
              <p className="text-xs text-[#8e928c]">1 credit = 1 email sent · Credits never expire</p>
            </div>
            <a
              href="#pricing"
              className="text-xs font-semibold text-[#16a34a] hover:text-[#15803d] flex items-center gap-1"
            >
              <span>View full table</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Quick cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
            <div className="p-3 rounded-xl bg-white border border-[#111111]/[0.08] text-center">
              <div className="text-[11px] font-semibold text-[#8e928c]">Free</div>
              <div className="text-lg font-bold text-[#111111]">$0</div>
              <div className="text-[10px] text-[#16a34a] font-medium">25 credits</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#111111]/[0.08] text-center">
              <div className="text-[11px] font-semibold text-[#8e928c]">Starter</div>
              <div className="text-lg font-bold text-[#111111]">$7</div>
              <div className="text-[10px] text-[#16a34a] font-medium">100 credits</div>
            </div>

            <div className="p-3 rounded-xl bg-[#dcfce7]/60 border border-[#16a34a]/40 text-center shadow-xs">
              <div className="text-[10px] font-bold text-[#15803d] uppercase tracking-wider">Popular</div>
              <div className="text-lg font-bold text-[#15803d]">$20</div>
              <div className="text-[10px] text-[#15803d] font-bold">500 credits</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#111111]/[0.08] text-center">
              <div className="text-[11px] font-semibold text-[#8e928c]">Pro</div>
              <div className="text-lg font-bold text-[#111111]">$35</div>
              <div className="text-[10px] text-[#16a34a] font-medium">1,000 credits</div>
            </div>
          </div>

          {/* Ready to launch callout */}
          <div className="p-4 rounded-xl bg-[#16a34a] text-white flex items-center justify-between shadow-md">
            <div>
              <div className="text-sm font-semibold">Your next opportunity could be one email away.</div>
              <div className="text-xs text-white/80">Get started right now with 25 free credits. No card required.</div>
            </div>
            <a
              href="https://app.eextramile.com"
              className="px-4 py-2 rounded-lg bg-white text-[#16a34a] font-semibold text-xs hover:bg-[#f4f3ef] transition-colors shrink-0 flex items-center gap-1.5"
            >
              <span>Start free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-4 pt-3 border-t border-[#111111]/[0.06] text-xs text-[#8e928c] flex items-center justify-between">
          <span>No monthly subscription lock-in</span>
          <span className="text-[#16a34a] font-medium">Full access on all plans</span>
        </div>
      </div>
    )
  }

  return null
}
