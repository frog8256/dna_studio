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
const tag = 'v0.8.2-beta'

export const planToRelease = {
  version: '0.8.2 Beta',
  date: '2026-11-25',
  dateLabel: '2026년 11월 25일',
  download: `${releasesUrl}/download/${tag}/Plan-to-Windows-x64.zip`,
  notes: [
    'Windows 상단바와 채팅창에 Plan to 손글씨 로고를 적용했습니다.',
    '실행 파일과 작업 표시줄, 트레이에서도 같은 레터링 아이콘을 볼 수 있습니다.',
  ],
  url: `${releasesUrl}/tag/${tag}`,
  allReleasesUrl: releasesUrl,
}
