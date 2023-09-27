<template lang="pug">
VList(divide-y="1" cut="bottom-right b-$mc-accent" v-if="block.rows.length > 0")
  InfoGroup()
    template(#header) {{ block.title }}

    InfoBlockSheetRow()
      InfoBlockSheetColumn(:column="column" v-for="column in block.header.columns" font="bold" text="xs" color="$mc-accent")

    InfoBlockSheetRow()
      template(v-for="row in block.rows")
        InfoBlockSheetColumn(:column="column" v-for="column in row.columns")

InfoGroup(v-else)
  template(#header) {{ block.secondaryTitle }}

</template>

<script lang="ts" setup>
import type { InfoBlockSheet } from '~~/composables/useInfoBlocks';
import type { NftFragment } from '#gql'

const props = defineProps<{
  block: InfoBlockSheet,
  token: NftFragment,
}>()

</script>