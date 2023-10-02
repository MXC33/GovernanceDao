<template lang="pug">
DecorationMenu(max-h="15" my="2")
</template>

<script lang="ts" setup>
import Fallback from './Fallback.vue';

const id = useActiveCorporation()

const DecorationMenu = await import(`../../../assets/images/ui/corporations/${id.value}/decro-menu.svg?component`).catch(() => Fallback)

</script>

<style lang="postcss"></style>