import { type CSSProperties } from 'react'
import { planTo } from '../data/brand'
import { scenePhase as phase, storyAppointments } from '../data/story'
import { useLanguage, type Language } from '../i18n'
import './story-calendar.css'

const weekdays = {
  ko: ['일', '월', '화', '수', '목', '금', '토'],
  en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  ja: ['日', '月', '火', '水', '木', '金', '土'],
}
const month = { ko: '2026년 11월', en: 'November 2026', ja: '2026年11月' }
// November 2026 starts on Sunday and fills five visible calendar rows.
const dates = Array.from({ length: 35 }, (_, index) => index + 1)
const appointments: Record<number, { title: Record<Language, string>; color: string }> = {
  2: { title: { ko: '월간 계획', en: 'Monthly planning', ja: '月間計画' }, color: 'blue' },
  4: { title: { ko: '팀 점심', en: 'Team lunch', ja: 'チームランチ' }, color: 'rose' },
  6: { title: { ko: '인터뷰', en: 'Interview', ja: 'インタビュー' }, color: 'mint' },
  9: { title: { ko: '새 프로젝트', en: 'New project', ja: '新規プロジェクト' }, color: 'mint' },
  12: { title: { ko: '도서관', en: 'Library', ja: '図書館' }, color: 'blue' },
  17: { title: { ko: '데모 리허설', en: 'Demo rehearsal', ja: 'デモのリハーサル' }, color: 'mint' },
  20: { title: { ko: '전시 관람', en: 'Exhibition', ja: '展覧会' }, color: 'lilac' },
  23: { title: { ko: '자료 조사', en: 'Research', ja: '資料調査' }, color: 'blue' },
  30: { title: { ko: '11월 회고', en: 'November review', ja: '11月の振り返り' }, color: 'rose' },
}

function AppBar() {
  const { t } = useLanguage()
  return (
    <div className="sc-titlebar">
      <img src={planTo.wordmark} alt="" width="840" height="270" />
      <div className="sc-tools">
        <i className="sc-chat-tool" /><span>{t('전체 계획', 'All plans', 'すべての予定')}</span><span className="sc-tool-gear">⚙</span>
        <span className="sc-window-buttons">─　□　×</span>
      </div>
    </div>
  )
}

function Sidebar() {
  const { language, t } = useLanguage()
  return (
    <div className="sc-sidebar">
      <div className="sc-search"><i /> {t('일정 검색', 'Find an event', '予定を検索')}</div>
      <div className="sc-mini-month"><b>{month[language]}</b><span>‹　›</span></div>
      <div className="sc-mini-calendar">
        {weekdays[language].map(day => <b key={day}>{day}</b>)}
        {dates.map(day => <span key={day} className={day === 25 ? 'sc-today' : day > 30 ? 'sc-muted-day' : undefined}>{day > 30 ? day - 30 : day}</span>)}
      </div>
      <div className="sc-sidebar-agenda">
        <strong>{t('할 일', 'Tasks', 'タスク')}</strong>
        <small>{t('선택한 날짜', 'Selected day', '選択中の日付')}</small>
        <div><i />{t('자료 정리', 'Organize files', '資料の整理')}</div>
        <div><i />{t('회의 준비', 'Meeting prep', '会議の準備')}</div>
      </div>
    </div>
  )
}

function Calendar() {
  const { language, t } = useLanguage()
  return (
    <div className="sc-month">
      <div className="sc-month-nav">
        <strong>{month[language]}</strong><span>{t('오늘', 'Today', '今日')}</span><b>‹　›</b>
      </div>
      <div className="sc-weekdays">{weekdays[language].map(day => <span key={day}>{day}</span>)}</div>
      <div className="sc-days">
        {dates.map(day => {
          const existing = appointments[day]
          const addition = storyAppointments.find(entry => entry.day === day)
          return (
            <div className={`sc-date sc-date-${day}${day > 30 ? ' sc-muted-day' : ''}`} key={day}>
              <span className="sc-number">{day > 30 ? day - 30 : day}</span>
              {existing && <span className={`sc-event sc-event-${existing.color}`}>{existing.title[language]}</span>}
              {addition && <span className={`sc-event sc-event-${addition.color} sc-new-event`}><time>{addition.time}</time> {addition.title[language]}</span>}
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
  const { language, t } = useLanguage()
  return (
    <div className="sc-chat-viewport">
      <div className="sc-chat">
        <div className="sc-chat-title"><i className="sc-chat-tool" /> {t('AI 채팅', 'AI chat', 'AIチャット')}</div>
        <div className="sc-chat-content">
          <div className="sc-request">
            <span>{t('이번 주 일정을 등록해 줘.', 'Add these events for this week.', '今週の予定を登録して。')}</span>
            <div className="sc-request-rows">
              {storyAppointments.map(event => <div key={event.day}><b>{t(`${event.day}일`, `${event.day}th`, `${event.day}日`)}</b><time>{event.time}</time>{event.title[language]}</div>)}
            </div>
          </div>
          <div className="sc-reply">
            <img src={planTo.wordmark} alt="" width="840" height="270" />
            <div className="sc-synced"><i>✓</i><span>{t('Google 캘린더 동기화 완료', 'Google Calendar synced', 'Google カレンダーと同期完了')}</span></div>
            <strong>{t('일정 등록 완료!', 'Events added!', '予定を登録しました！')}</strong>
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
