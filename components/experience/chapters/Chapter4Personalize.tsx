'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { scrollState, chapterProgress, clamp01 } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'
import Composer from '../models/Composer'
import OrigamiPlane from '../models/OrigamiPlane'

/**
 * Chapter 4: Personalise & Send
 * Range: [0.44, 0.60]
 * - Center workstation expands into 3D Apple/Linear-grade Composer
 * - Dynamic typing reveals email copy with highlighted career achievements
 * - Physical 3D send button clicks down with mechanical spring depression
 * - Dispatched confirmation toast and origami plane launch into flight
 */
export default function Chapter4Personalize() {
  const rootRef = useRef<THREE.Group>(null)
  const planeRef = useRef<THREE.Group>(null)
  const ch = CHAPTERS[3]

  useFrame(() => {
    if (!rootRef.current) return
    const p = scrollState.progress

    // Active range for Chapter 4: 0.44 to 0.588 (cleanly isolated from Ch 3 and Ch 5)
    const isVisible = p >= 0.44 && p <= 0.588
    rootRef.current.visible = isVisible
    if (!rootRef.current.visible) return

    const localP = chapterProgress(ch.range)

    // 1. Composer entrance & exit transitions
    const enterT = clamp01((p - 0.44) / 0.025)
    const exitT = clamp01((p - 0.565) / 0.022)

    const enterY = (1 - enterT) * -0.35
    const exitY = -exitT * 0.75
    const scale = (0.9 + enterT * 0.1) * (1 - exitT * 0.35)

    rootRef.current.position.y = ch.actorPosition[1] + enterY + exitY
    rootRef.current.scale.setScalar(scale)

    // 2. Dispatched Origami Plane Flight upon Send button click
    if (planeRef.current) {
      if (localP > 0.68) {
        planeRef.current.visible = true
        const flightT = clamp01((localP - 0.68) / 0.26)
        // Launches forward from right side of composer and banks away smoothly
        const px = 0.4 + flightT * 1.3
        const py = 0.05 + Math.sin(flightT * Math.PI) * 0.4
        const pz = 0.08 + flightT * 1.1
        planeRef.current.position.set(px, py, pz)
        planeRef.current.rotation.set(-0.15, 0.3 + flightT * 0.4, -flightT * 0.35)
        planeRef.current.scale.setScalar(0.48 + flightT * 0.18)
      } else {
        planeRef.current.visible = false
      }
    }
  })

  return (
    <group ref={rootRef} position={ch.actorPosition}>
      {/* 1. Physical 3D Composer Window */}
      <Composer position={[0, 0, 0]} />

      {/* 2. Dispatched Origami Plane on Send */}
      <group ref={planeRef} visible={false}>
        <OrigamiPlane scale={0.5} />
      </group>
    </group>
  )
}
