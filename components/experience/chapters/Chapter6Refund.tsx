'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { scrollState, chapterProgress, clamp01 } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'

export default function Chapter6Refund() {
  const groupRef = useRef<THREE.Group>(null)
  const coinRef = useRef<THREE.Group>(null)
  const vaultRef = useRef<THREE.Group>(null)
  const ch = CHAPTERS[5]

  useFrame(() => {
    if (!groupRef.current) return
    const p = scrollState.progress
    const enter = clamp01((p - 0.70) / 0.06)
    const exit = clamp01((p - 0.88) / 0.06)
    const activeWeight = enter * (1 - exit)

    groupRef.current.visible = activeWeight > 0.01

    const localP = chapterProgress(ch.range)

    // Parabolic arc for gold coin toward vault
    if (coinRef.current) {
      // Moves from -1.4 to +1.0
      const arcX = -1.4 + localP * 2.4
      const arcY = Math.sin(localP * Math.PI) * 0.9 + 0.1
      coinRef.current.position.set(arcX, arcY, 0.2)
      coinRef.current.rotation.y = localP * Math.PI * 4
      coinRef.current.rotation.x = localP * Math.PI * 2
    }

    // Vault pulses slightly as coin approaches
    if (vaultRef.current) {
      const pulse = localP > 0.7 ? 1 + Math.sin((localP - 0.7) * 20) * 0.05 : 1
      vaultRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group ref={groupRef} position={ch.actorPosition}>
      {/* 3D Gold Credit Coin */}
      <group ref={coinRef} position={[-1.4, 0.1, 0.2]}>
        <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.06, 48]} />
          <meshStandardMaterial
            color="#fbbf24"
            roughness={0.25}
            metalness={0.95}
            envMapIntensity={1.5}
          />
        </mesh>
      </group>

      {/* Obsidian Executive Vault */}
      <group ref={vaultRef} position={[1.0, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.2, 1.4, 0.6]} />
          <meshStandardMaterial color="#18181b" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Vault Door Inset */}
        <mesh position={[0, 0, 0.31]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.04, 32]} />
          <meshStandardMaterial color="#22c55e" roughness={0.3} metalness={0.4} />
        </mesh>
      </group>
    </group>
  )
}
