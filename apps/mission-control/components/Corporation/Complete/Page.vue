<template lang="pug">
CorporationPage()
  template(#title) {{$t(`corporations.${corporationRouteI18n}.header`)}}

  template(#default)
    CorporationComplete(:action="action")

</template>

<script lang="ts" setup>
const { corporationRouteI18n } = useCorporationRoute()

defineProps<{
  action?: string
}>()
</script>
