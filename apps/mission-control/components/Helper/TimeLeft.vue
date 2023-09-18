<template lang="pug">
div()
  ClientOnly {{ displayedValue }}
</template>
  
<script lang="ts" setup>
import { isAfter } from 'date-fns'

const currentTime = useTimestamp({ interval: 1000 })

const timeLeft = computed(() =>
  useIntervalWithDays(currentTime.value, props.finishTime),
)

const isFinished = computed(() => isAfter(currentTime.value, props.finishTime))

const addZero = (i) => {
  if (i < 10) return i = `0${i}`;
  return i;
};

const displayedValue = computed(() => {
  if (isFinished.value)
    return "FINISHED"

  const { hours, minutes, seconds } = timeLeft.value
  const h = hours !== 0 ? `${addZero(hours)}:` : '00:';
  const m = minutes !== 0 ? `${addZero(minutes)}:` : '00:';
  const s = seconds !== 0 ? `${addZero(seconds)}` : '00';
  return `${h}${m}${s}`;
})

const props = defineProps<{
  finishTime: number
}>()

</script>
  