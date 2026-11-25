import { planToRelease } from '../data/brand'
import { useLanguage } from '../i18n'
import './plan-to-download.css'

export function PlanToDownload() {
  const { language, t } = useLanguage()
  const releaseDate = new Intl.DateTimeFormat(language, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(planToRelease.date))
  return (
    <section id="download" className="pt-download" aria-labelledby="pt-download-title">
      <div className="pt-download__panel">
        <div className="pt-download__intro">
          <h2 id="pt-download-title">{t('Windows에서 시작하기', 'Get started on Windows', 'Windowsで使い始める')}</h2>
          <a className="pt-download__button" href={planToRelease.download}>
            <span className="pt-download__windows" aria-hidden="true" />
            {t('Windows용 다운로드', 'Download for Windows', 'Windows版をダウンロード')}
          </a>
          <p className="pt-download__version">Windows x64 · ZIP · {planToRelease.version}</p>
        </div>
        <div className="pt-download__setup">
          <h3>{t('처음 설치할 때', 'First-time setup', '初めてインストールする方へ')}</h3>
          <ol>
            <li>{t('Windows용 ZIP 파일을 다운로드하세요.', 'Download the ZIP file for Windows.', 'Windows用のZIPファイルをダウンロードします。')}</li>
            <li>{t('저장할 폴더에 파일의 압축을 모두 푸세요.', 'Extract all the files to a folder of your choice.', '保存先のフォルダーにすべてのファイルを展開します。')}</li>
            <li>{t('압축을 푼 폴더에서 ', 'In the extracted folder, run ', '展開したフォルダーで')}<strong>Plan to.exe</strong>{t('를 실행하세요.', '.', 'を起動します。')}</li>
          </ol>
        </div>
      </div>
      <section className="pt-download__release" aria-labelledby="pt-release-title">
        <div className="pt-download__release-head">
          <h3 id="pt-release-title">{t('릴리스 노트', 'Release notes', 'リリースノート')}</h3>
          <a href={planToRelease.allReleasesUrl}>{t('전체 릴리스 보기', 'View all releases', 'すべてのリリースを見る')}</a>
        </div>
        <div className="pt-download__release-body">
          <div className="pt-download__release-info">
            <a href={planToRelease.url} aria-label={t(`Plan to ${planToRelease.version} 릴리스 상세 보기`, `View release details for Plan to ${planToRelease.version}`, `Plan to ${planToRelease.version} のリリース詳細を見る`)}>
              {planToRelease.version}
            </a>
            <time dateTime={planToRelease.date}>{releaseDate}</time>
          </div>
          <ul>
            {planToRelease.notes[language].map((note) => <li key={note}>{note}</li>)}
          </ul>
        </div>
      </section>
    </section>
  )
}
