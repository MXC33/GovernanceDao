<template lang="pug">
ButtonSound(v-if="!block?.hidden" grid="col-span-1" sound="sm" btn="~ accent-filled" @click="onClick") {{ block?.text }}
    
</template>
    
<script lang="ts" setup>
import type { InfoBlockButton } from '~~/composables/useInfoBlocks';
import type { NftFragment } from '#gql'

const props = defineProps<{
  block: InfoBlockButton,
  token: NftFragment,
}>()

const onClick = () => {
  props.block.onClick()
}

</script>