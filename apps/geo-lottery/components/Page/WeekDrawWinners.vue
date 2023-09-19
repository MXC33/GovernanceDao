<template lang="pug">
div()
  h2(mb-7 text="3xl md:4xl xl:5xl" font="bdrA3mik") THIS WEEK’S DRAW
  div(bg="black" rounded="4" b="1 $mc-pink" py-16)
    div(mb="18")
      p(text="xl center" font="extrabold" m="b-4 md:b-8" ) ROUND {{'#' + roundID}}
      HelperCountDown(:endTimestamp="0" :type="'large'")

    TierSize(:id="id" :tier="tier" :size="size")

    div(flex="~" justify="center" font="bold" uppercase="~" text="base md:xl" m="y-6 md:y-10" flex-wrap)
      span YOUR ENTRIES:
      span(color="$mc-pink" m="x-1") {{enteredOneTimeTickets}}
      span() ONE-TIME TICKET &
      span(  color="$mc-pink" m="x-1") {{streamTickets}}
      span() Subscription TICKETS
    div(flex="~ col md:row" justify="center" items-center )
      ButtonItem(:value="'pink'" :text="'Claim'" min-w="300px md:265px" v-if="showClaimButton" @click="onClaimReward()" :loading="isLoading")
</template>

<script lang="ts" setup>
import {useLottery} from "~/composables/useLottery";
const { displayPopup } = usePopups()

type TierSize = {
  name: string,
  is_winner: boolean
}
const { weeksDraw } = useLottery()
const id = ref<TierSize>(({
  name: '',
  is_winner: false
}))
const tier = ref<TierSize>(({
  name: '',
  is_winner: false
}))
const size = ref<TierSize>(({
  name: '',
  is_winner: false
}))
const showClaimButton = ref<boolean>(false)
const roundID = ref<number>(0)

const enteredOneTimeTickets = ref<number>(0)
const streamTickets = ref<number>(0)

const nft_link = ref<string>('')

watch(weeksDraw, (state) => {
  if (!state.last_drawn_lottery)
    return
  const lastDrawnLottery = state.last_drawn_lottery

  id.value = {
    name: lastDrawnLottery.country_code,
    is_winner: lastDrawnLottery.winning_pools?.includes(6) || false
  }
  tier.value = {
    name: lastDrawnLottery.tier_name,
    is_winner: lastDrawnLottery.winning_pools?.includes(7) || false
  }
  size.value = {
    name: lastDrawnLottery.type_name,
    is_winner: lastDrawnLottery.winning_pools?.includes(7) || false
  }

  showClaimButton.value = !lastDrawnLottery.winning_pools ? false : lastDrawnLottery.winning_pools.length > 0 && !lastDrawnLottery.claimed

  roundID.value = lastDrawnLottery.id

  enteredOneTimeTickets.value = lastDrawnLottery.entries.entered_tickets
  streamTickets.value = lastDrawnLottery.entries.entered_tickets
  nft_link.value = lastDrawnLottery.nft_link || ''

  if (showClaimButton.value)
    displayPopup({
      type: 'popup-type-you-win',
      nft_link: nft_link.value,
      lottery_id: roundID.value
    })
}, { immediate: true })

const {
  claimReward
} = useLottery()
const { loading: isLoading, execute: claimRewardRequest } = useContractRequest(() =>
  claimReward(roundID.value)
)

const onClaimReward = async () => {
  const claimReward = await claimRewardRequest()

  if (claimReward)
    displayPopup({
      type: 'popup-type-you-claimed',
      nft_link: nft_link.value
    })
}

</script>
