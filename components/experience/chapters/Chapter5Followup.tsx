'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { scrollState, clamp01 } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'
import Chronometer from '../models/Chronometer'

/**
 * Chapter 5: Smart Follow-ups
 * Range: [0.60, 0.74]
 * - Luxury mechanical chronometer with dark Guilloché dial
 * - Rotating skeletonized hour/minute/second hands sweeping Day 1 to Day 4
 * - Cadence milestones on the right illuminating as days advance
 */
export default function Chapter5Followup() {
  const rootRef = useRef<THREE.Group>(null)
  const ch = CHAPTERS[4]

  useFrame(() => {
    if (!rootRef.current) return
    const p = scrollState.progress
    const enter = clamp01((p - 0.58) / 0.04)
    const exit = clamp01((p - 0.74) / 0.03)
    const activeWeight = enter * (1 - exit)

    rootRef.current.visible = activeWeight > 0.01
    if (!rootRef.current.visible) return

    // Subtle breathing scale
    rootRef.current.scale.setScalar(0.92 + activeWeight * 0.08)
  })

  return (
    <group ref={rootRef} position={ch.actorPosition}>
      <Chronometer position={[0, 0, 0]} />
    </group>
  )
}
