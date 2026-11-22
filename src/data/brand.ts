import { asset } from './paths'

export const bystep = {
  name: 'Bystep',
  icon: asset('/brand/bystep-icon.png'),
  title: '일정과 할 일을 바탕화면에서.',
  screenshot: asset('/products/bystep-desktop.webp'),
  detailScreenshot: asset('/products/bystep-app.webp'),
  screenshotAlt: 'Windows 바탕화면에서 실행 중인 Bystep의 캘린더와 할 일 목록',
}

export const koreaPlus = {
  name: 'Korea Plus+',
  icon: asset('/brand/korea-plus-icon.svg'),
  url: 'https://koreaplus.me.kr/',
}

const releasesUrl = 'https://github.com/frog8256/Aven-Downloads/releases'
const tag = 'v0.7.2-beta-r10'

export const bystepRelease = {
  version: '0.7.2 Beta r10',
  date: '2026-11-16',
  dateLabel: '2026년 11월 16일',
  download: `${releasesUrl}/download/${tag}/Bystep-Windows-x64.zip`,
  notes: [
    'Windows 앱에서 이메일 가입 인증번호를 입력하고 비밀번호를 재설정할 수 있습니다.',
    '앱을 다시 실행해도 인증 대기 상태와 재발송 제한이 유지됩니다.',
  ],
  url: `${releasesUrl}/tag/${tag}`,
  allReleasesUrl: releasesUrl,
}
