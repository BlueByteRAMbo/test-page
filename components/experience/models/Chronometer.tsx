'use client'

import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { scrollState, chapterProgress, clamp01 } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'
import { makeCanvasTexture } from '@/lib/three-utils'

interface ChronometerProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  opacity?: number
}

/**
 * Swiss Luxury Precision Chronometer (Chapter 5: Smart Follow-ups).
 * - Sized proportionally (radius 0.70) with dark titanium bezel
 * - Concentric Guilloché dial with Day 1–4 cadence quadrants
 * - Legible 3D milestone cards on the right with canvas textures
 */
export default function Chronometer({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  opacity = 1,
}: ChronometerProps) {
  const rootRef = useRef<THREE.Group>(null)
  const hourHandRef = useRef<THREE.Group>(null)
  const minuteHandRef = useRef<THREE.Group>(null)
  const secondHandRef = useRef<THREE.Group>(null)
  const nodeBgsRef = useRef<(THREE.Mesh | null)[]>([])
  const nodeDotsRef = useRef<(THREE.Mesh | null)[]>([])

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const textureRef = useRef<THREE.CanvasTexture | null>(null)

  const ch = CHAPTERS[4]
  const radius = 0.60

  // 1. High-Res Dial Canvas Texture (1024x1024)
  const { canvas, texture } = useMemo(() => {
    if (typeof document === 'undefined') {
      return { canvas: null, texture: null }
    }
    const c = document.createElement('canvas')
    c.width = 1024
    c.height = 1024
    const tex = makeCanvasTexture(c, 8)
    canvasRef.current = c
    textureRef.current = tex

    const ctx = c.getContext('2d')
    if (ctx) {
      const size = c.width
      const center = size / 2
      const dialR = size * 0.46

      ctx.clearRect(0, 0, size, size)
      const bgGrad = ctx.createRadialGradient(center, center, 20, center, center, dialR)
      bgGrad.addColorStop(0, '#1c1917')
      bgGrad.addColorStop(0.7, '#0c0a09')
      bgGrad.addColorStop(1, '#050505')
      ctx.fillStyle = bgGrad
      ctx.beginPath()
      ctx.arc(center, center, dialR, 0, Math.PI * 2)
      ctx.fill()

      // Guilloché concentric rings
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.lineWidth = 1.5
      for (let r = 70; r < dialR - 25; r += 28) {
        ctx.beginPath()
        ctx.arc(center, center, r, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Outer Track Ring
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)'
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.arc(center, center, dialR - 15, 0, Math.PI * 2)
      ctx.stroke()

      // 60 Minute & 12 Hour Ticks
      for (let i = 0; i < 60; i++) {
        const angle = (i * Math.PI) / 30 - Math.PI / 2
        const isHour = i % 5 === 0
        const tickLen = isHour ? 26 : 11
        const rInner = dialR - 18 - tickLen
        const rOuter = dialR - 18

        ctx.strokeStyle = isHour ? '#f5f5f4' : 'rgba(255, 255, 255, 0.35)'
        ctx.lineWidth = isHour ? 4.5 : 1.5
        ctx.beginPath()
        ctx.moveTo(center + Math.cos(angle) * rInner, center + Math.sin(angle) * rInner)
        ctx.lineTo(center + Math.cos(angle) * rOuter, center + Math.sin(angle) * rOuter)
        ctx.stroke()
      }

      // 4 Cadence Number Callouts at Quadrants (Large, bold, prominent)
      const quadrants = [
        { day: '1', label: 'DAY 1', angle: -Math.PI / 2, color: '#22c55e' },
        { day: '2', label: 'DAY 2', angle: 0, color: '#94a3b8' },
        { day: '3', label: 'DAY 3', angle: Math.PI / 2, color: '#f59e0b' },
        { day: '4', label: 'DAY 4', angle: Math.PI, color: '#10b981' },
      ]

      quadrants.forEach((q) => {
        const numR = dialR * 0.62
        const nx = center + Math.cos(q.angle) * numR
        const ny = center + Math.sin(q.angle) * numR

        // Large Quadrant Number (>= 38px)
        ctx.font = '800 40px -apple-system, BlinkMacSystemFont, "Segoe UI", monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = q.color
        ctx.fillText(q.day, nx, ny - 6)

        // Sub-label (>= 18px)
        ctx.font = '700 16px -apple-system, BlinkMacSystemFont, sans-serif'
        ctx.fillStyle = '#a8a29e'
        ctx.fillText(q.label, nx, ny + 20)
      })

      // Center Brand Label (Legible >= 22px)
      ctx.font = '700 22px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#f5f5f4'
      ctx.fillText('4-DAY CADENCE', center, center - 62)

      // Center jewel pivot
      ctx.fillStyle = '#dc2626'
      ctx.beginPath()
      ctx.arc(center, center, 14, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#f59e0b'
      ctx.lineWidth = 3
      ctx.stroke()

      tex.needsUpdate = true
    }

    return { canvas: c, texture: tex }
  }, [])

  // 4-Day Lifecycle Stepper Cards with High-Res Canvas Textures
  const cardTextures = useMemo(() => {
    if (typeof document === 'undefined') return []
    const cards = [
      {
        day: 'DAY 1',
        title: 'Initial Outreach Dispatched',
        subtitle: '✓ Delivered via Gmail · Outreach active',
        badgeBg: '#dcfce7',
        badgeColor: '#15803d',
      },
      {
        day: 'DAY 2',
        title: 'Read & Profile Review',
        subtitle: 'Recruiter opened email · 48h reply grace period',
        badgeBg: '#f1f5f9',
        badgeColor: '#475569',
      },
      {
        day: 'DAY 3',
        title: 'Follow-up Draft Queued',
        subtitle: '⚠️ Review prompt · Click to cancel or edit',
        badgeBg: '#fef3c7',
        badgeColor: '#b45309',
      },
      {
        day: 'DAY 4',
        title: 'Follow-up Auto-Dispatched',
        subtitle: '⚡ No cancel requested → Follow-up auto-sent',
        badgeBg: '#d1fae5',
        badgeColor: '#065f46',
      },
    ]

    return cards.map((c) => {
      const cvs = document.createElement('canvas')
      cvs.width = 1024
      cvs.height = 200
      const ctx = cvs.getContext('2d')
      if (ctx) {
        // Clean white card background with hairline border
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.roundRect(8, 8, cvs.width - 16, cvs.height - 16, 20)
        ctx.fill()
        ctx.strokeStyle = '#e2e8f0'
        ctx.lineWidth = 2.5
        ctx.stroke()

        // Day Pill (Left)
        ctx.fillStyle = c.badgeBg
        ctx.beginPath()
        ctx.roundRect(32, 34, 130, 48, 12)
        ctx.fill()

        ctx.font = '800 22px -apple-system, BlinkMacSystemFont, monospace'
        ctx.fillStyle = c.badgeColor
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(c.day, 97, 58)

        // Title (Bold, high contrast)
        ctx.textAlign = 'left'
        ctx.textBaseline = 'alphabetic'
        ctx.font = '800 32px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
        ctx.fillStyle = '#0f172a'
        ctx.fillText(c.title, 184, 68)

        // Subtitle / Rule (Clear, legible >= 24px)
        ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
        ctx.fillStyle = '#64748b'
        ctx.fillText(c.subtitle, 34, 142)
      }
      return makeCanvasTexture(cvs, 8)
    })
  }, [])

  // Milestone activation thresholds
  const milestoneThresholds = [0.1, 0.35, 0.62, 0.86]

  useFrame(() => {
    const localP = chapterProgress(ch.range)

    // 1. Sweep Hands smoothly across Day 1 to Day 4
    const hourAngle = -localP * Math.PI * 2
    const minuteAngle = -localP * Math.PI * 12
    const secondAngle = -localP * Math.PI * 36

    if (hourHandRef.current) {
      hourHandRef.current.rotation.z = hourAngle
    }
    if (minuteHandRef.current) {
      minuteHandRef.current.rotation.z = minuteAngle
    }
    if (secondHandRef.current) {
      secondHandRef.current.rotation.z = secondAngle
    }

    // 2. Activate Milestone Nodes on the right
    milestoneThresholds.forEach((thresh, i) => {
      const isActive = localP >= thresh
      const dotMesh = nodeDotsRef.current[i]
      const bgMesh = nodeBgsRef.current[i]

      if (dotMesh && dotMesh.material) {
        const mat = dotMesh.material as THREE.MeshBasicMaterial
        mat.color.set(isActive ? '#16a34a' : '#d4d4d8')
      }
      if (bgMesh && bgMesh.material) {
        const mat = bgMesh.material as THREE.MeshStandardMaterial
        mat.color.set(isActive ? '#ffffff' : '#f8fafc')
      }
    })
  })

  const dialMaterial = useMemo(() => {
    if (!texture) {
      return new THREE.MeshBasicMaterial({ color: '#09090b', toneMapped: false })
    }
    return new THREE.MeshBasicMaterial({
      map: texture,
      toneMapped: false,
    })
  }, [texture])

  return (
    <group ref={rootRef} position={position} rotation={rotation} scale={scale}>
      {/* 1. Main Lathed Chronometer Body (Positioned cleanly on the left) */}
      <group position={[-0.85, 0.05, 0]}>
        {/* Outer Titanium Bezel */}
        <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[radius, radius, 0.09, 64]} />
          <meshStandardMaterial
            color="#3a3937"
            metalness={0.88}
            roughness={0.24}
            transparent={opacity < 0.99}
            opacity={opacity}
          />
        </mesh>

        {/* Polished Gold Inner Accent Ring */}
        <mesh position={[0, 0, 0.048]}>
          <ringGeometry args={[radius * 0.86, radius * 0.9, 64]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.18} />
        </mesh>

        {/* Dial Face with High-Res Texture */}
        <mesh position={[0, 0, 0.05]}>
          <circleGeometry args={[radius * 0.85, 64]} />
          <primitive object={dialMaterial} attach="material" />
        </mesh>

        {/* Hour Hand (Skeletonized Metallic) */}
        <group ref={hourHandRef} position={[0, 0, 0.056]}>
          <mesh position={[0, 0.17, 0]} castShadow>
            <boxGeometry args={[0.035, 0.34, 0.01]} />
            <meshStandardMaterial color="#e7e5e4" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.17, 0.006]}>
            <boxGeometry args={[0.016, 0.22, 0.004]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Minute Hand (Emerald Steel Pointer) */}
        <group ref={minuteHandRef} position={[0, 0, 0.062]}>
          <mesh position={[0, 0.25, 0]} castShadow>
            <boxGeometry args={[0.024, 0.5, 0.01]} />
            <meshStandardMaterial color="#22c55e" metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.46, 0.006]}>
            <coneGeometry args={[0.024, 0.06, 4]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
        </group>

        {/* Seconds Sweep Hand */}
        <group ref={secondHandRef} position={[0, 0, 0.068]}>
          <mesh position={[0, 0.26, 0]}>
            <boxGeometry args={[0.01, 0.52, 0.005]} />
            <meshBasicMaterial color="#f97316" />
          </mesh>
        </group>

        {/* Center Pinion Gold Cap */}
        <mesh position={[0, 0, 0.074]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.038, 0.038, 0.028, 32]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* 2. 4-Day Lifecycle Cadence Stepper (Connected timeline cleanly on the right) */}
      <group position={[0.85, 0.45, 0]}>
        {/* Continuous Vertical Stepper Timeline Rail */}
        <mesh position={[-0.78, -0.45, 0.005]}>
          <planeGeometry args={[0.016, 0.92]} />
          <meshBasicMaterial color="#e2e8f0" />
        </mesh>

        {[0, 1, 2, 3].map((idx) => (
          <group key={idx} position={[0, -idx * 0.3, 0]}>
            {/* High-Res Stepper Card */}
            <mesh
              ref={(el) => {
                nodeBgsRef.current[idx] = el
              }}
              castShadow
              receiveShadow
              position={[0, 0, 0]}
            >
              <planeGeometry args={[1.42, 0.26]} />
              {cardTextures[idx] ? (
                <meshBasicMaterial map={cardTextures[idx]} toneMapped={false} />
              ) : (
                <meshBasicMaterial color="#ffffff" toneMapped={false} />
              )}
            </mesh>

            {/* Stepper Node Outer Ring */}
            <mesh position={[-0.78, 0, 0.01]}>
              <ringGeometry args={[0.038, 0.048, 24]} />
              <meshBasicMaterial color="#cbd5e1" />
            </mesh>

            {/* Stepper Node Center Indicator Dot */}
            <mesh
              ref={(el) => {
                nodeDotsRef.current[idx] = el
              }}
              position={[-0.78, 0, 0.012]}
            >
              <circleGeometry args={[0.036, 24]} />
              <meshBasicMaterial color="#d4d4d8" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}
