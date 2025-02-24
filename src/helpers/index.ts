const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const getWeekDay = (date: string) => {
  if (!date) {
    return ''
  }

  const [year, month, day] = date.split('-').map(Number)
  const dateObj = new Date(year, month - 1, day)

  return weekDays[dateObj.getDay()]
}
