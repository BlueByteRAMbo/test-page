'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { scrollState, clamp01 } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'
import Envelope, { EnvelopeHandle } from '../models/Envelope'
import Letter from '../models/Letter'

export default function Chapter2Highlights() {
  const groupRef = useRef<THREE.Group>(null)
  const envelopeRef = useRef<EnvelopeHandle>(null)
  const ch = CHAPTERS[1]

  useFrame(() => {
    if (!groupRef.current) return
    const p = scrollState.progress

    // Active range for Chapter 2 narrative beat
    const isVisible = p >= 0.12 && p <= 0.35
    groupRef.current.visible = isVisible

    if (!isVisible) return

    // Envelope Flap closure towards end of Chapter 2
    // 0.12 to 0.31: flap stays fully open (Math.PI * 0.95)
    // 0.31 to 0.34: flap closes back shut
    const closeFlapT = clamp01((p - 0.31) / 0.03)
    const flapAngle = (1 - closeFlapT) * Math.PI * 0.95

    envelopeRef.current?.setFlapAngle(flapAngle)
    envelopeRef.current?.setSealOpacity(0)

    // Ease envelope downward slightly as letter emerges to frame the sheet centrally
    const emergeT = clamp01((p - 0.13) / 0.05)
    const retreatT = clamp01((p - 0.28) / 0.04)
    const netEmerge = clamp01(emergeT - retreatT)
    groupRef.current.position.y = ch.actorPosition[1] - netEmerge * 0.35
  })

  return (
    <group ref={groupRef} position={ch.actorPosition}>
      {/* Physical Envelope Pocket */}
      <Envelope ref={envelopeRef} flapAngle={Math.PI * 0.95} sealOpacity={0} />

      {/* 3-Panel Unfolding Origami Letter */}
      <Letter />
    </group>
  )
}
