'use client'

import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { scrollState, clamp01 } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'
import OrigamiPlane from '../models/OrigamiPlane'
import StudioDisplay from '../models/StudioDisplay'

export default function Chapter3Discovery() {
  const groupRef = useRef<THREE.Group>(null)
  const planeGroupRef = useRef<THREE.Group>(null)
  const displayARef = useRef<THREE.Group>(null)
  const ch = CHAPTERS[2]

  // 3D Aerodynamic Flight Path Curve landing neatly atop Display A's top bezel
  const flightPath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.6, 0.2, 0.3), // Swoops in cleanly from left
      new THREE.Vector3(0.8, 0.42, 0.25), // Climbs and banks over display C
      new THREE.Vector3(0.0, 0.38, 0.18), // Swoops across center display B
      new THREE.Vector3(-0.9, 0.48, 0.08), // Aligns target approach
      new THREE.Vector3(-1.34, 0.46, -0.06), // Perches atop Sarah Chen's bezel (never occludes text)
    ])
  }, [])

  const planePos = useMemo(() => new THREE.Vector3(), [])
  const planeTangent = useMemo(() => new THREE.Vector3(), [])
  const lookTarget = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    if (!groupRef.current || !planeGroupRef.current) return
    const p = scrollState.progress

    // Active range for Chapter 3: 0.285 to 0.44 (clean isolation, zero overlap with Ch 2 or Ch 4)
    const isVisible = p >= 0.285 && p <= 0.44
    groupRef.current.visible = isVisible

    if (!isVisible) return

    // Entrance & Exit Transitions
    const enterT = clamp01((p - 0.285) / 0.025)
    const exitT = clamp01((p - 0.415) / 0.025)

    const enterY = (1 - enterT) * -0.45
    const exitZ = -exitT * 1.4
    const scale = (0.88 + enterT * 0.12) * (1 - exitT * 0.3)

    groupRef.current.position.y = ch.actorPosition[1] + enterY
    groupRef.current.position.z = exitZ
    groupRef.current.scale.setScalar(scale)

    // 1. Plane Metamorphosis & Flight
    const morphT = clamp01((p - 0.29) / 0.025) * 0.55
    const flightT = clamp01((p - 0.315) / 0.065)

    planeGroupRef.current.scale.setScalar(morphT)

    if (flightT > 0 && flightT < 1) {
      flightPath.getPointAt(flightT, planePos)
      flightPath.getTangentAt(flightT, planeTangent)

      planeGroupRef.current.position.copy(planePos)

      lookTarget.copy(planePos).add(planeTangent)
      planeGroupRef.current.lookAt(lookTarget)

      // Aerodynamic banking roll
      const bankRoll = Math.sin(flightT * Math.PI) * 0.45
      planeGroupRef.current.rotateZ(bankRoll)
    } else if (flightT === 0) {
      planeGroupRef.current.position.set(-1.6, 0.2, 0.3)
      planeGroupRef.current.rotation.set(0, 0, 0)
    } else {
      // Perched on top bezel of Display A, clear of all key text
      planeGroupRef.current.position.set(-1.28, 0.44, -0.05)
      planeGroupRef.current.rotation.set(-0.06, 0.22, -0.02)
    }
  })

  // Laser & Target Lock parameters for Display A
  const p = scrollState.progress
  const laserProgress = clamp01((p - 0.37) / 0.035)
  const isTargetLocked = p >= 0.395

  return (
    <group ref={groupRef} position={ch.actorPosition}>
      {/* 3D Origami Airplane */}
      <group ref={planeGroupRef}>
        <OrigamiPlane />
      </group>

      {/* 
        3 Studio Display Workstations in ergonomic curved arc (zero overlap, sleek physical seams)
      */}
      {/* Display A: Sarah Chen (Target Lock Hero, Left of center) */}
      <group ref={displayARef}>
        <StudioDisplay
          position={[-1.28, 0, -0.08]}
          rotation={[0, 0.22, 0]}
          recruiterName="Sarah Chen"
          recruiterCompany="Meta"
          recruiterRole="Lead Tech Recruiter"
          recruiterEmail="sarah.chen@meta.com"
          confidenceScore="99%"
          isTargetLocked={isTargetLocked}
          laserProgress={laserProgress}
        />
      </group>

      {/* Display B: David Kim (Center) */}
      <StudioDisplay
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        recruiterName="David Kim"
        recruiterCompany="Apple"
        recruiterRole="Staff Talent Partner"
        recruiterEmail="d.kim@apple.com"
        confidenceScore="98%"
      />

      {/* Display C: Elena Rostova (Right of center) */}
      <StudioDisplay
        position={[1.28, 0, -0.08]}
        rotation={[0, -0.22, 0]}
        recruiterName="Elena Rostova"
        recruiterCompany="Stripe"
        recruiterRole="Head of Tech Hiring"
        recruiterEmail="elena.r@stripe.com"
        confidenceScore="97%"
      />
    </group>
  )
}
