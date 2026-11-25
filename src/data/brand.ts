import { asset } from './paths'

export const planTo = {
  name: 'Plan to',
  wordmark: asset('/brand/plan-to-wordmark.png'),
  title: '일정과 할 일을 바탕화면에서.',
}

export const koreaPlus = {
  name: 'Korea Plus+',
  icon: asset('/brand/korea-plus-icon.svg'),
  url: 'https://koreaplus.me.kr/',
}

const releasesUrl = 'https://github.com/frog8256/Bystep-Downloads/releases'
const tag = 'v0.8.2-beta-r3'

export const planToRelease = {
  version: '0.8.2 (BETA) r3',
  date: '2026-11-25',
  download: `${releasesUrl}/latest/download/Plan-to-Windows-x64.zip`,
  notes: {
    ko: [
      '앱 실행과 달력의 월 이동, 일정 완료 표시가 빨라졌어요.',
      '대시보드를 숨겨도 고정한 메모는 계속 보이고 휴대폰 캘린더의 새 일정도 받아와요.',
      '미니 캘린더에서 대시보드로 돌아가면 큰 창이 바로 앞으로 열려요.',
    ],
    en: [
      'The app starts faster. Switching months and marking events as done are quicker, too.',
      'Pinned notes stay visible and new events from your phone calendar keep syncing while the dashboard is hidden.',
      'Returning to the dashboard from the mini calendar now brings the main window to the front immediately.',
    ],
    ja: [
      'アプリの起動、カレンダーの月の切り替え、予定の完了表示が速くなりました。',
      'ダッシュボードを非表示にしても、固定したメモは表示されたままになり、スマホのカレンダーに追加した予定も取り込めます。',
      'ミニカレンダーからダッシュボードに戻ると、メインウィンドウがすぐに最前面に表示されます。',
    ],
  },
  url: `${releasesUrl}/tag/${tag}`,
  allReleasesUrl: releasesUrl,
}
