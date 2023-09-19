<template lang="pug">
VList(b="t-1 gray-300" mb="20")
  AccordionItem(v-for="round in rounds" :key="'round-'+round.id" :round="round")
</template>

<script lang="ts" setup>
import {useLottery} from "~/composables/useLottery";
import type {Round} from "~/composables/api/get/usePlayerAPI";

const { weeksDraw } = useLottery()
const rounds = ref<Round[]>([])
watch(weeksDraw, (state) => {
  if (!state.rounds)
    return
  rounds.value = state.rounds

}, { immediate: true })
</script>
