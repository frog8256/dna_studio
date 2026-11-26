import { createContext, useContext, useLayoutEffect, useRef, type ReactNode } from 'react'
import { paintSeason, sceneWidth, sceneHeight } from './landscape-paint'

const LandscapePhase = createContext(0)

export function SeasonalScene({ phase, children }: { phase: number; children: ReactNode }) {
  return (
    <LandscapePhase.Provider value={phase}>
      <SeasonalLandscape />
      {children}
    </LandscapePhase.Provider>
  )
}

export function SeasonalLandscape() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const phase = useContext(LandscapePhase)
  useLayoutEffect(() => {
    const context = canvas.current?.getContext('2d')
    if (context) paintSeason(context, phase)
  }, [phase])
  return (
    <div className="seasonal-landscape" aria-hidden="true">
      <canvas ref={canvas} width={sceneWidth} height={sceneHeight} />
    </div>
  )
}
