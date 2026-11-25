import type { ReactNode } from 'react'
import { scenePhase as ease } from '../data/story'
import { windowCopy, type WindowCopy } from '../data/window-copy'
import { useLanguage } from '../i18n'
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

function Explorer({ copy }: { copy: WindowCopy['explorer'] }) {
  return (
    <>
      <div className="sw-location"><b>‹</b><b>›</b><span>{copy.path}</span></div>
      <div className="sw-explorer-layout">
        <div className="sw-directory">
          <b>{copy.favorites}</b><span>⌂　{copy.home}</span><strong>▤　{copy.documents}</strong>
          <span>↓　{copy.downloads}</span><span>▧　{copy.pictures}</span>
        </div>
        <div className="sw-files">
          <strong>{copy.projects}</strong>
          <div className="sw-folder-grid">{copy.folders.map(name => <div key={name}><i />{name}</div>)}</div>
          {copy.files.map(([name, date]) => <div className="sw-file-row" key={name}><span>▤</span> {name} <small>{date}</small></div>)}
        </div>
      </div>
    </>
  )
}

function BrowserWindow({ copy }: { copy: WindowCopy['browser'] }) {
  return (
    <>
      <div className="sw-location"><b>‹</b><b>›</b><span>⌕　fieldnotes.example</span></div>
      <div className="sw-browser-page">
        <div className="sw-journal-nav"><b>Fieldnotes</b><span>{copy.nav}</span></div>
        <div className="sw-journal-image"><div><small>{copy.section}</small><strong>{copy.headline}</strong></div></div>
      </div>
    </>
  )
}

function Messenger({ copy }: { copy: WindowCopy['messenger'] }) {
  const [firstInitial, firstName, firstMessage] = copy.first
  const [lastInitial, lastName, lastMessage] = copy.last
  return (
    <div className="sw-messenger-body">
      <div className="sw-room"><i>#</i><div><b>{copy.room}</b><small>{copy.members}</small></div></div>
      <div className="sw-thread">
        <div className="sw-bubble-row"><i>{firstInitial}</i><div><strong>{firstName}</strong><span>{firstMessage}</span></div></div>
        <div className="sw-my-bubble">{copy.reply}</div>
        <div className="sw-bubble-row"><i>{lastInitial}</i><div><strong>{lastName}</strong><span>{lastMessage}</span></div></div>
      </div>
      <div className="sw-compose">{copy.compose} <span>↵</span></div>
    </div>
  )
}

function Mail({ copy }: { copy: WindowCopy['mail'] }) {
  return (
    <div className="sw-mail-body">
      <div className="sw-mail-nav"><b>✉　{copy.title}</b><strong>{copy.inbox}</strong><span>{copy.sent}</span><span>{copy.drafts}</span></div>
      <div className="sw-inbox">
        <strong>{copy.inbox}</strong>
        {copy.messages.map(([sender, title, excerpt, when]) => (
          <div className="sw-mail-row" key={sender}><div><b>{sender}</b><time>{when}</time></div><strong>{title}</strong><span>{excerpt}</span></div>
        ))}
      </div>
    </div>
  )
}

export function StoryWindows({ progress }: { progress: number }) {
  const copy = windowCopy[useLanguage().language]
  return (
    <>
      <AppWindow name="explorer" title={copy.explorer.title} icon="▰" progress={progress} open={.90} close={5.73}><Explorer copy={copy.explorer} /></AppWindow>
      <AppWindow name="browser" title={copy.browser.title} icon="◉" progress={progress} open={1.20} close={5.61}><BrowserWindow copy={copy.browser} /></AppWindow>
      <AppWindow name="messenger" title={copy.messenger.title} icon="••" progress={progress} open={1.52} close={5.49}><Messenger copy={copy.messenger} /></AppWindow>
      <AppWindow name="mail" title={copy.mail.title} icon="✉" progress={progress} open={1.83} close={5.38}><Mail copy={copy.mail} /></AppWindow>
    </>
  )
}

const notes = [
  { id: 'mint', start: 3.60, dragStart: 4.42, left: 35, top: 35, target: 18 },
  { id: 'peach', start: 4.22, dragStart: 4.79, left: 52, top: 62, target: 54 },
] as const

export function StoryStickers({ progress }: { progress: number }) {
  const copy = windowCopy[useLanguage().language].stickers
  return notes.map(note => {
    const visible = ease(progress, note.start, note.start + .13)
    const drag = ease(progress, note.dragStart, note.dragStart + .37)
    if (visible === 0) return null
    const { date, title, time, text } = copy[note.id]

    return (
      <div key={note.id} aria-hidden="true" className={`sw-sticker sw-sticker-${note.id}`} style={{
        left: `${note.left + (76 - note.left) * drag}%`,
        top: `${note.top + (note.target - note.top) * drag}%`,
        opacity: visible, zIndex: progress >= 6.02 ? 4 : 24,
        transform: `scale(${.72 + .28 * visible}) rotate(${Math.sin(drag * Math.PI) * -2}deg)`,
      }}>
        <div className="sw-sticker-bar"><span>{date}</span><i className="sw-pin" /></div>
        <div className="sw-sticker-text"><strong>{title}</strong><small>{time}</small><span>{text}</span></div>
      </div>
    )
  })
}
