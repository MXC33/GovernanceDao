<template lang="pug">
h1(text="xl md:3xl mc-orange" uppercase="~" font="druk" v-if="user") {{ dayWord }} {{ user?.username }}

</template>


<script lang="ts" setup>
import { getHours, getMinutes } from 'date-fns';

const { user } = useUser()
const time = useTimestamp({ interval: 10000 })
const dayWord = computed(() => {
  const hours = getHours(time.value)
  const minutes = getMinutes(time.value)

  if (hours == 16 && minutes >= 20 && minutes <= 29)
    return "GM SER, "
  if (hours < 12)
    return "Good morning"
  if (hours < 17)
    return "Good afternoon"
  if (hours < 23 && minutes <= 58)
    return "Good evening"
  else
    return "Eternal Remembrance"
})


</script>

<style>

</style>