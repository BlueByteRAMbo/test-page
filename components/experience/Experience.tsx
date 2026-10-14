'use client'

import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollState, useScrollStore } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'
import Overlay from './Overlay'
import ProgressRail from './ProgressRail'
import Loader from './Loader'
import Fallback from './Fallback'

gsap.registerPlugin(ScrollTrigger)

const CanvasScene = dynamic(() => import('./CanvasScene'), {
  ssr: false,
  loading: () => <Loader />,
})

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [useFallback, setUseFallback] = useState(false)
  const isCanvasReady = useScrollStore((s) => s.isCanvasReady)
  const setActiveChapter = useScrollStore((s) => s.setActiveChapter)

  // WebGL & Reduced Motion detection
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

    if (prefersReducedMotion || !gl) {
      setUseFallback(true)
    }
  }, [])

  // ScrollTrigger binding
  useEffect(() => {
    if (useFallback) return

    const container = containerRef.current
    if (!container) return

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.1,
      onUpdate: (self) => {
        // Direct mutable assignment for 60fps useFrame without React re-render
        scrollState.progress = self.progress
        scrollState.velocity = self.getVelocity()

        // Check active chapter only to update Zustand UI store
        let currentCh = 0
        for (let i = CHAPTERS.length - 1; i >= 0; i--) {
          if (self.progress >= CHAPTERS[i].range[0]) {
            currentCh = i
            break
          }
        }

        if (scrollState.chapter !== currentCh) {
          scrollState.chapter = currentCh
          setActiveChapter(currentCh)
        }
      },
    })

    return () => {
      trigger.kill()
    }
  }, [useFallback, setActiveChapter])

  if (useFallback) {
    return (
      <section id="how-it-works" className="relative bg-[#f4f3ef]">
        <Fallback />
      </section>
    )
  }

  return (
    <div id="how-it-works" ref={containerRef} className="relative h-[800svh]">
      {/* 
        Semantic DOM for 100% crawlability, indexing, and accessibility.
        Visually hidden via .sr-only so it doesn't collide with the WebGL canvas.
      */}
      <div className="sr-only">
        {CHAPTERS.map((ch) => (
          <section key={ch.id} id={`section-${ch.id}`} aria-label={ch.railLabel}>
            <h2>
              {ch.titlePrefix} {ch.titleItalic} {ch.titleSuffix || ''}
            </h2>
            <p>{ch.description}</p>
            <ul>
              {ch.chips.map((chip, i) => (
                <li key={i}>{chip}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Sticky 100svh Viewport Frame */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#f4f3ef]">
        {/* R3F WebGL Scene */}
        <CanvasScene />

        {/* Narrative UI Overlay */}
        <Overlay />

        {/* Vertical Progress Navigation Rail */}
        <ProgressRail />

        {/* Loading Indicator */}
        {!isCanvasReady && <Loader />}
      </div>
    </div>
  )
}
