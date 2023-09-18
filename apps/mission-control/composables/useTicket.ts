import type { TicketNFT } from "./NFTs/useTicketNFT";
import { NFTType } from "./useNFTs";

export const useTicket = () => {
  const ticketItems: NFTType[] = ['raffle-ticket']
  const { data: nfts } = useTokenData()

  const ticketGroup = computed<Record<string, TicketNFT[]>>(() =>
    groupBy(ticketList.value, "type")
  )

  const ticketList = computed(() => {
    return nfts.value.filter((item) =>
      ticketItems.includes(item?.type)
    )
  })

  return {
    ticketGroup,
    ticketList,
  }
}
