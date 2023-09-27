<template lang="pug">
div(flex="~ row lg:col on-bp-md:md:col" :bp-md="isMdBreakpoint" v-if="from == 'col'")
  slot
div(flex="~ col lg:row on-bp-md:md:row" :bp-md="isMdBreakpoint" v-else)
  slot
</template>


<script lang="ts" setup>
const props = defineProps<{
  break?: 'md' | 'lg',
  from?: 'col' | 'row'
}>()
const isMdBreakpoint = computed(() => props.break != 'lg')
</script>