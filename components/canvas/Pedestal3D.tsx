'use client'

import React from 'react'
import * as THREE from 'three'
import { stationsConfig } from '@/data/scene-config'

export default function Pedestal3D() {
  return (
    <group>
      {/* 3D Platform Pedestals placed under each station */}
      {stationsConfig.map((station) => (
        <group
          key={station.id}
          position={[station.position[0], station.position[1] - 1.9, station.position[2]]}
        >
          {/* Main Beveled Pedestal Disk */}
          <mesh receiveShadow>
            <cylinderGeometry args={[2.8, 3.2, 0.12, 36]} />
            <meshStandardMaterial
              color="#fbfbfa"
              roughness={0.4}
              metalness={0.05}
            />
          </mesh>

          {/* Emerald Ambient Light Ring on Pedestal Rim */}
          <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.5, 2.75, 36]} />
            <meshBasicMaterial
              color="#16a34a"
              transparent
              opacity={0.35}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Underglow Point Light */}
          <pointLight
            position={[0, -0.3, 0]}
            color="#16a34a"
            intensity={1.2}
            distance={5}
            decay={2}
          />
        </group>
      ))}

      {/* Infinite/Wide Ambient Ground Plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.4, -35]}
        receiveShadow
      >
        <planeGeometry args={[120, 160]} />
        <meshStandardMaterial
          color="#f4f3ef"
          roughness={0.8}
          metalness={0.02}
        />
      </mesh>
    </group>
  )
}
