<template lang="pug">
div(flex="~ col md:row" px="3 md:6" pt="6 md:8" pb="6" items="start")
  VList(flex-grow="1" w="full" color="gray-200" text="lt-md:xs") 
    slot(name="title")

    HList(items="center md:end" space-x="3")
      div(color="white" font="bold" text="lg md:4xl") 
        template(v-if="isDisabled") -- IXT
        template(v-else) {{ ixt ?? 0 }} IXT

      div(color="gray-200" font="bold" text="sm md:lg") 
        template(v-if="isDisabled") $-- 
        template(v-else) ${{ ixtToUSD(ixt ?? 0) }}

  slot(name="adjust")

</template>

<script lang="ts" setup>
const { ixtToUSD } = useIXTPrice()
const { ixt } = defineProps<{
  ixt?: number,
}>()
const isDisabled = computed(() => ixt == undefined || ixt == 0)
</script>
