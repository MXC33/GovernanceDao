export const useFormatNumber = () => {
  const formatAmount = (amount: number | string) => {
    if (typeof amount === 'string') {
      amount = parseFloat(amount)
    }

    const formatNumber = (num: number, divisor: number, suffix: string) => {
      let base = Math.floor(num / divisor)
      let remainder = Math.floor((num % divisor) / (divisor / 10))

      if (suffix === 'M' && divisor === 1000000 && base < 10 && remainder > 0) {
        let formatted = base + '.' + remainder
        return formatted + suffix
      }

      if (suffix === 'K' && divisor === 1000 && base < 10 && remainder > 0) {
        let formatted = base + '.' + remainder
        return formatted + suffix
      }

      return base + suffix
    }

    if (amount >= 1000000) {
      return formatNumber(amount, 1000000, 'M')
    } else if (amount >= 1000) {
      return formatNumber(amount, 1000, 'K')
    }

    return amount.toString()
  }

  return {
    formatAmount
  }
}