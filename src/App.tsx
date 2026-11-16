import { BystepPage } from './components/BystepPage'
import { Header } from './components/Header'
import { HomePage } from './components/HomePage'

export default function App({ isBystep }: { isBystep: boolean }) {
  return (
    <>
      <a className="skip-link" href="#main">본문으로 이동</a>
      <Header isBystep={isBystep} />
      <main id="main" tabIndex={-1}>
        {isBystep ? <BystepPage /> : <HomePage />}
      </main>
      <footer className="site-footer">
        <div className="container footer-content">
          <strong>DNA Studio</strong>
          <small>Copyright © DNA Studio. All rights reserved.</small>
        </div>
      </footer>
    </>
  )
}
