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

    // Active range for Chapter 5: 0.588 to 0.738 (clean isolation, zero overlap with Ch 4 or Ch 6)
    const isVisible = p >= 0.588 && p <= 0.738
    rootRef.current.visible = isVisible
    if (!rootRef.current.visible) return

    // Entrance & Exit Transitions
    const enterT = clamp01((p - 0.588) / 0.022)
    const exitT = clamp01((p - 0.722) / 0.016)

    const enterY = (1 - enterT) * -0.4
    const exitY = -exitT * 0.7
    const scale = (0.9 + enterT * 0.1) * (1 - exitT * 0.35)

    rootRef.current.position.y = ch.actorPosition[1] + enterY + exitY
    rootRef.current.scale.setScalar(scale)
  })

  return (
    <group ref={rootRef} position={ch.actorPosition}>
      <Chronometer position={[0, 0, 0]} />
    </group>
  )
}
