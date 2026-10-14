'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { scrollState, chapterProgress, clamp01 } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'

export default function Chapter3Discovery() {
  const groupRef = useRef<THREE.Group>(null)
  const planeRef = useRef<THREE.Group>(null)
  const ch = CHAPTERS[2]

  useFrame(() => {
    if (!groupRef.current) return
    const p = scrollState.progress
    const enter = clamp01((p - 0.24) / 0.06)
    const exit = clamp01((p - 0.44) / 0.06)
    const activeWeight = enter * (1 - exit)

    groupRef.current.visible = activeWeight > 0.01

    const localP = chapterProgress(ch.range)

    // Aerodynamic plane banking along flight path
    if (planeRef.current) {
      planeRef.current.position.x = -1.2 + localP * 2.4
      planeRef.current.position.y = Math.sin(localP * Math.PI) * 0.4 + 0.1
      planeRef.current.rotation.z = -0.3 + Math.sin(localP * Math.PI) * 0.5
      planeRef.current.rotation.y = localP * 0.4
    }
  })

  return (
    <group ref={groupRef} position={ch.actorPosition}>
      {/* Studio Display Workstation Monitor A Placeholder */}
      <group position={[0, 0, -0.4]}>
        {/* Aluminum Chassis */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[1.8, 1.15, 0.06]} />
          <meshStandardMaterial color="#27272a" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Anti-glare Screen */}
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[1.68, 1.03]} />
          <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.1} />
        </mesh>
        {/* Stand */}
        <mesh position={[0, -0.7, 0]}>
          <boxGeometry args={[0.22, 0.45, 0.04]} />
          <meshStandardMaterial color="#71717a" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Base */}
        <mesh position={[0, -0.92, 0]}>
          <boxGeometry args={[0.6, 0.03, 0.45]} />
          <meshStandardMaterial color="#71717a" roughness={0.4} metalness={0.7} />
        </mesh>
      </group>

      {/* Origami Airplane in Flight */}
      <group ref={planeRef} position={[-1.2, 0, 0.5]}>
        {/* Cone/faceted dart placeholder */}
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.3, 0.9, 3]} />
          <meshStandardMaterial color="#ffffff" roughness={0.7} />
        </mesh>
      </group>
    </group>
  )
}
