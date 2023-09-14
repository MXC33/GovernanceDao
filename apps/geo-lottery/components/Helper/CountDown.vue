<template lang="pug">
template(v-if="type == 'large'" )
  div(grid grid-cols="4" gap-1 p=" md:x-15 lg:x-25 2xl:x-65")
    div(flex="~ col" items-center)
      div(flex justify="center" items="center" bg="$mc-pink-blur" border-color="$mc-pink" p="5" border="1" w="20 xs:60 sm:28 lg:44" h="14 sm:18 lg:24" text="2xl lg:6xl" rounded="full" m="b-4" font="bdrA3mik") {{ days }}
      span(text="center sm sm:lg md:xl lg:2xl" font="bdrA3mik")
        slot(name="days") DAYS
    div(flex="~ col" items-center)
      div(flex justify="center" items="center" bg="$mc-pink-blur" border-color="$mc-pink" p="5" border="1" w="20 sm:28 md:30 lg:44" h="14 sm:18 lg:24" text="2xl lg:6xl" rounded="full" m="b-4" font="bdrA3mik") {{ hours }}
      span(text="center sm sm:lg md:xl lg:2xl" font="bdrA3mik")
        slot(name="hours") HOURS
    div(flex="~ col" items-center)
      div(flex justify="center" items="center" bg="$mc-pink-blur" border-color="$mc-pink" p="5" border="1" w="20 sm:28 md:30 lg:44" h="14 sm:18 lg:24" text="2xl lg:6xl" rounded="full" m="b-4" font="bdrA3mik") {{ minutes }}
      span(text="center sm sm:lg md:xl lg:2xl" font="bdrA3mik")
        slot(name="minutes") MINUTES
    div(flex="~ col" items-center)
      div(flex justify="center" items="center" color="$mc-pink" bg="$mc-pink-blur" border-color="$mc-pink" p="5" border="1" w="20 sm:28 md:30 lg:44" h="14 sm:18 lg:24" text="2xl lg:6xl" rounded="full" m="b-4" font="bdrA3mik") {{ seconds }}
      span(text="center sm sm:lg md:xl lg:2xl" font="bdrA3mik")
        slot(name="seconds") SECONDS
template(v-else)
  p(font="bold") {{days}} slot(name="days") days {{hours}} hours {{minutes}} minutes {{seconds}} seconds
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

countDownInterval = setInterval(() => {
  const now = new Date()
  const diff = endTimestamp - now.getTime()

  if(diff < 0) {
    days.value = '00'
    hours.value = '00'
    minutes.value = '00'
    seconds.value = '00'
  } else {
    days.value = ('0' + Math.floor(diff / (1000 * 60 * 60 * 24))).slice(-2)
    hours.value = ('0' + Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2)
    minutes.value = ('0' + Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).slice(-2)
    seconds.value = ('0' + Math.floor((diff % (1000 * 60)) / 1000)).slice(-2)
  }
}, 1000)

onUnmounted(() => {
  clearInterval(countDownInterval)
  countDownInterval = null
})
</script>

