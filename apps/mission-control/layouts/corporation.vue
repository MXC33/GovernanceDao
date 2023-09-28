<template lang="pug">
NuxtLayout(name="default")
  template(#default)
    VList.corporation(flex-grow="1" min-h="0" w="full" h="full" :class="corporationClassName")

      CorporationHeader()

      VList(flex-grow="1" min-h="0"  bg="$corporation-bg-color" color="$corporation-text-color" pos="relative" overflow-x="hidden")

        slot(z="20")

</template>

<script lang="ts" setup>
import type { Corporation } from '~~/composables/corporations/useCorporations';

const corporation = useActiveCorporation()

const corporationClassName = computed(() => [`corporation-${corporation.value}`])

const route = useRoute()
const routeParts = computed(() => {
  const routeNormalized = route.path.slice(1)
  return routeNormalized.split("/")
})

const showBackground = computed(() => routeParts.value.length == 1)
watch(route, (route) => {
  corporation.value = routeParts.value[0] as Corporation
}, { immediate: true })

// defineProps<{
//   hideLeftDecoration?: boolean,
//   hideRightDecoration?: boolean,
// }>()
</script>