'use client'

import React, { useMemo } from 'react'
import * as THREE from 'three'

interface OrigamiPlaneProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  opacity?: number
}

/**
 * Authentic 3D Faceted Origami Paper Plane.
 * Built with BufferGeometry, dihedral wing angles, and underbody keel fold.
 */
export default function OrigamiPlane({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  opacity = 1,
}: OrigamiPlaneProps) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()

    // Key vertices of folded paper airplane
    // Nose is at +Z, Tail at -Z
    const nose = [0, 0.02, 1.1]
    const tailTop = [0, 0.04, -0.7]
    const tailBottom = [0, -0.22, -0.6]

    const leftCrease = [-0.12, 0.02, -0.65]
    const rightCrease = [0.12, 0.02, -0.65]

    const leftTip = [-1.05, 0.14, -0.6]
    const rightTip = [1.05, 0.14, -0.6]

    // Construct triangles:
    // Left Wing (nose, leftTip, leftCrease)
    // Right Wing (nose, rightCrease, rightTip)
    // Left Fuselage Keel (nose, leftCrease, tailBottom)
    // Right Fuselage Keel (nose, tailBottom, rightCrease)
    // Center Spine (nose, tailTop, leftCrease)
    // Center Spine Right (nose, rightCrease, tailTop)

    const vertices = new Float32Array([
      // Left Wing
      ...nose, ...leftTip, ...leftCrease,
      // Right Wing
      ...nose, ...rightCrease, ...rightTip,
      // Left Keel
      ...nose, ...leftCrease, ...tailBottom,
      // Right Keel
      ...nose, ...tailBottom, ...rightCrease,
      // Center Top Left
      ...nose, ...tailTop, ...leftCrease,
      // Center Top Right
      ...nose, ...rightCrease, ...tailTop,
    ])

    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    geo.computeVertexNormals()
    return geo
  }, [])

  const paperMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#fdfcf9',
        roughness: 0.8,
        metalness: 0.05,
        side: THREE.DoubleSide,
        transparent: opacity < 0.99,
        opacity,
      }),
    [opacity]
  )

  const creaseMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: '#d1d5db',
        transparent: opacity < 0.99,
        opacity: opacity * 0.5,
      }),
    [opacity]
  )

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh geometry={geometry} material={paperMaterial} castShadow receiveShadow />

      {/* Subtle paper crease line along center keel */}
      <lineSegments>
        <edgesGeometry args={[geometry, 25]} />
        <primitive object={creaseMaterial} attach="material" />
      </lineSegments>
    </group>
  )
}
