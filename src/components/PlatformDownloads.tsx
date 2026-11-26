import { planToRelease } from '../data/brand'
import { useLanguage } from '../i18n'
import './platform-downloads.css'

export function PlatformDownloads() {
  const { t } = useLanguage()
  return (
    <div className="platform-downloads">
      <a className="platform-windows" href={planToRelease.download}>
        <span className="pt-download__windows" aria-hidden="true" />
        <span>Windows <span>{t('다운로드', 'Download', 'ダウンロード')}</span></span>
      </a>
      <div className="platform-mobile" lang="en">
        <strong>Android / iOS</strong>
        <small>Coming soon</small>
      </div>
    </div>
  )
}
