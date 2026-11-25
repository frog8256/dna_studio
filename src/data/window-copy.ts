import type { Language } from '../i18n'

const ko = {
  explorer: {
    title: '파일 탐색기', path: '내 PC　›　문서　›　프로젝트', favorites: '즐겨찾기',
    home: '홈', documents: '문서', downloads: '다운로드', pictures: '사진', projects: '프로젝트',
    folders: ['브랜드 자료', '기획 문서', '참고 이미지'],
    files: [['11월 일정표.xlsx', '오늘'], ['회의록.docx', '어제']],
  },
  browser: { title: '웹 브라우저', nav: 'Journal　 Archive', section: 'TRAVEL JOURNAL', headline: '숲길을 걷는 아침' },
  messenger: {
    title: '메신저', room: '디자인 팀', members: '팀 채팅 · 3명',
    first: ['수', '수아', '다음 시안 검토는 언제가 좋을까요?'], reply: '내일 오후에 확인할게요.',
    last: ['현', '지현', '회의 자료도 올려둘게요.'], compose: '메시지 입력',
  },
  mail: {
    title: '메일', inbox: '받은 편지함', sent: '보낸 편지함', drafts: '임시 보관함',
    messages: [
      ['수아', '주간 회의 자료를 공유합니다', '첨부한 문서를 확인해 주세요.', '10:24'],
      ['디자인 팀', '프로젝트 시안 검토 요청', '새로운 시안을 정리했어요.', '09:10'],
      ['스튜디오', '11월 팀 소식', '이번 달 소식을 전합니다.', '어제'],
    ],
  },
  stickers: {
    mint: { date: '11월 25일 수요일', title: '디자인 리뷰', time: '오후 2:00', text: '첫 화면 시안 두 가지 비교하기' },
    peach: { date: '11월 26일 목요일', title: '팀 워크숍', time: '오전 10:00', text: '다음 달 진행할 주제 모으기' },
  },
}

export const windowCopy = {
  ko,
  en: {
    explorer: {
      title: 'File Explorer', path: 'This PC　›　Documents　›　Projects', favorites: 'Favorites',
      home: 'Home', documents: 'Documents', downloads: 'Downloads', pictures: 'Pictures', projects: 'Projects',
      folders: ['Brand assets', 'Plans', 'References'],
      files: [['November schedule.xlsx', 'Today'], ['Meeting notes.docx', 'Yesterday']],
    },
    browser: { title: 'Web browser', nav: 'Journal　 Archive', section: 'TRAVEL JOURNAL', headline: 'A Morning on the Forest Trail' },
    messenger: {
      title: 'Messenger', room: 'Design team', members: 'Team chat · 3 people',
      first: ['S', 'Sua', 'When can we review the new designs?'], reply: 'I’ll take a look tomorrow afternoon.',
      last: ['J', 'Jihyeon', 'I’ll share the meeting notes, too.'], compose: 'Write a message',
    },
    mail: {
      title: 'Mail', inbox: 'Inbox', sent: 'Sent', drafts: 'Drafts',
      messages: [
        ['Sua', 'Notes for our weekly meeting', 'Please see the attached document.', '10:24'],
        ['Design team', 'New designs ready for review', 'The latest drafts are ready.', '09:10'],
        ['Studio', 'November team news', 'Here’s what’s new this month.', 'Yesterday'],
      ],
    },
    stickers: {
      mint: { date: 'Wednesday, Nov 25', title: 'Design review', time: '2:00 PM', text: 'Compare the two home screen designs' },
      peach: { date: 'Thursday, Nov 26', title: 'Team workshop', time: '10:00 AM', text: 'Collect topics for next month' },
    },
  },
  ja: {
    explorer: {
      title: 'エクスプローラー', path: 'PC　›　ドキュメント　›　プロジェクト', favorites: 'お気に入り',
      home: 'ホーム', documents: 'ドキュメント', downloads: 'ダウンロード', pictures: 'ピクチャ', projects: 'プロジェクト',
      folders: ['ブランド資料', '企画書', '参考画像'],
      files: [['11月の予定表.xlsx', '今日'], ['議事録.docx', '昨日']],
    },
    browser: { title: 'ウェブブラウザー', nav: '記事　 アーカイブ', section: '旅の記録', headline: '森の小道を歩く朝' },
    messenger: {
      title: 'メッセンジャー', room: 'デザインチーム', members: 'チームチャット · 3人',
      first: ['ス', 'スア', '次のデザイン案、いつ確認しましょうか？'], reply: '明日の午後に確認します。',
      last: ['ジ', 'ジヒョン', '会議の資料も共有しますね。'], compose: 'メッセージを入力',
    },
    mail: {
      title: 'メール', inbox: '受信トレイ', sent: '送信済み', drafts: '下書き',
      messages: [
        ['スア', '週次会議の資料を共有します', '添付の資料をご確認ください。', '10:24'],
        ['デザインチーム', 'デザイン案レビューのお願い', '新しいデザイン案をまとめました。', '09:10'],
        ['スタジオ', '11月のチーム通信', '今月のお知らせをお届けします。', '昨日'],
      ],
    },
    stickers: {
      mint: { date: '11月25日（水）', title: 'デザインレビュー', time: '14:00', text: 'ホーム画面のデザイン案を2つ比較する' },
      peach: { date: '11月26日（木）', title: 'チームワークショップ', time: '10:00', text: '来月取り上げるテーマを集める' },
    },
  },
} satisfies Record<Language, typeof ko>

export type WindowCopy = typeof ko
