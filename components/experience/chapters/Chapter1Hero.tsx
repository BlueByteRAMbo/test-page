'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { scrollState, clamp01 } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'
import Envelope from '../models/Envelope'

export default function Chapter1Hero() {
  const groupRef = useRef<THREE.Group>(null)
  const ch = CHAPTERS[0]

  useFrame((state) => {
    if (!groupRef.current) return
    const p = scrollState.progress
    const time = state.clock.getElapsedTime()

    // Chapter 1 is active from 0 to ~0.15
    const isVisible = p < 0.16
    groupRef.current.visible = isVisible

    if (!isVisible) return

    // Subtle physical floating hover
    const hoverY = Math.sin(time * 1.8) * 0.04
    const hoverRotY = Math.sin(time * 0.9) * 0.04
    const hoverRotZ = Math.cos(time * 1.2) * 0.02

    groupRef.current.position.y = ch.actorPosition[1] + hoverY
    groupRef.current.rotation.y = hoverRotY
    groupRef.current.rotation.z = hoverRotZ
  })

  // Calculate flap opening and seal fracture towards end of Ch 1
  const p = scrollState.progress
  const flapAngle = clamp01((p - 0.12) / 0.04) * Math.PI * 0.95
  const sealOpacity = clamp01(1 - (p - 0.11) / 0.03)

  return (
    <group ref={groupRef} position={ch.actorPosition}>
      <Envelope flapAngle={flapAngle} sealOpacity={sealOpacity} />
    </group>
  )
}
