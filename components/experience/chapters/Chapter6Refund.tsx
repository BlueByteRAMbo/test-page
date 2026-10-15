'use client'

import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { scrollState, chapterProgress, clamp01 } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'
import { makeCanvasTexture } from '@/lib/three-utils'
import Coin from '../models/Coin'
import Vault from '../models/Vault'

/**
 * Chapter 6: Bounce Shield & Credit Refund
 * Range: [0.74, 0.88]
 * - Bounced recruiter terminal flags 550 5.1.1 error (balanced on right half)
 * - Minted 3D physical gold coin launches in 720° parabolic arc
 * - Deposits into Executive Vault slot; OLED increments to 51 CREDITS
 */
export default function Chapter6Refund() {
  const rootRef = useRef<THREE.Group>(null)
  const coinGroupRef = useRef<THREE.Group>(null)
  const bounceScreenRef = useRef<THREE.Group>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const textureRef = useRef<THREE.CanvasTexture | null>(null)

  const ch = CHAPTERS[5]

  // Dynamic Bounced Terminal Texture (512x320)
  const { canvas, texture } = useMemo(() => {
    if (typeof document === 'undefined') {
      return { canvas: null, texture: null }
    }
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 320
    const tex = makeCanvasTexture(c, 8)
    canvasRef.current = c
    textureRef.current = tex

    const ctx = c.getContext('2d')
    if (ctx) {
      // Dark Terminal Card
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, c.width, c.height)
      ctx.strokeStyle = '#ef4444'
      ctx.lineWidth = 3
      ctx.strokeRect(4, 4, c.width - 8, c.height - 8)

      // Header Bar
      ctx.fillStyle = '#1e293b'
      ctx.fillRect(4, 4, c.width - 8, 48)

      ctx.fillStyle = '#ef4444'
      ctx.beginPath()
      ctx.arc(24, 28, 6, 0, Math.PI * 2)
      ctx.fill()

      ctx.font = '700 20px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'left'
      ctx.fillText('DELIVERY FAILURE DETECTED', 42, 35)

      // Details
      ctx.font = '700 22px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.fillStyle = '#ffffff'
      ctx.fillText('Alex Morgan · Scale AI', 24, 92)

      ctx.font = '500 20px monospace'
      ctx.fillStyle = '#cbd5e1'
      ctx.fillText('alex.morgan@scale.com', 24, 124)

      // Error Code Badge (high contrast >= 4.5:1)
      ctx.fillStyle = '#450a0a'
      ctx.beginPath()
      ctx.roundRect(24, 146, 380, 42, 8)
      ctx.fill()
      ctx.strokeStyle = '#ef4444'
      ctx.lineWidth = 1.5
      ctx.stroke()

      ctx.font = '700 20px monospace'
      ctx.fillStyle = '#fecaca'
      ctx.fillText('SMTP 550 5.1.1: Mailbox Unknown', 38, 174)

      // Shield Action
      ctx.fillStyle = '#064e3b'
      ctx.beginPath()
      ctx.roundRect(24, 215, 420, 50, 8)
      ctx.fill()
      ctx.strokeStyle = '#10b981'
      ctx.lineWidth = 1.5
      ctx.stroke()

      ctx.font = '700 20px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.fillStyle = '#a7f3d0'
      ctx.fillText('🛡️ BOUNCE SHIELD: +1 CREDIT RECOVERY', 38, 247)

      tex.needsUpdate = true
    }

    return { canvas: c, texture: tex }
  }, [])

  useFrame(() => {
    if (!rootRef.current) return
    const p = scrollState.progress
    const enter = clamp01((p - 0.72) / 0.04)
    const exit = clamp01((p - 0.88) / 0.03)
    const activeWeight = enter * (1 - exit)

    rootRef.current.visible = activeWeight > 0.01
    if (!rootRef.current.visible) return

    const localP = chapterProgress(ch.range)

    // Subtle scale breathing
    rootRef.current.scale.setScalar(0.92 + activeWeight * 0.08)

    // Parabolic arc for 3D Gold Coin
    if (coinGroupRef.current) {
      if (localP < 0.16) {
        // Resting on the bounced terminal
        coinGroupRef.current.visible = true
        coinGroupRef.current.position.set(-0.35, 0.15, 0.1)
        coinGroupRef.current.rotation.set(0, 0, 0)
        coinGroupRef.current.scale.setScalar(clamp01(localP / 0.15))
      } else if (localP <= 0.72) {
        // Parabolic trajectory towards vault slot at [0.78, 0.65, 0.0]
        coinGroupRef.current.visible = true
        const arcT = (localP - 0.16) / 0.56
        const sx = -0.35
        const ex = 0.78
        const currentX = sx + (ex - sx) * arcT
        const currentY = 0.15 + (0.65 - 0.15) * arcT + Math.sin(arcT * Math.PI) * 0.55
        const currentZ = 0.1 * (1 - arcT)

        coinGroupRef.current.position.set(currentX, currentY, currentZ)
        coinGroupRef.current.rotation.set(arcT * Math.PI * 4, arcT * Math.PI * 6, 0)
        coinGroupRef.current.scale.setScalar(0.9)
      } else {
        // Coin cleanly deposited inside the vault
        coinGroupRef.current.visible = false
      }
    }
  })

  const bounceMat = useMemo(() => {
    if (!texture) return new THREE.MeshBasicMaterial({ color: '#0f172a', toneMapped: false })
    return new THREE.MeshBasicMaterial({ map: texture, toneMapped: false })
  }, [texture])

  return (
    <group ref={rootRef} position={ch.actorPosition}>
      {/* 1. Bounced Recruiter Notification Monitor (Shifted right to avoid text overlap) */}
      <group ref={bounceScreenRef} position={[-0.35, 0.05, 0]} scale={0.75}>
        {/* Chassis */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.35, 0.95, 0.05]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Screen Surface */}
        <mesh position={[0, 0, 0.027]}>
          <planeGeometry args={[1.28, 0.88]} />
          <primitive object={bounceMat} attach="material" />
        </mesh>
      </group>

      {/* 2. Parabolic 3D Gold Credit Coin */}
      <group ref={coinGroupRef} position={[-0.35, 0.15, 0.1]}>
        <Coin scale={0.85} />
      </group>

      {/* 3. Obsidian & Platinum Executive Vault (Right) */}
      <group position={[0.78, 0, 0]}>
        <Vault scale={0.85} />
      </group>
    </group>
  )
}
