<template lang="pug">
div(grid="~ cols-16" flex="grow" w="full" align="left" items="start")
  IconStatistics(:icon="props.title")
  p(grid="col-span-12" p="2" text="xs white opacity-80" border="1 mc-orange_20" bg="mc-orange_10") {{ strConvertor(props.title) }}
  p(ml="1" grid="col-span-3" p="2" text="xs mc-orange" border="1 mc-orange_20" bg="mc-orange_10") {{ numConvertor(props.value) }}
</template>

<script lang="ts" setup>
const numConvertor = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const strConvertor = (string) => string.replace(/_/g, " ")

const props = defineProps<{
  title: string,
  value: number
}>()

</script>
