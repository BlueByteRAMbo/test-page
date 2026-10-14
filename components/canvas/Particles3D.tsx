'use client'

import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export default function Particles3D() {
  const pointsRef = useRef<THREE.Points>(null)

  const [positions, scales] = useMemo(() => {
    const count = 280
    const pos = new Float32Array(count * 3)
    const sc = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Spread across 3D corridor
      pos[i * 3 + 0] = (Math.random() - 0.5) * 18
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = Math.random() * -75 + 10 // from Z=10 to Z=-65

      sc[i] = Math.random() * 0.08 + 0.03
    }
    return [pos, sc]
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.getElapsedTime()
    // Subtle breathing drift
    pointsRef.current.rotation.y = Math.sin(t * 0.05) * 0.03
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#10b981"
        size={0.06}
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
