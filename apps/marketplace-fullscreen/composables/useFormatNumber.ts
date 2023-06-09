export const useFormatNumber = () => {
  const formatAmount = (amount: number | string) => {
    if (typeof amount === 'string') {
      amount = parseFloat(amount)
    }
    if (amount > 1000)
      return String(amount / 1000).substring(0, 4) + "K"
    return amount
  }

  return {
    formatAmount
  }
}
