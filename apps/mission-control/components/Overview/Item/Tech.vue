<template lang="pug">
ListItem(:is-selected="isSelected" :token="item")

  template(#default)
    div(text="xs" space-y="1")
      div(text-shadow="white" text="sm") {{ item.tokenInfo.tier }} {{ item.tokenInfo.type }}
      div(text="white" pos="absolute right-4 top-2" v-if="!overviewMode") {{ item.balance }}x

      ListItemActivity(:is-active="isNftActive" @remove-item="$emit('removeItem')" :can-edit="isNftActive")
</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql';


const overviewMode = useOverviewToolMode()

const { item, isActive, isSelected, isNftActive } = defineProps<{
  item: NftFragment,
  isActive?: boolean,
  isSelected?: boolean,
  isNftActive?: boolean
}>()
</script>