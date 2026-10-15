'use client'

import React, { Suspense, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Canvas
      shadows="percentage"
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      dpr={isMobile ? [1, 1.5] : [1.5, 2]}
      camera={{ position: [0, 0.05, 4.8], fov: 40, near: 0.1, far: 50 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NeutralToneMapping
        gl.toneMappingExposure = 1
        setIsCanvasReady(true)
      }}
      className="h-full w-full"
    >
      <Suspense fallback={null}>
        <Stage />
        <CameraRig />

        {/* Soft Contact Shadows grounding all 3D chapter actors */}
        <ContactShadows
          position={[0, -1.15, 0]}
          opacity={0.18}
          scale={10}
          blur={2.5}
          far={4.5}
          resolution={512}
          color="#0f172a"
        />

        {/* Soft shadow receiving backplane */}
        <mesh receiveShadow position={[0, 0, -0.5]}>
          <planeGeometry args={[25, 25]} />
          <shadowMaterial opacity={0.14} transparent />
        </mesh>

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
