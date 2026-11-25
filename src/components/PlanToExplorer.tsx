import { useRef, useState, type KeyboardEvent } from 'react'
import { useLanguage } from '../i18n'
import './plan-to-explorer.css'

function PlanSample() {
  const { t } = useLanguage()
  const [view, setView] = useState(0)
  const [done, setDone] = useState<string[]>(['draft'])
  const planViews = [
    {
      id: 'today', name: t('오늘', 'Today', '今日'), heading: t('11월 25일 수요일', 'Wednesday, November 25', '11月25日（水）'),
      rows: [
        ['meeting', '10:00', t('주간 회의', 'Weekly meeting', '週次ミーティング')],
        ['draft', '14:00', t('초안 검토', 'Review the draft', '草案を確認')],
        ['library', '16:30', t('도서관 들르기', 'Stop by the library', '図書館に寄る')],
      ],
    },
    {
      id: 'inbox', name: t('일정 보관함', 'Inbox', '予定ボックス'), heading: t('날짜 미정', 'No date set', '日付未定'),
      rows: [
        ['exhibition', t('미정', 'Unscheduled', '未定'), t('전시회 예약하기', 'Book exhibition tickets', '展覧会を予約')],
        ['trip', t('미정', 'Unscheduled', '未定'), t('다음 달 여행 준비', 'Plan next month’s trip', '来月の旅行の準備')],
      ],
    },
    {
      id: 'routines', name: t('루틴', 'Routines', 'ルーティン'), heading: t('반복하는 일', 'Recurring tasks', '繰り返すタスク'),
      rows: [
        ['walk', t('매일', 'Daily', '毎日'), t('점심 산책', 'Lunchtime walk', 'お昼の散歩')],
        ['stretch', t('수요일', 'Wednesdays', '毎週水曜'), t('저녁 스트레칭', 'Evening stretches', '夜のストレッチ')],
      ],
    },
    {
      id: 'countdowns', name: t('D-day', 'Countdowns', 'カウントダウン'), heading: t('기다리는 날', 'Dates to look forward to', '楽しみな日'),
      rows: [
        ['project', t('D-7', '7 days', 'あと7日'), t('새 프로젝트 시작', 'New project starts', '新しいプロジェクトの開始')],
        ['winter', t('D-16', '16 days', 'あと16日'), t('겨울 여행', 'Winter trip', '冬の旅行')],
      ],
    },
  ]
  const { heading, rows } = planViews[view]
  return (
    <div className="ptx-app ptx-agenda">
      <div className="ptx-app-title"><span className="ptx-calendar-icon" aria-hidden="true" />{t('내 플래너', 'My planner', 'マイプランナー')}</div>
      <div className="ptx-agenda-layout">
        <div className="ptx-menu" role="group" aria-label={t('예시 목록 선택', 'Choose a sample list', 'サンプルのリストを選択')}>
          {planViews.map(({ id, name }, index) => <button type="button" key={id} aria-pressed={view === index} onClick={() => setView(index)}>{name}</button>)}
        </div>
        <div className="ptx-day">
          <h4>{heading}</h4>
          <ul>
            {rows.map(([id, time, title]) => (
              <li key={id}>
                {planViews[view].id !== 'countdowns' ? (
                  <label>
                    <input type="checkbox" checked={done.includes(id)} onChange={event => {
                      const checked = event.currentTarget.checked
                      setDone(previous => checked ? [...previous, id] : previous.filter(item => item !== id))
                    }} />
                    <span className="ptx-task"><small>{time}</small><span>{title}</span></span>
                  </label>
                ) : <span className="ptx-countdown"><b>{time}</b>{title}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function MemoSample() {
  const { t } = useLanguage()
  const [pinned, setPinned] = useState(false)
  const [assigned, setAssigned] = useState(false)
  return (
    <div className="ptx-note">
      <div className="ptx-note-bar">
        <span>{t('바탕화면 메모', 'Desktop note', 'デスクトップメモ')}</span>
        <button type="button" className="ptx-pin" aria-pressed={pinned} onClick={() => setPinned(!pinned)}>{t('스티커로 고정', 'Pin as sticky note', '付箋として固定')}<span className="ptx-switch" aria-hidden="true" /></button>
      </div>
      <div className="ptx-note-body">
        <h4>{t('다음 회의에서 나눌 이야기', 'For our next meeting', '次の会議で話すこと')}</h4>
        <p>{t('첫 화면 시안 두 가지 비교하기', 'Compare the two home screen designs', 'ホーム画面のデザイン案を2つ比較する')}<br />
          {t('다음 주 인터뷰 일정 확인하기', 'Check next week’s interview schedule', '来週のインタビュー日程を確認する')}</p>
      </div>
      <div className="ptx-assign">
        <span role="status">{assigned ? t('11월 25일 날짜 메모에 추가했어요.', 'Added to your notes for November 25.', '11月25日のメモに追加しました。') : t('11월 25일 · 수요일', 'Wednesday, November 25', '11月25日（水）')}</span>
        <button type="button" disabled={assigned} onClick={() => setAssigned(true)}>{assigned ? t('추가 완료 ✓', 'Added ✓', '追加済み ✓') : t('이 날짜에 붙이기', 'Add to this date', 'この日に追加')}</button>
      </div>
    </div>
  )
}

function ChatSample() {
  const { t } = useLanguage()
  const [confirmed, setConfirmed] = useState(false)
  return (
    <div className="ptx-chat">
      <div className="ptx-message">{t('내일 주간 회의를 오후 3시로 옮겨줘.', 'Move tomorrow’s weekly meeting to 3 PM.', '明日の週次ミーティングを午後3時に変更して。')}</div>
      <div className="ptx-answer">
        <strong>Plan to</strong>
        <p role="status">{confirmed ? t('예시 캘린더에 변경을 적용했어요.', 'I’ve updated the sample calendar.', 'サンプルカレンダーを更新しました。') : t('주간 회의 시간을 이렇게 바꿀까요?', 'Shall I move the meeting to this time?', '週次ミーティングをこの時間に変更しますか？')}</p>
        <div className="ptx-change">
          <span>{t('11월 26일 · 주간 회의', 'November 26 · Weekly meeting', '11月26日 · 週次ミーティング')}</span>
          <div><s>{t('오후 2:00', '2:00 PM', '午後2時')}</s><span aria-hidden="true">→</span><b>{t('오후 3:00', '3:00 PM', '午後3時')}</b></div>
        </div>
        <button type="button" disabled={confirmed} onClick={() => setConfirmed(true)}>{confirmed ? t('변경 완료 ✓', 'Updated ✓', '変更済み ✓') : t('확인 · 변경 적용', 'Confirm change', '変更を適用')}</button>
      </div>
    </div>
  )
}

export function PlanToExplorer() {
  const { t } = useLanguage()
  const features = [
    {
      id: 'plan', label: t('계획', 'Plans', '予定'),
      title: t('오늘 할 일과 나중에 할 일', 'What’s on today and what can wait', '今日のタスクと、これからの予定'),
      description: t(
        '여러 날에 걸친 일정은 월간 캘린더에, 날짜가 미정인 일은 보관함에 담으세요. 전체 계획에서 검색하거나 완료 여부로 걸러 보고, 사이드바에서 루틴을 체크하고 D-day를 확인할 수 있어요.',
        'Put multi-day events on the monthly calendar and save undated tasks to your inbox. Search all your plans or filter by completion. In the sidebar, check off routines and see how many days are left until an event.',
        '数日間にわたる予定は月間カレンダーに、日付が決まっていないタスクは予定ボックスに。すべての予定を検索したり、完了状況で絞り込んだりできます。サイドバーではルーティンのチェックや、予定までの残り日数の確認もできます。',
      ),
    },
    {
      id: 'memo', label: t('메모', 'Notes', 'メモ'),
      title: t('메모가 필요한 날짜에 붙여 두세요.', 'Keep a note with the day it belongs to', '必要な日にメモを貼っておく'),
      description: t(
        '날짜를 더블클릭하면 그날의 메모와 계획이 함께 열려요. 자주 볼 메모는 바탕화면에 스티커로 고정하고, 일이 구체화되면 원하는 날짜의 계획으로 옮기세요.',
        'Double-click a date to see its notes and plans together. Pin notes you refer to often as desktop sticky notes. When you’re ready to act, turn a note into a plan for the date you choose.',
        '日付をダブルクリックすると、その日のメモと予定が一緒に開きます。よく見るメモはデスクトップに付箋として固定し、内容が固まったら好きな日の予定に移せます。',
      ),
    },
    {
      id: 'chat', label: t('AI 채팅', 'AI chat', 'AIチャット'),
      title: t('일정을 바꾸고 싶을 땐 말로.', 'Reschedule in your own words', '言葉で予定を変更'),
      description: t(
        '로그인하면 채팅으로 일정을 등록·조회·변경할 수 있어요. 삭제는 내용을 확인한 뒤 적용해요. 이미지(PNG·JPG·WebP), PDF, TXT 파일도 2MB까지 첨부할 수 있어요.',
        'Sign in to add, look up or change events in chat. You’ll be asked to confirm before an event is deleted. You can also attach images (PNG, JPG or WebP), PDFs and TXT files up to 2 MB.',
        'ログインすると、チャットで予定を追加・確認・変更できます。削除は内容を確認してから実行されます。画像（PNG・JPG・WebP）、PDF、TXTファイルも2MBまで添付できます。',
      ),
    },
  ]
  const [active, setActive] = useState(0)
  const tabs = useRef<Array<HTMLButtonElement | null>>([])
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index
    switch (event.key) {
      case 'ArrowRight': next = (index + 1) % features.length; break
      case 'ArrowLeft': next = (index + features.length - 1) % features.length; break
      case 'Home': next = 0; break
      case 'End': next = features.length - 1; break
      default: return
    }
    event.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }
  return (
    <section id="features" className="ptx" aria-labelledby="ptx-heading">
      <div className="container ptx-layout">
        <div className="ptx-intro">
          <h2 id="ptx-heading">{t('하루를 정리하는', 'Three ways to', '一日を整える')}<br />{t(' 세 가지 방법', ' organize your day', '3つの方法')}</h2>
          <div className="ptx-tabs" role="tablist" aria-label={t('살펴볼 기능', 'Features to explore', '試してみる機能')}>
            {features.map((feature, index) => (
              <button key={feature.id} ref={element => { tabs.current[index] = element }} id={`ptx-tab-${feature.id}`} role="tab" type="button" aria-selected={active === index} aria-controls={`ptx-panel-${feature.id}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => navigate(event, index)}>{feature.label}</button>
            ))}
          </div>
          <div className="ptx-copy" aria-live="polite">
            <h3>{features[active].title}</h3>
            <p>{features[active].description}</p>
          </div>
        </div>
        {features.map((feature, index) => (
          <div className="ptx-panel" role="tabpanel" id={`ptx-panel-${feature.id}`} aria-labelledby={`ptx-tab-${feature.id}`} tabIndex={0} hidden={active !== index} key={feature.id}>
            <figure className={`ptx-canvas ptx-canvas-${feature.id}`}>
              <figcaption>{t(`${feature.label} 사용 예시`, `${feature.label} example`, `${feature.label}の使用例`)}</figcaption>
              {feature.id === 'plan' ? <PlanSample /> : feature.id === 'memo' ? <MemoSample /> : <ChatSample />}
            </figure>
          </div>
        ))}
      </div>
    </section>
  )
}
