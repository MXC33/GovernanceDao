<template lang="pug">
CorporationButtonContainer()
  template(#icon)
    CorporationButtonIcon(page="page" :action="action" :corporation="corporation" size="8")

  template(#header)
    CorporationButtonTitle(:action="subPageKey" :corporation="corporation" :page="page")

  template(#orders v-if="$slots.orders")
    slot(name="orders")

  template(#content)
    div() {{ $t(`corporations.${corporation}.buttons.${page}.description`) }}

</template>

<script lang="ts" setup>
import type { Corporation, CorporationAction, CorporationPage } from '~~/composables/corporations/useCorporations';
const subPageKey = computed(() => props.subPage?.toLowerCase())
const props = defineProps<{
  corporation: Corporation,
  action: CorporationAction,
  page: CorporationPage,
  subPage: string
}>()
</script>