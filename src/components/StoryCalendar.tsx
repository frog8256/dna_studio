import { type CSSProperties } from 'react'
import { planTo } from '../data/brand'
import { scenePhase as phase, storyAppointments } from '../data/story'
import './story-calendar.css'

const weekdays = ['일', '월', '화', '수', '목', '금', '토']
// November 2026 starts on Sunday and fills five visible calendar rows.
const dates = Array.from({ length: 35 }, (_, index) => index + 1)
const appointments: Record<number, [string, string]> = {
  2: ['월간 계획', 'blue'],
  4: ['팀 점심', 'rose'],
  6: ['인터뷰', 'mint'],
  9: ['새 프로젝트', 'mint'],
  12: ['도서관', 'blue'],
  17: ['데모 리허설', 'mint'],
  20: ['전시 관람', 'lilac'],
  23: ['자료 조사', 'blue'],
  30: ['11월 회고', 'rose'],
}

function AppBar() {
  return (
    <div className="sc-titlebar">
      <img src={planTo.wordmark} alt="" width="840" height="270" />
      <div className="sc-tools">
        <i className="sc-chat-tool" /><span>전체 계획</span><span className="sc-tool-gear">⚙</span>
        <span className="sc-window-buttons">─　□　×</span>
      </div>
    </div>
  )
}

function Sidebar() {
  return (
    <div className="sc-sidebar">
      <div className="sc-search"><i /> 일정 검색</div>
      <div className="sc-mini-month"><b>2026년 11월</b><span>‹　›</span></div>
      <div className="sc-mini-calendar">
        {weekdays.map(day => <b key={day}>{day}</b>)}
        {dates.map(day => <span key={day} className={day === 25 ? 'sc-today' : day > 30 ? 'sc-muted-day' : undefined}>{day > 30 ? day - 30 : day}</span>)}
      </div>
      <div className="sc-sidebar-agenda">
        <strong>할 일</strong>
        <small>선택한 날짜</small>
        <div><i />자료 정리</div>
        <div><i />회의 준비</div>
      </div>
    </div>
  )
}

function Calendar() {
  return (
    <div className="sc-month">
      <div className="sc-month-nav">
        <strong>2026년 11월</strong><span>오늘</span><b>‹　›</b>
      </div>
      <div className="sc-weekdays">{weekdays.map(day => <span key={day}>{day}</span>)}</div>
      <div className="sc-days">
        {dates.map(day => {
          const existing = appointments[day]
          const addition = storyAppointments.find(entry => entry.day === day)
          return (
            <div className={`sc-date sc-date-${day}${day > 30 ? ' sc-muted-day' : ''}`} key={day}>
              <span className="sc-number">{day > 30 ? day - 30 : day}</span>
              {existing && <span className={`sc-event sc-event-${existing[1]}`}>{existing[0]}</span>}
              {addition && <span className={`sc-event sc-event-${addition.color} sc-new-event`}><time>{addition.time}</time> {addition.title}</span>}
            </div>
          )
        })}
        <div className="sc-click">
          <i className="sc-wave sc-wave-first" /><i className="sc-wave sc-wave-second" />
          <i className="sc-pointer" />
        </div>
      </div>
    </div>
  )
}

function Chat() {
  return (
    <div className="sc-chat-viewport">
      <div className="sc-chat">
        <div className="sc-chat-title"><i className="sc-chat-tool" /> AI 채팅</div>
        <div className="sc-chat-content">
          <div className="sc-request">
            <span>이번 주 일정을 등록해 줘.</span>
            <div className="sc-request-rows">
              {storyAppointments.map(event => <div key={event.day}><b>{event.day}일</b><time>{event.time}</time>{event.title}</div>)}
            </div>
          </div>
          <div className="sc-reply">
            <img src={planTo.wordmark} alt="" width="840" height="270" />
            <div className="sc-synced"><i>✓</i><span>Google 캘린더 동기화 완료</span></div>
            <strong>일정 등록 완료!</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

// The illustration's structure stays fixed. Scroll updates only its paint and layout variables.
const appFrame = (
  <div className="sc-frame">
    <AppBar />
    <div className="sc-workspace"><Sidebar /><Calendar /><Chat /></div>
  </div>
)

export function StoryCalendar({ progress }: { progress: number }) {
  const chat = phase(progress, 6.02, 6.23)
  const move = phase(progress, 3.67, 3.94)
  const pointer = phase(progress, 3.07, 3.23) * (1 - phase(progress, 4.34, 4.53))
  const clickTime = progress - (progress < 3.79 ? 3.29 : 3.94)
  const first = phase(clickTime, 0, .15)
  const second = phase(clickTime, .15, .30)
  const variables = {
    '--sc-chat-width': `${chat * 34}%`,
    '--sc-chat-open': chat,
    '--sc-request': phase(progress, 6.05, 6.31),
    '--sc-reply': phase(progress, 7.36, 7.49),
    '--sc-synced': phase(progress, 7.44, 7.56),
    '--sc-complete': phase(progress, 7.62, 7.76),
    '--sc-add-25': phase(progress, 6.35, 6.51),
    '--sc-add-26': phase(progress, 6.51, 6.67),
    '--sc-add-27': phase(progress, 6.67, 6.83),
    '--sc-selected-25': phase(progress, 3.36, 3.46) * (1 - phase(progress, 3.98, 4.11)),
    '--sc-selected-26': phase(progress, 4.01, 4.16) * (1 - phase(progress, 5.71, 5.92)),
    '--sc-pointer-x': `${(3.31 + move) * 100 / 7}%`,
    '--sc-pointer': pointer,
    '--sc-wave-one': first,
    '--sc-wave-two': second,
    '--sc-wave-one-alpha': Math.sin(Math.PI * first),
    '--sc-wave-two-alpha': Math.sin(Math.PI * second),
  } as CSSProperties
  return <div className="story-app" aria-hidden="true" style={variables}>{appFrame}</div>
}
