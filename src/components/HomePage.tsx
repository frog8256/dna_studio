import { planTo, koreaPlus } from '../data/brand'
import { asset, planToPath } from '../data/paths'
import { PlanToPreview } from './PlanToPreview'
import { useLanguage } from '../i18n'

export function HomePage() {
  const { t } = useLanguage()
  return (
    <>
      <section id="about" className="container about" aria-labelledby="about-title">
        <h1 id="about-title">DNA Studio</h1>
        <p>{t('일상에 필요한 서비스를 만드는 소프트웨어 브랜드, DNA Studio입니다.', 'DNA Studio builds software for everyday life.', 'DNA Studioは、毎日の暮らしに役立つソフトウェアをつくるスタジオです。')}</p>
      </section>

      <section className="product-section" aria-labelledby="plan-to-title">
        <div className="container product-layout">
          <div className="product-copy">
            <img className="plan-to-wordmark" src={planTo.wordmark} alt={planTo.name} width="840" height="270" />
            <h2 id="plan-to-title">{t(planTo.title, 'Your calendar and tasks, right on your desktop.', '予定もタスクも、デスクトップに。')}</h2>
            <p>{t('일정 확인과 할 일 관리를 더 가깝고, 더 간편하게.', 'See what’s coming up and check off today’s tasks.', 'これからの予定を確認して、今日のタスクをチェックできます。')}</p>
            <a className="primary-button" href={planToPath}>
              {t('Plan to 자세히 보기', 'Explore Plan to', 'Plan toについて詳しく見る')}
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
            <h2 id="korea-plus-title">{t('한국의 문화, 행사, 여행 정보를 한곳에서.', 'Korean culture, events and travel in one place.', '韓国の文化・イベント・旅の情報をひとつに。')}</h2>
            <p>{t('한국의 소식과 다가오는 행사, 여행 가이드를 만나보세요.', 'Find news from Korea, upcoming events and travel guides.', '韓国のニュースや開催予定のイベント、旅行ガイドをチェックできます。')}</p>
            <a className="primary-button" href={koreaPlus.url}>
              {t('서비스 열기', 'Visit Korea Plus+', 'Korea Plus+を開く')} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <img
            className="product-preview"
            src={asset('/products/korea-plus.webp')}
            alt={t('Korea Plus+ 웹서비스 홈 화면', 'Korea Plus+ homepage', 'Korea Plus+のホーム画面')}
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
