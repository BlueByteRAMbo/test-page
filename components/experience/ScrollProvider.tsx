'use client'

import React, { createContext, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollContextValue {
  lenis: Lenis | null
  scrollToChapter: (chapterIndex: number) => void
  scrollToTop: () => void
}

const ScrollContext = createContext<ScrollContextValue>({
  lenis: null,
  scrollToChapter: () => {},
  scrollToTop: () => {},
})

export function useLenisContext() {
  return useContext(ScrollContext)
}

interface ScrollProviderProps {
  children: React.ReactNode
}

export default function ScrollProvider({ children }: ScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollToChapter = (chapterIndex: number) => {
    const el = document.getElementById('how-it-works')
    if (!el || !lenisRef.current) return

    const rect = el.getBoundingClientRect()
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const stageTop = rect.top + scrollTop
    const stageHeight = el.offsetHeight - window.innerHeight

    // 7 chapters: target the midpoint or start of chapter
    // Chapter ranges are in data/chapters.ts
    const chapterTargets = [0.02, 0.20, 0.35, 0.52, 0.67, 0.81, 0.94]
    const targetProgress = chapterTargets[chapterIndex] ?? 0
    const targetY = stageTop + stageHeight * targetProgress

    lenisRef.current.scrollTo(targetY, { duration: 1.2 })
  }

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.0 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <ScrollContext.Provider value={{ lenis: lenisRef.current, scrollToChapter, scrollToTop }}>
      {children}
    </ScrollContext.Provider>
  )
}
