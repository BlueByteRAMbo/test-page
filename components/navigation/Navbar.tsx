'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#f4f3ef]/90 backdrop-blur-md border-b border-[#111111]/[0.06] py-3.5 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-white border border-[#111111]/10 flex items-center justify-center p-1 shadow-sm transition-transform group-hover:scale-105">
              <Image src="/logo.png" alt="Eextramile AI logo" width={32} height={32} className="w-full h-full object-contain" priority />
            </div>
            <div className="flex items-baseline font-medium tracking-tight text-lg text-[#111111]">
              <span className="text-[#16a34a] font-bold text-xl">E</span>
              <span className="font-semibold">extramile</span>
              <span className="ml-1 text-[11px] font-bold uppercase tracking-wider bg-[#16a34a]/10 text-[#16a34a] px-1.5 py-0.5 rounded">
                AI
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[14px] text-[#626660]">
            <a
              href="#how-it-works"
              className="hover:text-[#111111] transition-colors font-medium"
            >
              How it works
            </a>
            <a href="#pricing" className="hover:text-[#111111] transition-colors font-medium">
              Pricing
            </a>
            <a href="#faq" className="hover:text-[#111111] transition-colors font-medium">
              FAQ
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://app.eextramile.com"
              className="hidden sm:inline-flex text-[14px] font-medium text-[#626660] hover:text-[#111111] px-3.5 py-2 transition-colors"
            >
              Sign in
            </a>
            <a
              href="https://app.eextramile.com"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-white bg-[#16a34a] hover:bg-[#15803d] px-4 py-2 rounded-full shadow-sm hover:shadow transition-all group"
            >
              <span>Get started free</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
