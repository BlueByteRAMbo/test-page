'use client'

import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { scrollState, chapterProgress, clamp01 } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'

interface VaultProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  opacity?: number
}

/**
 * Obsidian & Platinum Executive Credit Recovery Vault (Chapter 6).
 * - Machined dark titanium chassis with brushed platinum beveled trims
 * - Top deposit slot with optical emerald sensor
 * - Massive circular vault door with rotating 3-spoke chrome wheel
 * - OLED digital counter that flashes and increments from 50 to 51 CREDITS
 */
export default function Vault({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  opacity = 1,
}: VaultProps) {
  const rootRef = useRef<THREE.Group>(null)
  const wheelRef = useRef<THREE.Group>(null)
  const slotSensorRef = useRef<THREE.Mesh>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const textureRef = useRef<THREE.CanvasTexture | null>(null)
  const lastRefundedRef = useRef<boolean>(false)

  const width = 1.25
  const height = 1.45
  const depth = 0.72

  const ch = CHAPTERS[5]

  // OLED Screen Canvas Texture (512x256)
  const { canvas, texture } = useMemo(() => {
    if (typeof document === 'undefined') {
      return { canvas: null, texture: null }
    }
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 256
    const tex = new THREE.CanvasTexture(c)
    tex.generateMipmaps = true
    tex.minFilter = THREE.LinearMipmapLinearFilter
    canvasRef.current = c
    textureRef.current = tex

    // Draw initial 50 CREDITS state
    const ctx = c.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, c.width, c.height)
      ctx.strokeStyle = '#475569'
      ctx.lineWidth = 4
      ctx.strokeRect(6, 6, c.width - 12, c.height - 12)

      ctx.textAlign = 'center'
      ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      ctx.fillStyle = '#94a3b8'
      ctx.fillText('• EXECUTIVE CREDIT VAULT •', c.width / 2, 42)

      ctx.font = '800 46px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      ctx.fillStyle = '#ffffff'
      ctx.fillText('50 CREDITS', c.width / 2, 115)

      ctx.fillStyle = '#1e293b'
      ctx.beginPath()
      ctx.roundRect(c.width / 2 - 120, 155, 240, 44, 10)
      ctx.fill()

      ctx.font = '600 18px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.fillStyle = '#cbd5e1'
      ctx.fillText('BOUNCE SHIELD ACTIVE', c.width / 2, 183)

      tex.needsUpdate = true
    }

    return { canvas: c, texture: tex }
  }, [])

  const drawOledState = (isRefunded: boolean) => {
    if (!canvas || !texture) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height

    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, w, h)

    ctx.strokeStyle = isRefunded ? '#22c55e' : '#475569'
    ctx.lineWidth = 4
    ctx.strokeRect(6, 6, w - 12, h - 12)

    ctx.textAlign = 'center'
    ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.fillStyle = '#94a3b8'
    ctx.fillText('• EXECUTIVE CREDIT VAULT •', w / 2, 42)

    ctx.font = '800 46px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.fillStyle = isRefunded ? '#4ade80' : '#ffffff'
    const creditCount = isRefunded ? '51 CREDITS' : '50 CREDITS'
    ctx.fillText(creditCount, w / 2, 115)

    if (isRefunded) {
      ctx.fillStyle = '#14532d'
      ctx.beginPath()
      ctx.roundRect(w / 2 - 130, 155, 260, 46, 10)
      ctx.fill()
      ctx.strokeStyle = '#22c55e'
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.font = '700 20px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.fillStyle = '#4ade80'
      ctx.fillText('✓ +1 AUTO-REFUNDED', w / 2, 185)
    } else {
      ctx.fillStyle = '#1e293b'
      ctx.beginPath()
      ctx.roundRect(w / 2 - 120, 155, 240, 44, 10)
      ctx.fill()

      ctx.font = '600 18px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.fillStyle = '#cbd5e1'
      ctx.fillText('BOUNCE SHIELD ACTIVE', w / 2, 183)
    }

    texture.needsUpdate = true
  }

  useFrame(() => {
    const localP = chapterProgress(ch.range)
    const isRefunded = localP >= 0.72

    // 1. Redraw OLED on state transition
    if (isRefunded !== lastRefundedRef.current) {
      lastRefundedRef.current = isRefunded
      drawOledState(isRefunded)
    }

    // 2. Wheel rotation when coin enters
    if (wheelRef.current) {
      if (localP > 0.65) {
        const t = clamp01((localP - 0.65) / 0.35)
        wheelRef.current.rotation.z = t * Math.PI * 1.5
      } else {
        wheelRef.current.rotation.z = 0
      }
    }

    // 3. Sensor aperture glow
    if (slotSensorRef.current && slotSensorRef.current.material) {
      const mat = slotSensorRef.current.material as THREE.MeshBasicMaterial
      mat.color.set(localP > 0.6 ? '#4ade80' : '#15803d')
    }
  })

  const oledMaterial = useMemo(() => {
    if (!texture) {
      return new THREE.MeshBasicMaterial({ color: '#09090b' })
    }
    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: opacity < 0.99,
      opacity,
    })
  }, [texture, opacity])

  return (
    <group ref={rootRef} position={position} rotation={rotation} scale={scale}>
      {/* 1. Vault Chassis (Machined Titanium with Subtle Sheen) */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color="#27272a"
          metalness={0.88}
          roughness={0.28}
          transparent={opacity < 0.99}
          opacity={opacity}
        />
      </mesh>

      {/* 2. Platinum Accent Trim Bevels (Front Frame Border) */}
      <mesh position={[0, 0, depth / 2 + 0.003]}>
        <ringGeometry args={[0.48, 0.52, 48]} />
        <meshStandardMaterial color="#e4e4e7" metalness={0.96} roughness={0.15} />
      </mesh>

      {/* 3. Top Deposit Slot Frame */}
      <group position={[0, height / 2 + 0.01, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.55, 0.04, 0.18]} />
          <meshStandardMaterial color="#3f3f46" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Optical Emerald Slot Aperture */}
        <mesh ref={slotSensorRef} position={[0, 0.022, 0]}>
          <boxGeometry args={[0.42, 0.01, 0.07]} />
          <meshBasicMaterial color="#15803d" />
        </mesh>
      </group>

      {/* 4. Front Digital OLED Readout */}
      <mesh position={[0, 0.4, depth / 2 + 0.005]}>
        <planeGeometry args={[0.82, 0.41]} />
        <primitive object={oledMaterial} attach="material" />
      </mesh>

      {/* 5. Bank Vault Heavy Circular Door */}
      <group position={[0, -0.22, depth / 2 + 0.012]}>
        <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.045, 64]} />
          <meshStandardMaterial color="#3f3f46" metalness={0.94} roughness={0.18} />
        </mesh>

        {/* Outer Locking Bolts Rim */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const a = (i * Math.PI * 2) / 8
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 0.36, Math.sin(a) * 0.36, 0.028]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.022, 0.022, 0.02, 16]} />
              <meshStandardMaterial color="#f4f4f5" metalness={0.98} roughness={0.12} />
            </mesh>
          )
        })}

        {/* 3-Spoke Chrome Wheel Handle */}
        <group ref={wheelRef} position={[0, 0, 0.035]}>
          {/* Wheel Hub */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.065, 0.065, 0.035, 32]} />
            <meshStandardMaterial color="#ffffff" metalness={0.98} roughness={0.1} />
          </mesh>

          {/* 3 Spokes */}
          {[0, 1, 2].map((i) => {
            const angle = (i * Math.PI * 2) / 3
            return (
              <group key={i} rotation={[0, 0, angle]}>
                <mesh position={[0, 0.14, 0]}>
                  <cylinderGeometry args={[0.014, 0.014, 0.22, 16]} />
                  <meshStandardMaterial color="#ffffff" metalness={0.98} roughness={0.1} />
                </mesh>
                <mesh position={[0, 0.26, 0]}>
                  <sphereGeometry args={[0.028, 16, 16]} />
                  <meshStandardMaterial color="#ffffff" metalness={0.98} roughness={0.1} />
                </mesh>
              </group>
            )
          })}
        </group>
      </group>
    </group>
  )
}
