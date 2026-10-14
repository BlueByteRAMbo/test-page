'use client'

import React from 'react'
import Navbar from '@/components/navigation/Navbar'
import ScrollProvider from '@/components/experience/ScrollProvider'
import Experience from '@/components/experience/Experience'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <ScrollProvider>
      <main className="min-h-screen bg-[#f4f3ef] text-[#111111] selection:bg-[#dcfce7] selection:text-[#15803d] overflow-x-clip">
        {/* Top Navigation */}
        <Navbar />

        {/* 
          Real 3D Interactive WebGL Narrative Pipeline
          - 7 continuous chapters rendered via React Three Fiber
          - Lenis smooth scroll synced with GSAP ScrollTrigger
          - Decoupled useFrame render loop (0 React re-renders per scroll tick)
        */}
        <Experience />

        {/* 
          Pricing & Final CTA 
          - Standard document flow after 3D experience completes
        */}
        <Pricing />

        {/* FAQ & Final Footer */}
        <FAQ />
        <Footer />
      </main>
    </ScrollProvider>
  )
}
