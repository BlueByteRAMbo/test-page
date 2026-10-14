import { create } from 'zustand'

/**
 * Mutable singleton scroll state.
 * Read directly in R3F `useFrame` callbacks without triggering React component re-renders.
 */
export interface ScrollState {
  /** Normalized scroll progress across the entire 3D stage [0, 1] */
  progress: number
  /** Current scroll velocity in px/s or normalized units */
  velocity: number
  /** Active chapter index [0, 6] */
  chapter: number
}

export const scrollState: ScrollState = {
  progress: 0,
  velocity: 0,
  chapter: 0,
}

/**
 * Clamps a number between 0 and 1.
 */
export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

/**
 * Computes normalized progress [0, 1] within a specific chapter range [start, end].
 * @param range [start, end] where 0 <= start < end <= 1
 * @param customProgress Optional override; defaults to current `scrollState.progress`
 */
export function chapterProgress(range: [number, number], customProgress?: number): number {
  const p = customProgress !== undefined ? customProgress : scrollState.progress
  const [start, end] = range
  if (end <= start) return 0
  return clamp01((p - start) / (end - start))
}

/**
 * Minimal Zustand store for UI components (Overlay, ProgressRail) that ONLY re-renders
 * when the active chapter changes, avoiding per-tick re-renders.
 */
interface ScrollUIStore {
  activeChapter: number
  isCanvasReady: boolean
  setActiveChapter: (chapter: number) => void
  setIsCanvasReady: (ready: boolean) => void
}

export const useScrollStore = create<ScrollUIStore>((set) => ({
  activeChapter: 0,
  isCanvasReady: false,
  setActiveChapter: (chapter: number) =>
    set((state) => (state.activeChapter === chapter ? state : { activeChapter: chapter })),
  setIsCanvasReady: (ready: boolean) =>
    set((state) => (state.isCanvasReady === ready ? state : { isCanvasReady: ready })),
}))
