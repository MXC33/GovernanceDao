<template lang="pug">
VList()
  VList(overflow-y="auto" h="full" pos="relative"  rounded="0.5"  border-solid="~" b="gray-300 b-1")
    HList(h="16" items="center" justify="between" pos="md:sticky top-0" flex-shrink="0" z="md:1" gap="2" @click.stop="dropDrawer" cursor="pointer" :small="isSmall" :neutral="isNeutral")
      VList(v-if="$slots.icon" w="6")
        slot(name="icon")
      VList(v-else-if="status" w="6")
        Checked(v-if="status == 'accept'")
        Decline(v-if="status == 'decline'")
      div(flex="~ col sm:row" items-start sm:items-center)
        div(color="white" text="md sm:lg" mr="1 sm:3" font="bold" uppercase="~") ROUND {{'#'+round.id}}
        template(v-if="round.winning_pools && round.winning_pools.length")
          div(color="white opacity-40" text="sm sm:lg" font="bold" uppercase="~" v-if="round.claimed") CLAIMED
          div(color="$mc-pink opacity-40" text="xs sm:lg" font="bold" uppercase="~" v-else) CLAIM YOUR PRIZE
      div(flex space-x="3")
        div(@click.stop="")
          ButtonItem(:value="'pink'"  min-w="180px sm:190px" h="10" :text="'Claim now'" flex="~" items-center justify-center
            v-if="round.winning_pools && round.winning_pools.length && !round.claimed"
            @click="onClaimReward()"
            :loading="isLoading"
          )
        IconChevron(w="4" :up="isOpen")
    Transition(name="slide-top")
      Collapse(:when="isOpen" class="v-collapse" overflow-y="auto" )
        div(p="t-5 sm:t-8 r-2 sm:r-8 b-5 sm:b-17  l-2 sm:l-8" b="t-1 gray-300" bg="$mc-pink-blur")
          div(flex="~")
            div(basis="1/4" flex="~ col" justify="start")
              div(flex="~ col" mb="6")
                p(color="$mc-whitenew" text="xs sm:base"  uppercase="~") ID
                p(font="bold" text="base sm:xl"  uppercase="~"
                  :color="round.winning_pools && round.winning_pools.includes(6) ? '$mc-success' : '$mc-red'"
                  :class="round.winning_pools && !round.winning_pools.includes(6) ? 'line-through' : ''"
                ) {{round.country_code}}
              div(flex="~ col"  mb="6")
                p(color="$mc-whitenew" text="xs sm:base"  uppercase="~") TIER
                p(font="bold" text="base sm:xl"  uppercase="~"
                  :color="round.winning_pools && round.winning_pools.includes(7) ? '$mc-success' : '$mc-red'"
                  :class="round.winning_pools && !round.winning_pools.includes(7) ? 'line-through' : ''"
                ) {{round.tier_name}}
              div(flex="~ col")
                p(color="$mc-whitenew" text="xs sm:base"  uppercase="~") TERRITORY
                p(text="base sm:xl" font="bold"  uppercase="~"
                  :color="round.winning_pools && round.winning_pools.includes(8) ? '$mc-success' : '$mc-red'"
                  :class="round.winning_pools && !round.winning_pools.includes(8) ? 'line-through' : ''"
                ) {{round.type_name}}

            div(basis="1/2" flex="~ col" align="center" mx="2 md:10" justify="start sm:center")
              template(v-if="round.winning_pools && round.winning_pools.length")
                p(color="$mc-whitenew" text="base" font="bold"  uppercase="~" mb="2 sm:4") your prize
                div(flex justify="center" items="center" font="bdrA3mik" bg="$mc-pink-blur" border-color="$mc-pink" p="0 sm:3 md:5" border="1"  h="10 sm:18" text="sm sm:xl md:2xl lg:2xl xl:3xl 2xl:5xl" rounded="full" m="b-4") {{round.prize.toFixed(3)}} AGOLD

            div(basis="1/4" flex="~ col" )
              div(flex="~ col" mb="6" align="end")
                p(color="$mc-whitenew" text="xs sm:base"  uppercase="~") WINNERS
                p(color="$mc-whitenew" font="bold" text="base sm:xl") {{round.winners}}
              div(flex="~ col"  mb="6" align="end")
                p(color="$mc-whitenew" text="xs sm:base"  uppercase="~") YOUR TICKETS
                p(color="$mc-whitenew" font="bold" text="base sm:xl") {{round.your_tickets}}
              div(flex="~ col" align="end")
                p(color="$mc-whitenew" text="xs sm:base"  uppercase="~") TOTAL TICKETS
                p(color="$mc-whitenew" text="base sm:xl" font="bold") {{round.total_tickets}}
</template>

<script lang="ts" setup>
import { Collapse } from 'vue-collapsed'
import Checked from '~/assets/icons/checked.svg'
import Decline from '~/assets/icons/decline.svg'
import type { Round } from "~/composables/api/get/usePlayerAPI";
import { useLottery } from "~/composables/useLottery";
const { displayPopup } = usePopups()

const { startOpen, round } = defineProps<{
  startOpen?: boolean
  isSmall?: boolean
  isNeutral?: boolean
  status?: string,
  round: Round
}>()

const isOpen = shallowRef(startOpen)
const dropDrawer = () => { isOpen.value = !isOpen.value }

const {
  claimReward
} = useLottery()
const { loading: isLoading, execute: claimRewardRequest } = useContractRequest(() =>
  claimReward(round.id)
)

const onClaimReward = async () => {
  const claimReward = await claimRewardRequest()

  if (claimReward)
    displayPopup({
      type: 'popup-type-you-claimed',
      nft_link: round.nft_link
    })
}

</script>


<style>
.v-collapse {
  transition: height 300ms cubic-bezier(0.33, 1, 0.68, 1);
}
</style>
