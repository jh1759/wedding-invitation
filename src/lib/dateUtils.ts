/**
 * 날짜를 YYYY.MM.DD(요일) 형식으로 포맷
 * @param dateString - ISO 날짜 문자열 (예: "2026-05-24")
 * @returns 포맷된 날짜 문자열 (예: "2026.05.24(일)")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const weekdays = ['일', '월', '화', '수', '목', '금', '토']
  const weekday = weekdays[date.getDay()]

  return `${year}.${month}.${day}(${weekday})`
}

/**
 * 날짜와 시간을 YYYY.MM.DD(요일) HH:mm 형식으로 포맷
 * @param dateString - ISO 날짜 문자열 (예: "2026-05-24")
 * @param timeString - 시간 문자열 (예: "14:00")
 * @returns 포맷된 날짜와 시간 문자열 (예: "2026.05.24(일) 14:00")
 */
export function formatDateTime(dateString: string, timeString: string): string {
  return `${formatDate(dateString)} ${timeString}`
}

