'use client'

import React from 'react'
import Navbar from '@/components/navigation/Navbar'
import UnifiedSheetsStory from '@/components/sheets/UnifiedSheetsStory'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f3ef] text-[#111111] selection:bg-[#dcfce7] selection:text-[#15803d] overflow-x-clip">
      {/* Top Navigation */}
      <Navbar />

      {/* 
        Unified 3D Sheets Story
        - Moments 01 to 07 (Hero to Bounce Refund)
        - Both text and recreated 3D visual enter simultaneously as single frames
        - Unified 3D spatial perspective with zero split-screen disconnect
        - Recreated with handcrafted code & micro-animations (no pasted images)
      */}
      <UnifiedSheetsStory />

      {/* 
        Section 08: Pricing & Final CTA 
        - Shown cleanly on standard scroll only AFTER the 3D scroll animation finishes
      */}
      <Pricing />

      {/* FAQ & Final Footer */}
      <FAQ />
      <Footer />
    </main>
  )
}
