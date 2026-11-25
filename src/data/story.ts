// These three appointments follow the viewer from the desktop chat to the phone.
export const storyAppointments = [
  { day: 25, weekday: '수', title: '기획 회의', time: '10:00', color: 'mint' },
  { day: 26, weekday: '목', title: '시안 검토', time: '14:00', color: 'blue' },
  { day: 27, weekday: '금', title: '주간 회고', time: '16:00', color: 'lilac' },
] as const

// The last caption and the centered phone share the same completed frame.
export const phoneEntrance = 8.35
export const phoneAgendaReady = 9.32

export function scenePhase(progress: number, start: number, end: number) {
  const t = Math.max(0, Math.min(1, (progress - start) / (end - start)))
  return t * t * (3 - 2 * t)
}
