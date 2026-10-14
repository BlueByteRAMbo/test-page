'use client'

import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

interface FlyingEnvelopesProps {
  scrollProgress: number
}

export default function FlyingEnvelopes({ scrollProgress }: FlyingEnvelopesProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Pre-generate 12 floating envelope positions along the 3D corridor
  const envelopes = useMemo(() => {
    return [
      { basePos: [-2.5, 1.2, 3], rotSpeed: 0.6, scale: 0.8 },
      { basePos: [2.8, -0.6, 1], rotSpeed: -0.4, scale: 0.9 },
      { basePos: [-2.8, -0.8, -10], rotSpeed: 0.5, scale: 0.7 },
      { basePos: [3.0, 1.5, -14], rotSpeed: -0.7, scale: 0.85 },
      { basePos: [-3.2, 0.4, -22], rotSpeed: 0.4, scale: 0.75 },
      { basePos: [2.6, -1.2, -26], rotSpeed: -0.5, scale: 0.8 },
      { basePos: [-1.8, 1.8, -34], rotSpeed: 0.8, scale: 0.9 }, // Near Gmail station
      { basePos: [1.6, -0.4, -36], rotSpeed: -0.6, scale: 0.85 }, // Near Gmail station
      { basePos: [-0.6, 2.0, -38], rotSpeed: 0.7, scale: 0.95 }, // Near Gmail station
      { basePos: [2.5, 0.8, -44], rotSpeed: -0.4, scale: 0.7 },
      { basePos: [-2.2, -0.5, -52], rotSpeed: 0.5, scale: 0.75 },
      { basePos: [2.0, 1.2, -60], rotSpeed: -0.6, scale: 0.8 },
    ]
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    groupRef.current.children.forEach((child, i) => {
      const data = envelopes[i]
      if (!data) return

      // Gentle floating levitation
      child.position.y = data.basePos[1] + Math.sin(t * 1.5 + i) * 0.18
      child.position.x = data.basePos[0] + Math.cos(t * 1.2 + i * 0.5) * 0.12

      // Gentle rotation
      child.rotation.y += 0.005 * data.rotSpeed
      child.rotation.x = Math.sin(t * 0.8 + i) * 0.08
      child.rotation.z = Math.cos(t * 0.6 + i) * 0.05
    })
  })

  return (
    <group ref={groupRef}>
      {envelopes.map((env, i) => (
        <group key={i} position={env.basePos as [number, number, number]} scale={env.scale}>
          {/* Envelope Body */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.7, 0.45, 0.03]} />
            <meshStandardMaterial
              color="#ffffff"
              roughness={0.25}
              metalness={0.05}
            />
          </mesh>

          {/* Envelope Flap Accent Line */}
          <mesh position={[0, 0.02, 0.02]}>
            <coneGeometry args={[0.3, 0.18, 3]} />
            <meshStandardMaterial
              color="#f4f3ef"
              roughness={0.3}
            />
          </mesh>

          {/* Small Gmail Red Accent Seal */}
          <mesh position={[0, -0.04, 0.022]}>
            <circleGeometry args={[0.045, 16]} />
            <meshStandardMaterial
              color="#ea4335"
              emissive="#ea4335"
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
