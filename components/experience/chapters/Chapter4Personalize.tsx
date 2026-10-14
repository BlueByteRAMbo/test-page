'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { scrollState, chapterProgress, clamp01 } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'

export default function Chapter4Personalize() {
  const groupRef = useRef<THREE.Group>(null)
  const ch = CHAPTERS[3]

  useFrame(() => {
    if (!groupRef.current) return
    const p = scrollState.progress
    const enter = clamp01((p - 0.44) / 0.05)
    const exit = clamp01((p - 0.60) / 0.06)
    const activeWeight = enter * (1 - exit)

    groupRef.current.visible = activeWeight > 0.01

    const localP = chapterProgress(ch.range)
    groupRef.current.scale.setScalar(0.9 + activeWeight * 0.1)
  })

  return (
    <group ref={groupRef} position={ch.actorPosition}>
      {/* Expanded Glass Composer Window */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 1.7, 0.06]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.2}
          metalness={0.1}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Recipient Field Pill */}
      <mesh position={[-0.4, 0.5, 0.04]}>
        <boxGeometry args={[1.4, 0.22, 0.02]} />
        <meshStandardMaterial color="#f4f4f5" roughness={0.5} />
      </mesh>

      {/* Dynamic Content Lines */}
      {[-0.05, -0.28, -0.51].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0.04]}>
          <boxGeometry args={[2.0, 0.12, 0.01]} />
          <meshStandardMaterial color={idx === 1 ? '#dcfce7' : '#e4e4e7'} roughness={0.6} />
        </mesh>
      ))}

      {/* Send Button */}
      <mesh position={[0.85, 0.5, 0.04]}>
        <boxGeometry args={[0.5, 0.22, 0.02]} />
        <meshStandardMaterial color="#16a34a" roughness={0.3} metalness={0.1} />
      </mesh>
    </group>
  )
}
