'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { scrollState, chapterProgress, clamp01 } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'

export default function Chapter1Hero() {
  const groupRef = useRef<THREE.Group>(null)
  const ch = CHAPTERS[0]

  useFrame((state) => {
    if (!groupRef.current) return
    const p = chapterProgress(ch.range)
    const time = state.clock.getElapsedTime()

    // Smooth entry and exit scale/visibility
    // Chapter 1 is fully visible at start [0, 0.14], exits as chapter 2 takes over
    const exitP = clamp01((scrollState.progress - 0.12) / 0.06)
    const opacity = 1 - exitP
    const scale = 1 - exitP * 0.25

    groupRef.current.visible = opacity > 0.01
    groupRef.current.scale.setScalar(scale)

    // Gentle physical hover floating
    groupRef.current.position.y = ch.actorPosition[1] + Math.sin(time * 1.8) * 0.04
    groupRef.current.rotation.y = Math.sin(time * 0.9) * 0.05
    groupRef.current.rotation.z = Math.cos(time * 1.2) * 0.02
  })

  return (
    <group ref={groupRef} position={ch.actorPosition}>
      {/* Envelope Body Placeholder */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 1.2, 0.08]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} metalness={0.05} />
      </mesh>

      {/* Flap Accent */}
      <mesh position={[0, 0.2, 0.05]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.85, 0.85]} />
        <meshStandardMaterial color="#f8f7f4" roughness={0.65} side={THREE.DoubleSide} />
      </mesh>

      {/* Wax Seal Medallion */}
      <mesh position={[0, -0.05, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.04, 32]} />
        <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.1} />
      </mesh>
    </group>
  )
}
