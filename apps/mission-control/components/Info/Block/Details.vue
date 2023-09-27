<template lang="pug">
InfoGroup()
  template(#header) {{ block.title }}
  template(#default)
    VList(space-y="4")
      template(v-for="section in block.sections") 
        VList()
          div(v-if="section.title" px="2" uppercase="~" color="$mc-accent") {{ section.title }}

          InfoRow(v-for="item in section.items" px="2" py="1" uppercase="~")
            template(#name) {{ item.name }}
            template(#value) {{ item.value }}

  </template>
  
<script lang="ts" setup>
import type { InfoBlockDetails } from '~~/composables/useInfoBlocks';
import type { NftFragment } from '#gql'

defineProps<{
  block: InfoBlockDetails,
  token: NftFragment,
}>()


</script>