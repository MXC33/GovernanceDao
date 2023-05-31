<template lang="pug">
HList(items="center" space-x="1.85" group)
  GLOBE(w="5.25" translate-y="-3%" fill="white group-hover:opacity-80")
  span() {{ language }}
</template>

<script lang="ts" setup>
import GLOBE from '~/assets/images/header/language-globe.svg'

defineProps<{
  language?: string
}>()
</script>