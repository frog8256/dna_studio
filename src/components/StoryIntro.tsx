import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import { planTo } from '../data/brand'
import { scenePhase } from '../data/story'
import { useLanguage } from '../i18n'
import './story-intro.css'

// Pen lifts and centerlines in the original 840 × 270 wordmark. Only the mask
// is drawn; the visible ink and the mark on the Windows desktop use the same art.
const strokes = [
  { end: .10, width: 36, d: 'M70 56 C55 104 38 185 26 252' },
  { end: .25, width: 40, d: 'M16 75 C60 40 129 30 156 52 C209 95 139 159 44 173' },
  { end: .45, width: 37, d: 'M195 182 C226 142 259 68 255 23 C251 2 227 29 213 81 C197 141 173 234 211 231 C234 231 252 199 269 174' },
  { end: .59, width: 39, d: 'M350 128 C319 115 277 148 268 187 C258 222 285 233 313 195 C330 173 341 142 351 128 C344 154 327 213 356 207 C380 204 397 157 410 123' },
  { end: .73, width: 39, d: 'M418 117 C415 140 406 189 410 209 C426 175 458 109 482 111 C498 115 472 183 491 194 C510 203 533 183 544 168' },
  { end: .84, width: 37, d: 'M660 34 C642 69 615 147 624 187 C630 219 679 185 714 120' },
  { end: .88, width: 30, d: 'M593 99 Q642 84 696 79' },
  { end: 1, width: 37, d: 'M747 92 C721 94 695 160 722 185 C751 211 789 156 784 119 C781 87 757 74 744 96 C732 118 775 150 828 103' },
]

function Signature({ written }: { written: number }) {
  const mask = useId()
  return (
    <svg viewBox="0 0 840 270" aria-hidden="true" className="intro-signature">
      <defs>
        <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="840" height="270">
          {strokes.map((stroke, i) => {
            const start = i === 0 ? 0 : strokes[i - 1].end
            const amount = Math.max(0, Math.min(1, (written - start) / (stroke.end - start)))
            return <path key={stroke.end} d={stroke.d} fill="none" stroke="white" strokeWidth={stroke.width}
              strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1 1"
              strokeDashoffset={1 - amount} visibility={amount > 0 ? 'visible' : 'hidden'} />
          })}
        </mask>
      </defs>
      {written < 1 && <image href={planTo.wordmark} width="840" height="270" opacity=".10" />}
      <image href={planTo.wordmark} width="840" height="270" opacity={Math.min(1, written * 150)}
        mask={written < 1 ? `url(#${mask})` : undefined} />
    </svg>
  )
}

type IntroProps = {
  progress: number
  reducedMotion: boolean
  destination: RefObject<HTMLImageElement | null>
  stage: RefObject<HTMLDivElement | null>
  onSkip: () => void
}

export function StoryIntro({ progress, reducedMotion, destination, stage, onSkip }: IntroProps) {
  const { t } = useLanguage()
  const origin = useRef<HTMLDivElement>(null)
  const [landing, setLanding] = useState({ x: 0, y: 0, scale: 1 })

  // Both frames are in the same sticky section. Measure only when their layout
  // changes, including when a translated caption changes the available height.
  useLayoutEffect(() => {
    const source = origin.current
    const target = destination.current
    const desktop = stage.current
    if (!source || !target || !desktop || reducedMotion) return
    const measure = () => {
      const from = source.getBoundingClientRect()
      const to = target.getBoundingClientRect()
      if (!from.width || !to.width) return
      setLanding({
        x: to.left + to.width / 2 - from.left - from.width / 2,
        y: to.top + to.height / 2 - from.top - from.height / 2,
        scale: to.width / from.width,
      })
    }
    measure()
    const observer = new ResizeObserver(measure)
    for (const element of [source, target, desktop]) observer.observe(element)
    return () => observer.disconnect()
  }, [destination, stage, reducedMotion])

  const p = reducedMotion ? .80 : progress
  const written = scenePhase(p, 0, .35)
  const lift = scenePhase(p, .35, .46)
  const brackets = scenePhase(p, .48, .525)
  const spread = scenePhase(p, .535, .66)
  const phrase = scenePhase(p, .555, .66)
  const exit = scenePhase(p, .835, .925)
  const dock = scenePhase(p, .835, 1)
  const style = {
    '--paper-alpha': 1 - scenePhase(p, .83, .99),
    '--ink-x': `${landing.x * dock}px`,
    '--ink-y': `${landing.y * dock}px`,
    '--ink-scale': 1 + (landing.scale - 1) * dock,
    '--ink-lift': lift * (1 - dock),
    '--line-alpha': brackets * (1 - exit),
    '--bracket-open': .2 + .8 * spread,
    '--phrase-inset': `${50 * (1 - phrase)}%`,
    '--phrase-alpha': phrase,
    '--cue-alpha': 1 - scenePhase(p, .81, .86),
  } as CSSProperties

  return (
    <div className="story-intro" style={style}>
      <div className="story-intro__paper" aria-hidden="true" />
      <div className="intro-lockup" ref={origin}>
        <h1 className="intro-title" aria-label="Plan to. Make it!" lang="en"><Signature written={written} /></h1>
        <div className="intro-motto" aria-hidden="true" lang="en">
          <span className="intro-motto__bracket" />
          <span className="intro-motto__text">Make it!</span>
          <span className="intro-motto__bracket" />
        </div>
      </div>
      <div className="intro-controls">
        <span className="intro-scroll"><i aria-hidden="true">↓</i>{p < .35
          ? t('스크롤로 써 보세요', 'Scroll to write', 'スクロールして書く')
          : t('아래로 스크롤', 'Scroll down', '下にスクロール')}</span>
        <button type="button" onClick={onSkip}>{t('인트로 건너뛰기', 'Skip intro', 'イントロをスキップ')} <span aria-hidden="true">→</span></button>
      </div>
    </div>
  )
}
