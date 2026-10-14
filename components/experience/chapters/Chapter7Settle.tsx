'use client'

import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { scrollState, chapterProgress, clamp01 } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'
import OrigamiPlane from '../models/OrigamiPlane'

/**
 * Chapter 7: Ready to Start / Settle Transition
 * Range: [0.88, 1.00]
 * - Pristine origami plane rests on a sleek lathed circular plinth tilted in perspective
 * - Concentric emerald optical glow ring and embossed 25-credit launch emblem
 * - 3D actors dissolve gracefully into the paper fog as Pricing scrolls into view
 */
export default function Chapter7Settle() {
  const rootRef = useRef<THREE.Group>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const textureRef = useRef<THREE.CanvasTexture | null>(null)

  const ch = CHAPTERS[6]

  // Circular Plinth Emblem Texture (512x512)
  const { canvas, texture } = useMemo(() => {
    if (typeof document === 'undefined') {
      return { canvas: null, texture: null }
    }
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 512
    const tex = new THREE.CanvasTexture(c)
    tex.generateMipmaps = true
    tex.minFilter = THREE.LinearMipmapLinearFilter
    canvasRef.current = c
    textureRef.current = tex

    const ctx = c.getContext('2d')
    if (ctx) {
      const size = c.width
      const center = size / 2

      ctx.clearRect(0, 0, size, size)

      // Brushed Platinum Center Disc
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(center, center, center - 16, 0, Math.PI * 2)
      ctx.fill()

      // Concentric Rings
      ctx.strokeStyle = '#e2e8f0'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(center, center, center - 36, 0, Math.PI * 2)
      ctx.stroke()

      ctx.strokeStyle = '#16a34a'
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.arc(center, center, center - 60, 0, Math.PI * 2)
      ctx.stroke()

      // Center Brand & Credit Callout
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = '800 26px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      ctx.fillStyle = '#0f172a'
      ctx.fillText('LAUNCH READY', center, center - 32)

      ctx.font = '700 20px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.fillStyle = '#15803d'
      ctx.fillText('25 FREE CREDITS INCLUDED', center, center + 4)

      ctx.font = '500 15px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.fillStyle = '#64748b'
      ctx.fillText('Direct Gmail Connect · Zero Card Required', center, center + 38)

      tex.needsUpdate = true
    }

    return { canvas: c, texture: tex }
  }, [])

  useFrame(() => {
    if (!rootRef.current) return
    const p = scrollState.progress
    const enter = clamp01((p - 0.86) / 0.05)
    const settleFade = clamp01((1.0 - p) / 0.06)

    rootRef.current.visible = enter > 0.01 && settleFade > 0.01
    if (!rootRef.current.visible) return

    const localP = chapterProgress(ch.range)

    // Gentle settling descent to ground plane
    rootRef.current.position.y = ch.actorPosition[1] - localP * 0.2
    rootRef.current.scale.setScalar((0.92 + enter * 0.08) * settleFade)
  })

  const discMaterial = useMemo(() => {
    if (!texture) return new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.3 })
    return new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.3,
      metalness: 0.15,
    })
  }, [texture])

  return (
    <group ref={rootRef} position={ch.actorPosition}>
      {/* Plinth Stage tilted 24° towards camera for natural perspective */}
      <group position={[0, -0.2, 0]} rotation={[0.42, 0, 0]}>
        {/* 1. Lathed Brushed Aluminum Plinth Body */}
        <mesh castShadow receiveShadow position={[0, -0.04, 0]}>
          <cylinderGeometry args={[1.2, 1.25, 0.08, 64]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* 2. Plinth Top Surface with Emblem Texture */}
        <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.18, 64]} />
          <primitive object={discMaterial} attach="material" />
        </mesh>

        {/* 3. Glowing Emerald Accent Ring */}
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.96, 1.02, 64]} />
          <meshBasicMaterial color="#22c55e" side={THREE.DoubleSide} />
        </mesh>

        {/* 4. Ready-to-Launch Pristine Origami Plane */}
        <group position={[0, 0.22, 0]} rotation={[-0.15, -0.35, 0.05]}>
          <OrigamiPlane scale={0.7} />
        </group>
      </group>
    </group>
  )
}
