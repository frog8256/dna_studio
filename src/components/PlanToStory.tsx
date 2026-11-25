import { memo, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import { planTo } from '../data/brand'
import { phoneAgendaReady, phoneEntrance, scenePhase as ease, storyScenes as scenes } from '../data/story'
import { useLanguage } from '../i18n'
import { StoryCalendar } from './StoryCalendar'
import { StoryWindows, StoryStickers } from './StoryWindows'
import { StoryPhone } from './StoryPhone'
import { StoryIntro } from './StoryIntro'
import './plan-to-story.css'

const clamp = (value: number) => Math.max(0, Math.min(1, value))
const desktopTimelineLength = 10.55

const Laptop = memo(function Laptop({ progress, wordmark }: { progress: number; wordmark: RefObject<HTMLImageElement | null> }) {
  const moveAside = ease(progress, 3.03, 3.38) * (1 - ease(progress, 6.02, 6.37))
  const lens = ease(progress, 7.12, 7.56) * (1 - ease(progress, 7.99, 8.35))
  const leave = ease(progress, 8.38, 9.35)
  const lift = ease(progress, 2.56, 2.75) * (1 - ease(progress, 2.85, 3.05))
  const keyboard = ease(progress, 2.20, 2.40) * (1 - ease(progress, 2.98, 3.18))
  const press = ease(progress, 2.42, 2.60) * (1 - ease(progress, 2.85, 2.98))
  const layout = {
    left: `${50 + 140 * leave}%`,
    '--device-scale': .954 + .046 * ease(progress, 0, .88),
    '--app-left': `${9 - 2 * moveAside}%`,
    '--app-width': `${82 - 17 * moveAside}%`,
    '--app-top': `${10 + 2 * moveAside - lift}%`,
    '--app-layer': progress >= 2.66 ? 20 : 5,
    '--app-lift': 1 + .035 * lift,
    '--press': press,
  } as CSSProperties
  return (
    <div className="story-laptop" style={layout} aria-hidden="true">
      <div className="story-lid">
        <i className="story-camera" />
        <div className="story-display">
          <div className="story-desktop-area" style={{
            width: `${100 + 200 * lens}%`, height: `${100 + 200 * lens}%`,
            left: `${-180 * lens}%`, top: `${-125 * lens}%`,
          }}>
            <img ref={wordmark} className="story-desktop-wordmark" src={planTo.wordmark} alt="" width="840" height="270" />
            <div className="story-os-dock">
              <i className="story-start"><b /><b /><b /><b /></i>
              <i className="story-folder-icon" /><i className="story-web-icon" />
              <img src={planTo.icon} alt="" /><i className="story-mail-icon" />
            </div>
            <StoryCalendar progress={progress} />
            <StoryWindows progress={progress} />
            <StoryStickers progress={progress} />
          </div>
          <div className="story-keyboard" style={{ opacity: keyboard, visibility: keyboard > 0 ? 'visible' : 'hidden' }}>
            <kbd>Ctrl</kbd><span>+</span><kbd>Alt</kbd><span>+</span><kbd>↑</kbd>
          </div>
        </div>
      </div>
      <div className="story-base"><i /></div>
    </div>
  )
})

export function PlanToStory() {
  const { language, t } = useLanguage()
  const track = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const openingTravel = useRef<HTMLDivElement>(null)
  const desktopWordmark = useRef<HTMLImageElement>(null)
  const captionTitle = useRef<HTMLHeadingElement>(null)
  const focusAfterSkip = useRef(false)
  const [progress, setProgress] = useState(-1)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const inIntro = progress < 0
  useEffect(() => {
    const element = track.current
    const sticky = pin.current
    const opening = openingTravel.current
    if (!element || !sticky || !opening) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const setPreference = () => setReducedMotion(preference.matches)
    let frame = 0
    const measure = () => {
      frame = 0
      const inset = (parseFloat(getComputedStyle(sticky).top) || 0) - element.getBoundingClientRect().top
      const lead = opening.offsetHeight
      const distance = Math.max(1, element.offsetHeight - sticky.offsetHeight - lead)
      // The intro owns -1..0. The original desktop and phone keep their cue points.
      setProgress(inset < lead
        ? clamp(inset / Math.max(1, lead)) - 1
        : Math.min(10, (inset - lead) / distance * desktopTimelineLength))
    }
    function invalidate() { if (!frame) frame = window.requestAnimationFrame(measure) }
    setPreference()
    const observer = new ResizeObserver(invalidate)
    observer.observe(element)
    observer.observe(sticky)
    observer.observe(opening)
    preference.addEventListener('change', setPreference)
    window.addEventListener('scroll', invalidate, { passive: true })
    window.addEventListener('resize', invalidate)
    measure()
    return () => {
      observer.disconnect()
      preference.removeEventListener('change', setPreference)
      window.removeEventListener('scroll', invalidate)
      window.removeEventListener('resize', invalidate)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  useLayoutEffect(() => {
    if (!inIntro && focusAfterSkip.current) {
      focusAfterSkip.current = false
      captionTitle.current?.focus({ preventScroll: true })
    }
  }, [inIntro])

  const active = scenes.reduce((selected, scene, index) => progress >= scene.start ? index : selected, 0)
  const scene = scenes[active]
  function goToScene(index: number) {
    const element = track.current
    const sticky = pin.current
    const opening = openingTravel.current
    if (!element || !sticky || !opening) return
    const header = parseFloat(getComputedStyle(sticky).top) || 0
    const lead = opening.offsetHeight
    const travel = element.offsetHeight - sticky.offsetHeight - lead
    const top = window.scrollY + element.getBoundingClientRect().top - header + lead + (scenes[index].rest / desktopTimelineLength) * travel
    window.scrollTo({ top: Math.ceil(top), behavior: 'instant' })
  }
  const visualProgress = reducedMotion ? scene.rest : Math.max(0, progress)
  const enteringPhone = visualProgress >= phoneEntrance && visualProgress < phoneAgendaReady
  const openingProgress = progress + 1
  const desktopStyle = {
    opacity: inIntro && reducedMotion ? 0 : ease(openingProgress, .82, .985),
    '--story-controls-opacity': ease(openingProgress, .905, .985),
  } as CSSProperties
  return (
    <section className="story-track" ref={track} aria-label={t('Plan to 사용 흐름', 'Plan to walkthrough', 'Plan to の使い方')}>
      <div className="story-pin" ref={pin}>
        <div className="story-shell" style={desktopStyle} inert={inIntro}>
          <div className="story-top">
            <div className="story-brand"><img src={planTo.wordmark} alt="Plan to" /><span>{t('데스크톱 캘린더', 'Desktop calendar', 'デスクトップカレンダー')}</span></div>
            <nav aria-label={t('소개 건너뛰기', 'Skip the walkthrough', '紹介をスキップ')}><a href="#features">{t('기능 보기', 'Features', '機能を見る')}</a><a className="story-install" href="#download">{t('다운로드', 'Download', 'ダウンロード')}</a></nav>
          </div>
          <div className="story-stage" ref={stage}>
            <Laptop progress={visualProgress} wordmark={desktopWordmark} />
            {!inIntro && <StoryPhone progress={visualProgress} onOpen={() => {
              goToScene(scenes.length - 1)
              captionTitle.current?.focus({ preventScroll: true })
            }} />}
          </div>
          <div className="story-console">
            <div className="story-caption" aria-live="polite" aria-atomic="true">
              <span className="story-number">{String(active + 1).padStart(2, '0')} <span>/ {String(scenes.length).padStart(2, '0')}</span></span>
              <div>
                <h1 ref={captionTitle} tabIndex={-1}>{enteringPhone ? t('휴대폰에서 Plan to를 열어요.', 'Open Plan to on your phone.', 'スマホで Plan to を開きましょう。') : scene[language].title}</h1>
                <p>{enteringPhone ? t('스크롤을 내리거나 Plan to 아이콘을 눌러 PC에서 등록한 일정을 확인하세요.', 'Scroll down or tap the Plan to icon to see the events you added on your PC.', '下にスクロールするか、Plan to のアイコンをタップして、PCで登録した予定を確認しましょう。') : scene[language].copy}</p>
              </div>
            </div>
            <div className="story-bar">
              <nav className="story-segments" aria-label={t('장면 바로가기', 'Jump to a scene', 'シーンを選択')}>
                {scenes.map((item, index) => (
                  <button key={item.start} type="button" title={item[language].name} aria-label={t(`${index + 1}번째 장면 · ${item.ko.name}`, `Scene ${index + 1} · ${item.en.name}`, `シーン${index + 1}・${item.ja.name}`)} aria-current={index === active ? 'step' : undefined}
                    className={index <= active ? 'story-visited' : ''} onClick={() => goToScene(index)}><span /></button>
                ))}
              </nav>
              <div className="story-controls">
                <button type="button" aria-label={t('이전 장면', 'Previous scene', '前のシーン')} disabled={active === 0} onClick={() => goToScene(active - 1)}>‹</button>
                {active + 1 < scenes.length
                  ? <button type="button" aria-label={t('다음 장면', 'Next scene', '次のシーン')} onClick={() => goToScene(active + 1)}>›</button>
                  : <a className="story-end" href="#features">{t('기능 보기', 'Features', '機能を見る')}</a>}
              </div>
            </div>
          </div>
        </div>
        {inIntro && <StoryIntro progress={openingProgress} reducedMotion={reducedMotion} destination={desktopWordmark} stage={stage}
          onSkip={() => { focusAfterSkip.current = true; goToScene(0) }} />}
      </div>
      <div className="story-opening-travel" ref={openingTravel} aria-hidden="true" />
    </section>
  )
}
