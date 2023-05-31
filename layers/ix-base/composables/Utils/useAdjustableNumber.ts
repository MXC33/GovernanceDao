import { Ref } from 'vue'
import { TokenIdentifier } from '../Token/useTokens'
import { CorporationAdjustableToken } from '../useCorporations'

export interface AdjustableNumber {
  multiplier?: number,
  skipMultiplierSnap?: boolean
  max?: number | ComputedRef<number>,
  min?: number,
  value: number,
}

export interface AdjustableToken extends AdjustableNumber, TokenIdentifier {
  fromUser?: boolean
}

interface AdjustableTokenOptions {
  fromUser?: boolean,
  min?: number,
  max?: number,
  startValue?: number,
  multiplier?: number,
}

export const addAdjustableToToken = (token: TokenIdentifier, options: AdjustableTokenOptions = {}): AdjustableToken => {
  const {
    fromUser = true,
    min = 0,
    max = Infinity,
    startValue = min,
    multiplier,
  } = options

  return {
    ...token,
    fromUser,
    value: startValue ?? min,
    multiplier,
    min,
    max,
  }
}

export const addStaticPaymentToken = (token: TokenIdentifier, min: number = 1): CorporationAdjustableToken => {
  return {
    ...token,
    fromUser: true,
    value: min,
    min,
    adjustable: false
  }
}



export const useAdjustableNumber = (data: Ref<AdjustableNumber | AdjustableToken>) => {
  const { balanceOfToken } = useUserData()

  const max = computed(() => {
    const staticMax = data.value.max ?? Infinity

    const model = data.value as AdjustableToken
    if (model.fromUser) {
      return Math.min(staticMax, balanceOfToken(model))
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
      return currentValue.value <= max.value


    return currentValue.value + multiplier.value <= max.value
  })

  const multiplier = computed(() => data.value.multiplier ?? 1)

  const invalidNumber = computed(() =>
    currentValue.value > max.value || currentValue.value < min.value
  )

  const convertToNumber = (input: number | string) =>
    isNaN(Number(input)) ? 0 : Number(input)

  const validateNumber = (input: number) => {
    const amount = clamp(min.value, max.value, convertToNumber(input))
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
