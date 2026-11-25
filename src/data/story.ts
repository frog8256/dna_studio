// These three appointments follow the viewer from the desktop chat to the phone.
export const storyAppointments = [
  { day: 25, weekday: { ko: '수', en: 'Wed', ja: '水' }, title: { ko: '기획 회의', en: 'Planning meeting', ja: '企画会議' }, time: '10:00', color: 'mint' },
  { day: 26, weekday: { ko: '목', en: 'Thu', ja: '木' }, title: { ko: '시안 검토', en: 'Design review', ja: 'デザイン案の確認' }, time: '14:00', color: 'blue' },
  { day: 27, weekday: { ko: '금', en: 'Fri', ja: '金' }, title: { ko: '주간 회고', en: 'Weekly review', ja: '今週の振り返り' }, time: '16:00', color: 'lilac' },
] as const

// The last caption and the centered phone share the same completed frame.
export const phoneEntrance = 8.35
export const phoneAgendaReady = 9.32

export const storyScenes = [
  {
    start: 0, rest: 0,
    ko: { name: '바탕화면', title: '바탕화면 한가운데, Plan to.', copy: '풍경이 비치는 달력에서 하루를 시작해요. 아래로 스크롤해 보세요.' },
    en: { name: 'Desktop', title: 'Plan to, right on your desktop.', copy: 'Start your day with a calendar that lets your wallpaper show through. Scroll down to explore.' },
    ja: { name: 'デスクトップ', title: 'デスクトップの真ん中に、Plan to。', copy: '壁紙が透けて見えるカレンダーで一日をスタート。下にスクロールしてみましょう。' },
  },
  {
    start: .90, rest: 2.17,
    ko: { name: '열리는 창', title: '일을 시작하면 창이 하나둘 쌓여요.', copy: '폴더, 웹브라우저, 메신저, 메일을 열자 달력이 뒤로 가려집니다.' },
    en: { name: 'Open windows', title: 'The windows start to pile up.', copy: 'A folder, a browser, a chat, an email. Soon the calendar is hidden behind them.' },
    ja: { name: 'ウィンドウを開く', title: '仕事を始めると、次々にウィンドウが。', copy: 'フォルダー、ブラウザー、チャット、メールを開くと、カレンダーが後ろに隠れます。' },
  },
  {
    start: 2.25, rest: 2.84,
    ko: { name: '단축키', title: '단축키 한 번으로 달력을 앞으로.', copy: 'Ctrl + Alt + ↑를 누르면 열어 둔 창 위로 Plan to가 올라옵니다.' },
    en: { name: 'Keyboard shortcut', title: 'One shortcut brings it back.', copy: 'Press Ctrl + Alt + ↑ to bring Plan to in front of your open windows.' },
    ja: { name: 'ショートカット', title: 'ショートカットでカレンダーを最前面に。', copy: 'Ctrl + Alt + ↑ を押すと、開いているウィンドウの手前に Plan to が現れます。' },
  },
  {
    start: 3.18, rest: 4.34,
    ko: { name: '날짜 선택', title: '이웃한 두 날짜를 더블클릭.', copy: '25일과 26일을 차례로 두 번 클릭해 날짜별 메모를 엽니다.' },
    en: { name: 'Select dates', title: 'Double-click two dates.', copy: 'Double-click the 25th, then the 26th, to open a note for each day.' },
    ja: { name: '日付を選択', title: '隣り合う日付をダブルクリック。', copy: '25日、26日の順にダブルクリックして、それぞれの日付のメモを開きます。' },
  },
  {
    start: 4.38, rest: 5.23,
    ko: { name: '스티커', title: '두 장의 메모를 바탕화면에.', copy: '달력 밖으로 끌어 위아래로 고정해 두면, 회의 전에 챙길 일이 눈에 들어와요.' },
    en: { name: 'Sticky notes', title: 'Pin two notes to your desktop.', copy: 'Drag them out of the calendar and pin one above the other to keep your meeting prep in sight.' },
    ja: { name: '付箋', title: '2枚のメモをデスクトップに。', copy: 'カレンダーの外にドラッグして上下に貼っておけば、会議前の準備をひと目で確認できます。' },
  },
  {
    start: 5.37, rest: 5.98,
    ko: { name: '창 정리', title: '작업 창을 닫아도 메모는 그대로.', copy: '폴더부터 메일까지 네 개의 창을 닫으면 달력과 두 스티커가 남습니다.' },
    en: { name: 'Close windows', title: 'Close the windows. The notes stay.', copy: 'Close all four windows and your calendar and two sticky notes are still on the desktop.' },
    ja: { name: 'ウィンドウを閉じる', title: 'ウィンドウを閉じても、メモはそのまま。', copy: 'フォルダーからメールまで4つのウィンドウを閉じると、カレンダーと2枚の付箋が残ります。' },
  },
  {
    start: 6.02, rest: 7.02,
    ko: { name: 'AI 일정 등록', title: '이번 주 일정 세 개를 한 번에.', copy: 'Plan to AI 채팅에 부탁하면 기획 회의, 시안 검토, 주간 회고가 달력에 차례로 들어갑니다.' },
    en: { name: 'Add events with AI', title: 'Three events in one message.', copy: 'Ask Plan to AI to add your planning meeting, design review and weekly review to the calendar.' },
    ja: { name: 'AIで予定を追加', title: '今週の予定を3件まとめて登録。', copy: 'Plan to のAIチャットに頼むと、企画会議、デザイン案の確認、今週の振り返りが順にカレンダーに入ります。' },
  },
  {
    start: 7.14, rest: 7.88,
    ko: { name: '동기화', title: '채팅에서 등록과 동기화를 확인해요.', copy: '연결한 Google 캘린더와의 동기화가 끝나면 일정 등록 완료 메시지가 나타납니다.' },
    en: { name: 'Sync', title: 'See the confirmation in chat.', copy: 'Once Google Calendar finishes syncing, a message confirms that your events have been added.' },
    ja: { name: '同期', title: '登録と同期の完了をチャットで確認。', copy: '連携した Google カレンダーとの同期が終わると、予定の登録完了メッセージが届きます。' },
  },
  {
    start: phoneAgendaReady, rest: 10,
    ko: { name: '휴대폰', title: '휴대폰에도 같은 세 일정이.', copy: '같은 계정으로 모바일 Plan to를 열면 PC에서 등록한 일정과 시간이 그대로 보입니다.' },
    en: { name: 'Phone', title: 'All three events on your phone.', copy: 'Open Plan to with the same account. The events from your PC are here, at the same times.' },
    ja: { name: 'スマートフォン', title: 'スマホにも同じ3件の予定が。', copy: 'スマホで同じアカウントの Plan to を開くと、PCで登録した予定と時刻が表示されます。' },
  },
] as const

export function scenePhase(progress: number, start: number, end: number) {
  const t = Math.max(0, Math.min(1, (progress - start) / (end - start)))
  return t * t * (3 - 2 * t)
}
