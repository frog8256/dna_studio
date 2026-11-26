import { useLayoutEffect, useState } from 'react'
import { base, asset, planToPath } from '../data/paths'
import { useLanguage } from '../i18n'
import { LanguageSwitch } from './LanguageSwitch'
import { PlatformDownloads } from './PlatformDownloads'

function getHomeSection() {
  return window.location.hash === '#korea-plus' ? 'korea-plus' : 'about'
}

export function Header({ isPlanTo }: { isPlanTo: boolean }) {
  const { t } = useLanguage()
  const [section, setSection] = useState(getHomeSection)

  useLayoutEffect(() => {
    if (isPlanTo) return

    if (window.location.hash === '#korea-plus') {
      document.getElementById('korea-plus')?.scrollIntoView({ behavior: 'instant' })
    }

    const updateSection = () => setSection(getHomeSection())
    window.addEventListener('hashchange', updateSection)
    return () => window.removeEventListener('hashchange', updateSection)
  }, [isPlanTo])

  return (
    <header className="site-header">
      <div className="container header-content">
        <a className="site-logo" href={base} aria-label={t('DNA Studio 홈', 'DNA Studio home', 'DNA Studio ホーム')}>
          <img src={asset('/brand/dna-studio-wordmark.webp')} alt="" width="86" height="34" />
        </a>
        <nav className="nav-pill" aria-label={t('주 메뉴', 'Main menu', 'メインメニュー')}>
          <a href={`${base}#about`} aria-current={!isPlanTo && section === 'about' ? 'location' : undefined}>
            {t('스튜디오 소개', 'About us', 'スタジオ紹介')}
          </a>
          <a href={planToPath} aria-current={isPlanTo ? 'page' : undefined}>Plan to</a>
          <a href={`${base}#korea-plus`} aria-current={!isPlanTo && section === 'korea-plus' ? 'location' : undefined}>
            Korea Plus+
          </a>
        </nav>
        <LanguageSwitch />
      </div>
      {isPlanTo && <PlatformDownloads />}
    </header>
  )
}
