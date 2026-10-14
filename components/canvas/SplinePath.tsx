'use client'

import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { continuousSplineCurve } from '@/data/scene-config'

interface SplinePathProps {
  scrollProgress: number
}

export default function SplinePath({ scrollProgress }: SplinePathProps) {
  const markerRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  // Generate 3D Tube Geometry from continuous CatmullRom spline
  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(continuousSplineCurve, 200, 0.045, 12, false)
  }, [])

  useFrame((state, delta) => {
    if (!markerRef.current) return

    // Clamp progress between 0 and 1
    const clamped = Math.max(0, Math.min(1, scrollProgress))
    const currentPoint = continuousSplineCurve.getPointAt(clamped)
    const tangent = continuousSplineCurve.getTangentAt(clamped)

    // Smoothly update marker position
    markerRef.current.position.copy(currentPoint)

    // Orient marker along tangent vector
    markerRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent)

    // Spin outer pulse ring
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 2.5
    }
  })

  return (
    <group>
      {/* 3D Glowing Emerald Spline Tube */}
      <mesh geometry={tubeGeometry}>
        <meshStandardMaterial
          color="#16a34a"
          emissive="#15803d"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.1}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* 3D Traveling Energy Marker */}
      <group ref={markerRef}>
        {/* Core glowing orb */}
        <mesh>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#10b981"
            emissiveIntensity={2.5}
            roughness={0.1}
          />
        </mesh>

        {/* Outer glowing halo ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.26, 0.36, 32]} />
          <meshBasicMaterial
            color="#34d399"
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Dynamic Point Light that illuminates surrounding 3D paper sheets */}
        <pointLight color="#10b981" intensity={2.2} distance={8} decay={2} />
      </group>
    </group>
  )
}
