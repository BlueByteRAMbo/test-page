'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import CameraRig from './CameraRig'
import SplinePath from './SplinePath'
import FlyingEnvelopes from './FlyingEnvelopes'
import Pedestal3D from './Pedestal3D'
import Particles3D from './Particles3D'
import Stations3D from './Stations3D'

interface Scene3DProps {
  scrollProgress: number
  activeStationIndex: number
}

export default function Scene3D({ scrollProgress, activeStationIndex }: Scene3DProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 1.8, 11], fov: 46, near: 0.1, far: 200 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.8]}
        shadows
      >
        <Suspense fallback={null}>
          {/* Lighting Environment */}
          <ambientLight intensity={1.1} color="#ffffff" />
          <directionalLight
            position={[6, 12, 10]}
            intensity={1.4}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            color="#fffef8"
          />
          <directionalLight position={[-6, 8, -10]} intensity={0.5} color="#dcfce7" />
          <hemisphereLight args={['#ffffff', '#f4f3ef', 0.8]} />

          {/* 3D Camera Rig Driven by Scroll */}
          <CameraRig scrollProgress={scrollProgress} />

          {/* Continuous Glowing Emerald Spline Path & Marker */}
          <SplinePath scrollProgress={scrollProgress} />

          {/* Floating Origami Envelopes */}
          <FlyingEnvelopes scrollProgress={scrollProgress} />

          {/* 3D Floating Pedestals & Ground */}
          <Pedestal3D />

          {/* 3D Atmosphere Particles */}
          <Particles3D />

          {/* 8 Interconnected 3D Stations from Hero to Pricing */}
          <Stations3D activeStationIndex={activeStationIndex} />
        </Suspense>
      </Canvas>
    </div>
  )
}
