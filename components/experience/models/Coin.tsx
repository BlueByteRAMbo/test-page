'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { makeCanvasTexture } from '@/lib/three-utils'

interface CoinProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  opacity?: number
}

/**
 * Minted 3D Physical Gold Credit Coin (Chapter 6: Bounce Shield).
 * - Lathed cylinder with milled ribbed edge
 * - High-res embossed gold face texture ("+1 CREDIT", "EEXTRAMILE SHIELD")
 * - 1.0 metalness, 0.22 roughness, bright gold reflective material
 */
export default function Coin({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  opacity = 1,
}: CoinProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const textureRef = useRef<THREE.CanvasTexture | null>(null)

  const radius = 0.32
  const thickness = 0.05

  // High-Res Embossed Coin Face Texture (512x512)
  const { canvas, texture } = useMemo(() => {
    if (typeof document === 'undefined') {
      return { canvas: null, texture: null }
    }
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 512
    const tex = makeCanvasTexture(c, 8)
    canvasRef.current = c
    textureRef.current = tex
    return { canvas: c, texture: tex }
  }, [])

  useEffect(() => {
    if (!canvas || !texture) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = canvas.width
    const center = size / 2

    // Gold Rim & Radial Gradient
    ctx.clearRect(0, 0, size, size)
    const grad = ctx.createRadialGradient(center, center, 20, center, center, center - 10)
    grad.addColorStop(0, '#fef9c3')
    grad.addColorStop(0.35, '#fde047')
    grad.addColorStop(0.7, '#f59e0b')
    grad.addColorStop(1, '#b45309')

    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(center, center, center - 12, 0, Math.PI * 2)
    ctx.fill()

    // Outer Beaded / Star Border
    ctx.strokeStyle = '#fef08a'
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.arc(center, center, center - 24, 0, Math.PI * 2)
    ctx.stroke()

    // Embossed +1 CREDIT Text
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = '900 76px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.fillStyle = '#78350f'
    ctx.fillText('+1', center + 2, center - 18)
    ctx.fillStyle = '#ffffff'
    ctx.fillText('+1', center, center - 20)

    ctx.font = '800 34px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.fillStyle = '#78350f'
    ctx.fillText('CREDIT', center + 1, center + 41)
    ctx.fillStyle = '#fffbeb'
    ctx.fillText('CREDIT', center, center + 40)

    // Curved Text: EEXTRAMILE SHIELD
    ctx.font = '700 20px -apple-system, BlinkMacSystemFont, sans-serif'
    ctx.fillStyle = '#92400e'
    ctx.fillText('• EEXTRAMILE SHIELD •', center, center + 95)

    texture.needsUpdate = true
  }, [canvas, texture])

  const goldMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#e6b422',
      metalness: 1.0,
      roughness: 0.22,
      transparent: opacity < 0.99,
      opacity,
    })
  }, [opacity])

  const faceMaterial = useMemo(() => {
    if (!texture) return goldMaterial
    return new THREE.MeshStandardMaterial({
      map: texture,
      color: '#fffbeb',
      metalness: 0.95,
      roughness: 0.22,
      transparent: opacity < 0.99,
      opacity,
    })
  }, [texture, goldMaterial, opacity])

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* 1. Coin Edge Rim */}
      <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius, radius, thickness, 64]} />
        <primitive object={goldMaterial} attach="material" />
      </mesh>

      {/* 2. Front Embossed Face */}
      <mesh position={[0, 0, thickness / 2 + 0.002]}>
        <circleGeometry args={[radius - 0.015, 48]} />
        <primitive object={faceMaterial} attach="material" />
      </mesh>

      {/* 3. Back Embossed Face */}
      <mesh position={[0, 0, -thickness / 2 - 0.002]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[radius - 0.015, 48]} />
        <primitive object={faceMaterial} attach="material" />
      </mesh>
    </group>
  )
}
