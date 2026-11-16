import { useLayoutEffect, useState } from 'react'

function getHomeSection() {
  return window.location.hash === '#korea-plus' ? 'korea-plus' : 'about'
}

export function Header({ isBystep }: { isBystep: boolean }) {
  const [section, setSection] = useState(getHomeSection)

  useLayoutEffect(() => {
    if (isBystep) return

    if (window.location.hash === '#korea-plus') {
      document.getElementById('korea-plus')?.scrollIntoView({ behavior: 'instant' })
    }

    const updateSection = () => setSection(getHomeSection())
    window.addEventListener('hashchange', updateSection)
    return () => window.removeEventListener('hashchange', updateSection)
  }, [isBystep])

  return (
    <header className="site-header">
      <div className="container header-content">
        <a className="site-logo" href="/" aria-label="DNA Studio 홈">
          <img src="/brand/dna-studio-wordmark.webp" alt="" width="86" height="34" />
        </a>
        <nav className="nav-pill" aria-label="주 메뉴">
          <a href="/#about" aria-current={!isBystep && section === 'about' ? 'location' : undefined}>
            About us
          </a>
          <a href="/#korea-plus" aria-current={!isBystep && section === 'korea-plus' ? 'location' : undefined}>
            Korea Plus+
          </a>
          <a href="/bystep" aria-current={isBystep ? 'page' : undefined}>Bystep</a>
        </nav>
      </div>
    </header>
  )
}
