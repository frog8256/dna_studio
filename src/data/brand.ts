import { asset } from './paths'

export const planTo = {
  name: 'Plan to',
  icon: asset('/brand/plan-to-icon.png'),
  title: '일정과 할 일을 바탕화면에서.',
  screenshot: asset('/products/plan-to-desktop.webp'),
  detailScreenshot: asset('/products/plan-to-app.webp'),
  screenshotAlt: 'Windows 바탕화면에서 실행 중인 Plan to의 캘린더와 할 일 목록',
}

export const koreaPlus = {
  name: 'Korea Plus+',
  icon: asset('/brand/korea-plus-icon.svg'),
  url: 'https://koreaplus.me.kr/',
}

const releasesUrl = 'https://github.com/frog8256/Bystep-Downloads/releases'
const tag = 'v0.8.1-beta'

export const planToRelease = {
  version: '0.8.1 Beta',
  date: '2026-11-22',
  dateLabel: '2026년 11월 22일',
  download: `${releasesUrl}/download/${tag}/Plan-to-Windows-x64.zip`,
  notes: [
    'Plan to 로고와 이름을 Windows 상단바 왼쪽에 배치했습니다.',
    '맨 오른쪽 X 버튼을 누르면 앱이 정상 종료됩니다.',
  ],
  url: `${releasesUrl}/tag/${tag}`,
  allReleasesUrl: releasesUrl,
}
