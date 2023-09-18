
export type TransactionState = 'accepting' | 'approving' | 'minting-pix' | 'signing' | 'minting' | 'extracting' | 'nonce' | 'second-transaction' | 'unclaimed-avatar'

export const useTransactions = () => {
  const transactionState = useState<TransactionState | null>(() => null)

  const resetTransactionState = () =>
    transactionState.value = null

  const isPendingAccept = computed(() => transactionState.value == 'accepting')

  const isPendingTransaction = computed(() => ['signing', 'minting', 'approving', 'minting-pix', 'extracting', 'nonce', 'second-transaction', 'unclaimed-avatar'].includes(transactionState.value))

  const setTransactionState = (state: TransactionState) =>
    transactionState.value = state

  return {
    transactionState,
    isPendingAccept,
    isPendingTransaction,
    setTransactionState,
    resetTransactionState
  }
}