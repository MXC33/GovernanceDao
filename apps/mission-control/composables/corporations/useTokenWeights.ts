import { NftFragment, ProbabilityWeightFragment } from "#gql"
import { CorporationPaymentToken } from "./useCorporations"

type TokenWeightCalculation = 'linear' | 'newlandsExponential' | 'diffMinValue'

interface TokenWeightsBase {
  calculation: TokenWeightCalculation
}

export type TokenWeightedOutput = TokenWeightLinear | TokenWeightsDiff | TokenWeightNLExponential


export interface TokenWeightLinear extends TokenWeightsBase {
  calculation: 'linear'
  weights: ProbabilityWeightFragment[]
}

export interface TokenWeightsDiff extends TokenWeightsBase {
  calculation: 'diffMinValue'
  weight: ProbabilityWeightFragment
}

export interface TokenWeightNLExponential extends TokenWeightsBase {
  calculation: 'newlandsExponential',
  possibleOutcome: NftFragment,
  defaultOutcome: NftFragment
}

interface TokenWeightOutput {
  token: NftFragment,
  percentage: number
}

export interface TokenWeightAndPayment {
  weights: TokenWeightOutput[],
  payment: CorporationPaymentToken
}

const exponentialNLAlgorithm = (energyInput: number): number => {
  const maxEnergyCost = 1500
  const step = 10
  const exp = -0.014

  const energy = clamp(0, maxEnergyCost, (energyInput - 100))

  const y = 0.2845 - 0.2845 * Math.exp(exp * (energy / step))
  return parseFloat(y.toFixed(3))
}

export const useTokenWeights = () => {

  const getNLExponentialOutput = (outcomeList: TokenWeightNLExponential, balance: number): TokenWeightOutput[] => {
    const possiblePercentage = exponentialNLAlgorithm(balance)
    const defaultPercentage = 1.0 - possiblePercentage
    const normalizePercentage = (num: number) => roundToDecimals((num) * 100, 2)

    return [
      {
        token: outcomeList.defaultOutcome,
        percentage: normalizePercentage(defaultPercentage)
      }, {
        token: outcomeList.possibleOutcome,
        percentage: normalizePercentage(possiblePercentage)
      }
    ]
  }

  const getLinearWeights = (weights: ProbabilityWeightFragment[], input: number) => {
    const sum = weights.reduce((total, { value }) =>
      total + (input * value),
      0)


    return weights.map(({ value, token }) => ({
      token,
      percentage: roundToDecimals((input * value / sum) * 100, 2)
    }));
  }

  const getTokenItemOutput = (item: CorporationPaymentToken) => {
    if (!item?.outputs)
      return []

    switch (item.outputs?.calculation) {
      case 'linear':
        return getLinearWeights(item.outputs.weights, item.value)
      case 'newlandsExponential':
        return getNLExponentialOutput(item.outputs, item.value)
    }

    return []
  }

  const getDiffListOutput = (items: CorporationPaymentToken[]): TokenWeightAndPayment[] => {
    const nullWeight = { value: 0, token: null }
    const probabilities = items.map(item => ({
      ...item,
      weight: (item.outputs as TokenWeightsDiff)?.weight ?? nullWeight,
    }))

    const summedWeights = probabilities.reduce((total, item) =>
      total + item.weight?.value ?? 0, 0)

    const diffOutputs = probabilities.map((paymentToken) => {
      const { weight, value, min } = paymentToken
      const probability = weight.value / summedWeights
      const percentage = probability + ((value - min) * probability)
      return { payment: paymentToken, output: weight.token, percentage }
    })

    const summedWeight = diffOutputs.reduce((total, n) =>
      total + n.percentage
      , 0)


    return diffOutputs.map(({ payment, output, percentage }) => ({
      weights: [{
        token: output,
        percentage: roundToDecimals((percentage / summedWeight) * 100, 2)
      }],
      payment
    }))

  }

  const getAdjustableTokenOutputs = (list: CorporationPaymentToken[]): TokenWeightAndPayment[] => {
    if (!list)
      return []

    const isDiffList = list.some((item) =>
      item.outputs?.calculation == 'diffMinValue'
    )

    if (isDiffList)
      return getDiffListOutput(list)

    return list.map(payment => ({
      weights: getTokenItemOutput(payment),
      payment
    })).flat(1)
  }

  return {
    getAdjustableTokenOutputs
  }
}