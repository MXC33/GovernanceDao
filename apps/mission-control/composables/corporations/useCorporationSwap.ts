import { Corporation, CorporationAdjustableToken } from './useCorporations'
import { SwapHistoryItem } from '~/composables/corporations/useCorporationShop'
import type { NftFragment } from '#gql'

type SwapPages = 'intro' | 'swap' | 'complete'
const swapPages: SwapPages[] = ['intro', 'swap', 'complete']

export interface CorporationSwapItem extends CorporationAdjustableToken {
  exchangeRate: number
}

export interface CorporationSwapState {
  from: CorporationSwapItem,
  to: CorporationSwapItem
}

export interface OrderClaim {
  nft: NftFragment,
  corporation: Corporation
}



export const useCorporationSwap = () => {
  const { swapAGOLDtoIXT, swapIXTtoAGOLD } = useAGOLDContract()
  const latestSwap = useState<SwapHistoryItem>('corporation-swap-latest-item', () => null)
  const state = useState<CorporationSwapState>('corporation-swap-state', () => null)

  const completion = useCorporationCompletion()

  const outputValue = computed(() => state.value?.from.value * state.value?.to.exchangeRate)

  const changeSwapDirection = () => {
    const { from, to } = state.value

    state.value = {
      from: {
        ...to,
        fromUser: true
      },
      to: {
        ...from,
        fromUser: false
      }
    }
  }

  const setLatestSwap = () => {
    const { from, to } = state.value
    const amount = from.value
    latestSwap.value = {
      from: from.token,
      to: to.token,
      amount,
      date: new Date().getTime()
    }
  }

  const executeSwap = async () => {
    const { from, to } = state.value
    const amount = from.value

    if (from.token.tokenInfo.type == 'ixt' && to.token.tokenInfo.type == 'astro-gold') {
      setLatestSwap()
      const result = await swapIXTtoAGOLD(amount)
      if (result)
        return completion.gotoCompleted()
      return
    }

    if (from.token.tokenInfo.type == 'astro-gold' && to.token.tokenInfo.type == 'ixt') {
      setLatestSwap()
      const result = await swapAGOLDtoIXT(amount)
      if (result)
        return completion.gotoCompleted()
      return
    }

    console.log("SWAP NOT SUPPORTED", from.token.tokenInfo.type, to.token.tokenInfo.type)
  }

  return {
    ...completion,
    outputValue,
    latestSwap,
    executeSwap,
    changeSwapDirection,
    state,
  }
}

