'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

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
 * and dynamic candidate target-lock profile with emerald laser sweep.
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
  const screenWidth = 1.72
  const screenHeight = 1.08
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
    const tex = new THREE.CanvasTexture(c)
    tex.generateMipmaps = true
    tex.minFilter = THREE.LinearMipmapLinearFilter
    canvasRef.current = c
    textureRef.current = tex
    return { canvas: c, texture: tex }
  }, [])

  // Draw Screen UI
  useEffect(() => {
    if (!canvas || !texture) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height

    // Screen base (Dark obsidian anti-glare glass)
    ctx.fillStyle = '#09090b'
    ctx.fillRect(0, 0, w, h)

    // Window chrome / top bar
    ctx.fillStyle = '#18181b'
    ctx.fillRect(0, 0, w, 52)

    // Window traffic lights
    const colors = ['#ef4444', '#f59e0b', '#10b981']
    colors.forEach((col, idx) => {
      ctx.beginPath()
      ctx.arc(36 + idx * 24, 26, 6, 0, Math.PI * 2)
      ctx.fillStyle = col
      ctx.fill()
    })

    // Window Title
    ctx.fillStyle = '#71717a'
    ctx.font = '500 16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.fillText(`${recruiterCompany.toUpperCase()} · TALENT INTELLIGENCE`, 120, 32)

    // Recruiter Card
    ctx.fillStyle = '#121215'
    ctx.beginPath()
    ctx.roundRect(40, 80, w - 80, h - 120, 16)
    ctx.fill()
    ctx.strokeStyle = isTargetLocked ? '#16a34a' : '#27272a'
    ctx.lineWidth = isTargetLocked ? 3 : 1
    ctx.stroke()

    // Avatar Placeholder Circle
    ctx.beginPath()
    ctx.arc(120, 180, 50, 0, Math.PI * 2)
    ctx.fillStyle = '#27272a'
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.font = '700 36px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(recruiterName.charAt(0), 120, 180)

    // Name & Role
    ctx.textAlign = 'left'
    ctx.textBaseline = 'alphabetic'
    ctx.fillStyle = '#ffffff'
    ctx.font = '700 32px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.fillText(recruiterName, 200, 165)

    ctx.fillStyle = '#a1a1aa'
    ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.fillText(`${recruiterRole} @ ${recruiterCompany}`, 200, 200)

    // Recruiter Email Pill
    ctx.fillStyle = '#1c1c22'
    ctx.beginPath()
    ctx.roundRect(80, 270, w - 160, 70, 12)
    ctx.fill()
    ctx.strokeStyle = '#2e2e38'
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.fillStyle = '#71717a'
    ctx.font = '500 16px -apple-system, BlinkMacSystemFont, monospace'
    ctx.fillText('DIRECT EMAIL:', 105, 312)

    ctx.fillStyle = '#38bdf8'
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, monospace'
    ctx.fillText(recruiterEmail, 240, 312)

    // Verified Confidence Badge
    const badgeY = 380
    ctx.fillStyle = isTargetLocked ? '#14532d' : '#1f2937'
    ctx.beginPath()
    ctx.roundRect(80, badgeY, 340, 60, 30)
    ctx.fill()
    ctx.strokeStyle = isTargetLocked ? '#22c55e' : '#374151'
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.fillStyle = isTargetLocked ? '#4ade80' : '#9ca3af'
    ctx.font = '700 18px -apple-system, BlinkMacSystemFont, monospace'
    ctx.fillText(`✓ ${confidenceScore} CONFIDENCE`, 110, badgeY + 38)

    // Laser Sweep overlay effect
    if (laserProgress > 0.01 && laserProgress < 0.99) {
      const scanY = h * laserProgress
      ctx.save()
      const grad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30)
      grad.addColorStop(0, 'rgba(34, 197, 94, 0)')
      grad.addColorStop(0.5, 'rgba(34, 197, 94, 0.45)')
      grad.addColorStop(1, 'rgba(34, 197, 94, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(40, scanY - 30, w - 80, 60)

      // Laser core line
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(40, scanY - 1.5, w - 80, 3)
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

  // Aluminum Unibody Material
  const aluminumMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2d3035',
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
        color: '#63666f',
        metalness: 0.85,
        roughness: 0.3,
        transparent: opacity < 0.99,
        opacity,
      }),
    [opacity]
  )

  const screenMaterial = useMemo(() => {
    if (!texture) {
      return new THREE.MeshStandardMaterial({ color: '#09090b', roughness: 0.1 })
    }
    return new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.12,
      metalness: 0.05,
      transparent: opacity < 0.99,
      opacity,
    })
  }, [texture, opacity])

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* 1. Aluminum Chassis */}
      <mesh material={aluminumMaterial} castShadow receiveShadow>
        <boxGeometry args={[chassisWidth, chassisHeight, chassisDepth]} />
      </mesh>

      {/* 2. Glass Anti-glare Screen */}
      <mesh position={[0, 0, chassisDepth / 2 + 0.005]} material={screenMaterial}>
        <planeGeometry args={[screenWidth, screenHeight]} />
      </mesh>

      {/* 3. Cantilever Stand Arm with Cable Cutout */}
      <group position={[0, -chassisHeight / 2 - 0.22, -0.08]}>
        <mesh material={standMaterial} castShadow>
          <boxGeometry args={[0.22, 0.45, 0.04]} />
        </mesh>
        {/* Cable Cutout Hole Accent */}
        <mesh position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.045, 16]} />
          <meshStandardMaterial color="#1f2937" roughness={0.5} />
        </mesh>
      </group>

      {/* 4. Desktop Base Plate */}
      <mesh position={[0, -chassisHeight / 2 - 0.44, -0.04]} material={standMaterial} receiveShadow>
        <boxGeometry args={[0.55, 0.02, 0.42]} />
      </mesh>
    </group>
  )
}
