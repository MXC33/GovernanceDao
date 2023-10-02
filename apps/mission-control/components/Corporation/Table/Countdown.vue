<template lang="pug">
div(b="1 $mc-accent" rounded="full" p="x-2 md:x-3 y-1" text="xs $mc-accent" align="center" flex="~" items="center" grid="cols-3" justify="between" w="30 md:35")
  ClockIcon.corporation-accent-color-20(w="4 md:6")
  HelperCountdownTime(:to="end_date")
</template>

<script lang="ts" setup>
import ClockIcon from '~/assets/images/ui/clock.svg'

defineProps<{
  start_date: string
  end_date: string
}>()
</script>