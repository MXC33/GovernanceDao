<template lang="pug">
InfoGroup(v-if="attributes?.length > 0")
  template(#header) {{ block.title }}
  template(#default)
    div(grid="~ cols-2 xl:cols-3 gap-2 auto-rows-fr")
      InfoAttribute(v-for="attribute in attributes")
        template(#header) {{ attribute.name }}
        template(#default) {{ attribute.value }}

</template>
    
<script lang="ts" setup>
import type { InfoBlockAttributes } from '~~/composables/useInfoBlocks';
import type { NftFragment } from '#gql'

const props = defineProps<{
  block: InfoBlockAttributes,
  token: NftFragment,
}>()

const activeToken = computed(() => (props.block.tokenAttributes && props.block.token) || props.token)


const { data, execute: fetchTokenData } = useTokenInfo(activeToken.value?.tokenId, activeToken.value?.contract)

if (activeToken.value)
  await fetchTokenData()

const attributes = computed(() => {
  const tokenAttributes = data.value?.tokenInfo.attributes.map(({ value, traitType }) => ({
    name: traitType,
    value
  })) ?? []

  const attributes = props.block.items ?? []
  if (activeToken.value)
    return [...attributes, ...tokenAttributes]

  return attributes
})
</script>

<style>
.info-description-span span {
  color: var(--mc-accent)
}
</style>