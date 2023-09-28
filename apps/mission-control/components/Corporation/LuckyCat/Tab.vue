<template lang="pug">
HList(justify="start")
  ButtonSound(shop-item="~ on-selected:selected" :selected="isSelected" sound="sm-x" uppercase="~" :tabs="tabs" v-for="tab in tabs") {{ tab }}
</template>

<script lang="ts" setup>

defineProps<{
  isSelected?: boolean
}>()

type Tabs = 'active' | 'past' | 'upcoming'
const tabs: Tabs[] = ['active', 'past', 'upcoming']

</script>