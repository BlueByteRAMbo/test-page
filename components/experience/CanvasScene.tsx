'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Stage from './Stage'
import CameraRig from './CameraRig'
import Chapter1Hero from './chapters/Chapter1Hero'
import Chapter2Highlights from './chapters/Chapter2Highlights'
import Chapter3Discovery from './chapters/Chapter3Discovery'
import Chapter4Personalize from './chapters/Chapter4Personalize'
import Chapter5Followup from './chapters/Chapter5Followup'
import Chapter6Refund from './chapters/Chapter6Refund'
import Chapter7Settle from './chapters/Chapter7Settle'
import { useScrollStore } from '@/lib/scroll-store'

export default function CanvasScene() {
  const setIsCanvasReady = useScrollStore((s) => s.setIsCanvasReady)

  return (
    <Canvas
      shadows
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.05, 4.8], fov: 40, near: 0.1, far: 50 }}
      onCreated={() => setIsCanvasReady(true)}
      className="h-full w-full"
    >
      <Suspense fallback={null}>
        <Stage />
        <CameraRig />

        {/* 7 Chapter Actors in 3D */}
        <Chapter1Hero />
        <Chapter2Highlights />
        <Chapter3Discovery />
        <Chapter4Personalize />
        <Chapter5Followup />
        <Chapter6Refund />
        <Chapter7Settle />
      </Suspense>
    </Canvas>
  )
}
