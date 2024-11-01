<template lang="pug">
VList()

  h6(v-if="$slots.detail" text="detail")
    slot(name="detail")

  HList(text="subheading" space-x="1" items="center")
    h3
      slot

    Icon(v-if="icon" :icon="icon")

  h6(v-if="$slots.detailBottom" text="detail")
    slot(name="detailBottom")

</template>

<script lang="ts" setup>
defineProps<{
  icon?: "ixt" | "energy" | "ixtmatic" | "ixtusdt";
}>();
</script>
