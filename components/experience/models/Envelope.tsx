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
 * Handcrafted 3D Cotton Cardstock Envelope.
 * Real pocket with interior throat lining, hinged top triangular flap,
 * and lathed red wax medallion with embossed 'M' seal.
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

  const paperMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#fdfcf9',
        roughness: 0.82,
        metalness: 0.02,
        side: THREE.DoubleSide,
      }),
    []
  )

  const interiorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ece9e0',
        roughness: 0.9,
        metalness: 0.0,
      }),
    []
  )

  const waxMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#b91c1c',
        roughness: 0.32,
        metalness: 0.15,
      }),
    []
  )

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#d97706',
        roughness: 0.25,
        metalness: 0.8,
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

        {/* 7. Lathed Wax Seal Medallion attached to the tip of the flap */}
        <group ref={sealGroupRef} position={[0, -0.62, 0.015]} visible={sealOpacity > 0.01}>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={waxMaterial} castShadow>
            <cylinderGeometry args={[0.16, 0.16, 0.035, 32]} />
          </mesh>

          <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]} material={waxMaterial}>
            <torusGeometry args={[0.13, 0.02, 16, 32]} />
          </mesh>

          <mesh position={[0, 0, 0.022]} material={goldMaterial}>
            <boxGeometry args={[0.025, 0.12, 0.01]} />
          </mesh>
          <mesh position={[-0.045, 0, 0.022]} material={goldMaterial}>
            <boxGeometry args={[0.02, 0.12, 0.01]} />
          </mesh>
          <mesh position={[0.045, 0, 0.022]} material={goldMaterial}>
            <boxGeometry args={[0.02, 0.12, 0.01]} />
          </mesh>
        </group>
      </group>
    </group>
  )
})

export default Envelope
