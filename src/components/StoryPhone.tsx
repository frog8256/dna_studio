import type { CSSProperties } from 'react'
import { planTo } from '../data/brand'
import { asset } from '../data/paths'
import { scenePhase as phase, storyAppointments } from '../data/story'
import './story-phone.css'

function PhoneHome() {
  return (
    <div className="story-phone__home">
      <div className="story-phone__clock"><span>11월 25일 수요일</span><strong>09:41</strong></div>
      <div className="story-phone__launch-icon">
        <img src={asset('/brand/plan-to-app-icon.webp')} alt="" draggable={false} />
        <span>Plan to</span>
        <i className="story-phone__touch" />
      </div>
      <div className="story-phone__dock">
        <i className="story-phone__dock-icon story-phone__dock-phone">✆</i>
        <i className="story-phone__dock-icon story-phone__dock-chat" />
        <i className="story-phone__dock-icon story-phone__dock-camera" />
      </div>
    </div>
  )
}

function PhoneAgenda() {
  return (
    <div className="story-phone__app">
      <div className="story-phone__app-header">
        <img src={planTo.wordmark} alt="" draggable={false} />
      </div>
      <div className="story-phone__agenda">
        <div className="story-phone__agenda-heading"><strong>내 일정</strong><span>11월</span></div>
        {storyAppointments.map(item => (
          <div className="story-phone__day" key={item.day}>
            <div className="story-phone__date">11월 {item.day}일 <span>({item.weekday})</span></div>
            <div className="story-phone__event"><i /><b>{item.title}</b><span>{item.time}</span></div>
          </div>
        ))}
        <div className="story-phone__synced"><i>✓</i>Google 캘린더 동기화됨</div>
      </div>
      <div className="story-phone__app-nav">
        <span><i className="story-phone__nav-home" />홈</span>
        <span><i className="story-phone__nav-calendar" />캘린더</span>
        <span><i className="story-phone__nav-chat" />채팅</span>
        <span><i className="story-phone__nav-more">···</i>더보기</span>
      </div>
    </div>
  )
}

export function StoryPhone({ progress }: { progress: number }) {
  const arrival = phase(progress, 8.35, 9.32)
  const touch = phase(progress, 9.43, 9.64)
  const open = phase(progress, 9.52, 9.82)
  const style = {
    visibility: progress > 8.35 ? 'visible' : 'hidden',
    '--phone-x': `${-106 * (1 - arrival)}cqw`,
    '--phone-angle': `${-9 * (1 - arrival)}deg`,
    '--phone-tilt-scale': .95 + .05 * arrival,
    '--phone-touch-alpha': Math.sin(Math.PI * touch),
    '--phone-touch-scale': .48 + 1.05 * touch,
    '--phone-icon-scale': 1 - .10 * Math.sin(Math.PI * touch),
    '--phone-open-alpha': phase(progress, 9.52, 9.64),
    '--phone-open-scale': .18 + .82 * open,
    '--phone-open-radius': `${13 * (1 - open)}%`,
    '--phone-home-alpha': 1 - open,
    '--phone-sync-alpha': phase(progress, 9.73, 9.82),
  } as CSSProperties

  return (
    <div className="story-phone" style={style} aria-hidden="true">
      <div className="story-phone__display">
        <PhoneHome />
        <PhoneAgenda />
        <div className="story-phone__status"><b>9:41</b><span><i className="story-phone__signal" /><i className="story-phone__battery" /></span></div>
        <i className="story-phone__island" />
        <i className="story-phone__gesture" />
      </div>
    </div>
  )
}
