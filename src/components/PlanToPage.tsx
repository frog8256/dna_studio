import { useRef, useState } from 'react'
import glassScreen from '../assets/plan-to-window.webp'
import paperScreen from '../assets/plan-to-paper.webp'
import { planTo, planToRelease } from '../data/brand'
import { PlanToDownload } from './PlanToDownload'
import { PlanToExplorer } from './PlanToExplorer'
import { PlanToStory } from './PlanToStory'
import './plan-to-page.css'

const screens = [
  { label: '글라스', src: glassScreen, description: '투명한 월간 캘린더와 선택한 날짜의 할 일 목록' },
  { label: '파스텔 종이', src: paperScreen, description: '종이색 배경의 월간 캘린더와 오른쪽에 열린 AI 채팅 패널' },
]

function CalendarShowcase() {
  const [selected, setSelected] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const screen = screens[selected]

  return (
    <figure className="pt-showcase">
      <button type="button" className="pt-scenery" onClick={() => dialog.current?.showModal()}
        aria-label={`${screen.label} 테마의 실제 앱 화면 크게 보기`} aria-haspopup="dialog">
        <img className={selected === 0 ? 'pt-screen pt-glass-screen' : 'pt-screen'} src={screen.src} alt={screen.description} width="1536" height="936" fetchPriority="high" />
        <span className="pt-zoom" aria-hidden="true">⛶</span>
      </button>
      <figcaption className="pt-caption">
        <span>Windows 앱 화면</span>
        <div className="pt-themes" role="group" aria-label="화면 테마 미리보기">
          {screens.map((choice, index) => (
            <button key={choice.label} type="button" aria-pressed={selected === index}
              onClick={() => setSelected(index)}>
              <i className={index === 0 ? 'pt-glass-swatch' : 'pt-paper-swatch'} aria-hidden="true" />
              {choice.label}
            </button>
          ))}
        </div>
      </figcaption>
      <dialog className="pt-zoom-dialog" ref={dialog} aria-labelledby="screen-title"
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close() }}>
        <div className="pt-dialog-inner">
          <header>
            <strong id="screen-title">Plan to · {screen.label} 테마</strong>
            <button type="button" autoFocus onClick={() => dialog.current?.close()}>닫기</button>
          </header>
          <div className="pt-dialog-image"><img className={selected === 0 ? 'pt-glass-screen' : undefined} src={screen.src} alt={screen.description} /></div>
        </div>
      </dialog>
    </figure>
  )
}

function DesktopDetails() {
  return (
    <section className="pt-desktop" aria-labelledby="desktop-title">
      <div className="container pt-wrap">
        <h2 id="desktop-title">PC에서 계획을 챙기는 방법</h2>
        <div className="pt-detail-grid">
          <article>
            <div className="pt-feature-icon pt-window-icon" aria-hidden="true"><i /></div>
            <h3>필요할 때 꺼내는 캘린더</h3>
            <p>바탕화면에 붙여 두거나 일반 창으로 열고, 작업 공간이 좁을 땐 미니 캘린더로 바꾸세요.</p>
            <div className="pt-shortcut"><span>일반 창과 바탕화면 전환</span><div><kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd aria-label="위 방향키">↑</kbd></div></div>
          </article>
          <article>
            <div className="pt-feature-icon pt-bell-icon" aria-hidden="true"><i /></div>
            <h3>알림 창에서 바로 완료</h3>
            <p>일정마다 PC 알림 시각을 정하세요. 알림이 뜨면 바로 완료하거나 일정을 열어 내용을 확인할 수 있어요.</p>
            <p className="pt-detail-note">손을 뗄 수 없을 땐 ‘10분 뒤’로 미루세요.</p>
          </article>
          <article>
            <div className="pt-feature-icon pt-sync-icon" aria-hidden="true">⇄</div>
            <h3>기기를 옮겨도 같은 계획</h3>
            <p>같은 계정으로 앱·웹·PC의 일정, 완료 상태, 루틴, D-day와 메모를 동기화하세요.</p>
            <p className="pt-detail-note">Google 캘린더를 골라 가져오고, 쓰기 권한이 있는 캘린더에는 일정을 보낼 수 있어요.</p>
          </article>
        </div>
      </div>
    </section>
  )
}

export function PlanToPage() {
  return (
    <div className="pt-service">
      <PlanToStory />
      <section className="pt-hero" aria-labelledby="pt-title">
        <div className="container pt-hero-grid">
          <div className="pt-intro">
            <div className="pt-signature">
              <img src={planTo.wordmark} alt={planTo.name} width="840" height="270" />
              <span>Windows 데스크톱 캘린더</span>
            </div>
            <h2 id="pt-title">내 바탕화면에 맞는<br /><em>캘린더 테마</em></h2>
            <p>배경이 비치는 글라스와 부드러운 파스텔 종이 중에서 골라 보세요. 앱 화면을 누르면 크게 볼 수 있어요.</p>
            <div className="pt-hero-actions">
              <a className="pt-primary" href={planToRelease.download}>
                <span className="windows-icon" aria-hidden="true"><i /><i /><i /><i /></span> Windows용 다운로드
              </a>
              <a className="pt-secondary" href="#features">기능 둘러보기</a>
            </div>
            <p className="pt-version">Windows x64 <span>·</span> ZIP <span>·</span> {planToRelease.version}</p>
          </div>
          <CalendarShowcase />
        </div>
      </section>
      <PlanToExplorer />
      <DesktopDetails />
      <PlanToDownload />
    </div>
  )
}
