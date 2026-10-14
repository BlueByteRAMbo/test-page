'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { scrollState, chapterProgress, clamp01 } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'

export default function Chapter7Settle() {
  const groupRef = useRef<THREE.Group>(null)
  const ch = CHAPTERS[6]

  useFrame(() => {
    if (!groupRef.current) return
    const p = scrollState.progress
    const enter = clamp01((p - 0.85) / 0.08)
    const localP = chapterProgress(ch.range)

    // Settle node eases down to ground level and smoothly dissolves
    groupRef.current.visible = enter > 0.01
    groupRef.current.scale.setScalar(0.9 + enter * 0.1)
    groupRef.current.position.y = ch.actorPosition[1] - localP * 0.4
  })

  return (
    <group ref={groupRef} position={ch.actorPosition}>
      {/* Settle Ground Emblem */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.04, 64]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Emerald Core Ring */}
      <mesh position={[0, 0.03, 0]}>
        <ringGeometry args={[0.9, 1.05, 64]} />
        <meshStandardMaterial color="#16a34a" roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
