'use client'

import React from 'react'

export default function Loader() {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#f4f3ef] transition-opacity duration-500">
      <div className="flex flex-col items-center gap-3">
        <div className="h-0.5 w-32 overflow-hidden rounded-full bg-black/10">
          <div className="h-full w-full origin-left animate-pulse bg-[#16a34a]" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-widest text-[#626660]">
          Loading 3D Experience
        </span>
      </div>
    </div>
  )
}
