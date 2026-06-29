import { framework } from '../data/brand'

const iconClassNames = ['is-orbit', 'is-atom', 'is-cube']

export function DNAFramework() {
  return (
    <section id="about" className="dna-framework" aria-labelledby="dna-framework-title">
      <div className="dna-framework__inner">
        <p className="section-eyebrow">DNA FRAMEWORK</p>
        <h2 id="dna-framework-title" className="sr-only">
          Discover Navigate Actualize
        </h2>

        <div className="dna-framework__flow">
          <span className="dna-framework__arrow dna-framework__arrow--first" aria-hidden="true" />
          <span className="dna-framework__arrow dna-framework__arrow--second" aria-hidden="true" />
          {framework.map((pillar, index) => (
            <article className="dna-framework__step" key={pillar.letter}>
              <span className={`dna-framework__icon ${iconClassNames[index]}`} aria-hidden="true">
                <span />
              </span>
              <div className="dna-framework__copy">
                <h3>
                  <span className="dna-framework__accent">{pillar.letter}</span>
                  {pillar.action.slice(1)}
                  <br />
                  <span>{pillar.secondary}</span>
                </h3>
                <p>{pillar.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DNAFramework
