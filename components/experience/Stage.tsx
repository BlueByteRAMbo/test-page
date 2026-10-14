'use client'

import React from 'react'

export default function Stage() {
  return (
    <>
      {/* Frontal / Key Studio Light for rich material illumination */}
      <directionalLight position={[2, 4, 6]} intensity={1.4} color="#ffffff" />

      {/* Warm Upper Key Light */}
      <directionalLight position={[6, 8, 4]} intensity={1.1} color="#fffaf0" />

      {/* Soft Cool Rim Light */}
      <directionalLight position={[-5, 3, -2]} intensity={0.6} color="#e2e8f0" />

      {/* Studio Ambient Illumination */}
      <ambientLight intensity={0.9} color="#ffffff" />
    </>
  )
}
