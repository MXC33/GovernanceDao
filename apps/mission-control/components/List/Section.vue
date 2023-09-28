<template lang="pug">
VList(space-y="6")
  template(v-if="title || $slots.title")

    ListSectionHeader(:is-big="isBig", :is-wide="isWide" :class="headerClass" :is-selected="isSelected")
      div(v-if="!$slots.title") {{ title }}
      slot(v-else name="title")

  VList(:space-y="withButtons ? '14' : '4'" p="x-4 y-0" v-if="$slots.default")
    slot

  slot(name="details")
</template>

<script setup lang="ts">

defineProps<{
  title?: string,
  withButtons?: boolean,
  isSelected?: boolean,
  isBig?: boolean,
  isWide?: boolean,
  headerClass?: string
}>()

</script>
