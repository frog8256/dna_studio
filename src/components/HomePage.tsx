import { planTo, koreaPlus } from '../data/brand'
import { asset, base } from '../data/paths'
import { PlanToPreview } from './PlanToPreview'

export function HomePage() {
  return (
    <>
      <section id="about" className="container about" aria-labelledby="about-title">
        <h1 id="about-title">DNA Studio</h1>
        <p>일상에 필요한 서비스를 만드는 소프트웨어 브랜드, DNA Studio입니다.</p>
      </section>

      <section className="product-section" aria-labelledby="plan-to-title">
        <div className="container product-layout">
          <div className="product-copy">
            <div className="product-brand">
              <img src={planTo.icon} alt="" width="34" height="34" />
              <span>{planTo.name}</span>
            </div>
            <h2 id="plan-to-title">{planTo.title}</h2>
            <p>일정 확인과 할 일 관리를 더 가깝고, 더 간편하게.</p>
            <a className="primary-button" href={`${base}bystep`}>
              <span className="download-icon" aria-hidden="true">↓</span> Plan to 다운로드
            </a>
          </div>
          <PlanToPreview />
        </div>
      </section>

      <section id="korea-plus" className="product-section product-section--tinted" aria-labelledby="korea-plus-title">
        <div className="container product-layout">
          <div className="product-copy">
            <div className="product-brand">
              <img src={koreaPlus.icon} alt="" width="34" height="34" />
              <span>{koreaPlus.name}</span>
            </div>
            <h2 id="korea-plus-title">한국의 문화, 행사, 여행 정보를 한곳에서.</h2>
            <p>한국의 소식과 다가오는 행사, 여행 가이드를 만나보세요.</p>
            <a className="primary-button" href={koreaPlus.url}>
              서비스 열기 <span aria-hidden="true">↗</span>
            </a>
          </div>
          <img
            className="product-preview"
            src={asset('/products/korea-plus.webp')}
            alt="Korea Plus+ 웹서비스 홈 화면"
            width="1280"
            height="750"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>
    </>
  )
}
