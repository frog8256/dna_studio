import { useLayoutEffect, useState } from 'react'
import { base, asset, planToPath } from '../data/paths'

function getHomeSection() {
  return window.location.hash === '#korea-plus' ? 'korea-plus' : 'about'
}

export function Header({ isPlanTo }: { isPlanTo: boolean }) {
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
        <a className="site-logo" href={base} aria-label="DNA Studio 홈">
          <img src={asset('/brand/dna-studio-wordmark.webp')} alt="" width="86" height="34" />
        </a>
        <nav className="nav-pill" aria-label="주 메뉴">
          <a href={`${base}#about`} aria-current={!isPlanTo && section === 'about' ? 'location' : undefined}>
            About us
          </a>
          <a href={planToPath} aria-current={isPlanTo ? 'page' : undefined}>Plan to</a>
          <a href={`${base}#korea-plus`} aria-current={!isPlanTo && section === 'korea-plus' ? 'location' : undefined}>
            Korea Plus+
          </a>
        </nav>
      </div>
    </header>
  )
}
