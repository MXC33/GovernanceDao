<template lang="pug">
InfoGroup()
  template(#header) {{ block.title }}
  template(#default)
    p.info-description-span(v-html="block.body" v-if="block.body" pb="4")

    InfoBlockTable(v-if="block.metaInfo" :block="block.metaInfo" :token="token")


  
</template>
    
<script lang="ts" setup>
import type { InfoBlockDescription } from '~~/composables/useInfoBlocks';
import type { NftFragment } from '#gql'

defineProps<{
  block: InfoBlockDescription,
  token: NftFragment,
}>()

</script>

<style>
.info-description-span span {
  color: var(--mc-accent)
}

.info-description-span .d-green {
  color: var(--mc-success)
}

.info-description-span .d-yellow {
  color: var(--mc-warning)
}

.info-description-span .d-red {
  color: var(--mc-red)
}

.info-description-span .d-gray {
  color: var(--mc-gray-400)
}
</style>