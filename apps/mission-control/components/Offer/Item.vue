<template lang="pug">
FoldList(from="col" justify="center" items="center")

  VList(justify="center" items="center" uppercase="~" p text="center" font="bold")
    div {{$t(`offers.starterPack.packTitle`)}}

    div {{$t(`offers.starterPack.name.${token.type}`)}}

    div {{$t(`offers.starterPack.pix.${token.type}`)}}

  FoldList(from="col" items="center" justify="center" font="bold")
    span.line(color="mc-orange_60") {{$t(`offers.starterPack.price.${token.type}.normal`)}}

    span(color="mc-orange") {{$t(`offers.starterPack.price.${token.type}.sale`)}}
      
</template>
<script lang="ts" setup>
import type { NftFragment } from '#gql'

defineProps<{
  token: NftFragment,
}>()
</script>

<style>
.line {
  text-decoration: line-through 0.7px var(--mc-orange);
}
</style>