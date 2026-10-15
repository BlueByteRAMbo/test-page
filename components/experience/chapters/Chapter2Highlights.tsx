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

    // Active range for Chapter 2 narrative beat: 0.12 to 0.285
    const isVisible = p >= 0.12 && p <= 0.285
    groupRef.current.visible = isVisible

    if (!isVisible) return

    // Envelope Flap closure towards end of Chapter 2
    // 0.12 to 0.255: flap stays fully open (Math.PI * 0.95)
    // 0.255 to 0.27: flap closes back shut
    const closeFlapT = clamp01((p - 0.255) / 0.015)
    const flapAngle = (1 - closeFlapT) * Math.PI * 0.95

    envelopeRef.current?.setFlapAngle(flapAngle)
    envelopeRef.current?.setSealOpacity(0)

    // Ease envelope downward slightly as letter emerges to frame the sheet centrally
    const emergeT = clamp01((p - 0.13) / 0.04)
    const retreatT = clamp01((p - 0.245) / 0.025)
    const netEmerge = clamp01(emergeT - retreatT)

    // Smooth exit from 0.265 to 0.285 (glide down and scale out so it never collides with Ch 3 monitors)
    const exitT = clamp01((p - 0.265) / 0.018)
    const exitY = -exitT * 0.6
    const exitScale = 1 - exitT * 0.35

    groupRef.current.position.y = ch.actorPosition[1] - netEmerge * 0.25 + exitY
    groupRef.current.scale.setScalar(exitScale)
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
