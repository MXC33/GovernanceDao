<template lang="pug">
span {{ timeLeft }}

</template>

<script lang="ts" setup>
import type { InfoBlockItemTimeLeft } from '~~/composables/useInfoBlocks';
import type { NftFragment } from '#gql'

const currentTime = useTimestamp({ interval: 1000 })

const timeLeft = computed(() => {
  const addZero = (i) => {
    if (i < 10) return i = `0${i}`
    return i
  }

  const { days, hours, minutes, seconds } = useIntervalWithDays(currentTime.value, props.item.endTime)
  const optDays = days > 0 ? `${days}D.` : ''
  return `${optDays}${hours}H.${minutes}M.${seconds}S`
})

const props = defineProps<{
  item: InfoBlockItemTimeLeft,
  token: NftFragment
}>()

</script>