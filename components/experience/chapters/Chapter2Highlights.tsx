'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { scrollState, chapterProgress, clamp01 } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'

export default function Chapter2Highlights() {
  const groupRef = useRef<THREE.Group>(null)
  const ch = CHAPTERS[1]

  useFrame(() => {
    if (!groupRef.current) return
    const p = scrollState.progress
    // Active between ~0.10 and 0.32
    const enter = clamp01((p - 0.10) / 0.06)
    const exit = clamp01((p - 0.28) / 0.06)
    const activeWeight = enter * (1 - exit)

    groupRef.current.visible = activeWeight > 0.01

    const localP = chapterProgress(ch.range)
    // Slide up and unfold rotation
    groupRef.current.position.y = ch.actorPosition[1] + (1 - enter) * -0.5
    groupRef.current.rotation.x = (1 - localP) * 0.4
    groupRef.current.scale.setScalar(0.85 + activeWeight * 0.15)
  })

  return (
    <group ref={groupRef} position={ch.actorPosition}>
      {/* 3-Panel Unfolding Sheet Placeholder */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 2.2, 0.02]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>

      {/* Verified Milestone Pill Badges */}
      {[-0.5, -0.15, 0.2, 0.55].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0.02]}>
          <boxGeometry args={[1.2, 0.2, 0.01]} />
          <meshStandardMaterial color={idx < 3 ? '#e5e7eb' : '#dcfce7'} />
        </mesh>
      ))}
    </group>
  )
}
