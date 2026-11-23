import { planTo, planToRelease } from '../data/brand'
import { PlanToPreview } from './PlanToPreview'

export function PlanToPage() {
  return (
    <div className="container plan-to-page">
      <section className="download-intro" aria-labelledby="download-title">
        <div className="product-brand">
          <img src={planTo.icon} alt="" width="42" height="42" />
          <span>{planTo.name}</span>
        </div>
        <h1 id="download-title">{planTo.title}</h1>
        <p>캘린더와 할 일을 한눈에 확인하고, 더 간편하게 관리하세요.</p>
        <a className="primary-button download-button" href={planToRelease.download}>
          <span className="windows-icon" aria-hidden="true"><i /><i /><i /><i /></span>
          Windows용 다운로드
        </a>
        <p className="download-meta">{planToRelease.version} · Windows x64 · ZIP</p>
      </section>

      <PlanToPreview detail />

      <section className="download-section" aria-labelledby="install-title">
        <h2 id="install-title">설치 및 실행 방법</h2>
        <ol className="install-steps">
          <li>
            <h3>다운로드</h3>
            <p>위 버튼에서 Windows용 ZIP 파일을 받아요.</p>
          </li>
          <li>
            <h3>압축 해제</h3>
            <p>파일을 원하는 폴더에 모두 풀어요.</p>
          </li>
          <li>
            <h3>실행</h3>
            <p>압축을 푼 폴더에서 <code>Plan to.exe</code>를 실행해요.</p>
          </li>
        </ol>
      </section>

      <section className="download-section" aria-labelledby="release-title">
        <div className="section-heading">
          <h2 id="release-title">릴리스 노트</h2>
          <a href={planToRelease.allReleasesUrl}>
            전체 릴리스 보기 <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="release-entry">
          <div className="release-meta">
            <a href={planToRelease.url}>{planToRelease.version}</a>
            <time dateTime={planToRelease.date}>{planToRelease.dateLabel}</time>
          </div>
          <ul>
            {planToRelease.notes.map((note) => <li key={note}>{note}</li>)}
          </ul>
        </div>
      </section>
    </div>
  )
}
