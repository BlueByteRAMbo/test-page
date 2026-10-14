'use client'

import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { scrollState, clamp01 } from '@/lib/scroll-store'
import OrigamiPlane from '../models/OrigamiPlane'
import StudioDisplay from '../models/StudioDisplay'

export default function Chapter3Discovery() {
  const groupRef = useRef<THREE.Group>(null)
  const planeGroupRef = useRef<THREE.Group>(null)
  const displayARef = useRef<THREE.Group>(null)

  // 3D Aerodynamic Flight Path Curve towards right-staged workstations
  const flightPath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.1, 0.0, 0.0), // Launch from envelope dock
      new THREE.Vector3(2.2, 0.45, 0.4), // Climb and bank right
      new THREE.Vector3(1.8, 0.35, 0.3), // Swoop over center display
      new THREE.Vector3(1.3, 0.2, 0.15), // Align target approach
      new THREE.Vector3(0.95, 0.05, 0.02), // Target lock onto Sarah Chen's display
    ])
  }, [])

  const planePos = useMemo(() => new THREE.Vector3(), [])
  const planeTangent = useMemo(() => new THREE.Vector3(), [])
  const lookTarget = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    if (!groupRef.current || !planeGroupRef.current) return
    const p = scrollState.progress

    // Active range for Chapter 3: 0.30 to 0.45
    const isVisible = p >= 0.30 && p <= 0.45
    groupRef.current.visible = isVisible

    if (!isVisible) return

    // 1. Plane Metamorphosis & Flight
    const morphT = clamp01((p - 0.31) / 0.03) * 0.72
    const flightT = clamp01((p - 0.34) / 0.08)

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
      planeGroupRef.current.position.set(1.1, 0, 0)
      planeGroupRef.current.rotation.set(0, 0, 0)
    } else {
      // Landed on Display A
      planeGroupRef.current.position.set(0.95, 0.05, 0.02)
      planeGroupRef.current.rotation.set(0, 0.2, 0)
    }
  })

  // Laser & Target Lock parameters for Display A
  const p = scrollState.progress
  const laserProgress = clamp01((p - 0.39) / 0.035)
  const isTargetLocked = p >= 0.41

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 3D Origami Airplane */}
      <group ref={planeGroupRef}>
        <OrigamiPlane />
      </group>

      {/* 
        3 Studio Display Workstations in ergonomic curved arc strictly on the right stage
      */}
      {/* Display A: Sarah Chen (Target Lock Hero) */}
      <group ref={displayARef}>
        <StudioDisplay
          position={[0.95, 0, 0]}
          rotation={[0, 0.2, 0]}
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
        position={[2.45, 0, -0.45]}
        rotation={[0, 0.02, 0]}
        recruiterName="David Kim"
        recruiterCompany="Apple"
        recruiterRole="Staff Talent Partner"
        recruiterEmail="d.kim@apple.com"
        confidenceScore="98%"
      />

      {/* Display C: Elena Rostova (Right) */}
      <StudioDisplay
        position={[3.9, 0, -0.85]}
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
