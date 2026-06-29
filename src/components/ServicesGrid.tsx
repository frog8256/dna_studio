import { services } from '../data/brand'

const logoOnlyServices = new Set(['Korea Plus+', 'QuoteWise'])

export function ServicesGrid() {
  return (
    <section id="services" className="services-grid" aria-labelledby="services-grid-title">
      <div className="services-grid__header">
        <p className="section-eyebrow">OUR SERVICES</p>
        <h2 id="services-grid-title">Services shaped by DNA Studio.</h2>
        <a href="#contact" aria-label="View all DNA Studio services">
          View All Services
        </a>
      </div>

      <div className="services-grid__list">
        {services.map((service) => (
          <article className={`services-grid__item tone-${service.tone}`} key={service.name}>
            <div className="service-card-heading">
              <div
                className={`service-brand-group ${
                  service.name === 'My Universe' ? 'service-brand-group--universe' : ''
                }`}
              >
                <div
                  className={`services-grid__logo ${service.logo ? `services-grid__logo--${service.logo.variant}` : ''}`}
                  aria-hidden={!service.logo}
                >
                  {service.logo ? (
                    <img src={service.logo.src} alt={service.logo.alt} />
                  ) : (
                    service.initials
                  )}
                </div>
                {service.name === 'My Universe' ? (
                  <h3 className="service-card-brand-name">MY UNIVERSE</h3>
                ) : null}
              </div>
              <div className="service-card-title">
                {!logoOnlyServices.has(service.name) && service.name !== 'My Universe' ? (
                  <h3>{service.name}</h3>
                ) : null}
                <p className="services-grid__descriptor">{service.descriptor}</p>
              </div>
            </div>
            <p>{service.preview}</p>
            <a className="service-detail-link" href="#contact">
              View Details
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ServicesGrid
