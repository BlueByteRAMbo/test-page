'use client'

import React, { forwardRef, useMemo, useImperativeHandle, useRef } from 'react'
import * as THREE from 'three'

export interface EnvelopeHandle {
  setFlapAngle: (angle: number) => void
  setSealOpacity: (opacity: number) => void
}

interface EnvelopeProps {
  flapAngle?: number
  sealOpacity?: number
  hoverY?: number
  hoverRotY?: number
  hoverRotZ?: number
}

/**
 * Handcrafted 3D Warm White Cotton Cardstock Envelope.
 * Real interior throat pocket, hinged triangular flap,
 * and deep green (#14532d) satin wax medallion with an embossed 'E' monogram.
 */
const Envelope = forwardRef<EnvelopeHandle, EnvelopeProps>(function Envelope(
  {
    flapAngle = 0,
    sealOpacity = 1,
    hoverY = 0,
    hoverRotY = 0,
    hoverRotZ = 0,
  },
  ref
) {
  const flapGroupRef = useRef<THREE.Group>(null)
  const sealGroupRef = useRef<THREE.Group>(null)

  useImperativeHandle(ref, () => ({
    setFlapAngle: (angle: number) => {
      if (flapGroupRef.current) {
        flapGroupRef.current.rotation.x = -angle
      }
    },
    setSealOpacity: (opacity: number) => {
      if (sealGroupRef.current) {
        sealGroupRef.current.visible = opacity > 0.01
      }
    },
  }))

  // Warm white 300gsm cotton paper material
  const paperMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#faf9f5',
        roughness: 0.88,
        metalness: 0.02,
        side: THREE.DoubleSide,
      }),
    []
  )

  const interiorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ece9e0',
        roughness: 0.92,
        metalness: 0.0,
      }),
    []
  )

  // Satin deep emerald wax material (#14532d)
  const waxMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#14532d',
        roughness: 0.45,
        metalness: 0.08,
      }),
    []
  )

  // Warm embossed gold monogram material
  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#eab308',
        roughness: 0.3,
        metalness: 0.85,
      }),
    []
  )

  const flapGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-0.9, 0)
    shape.lineTo(0.9, 0)
    shape.lineTo(0, -0.62)
    shape.closePath()
    return new THREE.ShapeGeometry(shape)
  }, [])

  const bottomFlapGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-0.9, -0.6)
    shape.lineTo(0.9, -0.6)
    shape.lineTo(0, 0.05)
    shape.closePath()
    return new THREE.ShapeGeometry(shape)
  }, [])

  const leftFlapGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-0.9, -0.6)
    shape.lineTo(-0.9, 0.6)
    shape.lineTo(-0.25, 0.0)
    shape.closePath()
    return new THREE.ShapeGeometry(shape)
  }, [])

  const rightFlapGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0.9, -0.6)
    shape.lineTo(0.9, 0.6)
    shape.lineTo(0.25, 0.0)
    shape.closePath()
    return new THREE.ShapeGeometry(shape)
  }, [])

  return (
    <group position={[0, hoverY, 0]} rotation={[0, hoverRotY, hoverRotZ]}>
      {/* 1. Back Plate (Exterior) */}
      <mesh position={[0, 0, -0.012]} material={paperMaterial} castShadow receiveShadow>
        <planeGeometry args={[1.8, 1.2]} />
      </mesh>

      {/* 2. Interior Lining (Darker paper inside throat) */}
      <mesh position={[0, 0, -0.01]} material={interiorMaterial}>
        <planeGeometry args={[1.76, 1.16]} />
      </mesh>

      {/* 3. Side Spacers (Envelope Wall Thickness) */}
      <mesh position={[-0.89, 0, 0]} material={paperMaterial}>
        <boxGeometry args={[0.02, 1.2, 0.024]} />
      </mesh>
      <mesh position={[0.89, 0, 0]} material={paperMaterial}>
        <boxGeometry args={[0.02, 1.2, 0.024]} />
      </mesh>
      <mesh position={[0, -0.59, 0]} material={paperMaterial}>
        <boxGeometry args={[1.8, 0.02, 0.024]} />
      </mesh>

      {/* 4. Left and Right Fold Flaps */}
      <mesh position={[0, 0, 0.012]} geometry={leftFlapGeometry} material={paperMaterial} />
      <mesh position={[0, 0, 0.013]} geometry={rightFlapGeometry} material={paperMaterial} />

      {/* 5. Front Bottom Flap */}
      <mesh
        position={[0, 0, 0.015]}
        geometry={bottomFlapGeometry}
        material={paperMaterial}
        castShadow
        receiveShadow
      />

      {/* 6. Hinged Top Triangular Flap */}
      <group
        ref={flapGroupRef}
        position={[0, 0.6, 0.014]}
        rotation={[-flapAngle, 0, 0]}
      >
        <mesh geometry={flapGeometry} material={paperMaterial} castShadow receiveShadow />

        {/* 7. Deep Emerald Satin Wax Seal Medallion with embossed 'E' monogram */}
        <group ref={sealGroupRef} position={[0, -0.62, 0.015]} visible={sealOpacity > 0.01}>
          {/* Main Wax Body */}
          <mesh rotation={[Math.PI / 2, 0, 0]} material={waxMaterial} castShadow>
            <cylinderGeometry args={[0.16, 0.165, 0.035, 48]} />
          </mesh>

          {/* Organic Wax Rim */}
          <mesh position={[0, 0, 0.018]} rotation={[Math.PI / 2, 0, 0]} material={waxMaterial}>
            <torusGeometry args={[0.135, 0.025, 24, 48]} />
          </mesh>

          {/* Inner Wax Monogram Bed */}
          <mesh position={[0, 0, 0.016]}>
            <circleGeometry args={[0.115, 32]} />
            <meshStandardMaterial color="#0f3d20" roughness={0.5} />
          </mesh>

          {/* Embossed 'E' Monogram in warm gold */}
          <group position={[0, 0, 0.024]}>
            {/* Vertical Stem */}
            <mesh position={[-0.032, 0, 0]} material={goldMaterial}>
              <boxGeometry args={[0.022, 0.12, 0.008]} />
            </mesh>
            {/* Top Arm */}
            <mesh position={[0.012, 0.048, 0]} material={goldMaterial}>
              <boxGeometry args={[0.066, 0.02, 0.008]} />
            </mesh>
            {/* Middle Arm */}
            <mesh position={[0.002, 0, 0]} material={goldMaterial}>
              <boxGeometry args={[0.046, 0.018, 0.008]} />
            </mesh>
            {/* Bottom Arm */}
            <mesh position={[0.012, -0.048, 0]} material={goldMaterial}>
              <boxGeometry args={[0.066, 0.02, 0.008]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
})

export default Envelope
