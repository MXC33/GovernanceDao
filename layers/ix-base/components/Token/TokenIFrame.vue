<template lang="pug">

HelperIFrame(:url="url" w="150" h="150")

</template>

<script lang="ts" setup>
import type { AnyToken } from '~/composables/Token/useTokens';


const { token } = defineProps<{
  token: AnyToken,
}>()

const url = token?.media?.animation_url ?? token?.image

</script>
