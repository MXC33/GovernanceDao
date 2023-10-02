<template lang="pug">
ListItemOutline(:is-selected="isSelected" :token="item")
  template(#iconLeft)
    TokenImage(:token="item")

  template(#default)
    div(text="sm" uppercase="~")
      TitleWithIcon(icon="pointer" fill="mc-orange")
        TokenName(:token="item" font="bold" :key="getNftTokenKey(item, '-', true)" color="mc-orange")


      HList(items="center" space-x="1")
        div(color="gray_light" text="xs") {{ $t(`general.capacity`) }} 
        div(color="mc-mint" text="sm") {{ maxCapacity }}
      HList(items="center" space-x="1")
        div(color="gray_light" text="xs") {{ $t(`general.owned`) }}
        div(color="mc-mint" text="sm") {{ item.balance }}

  template(#rightSlot)
    HList(listitem="~ s-selected:selected s-accent:accented" rounded="full" w="6" h="6" mr="4" text="lg" items="center" justify="center" :state="state" :is-selected="isSelected")
      div(color="gray-400 on-selected:!mc-mint_60 group-hover:mc-mint_60" translate-y="2.25%" font="bold" :state="state" :selected="isSelected") +

</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql'



const { getNftTokenKey } = useNFTs()

const { item, isSelected, accented } = defineProps<{
  item: NftFragment,
  isActive?: boolean,
  isSelected?: boolean,
  isNftActive?: boolean
  accented: boolean,
}>()

const state = computed(() => {
  if (accented)
    return 'accent'
})

const maxCapacity = computed(() => {
  switch (item.tokenInfo.tier) {
    case 'night':
      return '60'
    case 'genesis':
      return '44'
    case 'piercer':
      return '36'
    case 'rvr night':
      return '300'
    case 'rvr genesis':
      return '240'
    case 'rvr piercer':
      return '150'
  }
})
</script>