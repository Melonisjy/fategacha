import { events, items, months, timePeriods, type Fortune, type FortuneGrade } from './fortuneData'
import { gradeConfigs } from './fortuneGrade'

function selectEventByGrade(): { text: string; grade: FortuneGrade } {
  const random = Math.random()
  
  // 확률 분배: 신의 예언 5%, 특별한 예언 25%, 평범한 예언 70%
  if (random < 0.05) {
    // 신의 예언
    const divineEvents = events.filter(e => e.grade === 'divine')
    return divineEvents[Math.floor(Math.random() * divineEvents.length)]
  } else if (random < 0.30) {
    // 특별한 예언
    const specialEvents = events.filter(e => e.grade === 'special')
    return specialEvents[Math.floor(Math.random() * specialEvents.length)]
  } else {
    // 평범한 예언
    const normalEvents = events.filter(e => e.grade === 'normal')
    return normalEvents[Math.floor(Math.random() * normalEvents.length)]
  }
}

export function getRandomFortune(): Fortune {
  const randomMonthData = months[Math.floor(Math.random() * months.length)]
  const randomDay = Math.floor(Math.random() * randomMonthData.days) + 1
  const randomHour = Math.floor(Math.random() * 24)
  const randomMinute = Math.floor(Math.random() * 60)
  const randomTimePeriod = timePeriods[Math.floor(Math.random() * timePeriods.length)]
  const selectedEvent = selectEventByGrade()
  const randomItem = items[Math.floor(Math.random() * items.length)]

  return {
    month: randomMonthData.name,
    day: randomDay,
    hour: randomHour,
    minute: randomMinute,
    timePeriod: randomTimePeriod,
    event: selectedEvent.text,
    item: randomItem,
    grade: selectedEvent.grade,
  }
}

function formatTime(hour: number, minute: number): string {
  const formattedHour = hour.toString().padStart(2, '0')
  const formattedMinute = minute.toString().padStart(2, '0')
  return `${formattedHour}시 ${formattedMinute}분`
}

export function formatFortuneText(name: string, fortune: Fortune): string {
  const timeStr = formatTime(fortune.hour, fortune.minute)
  const gradeConfig = gradeConfigs[fortune.grade]
  return `${name}님의 2026 운명\n\n${gradeConfig.icon} ${gradeConfig.name}\n\n2026년 ${fortune.month} ${fortune.day}일 ${timeStr}\n${fortune.event}`
}

