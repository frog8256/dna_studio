import { planToRelease } from '../data/brand'
import { useLanguage } from '../i18n'
import './platform-downloads.css'

export function PlatformDownloads() {
  const { t } = useLanguage()
  return (
    <div className="platform-downloads">
      <a className="platform-features" href="#features">{t('기능 보기', 'Features', '機能を見る')}</a>
      <a className="platform-windows" href={planToRelease.download}
        aria-label={t('Download · Windows용 다운로드', 'Download for Windows', 'Download · Windows版をダウンロード')}>
        <span className="pt-download__windows" aria-hidden="true" />
        <span lang="en">Download</span>
      </a>
      <div className="platform-mobile" lang="en">
        <strong>Android / iOS</strong>
        <small>Coming soon</small>
      </div>
    </div>
  )
}
