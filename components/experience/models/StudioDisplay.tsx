'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { makeCanvasTexture } from '@/lib/three-utils'

interface StudioDisplayProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  recruiterName: string
  recruiterCompany: string
  recruiterRole: string
  recruiterEmail: string
  confidenceScore: string
  isTargetLocked?: boolean
  laserProgress?: number // [0, 1] vertical laser sweep
  opacity?: number
}

/**
 * Apple Studio Display-grade Workstation Monitor.
 * Anodized aluminum unibody, cantilever stand with cable cutout,
 * and high-contrast candidate target-lock profile with emerald laser sweep.
 */
export default function StudioDisplay({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  recruiterName,
  recruiterCompany,
  recruiterRole,
  recruiterEmail,
  confidenceScore,
  isTargetLocked = false,
  laserProgress = 0,
  opacity = 1,
}: StudioDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const textureRef = useRef<THREE.CanvasTexture | null>(null)

  // 1. Screen Dimensions
  const screenWidth = 1.74
  const screenHeight = 1.1
  const chassisWidth = 1.84
  const chassisHeight = 1.2
  const chassisDepth = 0.05

  // 2. Dynamic Canvas Texture for Screen Content
  const { canvas, texture } = useMemo(() => {
    if (typeof document === 'undefined') {
      return { canvas: null, texture: null }
    }
    const c = document.createElement('canvas')
    c.width = 1024
    c.height = 640
    const tex = makeCanvasTexture(c, 8)
    canvasRef.current = c
    textureRef.current = tex
    return { canvas: c, texture: tex }
  }, [])

  // Draw Screen UI (High contrast: white/emerald on #0f172a, all text >= 22px)
  useEffect(() => {
    if (!canvas || !texture) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height

    // Screen base (Deep navy #0f172a anti-glare glass)
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, w, h)

    // Window chrome / top bar
    ctx.fillStyle = '#1e293b'
    ctx.fillRect(0, 0, w, 56)

    // Window traffic lights
    const colors = ['#ef4444', '#f59e0b', '#10b981']
    colors.forEach((col, idx) => {
      ctx.beginPath()
      ctx.arc(38 + idx * 24, 28, 6.5, 0, Math.PI * 2)
      ctx.fillStyle = col
      ctx.fill()
    })

    // Window Title (>= 20px)
    ctx.fillStyle = '#94a3b8'
    ctx.font = '700 20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.fillText(`${recruiterCompany.toUpperCase()} · VERIFIED RECRUITER`, 126, 35)

    // Recruiter Card
    ctx.fillStyle = '#1e293b'
    ctx.beginPath()
    ctx.roundRect(36, 76, w - 72, h - 108, 16)
    ctx.fill()
    ctx.strokeStyle = isTargetLocked ? '#22c55e' : '#334155'
    ctx.lineWidth = isTargetLocked ? 3.5 : 1.5
    ctx.stroke()

    // Avatar Circle
    ctx.beginPath()
    ctx.arc(115, 175, 48, 0, Math.PI * 2)
    ctx.fillStyle = isTargetLocked ? '#14532d' : '#334155'
    ctx.fill()
    ctx.strokeStyle = isTargetLocked ? '#22c55e' : '#475569'
    ctx.lineWidth = 2.5
    ctx.stroke()

    ctx.fillStyle = isTargetLocked ? '#4ade80' : '#ffffff'
    ctx.font = '800 36px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(recruiterName.charAt(0), 115, 175)

    // Name (>= 36px) & Role (>= 24px)
    ctx.textAlign = 'left'
    ctx.textBaseline = 'alphabetic'
    ctx.fillStyle = '#ffffff'
    ctx.font = '800 38px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.fillText(recruiterName, 188, 165)

    ctx.fillStyle = '#cbd5e1'
    ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.fillText(`${recruiterRole} @ ${recruiterCompany}`, 188, 204)

    // Recruiter Email Pill
    ctx.fillStyle = '#0f172a'
    ctx.beginPath()
    ctx.roundRect(72, 260, w - 144, 76, 14)
    ctx.fill()
    ctx.strokeStyle = '#334155'
    ctx.lineWidth = 1.5
    ctx.stroke()

    ctx.fillStyle = '#38bdf8'
    ctx.font = '700 26px -apple-system, BlinkMacSystemFont, monospace'
    ctx.fillText(recruiterEmail, 98, 308)

    // Verified Confidence Badge (>= 24px)
    const badgeY = 372
    ctx.fillStyle = isTargetLocked ? '#14532d' : '#1e293b'
    ctx.beginPath()
    ctx.roundRect(72, badgeY, 360, 68, 34)
    ctx.fill()
    ctx.strokeStyle = isTargetLocked ? '#22c55e' : '#475569'
    ctx.lineWidth = 2.5
    ctx.stroke()

    ctx.fillStyle = isTargetLocked ? '#4ade80' : '#94a3b8'
    ctx.font = '800 24px -apple-system, BlinkMacSystemFont, monospace'
    ctx.fillText(`✓ ${confidenceScore} CONFIDENCE`, 108, badgeY + 42)

    // Laser Sweep overlay effect
    if (laserProgress > 0.01 && laserProgress < 0.99) {
      const scanY = h * laserProgress
      ctx.save()

      const grad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 10)
      grad.addColorStop(0, 'rgba(34, 197, 94, 0)')
      grad.addColorStop(0.8, 'rgba(34, 197, 94, 0.35)')
      grad.addColorStop(1, 'rgba(34, 197, 94, 0.9)')

      ctx.fillStyle = grad
      ctx.fillRect(0, scanY - 30, w, 40)

      ctx.strokeStyle = '#4ade80'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(0, scanY)
      ctx.lineTo(w, scanY)
      ctx.stroke()

      ctx.restore()
    }

    texture.needsUpdate = true
  }, [
    canvas,
    texture,
    recruiterName,
    recruiterCompany,
    recruiterRole,
    recruiterEmail,
    confidenceScore,
    isTargetLocked,
    laserProgress,
  ])

  // Anodized Aluminum Materials
  const aluminumMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3f3f46',
        metalness: 0.88,
        roughness: 0.22,
        transparent: opacity < 0.99,
        opacity,
      }),
    [opacity]
  )

  const standMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#52525b',
        metalness: 0.85,
        roughness: 0.28,
        transparent: opacity < 0.99,
        opacity,
      }),
    [opacity]
  )

  // Unshaded high-contrast screen material
  const screenMaterial = useMemo(() => {
    if (!texture) {
      return new THREE.MeshBasicMaterial({ color: '#0f172a', toneMapped: false })
    }
    return new THREE.MeshBasicMaterial({
      map: texture,
      toneMapped: false,
    })
  }, [texture])

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* 1. Aluminum Chassis */}
      <mesh material={aluminumMaterial} castShadow receiveShadow>
        <boxGeometry args={[chassisWidth, chassisHeight, chassisDepth]} />
      </mesh>

      {/* 2. High-Contrast Screen Face */}
      <mesh position={[0, 0, chassisDepth / 2 + 0.005]} material={screenMaterial}>
        <planeGeometry args={[screenWidth, screenHeight]} />
      </mesh>

      {/* 3. Aluminum Cantilever Stand with Cable Pass-through */}
      <group position={[0, -chassisHeight / 2 - 0.22, -0.06]}>
        {/* Vertical Upright */}
        <mesh position={[0, 0.12, 0]} material={standMaterial} castShadow>
          <boxGeometry args={[0.22, 0.32, 0.04]} />
        </mesh>

        {/* Cable Pass-through Hole Ring */}
        <mesh position={[0, 0.12, 0.021]}>
          <ringGeometry args={[0.045, 0.065, 32]} />
          <meshBasicMaterial color="#18181b" />
        </mesh>

        {/* Base Foot (Chamfered Oval / Box) */}
        <mesh position={[0, -0.04, 0.12]} material={standMaterial} castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.03, 0.38]} />
        </mesh>
      </group>
    </group>
  )
}
