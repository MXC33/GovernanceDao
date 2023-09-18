import { MaybeRef, get } from '@vueuse/core';
import type { AdjustableNumber } from '~~/composables/useAdjustableNumber';
import { NftFragment } from '../useNFTs';

export interface PaymentOption {
  token: NftFragment,
  cost: number
}

export interface SelectedPurchase {
  token: NftFragment,
  amount: number
  price?: number
}

export interface SpeedupOptions {
  maxCost?: number,
  multiplier?: number
}

export const useActiveSpeedupOrder = () => useState('active-speedup', () => null)

export const useSpeedupOrder = (finishTime: MaybeRef<number>, totalTime: MaybeRef<number>, paymentOptions: MaybeRef<PaymentOption[]>, options: SpeedupOptions = {}) => {
  const { isSameNFT } = useNFTs()
  const { balanceOfToken } = useUserData()

  const {
    multiplier = 1,
    maxCost = Infinity
  } = options

  const selectedToken = ref<NftFragment>(get(paymentOptions)[0].token)

  const finishTimeMs = computed(() => get(finishTime) * 1000)
  const totalTimeMs = computed(() => get(totalTime) * 1000)
  const hoursLeft = Math.ceil(useHoursLeft(new Date().getTime(), finishTimeMs.value))

  const speedup = ref<AdjustableNumber>({
    value: 1,
    min: 1,
    max: hoursLeft,
    multiplier,
    skipMultiplierSnap: true
  })

  const selectToken = (token: NftFragment) =>
    selectedToken.value = token

  const { currentTime } = useGlobalTimestamp()

  const cantPay = computed(() =>
    currentCost.value > balanceOfToken(selectedToken.value)
  )

  const currentPayment = computed(() =>
    get(paymentOptions).find((option) =>
      isSameNFT(option.token, selectedToken.value)
    )
  )

  const currentCost = computed(() =>
    roundToDecimals(speedup.value.value * currentPayment.value?.cost ?? 0, 4)
  )

  const cantPlaceOrder = computed(() =>
    cantPay.value ||
    speedup.value.value == 0 ||
    speedup.value.value > (get(maxCost) ?? Infinity)
  )


  const adjustedFinishTime = computed(() =>
    finishTimeMs.value - (speedup.value.value * 1000 * 60 * 60)
  )

  const timeLeft = computed(() => {
    if (currentTime.value > adjustedFinishTime.value)
      return 'INSTANT'

    const { days, hours, minutes, seconds } = useIntervalWithDays(currentTime.value, adjustedFinishTime.value)
    const dayString = days == 0 ? "" : `${days}D `
    return `${dayString}${hours}H ${minutes}MIN ${seconds}S LEFT`
  })

  const progress = computed(() => {
    const normalizeHour = (1000 * 60)
    const total = totalTimeMs.value / normalizeHour
    const finish = (finishTimeMs.value - currentTime.value) / normalizeHour

    const addTime = (speedup.value.value * 60)
    const diff = (total - finish) + addTime

    const progress = (diff / total) * 100

    return Math.min(100, progress)
  })

  return {
    speedup,
    progress,
    timeLeft,
    selectedToken,
    cantPlaceOrder,
    currentCost,
    currentPayment,
    selectToken
  }
}