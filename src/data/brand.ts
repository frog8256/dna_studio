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
const tag = 'v0.8.5-beta'

export const planToRelease = {
  version: '0.8.5 Beta',
  date: '2026-11-25',
  dateLabel: '2026년 11월 25일',
  download: `${releasesUrl}/download/${tag}/Plan-to-Windows-x64.zip`,
  notes: [
    '손글씨 로고를 상단바 왼쪽 끝에 작게 배치했습니다.',
    '상단바와 채팅창의 로고는 배경 불투명도만 따라가며 획이 선명하게 유지됩니다.',
  ],
  url: `${releasesUrl}/tag/${tag}`,
  allReleasesUrl: releasesUrl,
}
