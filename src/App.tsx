import { Header } from './components/Header'
import { HomePage } from './components/HomePage'
import { PlanToPage } from './components/PlanToPage'

export default function App({ isPlanTo }: { isPlanTo: boolean }) {
  return (
    <>
      <a className="skip-link" href="#main">본문으로 이동</a>
      <Header isPlanTo={isPlanTo} />
      <main id="main" tabIndex={-1}>
        {isPlanTo ? <PlanToPage /> : <HomePage />}
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
