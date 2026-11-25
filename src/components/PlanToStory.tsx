import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { planTo } from '../data/brand'
import { asset } from '../data/paths'
import { scenePhase as ease } from '../data/story'
import { StoryCalendar } from './StoryCalendar'
import { StoryWindows, StoryStickers } from './StoryWindows'
import { StoryPhone } from './StoryPhone'
import './plan-to-story.css'

const scenes = [
  { start: 0, rest: 0, name: '바탕화면', title: '바탕화면 한가운데, Plan to.', copy: '풍경이 비치는 달력에서 하루를 시작해요. 아래로 스크롤해 보세요.' },
  { start: .90, rest: 2.17, name: '열리는 창', title: '일을 시작하면 창이 하나둘 쌓여요.', copy: '폴더, 웹브라우저, 메신저, 메일을 열자 달력이 뒤로 가려집니다.' },
  { start: 2.25, rest: 2.84, name: '단축키', title: '단축키 한 번으로 달력을 앞으로.', copy: 'Ctrl + Alt + ↑를 누르면 열어 둔 창 위로 Plan to가 올라옵니다.' },
  { start: 3.18, rest: 4.34, name: '날짜 선택', title: '이웃한 두 날짜를 더블클릭.', copy: '25일과 26일을 차례로 두 번 클릭해 날짜별 메모를 엽니다.' },
  { start: 4.38, rest: 5.23, name: '스티커', title: '두 장의 메모를 바탕화면에.', copy: '달력 밖으로 끌어 위아래로 고정해 두면, 회의 전에 챙길 일이 눈에 들어와요.' },
  { start: 5.37, rest: 5.98, name: '창 정리', title: '작업 창을 닫아도 메모는 그대로.', copy: '폴더부터 메일까지 네 개의 창을 닫으면 달력과 두 스티커가 남습니다.' },
  { start: 6.02, rest: 7.02, name: 'AI 일정 등록', title: '이번 주 일정 세 개를 한 번에.', copy: 'Plan to AI 채팅에 부탁하면 기획 회의, 시안 검토, 주간 회고가 달력에 차례로 들어갑니다.' },
  { start: 7.14, rest: 7.88, name: '동기화', title: '채팅에서 등록과 동기화를 확인해요.', copy: '연결한 Google 캘린더와의 동기화가 끝나면 일정 등록 완료 메시지가 나타납니다.' },
  { start: 8.38, rest: 10, name: '휴대폰', title: '휴대폰에도 같은 세 일정이.', copy: '같은 계정으로 모바일 Plan to를 열면 PC에서 등록한 일정과 시간이 그대로 보입니다.' },
] as const

const clamp = (value: number) => Math.max(0, Math.min(1, value))

function Laptop({ progress }: { progress: number }) {
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
    <div className="story-laptop" style={layout}>
      <div className="story-lid">
        <i className="story-camera" />
        <div className="story-display">
          <div className="story-desktop-area" style={{
            width: `${100 + 200 * lens}%`, height: `${100 + 200 * lens}%`,
            left: `${-180 * lens}%`, top: `${-125 * lens}%`,
          }}>
            <div className="story-os-dock">
              <i className="story-start"><b /><b /><b /><b /></i>
              <i className="story-folder-icon" /><i className="story-web-icon" />
              <img src={asset('/brand/plan-to-app-icon.webp')} alt="" /><i className="story-mail-icon" />
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
}

export function PlanToStory() {
  const track = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  useEffect(() => {
    const element = track.current
    const sticky = pin.current
    if (!element || !sticky) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const setPreference = () => setReducedMotion(preference.matches)
    let frame = 0
    function measure() {
      frame = 0
      if (!element || !sticky) return
      const inset = (parseFloat(getComputedStyle(sticky).top) || 0) - element.getBoundingClientRect().top
      const distance = element.offsetHeight - sticky.offsetHeight
      setProgress(Math.min(10, clamp(inset / Math.max(1, distance)) * 10.55))
    }
    function invalidate() { if (!frame) frame = window.requestAnimationFrame(measure) }
    setPreference()
    const observer = new ResizeObserver(invalidate)
    observer.observe(element)
    observer.observe(sticky)
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

  const active = scenes.reduce((selected, scene, index) => progress >= scene.start ? index : selected, 0)
  const scene = scenes[active]
  function goToScene(index: number) {
    const element = track.current
    const sticky = pin.current
    if (!element || !sticky) return
    const header = parseFloat(getComputedStyle(sticky).top) || 0
    const travel = element.offsetHeight - sticky.offsetHeight
    const top = window.scrollY + element.getBoundingClientRect().top - header + (scenes[index].rest / 10.55) * travel
    window.scrollTo({ top: Math.ceil(top), behavior: 'instant' })
  }
  const visualProgress = reducedMotion ? scene.rest : progress
  return (
    <section className="story-track" ref={track} aria-label="Plan to 사용 흐름">
      <div className="story-pin" ref={pin}>
        <div className="story-shell">
          <div className="story-top">
            <div className="story-brand"><img src={planTo.wordmark} alt="Plan to" /><span>데스크톱 캘린더</span></div>
            <nav aria-label="소개 건너뛰기"><a href="#features">기능 보기</a><a className="story-install" href="#download">다운로드</a></nav>
          </div>
          <div className="story-stage" aria-hidden="true">
            <Laptop progress={visualProgress} />
            <StoryPhone progress={visualProgress} />
          </div>
          <div className="story-console">
            <div className="story-caption" aria-live="polite" aria-atomic="true">
              <span className="story-number">{String(active + 1).padStart(2, '0')} <span>/ {String(scenes.length).padStart(2, '0')}</span></span>
              <div><h1>{scene.title}</h1><p>{scene.copy}</p></div>
            </div>
            <div className="story-bar">
              <nav className="story-segments" aria-label="장면 바로가기">
                {scenes.map((item, index) => (
                  <button key={item.name} type="button" title={item.name} aria-label={`${index + 1}번째 장면 · ${item.name}`} aria-current={index === active ? 'step' : undefined}
                    className={index <= active ? 'story-visited' : ''} onClick={() => goToScene(index)}><span /></button>
                ))}
              </nav>
              <div className="story-controls">
                <button type="button" aria-label="이전 장면" disabled={active === 0} onClick={() => goToScene(active - 1)}>‹</button>
                {active + 1 < scenes.length
                  ? <button type="button" aria-label="다음 장면" onClick={() => goToScene(active + 1)}>›</button>
                  : <a className="story-end" href="#features">기능 보기</a>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
