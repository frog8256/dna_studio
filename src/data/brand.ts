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
const tag = 'v0.8.3-beta'

export const planToRelease = {
  version: '0.8.3 Beta',
  date: '2026-11-25',
  dateLabel: '2026년 11월 25일',
  download: `${releasesUrl}/download/${tag}/Plan-to-Windows-x64.zip`,
  notes: [
    'Windows 상단바와 채팅창에 배경 없이 손글씨 로고만 표시합니다.',
    '밝은 화면에는 딥그린, 어두운 화면에는 밝은 글씨로 표시합니다.',
  ],
  url: `${releasesUrl}/tag/${tag}`,
  allReleasesUrl: releasesUrl,
}
