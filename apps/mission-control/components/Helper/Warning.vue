<template lang="pug">
HList(p="2 md:x-4" uppercase="~" gap="2" items="center" text="xs lg:sm" fill="$corporation-text-color")
  WarningIcon.warning(w="5" h="5")
  div
    slot

</template>

<script lang="ts" setup>
import WarningIcon from '~/assets/images/ui/icon-warning.svg'

</script>

<style>
.warning path {
  fill: var(--corporation-text-color)
}
</style>