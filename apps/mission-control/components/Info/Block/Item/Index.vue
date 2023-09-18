<template lang="pug">
template(v-if="!item.oneColumn") 
  InfoBox() {{ item.name }}
  InfoBox()
    InfoBlockItemValue(v-if="roverColor" :color="roverColor" :item="item" :token="token")
    InfoBlockItemValue(v-else-if="stateColors" :item="item" :token="token" :color="stateColors")
    InfoBlockItemValue(v-else :item="item" :token="token")



template(v-else)
  InfoBox(grid="col-span-2")
    HList(space-x="1")
      span {{ item.name }}
      InfoBlockItemValue(:item="item" :token="token")

</template>

<script lang="ts" setup>
import type { InfoBlockItem, InfoBlockItemText } from '~~/composables/useInfoBlocks';
import type { NftFragment } from '#gql'

const props = defineProps<{
  item: InfoBlockItem,
  token: NftFragment
}>()

const roverColor = computed(() => {
  const textValue = (props.item as InfoBlockItemText).value

  switch (textValue) {
    case 'pristine':
      return 'mc-finegreen'
    case 'worn':
      return 'mc-yellow'
    case 'damaged':
      return 'mc-red'
    case 'wrecked':
      return 'mc-gray_light'
  }
})

const stateColors = computed(() => {
  const stateValue = props.item.state

  switch (stateValue) {
    case 'active':
      return '$mc-accent'
    case 'disabled':
      return 'mc-gray_light'
    case 'accent':
      return '$mc-accent'
    case 'success':
      return 'mc-finegreen'
    case 'error':
      return 'mc-red'
    default: 'white'
  }

})

</script>
