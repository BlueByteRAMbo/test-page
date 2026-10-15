'use client'

import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import { scrollState, clamp01 } from '@/lib/scroll-store'
import { CHAPTERS } from '@/data/chapters'

export default function CameraRig() {
  const { size } = useThree()
  const lookAtRef = useRef(new THREE.Vector3(0, 0, 0))
  const targetLookAt = useMemo(() => new THREE.Vector3(), [])
  const targetPos = useMemo(() => new THREE.Vector3(), [])

  // Derive dynamic waypoints from safe area bounds for desktop or stacked mobile layout
  const waypoints = useMemo(() => {
    const isMobile = size.width < 1024

    // Safe area rectangle in pixels
    const safe = isMobile
      ? {
          left: 16,
          right: Math.max(32, size.width - 16),
          top: 72,
          bottom: Math.max(140, size.height * 0.52),
        }
      : {
          left: Math.min(560, size.width * 0.40 + 24),
          right: Math.max(600, size.width - 96),
          top: 96,
          bottom: Math.max(200, size.height - 72),
        }

    const safeW = Math.max(100, safe.right - safe.left)
    const safeH = Math.max(100, safe.bottom - safe.top)
    const safeCx = (safe.left + safe.right) / 2
    const safeCy = (safe.top + safe.bottom) / 2

    return CHAPTERS.map((ch) => {
      const bounds = ch.bounds || [2.4, 1.8]
      const fov = ch.camera.fov || 39
      const t = Math.tan(THREE.MathUtils.degToRad(fov / 2))

      // 6% margin to guarantee actor stays completely inside the safe rectangle
      const d = (1.06 * size.height * Math.max(bounds[1] / safeH, bounds[0] / safeW)) / (2 * t)
      const pxPerUnit = size.height / (2 * d * t)

      // Screen to 3D world offsets
      const dx = (safeCx - size.width / 2) / pxPerUnit
      const dy = (safeCy - size.height / 2) / pxPerUnit

      const lookX = ch.actorPosition[0] - dx
      const lookY = ch.actorPosition[1] + dy

      return {
        progress: (ch.range[0] + ch.range[1]) / 2,
        position: new THREE.Vector3(lookX, lookY, d),
        target: new THREE.Vector3(lookX, lookY, 0),
        fov,
      }
    })
  }, [size.width, size.height])

  useFrame((state, delta) => {
    const p = clamp01(scrollState.progress)

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

    const desiredFov = THREE.MathUtils.lerp(current.fov, next.fov, smoothT)

    // Subtle Apple-like pointer parallax
    const parallaxX = state.pointer.x * 0.12
    const parallaxY = state.pointer.y * 0.08
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
