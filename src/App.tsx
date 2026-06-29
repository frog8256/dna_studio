import type { CSSProperties, PointerEvent } from 'react'
import { useRef } from 'react'
import { ContactFooter } from './components/ContactFooter'
import { DNAFramework } from './components/DNAFramework'
import { Header } from './components/Header'
import { HeroCarousel } from './components/HeroCarousel'
import { ServicesGrid } from './components/ServicesGrid'

const stars = Array.from({ length: 96 }, (_, index) => {
  const x = (index * 37 + (index % 7) * 13) % 100
  const y = (index * 61 + (index % 11) * 17) % 100
  const size = 1 + ((index * 19) % 24) / 14
  const alpha = 0.22 + ((index * 23) % 46) / 100
  const duration = 3.8 + ((index * 29) % 42) / 10
  const delay = -((index * 31) % 70) / 10

  return { alpha, delay, duration, id: index, size, x, y }
})

function CosmicBackground() {
  return (
    <div className="cosmic-background" aria-hidden="true">
      {stars.map((star) => (
        <span
          className="cosmic-star"
          data-star-x={star.x}
          data-star-y={star.y}
          key={star.id}
          style={
            {
              '--star-alpha': star.alpha,
              '--star-boost': 0,
              '--star-delay': `${star.delay}s`,
              '--star-duration': `${star.duration}s`,
              '--star-size': `${star.size}px`,
              '--star-x': `${star.x}%`,
              '--star-y': `${star.y}%`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}

function App() {
  const frameRef = useRef<number | null>(null)

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event

    if (frameRef.current != null) {
      window.cancelAnimationFrame(frameRef.current)
    }

    frameRef.current = window.requestAnimationFrame(() => {
      const stars = document.querySelectorAll<HTMLElement>('.cosmic-star')
      const width = window.innerWidth
      const height = window.innerHeight

      stars.forEach((star) => {
        const x = (Number(star.dataset.starX) / 100) * width
        const y = (Number(star.dataset.starY) / 100) * height
        const distance = Math.hypot(clientX - x, clientY - y)
        const boost = Math.max(0, 1 - distance / 190)

        star.style.setProperty('--star-boost', boost.toFixed(3))
      })
    })
  }

  return (
    <div
      className="app-shell"
      onPointerMove={handlePointerMove}
    >
      <CosmicBackground />
      <Header />
      <main>
        <HeroCarousel />
        <DNAFramework />
        <ServicesGrid />
      </main>
      <ContactFooter />
    </div>
  )
}

export default App
