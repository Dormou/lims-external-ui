export const getMonthNoun = (number: number) => {
  const lastDigit = number % 10
  const lastTwoDigits = number % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'месяцев'
  if (lastDigit === 1) return 'месяц'
  if (lastDigit >= 2 && lastDigit <= 4) return 'месяца'
  return 'месяцев'
}
