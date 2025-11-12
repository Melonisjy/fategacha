import { events, items, months, timePeriods, type Fortune } from './fortuneData'

export function getRandomFortune(): Fortune {
  const randomMonthData = months[Math.floor(Math.random() * months.length)]
  const randomDay = Math.floor(Math.random() * randomMonthData.days) + 1
  const randomHour = Math.floor(Math.random() * 24)
  const randomMinute = Math.floor(Math.random() * 60)
  const randomTimePeriod = timePeriods[Math.floor(Math.random() * timePeriods.length)]
  const randomEvent = events[Math.floor(Math.random() * events.length)]
  const randomItem = items[Math.floor(Math.random() * items.length)]

  return {
    month: randomMonthData.name,
    day: randomDay,
    hour: randomHour,
    minute: randomMinute,
    timePeriod: randomTimePeriod,
    event: randomEvent,
    item: randomItem,
  }
}

function formatTime(hour: number, minute: number): string {
  const formattedHour = hour.toString().padStart(2, '0')
  const formattedMinute = minute.toString().padStart(2, '0')
  return `${formattedHour}시 ${formattedMinute}분`
}

export function formatFortuneText(name: string, fortune: Fortune): string {
  const timeStr = formatTime(fortune.hour, fortune.minute)
  return `${name}님의 2026 운명\n\n2026년 ${fortune.month} ${fortune.day}일 ${timeStr}, ${fortune.event}`
}

