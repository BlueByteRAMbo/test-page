'use client'

import React from 'react'

/**
 * Apple/Linear Studio Lighting & Environment Rig.
 * - Key directional light with soft high-res shadows
 * - Warm ambient fill for balanced paper cardstock and metalness
 * - Subtle emerald rim accent light highlighting origami creases and chamfers
 */
export default function Stage() {
  return (
    <>
      {/* Frontal / Key Studio Light with Soft Shadows */}
      <directionalLight
        position={[3, 5, 5]}
        intensity={1.6}
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
      <directionalLight position={[-4, 3, 3]} intensity={0.9} color="#fffbeb" />

      {/* Subtle Cool Rim Light (Separates Meshes from Background) */}
      <directionalLight position={[0, -2, -3]} intensity={0.5} color="#e0f2fe" />

      {/* Studio Emerald Specular Rim (Highlights Edges & Chamfers) */}
      <directionalLight position={[4, -1, 2]} intensity={0.35} color="#dcfce7" />

      {/* Balanced Studio Ambient Light */}
      <ambientLight intensity={1.05} color="#fcfbf9" />
    </>
  )
}
