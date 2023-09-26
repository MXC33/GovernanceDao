import { AdjustableToken } from '@ix/base/composables/Utils/useAdjustableNumber'
import { TokenWeightedOutput } from './useTokenWeights'

export type Corporation = 'gws' | 'new-lands' | 'eternalab' | 'lucky-cat' | 'y-space' | 'mc' | 'net-empire' | 'gravity-grade' | 'astro-cap' | 'haveblue' | 'arcade'

export type CorporationAction = 'craft' | 'shop' | 'swap' | 'repair' | 'speedup' | 'claim' | 'stake' | 'raffle' | 'rename' | 'burn' | 'speedup-cooldown'

export type CorporationPage = 'overview' | CorporationAction

export type CorporationPaymentTokenDetailType = 'ordersLeft' | 'outputs' | 'levelOutput'

export interface CorporationPaymentToken extends CorporationAdjustableToken {
  outputs?: TokenWeightedOutput,
  details?: CorporationPaymentTokenDetailType
  unique?: boolean
}

export interface CorporationAdjustableToken extends AdjustableToken {
  adjustable?: boolean
}

export const Corporations: Corporation[] = ['eternalab', 'gws', 'lucky-cat', 'mc', 'new-lands', 'y-space', 'net-empire', 'gravity-grade', 'astro-cap', 'haveblue', 'arcade']

export const useActiveCorporation = () =>
  useState<Corporation>('active-corporation', () => null)

export const useCorporationRoute = () => {
  const route = useRoute()

  const goBack = async () => {
    const parts = routeParts.value.slice(0, -1)
    return navigateTo(`/${parts.join('/')}`)
  }

  const goForward = async (path: string) => {
    return navigateTo(`${route.path}/${path}`)
  }

  const routeParts = computed(() => {
    const routeNormalized = route.path.slice(1)
    const parts = routeNormalized.split("/").filter(path => path != '')

    if (parts.length == 1)
      return [parts[0], 'overview']

    return parts
  })

  const corporationRoot = computed(() => routeParts.value[0])

  const corporationRouteI18n = computed(() => routeParts.value.filter((part) => !isNumeric(part)).join("."))

  return {
    goBack,
    goForward,
    corporationRoot,
    routeParts,
    corporationRouteI18n
  }
}

export const useCorporations = () => {
  const { corporationRoot } = useCorporationRoute()

  const state = useState<CorporationPage>('corporation-state', () => 'overview')
  const corporation = useActiveCorporation()

  const setCorporation = (data: Corporation) => {
    corporation.value = data
  }

  const gotoCorporationOverview = async () => {
    await navigateTo('/' + corporationRoot.value)
  }

  return {
    state,
    corporation,
    gotoCorporationOverview,
    setCorporation
  }
}