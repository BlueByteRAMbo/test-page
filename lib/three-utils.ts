import * as THREE from 'three'

/**
 * Creates a THREE.CanvasTexture with explicit sRGB color space tagging,
 * correct mipmapping and linear filtering.
 * Prevents in-scene canvas text and UI from being treated as linear
 * and appearing washed-out or pale.
 */
export function makeCanvasTexture(canvas: HTMLCanvasElement, anisotropy = 8): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = anisotropy
  tex.generateMipmaps = true
  tex.minFilter = THREE.LinearMipmapLinearFilter
  tex.magFilter = THREE.LinearFilter
  return tex
}
