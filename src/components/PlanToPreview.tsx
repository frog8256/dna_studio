import windowPreview from '../assets/plan-to-window.webp'
import { useLanguage } from '../i18n'

export function PlanToPreview({ detail = false }: { detail?: boolean }) {
  const { t } = useLanguage()
  return (
    <img
      className={`product-preview plan-to-preview${detail ? ' download-preview' : ''}`}
      src={windowPreview}
      alt={t('푸른 배경이 비치는 Plan to 창에 월간 캘린더와 오늘의 할 일이 나란히 표시된 모습', 'A translucent Plan to window showing a monthly calendar beside today’s tasks.', '背景が透けるPlan toのウィンドウに、月間カレンダーと今日のタスクが並ぶ様子')}
      width="1536"
      height="936"
      fetchPriority="high"
      decoding="async"
    />
  )
}
