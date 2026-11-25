import { useRef, useState } from 'react'
import glassScreen from '../assets/plan-to-window.webp'
import paperScreen from '../assets/plan-to-paper.webp'
import { planTo, planToRelease } from '../data/brand'
import { useLanguage } from '../i18n'
import { PlanToDownload } from './PlanToDownload'
import { PlanToExplorer } from './PlanToExplorer'
import { PlanToStory } from './PlanToStory'
import './plan-to-page.css'

function CalendarShowcase() {
  const { t } = useLanguage()
  const [selected, setSelected] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const screens = [
    {
      label: t('글라스', 'Glass', 'グラス'),
      src: glassScreen,
      description: t('투명한 월간 캘린더와 선택한 날짜의 할 일 목록', 'A translucent monthly calendar with a task list for the selected day', '半透明の月間カレンダーと、選んだ日のタスクリスト'),
    },
    {
      label: t('파스텔 종이', 'Pastel Paper', 'パステルペーパー'),
      src: paperScreen,
      description: t('종이색 배경의 월간 캘린더와 오른쪽에 열린 AI 채팅 패널', 'A paper-toned monthly calendar with the AI chat panel open on the right', '紙の色を使った月間カレンダーと、右側に開いたAIチャットパネル'),
    },
  ]
  const screen = screens[selected]

  return (
    <figure className="pt-showcase">
      <button type="button" className="pt-scenery" onClick={() => dialog.current?.showModal()}
        aria-label={t(`${screen.label} 테마의 실제 앱 화면 크게 보기`, `Enlarge the app screenshot in the ${screen.label} theme`, `${screen.label}テーマのアプリ画面を拡大`)} aria-haspopup="dialog">
        <img className={selected === 0 ? 'pt-screen pt-glass-screen' : 'pt-screen'} src={screen.src} alt={screen.description} width="1536" height="936" fetchPriority="high" />
        <span className="pt-zoom" aria-hidden="true">⛶</span>
      </button>
      <figcaption className="pt-caption">
        <span>{t('Windows 앱 화면', 'Windows app preview', 'Windows版の画面')}</span>
        <div className="pt-themes" role="group" aria-label={t('화면 테마 미리보기', 'Preview a theme', 'テーマのプレビュー')}>
          {screens.map((choice, index) => (
            <button key={choice.src} type="button" aria-pressed={selected === index}
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
            <strong id="screen-title">Plan to · {t(`${screen.label} 테마`, `${screen.label} theme`, `${screen.label}テーマ`)}</strong>
            <button type="button" autoFocus onClick={() => dialog.current?.close()}>{t('닫기', 'Close', '閉じる')}</button>
          </header>
          <div className="pt-dialog-image"><img className={selected === 0 ? 'pt-glass-screen' : undefined} src={screen.src} alt={screen.description} /></div>
        </div>
      </dialog>
    </figure>
  )
}

function DesktopDetails() {
  const { t } = useLanguage()
  return (
    <section className="pt-desktop" aria-labelledby="desktop-title">
      <div className="container pt-wrap">
        <h2 id="desktop-title">{t('PC에서 계획을 챙기는 방법', 'Plan your day on your PC', 'PCで予定を管理する')}</h2>
        <div className="pt-detail-grid">
          <article>
            <div className="pt-feature-icon pt-window-icon" aria-hidden="true"><i /></div>
            <h3>{t('필요할 때 꺼내는 캘린더', 'Keep your calendar in reach', '必要なときに開けるカレンダー')}</h3>
            <p>{t('바탕화면에 붙여 두거나 일반 창으로 열고, 작업 공간이 좁을 땐 미니 캘린더로 바꾸세요.', 'Pin the calendar to your desktop or open it in a window. Switch to the mini calendar when you need more room.', 'デスクトップに固定したり、通常のウィンドウで開いたりできます。作業スペースが足りないときはミニカレンダーに切り替えましょう。')}</p>
            <div className="pt-shortcut"><span>{t('일반 창과 바탕화면 전환', 'Switch between window and desktop modes', 'ウィンドウ表示とデスクトップ表示を切り替え')}</span><div><kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd aria-label={t('위 방향키', 'Up arrow', '上矢印キー')}>↑</kbd></div></div>
          </article>
          <article>
            <div className="pt-feature-icon pt-bell-icon" aria-hidden="true"><i /></div>
            <h3>{t('알림 창에서 바로 완료', 'Check it off from a reminder', '通知からそのまま完了')}</h3>
            <p>{t('일정마다 PC 알림 시각을 정하세요. 알림이 뜨면 바로 완료하거나 일정을 열어 내용을 확인할 수 있어요.', 'Set a desktop reminder for each event. When it appears, mark the event as done or open it to see the details.', '予定ごとにPCの通知時刻を設定できます。通知が届いたら、その場で完了にするか、予定を開いて詳細を確認できます。')}</p>
            <p className="pt-detail-note">{t('손을 뗄 수 없을 땐 ‘10분 뒤’로 미루세요.', 'If you’re busy, snooze the reminder for 10 minutes.', '手が離せないときは、通知を10分後に延期できます。')}</p>
          </article>
          <article>
            <div className="pt-feature-icon pt-sync-icon" aria-hidden="true">⇄</div>
            <h3>{t('기기를 옮겨도 같은 계획', 'The same plans on every device', 'どの端末でも同じ予定を')}</h3>
            <p>{t('같은 계정으로 앱·웹·PC의 일정, 완료 상태, 루틴, D-day와 메모를 동기화하세요.', 'Use the same account on mobile, web and PC to sync events, completion status, routines, countdowns and notes.', 'スマホ・ウェブ・PCで同じアカウントを使うと、予定や完了状況、ルーティン、カウントダウン、メモを同期できます。')}</p>
            <p className="pt-detail-note">{t('Google 캘린더를 골라 가져오고, 쓰기 권한이 있는 캘린더에는 일정을 보낼 수 있어요.', 'Choose which Google calendars to import. You can also send events to any calendar you can edit.', 'Google カレンダーを選んで予定を取り込めます。編集権限のあるカレンダーには、予定を書き出すこともできます。')}</p>
          </article>
        </div>
      </div>
    </section>
  )
}

export function PlanToPage() {
  const { t } = useLanguage()
  return (
    <div className="pt-service">
      <PlanToStory />
      <section className="pt-hero" aria-labelledby="pt-title">
        <div className="container pt-hero-grid">
          <div className="pt-intro">
            <div className="pt-signature">
              <img src={planTo.wordmark} alt={planTo.name} width="840" height="270" />
              <span>{t('Windows 데스크톱 캘린더', 'Windows desktop calendar', 'Windowsデスクトップカレンダー')}</span>
            </div>
            <h2 id="pt-title">{t('내 바탕화면에 맞는', 'Your desktop,', 'デスクトップに合う')}<br /><em>{t('캘린더 테마', 'your calendar theme', 'カレンダーテーマ')}</em></h2>
            <p>{t('배경이 비치는 글라스와 부드러운 파스텔 종이 중에서 골라 보세요. 앱 화면을 누르면 크게 볼 수 있어요.', 'Let your wallpaper show through with Glass, or try the soft tones of Pastel Paper. Select the screenshot for a closer look.', '壁紙が透けて見えるグラスと、やさしい色合いのパステルペーパーから選べます。アプリ画面をタップすると拡大できます。')}</p>
            <div className="pt-hero-actions">
              <a className="pt-primary" href={planToRelease.download}>
                <span className="windows-icon" aria-hidden="true"><i /><i /><i /><i /></span>{t('Windows용 다운로드', 'Download for Windows', 'Windows版をダウンロード')}
              </a>
              <a className="pt-secondary" href="#features">{t('기능 둘러보기', 'Explore features', '機能を見る')}</a>
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
