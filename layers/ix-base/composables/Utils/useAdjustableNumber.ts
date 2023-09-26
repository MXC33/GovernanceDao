import { Ref } from 'vue'
import { get } from '@vueuse/core'
import { NftFragment } from '#gql'
import { AnyToken, getTokenBalance } from '../Token/useTokens'
import { Payment } from './useCurrency'

export interface AdjustableNumber {
  multiplier?: number,
  skipMultiplierSnap?: boolean
  max?: number | ComputedRef<number>,
  min?: number,
  value: number,
}

export type AdjustableNumberStyle = 'frame' | 'solid' | 'inline' | 'border'

export interface AdjustableToken extends AdjustableNumber {
  token: NftFragment,
  payment?: Payment,
  fromUser?: boolean
}

interface AdjustableTokenOptions {
  fromUser?: boolean,
  min?: number,
  max?: number,
  payment?: Payment,
  startValue?: number,
  multiplier?: number,
}

export const addAdjustableToToken = (token: AnyToken, options: AdjustableTokenOptions = {}): AdjustableToken => {
  const {
    fromUser = true,
    min = 0,
    max = Infinity,
    payment,
    startValue = min,
    multiplier = 1,
  } = options

  return {
    token,
    fromUser,
    payment,
    value: startValue ?? min,
    multiplier: Math.max(1, multiplier),
    min,
    max,
  }
}

export const useAdjustableNumber = (data: Ref<AdjustableNumber | AdjustableToken>) => {
  const { balanceOfToken } = useUserData()
  const { getCurrencyToken } = useCurrencyData()

  const max = computed(() => {
    const staticMax = data.value.max ?? Infinity

    const model = data.value as AdjustableToken
    if (model.fromUser) {
      const paymentToken = getCurrencyToken(model.payment?.paymentMethod)
      const balanceToken = Boolean(model.payment) ? paymentToken : model.token
      return Math.min(staticMax, balanceOfToken(balanceToken))
    } else {
      return staticMax
    }
  })

  const min = computed(() =>
    Math.max(0, data.value.min ?? 0)
  )

  const isDecreasable = computed(() => {
    if (data.value.skipMultiplierSnap)
      return currentValue.value >= min.value

    return currentValue.value - multiplier.value >= min.value
  })

  const currentValue = computed(() => Number(data.value?.value ?? 0))

  const isIncreasable = computed(() => {
    if (data.value.skipMultiplierSnap)
      return currentValue.value <= get(max.value)


    return currentValue.value + multiplier.value <= get(max.value)
  })

  const multiplier = computed(() => data.value.multiplier ?? 1)

  const invalidNumber = computed(() =>
    currentValue.value > get(max.value) || currentValue.value < min.value
  )

  const convertToNumber = (input: number | string) =>
    isNaN(Number(input)) ? 0 : Number(input)

  const validateNumber = (input: number) => {
    const amount = clamp(min.value, get(max.value), convertToNumber(input))
    const roundedAmount = Math.floor(amount * 10) / 10

    if (data.value.skipMultiplierSnap)
      return roundedAmount

    return Math.floor(roundedAmount / multiplier.value) * multiplier.value
  }

  const setValue = (value: number) => {
    data.value.value = validateNumber(value)
  }

  const increaseAmount = () =>
    data.value.value = validateNumber(data.value.value + multiplier.value)

  const decreaseAmount = () =>
    data.value.value = validateNumber(data.value.value - multiplier.value)

  return {
    max,
    min,
    setValue,
    validateNumber,
    increaseAmount,
    decreaseAmount,
    addAdjustableToToken,
    invalidNumber,
    isDecreasable,
    isIncreasable
  }
}