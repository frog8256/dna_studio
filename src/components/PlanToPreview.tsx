import windowPreview from '../assets/plan-to-window.webp'

export function PlanToPreview({ detail = false }: { detail?: boolean }) {
  return (
    <img
      className={`product-preview plan-to-preview${detail ? ' download-preview' : ''}`}
      src={windowPreview}
      alt="푸른 배경이 비치는 Plan to 창에 월간 캘린더와 오늘의 할 일이 나란히 표시된 모습"
      width="1536"
      height="936"
      fetchPriority="high"
      decoding="async"
    />
  )
}
