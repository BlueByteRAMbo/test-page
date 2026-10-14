'use client'

import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import { scrollState, clamp01 } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'

export default function CameraRig() {
  const { viewport } = useThree()
  const lookAtRef = useRef(new THREE.Vector3(0, 0, 0))
  const targetLookAt = useMemo(() => new THREE.Vector3(), [])
  const targetPos = useMemo(() => new THREE.Vector3(), [])

  // Calculate waypoints and their midpoint progress values
  const waypoints = useMemo(() => {
    return CHAPTERS.map((ch) => ({
      progress: (ch.range[0] + ch.range[1]) / 2,
      position: new THREE.Vector3(...ch.camera.position),
      target: new THREE.Vector3(...ch.camera.target),
      fov: ch.camera.fov,
    }))
  }, [])

  useFrame((state, delta) => {
    const p = clamp01(scrollState.progress)
    const isMobile = viewport.width < 5.5 // Rough three.js unit check for mobile aspect

    // Find the two waypoints we are currently between
    let i = 0
    while (i < waypoints.length - 1 && p > waypoints[i + 1].progress) {
      i++
    }

    const current = waypoints[i]
    const next = waypoints[Math.min(i + 1, waypoints.length - 1)]

    const span = Math.max(0.0001, next.progress - current.progress)
    const localT = i === waypoints.length - 1 ? 1 : clamp01((p - current.progress) / span)

    // Smooth cubic Hermite ease
    const smoothT = localT * localT * (3 - 2 * localT)

    // Interpolate base position and target
    targetPos.lerpVectors(current.position, next.position, smoothT)
    targetLookAt.lerpVectors(current.target, next.target, smoothT)

    let desiredFov = THREE.MathUtils.lerp(current.fov, next.fov, smoothT)

    // Mobile adjustments: center horizontally on actor (x = 1.1) and frame in upper 55%
    if (isMobile) {
      desiredFov += 6
      targetPos.x = 1.1
      targetPos.y = -0.6
      targetPos.z += 0.8
      targetLookAt.x = 1.1
      targetLookAt.y = 0.0
    }

    // Pointer Parallax (Restrained to <= 0.18 units for subtle Apple-like depth)
    const parallaxX = state.pointer.x * 0.15
    const parallaxY = state.pointer.y * 0.12
    targetPos.x += parallaxX
    targetPos.y += parallaxY

    // Smooth Damping on Camera Position
    easing.damp3(state.camera.position, targetPos, 0.22, delta)

    // Smooth Damping on LookAt Target
    easing.damp3(lookAtRef.current, targetLookAt, 0.22, delta)
    state.camera.lookAt(lookAtRef.current)

    // Smooth Damping on FOV
    if ('fov' in state.camera) {
      const perspectiveCam = state.camera as THREE.PerspectiveCamera
      if (Math.abs(perspectiveCam.fov - desiredFov) > 0.05) {
        easing.damp(perspectiveCam, 'fov', desiredFov, 0.22, delta)
        perspectiveCam.updateProjectionMatrix()
      }
    }
  })

  return null
}
