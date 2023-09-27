export interface CompleteAction {
  action?: string,
  success: true
}

export const useCorporationCompletion = () => {
  const isComplete = computed(() => completeState.value?.success)

  const completeState = useState<CompleteAction>('corporation-complete', () => null)

  const resetComplete = () => completeState.value = null

  const gotoCompleted = (action?: string) =>
    completeState.value = {
      action,
      success: true
    }

  return {
    isComplete,
    completeState,
    resetComplete,
    gotoCompleted
  }
}
