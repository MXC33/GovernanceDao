<template lang="pug">
VList(flex-grow="1" min-h="0")
  VList(v-if="!isLoading" flex-grow="1" min-h="0" space-y="6" id="list-container" ref="listElement")
    slot

  VList(v-else flex-grow="1" justify="start" items="start" color="white" space-y="2" p="4")
    HelperLoaderSpinnerSmall() {{loadText ?? $t(`game.helper.loadingAssets`)}}

</template>

<script lang="ts" setup>
import VueScrollTo from 'vue-scrollto'
const mounted = useMounted()
const props = defineProps<{
  isLoading?: boolean,
  activeId?: string,
  loadText?: string
}>()


const scrollTo = (id: string) =>
  VueScrollTo.scrollTo(id, 200, {
    container: "#list-container",
    offset: -80,
    x: false,
    y: true
  })


watch([() => props.activeId, mounted, () => props.isLoading], ([id, mounted, isLoading]) => {
  if (id && mounted && !isLoading)
    nextTick(() => scrollTo(`#${id}`))
}, { immediate: true })

</script>
