import * as THREE from 'three'

export interface StationConfig {
  id: string
  number: string
  label: string
  subtitle: string
  position: [number, number, number]
  rotation: [number, number, number]
  cameraPos: [number, number, number]
  cameraLookAt: [number, number, number]
}

// 8 Stations distributed continuously along the 3D corridor (Z = 0 down to Z = -126)
export const stationsConfig: StationConfig[] = [
  {
    id: 'hero',
    number: '01',
    label: 'Hero',
    subtitle: 'The 3D Sheets Pipeline',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    cameraPos: [0, 1.2, 9],
    cameraLookAt: [0, 0, 0],
  },
  {
    id: 'highlights',
    number: '02',
    label: 'Highlights',
    subtitle: 'Turn experience into outreach',
    position: [0, 0.1, -18],
    rotation: [0.02, -0.04, 0.01],
    cameraPos: [0, 0.7, -10],
    cameraLookAt: [0, 0.1, -18],
  },
  {
    id: 'discovery',
    number: '03',
    label: 'Find Recruiters',
    subtitle: 'Verified & predicted contacts',
    position: [0.4, 0.1, -36],
    rotation: [-0.02, 0.04, -0.01],
    cameraPos: [0.2, 0.6, -28],
    cameraLookAt: [0.4, 0.1, -36],
  },
  {
    id: 'personalize',
    number: '04',
    label: 'Personalise',
    subtitle: 'AI writes emails that sound like you',
    position: [-0.4, 0.1, -54],
    rotation: [0.02, -0.04, 0.01],
    cameraPos: [-0.2, 0.6, -46],
    cameraLookAt: [-0.4, 0.1, -54],
  },
  {
    id: 'send',
    number: '05',
    label: 'Send via Gmail',
    subtitle: 'One click, 40 seconds',
    position: [0, 0.2, -72],
    rotation: [0.03, 0, 0],
    cameraPos: [0, 0.7, -64],
    cameraLookAt: [0, 0.2, -72],
  },
  {
    id: 'tracking',
    number: '06',
    label: 'Reply Tracking',
    subtitle: 'Day 3 & 4 follow-up lifecycle',
    position: [0.3, 0.1, -90],
    rotation: [-0.02, 0.03, 0],
    cameraPos: [0.2, 0.6, -82],
    cameraLookAt: [0.3, 0.1, -90],
  },
  {
    id: 'refund',
    number: '07',
    label: 'Bounce Refund',
    subtitle: '100% hard bounce credit return',
    position: [-0.3, 0.1, -108],
    rotation: [0.02, -0.03, 0],
    cameraPos: [-0.2, 0.6, -100],
    cameraLookAt: [-0.3, 0.1, -108],
  },
  {
    id: 'pricing-settle',
    number: '08',
    label: 'Pricing Settle',
    subtitle: 'Transition to decision ground',
    position: [0, -0.3, -126],
    rotation: [0.04, 0, 0],
    cameraPos: [0, 0.4, -118],
    cameraLookAt: [0, -0.3, -126],
  },
]

// 3D Spline Path points that thread directly through all stations in 3D world space
export const splinePoints = stationsConfig.map((s) => {
  return new THREE.Vector3(s.position[0], s.position[1] + 1.2, s.position[2])
})

export const continuousSplineCurve = new THREE.CatmullRomCurve3(splinePoints, false, 'catmullrom', 0.5)
