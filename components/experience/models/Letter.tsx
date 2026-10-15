'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { scrollState, clamp01 } from '@/lib/scroll-store'

import { makeCanvasTexture } from '@/lib/three-utils'

interface LetterProps {
  opacity?: number
}

// Helper to create a plane geometry with sliced UVs so the canvas texture
// flows continuously across the 3 hinged panels
function createPanelGeometry(width: number, height: number, vMin: number, vMax: number) {
  const geo = new THREE.PlaneGeometry(width, height)
  // Three.js PlaneGeometry vertex order:
  // 0: top-left (-x, +y), 1: top-right (+x, +y), 2: bottom-left (-x, -y), 3: bottom-right (+x, -y)
  const uvs = new Float32Array([
    0, vMax,
    1, vMax,
    0, vMin,
    1, vMin,
  ])
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
  return geo
}

export default function Letter({ opacity = 1 }: LetterProps) {
  const rootRef = useRef<THREE.Group>(null)
  const topPanelRef = useRef<THREE.Group>(null)
  const bottomPanelRef = useRef<THREE.Group>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const textureRef = useRef<THREE.CanvasTexture | null>(null)
  const lastDrawnStepRef = useRef<number>(-1)

  const panelWidth = 1.55
  const panelHeight = 0.64

  // Geometries with sliced UVs
  const topGeometry = useMemo(() => createPanelGeometry(panelWidth, panelHeight, 0.666, 1.0), [])
  const midGeometry = useMemo(() => createPanelGeometry(panelWidth, panelHeight, 0.333, 0.666), [])
  const botGeometry = useMemo(() => createPanelGeometry(panelWidth, panelHeight, 0.0, 0.333), [])

  // Create High-Res Canvas and CanvasTexture with explicit sRGB tagging
  const { canvas, texture } = useMemo(() => {
    if (typeof document === 'undefined') {
      return { canvas: null, texture: null }
    }
    const c = document.createElement('canvas')
    c.width = 1024
    c.height = 1260
    const tex = makeCanvasTexture(c, 8)
    canvasRef.current = c
    textureRef.current = tex
    return { canvas: c, texture: tex }
  }, [])

  // Draw continuous document onto canvas texture
  const drawCanvas = (checkProgress: number) => {
    if (!canvas || !texture) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height

    // 1. Pristine cardstock background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, w, h)

    // Subtle hairline grid texture
    ctx.strokeStyle = '#f4f4f2'
    ctx.lineWidth = 1
    for (let y = 35; y < h; y += 35) {
      ctx.beginPath()
      ctx.moveTo(35, y)
      ctx.lineTo(w - 35, y)
      ctx.stroke()
    }

    // -------------------------------------------------------------
    // TOP PANEL REGION (Y: 0 .. 420)
    // -------------------------------------------------------------
    ctx.fillStyle = '#111111'
    ctx.font = '700 36px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.fillText('SARAH CHEN', 70, 95)

    ctx.fillStyle = '#16a34a'
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", monospace'
    ctx.fillText('● EEXTRAMILE AI · VERIFIED CANDIDATE', 70, 140)

    ctx.fillStyle = '#626660'
    ctx.font = '400 24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.fillText('Staff Frontend Engineer · Scalable Systems & WebGL', 70, 190)

    // Subtle divider
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(70, 230)
    ctx.lineTo(w - 70, 230)
    ctx.stroke()

    // Milestone 1 (Top panel)
    drawMilestone(ctx, 0, 'Frontend Lead with 3+ years scaling high-traffic apps', 310, checkProgress, w)

    // -------------------------------------------------------------
    // MIDDLE PANEL REGION (Y: 420 .. 840)
    // -------------------------------------------------------------
    // Milestone 2
    drawMilestone(ctx, 1, 'Built & deployed 2 major production systems with real-time sync', 490, checkProgress, w)

    // Milestone 3
    drawMilestone(ctx, 2, 'Open to relocation and remote engineering leadership worldwide', 650, checkProgress, w)

    // -------------------------------------------------------------
    // BOTTOM PANEL REGION (Y: 840 .. 1260)
    // -------------------------------------------------------------
    // Milestone 4
    drawMilestone(ctx, 3, 'AI/ML tooling & intuitive developer platforms', 910, checkProgress, w)

    // Verified Stamp Badge (Bottom Panel)
    if (checkProgress >= 3.6) {
      const stampProgress = Math.min(1, (checkProgress - 3.6) / 0.4)
      const stampY = 1110

      ctx.save()
      ctx.translate(w / 2, stampY)
      const scale = 0.85 + 0.15 * stampProgress
      ctx.scale(scale, scale)

      // Emerald badge container
      ctx.fillStyle = '#16a34a'
      ctx.beginPath()
      ctx.roundRect(-260, -45, 520, 90, 45)
      ctx.fill()

      // White verified text
      ctx.fillStyle = '#ffffff'
      ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('✓ 99% CONFIDENCE VERIFIED', 0, 0)
      ctx.restore()
    }

    texture.needsUpdate = true
  }

  // Draw milestone row helper
  function drawMilestone(
    ctx: CanvasRenderingContext2D,
    index: number,
    text: string,
    rowY: number,
    checkProgress: number,
    w: number
  ) {
    const isChecked = checkProgress >= index + 0.5
    const isPartiallyChecking = checkProgress > index && checkProgress < index + 0.5

    // Active 4th milestone card highlight
    if (index === 3 && checkProgress >= 3.2) {
      ctx.fillStyle = '#ecfdf5'
      ctx.beginPath()
      ctx.roundRect(55, rowY - 45, w - 110, 100, 16)
      ctx.fill()
      ctx.strokeStyle = '#86efac'
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // Checkbox circle
    const circleX = 100
    const circleY = rowY + 5
    const radius = 22

    ctx.beginPath()
    ctx.arc(circleX, circleY, radius, 0, Math.PI * 2)

    if (isChecked) {
      ctx.fillStyle = '#16a34a'
      ctx.fill()

      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 4
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.beginPath()
      ctx.moveTo(circleX - 9, circleY)
      ctx.lineTo(circleX - 2, circleY + 7)
      ctx.lineTo(circleX + 10, circleY - 6)
      ctx.stroke()
    } else if (isPartiallyChecking) {
      ctx.fillStyle = '#dcfce7'
      ctx.fill()
      ctx.strokeStyle = '#16a34a'
      ctx.lineWidth = 2.5
      ctx.stroke()
    } else {
      ctx.fillStyle = '#f3f4f6'
      ctx.fill()
      ctx.strokeStyle = '#d1d5db'
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // Label (Enlarged and bold for screen legibility >= 12px)
    ctx.fillStyle = isChecked ? '#0f172a' : '#334155'
    ctx.font = isChecked
      ? '700 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      : '600 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'alphabetic'
    ctx.fillText(text, 150, rowY + 14)
  }

  // Initial draw
  useEffect(() => {
    drawCanvas(0)
  }, [canvas, texture])

  // 60fps useFrame loop
  useFrame(() => {
    if (!rootRef.current || !topPanelRef.current || !bottomPanelRef.current) return
    const p = scrollState.progress

    const isVisible = p >= 0.12 && p <= 0.35
    rootRef.current.visible = isVisible

    if (!isVisible) return

    // 1. Emergence: slides up out of envelope pocket and steps forward into full view
    const emergeT = clamp01((p - 0.13) / 0.05)
    const retreatT = clamp01((p - 0.28) / 0.04)
    const netEmerge = clamp01(emergeT - retreatT)

    const slideY = netEmerge * 1.25
    const slideZ = netEmerge > 0.4 ? 0.08 : 0.02
    rootRef.current.position.set(0, slideY, slideZ)

    // 2. Unfolding along crease joints
    const unfoldT = clamp01((p - 0.16) / 0.05)
    const refoldT = clamp01((p - 0.27) / 0.03)
    const foldProgress = clamp01(1 - unfoldT + refoldT)
    const foldAngle = foldProgress * Math.PI * 0.98

    topPanelRef.current.rotation.x = -foldAngle
    bottomPanelRef.current.rotation.x = foldAngle

    // 3. Milestones check calculation
    const checkT = clamp01((p - 0.19) / 0.08)
    const checkProgress = checkT * 4
    const checkStep = Math.floor(checkProgress * 2)

    if (checkStep !== lastDrawnStepRef.current) {
      lastDrawnStepRef.current = checkStep
      drawCanvas(checkProgress)
    }
  })

  const paperMat = useMemo(() => {
    if (!texture) {
      return new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.8 })
    }
    return new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.85,
      metalness: 0.02,
      side: THREE.DoubleSide,
      transparent: false,
      depthWrite: true,
    })
  }, [texture])

  return (
    <group ref={rootRef} position={[0, 0, 0.005]}>
      {/* 1. Middle Panel (Displays middle third: Milestones 2 & 3) */}
      <mesh geometry={midGeometry} material={paperMat} castShadow receiveShadow />

      {/* 2. Top Panel (Hinged at top edge, displays Sarah Chen header & Milestone 1) */}
      <group ref={topPanelRef} position={[0, panelHeight / 2, 0]}>
        <mesh position={[0, panelHeight / 2, 0]} geometry={topGeometry} material={paperMat} castShadow receiveShadow />
      </group>

      {/* 3. Bottom Panel (Hinged at bottom edge, displays Milestone 4 & Verified Stamp) */}
      <group ref={bottomPanelRef} position={[0, -panelHeight / 2, 0]}>
        <mesh position={[0, -panelHeight / 2, 0]} geometry={botGeometry} material={paperMat} castShadow receiveShadow />
      </group>
    </group>
  )
}
