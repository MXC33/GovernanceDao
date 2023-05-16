<template lang="pug">
HList(items="center" space-x="1.85")
  GLOBE(w="5.25" translate-y="-3%")
  span() {{ language }}
</template>

<script lang="ts" setup>
import GLOBE from '~/assets/images/header/language-globe.svg'

defineProps<{
  language?: string
}>()
</script>