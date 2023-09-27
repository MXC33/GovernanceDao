<template lang="pug">
LogoIcon(w="auto" h="full" max-h="70%" object="contain" @click="gotoCorporationOverview" cursor="pointer")
</template>

<script lang="ts" setup>
import Fallback from './Fallback.vue';

const { gotoCorporationOverview } = useCorporations()
const id = useActiveCorporation()

const LogoIcon = await import(`../../../assets/images/ui/corporations/${id.value}/logo.svg?component`).catch(() => Fallback)

</script>

<style lang="postcss"></style>