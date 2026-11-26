import { useEffect, useRef, useState } from 'react'
import androidQr from '../assets/plan-to-android-qr.svg'
import iosQr from '../assets/plan-to-ios-qr.svg'
import { planToRelease } from '../data/brand'
import { useLanguage } from '../i18n'
import './platform-downloads.css'

const mobilePlatforms = [
  { id: 'android', name: 'Android', qr: androidQr },
  { id: 'ios', name: 'iOS', qr: iosQr },
] as const

export function PlatformDownloads() {
  const { t } = useLanguage()
  const dialog = useRef<HTMLDialogElement>(null)
  const [selected, setSelected] = useState(() => {
    const id = new URLSearchParams(window.location.search).get('platform')
    return mobilePlatforms.find(platform => platform.id === id)
  })

  useEffect(() => {
    if (selected && !dialog.current?.open) dialog.current?.showModal()
  }, [selected])

  function dismiss() {
    setSelected(undefined)
    const url = new URL(window.location.href)
    if (mobilePlatforms.some(platform => platform.id === url.searchParams.get('platform'))) {
      url.searchParams.delete('platform')
      window.history.replaceState(window.history.state, '', url)
    }
  }

  return (
    <div className="platform-downloads">
      <a className="platform-windows" href={planToRelease.download}>
        <span className="pt-download__windows" aria-hidden="true" />
        <span>Windows <span>{t('다운로드', 'Download', 'ダウンロード')}</span></span>
      </a>
      {mobilePlatforms.map(platform => (
        <button type="button" className="platform-mobile" key={platform.id} onClick={() => setSelected(platform)}
          aria-haspopup="dialog" aria-label={`${platform.name} QR · Coming soon`}>
          <img src={platform.qr} width="33" height="33" alt="" />
          <strong>{platform.name}</strong>
          <small className="platform-qr-badge" lang="en">Coming soon</small>
        </button>
      ))}
      <dialog ref={dialog} className="platform-dialog" onClose={dismiss} aria-labelledby="platform-title">
        {selected && <>
          <h2 id="platform-title">Plan to · {selected.name}</h2>
          <div className="platform-dialog-qr">
            <img src={selected.qr} width="205" height="205" alt={`${selected.name} QR`} />
            <small className="platform-qr-badge" lang="en">Coming soon</small>
          </div>
          <p>{t(`${selected.name} 버전은 출시 준비 중입니다.`, `Plan to for ${selected.name} is coming soon.`, `${selected.name} 版は公開準備中です。`)}</p>
          <form method="dialog"><button>{t('닫기', 'Close', '閉じる')}</button></form>
        </>}
      </dialog>
    </div>
  )
}
