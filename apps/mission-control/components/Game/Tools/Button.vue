<template lang="pug">
ButtonSound(btn="~" p="md:2" bg="black" color="mc-orange" b="1 mc-orange opacity-40 hover:opacity-60" flex-center="col" space-y="2" aspect="square" pos="relative" overflow="hidden" max-w="28" sound="md")
  CircuitBackground(w="100" h="100" pos="absolute" inset="0")

  GameToolsIcon(:icon="tabId" w="6 lg:12")

  p(uppercase="~" text="8px md:xs lg:sm" font="500") {{ title }}

</template>

<script setup lang="ts">
import type { GameMenuId } from '~/composables/types'
import CircuitBackground from '~/assets/images/ui/circuit.svg'

defineProps<{
  title: String,
  tabId: GameMenuId
}>()
</script>