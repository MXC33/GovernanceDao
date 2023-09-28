import { CorporationAdjustableToken } from './useCorporations'
import { TokenWithInfoBlocks } from '../useInfoBlocks'
import { DailyTicketsFragment, PrizeFragment, WinningsFragment } from '#gql'

type RaffleState = 'active' | 'past' | 'upcoming' | 'my'

export interface CorporationRaffleItem extends TokenWithInfoBlocks, CorporationAdjustableToken {
    id: number
    prize: PrizeFragment
    entriesByWallet?: number
    totalEntries?: number
    dailyTickets: DailyTicketsFragment
    winnings: WinningsFragment[]
    hasClaimed: boolean
    isWinner: boolean
    state: RaffleState
}


export const useCorporationRaffle = () => {
    const activeRaffleItem = useState<CorporationRaffleItem | null>('corporation-selected-raffle-item', () => null)
    const availableItems = useState<CorporationRaffleItem[]>('corporation-raffle-items', () => [])


    const completion = useCorporationCompletion()

    return {
        activeRaffleItem,
        ...completion,
        availableItems,
    }
}