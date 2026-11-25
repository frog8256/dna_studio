import type { ReactNode } from 'react'
import { scenePhase as ease } from '../data/story'
import './story-windows.css'

function AppWindow({ name, title, icon, progress, open, close, children }: {
  name: string
  title: string
  icon: string
  progress: number
  open: number
  close: number
  children: ReactNode
}) {
  const entering = ease(progress, open, open + .28)
  const leaving = ease(progress, close, close + .22)
  const visibility = entering * (1 - leaving)
  if (visibility === 0) return null

  return (
    <div aria-hidden="true" className={`sw-window sw-${name}`} style={{
      opacity: visibility,
      transform: `translateY(${(1 - entering) * 5 + leaving * 4}cqh) scale(${.89 + visibility * .11})`,
    }}>
      <div className="sw-titlebar">
        <span className={`sw-app-icon sw-icon-${name}`}>{icon}</span>{title}
        <span className="sw-controls"><i>─</i><i>□</i><i>×</i></span>
      </div>
      {children}
    </div>
  )
}

const folders = ['브랜드 자료', '기획 문서', '참고 이미지']

function Explorer() {
  return (
    <>
      <div className="sw-location"><b>‹</b><b>›</b><span>내 PC　›　문서　›　프로젝트</span></div>
      <div className="sw-explorer-layout">
        <div className="sw-directory"><b>즐겨찾기</b><span>⌂　홈</span><strong>▤　문서</strong><span>↓　다운로드</span><span>▧　사진</span></div>
        <div className="sw-files">
          <strong>프로젝트</strong>
          <div className="sw-folder-grid">{folders.map(name => <div key={name}><i />{name}</div>)}</div>
          <div className="sw-file-row"><span>▤</span> 11월 일정표.xlsx <small>오늘</small></div>
          <div className="sw-file-row"><span>▤</span> 회의록.docx <small>어제</small></div>
        </div>
      </div>
    </>
  )
}

function BrowserWindow() {
  return (
    <>
      <div className="sw-location"><b>‹</b><b>›</b><span>⌕　fieldnotes.example</span></div>
      <div className="sw-browser-page">
        <div className="sw-journal-nav"><b>Fieldnotes</b><span>Journal　 Archive</span></div>
        <div className="sw-journal-image"><div><small>TRAVEL JOURNAL</small><strong>숲길을 걷는 아침</strong></div></div>
      </div>
    </>
  )
}

function Messenger() {
  return (
    <div className="sw-messenger-body">
      <div className="sw-room"><i>#</i><div><b>디자인 팀</b><small>팀 채팅 · 3명</small></div></div>
      <div className="sw-thread">
        <div className="sw-bubble-row"><i>수</i><div><strong>수아</strong><span>다음 시안 검토는 언제가 좋을까요?</span></div></div>
        <div className="sw-my-bubble">내일 오후에 확인할게요.</div>
        <div className="sw-bubble-row"><i>현</i><div><strong>지현</strong><span>회의 자료도 올려둘게요.</span></div></div>
      </div>
      <div className="sw-compose">메시지 입력 <span>↵</span></div>
    </div>
  )
}

const mail = [
  ['수아', '주간 회의 자료를 공유합니다', '첨부한 문서를 확인해 주세요.', '10:24'],
  ['디자인 팀', '프로젝트 시안 검토 요청', '새로운 시안을 정리했어요.', '09:10'],
  ['스튜디오', '11월 팀 소식', '이번 달 소식을 전합니다.', '어제'],
]

function Mail() {
  return (
    <div className="sw-mail-body">
      <div className="sw-mail-nav"><b>✉　메일</b><strong>받은 편지함</strong><span>보낸 편지함</span><span>임시 보관함</span></div>
      <div className="sw-inbox">
        <strong>받은 편지함</strong>
        {mail.map(([sender, title, excerpt, when]) => (
          <div className="sw-mail-row" key={sender}><div><b>{sender}</b><time>{when}</time></div><strong>{title}</strong><span>{excerpt}</span></div>
        ))}
      </div>
    </div>
  )
}

export function StoryWindows({ progress }: { progress: number }) {
  return (
    <>
      <AppWindow name="explorer" title="파일 탐색기" icon="▰" progress={progress} open={.90} close={5.73}><Explorer /></AppWindow>
      <AppWindow name="browser" title="웹 브라우저" icon="◉" progress={progress} open={1.20} close={5.61}><BrowserWindow /></AppWindow>
      <AppWindow name="messenger" title="메신저" icon="••" progress={progress} open={1.52} close={5.49}><Messenger /></AppWindow>
      <AppWindow name="mail" title="메일" icon="✉" progress={progress} open={1.83} close={5.38}><Mail /></AppWindow>
    </>
  )
}

const notes = [
  { id: 'mint', date: '11월 25일 수요일', title: '디자인 리뷰', time: '오후 2:00', text: '첫 화면 시안 두 가지 비교하기', start: 3.60, dragStart: 4.42, left: 35, top: 35, target: 18 },
  { id: 'peach', date: '11월 26일 목요일', title: '팀 워크숍', time: '오전 10:00', text: '다음 달 진행할 주제 모으기', start: 4.22, dragStart: 4.79, left: 52, top: 62, target: 54 },
] as const

export function StoryStickers({ progress }: { progress: number }) {
  return notes.map(note => {
    const visible = ease(progress, note.start, note.start + .13)
    const drag = ease(progress, note.dragStart, note.dragStart + .37)
    if (visible === 0) return null

    return (
      <div key={note.id} aria-hidden="true" className={`sw-sticker sw-sticker-${note.id}`} style={{
        left: `${note.left + (76 - note.left) * drag}%`,
        top: `${note.top + (note.target - note.top) * drag}%`,
        opacity: visible, zIndex: progress >= 6.02 ? 4 : 24,
        transform: `scale(${.72 + .28 * visible}) rotate(${Math.sin(drag * Math.PI) * -2}deg)`,
      }}>
        <div className="sw-sticker-bar"><span>{note.date}</span><i className="sw-pin" /></div>
        <div className="sw-sticker-text"><strong>{note.title}</strong><small>{note.time}</small><span>{note.text}</span></div>
      </div>
    )
  })
}
