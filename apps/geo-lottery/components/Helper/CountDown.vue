<template lang="pug">
template(v-if="type == 'large'" )
  p 'test'
template(v-else)
  p(font="bold") {{days}} days {{hours}} hours {{minutes}} minutes {{seconds}} seconds
</template>

<script lang="ts" setup>
const { type, endTimestamp } = defineProps<{
  type?: 'inline' | 'large',
  endTimestamp: number
}>()

const days = ref<string>('00')
const hours = ref<string>('00')
const minutes = ref<string>('00')
const seconds = ref<string>('00')

let countDownInterval: any;

onMounted(async () => {
  countDownInterval = setInterval(() => {
    const now = new Date()
    const diff = endTimestamp - now.getTime()

    if(diff < 0) {
      days.value = '00'
      hours.value = '00'
      minutes.value = '00'
      seconds.value = '00'
    } else {
      days.value = Math.floor(diff / (1000 * 60 * 60 * 24)).toString()
      hours.value = ('0' + Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2)
      minutes.value = ('0' + Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).slice(-2)
      seconds.value = ('0' + Math.floor((diff % (1000 * 60)) / 1000)).slice(-2)
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(countDownInterval)
  countDownInterval = null
})
</script>

