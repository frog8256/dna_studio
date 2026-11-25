import type { CSSProperties } from 'react'
import { planTo } from '../data/brand'
import { phoneAgendaReady, phoneEntrance, scenePhase as phase, storyAppointments } from '../data/story'
import { useLanguage } from '../i18n'
import './story-phone.css'

function PhoneHome({ canOpen, onOpen }: { canOpen: boolean; onOpen: () => void }) {
  const { t } = useLanguage()
  return (
    <div className="story-phone__home">
      <div className="story-phone__clock" aria-hidden="true"><span>{t('11월 25일 수요일', 'Wednesday, November 25', '11月25日 水曜日')}</span><strong>09:41</strong></div>
      <button type="button" className="story-phone__launch-icon" aria-label={t('모바일 Plan to 일정 열기', 'Open your schedule in Plan to for mobile', 'モバイル版 Plan to で予定を開く')}
        onClick={onOpen} disabled={!canOpen}>
        <img src={planTo.icon} alt="" draggable={false} />
        <span>Plan to</span>
        <i className="story-phone__touch" />
      </button>
      <div className="story-phone__dock" aria-hidden="true">
        <i className="story-phone__dock-icon story-phone__dock-phone">✆</i>
        <i className="story-phone__dock-icon story-phone__dock-chat" />
        <i className="story-phone__dock-icon story-phone__dock-camera" />
      </div>
    </div>
  )
}

function PhoneAgenda({ ready }: { ready: boolean }) {
  const { language, t } = useLanguage()
  return (
    <div className="story-phone__app" aria-hidden={!ready}>
      <div className="story-phone__app-header">
        <img src={planTo.wordmark} alt="" draggable={false} />
      </div>
      <div className="story-phone__agenda">
        <div className="story-phone__agenda-heading"><strong>{t('내 일정', 'My schedule', '自分の予定')}</strong><span>{t('11월', 'November', '11月')}</span></div>
        {storyAppointments.map(item => (
          <div className="story-phone__day" key={item.day}>
            <div className="story-phone__date">{t(`11월 ${item.day}일`, `Nov ${item.day}`, `11月${item.day}日`)} <span>({item.weekday[language]})</span></div>
            <div className="story-phone__event"><i /><b>{item.title[language]}</b><span>{item.time}</span></div>
          </div>
        ))}
        <div className="story-phone__synced"><i>✓</i>{t('Google 캘린더 동기화됨', 'Google Calendar synced', 'Google カレンダーと同期済み')}</div>
      </div>
      <div className="story-phone__app-nav">
        <span><i className="story-phone__nav-home" />{t('홈', 'Home', 'ホーム')}</span>
        <span><i className="story-phone__nav-calendar" />{t('캘린더', 'Calendar', 'カレンダー')}</span>
        <span><i className="story-phone__nav-chat" />{t('채팅', 'Chat', 'チャット')}</span>
        <span><i className="story-phone__nav-more">···</i>{t('더보기', 'More', 'その他')}</span>
      </div>
    </div>
  )
}

export function StoryPhone({ progress, onOpen }: { progress: number; onOpen: () => void }) {
  const arrival = phase(progress, phoneEntrance, phoneAgendaReady)
  const travelLeft = (1 - arrival) ** 2
  const touch = phase(progress, 8.96, 9.15)
  const open = phase(progress, 9.07, phoneAgendaReady)
  const ready = progress >= phoneAgendaReady
  const style = {
    visibility: progress > phoneEntrance ? 'visible' : 'hidden',
    '--phone-x': `${-106 * travelLeft}cqw`,
    '--phone-angle': `${-9 * travelLeft}deg`,
    '--phone-tilt-scale': .95 + .05 * arrival,
    '--phone-touch-alpha': Math.sin(Math.PI * touch),
    '--phone-touch-scale': .48 + 1.05 * touch,
    '--phone-icon-scale': 1 - .10 * Math.sin(Math.PI * touch),
    '--phone-open-alpha': phase(progress, 9.07, 9.20),
    '--phone-open-scale': .18 + .82 * open,
    '--phone-open-radius': `${13 * (1 - open)}%`,
    '--phone-home-alpha': 1 - open,
    '--phone-sync-alpha': phase(progress, 9.20, phoneAgendaReady),
  } as CSSProperties

  return (
    <div className="story-phone" style={style}>
      <div className="story-phone__display">
        {!ready && <PhoneHome canOpen={arrival > .5 && open < .85} onOpen={onOpen} />}
        {open > 0 && <PhoneAgenda ready={ready} />}
        <div className="story-phone__status" aria-hidden="true"><b>9:41</b><span><i className="story-phone__signal" /><i className="story-phone__battery" /></span></div>
        <i className="story-phone__island" />
        <i className="story-phone__gesture" />
      </div>
    </div>
  )
}
