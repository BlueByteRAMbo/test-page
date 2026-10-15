'use client'

import React, { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'

/**
 * Apple/Linear Studio Lighting & Procedural Environment Rig.
 * - Procedural HDR-free Environment with Lightformers for realistic metal reflections
 * - Rebalanced key, fill and ambient lights ensuring warm white paper (#fbfaf7)
 * - Controlled scene.environmentIntensity for soft gradients and crisp highlights
 */
export default function Stage() {
  const { scene } = useThree()

  useEffect(() => {
    // Tune environment intensity for balanced metal reflections and paper whites
    if ('environmentIntensity' in scene) {
      ;(scene as unknown as { environmentIntensity: number }).environmentIntensity = 0.75
    }
  }, [scene])

  return (
    <>
      {/* Procedural Studio Environment for Physical Metal Reflections */}
      <Environment resolution={256} frames={1}>
        <Lightformer
          form="rect"
          intensity={2.2}
          color="#fff4e0"
          position={[-4, 5, 4]}
          scale={[8, 4, 1]}
          onUpdate={(s) => s.lookAt(0, 0, 0)}
        />
        <Lightformer
          form="rect"
          intensity={1.2}
          color="#e8f1ff"
          position={[5, 2, 3]}
          scale={[3, 6, 1]}
          onUpdate={(s) => s.lookAt(0, 0, 0)}
        />
        <Lightformer
          form="ring"
          intensity={0.8}
          color="#ffffff"
          position={[0, -3, 4]}
          scale={4}
          onUpdate={(s) => s.lookAt(0, 0, 0)}
        />
      </Environment>

      {/* Rebalanced Frontal / Key Studio Light with Soft Shadows */}
      <directionalLight
        position={[3, 5, 5]}
        intensity={1.1}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={18}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-bias={-0.0001}
      />

      {/* Warm Fill Light (Diffuses Paper Creases) */}
      <directionalLight position={[-4, 3, 3]} intensity={0.5} color="#fffbeb" />

      {/* Subtle Cool Rim Light */}
      <directionalLight position={[0, -2, -3]} intensity={0.35} color="#e0f2fe" />

      {/* Studio Emerald Specular Rim (Highlights Edges & Chamfers) */}
      <directionalLight position={[4, -1, 2]} intensity={0.25} color="#dcfce7" />

      {/* Ambient Fill Light */}
      <ambientLight intensity={0.32} color="#fcfbf9" />
    </>
  )
}
