<template lang="pug">
VList(pos="sticky bottom-0" color="white" bg="mc-black opacity-90" b="t-1 mc-orange opacity-40" v-if="isOpenable")
  div(grid="~ cols-2"  min-h="12" items="center")
    HelperAdjustable(v-model="adjustAmount" :inline="true" v-if="adjustAmount" h="13")
    VList(b="l-1 mc-accent opacity-40" h="full" justify="center" text="center") 
      div(opacity="60") MAX: {{ maxOpeningAmount }}


  button(btn="~ primary uppercase" @click="clickOpenChest" w="full") {{$t(`general.open`)}}
</template> 

<script setup lang="ts">
import type { AdjustableToken } from '~~/composables/useAdjustableNumber';
import type { NftFragment } from '#gql'

const adjustAmount = ref<AdjustableToken>(null)

const { viewPack } = useOpenPacks()

const props = defineProps<{
  pack: NftFragment
}>()

const maxOpeningAmount = computed(() => {
  if (props.pack.tokenInfo?.type == 'cargo-drop')
    return 5
  if (props.pack.tokenInfo?.type == 'aoc-badge-pack')
    return 5
  if (props.pack.tokenInfo?.type == 'gg')
    return 1
  if (props.pack.tokenInfo?.type == 'avatar-card-pack')
    return 1
})

watch(() => props.pack, () => {
  adjustAmount.value = addAdjustableToToken(props.pack, {
    min: 1,
    max: maxOpeningAmount.value
  })

}, { immediate: true })

const isOpenable = computed(() =>
  props.pack.tokenInfo.openable)




const clickOpenChest = () => {
  if (!isOpenable)
    return

  viewPack(props.pack, adjustAmount.value.value)
}

</script>