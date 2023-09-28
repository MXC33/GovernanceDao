<template lang="pug">
span(v-if="item.noAnimation") {{ item.value }}
GlitchText(v-else :text="item.value")

</template>

<script lang="ts" setup>
import type { InfoBlockItemText, } from '~~/composables/useInfoBlocks';
import type { NftFragment } from '#gql'

defineProps<{
  item: InfoBlockItemText,
  token: NftFragment
}>()

</script>