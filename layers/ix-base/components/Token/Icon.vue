<template lang="pug">
Icon(:filter="outline ? 'url(#white-outline)' : ''")
</template>

<script lang="ts" setup>
import type { TokenIdentifier } from '~/composables/useTokens';
const { getTokenKey } = useTokens()

const svgPath = computed(() => getTokenKey(props.token))
const Icon = await import(`../../assets/images/ui/token/${svgPath.value}.svg?component`).catch(() => '<div></div>')

const props = defineProps<{
  token: TokenIdentifier,
  outline?: boolean
}>()

</script>