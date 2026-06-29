import { brandAssets, navItems } from '../data/brand'

export function Header() {
  return (
    <header className="site-header" aria-label="Primary navigation">
      <a className="brand-mark" href="#home" aria-label="DNA Studio home">
        <img className="brand-logo-image" src={brandAssets.dnaWhite} alt="DNA Studio" />
      </a>

      <nav className="desktop-nav nav-links" aria-label="Main menu">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>
            {item}
          </a>
        ))}
      </nav>

      <a className="talk-button header-cta button-primary" href="#contact">
        Let&apos;s Talk
      </a>

      <button className="menu-button" type="button" aria-label="Open navigation menu">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </header>
  )
}
