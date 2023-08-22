// export const useFormatNumber = () => {
//   const formatAmount = (amount: number | string) => {
//     if (typeof amount === 'string') {
//       amount = parseFloat(amount)
//     }

//     if (amount >= 1000000) {
//       const formattedAmount = (amount / 1000000).toFixed(1)
//       return formattedAmount.replace(".0", "") + "M"
//     }

//     else if (amount >= 1000) {
//       const formattedAmount = (amount / 1000).toFixed(1)
//       return formattedAmount.replace(".0", "") + "K"
//     }

//     return amount.toString();
//   }

//   return {
//     formatAmount
//   }
// }

export const useFormatNumber = () => {
  const formatAmount = (amount: number | string) => {
    if (typeof amount === 'string') {
      amount = parseFloat(amount)
    }

    const formatNumber = (num: number, divisor: number, suffix: string) => {
      let base = num / divisor
      let formatted = String(base)
      let dotIndex = formatted.indexOf('.')

      if (dotIndex !== -1) {
        formatted = formatted.substring(0, dotIndex + 3)
        if (formatted.endsWith('.00')) {
          formatted = formatted.substring(0, dotIndex)
        }
      }

      return formatted + suffix
    }

    if (amount >= 1000000) {
      return formatNumber(amount, 1000000, 'M')
    }
    else if (amount >= 1000) {
      return formatNumber(amount, 1000, 'K')
    }

    return amount.toString()
  }

  return {
    formatAmount
  }
}