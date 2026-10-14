'use client'

import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { scrollState, chapterProgress, clamp01 } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'

interface ComposerProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  opacity?: number
}

/**
 * Apple Mail / Linear-grade 3D Email Composer Window.
 * 100% Zero React Re-render architecture:
 * - Dynamic Canvas texture updates directly in useFrame when typing step changes
 * - Proportional pill Send button with mechanical depression
 * - Sleek floating "✓ Dispatched via Gmail API" pill toast
 */
export default function Composer({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  opacity = 1,
}: ComposerProps) {
  const rootRef = useRef<THREE.Group>(null)
  const sendButtonRef = useRef<THREE.Group>(null)
  const toastRef = useRef<THREE.Group>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const textureRef = useRef<THREE.CanvasTexture | null>(null)
  const toastCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const toastTextureRef = useRef<THREE.CanvasTexture | null>(null)
  const lastDrawnStepRef = useRef<number>(-1)

  const width = 2.25
  const height = 1.52
  const depth = 0.05

  const ch = CHAPTERS[3]

  // 1. Dynamic Canvas Texture for Email Content
  const { canvas, texture } = useMemo(() => {
    if (typeof document === 'undefined') {
      return { canvas: null, texture: null }
    }
    const c = document.createElement('canvas')
    c.width = 1024
    c.height = 700
    const tex = new THREE.CanvasTexture(c)
    tex.generateMipmaps = true
    tex.minFilter = THREE.LinearMipmapLinearFilter
    canvasRef.current = c
    textureRef.current = tex
    return { canvas: c, texture: tex }
  }, [])

  // 2. Toast Canvas Texture (512x128)
  const { toastCanvas, toastTexture } = useMemo(() => {
    if (typeof document === 'undefined') {
      return { toastCanvas: null, toastTexture: null }
    }
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 120
    const tex = new THREE.CanvasTexture(c)
    tex.generateMipmaps = true
    tex.minFilter = THREE.LinearMipmapLinearFilter

    const ctx = c.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#09090b'
      ctx.beginPath()
      ctx.roundRect(8, 8, c.width - 16, c.height - 16, 24)
      ctx.fill()
      ctx.strokeStyle = '#22c55e'
      ctx.lineWidth = 3
      ctx.stroke()

      // Emerald Check Circle
      ctx.fillStyle = '#22c55e'
      ctx.beginPath()
      ctx.arc(58, 60, 20, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#ffffff'
      ctx.font = '800 22px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('✓', 58, 60)

      // Text
      ctx.textAlign = 'left'
      ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      ctx.fillStyle = '#ffffff'
      ctx.fillText('Dispatched via Gmail API', 96, 52)

      ctx.font = '500 18px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.fillStyle = '#4ade80'
      ctx.fillText('Tracking replies & follow-up sequence', 96, 80)

      tex.needsUpdate = true
    }

    toastCanvasRef.current = c
    toastTextureRef.current = tex
    return { toastCanvas: c, toastTexture: tex }
  }, [])

  // Pure canvas draw function called only when visible step changes
  const drawEmailUI = (visibleLineCount: number) => {
    if (!canvas || !texture) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height

    // Background: Crisp bright card
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, w, h)

    // Top Header / Chrome
    ctx.fillStyle = '#f8fafc'
    ctx.fillRect(0, 0, w, 84)
    ctx.strokeStyle = '#e2e8f0'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, 84)
    ctx.lineTo(w, 84)
    ctx.stroke()

    // Mac Traffic Light Dots
    const dots = [
      { x: 38, color: '#ef4444' },
      { x: 62, color: '#f59e0b' },
      { x: 86, color: '#10b981' },
    ]
    dots.forEach((dot) => {
      ctx.beginPath()
      ctx.arc(dot.x, 42, 6.5, 0, Math.PI * 2)
      ctx.fillStyle = dot.color
      ctx.fill()
    })

    // Header Title
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    ctx.fillStyle = '#475569'
    ctx.textAlign = 'center'
    ctx.fillText('New Message · Gmail API Integration', w / 2 - 40, 49)

    // Recipient "To:" Row
    ctx.textAlign = 'left'
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    ctx.fillStyle = '#64748b'
    ctx.fillText('To:', 38, 128)

    // Recipient Pill: Sarah Chen (Stripe)
    ctx.fillStyle = '#f1f5f9'
    ctx.beginPath()
    ctx.roundRect(85, 104, 380, 40, 20)
    ctx.fill()
    ctx.strokeStyle = '#cbd5e1'
    ctx.lineWidth = 1.5
    ctx.stroke()

    // Avatar Circle inside Pill
    ctx.fillStyle = '#16a34a'
    ctx.beginPath()
    ctx.arc(107, 124, 12, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.font = '700 13px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('SC', 107, 129)

    // Recipient Name & Address
    ctx.textAlign = 'left'
    ctx.font = '700 18px -apple-system, BlinkMacSystemFont, sans-serif'
    ctx.fillStyle = '#0f172a'
    ctx.fillText('Sarah Chen', 128, 129)
    ctx.font = '400 16px -apple-system, BlinkMacSystemFont, sans-serif'
    ctx.fillStyle = '#64748b'
    ctx.fillText('<sarah.chen@stripe.com>', 228, 129)

    // Match Badge inside Pill
    ctx.fillStyle = '#dcfce7'
    ctx.beginPath()
    ctx.roundRect(478, 108, 134, 32, 8)
    ctx.fill()
    ctx.font = '700 14px -apple-system, BlinkMacSystemFont, sans-serif'
    ctx.fillStyle = '#15803d'
    ctx.fillText('✓ 99% MATCH', 492, 130)

    // Separator line
    ctx.strokeStyle = '#e2e8f0'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(38, 158)
    ctx.lineTo(w - 38, 158)
    ctx.stroke()

    // Subject Row
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, sans-serif'
    ctx.fillStyle = '#64748b'
    ctx.fillText('Subject:', 38, 196)

    ctx.font = '700 21px -apple-system, BlinkMacSystemFont, sans-serif'
    ctx.fillStyle = '#0f172a'
    ctx.fillText('Staff AI Infrastructure · Quick note', 130, 196)

    // Separator line
    ctx.strokeStyle = '#cbd5e1'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(38, 222)
    ctx.lineTo(w - 38, 222)
    ctx.stroke()

    // Email Body Lines - progressively revealed with high contrast
    const lines = [
      { text: 'Hi Sarah,', highlight: null },
      { text: 'Noticed your team is scaling distributed model training clusters at Stripe.', highlight: null },
      {
        text: 'In my previous role as Staff Tech Lead, I cut GPU training latency by 12x',
        highlight: { x: 440, w: 265 },
      },
      {
        text: 'across 512 H100 nodes and eliminated memory pipeline stalls.',
        highlight: { x: 96, w: 145 },
      },
      { text: 'Would love to share a 3-bullet breakdown if you have 5 minutes this week.', highlight: null },
      { text: 'Best, Alex', highlight: null },
    ]

    let startY = 278
    const lineHeight = 46

    for (let i = 0; i < visibleLineCount; i++) {
      const line = lines[i]

      // Draw emerald highlight pill behind key achievements
      if (line.highlight && visibleLineCount >= 4) {
        ctx.fillStyle = 'rgba(34, 197, 94, 0.22)'
        ctx.beginPath()
        ctx.roundRect(line.highlight.x, startY - 28, line.highlight.w, 36, 6)
        ctx.fill()
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.5)'
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      ctx.font = i === 0 || i === 5 ? '600 22px -apple-system, BlinkMacSystemFont, sans-serif' : '400 22px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.fillStyle = '#0f172a'
      ctx.fillText(line.text, 38, startY)
      startY += lineHeight
    }

    texture.needsUpdate = true
  }

  useFrame(() => {
    const localP = chapterProgress(ch.range)

    // 1. Calculate typing step directly from local progress (0 to 6 lines)
    const typingFraction = clamp01(localP / 0.48)
    const lineStep = Math.min(6, Math.floor(typingFraction * 7))

    if (lineStep !== lastDrawnStepRef.current) {
      lastDrawnStepRef.current = lineStep
      drawEmailUI(lineStep)
    }

    // 2. Proportional Send Button mechanical depression
    if (sendButtonRef.current) {
      const sendT = clamp01((localP - 0.52) / 0.22)
      const depressZ = sendT > 0 ? Math.min(0.015, sendT * 0.02) : 0
      sendButtonRef.current.position.z = 0.035 - depressZ
    }

    // 3. Floating Toast reveal
    if (toastRef.current) {
      const isSent = localP > 0.65
      toastRef.current.visible = isSent
      if (isSent) {
        const toastT = clamp01((localP - 0.65) / 0.2)
        toastRef.current.position.y = -height / 2 - 0.18 - (1 - toastT) * 0.08
        toastRef.current.scale.setScalar(0.92 + toastT * 0.08)
      }
    }
  })

  const faceMaterial = useMemo(() => {
    if (!texture) {
      return new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.2 })
    }
    return new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.2,
      metalness: 0.02,
      transparent: opacity < 0.99,
      opacity,
    })
  }, [texture, opacity])

  const toastMat = useMemo(() => {
    if (!toastTexture) return new THREE.MeshBasicMaterial({ color: '#09090b' })
    return new THREE.MeshBasicMaterial({ map: toastTexture })
  }, [toastTexture])

  return (
    <group ref={rootRef} position={position} rotation={rotation} scale={scale}>
      {/* 1. Anodized Aluminum Chassis (Unibody Frame) */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color="#d4d4d8"
          metalness={0.9}
          roughness={0.2}
          transparent={opacity < 0.99}
          opacity={opacity}
        />
      </mesh>

      {/* 2. Front Screen Face with Dynamic Canvas */}
      <mesh position={[0, 0, depth / 2 + 0.002]}>
        <planeGeometry args={[width - 0.04, height - 0.04]} />
        <primitive object={faceMaterial} attach="material" />
      </mesh>

      {/* 3. Refined Proportional Send Button (Top Right Header) */}
      <group ref={sendButtonRef} position={[width / 2 - 0.26, height / 2 - 0.09, 0.035]}>
        <mesh castShadow>
          <boxGeometry args={[0.34, 0.14, 0.02]} />
          <meshStandardMaterial color="#16a34a" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Send Label Plane */}
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[0.26, 0.09]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* 4. Dispatched Confirmation Floating Toast */}
      <group ref={toastRef} position={[0, -height / 2 - 0.18, 0.08]} visible={false}>
        <mesh castShadow>
          <planeGeometry args={[1.65, 0.38]} />
          <primitive object={toastMat} attach="material" />
        </mesh>
      </group>
    </group>
  )
}
