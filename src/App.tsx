import { useLayoutEffect } from 'react'
import { useLanguage } from './i18n'
import { Header } from './components/Header'
import { HomePage } from './components/HomePage'
import { PlanToPage } from './components/PlanToPage'

export default function App({ isPlanTo }: { isPlanTo: boolean }) {
  const { t } = useLanguage()
  useLayoutEffect(() => {
    const title = isPlanTo
      ? t('Plan to | Windows 바탕화면 캘린더 · DNA Studio', 'Plan to | Windows Desktop Calendar · DNA Studio', 'Plan to | Windows デスクトップカレンダー · DNA Studio')
      : 'DNA Studio'
    const description = isPlanTo
      ? t('스크롤로 Plan to의 하루를 따라가 보세요. 반투명 Windows 캘린더를 앞으로 불러오고, 메모를 고정하고, AI로 등록한 일정을 휴대폰에서 확인하는 과정을 소개합니다.', 'Follow a day with Plan to. Bring your Windows calendar to the front, pin notes and find the events you added with AI on your phone.', 'Plan toの使い方をスクロールで体験。Windowsのカレンダーを呼び出し、メモを固定し、AIで登録した予定をスマートフォンで確認できます。')
      : t('일상에 필요한 서비스를 만드는 소프트웨어 브랜드, DNA Studio입니다. Plan to와 Korea Plus+를 만나보세요.', 'Discover Plan to and Korea Plus+, everyday software from DNA Studio.', '暮らしに役立つソフトウェアをつくるDNA Studio。Plan toとKorea Plus+をご紹介します。')
    document.title = title
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
  }, [isPlanTo, t])

  return (
    <>
      <a className="skip-link" href="#main">{t('본문으로 이동', 'Skip to content', '本文へスキップ')}</a>
      <Header isPlanTo={isPlanTo} />
      <main id="main" tabIndex={-1}>
        {isPlanTo ? <PlanToPage /> : <HomePage />}
      </main>
      <footer className="site-footer">
        <div className="container footer-content">
          <strong>DNA Studio</strong>
          <small>{t('© DNA Studio. 모든 권리 보유.', '© DNA Studio. All rights reserved.', '© DNA Studio. すべての権利はDNA Studioに帰属します。')}</small>
        </div>
      </footer>
    </>
  )
}
