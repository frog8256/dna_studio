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
const tag = 'v0.8.4-beta'

export const planToRelease = {
  version: '0.8.4 Beta',
  date: '2026-11-25',
  dateLabel: '2026년 11월 25일',
  download: `${releasesUrl}/download/${tag}/Plan-to-Windows-x64.zip`,
  notes: [
    '상단바와 채팅창의 손글씨 로고에 배경 불투명도와 블러 강도가 함께 적용됩니다.',
    '블러를 끄거나 종이 테마로 전환하면 글자가 선명하게 표시됩니다.',
  ],
  url: `${releasesUrl}/tag/${tag}`,
  allReleasesUrl: releasesUrl,
}
