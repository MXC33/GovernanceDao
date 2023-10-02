<template lang="pug">
VList(flex-grow="1" space-y="6")
  CorporationColorSpace.taskmanager-section(:corporation="selectedCorporation")
    ListSectionHeader(:is-wide="true" color="$mc-accent")
      slot(name="title")

  VList(px="4" space-y="6" flex-grow="1")

    slot(name="speedup")

    InfoSummary(v-if="$slots.summary")
      template(#header) {{ $t(`general.taskSummary`) }}
      template(#default)
        slot(name="summary")

    slot

  slot(name="buttons")

</template>

<script setup lang="ts">
const { selectedCorporation } = useTaskManager()
</script>

<style>
.taskmanager-section svg path {
  stroke: var(--mc-accent);
}
</style>