export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

export function getCalendarDays(year: number, month: number) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  // Ajustar firstDay para que lunes sea 0 (getDay devuelve domingo como 0)
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1

  const totalCells = adjustedFirstDay + daysInMonth
  const totalRows = Math.ceil(totalCells / 7)
  const totalCellsNeeded = totalRows * 7

  return {
    daysInMonth,
    firstDay: adjustedFirstDay,
    totalCells,
    totalCellsNeeded,
  }
}
