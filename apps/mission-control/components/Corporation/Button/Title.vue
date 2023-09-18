<template lang="pug">
h4(uppercase="~" font="bold") {{ title }}

</template>

<script lang="ts" setup>
const { t } = useI18n()
const { corporationRouteI18n } = useCorporationRoute()

const title = computed(() => {
  return t(`corporations.${corporationRouteI18n.value}.buttons.${props.page}.title`)
})

const props = defineProps<{
  page: string
}>()

</script>