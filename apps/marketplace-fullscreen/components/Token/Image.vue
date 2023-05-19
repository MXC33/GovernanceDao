<template lang="pug">
img(:src="imageSource" w="full" h="full" object="contain center" v-if="imageSource" )
</template>

<script lang="ts" setup>
import type { IXToken } from '~/composables/useCollection'

const props = defineProps<{
  token: IXToken,
  isVector?: boolean,
}>()

const imageSource = computed(() => {
  if (props.token.icon)
    return props.token.icon
  else if (props.token.thumbnail)
    return props.token.thumbnail
  return props.token.image
})


</script>
