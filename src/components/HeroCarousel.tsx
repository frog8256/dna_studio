import { useMemo, useRef, useState } from 'react'
import { brandAssets, services } from '../data/brand'

const carouselServices = services
const initialActiveIndex = 0

function getPosition(index: number, activeIndex: number) {
  const total = carouselServices.length
  const offset = (index - activeIndex + total) % total

  if (offset === 0) return 'active'
  if (offset === 1) return 'right'
  if (offset === total - 1) return 'left'
  return 'back'
}

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef<number | null>(null)
  const dragDeltaX = useRef(0)

  const activeService = carouselServices[activeIndex]
  const positionedServices = useMemo(
    () =>
      carouselServices.map((service, index) => ({
        service,
        position: getPosition(index, activeIndex),
      })),
    [activeIndex],
  )

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + carouselServices.length) % carouselServices.length)
  }

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % carouselServices.length)
  }

  const resetDrag = () => {
    dragStartX.current = null
    dragDeltaX.current = 0
    setIsDragging(false)
  }

  const endDrag = () => {
    const delta = dragDeltaX.current

    if (Math.abs(delta) > 42) {
      if (delta < 0) {
        showNext()
      } else {
        showPrevious()
      }
    }

    resetDrag()
  }

  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-backdrop" aria-hidden="true">
        <div className="star-field" />
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="dna-ghost">
          {Array.from({ length: 9 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
      </div>

      <div className="hero-copy">
        <img className="hero-brand-logo" src={brandAssets.dnaWhite} alt="DNA Studio" />
        <span className="hero-brand-divider" aria-hidden="true" />
        <h1 id="hero-title">
          From Essence to <span>Reality</span>
        </h1>
        <p className="hero-subcopy hero-lede">
          본질을 발견하고, AI와 기술로 현실을 만듭니다.
        </p>
        <div className="hero-actions cta-row">
          <a className="primary-button button-primary" href="#services">
            Explore Our Services
          </a>
          <a className="secondary-button button-secondary" href="#contact">
            Let&apos;s Talk
          </a>
        </div>
      </div>

      <div
        aria-label={`DNA Studio service carousel, active service: ${activeService.name}`}
        className={`carousel-stage${isDragging ? ' is-dragging' : ''}`}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') showPrevious()
          if (event.key === 'ArrowRight') showNext()
        }}
        onPointerCancel={resetDrag}
        onPointerDown={(event) => {
          dragStartX.current = event.clientX
          dragDeltaX.current = 0
          setIsDragging(true)
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerMove={(event) => {
          if (dragStartX.current == null) return
          dragDeltaX.current = event.clientX - dragStartX.current
        }}
        onPointerUp={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId)
          }
          endDrag()
        }}
        role="region"
        tabIndex={0}
      >
        <div className="carousel-orbit" aria-hidden="true" />
        <button
          className="carousel-arrow carousel-arrow-left"
          onClick={(event) => {
            event.stopPropagation()
            resetDrag()
            showPrevious()
          }}
          onPointerDown={(event) => {
            event.stopPropagation()
            resetDrag()
          }}
          type="button"
          aria-label="Previous service"
        >
          <span aria-hidden="true">&lt;</span>
        </button>
        <button
          className="carousel-arrow carousel-arrow-right"
          onClick={(event) => {
            event.stopPropagation()
            resetDrag()
            showNext()
          }}
          onPointerDown={(event) => {
            event.stopPropagation()
            resetDrag()
          }}
          type="button"
          aria-label="Next service"
        >
          <span aria-hidden="true">&gt;</span>
        </button>
        {positionedServices.map(({ service, position }) => (
          <article
            className={`service-orbit-card ${position} tone-${service.tone}`}
            key={service.name}
            aria-label={`${service.name}: ${service.descriptor}`}
            aria-hidden={position === 'back'}
          >
            <div className="service-orbit-brand-group">
              <div
                className={`service-logo ${service.logo ? `service-logo--${service.logo.variant}` : ''}`}
                aria-hidden={!service.logo}
              >
                {service.logo ? (
                  <img src={service.logo.src} alt={service.logo.alt} />
                ) : (
                  <span>{service.initials}</span>
                )}
              </div>
              {service.name === 'My Universe' ? (
                <span className="service-orbit-brand-name">MY UNIVERSE</span>
              ) : null}
            </div>
            <div className="service-orbit-copy">
              <h2>{service.name}</h2>
              <p>{service.descriptor}</p>
            </div>
            <a
              href="#services"
              onClick={(event) => {
                if (Math.abs(dragDeltaX.current) > 8) event.preventDefault()
              }}
            >
              View Details
            </a>
            <span className="card-line" aria-hidden="true" />
          </article>
        ))}
        <div className="carousel-dots" aria-label="Carousel pagination">
          {carouselServices.map((service, index) => (
            <button
              aria-label={`Show ${service.name}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              className={index === activeIndex ? 'is-active' : undefined}
              key={service.name}
              onClick={(event) => {
                event.stopPropagation()
                resetDrag()
                setActiveIndex(index)
              }}
              onPointerDown={(event) => {
                event.stopPropagation()
                resetDrag()
              }}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
