'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { scrollState, chapterProgress, clamp01 } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'

export default function Chapter5Followup() {
  const groupRef = useRef<THREE.Group>(null)
  const minuteHandRef = useRef<THREE.Mesh>(null)
  const hourHandRef = useRef<THREE.Mesh>(null)
  const ch = CHAPTERS[4]

  useFrame(() => {
    if (!groupRef.current) return
    const p = scrollState.progress
    const enter = clamp01((p - 0.56) / 0.06)
    const exit = clamp01((p - 0.74) / 0.06)
    const activeWeight = enter * (1 - exit)

    groupRef.current.visible = activeWeight > 0.01

    const localP = chapterProgress(ch.range)

    // Watch hands sweep smoothly from Day 1 to Day 4
    if (minuteHandRef.current) {
      minuteHandRef.current.rotation.z = -localP * Math.PI * 8
    }
    if (hourHandRef.current) {
      hourHandRef.current.rotation.z = -localP * Math.PI * 1.5
    }

    groupRef.current.scale.setScalar(0.85 + activeWeight * 0.15)
  })

  return (
    <group ref={groupRef} position={ch.actorPosition}>
      {/* Luxury Chronometer Outer Titanium Bezel */}
      <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.48, 0.48, 0.08, 64]} />
        <meshStandardMaterial color="#3f3f46" roughness={0.25} metalness={0.9} />
      </mesh>

      {/* Dark Dial Face */}
      <mesh position={[0, 0, 0.045]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.43, 0.43, 0.02, 64]} />
        <meshStandardMaterial color="#09090b" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Center Pin */}
      <mesh position={[0, 0, 0.065]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.03, 16]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Hour Hand */}
      <mesh ref={hourHandRef} position={[0, 0, 0.055]}>
        <boxGeometry args={[0.025, 0.22, 0.01]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Minute Hand */}
      <mesh ref={minuteHandRef} position={[0, 0, 0.06]}>
        <boxGeometry args={[0.018, 0.32, 0.01]} />
        <meshStandardMaterial color="#22c55e" roughness={0.2} metalness={0.7} />
      </mesh>
    </group>
  )
}
