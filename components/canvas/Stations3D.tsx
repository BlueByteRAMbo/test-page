'use client'

import React, { useState } from 'react'
import { Html } from '@react-three/drei'
import { stationsConfig } from '@/data/scene-config'
import {
  Sparkles,
  Check,
  Search,
  Building2,
  Mail,
  Send,
  Clock,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Coins,
  ArrowRight,
  ShieldCheck,
  Edit3
} from 'lucide-react'

interface Stations3DProps {
  activeStationIndex: number
}

export default function Stations3D({ activeStationIndex }: Stations3DProps) {
  // Interactive state inside 3D stations
  const [selectedTone, setSelectedTone] = useState<'professional' | 'conversational' | 'short'>('professional')
  const [targetCompany, setTargetCompany] = useState('Google')
  const [targetRole, setTargetRole] = useState('Frontend Developer')

  const emailDrafts = {
    professional: {
      subject: 'Excited about Frontend Engineer role at Google',
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
          </span>.
          <br /><br />
          Would welcome 10 minutes to discuss how my background matches your current engineering priorities.
        </>
      ),
    },
    conversational: {
      subject: 'Quick question regarding Frontend roles at Google',
      body: (
        <>
          Hey Sarah,
          <br /><br />
          Hope your week is great! With{' '}
          <span className="bg-[#dcfce7] text-[#15803d] font-semibold px-1.5 py-0.5 rounded border border-[#16a34a]/30">
            3 years in web development
          </span>{' '}
          and{' '}
          <span className="bg-[#dcfce7] text-[#15803d] font-semibold px-1.5 py-0.5 rounded border border-[#16a34a]/30">
            2 full-stack launches
          </span>, 
          I&apos;d love to see if there&apos;s a strong fit on your team.
          <br /><br />
          Open for a quick 5-min chat this Thursday?
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
            3 years experience
          </span>{' '}
          and{' '}
          <span className="bg-[#dcfce7] text-[#15803d] font-semibold px-1.5 py-0.5 rounded border border-[#16a34a]/30">
            2 high-impact projects
          </span>. 
          Looking to bring strong React expertise to Google.
          <br /><br />
          Resume attached. Would love to connect briefly!
        </>
      ),
    },
  }

  return (
    <group>
      {/* =========================================================================
          STATION 0: HERO 3D MULTI-LAYER PAPER STACK ([0, 0, 0])
          ========================================================================= */}
      <group position={stationsConfig[0].position} rotation={stationsConfig[0].rotation}>
        {/* Layer A (Back Left): Target Companies */}
        <group position={[-1.8, 0.3, -1.0]} rotation={[0.06, -0.16, 0.03]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.8, 3.4, 0.03]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.05} />
          </mesh>
          <Html transform distanceFactor={5.6} position={[0, 0, 0.02]} className="pointer-events-none select-none">
            <div className="w-[260px] p-4 rounded-2xl bg-white/95 border border-[#111111]/[0.08] shadow-lg">
              <div className="text-[10px] font-semibold text-[#8e928c] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#16a34a]" />
                Target Companies
              </div>
              <div className="space-y-1.5">
                {[
                  { name: 'Google', logo: 'G', color: '#4285F4' },
                  { name: 'Meta', logo: 'M', color: '#0668E1' },
                  { name: 'Microsoft', logo: 'MS', color: '#00A4EF' },
                  { name: 'Amazon', logo: 'A', color: '#FF9900' },
                ].map((co) => (
                  <div key={co.name} className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-[#f4f3ef]/80">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px] text-white" style={{ background: co.color }}>
                        {co.logo}
                      </span>
                      <span className="font-medium text-[#111111]">{co.name}</span>
                    </div>
                    <span className="text-[9px] text-[#16a34a] font-medium">11 recruiters</span>
                  </div>
                ))}
              </div>
            </div>
          </Html>
        </group>

        {/* Layer B (Back Right): Personalised Email Preview */}
        <group position={[1.8, 0.2, -0.7]} rotation={[-0.04, 0.14, -0.02]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.8, 3.4, 0.03]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.05} />
          </mesh>
          <Html transform distanceFactor={5.6} position={[0, 0, 0.02]} className="pointer-events-none select-none">
            <div className="w-[270px] p-4 rounded-2xl bg-white/95 border border-[#111111]/[0.08] shadow-lg">
              <div className="flex items-center justify-between mb-2 text-[10px] text-[#8e928c]">
                <span className="font-semibold uppercase tracking-wider text-[#16a34a] flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  Personalised
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-ping" />
              </div>
              <div className="text-[11px] font-semibold text-[#111111] mb-2 truncate">
                To: sarah.chen@google.com
              </div>
              <div className="space-y-1.5 text-[10px]">
                <div className="h-1.5 bg-[#dcfce7] rounded w-full border border-[#16a34a]/30" />
                <div className="h-1.5 bg-[#f4f3ef] rounded w-4/5" />
                <div className="h-1.5 bg-[#dcfce7] rounded w-3/4 border border-[#16a34a]/30" />
              </div>
              <div className="mt-3 pt-2 border-t border-[#111111]/[0.06] flex items-center justify-between text-[10px]">
                <span className="text-[#16a34a] font-medium">Ready</span>
                <span className="text-[#8e928c]">Gmail API</span>
              </div>
            </div>
          </Html>
        </group>

        {/* Layer C (Front Center): Your Highlights Feature Sheet */}
        <group position={[0, 0, 0.3]} rotation={[0.01, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3.8, 3.8, 0.03]} />
            <meshStandardMaterial color="#ffffff" roughness={0.25} metalness={0.05} />
          </mesh>
          <Html transform distanceFactor={5.6} position={[0, 0, 0.02]} className="pointer-events-auto select-none">
            <div className="w-[360px] p-5 rounded-2xl bg-white border border-[#111111]/10 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-[#111111]/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#dcfce7] flex items-center justify-center text-[#15803d]">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-[#111111]">Your Highlights</h3>
                    <p className="text-[10px] text-[#8e928c]">Reusable across 300+ recruiters</p>
                  </div>
                </div>
                <span className="text-[9px] font-semibold text-[#16a34a] bg-[#dcfce7] px-2 py-0.5 rounded-full">
                  3D Pipeline
                </span>
              </div>

              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#f4f3ef]/80 border border-[#111111]/[0.04]">
                  <CheckCircle2 className="w-3 h-3 text-[#16a34a] shrink-0" />
                  <span className="text-[11px] font-medium text-[#111111]">
                    3 years of experience in frontend
                  </span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#f4f3ef]/80 border border-[#111111]/[0.04]">
                  <CheckCircle2 className="w-3 h-3 text-[#16a34a] shrink-0" />
                  <span className="text-[11px] font-medium text-[#111111]">
                    Built 2 major production systems
                  </span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#f4f3ef]/80 border border-[#111111]/[0.04]">
                  <CheckCircle2 className="w-3 h-3 text-[#16a34a] shrink-0" />
                  <span className="text-[11px] font-medium text-[#111111]">
                    Open to relocation worldwide
                  </span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#dcfce7] border border-[#16a34a]/30 shadow-xs">
                  <CheckCircle2 className="w-3 h-3 text-[#16a34a] shrink-0" />
                  <span className="text-[11px] font-bold text-[#15803d]">
                    Passionate about AI/ML &amp; tooling
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-[#111111]/[0.06] flex items-center justify-between text-[10px] text-[#626660]">
                <span>Scroll to enter 3D journey</span>
                <span className="text-[#16a34a] font-semibold">Layer 01 of 08 ↓</span>
              </div>
            </div>
          </Html>
        </group>
      </group>

      {/* =========================================================================
          STATION 1: YOUR HIGHLIGHTS (Layer 01, Z = -18)
          ========================================================================= */}
      <group position={stationsConfig[1].position} rotation={stationsConfig[1].rotation}>
        <mesh position={[0, 0, -0.05]} castShadow receiveShadow>
          <boxGeometry args={[5.8, 4.4, 0.04]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.05} />
        </mesh>

        <Html transform distanceFactor={6.5} position={[0, 0, 0]} className="select-none pointer-events-auto">
          <div className="w-[560px] p-6 rounded-3xl bg-white border border-[#111111]/10 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#111111]/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#15803d]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#111111]">Layer 01 · Your Career Highlights</h3>
                  <p className="text-[11px] text-[#8e928c]">Saved once · Tailored to 300+ recruiters automatically</p>
                </div>
              </div>
              <button className="flex items-center gap-1 text-[11px] font-medium text-[#16a34a] px-2.5 py-1 rounded-lg border border-[#16a34a]/20 bg-[#dcfce7]/40">
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#f4f3ef]/80 border border-[#111111]/[0.06]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
                <span className="text-xs font-medium text-[#111111]">
                  Frontend Developer with 3+ years experience building scalable applications
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#f4f3ef]/80 border border-[#111111]/[0.06]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
                <span className="text-xs font-medium text-[#111111]">
                  Built and deployed 2 major production systems with real-time synchronization
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#f4f3ef]/80 border border-[#111111]/[0.06]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
                <span className="text-xs font-medium text-[#111111]">
                  Open to relocation and remote opportunities worldwide
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#dcfce7] border border-[#16a34a]/40 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
                  <span className="text-xs font-bold text-[#15803d]">
                    Passionate about AI/ML &amp; intuitive developer tooling
                  </span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider bg-[#16a34a] text-white px-1.5 py-0.5 rounded">
                  Hook
                </span>
              </div>
            </div>

            <div className="mt-4 pt-2.5 border-t border-[#111111]/[0.06] flex items-center justify-between text-[11px] text-[#626660]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a]" />
                <span>Verified profile data</span>
              </div>
              <span className="font-semibold text-[#16a34a]">Recruiter Discovery →</span>
            </div>
          </div>
        </Html>
      </group>

      {/* =========================================================================
          STATION 2: FIND RECRUITERS (Layer 02, Z = -36)
          ========================================================================= */}
      <group position={stationsConfig[2].position} rotation={stationsConfig[2].rotation}>
        <mesh position={[0, 0, -0.05]} castShadow receiveShadow>
          <boxGeometry args={[5.8, 4.4, 0.04]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.05} />
        </mesh>

        <Html transform distanceFactor={6.5} position={[0, 0, 0]} className="select-none pointer-events-auto">
          <div className="w-[560px] p-6 rounded-3xl bg-white border border-[#111111]/10 shadow-2xl backdrop-blur-md">
            {/* Search Input Bar */}
            <div className="flex items-center gap-2 p-2 rounded-2xl bg-[#f4f3ef] border border-[#111111]/[0.08] mb-4">
              <div className="flex items-center gap-1.5 flex-1 px-2.5 py-1.5 bg-white rounded-xl border border-[#111111]/[0.06]">
                <Building2 className="w-3.5 h-3.5 text-[#16a34a]" />
                <input
                  type="text"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  className="w-full text-xs font-semibold text-[#111111] bg-transparent focus:outline-none"
                  placeholder="Target company..."
                />
              </div>
              <div className="flex items-center gap-1.5 flex-1 px-2.5 py-1.5 bg-white rounded-xl border border-[#111111]/[0.06]">
                <Search className="w-3.5 h-3.5 text-[#8e928c]" />
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full text-xs font-medium text-[#111111] bg-transparent focus:outline-none"
                  placeholder="Target role..."
                />
              </div>
              <button className="px-3 py-1.5 rounded-xl bg-[#16a34a] text-white text-[11px] font-semibold hover:bg-[#15803d] transition-colors shrink-0">
                Search
              </button>
            </div>

            {/* Recruiter Cards */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#111111]/10 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#16a34a]/15 text-[#16a34a] font-semibold text-xs flex items-center justify-center">
                    SC
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#111111]">
                      Sarah Chen <span className="text-[10px] text-[#8e928c]">· Senior Recruiter</span>
                    </div>
                    <div className="text-[11px] text-[#626660] font-mono">sarah.chen@google.com</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#dcfce7] text-[#15803d]">
                    <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                    Verified
                  </span>
                  <span className="text-[9px] text-[#16a34a]">99% confidence</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#111111]/10 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-semibold text-xs flex items-center justify-center">
                    MR
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#111111]">
                      Michael Rodriguez <span className="text-[10px] text-[#8e928c]">· Talent Partner</span>
                    </div>
                    <div className="text-[11px] text-[#626660] font-mono">m.rodriguez@google.com</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700">
                    Predicted
                  </span>
                  <span className="text-[9px] text-amber-600">72% confidence</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#111111]/10 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-semibold text-xs flex items-center justify-center">
                    EW
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#111111]">
                      Emily Watson <span className="text-[10px] text-[#8e928c]">· Tech Recruiter</span>
                    </div>
                    <div className="text-[11px] text-[#626660] font-mono">emily.watson@google.com</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700">
                    Predicted
                  </span>
                  <span className="text-[9px] text-amber-600">61% confidence</span>
                </div>
              </div>
            </div>
          </div>
        </Html>
      </group>

      {/* =========================================================================
          STATION 3: PERSONALISED EMAIL (Layer 03, Z = -54)
          ========================================================================= */}
      <group position={stationsConfig[3].position} rotation={stationsConfig[3].rotation}>
        <mesh position={[0, 0, -0.05]} castShadow receiveShadow>
          <boxGeometry args={[5.8, 4.4, 0.04]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.05} />
        </mesh>

        <Html transform distanceFactor={6.5} position={[0, 0, 0]} className="select-none pointer-events-auto">
          <div className="w-[560px] p-6 rounded-3xl bg-white border border-[#111111]/10 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-[#111111]/[0.08] mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs">
                  M
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#111111]">To: sarah.chen@google.com</div>
                  <div className="text-[10px] text-[#8e928c]">Subject: {emailDrafts[selectedTone].subject}</div>
                </div>
              </div>

              {/* Tone Selector Pills */}
              <div className="flex items-center gap-1 p-0.5 bg-[#f4f3ef] rounded-xl border border-[#111111]/[0.06]">
                {(['professional', 'conversational', 'short'] as const).map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setSelectedTone(tone)}
                    className={`text-[10px] font-semibold px-2 py-1 rounded-lg capitalize transition-all ${
                      selectedTone === tone
                        ? 'bg-[#16a34a] text-white shadow-xs'
                        : 'text-[#626660] hover:text-[#111111]'
                    }`}
                  >
                    {tone === 'short' ? 'Short' : tone}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f4f3ef]/60 border border-[#111111]/[0.06] text-xs leading-relaxed text-[#111111]">
              {emailDrafts[selectedTone].body}
            </div>

            <div className="mt-3 pt-2 border-t border-[#111111]/[0.06] flex items-center justify-between text-[11px] text-[#626660]">
              <span>Highlight injection active</span>
              <span className="font-semibold text-[#16a34a]">100% human-sounding</span>
            </div>
          </div>
        </Html>
      </group>

      {/* =========================================================================
          STATION 4: SEND VIA GMAIL (Layer 04, Z = -72)
          ========================================================================= */}
      <group position={stationsConfig[4].position} rotation={stationsConfig[4].rotation}>
        <mesh position={[0, 0, -0.05]} castShadow receiveShadow>
          <boxGeometry args={[5.8, 4.4, 0.04]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.05} />
        </mesh>

        <Html transform distanceFactor={6.5} position={[0, 0, 0]} className="select-none pointer-events-auto">
          <div className="w-[560px] p-6 rounded-3xl bg-white border border-[#111111]/10 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#111111]/[0.08] mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#111111]/10 flex items-center justify-center p-1.5 shadow-xs">
                  <Mail className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[#111111]">Google OAuth Direct Dispatch</h3>
                  <p className="text-[10px] text-[#8e928c]">Official Google Gmail API</p>
                </div>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#dcfce7] text-[#15803d] text-[10px] font-semibold border border-[#16a34a]/30">
                <Check className="w-3 h-3 stroke-[2.5]" />
                <span>jatin@gmail.com</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#111111]/[0.08] shadow-sm mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-[#16a34a] animate-pulse" />
                  <span className="text-xs font-semibold text-[#111111]">Sending campaign...</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#16a34a]">28 / 41</span>
                  <span className="text-[10px] text-[#8e928c]">~40s</span>
                </div>
              </div>

              <div className="w-full h-2 bg-[#f4f3ef] rounded-full overflow-hidden border border-[#111111]/[0.06] p-0.5">
                <div className="h-full bg-gradient-to-r from-[#16a34a] to-[#10b981] rounded-full" style={{ width: '68%' }} />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#626660]">
              <span>Natural delivery spacing</span>
              <span className="font-semibold text-[#16a34a]">Primary Inbox</span>
            </div>
          </div>
        </Html>
      </group>

      {/* =========================================================================
          STATION 5: REPLY TRACKING & FOLLOW-UPS (Layer 05, Z = -90)
          ========================================================================= */}
      <group position={stationsConfig[5].position} rotation={stationsConfig[5].rotation}>
        <mesh position={[0, 0, -0.05]} castShadow receiveShadow>
          <boxGeometry args={[5.8, 4.4, 0.04]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.05} />
        </mesh>

        <Html transform distanceFactor={6.5} position={[0, 0, 0]} className="select-none pointer-events-auto">
          <div className="w-[560px] p-6 rounded-3xl bg-white border border-[#111111]/10 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-[#111111]/[0.08] mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#15803d]">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[#111111]">Layer 05 · Reply Tracking</h3>
                  <p className="text-[10px] text-[#8e928c]">Follow-ups stop on reply</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#16a34a] text-white">
                Live Thread
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-3">
              <div className="p-2 rounded-xl bg-white border border-[#111111]/[0.08]">
                <div className="text-[9px] font-semibold text-[#16a34a]">Day 0</div>
                <div className="text-[11px] font-bold text-[#111111]">Sent</div>
              </div>
              <div className="p-2 rounded-xl bg-white border border-[#111111]/[0.08]">
                <div className="text-[9px] font-semibold text-amber-600">Day 3</div>
                <div className="text-[11px] font-bold text-[#111111]">Review</div>
              </div>
              <div className="p-2 rounded-xl bg-white border border-[#111111]/[0.08]">
                <div className="text-[9px] font-semibold text-blue-600">Day 4</div>
                <div className="text-[11px] font-bold text-[#111111]">Auto Sent</div>
              </div>
              <div className="p-2 rounded-xl bg-[#dcfce7] border border-[#16a34a]/40 ring-1 ring-[#16a34a]/20">
                <div className="text-[9px] font-bold text-[#15803d]">Day 5</div>
                <div className="text-[11px] font-bold text-[#15803d]">Replied!</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-[#16a34a]/30 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#16a34a] text-white flex items-center justify-center font-bold text-[10px]">
                  SC
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#111111]">
                    Sarah Chen (Google) · <span className="text-[#16a34a]">Replied in 36m</span>
                  </div>
                  <div className="text-[10px] text-[#626660] italic">
                    &ldquo;Thanks for reaching out! Let&apos;s set up a quick 15-min call...&rdquo;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Html>
      </group>

      {/* =========================================================================
          STATION 6: BOUNCE REFUND (Layer 06, Z = -108)
          ========================================================================= */}
      <group position={stationsConfig[6].position} rotation={stationsConfig[6].rotation}>
        <mesh position={[0, 0, -0.05]} castShadow receiveShadow>
          <boxGeometry args={[5.8, 4.4, 0.04]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.05} />
        </mesh>

        <Html transform distanceFactor={6.5} position={[0, 0, 0]} className="select-none pointer-events-auto">
          <div className="w-[560px] p-6 rounded-3xl bg-white border border-[#111111]/10 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-[#111111]/[0.08] mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <RotateCcw className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[#111111]">Layer 06 · Hard Bounce Protection</h3>
                  <p className="text-[10px] text-[#8e928c]">Zero wasted credits</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#15803d]">
                100% Refund
              </span>
            </div>

            <div className="space-y-2.5 mb-3">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-red-50/70 border border-red-200">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <div className="text-[11px] font-bold text-red-700">Hard Bounce Detected (550)</div>
                </div>
                <span className="text-[9px] font-semibold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                  Auto Detected
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#dcfce7] border border-[#16a34a]/40 shadow-xs">
                <div className="flex items-center gap-2">
                  <Coins className="w-3.5 h-3.5 text-[#16a34a]" />
                  <div className="text-[11px] font-bold text-[#15803d]">+1 Credit Automatically Returned</div>
                </div>
                <span className="text-[10px] font-bold text-white bg-[#16a34a] px-2.5 py-0.5 rounded-full shadow-xs">
                  +1 Credit Added
                </span>
              </div>
            </div>
          </div>
        </Html>
      </group>

      {/* =========================================================================
          STATION 7: PRICING SETTLE (Layer 07, Z = -126)
          ========================================================================= */}
      <group position={stationsConfig[7].position} rotation={stationsConfig[7].rotation}>
        <mesh position={[0, 0, -0.05]} castShadow receiveShadow>
          <boxGeometry args={[5.8, 4.4, 0.04]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.05} />
        </mesh>

        <Html transform distanceFactor={6.5} position={[0, 0, 0]} className="select-none pointer-events-auto">
          <div className="w-[560px] p-6 rounded-3xl bg-white border border-[#111111]/10 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-[#111111]/[0.08] mb-4">
              <div>
                <h3 className="text-xs font-semibold text-[#111111]">Pipeline Complete · Pricing</h3>
                <p className="text-[10px] text-[#8e928c]">1 credit = 1 email sent · Credits never expire</p>
              </div>
              <a href="#pricing" className="text-[11px] font-semibold text-[#16a34a] flex items-center gap-1">
                <span>View full plans</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="p-2 rounded-xl bg-[#f4f3ef] text-center border border-[#111111]/[0.06]">
                <div className="text-[9px] text-[#8e928c]">Free</div>
                <div className="text-base font-bold text-[#111111]">$0</div>
                <div className="text-[9px] text-[#16a34a]">25 cr</div>
              </div>

              <div className="p-2 rounded-xl bg-[#f4f3ef] text-center border border-[#111111]/[0.06]">
                <div className="text-[9px] text-[#8e928c]">Starter</div>
                <div className="text-base font-bold text-[#111111]">$7</div>
                <div className="text-[9px] text-[#16a34a]">100 cr</div>
              </div>

              <div className="p-2 rounded-xl bg-[#dcfce7] text-center border border-[#16a34a]/30 shadow-xs">
                <div className="text-[9px] font-bold text-[#15803d]">Popular</div>
                <div className="text-base font-bold text-[#15803d]">$20</div>
                <div className="text-[9px] text-[#15803d]">500 cr</div>
              </div>

              <div className="p-2 rounded-xl bg-[#f4f3ef] text-center border border-[#111111]/[0.06]">
                <div className="text-[9px] text-[#8e928c]">Pro</div>
                <div className="text-base font-bold text-[#111111]">$35</div>
                <div className="text-[9px] text-[#16a34a]">1,000 cr</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#16a34a] text-white flex items-center justify-between shadow-md">
              <div>
                <div className="text-[11px] font-semibold">Your next opportunity is one email away.</div>
                <div className="text-[9px] text-white/80">Start with 25 free credits.</div>
              </div>
              <a href="https://app.eextramile.com" className="px-3 py-1 rounded-lg bg-white text-[#16a34a] font-semibold text-[11px] shrink-0">
                Start free →
              </a>
            </div>
          </div>
        </Html>
      </group>
    </group>
  )
}
