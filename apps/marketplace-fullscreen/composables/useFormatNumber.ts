export const useFormatNumber = () => {
  const formatAmount = (amount: number | string) => {
    if (typeof amount === 'string') {
      amount = parseFloat(amount)
    }

    const formatNumber = (num: number, divisor: number, suffix: string) => {
      let base = num / divisor

      if (suffix === 'M') {
        if (base >= 10) {
          return Math.floor(base) + suffix
        }
        if (base >= 1 && base < 10) {
          if (num % 1000000 === 200000) {
            return (Math.floor(base * 10) / 10).toFixed(1) + suffix
          }
          return Math.floor(base) + suffix
        }
      }

      if (suffix === 'K') {
        if (base >= 10) {
          return Math.floor(base) + suffix
        }
        if (base >= 1 && base < 10) {
          if (num % 1000 === 200) {
            return (Math.floor(base * 10) / 10).toFixed(1) + suffix
          }
          return Math.floor(base) + suffix
        }
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