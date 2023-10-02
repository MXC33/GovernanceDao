<template lang="pug">
div(flex-start="row" space-x="2")
  p {{ result.days }}{{$t(`game.helper.timeDays.days`)}}
  p {{ result.hours }}{{$t(`game.helper.timeDays.hours`)}}
  p {{ result.minutes }}{{$t(`game.helper.timeDays.minutes`)}}
</template>
  
<script lang="ts" setup>
import { intervalToDuration, parseISO } from 'date-fns'

const currentTime = useTimestamp({ interval: 3000 })

const props = defineProps<{
  to: string,
}>()

const result = computed(() =>
  intervalToDuration({
    start: currentTime.value,
    end: parseISO(props.to)
  })
)
</script>
  