'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { stationsConfig } from '@/data/scene-config'

interface CameraRigProps {
  scrollProgress: number
}

export default function CameraRig({ scrollProgress }: CameraRigProps) {
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(({ camera, pointer }) => {
    const total = stationsConfig.length - 1
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress || 0))
    const exactIndex = clampedProgress * total
    const currentIndex = Math.min(total - 1, Math.floor(exactIndex))
    const nextIndex = Math.min(total, currentIndex + 1)
    const fraction = exactIndex - currentIndex

    // Smooth cubic easing for transition between waypoints
    const easedFraction = fraction * fraction * (3 - 2 * fraction)

    const pA = stationsConfig[currentIndex].cameraPos
    const pB = stationsConfig[nextIndex].cameraPos
    const lA = stationsConfig[currentIndex].cameraLookAt
    const lB = stationsConfig[nextIndex].cameraLookAt

    // Safe pointer coordinates (avoid NaN if pointer hasn't moved yet or in headless)
    const px = typeof pointer?.x === 'number' && !isNaN(pointer.x) ? pointer.x : 0
    const py = typeof pointer?.y === 'number' && !isNaN(pointer.y) ? pointer.y : 0

    // Interpolate camera position with subtle mouse parallax
    const targetX = pA[0] + (pB[0] - pA[0]) * easedFraction + px * 0.25
    const targetY = pA[1] + (pB[1] - pA[1]) * easedFraction + py * 0.18
    const targetZ = pA[2] + (pB[2] - pA[2]) * easedFraction

    // Interpolate camera lookAt
    const lookX = lA[0] + (lB[0] - lA[0]) * easedFraction
    const lookY = lA[1] + (lB[1] - lA[1]) * easedFraction
    const lookZ = lA[2] + (lB[2] - lA[2]) * easedFraction

    // Smooth lerp to targets
    camera.position.x += (targetX - camera.position.x) * 0.08
    camera.position.y += (targetY - camera.position.y) * 0.08
    camera.position.z += (targetZ - camera.position.z) * 0.08

    currentLookAt.current.x += (lookX - currentLookAt.current.x) * 0.08
    currentLookAt.current.y += (lookY - currentLookAt.current.y) * 0.08
    currentLookAt.current.z += (lookZ - currentLookAt.current.z) * 0.08

    camera.lookAt(currentLookAt.current)
  })

  return null
}
