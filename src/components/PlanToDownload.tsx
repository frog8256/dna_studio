import { planToRelease } from '../data/brand'
import './plan-to-download.css'

export function PlanToDownload() {
  return (
    <section id="download" className="pt-download" aria-labelledby="pt-download-title">
      <div className="pt-download__panel">
        <div className="pt-download__intro">
          <h2 id="pt-download-title">Windows에서 시작하기</h2>
          <a className="pt-download__button" href={planToRelease.download}>
            <span className="pt-download__windows" aria-hidden="true" />
            Windows용 다운로드
          </a>
          <p className="pt-download__version">Windows x64 · ZIP · {planToRelease.version}</p>
        </div>
        <div className="pt-download__setup">
          <h3>처음 설치할 때</h3>
          <ol>
            <li>Windows용 ZIP 파일을 다운로드하세요.</li>
            <li>저장할 폴더에 파일의 압축을 모두 푸세요.</li>
            <li>압축을 푼 폴더에서 <strong>Plan to.exe</strong>를 실행하세요.</li>
          </ol>
        </div>
      </div>
      <section className="pt-download__release" aria-labelledby="pt-release-title">
        <div className="pt-download__release-head">
          <h3 id="pt-release-title">릴리스 노트</h3>
          <a href={planToRelease.allReleasesUrl}>전체 릴리스 보기</a>
        </div>
        <div className="pt-download__release-body">
          <div className="pt-download__release-info">
            <a href={planToRelease.url} aria-label={`Plan to ${planToRelease.version} 릴리스 상세 보기`}>
              {planToRelease.version}
            </a>
            <time dateTime={planToRelease.date}>{planToRelease.dateLabel}</time>
          </div>
          <ul>
            {planToRelease.notes.map((note) => <li key={note}>{note}</li>)}
          </ul>
        </div>
      </section>
    </section>
  )
}
