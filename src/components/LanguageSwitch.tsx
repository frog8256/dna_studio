import { useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { languages, useLanguage } from '../i18n'

const names = { ko: '한국어', en: 'English', ja: '日本語' }

export function LanguageSwitch() {
  const { language, setLanguage, t } = useLanguage()
  const gesture = useRef<{ id: number; startX: number; dragging: boolean } | null>(null)
  const ignoreDragClick = useRef(false)
  const [preview, setPreview] = useState<number | null>(null)
  const position = preview ?? languages.indexOf(language)

  function pointerPosition(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    return Math.max(0, Math.min(2, (event.clientX - rect.left) * 3 / rect.width - .5))
  }

  function endGesture() {
    gesture.current = null
    setPreview(null)
  }

  return (
    <div className="language-switch" role="radiogroup" aria-label={t('언어 선택', 'Language', '言語選択')}>
      <div className="language-switch__track" data-dragging={preview !== null || undefined}
        style={{ '--language-position': position } as CSSProperties}
        onPointerDown={event => {
          if (!event.isPrimary || event.button !== 0) return
          ignoreDragClick.current = false
          gesture.current = { id: event.pointerId, startX: event.clientX, dragging: false }
        }}
        onPointerMove={event => {
          const current = gesture.current
          if (!current || event.pointerId !== current.id) return
          if (!current.dragging) {
            if (Math.abs(event.clientX - current.startX) < 5) return
            event.currentTarget.setPointerCapture(event.pointerId)
            current.dragging = true
          }
          setPreview(pointerPosition(event))
        }}
        onPointerUp={event => {
          if (gesture.current?.id !== event.pointerId) return
          if (gesture.current.dragging) {
            const next = languages[Math.round(pointerPosition(event))]
            ignoreDragClick.current = true
            setLanguage(next)
            event.currentTarget.querySelector<HTMLInputElement>(`input[value="${next}"]`)?.focus({ preventScroll: true })
          }
          endGesture()
        }}
        onPointerCancel={endGesture}
        onLostPointerCapture={event => { if (event.target === event.currentTarget) endGesture() }}
        onPointerLeave={() => { if (!gesture.current?.dragging) endGesture() }}
        onClickCapture={event => {
          if (ignoreDragClick.current && event.detail > 0) {
            ignoreDragClick.current = false
            event.preventDefault()
          }
        }}>
        <span className="language-switch__thumb" aria-hidden="true" />
        {languages.map((option, index) => (
          <label key={option} lang={option} data-active={Math.round(position) === index || undefined}>
            <input type="radio" name="site-language" value={option} checked={language === option}
              onChange={() => setLanguage(option)} />
            <span>{names[option]}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
