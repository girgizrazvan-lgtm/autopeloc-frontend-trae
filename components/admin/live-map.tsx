"use client"

import { useMemo } from "react"

type Point = {
  lat?: number | null
  lng?: number | null
  label?: string
}

function projectEquirect(lat: number, lng: number, width: number, height: number) {
  const x = ((lng + 180) / 360) * width
  const y = ((90 - lat) / 180) * height
  return { x, y }
}

export function LiveMap({ points = [] }: { points: Point[] }) {
  const size = { width: 1000, height: 500 }
  const dots = useMemo(() => {
    return points
      .filter((p) => typeof p.lat === "number" && typeof p.lng === "number")
      .map((p, idx) => {
        const { x, y } = projectEquirect(p.lat as number, p.lng as number, size.width, size.height)
        return { x, y, label: p.label || "" }
      })
  }, [points])

  return (
    <div className="w-full overflow-hidden rounded-xl border bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <svg viewBox={`0 0 ${size.width} ${size.height}`} className="w-full h-[320px]">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width={size.width} height={size.height} fill="url(#glow)" opacity="0.06" />

        {/* Simple lat/lon grid */}
        {[-60, -30, 0, 30, 60].map((lat, i) => {
          const y = ((90 - lat) / 180) * size.height
          return <line key={`lat-${i}`} x1={0} y1={y} x2={size.width} y2={y} stroke="#94a3b8" strokeOpacity={0.15} strokeWidth={1} />
        })}
        {[-120, -60, 0, 60, 120].map((lng, i) => {
          const x = ((lng + 180) / 360) * size.width
          return <line key={`lon-${i}`} x1={x} y1={0} x2={x} y2={size.height} stroke="#94a3b8" strokeOpacity={0.15} strokeWidth={1} />
        })}

        {/* Label when empty */}
        {dots.length === 0 && (
          <text x={size.width / 2} y={size.height / 2} textAnchor="middle" fill="#64748b" fillOpacity={0.6} fontSize={18}>
            Harta vizitatori (live)
          </text>
        )}
        {dots.map((d, i) => (
          <g key={i}>
            <circle cx={d.x} cy={d.y} r={6} className="fill-teal-500 opacity-80">
              <animate attributeName="r" values="4;7;4" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx={d.x} cy={d.y} r={12} fill="none" stroke="#14b8a6" strokeOpacity="0.3">
              <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  )
}
