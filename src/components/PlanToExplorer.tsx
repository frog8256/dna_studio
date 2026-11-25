import { useRef, useState, type KeyboardEvent } from 'react'
import './plan-to-explorer.css'

const features = [
  { id: 'plan', label: '계획', title: '오늘 할 일과 나중에 할 일', description: '여러 날에 걸친 일정은 월간 캘린더에, 날짜가 미정인 일은 보관함에 담으세요. 전체 계획에서 검색하거나 완료 여부로 걸러 보고, 사이드바에서 루틴을 체크하고 D-day를 확인할 수 있어요.' },
  { id: 'memo', label: '메모', title: '메모가 필요한 날짜에 붙여 두세요.', description: '날짜를 더블클릭하면 그날의 메모와 계획이 함께 열려요. 자주 볼 메모는 바탕화면에 스티커로 고정하고, 일이 구체화되면 원하는 날짜의 계획으로 옮기세요.' },
  { id: 'chat', label: 'AI 채팅', title: '일정을 바꾸고 싶을 땐 말로.', description: '로그인하면 채팅으로 일정을 등록·조회·변경할 수 있어요. 삭제는 내용을 확인한 뒤 적용해요. 이미지(PNG·JPG·WebP), PDF, TXT 파일도 2MB까지 첨부할 수 있어요.' },
] as const

const planViews = [
  { name: '오늘', heading: '11월 25일 수요일', rows: [['10:00', '주간 회의'], ['14:00', '초안 검토'], ['16:30', '도서관 들르기']] },
  { name: '일정 보관함', heading: '날짜 미정', rows: [['미정', '전시회 예약하기'], ['미정', '다음 달 여행 준비']] },
  { name: '루틴', heading: '반복하는 일', rows: [['매일', '점심 산책'], ['수요일', '저녁 스트레칭']] },
  { name: 'D-day', heading: '기다리는 날', rows: [['D-7', '새 프로젝트 시작'], ['D-16', '겨울 여행']] },
] as const

function PlanSample() {
  const [view, setView] = useState(0)
  const [done, setDone] = useState<string[]>(['초안 검토'])
  const { heading, rows } = planViews[view]
  return (
    <div className="ptx-app ptx-agenda">
      <div className="ptx-app-title"><span className="ptx-calendar-icon" aria-hidden="true" />내 플래너</div>
      <div className="ptx-agenda-layout">
        <div className="ptx-menu" role="group" aria-label="예시 목록 선택">
          {planViews.map(({ name }, index) => <button type="button" key={name} aria-pressed={view === index} onClick={() => setView(index)}>{name}</button>)}
        </div>
        <div className="ptx-day">
          <h4>{heading}</h4>
          <ul>
            {rows.map(([time, title]) => (
              <li key={title}>
                {view !== 3 ? (
                  <label>
                    <input type="checkbox" checked={done.includes(title)} onChange={event => {
                      const checked = event.currentTarget.checked
                      setDone(previous => checked ? [...previous, title] : previous.filter(item => item !== title))
                    }} />
                    <span className="ptx-task"><small>{time}</small><span>{title}</span></span>
                  </label>
                ) : <span className="ptx-countdown"><b>{time}</b>{title}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function MemoSample() {
  const [pinned, setPinned] = useState(false)
  const [assigned, setAssigned] = useState(false)
  return (
    <div className="ptx-note">
      <div className="ptx-note-bar">
        <span>바탕화면 메모</span>
        <button type="button" className="ptx-pin" aria-pressed={pinned} onClick={() => setPinned(!pinned)}>스티커로 고정<span className="ptx-switch" aria-hidden="true" /></button>
      </div>
      <div className="ptx-note-body"><h4>다음 회의에서 나눌 이야기</h4><p>첫 화면 시안 두 가지 비교하기<br />다음 주 인터뷰 일정 확인하기</p></div>
      <div className="ptx-assign">
        <span role="status">{assigned ? '11월 25일 날짜 메모에 추가했어요.' : '11월 25일 · 수요일'}</span>
        <button type="button" disabled={assigned} onClick={() => setAssigned(true)}>{assigned ? '추가 완료 ✓' : '이 날짜에 붙이기'}</button>
      </div>
    </div>
  )
}

function ChatSample() {
  const [confirmed, setConfirmed] = useState(false)
  return (
    <div className="ptx-chat">
      <div className="ptx-message">내일 주간 회의를 오후 3시로 옮겨줘.</div>
      <div className="ptx-answer">
        <strong>Plan to</strong>
        <p role="status">{confirmed ? '예시 캘린더에 변경을 적용했어요.' : '주간 회의 시간을 이렇게 바꿀까요?'}</p>
        <div className="ptx-change">
          <span>11월 26일 · 주간 회의</span>
          <div><s>오후 2:00</s><span aria-hidden="true">→</span><b>오후 3:00</b></div>
        </div>
        <button type="button" disabled={confirmed} onClick={() => setConfirmed(true)}>{confirmed ? '변경 완료 ✓' : '확인 · 변경 적용'}</button>
      </div>
    </div>
  )
}

export function PlanToExplorer() {
  const [active, setActive] = useState(0)
  const tabs = useRef<Array<HTMLButtonElement | null>>([])
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index
    switch (event.key) {
      case 'ArrowRight': next = (index + 1) % features.length; break
      case 'ArrowLeft': next = (index + features.length - 1) % features.length; break
      case 'Home': next = 0; break
      case 'End': next = features.length - 1; break
      default: return
    }
    event.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }
  return (
    <section id="features" className="ptx" aria-labelledby="ptx-heading">
      <div className="container ptx-layout">
        <div className="ptx-intro">
          <h2 id="ptx-heading">하루를 정리하는<br /> 세 가지 방법</h2>
          <div className="ptx-tabs" role="tablist" aria-label="살펴볼 기능">
            {features.map((feature, index) => (
              <button key={feature.id} ref={element => { tabs.current[index] = element }} id={`ptx-tab-${feature.id}`} role="tab" type="button" aria-selected={active === index} aria-controls={`ptx-panel-${feature.id}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => navigate(event, index)}>{feature.label}</button>
            ))}
          </div>
          <div className="ptx-copy" aria-live="polite">
            <h3>{features[active].title}</h3>
            <p>{features[active].description}</p>
          </div>
        </div>
        {features.map((feature, index) => (
          <div className="ptx-panel" role="tabpanel" id={`ptx-panel-${feature.id}`} aria-labelledby={`ptx-tab-${feature.id}`} tabIndex={0} hidden={active !== index} key={feature.id}>
            <figure className={`ptx-canvas ptx-canvas-${feature.id}`}>
              <figcaption>{feature.label} 사용 예시</figcaption>
              {feature.id === 'plan' ? <PlanSample /> : feature.id === 'memo' ? <MemoSample /> : <ChatSample />}
            </figure>
          </div>
        ))}
      </div>
    </section>
  )
}
